import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="intro">
      <p className="kicker">React architecture POC</p>
      <h1>A small widget with real app dependencies.</h1>
      <p>This app brings together routing, shared context, server state, and a styled reusable component. Open the widget route to see them working.</p>
      <Link className="button-link" to="/widget">View UserWidget <span aria-hidden="true">→</span></Link>
    </section>
  );
}
