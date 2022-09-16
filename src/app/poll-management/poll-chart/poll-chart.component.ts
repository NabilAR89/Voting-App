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
    // this.pollService.getPollDetails().subscribe( res => {
    //   this.pollDetails = res;
    // })

    // this.pollService.getPollAnswer().subscribe( res => {
    //   if(res){
    //     this.pollAnswers.push(res);
    //   }
    //   console.log("pollAnswers ==>", this.pollAnswers);
    //   // this.countOccurences();
    // })

    // this.pollService.getDeletedOptionIndex().subscribe( res => {
    //   console.log("removed index ==>", res);
    //   // this.pollAnswers = this.pollAnswers.filter(item => item.value !== res);
    //   console.log("updated poll answeres ==>", this.pollAnswers);
    //   // this.countOccurences();
    // })
    this.pollService.getDataSource().subscribe(res => {
      this.dataSource = res;
    })
  }

  // private countOccurences():void{
  //   this.countObject = this.pollAnswers.reduce(function (
  //     count,
  //     currentValue
  //   ) {
  //     return (
  //         count[currentValue.value] ? ++count[currentValue.value] : (count[currentValue.value] = 1),
  //         count
  //     );
  //   },
  //   {});

  //   console.log(this.countObject);
  // }
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
