import { Speaker } from "./speaker.model";

export interface Session {
    id: number;
    sessionName: string;
    startTime: Date;
    endTime: Date;
    description: string;
    eventId: number;
    speakers?: Speaker[];
  }


