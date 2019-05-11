import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardViewComponent } from './card-view/card-view.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ItemViewComponent } from './item-view/item-view.component';
import { UploadFormComponent } from './upload-form/upload-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ChartsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CardViewComponent,
    BarChartComponent,
    ItemViewComponent,
    UploadFormComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CardViewComponent,
    BarChartComponent,
    ItemViewComponent,
    UploadFormComponent
  ]
})
export class ComponentsModule { }
