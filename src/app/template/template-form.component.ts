import { Component, OnInit } from '@angular/core';

export class User{

    name:string;
    username:string;
}

@Component({
    styleUrls    : ['template-form.component.css'],
    selector: 'template-form',
    templateUrl: 'template-form.component.html'
})
export class TemplateFormComponent implements OnInit {
   
   user: User;

   submitted: boolean = false;

   constructor(){}

   get diagnostic(){
    
    return JSON.stringify(this.user);
   }

   ngOnInit(){
        this.user = {
            name:'',
            username:''
        };
   }

   processForm(){
       console.log(this.user);

       this.submitted = true;
   }
}