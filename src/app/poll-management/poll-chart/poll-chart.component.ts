import {
  Component,
  OnInit
} from '@angular/core';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-chart',
  templateUrl: './poll-chart.component.html',
})
export class PollChartComponent implements OnInit {
  public dataSource: any;
  public pollAnswers:any[] = [];
  public countObject = {};
  public totalCount:number = 0;

  constructor(
    private pollService:PollService
  ) {}

  ngOnInit(): void {
    this.pollService.getDataSource().subscribe(res => {
      this.dataSource = res;
    })
  }

  public getTotalVotes():number{
    let options:any[] = this.dataSource.options;
    let count:number = 0;
    options.forEach(res => {
      this.totalCount += res.count;
      count += res.count;
    })
    return count;
  }

  public getPercentage(value:number): number{
      let total =  this.getTotalVotes()
      let perc = Math.round((value / total) * 100);
      console.log("percentage ",perc);
      return perc;
  }
}
