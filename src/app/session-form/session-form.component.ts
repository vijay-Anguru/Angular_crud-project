// session-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
})
export class SessionFormComponent implements OnInit {
  @Input() eventId: number;
  sessionForm: FormGroup;
  events: any
  // step: any;
  SessionId: any;
  speakerForm: any;
  speakerService: any;
  _SessionStartTime: any;
  constructor(private fb: FormBuilder, private sessionService: SessionService,  private route: ActivatedRoute,  private router: Router, private eventService: EventService) {
    this.sessionForm = this.fb.group({
      SessionId: [0, Validators.required],
      EventId: [ 0, Validators.required],
      SessionName: ['', Validators.required],
      SessionStartTime: ['', Validators.required],
      SessionEndTime: ['', Validators.required],
      SessionDescription: [''],
    });
  }

  ngOnInit() {
  //   this.createForm()
  
this.getEvents()
this.route.params.subscribe(param => {
  console.log(param);

  if (param.id) {
    this.SessionId = Number(param['id']);
    console.log(this.SessionId);
    this.getById(this.SessionId)
  
  }
})
}


createSession(){
  if (this.sessionForm) {
this.sessionService.createSession(this.sessionForm.value).subscribe(res =>{
 console.log(res)
 this.router.navigate(['/events']);
})
}   

}

getEvents(): void {
  this.eventService.getEvents().subscribe((events) => {
    this.events = events['Data'];
    console.log(events);

  }, (error) => {
    console.error('Error getting events:', error);
  });
}

getById(id) {
  
  this.sessionService.getSessionById(id).subscribe(res => {
    console.log(res);
    let data = res['Data']
    // this.StatusId = data.StatusId
    // console.log(this.StatusId);


    this.sessionForm.get('SessionId').patchValue(data.SessionId)
    this.sessionForm.get('EventId').patchValue(data.EventId)
    this.sessionForm.get('SessionName').patchValue(data.SessionName)
    //  this.sessionForm.get('SessionStartTime').patchValue(data.SessionStartTime)
    // this.sessionForm.get('SessionEndTime').patchValue(data.SessionEndTime)
    this.sessionForm.get('SessionDescription').patchValue(data.SessionDescription)
    const date = new Date(' 2024 Oct 12 5:32PM');
    const formattedDate = date.toISOString().slice(0, 16);

    let _SessionStartTime = _SessionStartTime(this._SessionStartTime._SessionStartTime);
    let _SessiSessionEndTime = _SessionStartTime(this._SessionStartTime._SessionStartTime);


  

  })
}
  updatesession(data){
    this.sessionService.updateSession(this.SessionId, this.sessionForm.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['/events'])
    })
  }
  onSubmit() {
  
    if (this.speakerForm) {
      this.speakerService.createSpeaker(this.speakerForm.value).subscribe((response) => {
        console.log('spekaer created successfully!');
        this.router.navigate(['/speaker']);
      }, );
    }

  }

}

