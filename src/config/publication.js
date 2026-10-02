// Display switches. The owner has confirmed the clinic photos and reviews
// may be used, so they are on. Preview notes are switched off.
//
// Plain JavaScript so scripts/prepare-images.mjs can apply the same rules.
export const publication = {
  // Owner-designated doctor photo and clinic/patient photos: cleared by the owner.
  doctorPortraitApproved: true,
  patientImagesApproved: true,

  // "UK certified" for manual therapy and dry needling – kept off until
  // the certification details are available.
  ukCertifiedApproved: false,

  // Stock Unsplash placeholder photos (currently unused). Shown in
  // development only unless this is true.
  placeholdersInPublicBuild: false,

  // Owner-reported review total.
  reviewCount: {
    enabled: true,
    value: 120,
    suffix: '+',
    sourceConfirmed: true,
  },

  // Yellow "Preview only" owner notes. Off for now.
  showPreviewNotes: false,
};

/** Whether a photo from the asset manifest may be used in this build. */
export function isPhotoAllowed(photo, preview) {
  if (!photo || photo.exclude) return false;
  if (preview) return true;
  if (photo.kind === 'placeholder') return publication.placeholdersInPublicBuild;
  if (photo.kind === 'doctor') return publication.doctorPortraitApproved;
  if (photo.kind === 'patient') return publication.patientImagesApproved;
  return true;
}

/** Whether a review screenshot may be published in this build. */
export function isScreenshotAllowed(review, preview) {
  if (!review || !review.screenshot) return false;
  return preview || review.screenshotCleared === true;
}
