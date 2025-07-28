import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedDocsComponent } from './shared-docs/shared-docs.component';

const routes: Routes = [{ path: '', component: DashboardComponent,
      children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'upload', component: UploadComponent },
      { path: 'list', component: ListComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UserListComponent },
      { path: 'shared-docs', component: SharedDocsComponent }
    ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
