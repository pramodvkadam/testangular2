import {Component, OnInit, ViewChild} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Params, Router, ActivatedRoute} from "@angular/router";
import {Response} from "../response";
import {Subscription} from "rxjs";
import {TaskEntityType} from "../../todos/task-entity-type.enum";
import {AuthService} from "../../../shared/auth.service";
import {AcsiService} from "../../../shared/acsi.service";
import {ResponseService} from "../response.service";
import {ToastsManager} from "ng2-toastr";
import {AccountService} from "../../../account/account.service";

@Component({
    selector: 'acsi-edit-response',
    templateUrl: './edit-response.component.html',
    styleUrls: ['./edit-response.component.css']
})
export class EditResponseComponent implements OnInit {

    private response: Response;
    private responseId: string;
    private sub: Subscription;
    private active: boolean;
    private submitted: boolean;
    private isNew: boolean = true;
    private responseForm: FormGroup;
    private linktodo: boolean = false;
    private refreshTodo: boolean = false;
    entityType: number = 0;
    entityId: string;
    taskEntityType: number = TaskEntityType.Response;
    private qSub: Subscription;
    private responseCodes: Array<any> = [];
    private actionCodes: Array<any> = [];
    private actionCrossCodes: Array<any> = [];
    private contacts: Array<any>;
    private disableContact: boolean;
    @ViewChild('responseModal') responseModal: any;

    constructor(private authService: AuthService,
                private acsiService: AcsiService,
                private accountService: AccountService,
                private responseService: ResponseService,
                private _formBuilder: FormBuilder,
                public router: Router,
                public route: ActivatedRoute,
                public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.response = new Response();

        this.sub = this.route.params.subscribe(
            (params: any) => {

                if (params.hasOwnProperty('responseId')) {
                    this.responseId = params['responseId'];
                    this.isNew = false;
                    this.responseService.getResponseById(this.responseId).subscribe((response: Response) => {
                        this.response = response || this.response;

                        if (this.response.ActionCodeId) {
                            this.getCrossCodeAndResponces(this.response.ActionCodeId);
                        }
                        if (params.hasOwnProperty('accountNumber')) {
                            this.disableContact = false;
                        }

                        this.initForm();
                    });
                } else {
                    this.response.Date = new Date();
                    this.response.ModifiedOn = new Date();
                    this.response.ModifiedBy = this.authService.getLoggedInUser();
                    this.response.OwnerName = this.authService.getLoggedInUser();
                    this.isNew = true;

                    this.initForm();
                }

                this.acsiService.getActionCodes()
                    .subscribe((actionCodes: any) => {
                        this.actionCodes = [];
                        actionCodes.forEach((actionCode: any) => {
                            this.actionCodes.push({label: actionCode.Name, value: actionCode.Id});
                        });
                    }, (error: any) => {
                        let errors = error.json();
                        this.toastr.error(errors.ExceptionMessage);
                    })
            })
    }

    getCrossCodeAndResponces(actionId: string) {
        this.acsiService.getActionResponces(actionId)
            .subscribe((responseCodes: any) => {
                this.responseCodes = [];
                if (responseCodes) {
                    responseCodes.forEach((responseCode: any) => {
                        this.responseCodes.push({label: responseCode.Name, value: responseCode.Id});
                    });
                }
            }, (error: any) => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage);
            });

        this.acsiService.getActionCrossCodes(actionId)
            .subscribe((actionCrossCodes: any) => {

                this.actionCrossCodes = [];
                if (actionCrossCodes) {
                    actionCrossCodes.forEach((actionCrossCode: any) => {
                        this.actionCrossCodes.push({label: actionCrossCode.Name, value: actionCrossCode.Id});
                    });
                }
            }, (error: any) => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage);
            })
    }

    initForm() {
        if (this.route.snapshot.parent.data.hasOwnProperty('accountInfo')) {
            this.response.AccountName = this.route.snapshot.parent.data['accountInfo'].Name;
            this.response.AccountId = this.route.snapshot.parent.data['accountInfo'].Id;
        }
        if (this.route.snapshot.parent.data.hasOwnProperty('contactInfo')) {
            this.response.AccountName = this.route.snapshot.parent.data['contactInfo'].Name;
            this.response.ContactId = this.route.snapshot.parent.data['contactInfo'].Id;
            this.response.AccountId = this.route.snapshot.parent.data['contactInfo'].AccountId;
        }
        this.accountService.getContactByAccountId(this.response.AccountId)
            .subscribe((contacts: any) => {
                this.contacts = [];
                if (contacts && contacts.length) {
                    contacts.forEach((contact: any) => {
                        this.contacts.push({label: contact.Name, value: contact.Id});
                    });
                }
            })

        let Name = "";
        let ResponseId = "";

        let ActionCodeId = "";
        let ActionResponseId = "";
        let ActionCrossCodeId = "";
        let Description = "";
        let CreatedDate = new Date();
        let ModifiedOn = new Date();
        let OwnerName = "";
        let ModifiedBy = "";
        let AccountId = this.response.AccountId;
        let ContactId = this.response.ContactId;

        this.entityType = this.response.ContactId ? 1 : 0;
        this.entityId = this.response.ContactId ? this.response.ContactId : this.response.AccountId;

        if (!this.isNew) {
            ResponseId = this.response.ResponseId;
            ActionCodeId = this.response.ActionCodeId;
            ActionResponseId = this.response.ActionResponseId;
            ActionCrossCodeId = this.response.ActionCrossCodeId;
            Description = this.response.Description;
            Name = this.response.Name;
        }
        let AccountName = this.response.AccountName;
        let ContactName = this.response.ContactName;
        ModifiedOn = new Date(this.response.ModifiedOn);
        CreatedDate = new Date(this.response.Date);

        OwnerName = this.response.OwnerName;
        ModifiedBy = this.response.ModifiedBy;

        this.responseForm = this._formBuilder.group(
            {
                ResponseId: [ResponseId],
                Name: [Name, Validators.required],
                ActionCodeId: [ActionCodeId, Validators.required],
                ActionResponseId: [ActionResponseId],
                ActionCrossCodeId: [ActionCrossCodeId],
                AccountName: [AccountName],
                ContactId: [ContactId],
                ModifiedOn: [ModifiedOn],
                CreatedDate: [CreatedDate],
                OwnerName: [OwnerName],
                ModifiedBy: [ModifiedBy],
                AccountId: [AccountId]
            })
        this.active = true;
    }

    onSubmit() {
        this.submitted = true;
        if (this.responseForm.valid) {
            this.responseService.saveResponse(this.responseForm.value)
                .subscribe((response: any) => {
                    if (response) {
                        if (this.response.ResponseId === undefined) {
                            this.toastr.info("Response added successfully!");
                        } else {
                            this.toastr.info("Response updated successfully!");
                        }
                        this.responseService.responseUpdateEvent$.emit(true);
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
        this.responseModal.close();
        // this.router.navigate(['../'], {relativeTo: this.route, preserveQueryParams: true});
    }

}
