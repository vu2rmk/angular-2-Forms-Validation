import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'reactive-form',
    templateUrl: 'reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {

    form: FormGroup;
    formErrors = {
        name: '',
        username: '',
        addresses: [
            { city: '', country: '' }
        ]
    };
    validationMessages = {

        name: {
            required: 'Name is required',
            minlength: 'Name must be at least 3 characters',
            maxlength: 'Name can\'t be longer than 8 characters'
        },
        username: {
            required: 'Username is required',
            minlength: 'Username must be at least 3 characters',
        },
        addresses: {
            city: {
                required: "City is required",
                minlength: "City must be at least 3 characters"
            },
            country: {
                required: "Country is required"
            }
        }
    };
    constructor(private fb: FormBuilder) { }

    ngOnInit() {

        this.buildForm();
    }

/**    Build the initial form */
    buildForm() {

        // this.form = new FormGroup({
        //     name : new FormControl(''),
        //     username: new FormControl('')
        // });

        this.form = this.fb.group({
            name: ['', [Validators.minLength(3), Validators.maxLength(8)]],
            username: ['', Validators.minLength(3)],
            addresses: this.fb.array([
                this.createAddress()
            ])
        });

        this.form.valueChanges.subscribe(data => { this.validateForm() });
    }

/**
 * Validate the entire form
 */
    validateForm() {

        // this.nameError = '';
        // this.usernameError = '';

        // let name = this.form.get('name');
        // let username = this.form.get('username');

        // if (name.invalid && name.dirty) {
        //     if (name.errors['required'])
        //         this.nameError = 'Name is required';

        //     if (name.errors['minlength'])
        //         this.nameError = 'Name must be at least 3 characters';

        //     if (name.errors['maxlength'])
        //         this.nameError = 'Name can\'t be more than 8 characters';
        // }

        // if (username.invalid && username.dirty) {
        //     if (username.errors['required'])
        //         this.usernameError = 'Username is required';

        //     if (username.errors['minlength'])
        //         this.usernameError = 'Username must be at least 3 characters';

        //loop over the form erros field names
        for (let field in this.formErrors) {

            //clear that input field errors
            this.formErrors[field] = '';

            //grab an input field by name
            let input = this.form.get(field);

            if (input.invalid && input.dirty) {

                for (let error in input.errors) {

                    //assign the type of error message to the variable
                    this.formErrors[field] = this.validationMessages[field][error];
                }
            }
        }
        //this.usernameError = 'Username is required';
        this.validateAddresses();
    }

/**
 * Validate the addresses form array
 */
    validateAddresses() {

        //grab the addresses form array
        let addresses = <FormArray>this.form.get('addresses');

        //clear the form formErrors
        this.formErrors.addresses = [];

        //loop through haowever many formgroups are in the FormArray
        let n = 1;

        while (n <= addresses.length) {

            //add the clear errors
            this.formErrors.addresses.push({ city: '', country: '' });

            //grab the specific group
            let address = <FormGroup>addresses.at(n - 1);

            //validate that specific group
            //loop through the groups controls
            for (let field in address.controls) {
                //get the form control
                let input = address.get(field);

                //do the validation and save the errors to formErrors if necessary
                if (input.invalid && input.dirty) {

                    for (let error in input.errors) {
                        this.formErrors.addresses[n - 1][field] = this.validationMessages.addresses[field][error];

                    }
                }
            }
            n++;    
        }
    }

    createAddress(){

        return this.fb.group({
               city: ['',Validators.minLength(3)],
            country: ['']
        })
    }
    addAddress() {

        let addresses = <FormArray>this.form.get('addresses');

        addresses.push(this.createAddress());

    }

    removeAddress(i) {

        let addresses = <FormArray>this.form.get('addresses');

        addresses.removeAt(i);

    }
    processForm() {

        console.log('processing');
    }
}