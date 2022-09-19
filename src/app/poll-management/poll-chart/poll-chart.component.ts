import {
  Component,
  OnInit
} from '@angular/core';
import { DataSourceOptionsContract } from 'src/app/models/data-source-options.contract';
import { DataSourceContract } from 'src/app/models/data-source.contract';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-chart',
  templateUrl: './poll-chart.component.html',
})
export class PollChartComponent implements OnInit {
  public dataSource: DataSourceContract;

  constructor(
    private pollService:PollService
  ) {}

  ngOnInit(): void {
    this.pollService.getDataSource().subscribe(res => {
      this.dataSource = res;
    })
  }

  public getTotalVotes():number{
    let options:DataSourceOptionsContract[] = this.dataSource.options as DataSourceOptionsContract[];
    let count:number = 0;
    options.forEach(res => {
      if(res){
        count += res.count as number;
      }
    })
    return count;
  }

  public getPercentage(value:number): number{
      let total =  this.getTotalVotes();
      if(value) {
        let perc = Math.round((value / total) * 100);
        return perc;
      }
      return 0;
  }
}
