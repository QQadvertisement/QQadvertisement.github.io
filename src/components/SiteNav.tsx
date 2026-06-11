import { Link } from "react-router-dom";

export default function SiteNav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link className="wordmark" to="/" aria-label="QQ Advertisement home">
          <span className="q1">Q</span><span className="q2">Q</span>
        </Link>
        <div className="nav-links">
          <Link to="/our-work">Work</Link>
          <Link to="/playable-ads-explained">Playables 101</Link>
          <Link to="/about">About</Link>
        </div>
        <Link className="btn btn-primary" to="/#pricing">Start a build</Link>
      </div>
    </nav>
  );
}
