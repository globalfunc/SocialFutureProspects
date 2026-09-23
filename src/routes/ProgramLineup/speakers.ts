// Confirmed-speaker programme content for the /program-lineup page. Hand-curated
// event copy (topic, subtitle, assigned Sofia timeslot) — there's no seed-data
// field for any of this, so it lives here rather than being bolted onto the
// Prospect model for a one-off public page. Edit src/data/programLineup.json to
// add/change a speaker; the id must match the prospects/<id>/photo.<ext>
// folder convention (InitialsAvatar) so the photo resolves automatically.
import speakersJson from "../../data/programLineup.json";

export interface SpeakerBg {
  // Only set when the speaker's own name has a standard Cyrillic spelling
  // (Bulgarian speakers); foreign names stay in Latin script even in BG copy.
  name?: string;
  country: string;
  occupation: string;
  time: string;
  topicTitle: string;
  topicSubtitle: string | null;
}

export interface Speaker {
  id: string;
  name: string;
  country: string;
  occupation: string;
  timeSofia: string;
  topicTitle: string;
  topicSubtitle: string | null;
  bg: SpeakerBg;
}

// A schedule gap (e.g. a break) rather than a person — kept out of the
// Speaker shape so break rows never need a fake country/occupation/photo.
export interface ScheduleBreak {
  id: string;
  isBreak: true;
  timeSofia: string;
  label: string;
  bg: {
    time: string;
    label: string;
  };
}

export type ProgramItem = Speaker | ScheduleBreak;

export function isBreak(item: ProgramItem): item is ScheduleBreak {
  return "isBreak" in item && item.isBreak === true;
}

export const speakers = speakersJson as ProgramItem[];
