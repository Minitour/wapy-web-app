import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { ComponentsModule } from 'src/app/components/components.module';
// import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { MyStoresComponent } from 'src/app/pages/my-stores/my-stores.component';
import { StoreDetailsComponent } from 'src/app/pages/store-details/store-details.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    AngularFireAuthModule,
    ComponentsModule,
    ChartsModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    MyStoresComponent,
    StoreDetailsComponent
  ]
})

export class AdminLayoutModule {}
