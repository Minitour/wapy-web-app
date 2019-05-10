import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { MyStoresComponent } from 'src/app/pages/my-stores/my-stores.component';
import { StoreDetailsComponent } from 'src/app/pages/store-details/store-details.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductDetailsComponent } from 'src/app/pages/product-details/product-details.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'stores',         component: MyStoresComponent },
    { path: 'store/:id', component: StoreDetailsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
];
