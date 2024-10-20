// event-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  step: any;
  StatusId: any;
  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.createForm()

    this.route.params.subscribe(param => {
      console.log(param);

      if (param.id) {
        this.step = param['id']
        console.log(this.step);
        this.getById(this.step)
      }
    })


  }


  createEvent() {
    console.log('Am triggered');
    this.router.navigate(['/events']);
    // Logic to open a modal for creating a new event
  }

  createForm() {
    this.eventForm = this.fb.group({
      EventId: ['', Validators.required],
      EventName: ['', Validators.required],
      EventDate: ['', Validators.required],
      location: ['', Validators.required],
      Description: ['', Validators.required],
      Organizer: ['', Validators.required]
    });
  }
  onSubmit() {
  
    if (this.eventForm) {
      this.eventService.createEvent(this.eventForm.value).subscribe((response) => {
        console.log('Event created successfully!');
        this.router.navigate(['/events']);
      }, );
    }

  }

  updateEvent(data){
    this.eventService.updateEvent(this.step, this.eventForm.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['/events'])
    })
    
  }


  addEvent() {
console.log("hello");


if(this.StatusId == 1){
  this.eventService.updateEvent(this.step,this.eventForm.value).subscribe(res => {
    console.log(res);

  })
}else{
  this.eventService.createEvent(this.eventForm.value).subscribe(res => {
    console.log(res);

  })
}
 
    

    this.router.navigate(['/events'])
  }

  getById(id) {
    this.eventService.getEventById(id).subscribe(res => {
      console.log(res);
      let data = res['Data']
      this.StatusId = data.StatusId
      console.log(this.StatusId);
      const formattedDate = new Date(data.EventDate).toISOString().slice(0, 10);
 
      this.eventForm.get('EventId').patchValue(data.EventId)
      this.eventForm.get('EventName').patchValue(data.EventName)
      this.eventForm.get('EventDate').patchValue(formattedDate)
      this.eventForm.get('Organizer').patchValue(data.Organizer)
      this.eventForm.get('Description').patchValue(data.Description)
      this.eventForm.get('location').patchValue(data.location)
     // const formattedDate = Date.toISOString().slice(0, 16);
      const date = new Date(' 2024 Oct 12 5:32PM');

      this.eventForm.get('EventDate').patchValue(formattedDate);

    })
  }
}

