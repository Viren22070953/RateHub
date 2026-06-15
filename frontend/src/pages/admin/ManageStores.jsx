/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteStore, getAdminStores } from "../../api/stores";
import AddStoreForm from "../../components/admin/AddStoreForm";
import Modal from "../../components/common/Modal";
import SortableTable from "../../components/common/SortableTable";

const defaultFilters = { name: "", email: "", address: "" };

const ManageStores = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState({ sortBy: "created_at", order: "desc" });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadStores = async (nextFilters = filters, nextSort = sort) => {
    setLoading(true);
    const params = Object.fromEntries(
      Object.entries({ ...nextFilters, ...nextSort }).filter(([, value]) => value)
    );

    try {
      const res = await getAdminStores(params);
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

  const handleSort = (key) => {
    if (key === "actions" || key === "owner_name" || key === "total_ratings") return;
    const nextSort = {
      sortBy: key,
      order: sort.sortBy === key && sort.order === "asc" ? "desc" : "asc",
    };
    setSort(nextSort);
    loadStores(filters, nextSort);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this store?")) return;

    try {
      await deleteStore(id);
      toast.success("Store deleted.");
      loadStores();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to delete store.");
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    { key: "avg_rating", label: "Rating", render: (row) => row.avg_rating || "No ratings" },
    { key: "owner_name", label: "Owner", sortable: false, render: (row) => row.owner_name || "-" },
    { key: "total_ratings", label: "Total", sortable: false },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (row) => (
        <button className="icon-button danger" type="button" onClick={() => handleDelete(row.id)} aria-label="Delete store">
          <Trash2 size={16} />
        </button>
      ),
    },
  ];

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">System Administrator</p>
          <h1>Stores</h1>
        </div>
        <button className="button button-primary" type="button" onClick={() => setShowForm(true)}>
          <Plus size={16} />
          Add Store
        </button>
      </div>

      <section className="toolbar">
        <input className="input" placeholder="Name" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
        <input className="input" placeholder="Email" value={filters.email} onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
        <input className="input" placeholder="Address" value={filters.address} onChange={(e) => setFilters({ ...filters, address: e.target.value })} />
        <button className="button button-primary" type="button" onClick={() => loadStores()}>
          <Search size={16} />
          Search
        </button>
        <button className="button button-ghost" type="button" onClick={() => { setFilters(defaultFilters); loadStores(defaultFilters); }}>
          Clear
        </button>
      </section>

      {loading ? <div className="skeleton table-skeleton" /> : (
        <SortableTable columns={columns} data={stores} sortBy={sort.sortBy} order={sort.order} onSort={handleSort} emptyMessage="No stores found." />
      )}

      {showForm && (
        <Modal title="Add Store" onClose={() => setShowForm(false)}>
          <AddStoreForm onSuccess={() => { setShowForm(false); loadStores(); }} />
        </Modal>
      )}
    </main>
  );
};

export default ManageStores;
