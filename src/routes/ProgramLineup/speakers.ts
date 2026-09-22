// Confirmed-speaker programme content for the /program-lineup page. Hand-curated
// event copy (topic, subtitle, assigned Sofia timeslot) — there's no seed-data
// field for any of this, so it lives here rather than being bolted onto the
// Prospect model for a one-off public page. Edit src/data/programLineup.json to
// add/change a speaker; the id must match the prospects/<id>/photo.<ext>
// folder convention (InitialsAvatar) so the photo resolves automatically.
import speakersJson from "../../data/programLineup.json";

export interface SpeakerBg {
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

export const speakers = speakersJson as Speaker[];
