// Small inline icon set (no icon library). Decorative by default.
const paths = {
  phone:
    'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z',
  calendar: 'M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z',
  pin: 'M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  home: 'M4 11l8-7 8 7M6 9.5V20h4.5v-5h3v5H18V9.5',
  clinic: 'M4 20V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14M2 20h20M12 8v6M9 11h6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  chat: 'M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5z',
  chevron: 'M6 9l6 6 6-6',
  close: 'M6 6l12 12M18 6L6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  back: 'M19 12H5M11 6l-6 6 6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  copy: 'M9 9h10v11H9zM5 15V4h10',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  quote: 'M7 17c-2 0-3-1.5-3-3.5C4 10 6 7.5 9 6.5l.6 1.2C8 8.6 7.2 9.8 7.2 11H9v6H7zm9 0c-2 0-3-1.5-3-3.5 0-3.5 2-6 5-7l.6 1.2c-1.6.9-2.4 2.1-2.4 3.3H18v6h-2z',
  shield: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z',
  posture: 'M12 5.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zM9 22l1.5-7.5L12 9m0 0l1.5 5.5L15 22M12 9V7.5M7 11l5-3.5 5 3.5',
  bandage: 'M4.6 15.4l10.8-10.8a3 3 0 0 1 4.2 4.2L8.8 19.6a3 3 0 0 1-4.2-4.2zM9.5 9.5l5 5M11 12h.01M12.5 10.5h.01M9.5 13.5h.01M12.5 13.5h.01',
  neuro: 'M9 4.5a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.3A3 3 0 0 0 8 17.5a2.5 2.5 0 0 0 4 1.8V5.6A2.6 2.6 0 0 0 9 4.5zM15 4.5a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.3 3 3 0 0 1-3.5 4.7 2.5 2.5 0 0 1-4 1.8',
  spine: 'M12 2.5v19M9.5 4.5h5M9 8h6M9 11.5h6M9 15h6M9.5 18.5h5M6.5 6c-1.5 3-1.5 9 0 12M17.5 6c1.5 3 1.5 9 0 12',
  family: 'M7 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16.5 10a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2zM4 21v-6.5A3 3 0 0 1 7 11.5a3 3 0 0 1 3 3V21M14 21v-4.5a2.5 2.5 0 0 1 5 0V21',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6',
  star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z',
};

const filled = new Set(['quote', 'star']);

export default function Icon({ name, size = 20, className = '', label }) {
  const isFilled = filled.has(name);
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : 'true'}
      role={label ? 'img' : undefined}
      aria-label={label}
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.5.1.2 1.7 2.7 4.2 3.8 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z"
      />
    </svg>
  );
}
