import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router,private firebase: AngularFireAuth) {
     // add logic if user is logged in, else redirect.
    
    this.firebase.authState.subscribe(currentUser => {
      console.log(currentUser);
      if (currentUser) {
        // load view.
        this.isLoggedIn = true;
      } else {
        // route to login.
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() { 
  }

}
