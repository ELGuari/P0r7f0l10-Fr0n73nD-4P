import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../components/model/experiences';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  apiUrl = "https://apelg.herokuapp.com/experience/";

  constructor(private http: HttpClient) { }

  public listJob(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl + 'details')
  }


  public detailJob(id: number): Observable<Job> {
    console.log(this.apiUrl + `view/${id}`);
    return this.http.get<Job>(this.apiUrl + `view/${id}`);
  }

  public saveJob(Job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl + 'create/1', Job);
  }

  public updateJob(id: number, Job: Job): Observable<any> {

    console.log(this.http.put<any>(this.apiUrl + `update${id}`, Job));
    return (this.http.put<any>(this.apiUrl + `update/${id}`, Job));

  }

  public deleteJob(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + `delete/${id}`);
  }



}
