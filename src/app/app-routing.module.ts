import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'poll',
        pathMatch: 'full'
      },
      {
        path: 'poll',
        loadChildren: () =>
          import('./poll-management/poll-management.module').then(
            (m) => m.PollManagementModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
