import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { getOwnerDashboard } from "../../api/ratings";
import SortableTable from "../../components/common/SortableTable";
import StarRating from "../../components/common/StarRating";

const OwnerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({ sortBy: "created_at", order: "desc" });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getOwnerDashboard();
        setData(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load owner dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const raters = [...(data?.raters || [])].sort((a, b) => {
    const aValue = a[sort.sortBy] || "";
    const bValue = b[sort.sortBy] || "";
    if (aValue < bValue) return sort.order === "asc" ? -1 : 1;
    if (aValue > bValue) return sort.order === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSort({
      sortBy: key,
      order: sort.sortBy === key && sort.order === "asc" ? "desc" : "asc",
    });
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "rating", label: "Rating", render: (row) => <StarRating value={row.rating} readonly size={18} /> },
    { key: "created_at", label: "Rated On", render: (row) => new Date(row.created_at).toLocaleDateString() },
  ];

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Store Owner</p>
          <h1>Dashboard</h1>
        </div>
      </div>

      {loading && <div className="skeleton table-skeleton" />}

      {!loading && data && (
        <>
          <section className="owner-summary">
            <div>
              <p className="eyebrow">{data.store.name}</p>
              <h2>{data.store.avg_rating || "No ratings yet"}</h2>
              <p>{data.store.address}</p>
              {Number(data.store.avg_rating) > 0 && <StarRating value={Math.round(data.store.avg_rating)} readonly />}
            </div>
            <div className="summary-badge">
              <Star size={22} fill="currentColor" />
              {data.store.total_ratings} total ratings
            </div>
          </section>

          <section className="section-block">
            <h2>Users Who Rated Your Store</h2>
            <SortableTable columns={columns} data={raters} sortBy={sort.sortBy} order={sort.order} onSort={handleSort} emptyMessage="No ratings yet." />
          </section>
        </>
      )}
    </main>
  );
};

export default OwnerDashboard;
