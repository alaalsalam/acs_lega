import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component: listens for route changes and scrolls to
 * the matching section anchor when navigating to
 * /services, /articles, /contact, /checklist, etc.
 *
 * Since this is a single-page app where all sections
 * exist on the main page, we use hash anchors for
 * deep navigation. This component bridges the gap:
 * /services  → scroll to #services
 * /articles  → scroll to #articles
 * /contact   → scroll to #contact
 * /checklist → scroll to #checklist
 * /faq       → scroll to #faq
 * /          → scroll to top (hero)
 */
export function ScrollToSection() {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionMap: Record<string, string> = {
      '/services':   '#services',
      '/articles':   '#articles',
      '/contact':    '#contact',
      '/checklist':  '#checklist',
      '/faq':        '#faq',
      '/approach':   '#approach',
      '/about':      '#about',
      '/team':       '#team',
    };

    const anchor = sectionMap[pathname];
    if (anchor) {
      const el = document.querySelector(anchor);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    } else if (pathname === '/' || pathname === '/home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}