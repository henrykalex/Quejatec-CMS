import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './views/home/home.component';
import { ComplainsComponent } from './views/complains/complains.component';
import { ComplainViewComponent } from './views/complain-view/complain-view.component';
import { ScoresComponent } from './views/scores/scores.component';
import { SpaceGroupsComponent } from './views/space-groups/space-groups.component';
import { SpaceGroupViewComponent } from './views/space-group-view/space-group-view.component';
import { SpaceViewComponent } from './views/space-view/space-view.component';
import { AdminsComponent } from './views/admins/admins.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { UsersComponent } from './views/users/users.component';
import { UserViewComponent } from './views/user-view/user-view.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'quejas', component: ComplainsComponent },
          { path: 'queja', component: ComplainViewComponent },
          { path: 'queja/:id', component: ComplainViewComponent },
          { path: 'scores', component: ScoresComponent },
          { path: 'space-groups', component: SpaceGroupsComponent },
          { path: 'space-group', component: SpaceGroupViewComponent },
          { path: 'space-group/:id', component: SpaceGroupViewComponent },
          { path: 'space-group/:id/space', component: SpaceViewComponent },
          { path: 'space-group/:id/space/:subId', component: SpaceViewComponent },
          { path: 'administradores', component: AdminsComponent },
          { path: 'administrador', component: AdminViewComponent },
          { path: 'administrador/:id', component: AdminViewComponent },
          { path: 'users', component: UsersComponent },
          { path: 'user/:id', component: UserViewComponent },
          { path: '**', redirectTo: 'home' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
