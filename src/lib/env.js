// Private preview = local development or `npm run build:preview`.
// The public build (`npm run build`) hides everything awaiting approval.
export const isPreview = import.meta.env.DEV || import.meta.env.VITE_PREVIEW === 'true';
