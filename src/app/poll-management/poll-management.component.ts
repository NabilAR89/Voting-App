import {
  Component,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-poll-management',
  templateUrl: './poll-management.component.html',
})
export class PollManagementComponent implements OnInit {
  public pollDetails:any;
  public subscription: Subscription;
  // public dataSourceFinal:any = {
  //   question: '',
  //   options: []
  // };

  constructor(
    private pollService: PollService
  ) {}

  ngOnInit(): void {

  }


  public updatePollDetails(event:any):void{
    this.pollDetails = event;
    this.updateDataSource(this.pollDetails);
  }

  // private updateDataSource(pollDetails:any){

  //   let dataSource:any = {};

  //   dataSource.question = pollDetails.pollQuestion;
  //   dataSource.options = [];
  //   let pollOptions:any[] = pollDetails.pollOptions;

  //   pollOptions.forEach((res, index) => {
  //     let option:any = {};
  //     option.index = index;
  //     option.count = 0;
  //     option.percentage = 0;
  //     option.label = res.pollOption ? res.pollOption : '__';
  //     dataSource.options.push(option);
  //   });

  //   this.pollService.setDataSource(dataSource);
  // }

  private updateDataSource(pollDetails:any){
      let dataSource:any = {};

      this.subscription = this.pollService.getDataSource().subscribe(result => {
        dataSource = result;
      });

      dataSource.question = pollDetails.pollQuestion;

      // this.pollService.setDataSource(this.dataSource);

      let dataSourceOptions:any[] = dataSource.options;

      if(dataSourceOptions.length ==0){
        //console.log("no options");
        let pollOptions:any[] = pollDetails.pollOptions;
        pollOptions.forEach((res, i) => {
          let option:any = {};
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
            let option:any = {};
            option.count = 0;
            option.label = res.pollOption ? res.pollOption : '__';
            dataSourceOptions.push(option);
          }
        });

      }
      //this.dataSourceFinal = dataSource;
      console.log("ds", dataSource);
      this.pollService.setDataSource(dataSource);
  }

  public addVote(event:number){
      let res:any;
      this.subscription = this.pollService.getDataSource().subscribe(result => {
          res = result;
      });
      res.options[event].count++;
      this.subscription.unsubscribe();
  }

  public deletePollOption(index:number){
    let res:any = {};
    let resOptions:any[];
    this.subscription = this.pollService.getDataSource().subscribe(result => {
      res = result;
      resOptions = res.options;
      resOptions.forEach((element,i)=>{
        if(i==index) resOptions.splice(i,1);
      });
    });
    this.subscription.unsubscribe();
  }

  public resetPoll()
  {
    let ds:any = {
        question: '',
        options: []
      };
    this.pollService.setDataSource(ds);
  }
}
