import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  constructor(
    private firebase: AngularFireAuth,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  onSubmit(){
    var userEmail = this.loginForm.controls.email.value;
    var password = this.loginForm.controls.password.value;

    this.firebase.auth.signInWithEmailAndPassword(userEmail,password)
    .then(userCred => {
      console.log("logged in")
      // redirect to dashboard
      this.router.navigate(['']);
    })
    .catch(reason=> {
      console.log("someting went wrong");
      console.log(reason);
    })
  }

}
