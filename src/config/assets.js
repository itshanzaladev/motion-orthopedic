// Central photo manifest. `source` is matched against the files in /images
// by base name (case-insensitive, any common image extension), so renaming
// "Clinic.webp" to "clinic.jpg" keeps working.
//
// kind:
//   clinic  – rooms, equipment, signage; no identifiable people
//   patient – shows a patient; public use needs patient permission
//   doctor  – owner-designated doctor photo; public use needs identity check
// focus: CSS object-position used when the photo is cropped, chosen so faces,
//        hands and the treatment area stay in frame.
// Alt text describes only what is visible. It never names a diagnosis.
export const photos = {
  clinicReception: {
    source: 'Clinic',
    kind: 'clinic',
    width: 765,
    height: 1020,
    focus: '50% 30%',
    alt: {
      en: 'Reception desk at Motion Orthopedic with the clinic logo on the wall',
      ur: 'موشن آرتھوپیڈک کا استقبالیہ کاؤنٹر، پیچھے دیوار پر کلینک کا لوگو',
    },
  },
  doctorDesignated: {
    source: 'Dr Mahnoor',
    kind: 'doctor',
    width: 765,
    height: 1020,
    focus: '40% 40%',
    alt: {
      en: 'A person seen from behind using a wall-mounted shoulder wheel',
      ur: 'دیوار پر لگا شولڈر وہیل استعمال کرتا ایک شخص، پیچھے سے لی گئی تصویر',
    },
  },
  treatmentRoomEquipment: {
    source: '1',
    kind: 'clinic',
    width: 765,
    height: 1020,
    focus: '50% 60%',
    alt: {
      en: 'Treatment room with a padded table, electrotherapy unit, treadmill and parallel bars',
      ur: 'علاج کا کمرہ جس میں بستر، الیکٹروتھراپی مشین، ٹریڈمل اور پیرالل بارز ہیں',
    },
  },
  supportsShelves: {
    source: '2',
    kind: 'clinic',
    width: 765,
    height: 1020,
    focus: '50% 30%',
    alt: {
      en: 'Shelves holding orthotic supports, braces and clinical supplies',
      ur: 'شیلف جن پر آرتھوٹک سپورٹس، بریسز اور طبی سامان رکھا ہے',
    },
  },
  kneelingStretch: {
    source: '3',
    kind: 'patient',
    width: 901,
    height: 1020,
    focus: '55% 55%',
    alt: {
      en: 'A person doing a kneeling stretch on an exercise mat beside a gym ball',
      ur: 'ورزش کی چٹائی پر گھٹنوں کے بل اسٹریچ کرتا ایک شخص، ساتھ جم بال رکھی ہے',
    },
  },
  shoulderMassageDevice: {
    source: '4',
    kind: 'patient',
    width: 765,
    height: 1020,
    focus: '55% 55%',
    alt: {
      en: 'A handheld massage device being used on a seated person’s shoulder',
      ur: 'بیٹھے ہوئے شخص کے کندھے پر ہاتھ والی مساج مشین استعمال ہو رہی ہے',
    },
  },
  // Excluded: shows a child's open wound. Not suitable for the website.
  childLegElectrotherapy: {
    source: '5',
    kind: 'patient',
    exclude: true,
    width: 765,
    height: 1020,
    focus: '50% 50%',
    alt: { en: '', ur: '' },
  },
  paediatricToolsTable: {
    source: '6',
    kind: 'clinic',
    width: 765,
    height: 1020,
    focus: '50% 45%',
    alt: {
      en: 'Children’s shape puzzles, shoe insoles, a foot skeleton model and an electrotherapy unit on a table',
      ur: 'میز پر بچوں کی پزل، جوتوں کے انسول، پاؤں کی ہڈیوں کا ماڈل اور الیکٹروتھراپی مشین',
    },
  },
  legElectrotherapyLamp: {
    source: '7',
    kind: 'patient',
    width: 765,
    height: 1020,
    focus: '45% 50%',
    alt: {
      en: 'A lower leg on a treatment table with electrotherapy pads and a red heat lamp',
      ur: 'علاج کے بستر پر ٹانگ، جس پر الیکٹروتھراپی پیڈ لگے ہیں اور سرخ ہیٹ لیمپ کی روشنی ہے',
    },
  },
  neckDeviceTreatment: {
    source: '8',
    kind: 'patient',
    width: 765,
    height: 1020,
    focus: '55% 50%',
    alt: {
      en: 'A therapist using a handheld device on the neck and shoulder of a seated person',
      ur: 'بیٹھے ہوئے شخص کی گردن اور کندھے پر تھراپسٹ ہاتھ والا آلہ استعمال کر رہی ہیں',
    },
  },
  treatmentRoomOverview: {
    source: '9',
    kind: 'clinic',
    width: 765,
    height: 1020,
    focus: '50% 55%',
    alt: {
      en: 'Treatment room with an examination table, wall exercise equipment, parallel bars and a children’s play mat',
      ur: 'علاج کا کمرہ جس میں بستر، دیوار پر ورزش کا سامان، پیرالل بارز اور بچوں کی رنگین چٹائی ہے',
    },
  },
  parallelBarsStanding: {
    source: '10',
    kind: 'patient',
    width: 765,
    height: 1020,
    focus: '55% 35%',
    alt: {
      en: 'A person holding parallel bars while standing on a textured mat',
      ur: 'پیرالل بارز پکڑ کر کھردری چٹائی پر کھڑا ایک شخص',
    },
  },
  armElectrotherapyLamp: {
    source: '11',
    kind: 'patient',
    width: 765,
    height: 1020,
    focus: '45% 55%',
    alt: {
      en: 'A forearm resting on a pillow under a heat lamp, with electrotherapy pads attached',
      ur: 'تکیے پر رکھا بازو، ہیٹ لیمپ کے نیچے، جس پر الیکٹروتھراپی پیڈ لگے ہیں',
    },
  },
  backHeatLamp: {
    source: '12',
    kind: 'patient',
    width: 765,
    height: 1020,
    focus: '50% 50%',
    alt: {
      en: 'A person lying face down on a treatment table under a heat lamp',
      ur: 'علاج کے بستر پر الٹا لیٹا ایک شخص، اوپر ہیٹ لیمپ لگا ہے',
    },
  },
};

