// speaker-list.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Speaker } from 'src/models/speaker.model';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
})
export class SpeakerListComponent implements OnInit {
  @Input() sessionId: number;
  speakers: Speaker[] = [];

  constructor(private speakerService: SpeakerService) {}

  ngOnInit() {
    this.loadSpeakers();
  }

  loadSpeakers() {
    this.speakerService.getSpeakers(this.sessionId).subscribe((speakers) => (this.speakers = speakers));
  }

 
}
