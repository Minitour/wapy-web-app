import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  hasError: boolean = false;
  errorMessage: string;

  constructor(private router: Router,private firebase: AngularFireAuth,private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      'name' : ['',Validators.required],
      'email' : ['',Validators.required],
      'password' : ['',Validators.required]
    })
  }

  ngOnInit() {
  }

  async onSubmit() {
    var name = this.registerForm.controls.name.value;
    var email = this.registerForm.controls.email.value;
    var password = this.registerForm.controls.password.value;
    
    // create an account
    try {
      var cred = await this.firebase.auth.createUserWithEmailAndPassword(email,password);
      await cred.user.updateProfile({displayName:name});
      this.hasError = false;
      this.router.navigate(['']);
    }catch (error) {
      // somethign went wrong: no internet? email already in use?....
      this.hasError = true;
      this.errorMessage = error.message;
    }
  }

}
