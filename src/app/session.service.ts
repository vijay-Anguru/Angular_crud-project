// services/session.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
   private apiUrl = 'https://localhost:44314/api/session/'; // Adjust as necessary
 

  constructor(private http: HttpClient) {}

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.apiUrl);
  }

  createSession(session){
    return this.http.post(this.apiUrl , session);
  }

  getSessionById(id){
    return this.http.get<Session>(this.apiUrl  + '/' + id);
  }
  

   updateSession(id,session: Session): Observable<Session> {
     return this.http.put<Session>(`${this.apiUrl + 'update/'}/${id}`, session);
   }

   deleteSession(id) {
     return this.http.delete(this.apiUrl + id);
   }

  
}
