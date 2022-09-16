import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  public pollDetails$ = new BehaviorSubject<any>(null);
  public pollAnswer$ = new BehaviorSubject<any>(null);
  public deletedOptionIndex$ = new BehaviorSubject<number>(0);

  public dataSource$ = new BehaviorSubject<any>({question: '', options: []});

  constructor() {}

  public getPollDetails(): Observable<any> {
    return this.pollDetails$.asObservable();
  }

  public setPollDetails(pollDetails:any):void {
    this.pollDetails$.next(pollDetails);
  }

  public getPollAnswer(): Observable<any> {
    return this.pollAnswer$.asObservable();
  }

  public setPollAnswer(value:any):void {
    this.pollAnswer$.next(value);
  }

  // public getDeletedOptionIndex(): Observable<number> {
  //   return this.deletedOptionIndex$.asObservable();
  // }

  // public setDeletedOptionIndex(value:number):void {
  //   this.deletedOptionIndex$.next(value);
  // }

  /******/

  public getDataSource(): Observable<any> {
    return this.dataSource$.asObservable();
  }

  public setDataSource(value:any):void {
    this.dataSource$.next(value);
  }
}
