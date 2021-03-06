import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {ContactPerson} from "./contact-person";
import {Subscription} from "rxjs";
import {ContactPersonService} from "./contact-person.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {AcsiService} from "../../shared/acsi.service";
import {FormBuilder, FormArray, FormGroup, FormControl, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'acsi-edit-contact-person',
    templateUrl: './edit-contact-person.component.html',
    styleUrls: ['./edit-contact-person.component.css']
})
export class EditContactPersonComponent implements OnInit,OnDestroy {
    private subscription: Subscription;
    private contactId: any;
    private isNew: boolean;
    private contactPerson: ContactPerson;
    private contactForm: FormGroup;
    private jobTitles: Array<any>;
    private languages: Array<any>;
    private active: boolean;
    private submitted: boolean;
    private parentRouteId: any;
    private sub: Subscription;
    @ViewChild('contactModal') contactModal: any;


    constructor(private route: ActivatedRoute,
                private contactPersonService: ContactPersonService,
                private acsiService: AcsiService,
                private formBuilder: FormBuilder,
                private router: Router,
                public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.active = false;
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                if (params.hasOwnProperty('contactId')) {
                    this.isNew = false;
                    this.contactId = params['contactId'];
                    this.contactPersonService.getContactPersonById(this.contactId).subscribe(
                        (contactPerson: ContactPerson) => {
                            this.contactPerson = contactPerson;
                            this.initForm();
                        },
                        error => {
                            let errors = error.json();
                            this.toastr.error(errors.ExceptionMessage || "Server Error", "Oops!");
                        }
                    );
                } else {
                    this.isNew = true;
                    this.contactPerson = new ContactPerson();
                    if (this.route.snapshot.parent.data.hasOwnProperty('accountInfo')) {
                        this.parentRouteId = this.contactPerson.AccountId = this.route.snapshot.parent.data['accountInfo'].Id;
                    }
                    if (this.route.snapshot.parent.data.hasOwnProperty('contactInfo')) {
                        this.parentRouteId = this.contactPerson.AccountId = this.route.snapshot.parent.data['contactInfo'].AccountId;
                    }
                    this.initForm();
                }

                this.acsiService.getJobTitles().subscribe(jobTitles => {
                    this.jobTitles = jobTitles;
                }, error => {
                    let errors = error.json();
                    alert(errors.ExceptionMessage);
                });
                this.acsiService.getLanguages().subscribe(languages => {
                    this.languages = languages;
                }, error => {
                    let errors = error.json();
                    alert(errors.ExceptionMessage);
                })
            });

    }

    initForm() {
        let AccountId = this.contactPerson.AccountId;
        let Id = "";
        let Title = "";
        let Initials = "";
        let FirstName = "";
        let Insertion = "";
        let LastName = "";
        let JobTitle = "";
        let Gender = "";
        let Department = "";
        let LanguageId = "";
        let PhoneNumber = "";
        let Fax = "";
        let MobileNumber = "";
        let Emails: FormArray = new FormArray([]);

        if (!this.isNew) {
            if (this.contactPerson.hasOwnProperty('Emails') && this.contactPerson.Emails.length) {
                for (let i = 0; i < this.contactPerson.Emails.length; i++) {
                    Emails.push(
                        new FormControl(this.contactPerson.Emails[i],
                            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                        ));
                }
            }
            Id = this.contactPerson.ContactId;
            Title = this.contactPerson.Title;
            Initials = this.contactPerson.Initials;
            FirstName = this.contactPerson.FirstName;
            Insertion = this.contactPerson.Insertion;
            LastName = this.contactPerson.LastName;
            JobTitle = this.contactPerson.JobTitle;
            Gender = this.contactPerson.Gender;
            Department = this.contactPerson.Department;
            LanguageId = this.contactPerson.LanguageId;
            PhoneNumber = this.contactPerson.PhoneNumber;
            Fax = this.contactPerson.Fax;
            MobileNumber = this.contactPerson.MobileNumber;
        } else {
            Emails.push(
                new FormControl("",
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                ));
        }

        this.contactForm = this.formBuilder.group({
            ContactId: [Id, (!this.isNew) ? Validators.required : null],
            AccountId: [AccountId, Validators.required],
            Title: [Title],
            Initials: [Initials],
            FirstName: [FirstName],
            Insertion: [Insertion],
            LastName: [LastName, Validators.required],
            JobTitle: [JobTitle],
            Gender: [Gender, Validators.required],
            Department: [Department],
            LanguageId: [LanguageId, Validators.required],
            PhoneNumber: [PhoneNumber, Validators.pattern("[0-9]+([\-]?\d+)+[0-9]")],
            Fax: [Fax, Validators.pattern("[0-9]+([\-]?\d+)+[0-9]")],
            MobileNumber: [MobileNumber, Validators.pattern("[0-9]+([\-]?\d+)+[0-9]")],
            Emails: Emails
        });
        this.active = true;
    }

    onSubmit() {
        this.submitted = true;
        if (this.contactForm.valid) {
            this.contactPersonService.saveContactPerson(this.contactForm.value, true, this.isNew).subscribe(
                response => {
                    this.toastr.success(`Contact ${this.isNew ? 'added' : 'updated'} successfully!`);
                    this.submitted = false;
                    this.contactPersonService.contactUpdateEvent$.emit(true);
                    this.navigateBack();
                }, error => {
                    let errors = error.json();
                    this.submitted = false;
                    this.toastr.error(errors.ExceptionMessage);
                });
        } else {
            this.toastr.warning("No any changes done!");
        }
    }

    onAddEmail() {
        (<FormArray>this.contactForm.controls['Emails']).push(
            new FormControl("",
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ));
    }

    onRemoveEmail(index: number) {
        (<FormArray>this.contactForm.controls['Emails']).removeAt(index);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private navigateBack() {
        this.contactModal.close();
        //this.router.navigate(['../'], {relativeTo: this.route, preserveQueryParams: true});
    }
}
