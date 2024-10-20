// speaker-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeakerService } from '../speaker.service';
import { SessionService } from '../session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-speaker-form',
  templateUrl: './speaker-form.component.html',
})
export class SpeakerFormComponent implements OnInit {
  @Input() sessionId: number;
  speakerForm: FormGroup;
  session: any;
  speakerId: any;


  constructor(private fb: FormBuilder, private speakerService: SpeakerService,private route: ActivatedRoute,  private sessionService: SessionService,private router:Router ) {
    this.speakerForm = this.fb.group({
      SpeakerId:[0, Validators.required],
      SessionId: [0, Validators.required],
      SpeakerName: ['', Validators.required],
      SpeakerEmail: ['', [Validators.required, Validators.email]],
      SpeakerBio: [''],
    });
   
  }
  


  ngOnInit() {
    this.getsession()
 this.route.params.subscribe(param => {
  console.log(param);

  if (param.id) {
    this.speakerId = Number(param['id']);
    console.log(this.speakerId);
    this.getById(this.speakerId)
  
  }
})
  }

  // onSubmit() {
  //   const newSpeaker = { ...this.speakerForm.value, sessionId: this.sessionId };
  //   this.speakerService.createSpeaker(newSpeaker).subscribe();
  //   this.router.navigate(['/events']);
  // }
  createSpeaker(){
    if (this.speakerForm) {
  this.speakerService.createSpeaker(this.speakerForm.value).subscribe(res =>{
   console.log(res)
   this.router.navigate(['/events']);
  })
  }   
  
  }

  getsession(): void {
    this.sessionService.getSessions().subscribe((sessions) => {
      this.session = sessions['Data'];
      console.log(this.session);
  
    }, (error) => {
      console.error('Error getting session:', error);
    });
  }
  
  getById(id) {
   
    this.speakerService.getspeakerById(id).subscribe(res => {
      console.log(res);
      let data = res['Data']
      this.speakerForm.get('SpeakerId').patchValue(data.SpeakerId)
      this.speakerForm.get('SessionId').patchValue(data.SessionId)
      this.speakerForm.get('SpeakerName').patchValue(data.SpeakerName)
      this.speakerForm.get('SpeakerEmail').patchValue(data.SpeakerEmail)
      this.speakerForm.get('SpeakerBio').patchValue(data.SpeakerBio)
    })
  }
  updatespeaker(data){
    this.speakerService.updateSpeaker(this.speakerId, this.speakerForm.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['/events'])
    })
  }
}

