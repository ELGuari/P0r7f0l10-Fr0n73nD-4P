import { HttpClient } from '@angular/common/http';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skills } from '../components/model/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  
  apiUrl="https://apelg.herokuapp.com/skill/";

  constructor(private http: HttpClient) { }

  public listSkills(): Observable<Skills[]>{
    return this.http.get<Skills[]>(this.apiUrl + 'details')
  }

  public detail(id: number): Observable<Skills> {
    console.log("URL: "+ this.apiUrl + 'skill/' + id);
    return this.http.get<Skills>(this.apiUrl + 'skill/' + id);
  }

  
  public save(skill: Skills): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'create/1', skill);
  }

  public update(id: number, skill: Skills): Observable<any> {
    console.log("URL UPDATE: " + this.apiUrl + `update/${id}`, "Clase" + skill);
    return this.http.put<any>(this.apiUrl + `update/${id}`, skill);
  }

  public delete(id: number): Observable<any> {
    console.log(id)
    return this.http.delete<any>(this.apiUrl + 'delete/' + id);
  }
}