// ---------------------------------------------------------------------------
// TEMPORARY stock doctor portrait (Unsplash licence, free to use). It is not
// Dr. Mahnoor – replace it with her real photo; see placeholdersInPublicBuild.
// Source: unsplash.com/photos/_zbqco3m7dA
// ---------------------------------------------------------------------------
Object.assign(photos, {
  placeholderDoctor: {
    source: 'placeholders/doctor-portrait',
    kind: 'placeholder',
    width: 1000,
    height: 563,
    focus: '55% 25%',
    alt: {
      en: 'A doctor in a white coat sitting at a desk',
      ur: 'سفید کوٹ میں میز پر بیٹھی ایک ڈاکٹر',
    },
  },
});

// Curated gallery order (clinic photos). The first `galleryMax` allowed
// photos are shown.
export const galleryOrder = [
  'treatmentRoomEquipment',
  'neckDeviceTreatment',
  'doctorDesignated',
  'kneelingStretch',
  'shoulderMassageDevice',
  'treatmentRoomOverview',
  'supportsShelves',
];
export const galleryMax = 6;

// One photo per service group (src/content/services.js ids).
export const servicePhotos = {
  pain: 'shoulderMassageDevice',
  injury: 'legElectrotherapyLamp',
  joints: 'backHeatLamp',
  neuro: 'parallelBarsStanding',
  ages: 'paediatricToolsTable',
  specialist: 'armElectrotherapyLamp',
};

// Small treatment photo that overlaps the hero image on larger screens.
export const heroInsetPhoto = 'neckDeviceTreatment';

// About section: preferred photo first, falling back when not allowed.
export const aboutPhotoOrder = ['doctorDesignated', 'treatmentRoomOverview'];

// Smaller widths generated by scripts/prepare-images.mjs (never upscaled).
// The original file is also published unchanged as the largest size.
export const photoWidths = [480];
