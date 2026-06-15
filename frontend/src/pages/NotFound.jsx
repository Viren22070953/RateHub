import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="center-page">
    <section className="panel empty-panel">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="muted">The page you opened does not exist in this portal.</p>
      <Link className="button button-primary" to="/">
        Back home
      </Link>
    </section>
  </main>
);

export default NotFound;
