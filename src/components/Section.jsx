import { useReveal } from '../lib/motion.js';

export default function Section({ id, className = '', eyebrow, title, lead, children, headingId }) {
  const ref = useReveal();
  const hid = headingId || `${id}-title`;
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={hid}>
      <div className="container" ref={ref}>
        {(eyebrow || title) && (
          <header className="section-head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={hid} tabIndex={-1}>
              {title}
            </h2>
            {lead && <p className="lead">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
