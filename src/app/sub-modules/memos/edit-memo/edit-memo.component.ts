import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {Memo} from "../memo";
import {AuthService} from "../../../shared/auth.service";
import {MemoService} from "../memo.service";
import {ToastsManager} from "ng2-toastr";
import {TaskEntityType} from "../../todos/task-entity-type.enum";

@Component({
    selector: 'acsi-edit-memo',
    templateUrl: './edit-memo.component.html',
    styleUrls: ['./edit-memo.component.css']
})
export class EditMemoComponent implements OnInit {

    private memo: Memo;
    private memoId: string;
    private sub: Subscription;
    private active: boolean;
    private submitted: boolean;
    private isNew: boolean = true;
    private memoForm: FormGroup;
    private linktodo: boolean = false;
    private refreshTodo: boolean = false;
    entityType: number = 0;
    entityId: string;
    taskEntityType: number = TaskEntityType.Memo;
    noteEntityType: number = 1;
    private qSub: Subscription;
    @ViewChild('memoModal') memoModal: any;

    constructor(private authService: AuthService,
                private memoService: MemoService,
                private _formBuilder: FormBuilder,
                public router: Router,
                public route: ActivatedRoute,
                public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.memo = new Memo();
        this.sub = this.route.params.subscribe(
            (params: any) => {
                if (params.hasOwnProperty('memoId')) {
                    this.memoId = params['memoId'];
                    this.isNew = false;
                    this.memoService.getMemoById(this.memoId).subscribe((memo: Memo) => {
                        this.memo = memo || this.memo;
                        this.initForm();
                    });
                } else {
                    this.memo.Date = new Date();
                    this.memo.ModifiedOn = new Date();
                    this.memo.ModifiedBy = this.authService.getLoggedInUser();
                    this.memo.OwnerName = this.authService.getLoggedInUser();
                    this.isNew = true;
                    if (this.route.snapshot.parent.data.hasOwnProperty('accountInfo')) {
                        this.memo.AccountName = this.route.snapshot.parent.data['accountInfo'].Name;
                        this.memo.AccountId = this.route.snapshot.parent.data['accountInfo'].Id;
                    }
                    if (this.route.snapshot.parent.data.hasOwnProperty('contactInfo')) {
                        this.memo.AccountName = this.route.snapshot.parent.data['contactInfo'].Name;
                        this.memo.ContactId = this.route.snapshot.parent.data['contactInfo'].Id;
                        this.memo.AccountId = this.route.snapshot.parent.data['contactInfo'].AccountId;
                    }

                    this.initForm();
                }
            })
    }

    initForm() {
        let Name = "";
        let MemoId = "";
        let AccountName = "";
        let CreatedDate = new Date();
        let ModifiedOn = new Date();
        let OwnerName = "";
        let ModifiedBy = "";
        let AccountId = this.memo.AccountId;
        let ContactId = this.memo.ContactId;

        this.entityType = this.memo.ContactId ? 1 : 0;
        this.entityId = this.memo.ContactId ? this.memo.ContactId : this.memo.AccountId;

        if (!this.isNew) {
            MemoId = this.memo.MemoId;
            Name = this.memo.Name;
        }
        AccountName = this.memo.AccountName;
        ModifiedOn = new Date(this.memo.ModifiedOn);
        CreatedDate = new Date(this.memo.Date);

        OwnerName = this.memo.OwnerName;
        ModifiedBy = this.memo.ModifiedBy;

        this.memoForm = this._formBuilder.group(
            {
                MemoId: [MemoId],
                Name: [Name, Validators.required],
                AccountName: [AccountName],
                ModifiedOn: [ModifiedOn],
                CreatedDate: [CreatedDate],
                OwnerName: [OwnerName],
                ModifiedBy: [ModifiedBy],
                AccountId: [AccountId],
                ContactId: [ContactId]
            });
        this.active = true;
    }

    onSubmit() {
        this.submitted = true;
        if (this.memoForm.valid) {
            this.memoService.saveMemo(this.memoForm.value)
                .subscribe((response: any) => {
                    if (response) {
                        if (this.memo.MemoId === undefined) {
                            this.toastr.success("Memo added successfully!");
                        } else {
                            this.toastr.success("Memo updated successfully!");
                        }
                        this.memoService.memoUpdateEvent$.emit(true);
                        this.navigateBack();
                    } else {
                        alert(response.ExceptionMessage);
                    }
                }, (error: any) => {
                    let errors = error.json();
                    this.toastr.error(errors.ExceptionMessage);
                })
        }
    }

    private navigateBack() {
        this.memoModal.close();
    }
}
