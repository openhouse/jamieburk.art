import {
  mediaEvidenceRecordSchema,
  type MediaEvidenceRecord
} from "./schemas.ts";

const mediaEvidenceRecordsInput = [
  {
    id: "callnyc-digital-district-photo-record",
    sourceId: "callnyc-digital-district-participant-photo",
    rightsStatus: "Photographer-rights review pending",
    consentStatus: "Participant and publication consent review pending",
    eventAssociation: "verified",
    visibleEvidence: [
      "Placard reading 'Digital District - Help improve City Council District office operations'",
      "Participant archive associates the photograph with January 30, 2016 at approximately 2:10 p.m."
    ],
    captionPublic:
      "Participant photograph of a Digital District discussion; publication restricted pending rights and consent review.",
    captionArchival:
      "The photograph supports the visible placard wording and event association only; it does not establish the full agenda, formal event title, or event start time.",
    cropRestrictions: [
      "Do not publish or crop before photographer-rights, participant, caption, and crop review."
    ]
  }
] satisfies MediaEvidenceRecord[];

export const mediaEvidenceRecords = mediaEvidenceRecordSchema
  .array()
  .parse(mediaEvidenceRecordsInput);
