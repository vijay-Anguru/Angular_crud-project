import { Session } from "./session.model";

export interface Event {
    id: number;
    eventName: string;
    eventDate: Date;
    location: string;
    description: string;
    organizer: string;
    sessions?: Session[];
  }