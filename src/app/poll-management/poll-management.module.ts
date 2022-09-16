import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PollChartComponent } from './poll-chart/poll-chart.component';
import { PollCreationComponent } from './poll-creation/poll-creation.component';
import { PollManagementRoutingModule } from './poll-management-routing.module';
import { PollManagementComponent } from './poll-management.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';

@NgModule({
  imports: [SharedModule, PollManagementRoutingModule],
  declarations: [
    PollManagementComponent,
    PollCreationComponent,
    PollVoteComponent,
    PollChartComponent
  ],
  providers: [],
})
export class PollManagementModule {}
