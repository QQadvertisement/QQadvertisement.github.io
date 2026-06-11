import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <nav className="foot-nav" aria-label="Footer">
          <Link to="/our-work">Our Work</Link>
          <Link to="/case-studies/friends-ramen">Friends Ramen Case Study</Link>
          <Link to="/case-studies/atta">Atta Case Study</Link>
          <Link to="/playable-ads-explained">Playable Ads Explained</Link>
          <Link to="/about">About</Link>
        </nav>
        <div className="foot-inner">
          <span>QQ ADVERTISEMENT © {new Date().getFullYear()} · FLUSHING, QUEENS, NY</span>
          <span>HAND-BUILT PLAYABLES FOR META &amp; TIKTOK</span>
          <a href="mailto:hello@qqadvertisement.com">hello@qqadvertisement.com</a>
        </div>
      </div>
    </footer>
  );
}
