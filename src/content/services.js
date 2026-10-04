// Service groups and the full list of services. Text lives in the
// translation dictionaries (src/i18n) under services.groups / services.items.
export const serviceGroups = [
  {
    id: 'pain',
    icon: 'posture',
    services: ['painManagement', 'manualTherapy', 'posturalAssessment', 'musculoskeletal', 'workInjuries'],
  },
  {
    id: 'injury',
    icon: 'bandage',
    services: ['orthopaedic', 'postOperative', 'sports', 'amputee'],
  },
  {
    id: 'joints',
    icon: 'spine',
    services: ['spineTreatment', 'jointRestoration', 'jointReplacement', 'footCorrection'],
  },
  {
    id: 'neuro',
    icon: 'neuro',
    services: ['neuro', 'stroke'],
  },
  {
    id: 'ages',
    icon: 'family',
    services: ['pediatric', 'geriatric'],
  },
  {
    id: 'specialist',
    icon: 'spark',
    services: ['homeSessions', 'dryNeedling', 'kinesiotaping', 'electrotherapy', 'cupping', 'orthotics', 'mobilityAids', 'pelvicFloor'],
  },
];

// Services that carry the unverified "UK certified" claim. Only shown when
// publication.ukCertifiedApproved is true.
export const ukCertifiedServices = ['manualTherapy', 'dryNeedling'];

export const allServiceIds = serviceGroups.flatMap((g) => g.services);
