import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollManagementComponent } from './poll-management.component';

const routes: Routes = [
  {
    path: '',
    component: PollManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollManagementRoutingModule {}
