/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { getUserStores } from "../../api/stores";
import StoreCard from "../../components/user/StoreCard";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({ name: "", address: "" });
  const [loading, setLoading] = useState(true);

  const loadStores = async (nextSearch = search) => {
    setLoading(true);
    const params = Object.fromEntries(Object.entries(nextSearch).filter(([, value]) => value));

    try {
      const res = await getUserStores(params);
      setStores(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load stores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  return (
    <main className="page narrow-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Normal User</p>
          <h1>Registered Stores</h1>
        </div>
      </div>

      <section className="toolbar">
        <input className="input" placeholder="Search by store name" value={search.name} onChange={(e) => setSearch({ ...search, name: e.target.value })} />
        <input className="input" placeholder="Search by address" value={search.address} onChange={(e) => setSearch({ ...search, address: e.target.value })} />
        <button className="button button-primary" type="button" onClick={() => loadStores()}>
          <Search size={16} />
          Search
        </button>
        <button className="button button-ghost" type="button" onClick={() => { const clear = { name: "", address: "" }; setSearch(clear); loadStores(clear); }}>
          Clear
        </button>
      </section>

      {loading && <div className="skeleton list-skeleton" />}
      {!loading && stores.length === 0 && <div className="empty-state">No stores found.</div>}
      {!loading && stores.map((store) => (
        <StoreCard key={store.id} store={store} onRatingUpdate={() => loadStores()} />
      ))}
    </main>
  );
};

export default StoreList;
