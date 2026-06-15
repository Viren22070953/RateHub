/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteUser, getUserById, getUsers } from "../../api/users";
import AddUserForm from "../../components/admin/AddUserForm";
import Modal from "../../components/common/Modal";
import SortableTable from "../../components/common/SortableTable";

const defaultFilters = { name: "", email: "", address: "", role: "" };

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState({ sortBy: "created_at", order: "desc" });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async (nextFilters = filters, nextSort = sort) => {
    setLoading(true);
    const params = Object.fromEntries(
      Object.entries({ ...nextFilters, ...nextSort }).filter(([, value]) => value)
    );

    try {
      const res = await getUsers(params);
      setUsers(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSort = (key) => {
    if (key === "actions" || key === "avg_rating") return;
    const nextSort = {
      sortBy: key,
      order: sort.sortBy === key && sort.order === "asc" ? "desc" : "asc",
    };
    setSort(nextSort);
    loadUsers(filters, nextSort);
  };

  const handleView = async (id) => {
    try {
      const res = await getUserById(id);
      setSelectedUser(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load user details.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      toast.success("User deleted.");
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to delete user.");
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    {
      key: "role",
      label: "Role",
      render: (row) => <span className={`role-badge role-${row.role}`}>{row.role.replace("_", " ")}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (row) => (
        <div className="table-actions">
          <button className="button button-soft" type="button" onClick={() => handleView(row.id)}>
            View
          </button>
          <button className="icon-button danger" type="button" onClick={() => handleDelete(row.id)} aria-label="Delete user">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">System Administrator</p>
          <h1>Users</h1>
        </div>
        <button className="button button-primary" type="button" onClick={() => setShowForm(true)}>
          <Plus size={16} />
          Add User
        </button>
      </div>

      <section className="toolbar">
        <input className="input" placeholder="Name" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
        <input className="input" placeholder="Email" value={filters.email} onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
        <input className="input" placeholder="Address" value={filters.address} onChange={(e) => setFilters({ ...filters, address: e.target.value })} />
        <select className="input" value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="user">Normal User</option>
          <option value="store_owner">Store Owner</option>
        </select>
        <button className="button button-primary" type="button" onClick={() => loadUsers()}>
          <Search size={16} />
          Search
        </button>
        <button className="button button-ghost" type="button" onClick={() => { setFilters(defaultFilters); loadUsers(defaultFilters); }}>
          Clear
        </button>
      </section>

      {loading ? <div className="skeleton table-skeleton" /> : (
        <SortableTable columns={columns} data={users} sortBy={sort.sortBy} order={sort.order} onSort={handleSort} emptyMessage="No users found." />
      )}

      {showForm && (
        <Modal title="Add User" onClose={() => setShowForm(false)}>
          <AddUserForm onSuccess={() => { setShowForm(false); loadUsers(); }} />
        </Modal>
      )}

      {selectedUser && (
        <Modal title="User Details" onClose={() => setSelectedUser(null)}>
          <div className="detail-list">
            <p><span>Name</span>{selectedUser.name}</p>
            <p><span>Email</span>{selectedUser.email}</p>
            <p><span>Address</span>{selectedUser.address}</p>
            <p><span>Role</span>{selectedUser.role.replace("_", " ")}</p>
            {selectedUser.role === "store_owner" && (
              <p><span>Average Rating</span>{selectedUser.avg_rating || "No ratings yet"}</p>
            )}
          </div>
        </Modal>
      )}
    </main>
  );
};

export default ManageUsers;
