import {Component, OnInit, ViewChild} from '@angular/core';
import {Attribute} from "../attribute";
import {Subscription} from "rxjs";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {TaskEntityType} from "../../todos/task-entity-type.enum";
import {AuthService} from "../../../shared/auth.service";
import {AttributeService} from "../attribute.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {AcsiService} from "../../../shared/acsi.service";

@Component({
    selector: 'acsi-edit-attribute',
    templateUrl: './edit-attribute.component.html',
    styleUrls: ['./edit-attribute.component.css']
})
export class EditAttributeComponent implements OnInit {

    private attribute: Attribute;
    private attributeId: string;
    private sub: Subscription;
    private active: boolean;
    private submitted: boolean;
    private isNew: boolean = true;
    private attributeForm: FormGroup;
    private linktodo: boolean = false;
    private refreshTodo: boolean = false;
    entityType: number = 0;
    entityId: string;
    taskEntityType: number = TaskEntityType.OrganizationAttribute;
    private qSub: Subscription;
    private attributeCodes: Array<any>;
    @ViewChild('attributeModal') attributeModal: any;


    constructor(private authService: AuthService,
                private acsiService: AcsiService,
                private attributeService: AttributeService,
                private _formBuilder: FormBuilder,
                public router: Router,
                public route: ActivatedRoute,
                public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.attribute = new Attribute();
        this.sub = this.route.params.subscribe(
            (params: any) => {
                if (params.hasOwnProperty('attributeId')) {
                    this.attributeId = params['attributeId'];
                    this.isNew = false;
                    this.attributeService.getAttributeById(this.attributeId).subscribe((attribute: Attribute) => {
                        this.attribute = attribute || this.attribute;
                        this.initForm();
                    });
                } else {
                    this.attribute.CreatedOn = new Date();
                    this.attribute.ModifiedOn = new Date();
                    this.attribute.ModifiedBy = this.authService.getLoggedInUser();
                    this.attribute.OwnerName = this.authService.getLoggedInUser();

                    this.isNew = true;
                    if (this.route.snapshot.parent.data.hasOwnProperty('accountInfo')) {
                        this.attribute.AccountName = this.route.snapshot.parent.data['accountInfo'].Name;
                        this.attribute.AccountId = this.route.snapshot.parent.data['accountInfo'].Id;
                    }
                    if (this.route.snapshot.parent.data.hasOwnProperty('contactInfo')) {
                        this.attribute.AccountName = this.route.snapshot.parent.data['contactInfo'].Name;
                        this.attribute.ContactId = this.route.snapshot.parent.data['contactInfo'].Id;
                        this.attribute.AccountId = this.route.snapshot.parent.data['contactInfo'].AccountId;
                    }
                    this.initForm();
                }
            })

        this.acsiService.getAttributeCodes()
            .subscribe((attributeCodes: any) => {
                this.attributeCodes = [];
                attributeCodes.forEach((attributeCode: any) => {
                    this.attributeCodes.push({label: attributeCode.Name, value: attributeCode.Id});
                });
            }, (error: any) => {
                let errors = error.json();
                alert(errors.ExceptionMessage);
            })
    }

    initForm() {
        let Name = "";
        let AttributeId = "";
        let AccountName = "";
        let AttributeCodeId = "";
        let Description = "";
        let CreatedDate = new Date();
        let ModifiedOn = new Date();
        let OwnerName = "";
        let ModifiedBy = "";
        let AccountId = this.attribute.AccountId;
        let ContactId = this.attribute.ContactId;

        this.entityType = this.attribute.ContactId ? 1 : 0;
        this.entityId = this.attribute.ContactId ? this.attribute.ContactId : this.attribute.AccountId;

        if (!this.isNew) {
            AttributeId = this.attribute.AttributeId;
            AttributeCodeId = this.attribute.AttributeCodeId;
            Description = this.attribute.Description;
            Name = this.attribute.Name;
        }
        AccountName = this.attribute.AccountName;
        ModifiedOn = new Date(this.attribute.ModifiedOn);
        CreatedDate = new Date(this.attribute.CreatedOn);

        OwnerName = this.attribute.OwnerName;
        ModifiedBy = this.attribute.ModifiedBy;

        this.attributeForm = this._formBuilder.group(
            {
                AttributeId: [AttributeId],
                Description: [Description, Validators.required],
                AttributeCodeId: [AttributeCodeId, Validators.required],
                AccountName: [{value: AccountName, disabled: true}],
                ModifiedOn: [ModifiedOn],
                CreatedDate: [CreatedDate],
                OwnerName: [OwnerName],
                ModifiedBy: [ModifiedBy],
                AccountId: [AccountId],
                ContactId: [ContactId]
            })
        this.active = true;
    }

    onSubmit() {
        this.submitted = true;
        if (this.attributeForm.valid) {
            this.attributeService.saveAttribute(this.attributeForm.value)
                .subscribe((response: any) => {
                    if (response) {
                        if (this.attribute.AttributeId === undefined) {
                            this.toastr.info("Attribute added successfully!");
                        } else {
                            this.toastr.info("Attribute updated successfully!");
                        }
                        this.attributeService.attributeUpdateEvent$.emit(true);
                        this.navigateBack();
                    } else {
                        this.toastr.error(response.ExceptionMessage);
                    }
                }, (error: any) => {
                    let errors = error.json();
                    this.toastr.error(errors.ExceptionMessage);
                })
        }
    }

    private navigateBack() {
        //this.router.navigate(['../'], {relativeTo: this.route, preserveQueryParams: true});
        this.attributeModal.close();
    }

}
