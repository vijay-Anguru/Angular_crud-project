// services/speaker.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Speaker } from '../models/speaker.model';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService {
  private apiUrl = 'https://localhost:44314/api/speaker'; // Adjust as necessary

  constructor(private http: HttpClient) {}

  getSpeakers(): Observable<Speaker[]> {
    return this.http.get<Speaker[]>(this.apiUrl);
  }

  createSpeaker(speaker) {
    return this.http.post(this.apiUrl, speaker);
  }
  getspeakerById(id){
    return this.http.get<Speaker>(this.apiUrl  + '/' + id);
  }

 
  updateSpeaker(id,speaker: Speaker): Observable<Speaker> {
    return this.http.put<Speaker>(`${this.apiUrl + '/update/'}/${id}`, speaker);
  }

  deleteSpeaker(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  



}
