import { Link, useLocation } from "react-router-dom";

const NotAllowed = () => {
  const location = useLocation();

  return (
    <main className="center-page">
      <section className="panel empty-panel">
        <p className="eyebrow">Access Restricted</p>
        <h1>Not allowed</h1>
        <p className="muted">Your current role cannot open that page.</p>
        <Link className="button button-primary" to={location.state?.home || "/"}>
          Go to my dashboard
        </Link>
      </section>
    </main>
  );
};

export default NotAllowed;
