import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { FiltroUsuarioPipe } from '../pipes/filtro-usuario.pipe';
import { SharedDocsComponent } from './shared-docs/shared-docs.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UploadComponent,
    ListComponent,
    ProfileComponent,
    UserListComponent,
    FiltroUsuarioPipe,
    SharedDocsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    RouterModule,
    SharedModule
  ]
})
export class DashboardModule { }
