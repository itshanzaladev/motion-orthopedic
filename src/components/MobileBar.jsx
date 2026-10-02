import { useEffect, useState } from 'react';
import { business } from '../config/business.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import Icon from './Icon.jsx';

/**
 * Phone-only bottom bar. It hides while the appointment section is on screen
 * and while any text field has focus (on-screen keyboard), so it never covers
 * form controls or validation messages. The page reserves space for it.
 */
export default function MobileBar() {
  const { t } = useI18n();
  const [bookingVisible, setBookingVisible] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const target = document.getElementById('appointment');
    let io;
    if (target && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => setBookingVisible(entries[0].isIntersecting), { threshold: 0 });
      io.observe(target);
    }
    const isField = (el) => el && el.matches?.('input, textarea, select');
    const onIn = (e) => setTyping(isField(e.target));
    const onOut = () => setTyping(false);
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      io?.disconnect();
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
    };
  }, []);

  const hidden = bookingVisible || typing;
  return (
    <div className={`mobile-bar ${hidden ? 'is-hidden' : ''}`} aria-hidden={hidden ? 'true' : undefined} inert={hidden ? '' : undefined}>
      <a className="btn btn-primary" href="#appointment">
        <Icon name="calendar" />
        {t.common.requestAppointment}
      </a>
      <a className="btn btn-secondary" href={business.phoneHref}>
        <Icon name="phone" />
        {t.common.call}
      </a>
    </div>
  );
}
