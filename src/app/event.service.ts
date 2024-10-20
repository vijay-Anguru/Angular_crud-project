// services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://localhost:44314/'; // Adjust as necessary

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
   
    return this.http.get<Event[]>(this.apiUrl + 'api/event');
  }

  createEvent(event: Event): Observable<Event> {
    
    return this.http.post<Event>(this.apiUrl + 'api/event' , event);
  }

  updateEvent(id, event: Event): Observable<Event> {
    return this.http.put<Event>(this.apiUrl + 'api/event/update/' + id, event);
  }

  getEventById(id){
    return this.http.get<Event>(this.apiUrl + 'api/event/'  + id);
  }

  deleteEvent(id) {
    return this.http.delete(this.apiUrl + 'api/event/'  + id);
  }



}
