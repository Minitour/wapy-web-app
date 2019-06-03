import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/stores', title: 'Stores', icon: 'fas fa-store-alt text-red', class: '' },
  { path: '/products', title: 'Products', icon: 'fas fa-tags text-blue', class: '' },
  { path: '/user-profile', title: 'Profile', icon: 'ni-single-02 text-yellow', class: '' },

  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public username: string;
  public profilePicture: string = "assets/img/brand/no-photo.png";

  constructor(private router: Router,firebase: AngularFireAuth) {
    firebase.authState.subscribe(user => {
      if (user) {
        if (user.displayName) {
          this.username = user.displayName;
        } else {
          this.username = user.email;
        }

        if (user.photoURL) {
          this.profilePicture = user.photoURL;
        }
      }
    })
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
