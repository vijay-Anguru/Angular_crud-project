// event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/models/event.model';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  events = []
  sessions: any;
  speakers: any;
  session: any[]=[];

  // events = [ 'Movie' , 'Music','Sports'   ];
  constructor(private eventService: EventService, private router: Router, private SessionService : SessionService,  private SpeakerService : SpeakerService) {

    this.getEvents()
  }

  ngOnInit() {
    this.loadEvents();
    this.getEvents()
    this.getSessionList()
    this.getspeakerList()
    const storedData = localStorage.getItem('loginDetails');
    const loginDetails = JSON.parse(storedData);


    this.events.push(loginDetails.eventName)


  }

  loadEvents() {
    this.eventService.getEvents().subscribe((events) => (this.events = events));
  }

  createEvent() {
    console.log('Am triggered');
    this.router.navigate(['/events/create']);
    // Logic to open a modal for creating a new event
  }
  createSession() {
    console.log('Am triggered');
    this.router.navigate(['/session/create']);
    // Logic to open a modal for creating a new event
  }
  createSpeaker(){
    this.router.navigate(['speaker/create'])
  }
  getEvents(): void {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events['Data'];
      //console.log(events);

    }, (error) => {
      console.error('Error getting events:', error);
    });
  }

  editsession() {
    this.router.navigate(['/session/create'],);
    // Logic to open a modal for editing the event

  }
  editEvent(event: Event) {
    this.router.navigate(['/events/create'],);
    // Logic to open a modal for editing the event

  }
  
  editSpeaker() {
    this.router.navigate(['/speaker/create'],);
   

  }

  deleteEvent(id) {
    // this.events.splice(i, 1);
    this.eventService.deleteEvent(id).subscribe(res => {
      console.log(id);
      this.getEvents()
      this.getSessionList()
      this.getspeakerList()
    }
    );


  }
  deletesession(id) {
    //  this.session.splice(i, 1);
     this.SessionService.deleteSession(id).subscribe(res => {
      console.log(id);
     }
     );
    this.getEvents()
    this.getSessionList()
    this.getspeakerList()
  }

  deletespeaker(id) {
    //  this.speaker.splice(i, 1);
     this.SpeakerService.deleteSpeaker(id).subscribe(res => {
      console.log(id);
     }
     );
    this.getEvents()
    this.getSessionList()
    this.getspeakerList()
  }

getSessionList(){
  this.SessionService.getSessions().subscribe(x => {

    console.log(x);
    this.sessions = x['Data'];
  },(error) => {
    console.error('Error getting session:', error);
  })
}


getspeakerList(){
  this.SpeakerService.getSpeakers().subscribe(res => {

    this.speakers = res['Data']
    console.log(this.speakers );
  })
}
getSpeaker(): void {
  this.SpeakerService.getSpeakers().subscribe((Speakers) => {
    this.speakers = this.speakers['Data'];
    //console.log(events);

  }, (error) => {
    console.error('Error getting speakers:', error);
  });
}

logout() {
  // Clear the logged-in user's info from localStorage
  localStorage.removeItem('loggedInUser');
  alert('Logged out successfully!');
  this.router.navigate(['/login']);
}

}
