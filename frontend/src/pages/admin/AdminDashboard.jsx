import { useEffect, useState } from "react";
import { Building2, Star, Users } from "lucide-react";
import toast from "react-hot-toast";
import { getDashboardStats } from "../../api/users";

const cards = [
  { key: "totalUsers", label: "Total Users", icon: Users },
  { key: "totalStores", label: "Total Stores", icon: Building2 },
  { key: "totalRatings", label: "Total Ratings", icon: Star },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">System Administrator</p>
          <h1>Dashboard</h1>
        </div>
      </div>

      <section className="stat-grid">
        {cards.map(({ key, label, icon: Icon }) => (
          <article className="stat-card" key={key}>
            <div className="stat-icon">
              <Icon size={24} />
            </div>
            <p>{label}</p>
            {loading ? <div className="skeleton stat-skeleton" /> : <strong>{stats?.[key] ?? 0}</strong>}
          </article>
        ))}
      </section>
    </main>
  );
};

export default AdminDashboard;
