import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { SessionListComponent } from './session-list/session-list.component';
import { SessionFormComponent } from './session-form/session-form.component';
import { SpeakerListComponent } from './speaker-list/speaker-list.component';
import { SpeakerFormComponent } from './speaker-form/speaker-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'events', component: EventListComponent, canActivate: [AuthGuard] },
  { path: 'events/create', component: EventFormComponent, canActivate: [AuthGuard] },
  { path: 'events/edit/:id', component: EventFormComponent, canActivate: [AuthGuard] },
  { path: 'session/create', component: SessionFormComponent, canActivate: [AuthGuard] },
 { path: 'speaker/create', component: SpeakerFormComponent,canActivate: [AuthGuard] },
  { path: 'session', component: SessionListComponent, canActivate: [AuthGuard] },
  { path: 'session/edit/:id', component: SessionFormComponent, canActivate: [AuthGuard] },
  { path: 'speaker/edit/:id', component: SpeakerFormComponent, canActivate: [AuthGuard] }
];
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    EventListComponent,
    EventFormComponent,
    SessionListComponent,
    SessionFormComponent,
    SpeakerListComponent,
    SpeakerFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
