// Patient reviews transcribed from the supplied screenshots (Reviews/ folder).
//
// Transcription rules:
//  - Copy only text that is clearly readable. Keep the reviewer's wording,
//    including their spelling. Do not strengthen or tidy the meaning.
//  - Do not add names, dates, ratings, treatments or outcomes that are not
//    visible. Relative dates ("5 months ago") are not shown because the
//    capture date is unknown.
//  - Replace phone numbers or other private details with "[removed]".
//  - If a review is shortened, set `excerpt: true`.
//  - If text is unreadable, set `needsTranscription: true` and leave `text`
//    empty instead of guessing.
//  - `translations` are labelled as translations on the page, and the
//    original text stays available.
//  - Set `source` (e.g. 'Google') only when the source is confirmed. These
//    screenshots look like Google Maps reviews, but that is not confirmed.
//  - `screenshotCleared: true` means the screenshot was checked and shows no
//    phone numbers or other unnecessary private details.
export const reviews = [
  {
    id: 'review-5',
    screenshot: '5',
    screenshotCleared: true,
    reviewer: 'Saeed Khan',
    source: null,
    rating: 5,
    language: 'en',
    text: 'I have been suffering pain in my my heels for the last 12 years. Finally I visited Dr.Mahnoor Ansari for physiotherapy. She is highly professional, caring, civilised and cooperative doctor. She is a great doctor who treats patients who have the disease and not the disease itself. It was nice experience and by the grace of Almighty Allah I passed painless day after a decade. Highly recommended for physiotherapy related consultancy and services.',
    excerpt: false,
    translations: {
      ur: 'پچھلے 12 سال سے میری ایڑیوں میں درد تھا۔ آخرکار فزیوتھراپی کے لیے ڈاکٹر ماہ نور انصاری کے پاس جانا ہوا۔ وہ نہایت پیشہ ور، خیال رکھنے والی، مہذب اور تعاون کرنے والی ڈاکٹر ہیں۔ وہ ایک بہترین ڈاکٹر ہیں جو صرف بیماری کا نہیں بلکہ بیماری میں مبتلا مریض کا علاج کرتی ہیں۔ تجربہ اچھا رہا، اور اللہ تعالیٰ کے فضل سے ایک دہائی بعد میرا ایک دن بغیر درد کے گزرا۔ فزیوتھراپی سے متعلق مشاورت اور خدمات کے لیے بھرپور سفارش۔',
    },
    needsTranscription: false,
  },
  {
    id: 'review-2',
    screenshot: '2',
    screenshotCleared: true,
    reviewer: 'Muhammad Jawad',
    source: null,
    rating: 5,
    language: 'en',
    text: 'Really great and professional services in a very decent clinical setting. must visit for any kind of choronic pain management and best Physical therapy services. Equipment is up to dated and the staff was really cooperative with compassion and highly trained physios especially Dr. Mahnoor providing best therapy services. Keep up the good work. Highly Recommended 🙌',
    excerpt: false,
    translations: {
      ur: 'ایک بہت اچھے کلینیکل ماحول میں واقعی بہترین اور پیشہ ورانہ خدمات۔ کسی بھی قسم کے دائمی درد کے انتظام اور بہترین فزیکل تھراپی خدمات کے لیے ضرور جائیں۔ آلات جدید ہیں، اور عملہ ہمدردی کے ساتھ بہت تعاون کرنے والا تھا، اور فزیوز بہت تربیت یافتہ ہیں، خاص طور پر ڈاکٹر ماہ نور بہترین تھراپی خدمات فراہم کر رہی ہیں۔ اچھا کام جاری رکھیں۔ بھرپور سفارش 🙌',
    },
    needsTranscription: false,
  },
  {
    id: 'review-6',
    screenshot: '6',
    screenshotCleared: true,
    reviewer: 'Mehak Fatima',
    source: null,
    rating: 5,
    language: 'en',
    text: 'I had a great experience with Dr. Mahnoor Ansari. She is a highly skilled and professional physiotherapist. Her treatment was very effective, and I felt significant improvement in a short time. She listens carefully and explains everything clearly. Highly recommended!',
    excerpt: false,
    translations: {
      ur: 'ڈاکٹر ماہ نور انصاری کے ساتھ میرا تجربہ بہت اچھا رہا۔ وہ نہایت ماہر اور پیشہ ور فزیوتھراپسٹ ہیں۔ ان کا علاج بہت مؤثر تھا، اور مجھے کم وقت میں نمایاں بہتری محسوس ہوئی۔ وہ غور سے سنتی ہیں اور ہر بات واضح طور پر سمجھاتی ہیں۔ بھرپور سفارش!',
    },
    needsTranscription: false,
  },
  {
    // Owner check: "The prescribed medicine worked wonders" – confirm this is
    // accurate for a physiotherapy service before public launch.
    id: 'review-1',
    screenshot: '1',
    screenshotCleared: true,
    reviewer: 'Umar Farooq',
    source: null,
    rating: 5,
    language: 'en',
    text: 'I recently visited and was impressed with the warm and professional service. Dr. Mahnoor was very polite, friendly, and took the time to explain my treatment. The prescribed medicine worked wonders, and I recovered quickly. Highly recommend!',
    excerpt: false,
    translations: {
      ur: 'حال ہی میں یہاں آنا ہوا، اور گرمجوش اور پیشہ ورانہ خدمات نے بہت متاثر کیا۔ ڈاکٹر ماہ نور بہت شائستہ اور ملنسار تھیں، اور انہوں نے وقت نکال کر میرا علاج سمجھایا۔ تجویز کردہ دوا نے کمال کر دیا، اور مجھے جلد صحت یابی ملی۔ بھرپور سفارش!',
    },
    needsTranscription: false,
  },
  {
    id: 'review-3',
    screenshot: '3',
    screenshotCleared: true,
    reviewer: 'Nimra Arshad Bhatti',
    source: null,
    rating: 5,
    language: 'en',
    text: 'I had a very good experience with the orthopedic doctor Mahnoor. .The doctor listened to me carefully.. The treatment was effective, and I started feeling better quite soon. I would definitely recommend this doctor to others.',
    excerpt: false,
    translations: {
      ur: 'آرتھوپیڈک ڈاکٹر ماہ نور کے ساتھ میرا تجربہ بہت اچھا رہا۔ ڈاکٹر نے میری بات غور سے سنی۔ علاج مؤثر تھا، اور مجھے جلد ہی بہتری محسوس ہونے لگی۔ میری طرف سے دوسروں کو بھی اس ڈاکٹر کی پرزور سفارش ہے۔',
    },
    needsTranscription: false,
  },
  {
    // Excerpt: the screenshot opens with the Roman Urdu line
    // "Yeh ek clean aur natural review h..." and ends with a heart emoji;
    // both are left out here. Owner check: much of the wording matches
    // review-3 closely.
    id: 'review-4',
    screenshot: '4',
    screenshotCleared: true,
    reviewer: 'Rida Yasher',
    source: null,
    rating: 5,
    language: 'en',
    text: 'I had a very good experience with the o doctor Mahnoor.. The doctor listened to my concerns carefully and explained my condition in a clear and understandable way. The treatment was effective, and I started feeling better quite soon. The doctor was kind and professional, and the clinic environment was also clean and well-managed. I would definitely recommend this doctor to others. Thankyou Dr Mahnoor Ansari',
    excerpt: true,
    translations: {
      ur: 'ڈاکٹر ماہ نور کے ساتھ میرا تجربہ بہت اچھا رہا۔ ڈاکٹر نے میری باتیں غور سے سنیں اور میری حالت واضح اور آسان انداز میں سمجھائی۔ علاج مؤثر تھا، اور مجھے جلد ہی بہتری محسوس ہونے لگی۔ ڈاکٹر مہربان اور پیشہ ور تھیں، اور کلینک کا ماحول بھی صاف ستھرا اور منظم تھا۔ میری طرف سے دوسروں کو بھی اس ڈاکٹر کی پرزور سفارش ہے۔ شکریہ ڈاکٹر ماہ نور انصاری',
    },
    needsTranscription: false,
  },
];

// Cards shown before "View more reviews".
export const reviewsInitial = 4;

// Show reviewer names exactly as they appear in the screenshots.
export const showReviewerNames = true;
