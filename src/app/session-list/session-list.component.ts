// session-list.component.ts
import { Component, Input, OnInit } from '@angular/core';

import { Session } from 'src/models/session.model';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnInit {
  @Input() eventId: number;
  sessions: Session[] = [];

  constructor(private sessionService: SessionService, private router:Router,) {}

  ngOnInit() {
   
  }

}
