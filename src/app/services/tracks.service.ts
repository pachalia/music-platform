import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tracks} from "../interfaces/track-interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class TracksService{


  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Tracks[]> {
    return this.http.get<Tracks[]>(environment.host+'tracks')
  }

  delete(id:number): Observable<void> {
    return this.http.delete<void>(environment.host+`tracks/${id}`)
  }
}
