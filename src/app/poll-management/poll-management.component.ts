import {
  Component,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DataSourceOptionsContract } from '../models/data-source-options.contract';
import { DataSourceContract } from '../models/data-source.contract';
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-poll-management',
  templateUrl: './poll-management.component.html',
})
export class PollManagementComponent implements OnInit {
  public pollDetails:any;
  public subscription: Subscription;

  constructor(
    private pollService: PollService
  ) {}

  ngOnInit(): void {

  }


  public updatePollDetails(event:any):void{
    this.pollDetails = event;
    this.updateDataSource(this.pollDetails);
  }

  private updateDataSource(pollDetails:any){
      let dataSource:DataSourceContract = {};

      this.subscription = this.pollService.getDataSource().subscribe(result => {
        dataSource = result;
      });

      dataSource.question = pollDetails.pollQuestion;


      let dataSourceOptions:DataSourceOptionsContract[] = dataSource.options as DataSourceOptionsContract[];

      if(dataSourceOptions.length ==0){
        let pollOptions:any[] = pollDetails.pollOptions;
        pollOptions.forEach((res, i) => {
          let option:DataSourceOptionsContract = {};
          option.count = 0;
          option.label = res.pollOption ? res.pollOption : '__';
          dataSourceOptions.push(option);
        });
      } else {
        let pollOptions:any[] = pollDetails.pollOptions;
        pollOptions.forEach((res, i) => {
          let exist:boolean = false;
          dataSourceOptions.forEach((element,j) => {
            if(i == j)
            {
              element.label =  res.pollOption ? res.pollOption : '__';
              exist = true;
              return;
            }
          });
          if(!exist)
          {
            let option:DataSourceOptionsContract = {};
            option.count = 0;
            option.label = res.pollOption ? res.pollOption : '__';
            dataSourceOptions.push(option);
          }
        });

      }
      this.pollService.setDataSource(dataSource);
  }

  public addVote(event:number){
      let res:DataSourceContract;
      let options:DataSourceOptionsContract[] = [];
      let count:number = 0;
      this.subscription = this.pollService.getDataSource().subscribe(result => {
          res = result;
          if (res.options){
            options = res.options!;
            count = res.options[event].count ?? 0;
            count++;
            res.options[event].count = count;
          }
      });
      // options[event]!.count++ as number;
      this.subscription.unsubscribe();
  }

  public deletePollOption(index:number){
    let res:DataSourceContract = {};
    let resOptions:DataSourceOptionsContract[] = [];
    this.subscription = this.pollService.getDataSource().subscribe(result => {
      res = result;
      resOptions = res.options!;
      resOptions.forEach((element,i)=>{
        if(i==index) resOptions.splice(i,1);
      });
    });
    this.subscription.unsubscribe();
  }

  public resetPoll()
  {
    let dataSource:DataSourceContract = {
        question: '',
        options: []
      };
    this.pollService.setDataSource(dataSource);
  }
}
