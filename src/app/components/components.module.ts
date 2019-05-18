import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardViewComponent } from './card-view/card-view.component';
import { ChartComponent } from './bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ItemViewComponent } from './item-view/item-view.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { FileDropModule } from 'ngx-file-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { TableViewComponent } from './table-view/table-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ChartsModule,
    FileDropModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CardViewComponent,
    ChartComponent,
    ItemViewComponent,
    UploadFormComponent,
    TableViewComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CardViewComponent,
    ChartComponent,
    ItemViewComponent,
    UploadFormComponent,
    TableViewComponent
  ]
})
export class ComponentsModule { }
