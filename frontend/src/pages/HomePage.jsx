import { Building2, ShieldCheck, Star, Store, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    title: "Normal User",
    description: "Find registered stores, compare ratings, and submit your own review.",
    icon: UserRound,
  },
  {
    title: "Store Owner",
    description: "Track customer ratings and see who reviewed your store.",
    icon: Store,
  },
  {
    title: "Administrator",
    description: "Manage users, stores, ratings, and platform-wide metrics.",
    icon: ShieldCheck,
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-copy">
          <div className="home-logo-row">
            <img src="/ratehub-logo.png" alt="RateHub logo" />
            <span>RateHub</span>
          </div>
          <p className="eyebrow">Rate • Review • Discover</p>
          <h1>One clean platform for trusted store ratings.</h1>
          <p className="muted">
            RateHub gives administrators, store owners, and customers a focused workspace for ratings,
            feedback, and store discovery.
          </p>
          <div className="home-actions">
            <button className="button button-primary" type="button" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="button button-ghost" type="button" onClick={() => navigate("/signup")}>
              Create account
            </button>
          </div>
        </div>

        <div className="home-card home-rating-card">
          <div className="home-card-icon">
            <Building2 size={24} />
          </div>
          <h2>Store confidence at a glance</h2>
          <div className="home-stars" aria-label="Five star rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={24} fill="currentColor" />
            ))}
          </div>
          <p className="muted">Overall ratings, personal submissions, and owner insights stay connected.</p>
        </div>
      </section>

      <section className="home-role-grid">
        {roles.map(({ title, description, icon: Icon }) => (
          <article className="home-card role-card" key={title}>
            <div className="home-card-icon">
              <Icon size={22} />
            </div>
            <h2>{title}</h2>
            <p className="muted">{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
