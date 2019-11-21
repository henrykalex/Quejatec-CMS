import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home/home.component';
import { ComplainViewComponent } from './views/complain-view/complain-view.component';
import { ComplainsComponent } from './views/complains/complains.component';
import { ScoresComponent } from './views/scores/scores.component';
import { UsersComponent } from './views/users/users.component';
import { UserViewComponent } from './views/user-view/user-view.component';
import { AdminsComponent } from './views/admins/admins.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { SpaceGroupsComponent } from './views/space-groups/space-groups.component';
import { SpaceGroupViewComponent } from './views/space-group-view/space-group-view.component';
import { SpaceViewComponent } from './views/space-view/space-view.component';
import { AdminComponent } from './admin/admin.component';

import { AdminRoutingModule } from './admin-routing.module';

import {
  MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule,
  MatButtonModule,
} from '@angular/material';

import { FormModule } from './app-modules/form-module';
import { TableModule } from './app-modules/table-module';
import { AppServicesModule } from './app-modules/app-services-module';

@NgModule({
  declarations: [
    HomeComponent,
    ComplainViewComponent, ComplainsComponent, ScoresComponent,
    UsersComponent, UserViewComponent, AdminsComponent,
    AdminViewComponent, SpaceGroupsComponent, SpaceGroupViewComponent,
    SpaceViewComponent, AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule,
    MatButtonModule,
    FormModule,
    TableModule,
    AppServicesModule
  ]
})
export class AdminModule { }
