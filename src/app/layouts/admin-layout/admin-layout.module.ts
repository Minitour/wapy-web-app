import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
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

// INTERNAL COMPONENTS

import { MyStoresComponent } from 'src/app/pages/my-stores/my-stores.component';
import { StoreDetailsComponent } from 'src/app/pages/store-details/store-details.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductDetailsComponent } from 'src/app/pages/product-details/product-details.component';
import { AddProductPopupComponent } from 'src/app/pages/products/add-product-popup/add-product-popup.component';
import { FileDropDirective } from 'src/app/directives/file-drop.directive';

// MATERIAL DESIGN

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { CameraDetailsComponent } from 'src/app/pages/camera-details/camera-details.component';

// file upload
import { FileUploadModule } from 'ng2-file-upload';

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
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FileUploadModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    MyStoresComponent,
    StoreDetailsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    AddProductPopupComponent,
    FileDropDirective,
    CameraDetailsComponent
  ],
  entryComponents: [
    AddProductPopupComponent
  ]
})

export class AdminLayoutModule { }
