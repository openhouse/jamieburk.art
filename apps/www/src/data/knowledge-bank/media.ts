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
    eventAssociation: "probable",
    visibleEvidence: [
      "Placard reading 'Digital District - Help improve City Council District office operations'",
      "Participant archive associates the photograph with the January 2016 gathering"
    ],
    captionPublic:
      "Participant photograph of a Digital District discussion; publication restricted pending rights and consent review.",
    captionArchival:
      "The image supports the visible placard wording and probable event association only; it does not establish the full event title, agenda, facilitator, roster, or schedule.",
    cropRestrictions: [
      "Do not publish or crop before photographer-rights, participant, caption, and crop review."
    ]
  }
] satisfies MediaEvidenceRecord[];

export const mediaEvidenceRecords = mediaEvidenceRecordSchema
  .array()
  .parse(mediaEvidenceRecordsInput);
