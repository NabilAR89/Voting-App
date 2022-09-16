import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  public pollDetails$ = new BehaviorSubject<any>(null);
  public pollAnswer$ = new BehaviorSubject<any>(null);
  public dataSource$ = new BehaviorSubject<any>({question: '', options: []});

  constructor() {}

  public getPollDetails(): Observable<any> {
    return this.pollDetails$.asObservable();
  }

  public setPollDetails(pollDetails:any):void {
    this.pollDetails$.next(pollDetails);
  }

  public getDataSource(): Observable<any> {
    return this.dataSource$.asObservable();
  }

  public setDataSource(value:any):void {
    this.dataSource$.next(value);
  }
}
