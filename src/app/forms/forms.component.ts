import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormBean } from '../model/form';
import {
  Country,
  ParentErrorStateMatcher,
  PhoneValidator
} from '../validators';


@Component({
  selector: 'app-forms-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {

  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;

  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = [
    "Male",
    "Female",
    "Other"
  ];

  countries = [
    new Country('US', 'United States')
  ];


  validation_messages = {
    'firstname': [
      { type: 'required', message: 'First name is required' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required' }
    ],
    'gender': [
      { type: 'required', message: 'Please select your gender' },
    ],
    'phone': [
      { type: 'required', message: 'Phone is required' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'zipcode':[
      {type: 'required', message: 'Zip code is required'}
    ],
    'enquirymessage':[
      {type: 'maxlength', message:'Enquiry cannot be more than 256 characters long'}
    ]
  };

  constructor(private fb: FormBuilder) { }

  model = new FormBean();

  newFormBean() {
    this.model = new FormBean();
  }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // country & phone validation
    let country = new FormControl(this.countries[0], Validators.required);

    let phone = new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        PhoneValidator.validCountryPhone(country)
      ])
    });

    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    // user details form validations
    this.userDetailsForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      gender: new FormControl(this.genders[0], Validators.required),
      country_phone: this.country_phone_group,
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      zipcode: ['', Validators.required],
      enquirymessage:['', Validators.maxLength(256)]
    });
  }

  onSubmitAccountDetails(value){
    console.log(value);
  }

  onSubmitUserDetails(value){
    console.log(value);
    //this.service.submitData(this.model);
  }

}
