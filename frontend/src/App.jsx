import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BackButton from "./components/common/BackButton";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStores from "./pages/admin/ManageStores";
import ManageUsers from "./pages/admin/ManageUsers";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/HomePage";
import NotAllowed from "./pages/NotAllowed";
import NotFound from "./pages/NotFound";
import OwnerDashboard from "./pages/storeowner/OwnerDashboard";
import StoreList from "./pages/user/StoreList";
import UpdatePassword from "./pages/user/UpdatePassword";

const roleHome = {
  admin: "/admin/dashboard",
  user: "/user/stores",
  store_owner: "/owner/dashboard",
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={user ? roleHome[user.role] || "/login" : "/home"} replace />;
};

const App = () => (
  <BrowserRouter>
    <Navbar />
    <BackButton />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        className: "ratehub-toast",
        success: { className: "ratehub-toast ratehub-toast-success" },
        error: { className: "ratehub-toast ratehub-toast-error" },
      }}
    />
    <Routes>
      <Route path="/" element={<DashboardRedirect />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/register" element={<Navigate to="/signup" replace />} />

      <Route path="/admin/dashboard" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><ManageUsers /></ProtectedRoute>} />
      <Route path="/admin/stores" element={<ProtectedRoute roles={["admin"]}><ManageStores /></ProtectedRoute>} />

      <Route path="/user/stores" element={<ProtectedRoute roles={["user"]}><StoreList /></ProtectedRoute>} />
      <Route path="/user/my-ratings" element={<ProtectedRoute roles={["user"]}><StoreList /></ProtectedRoute>} />
      <Route path="/stores" element={<Navigate to="/user/stores" replace />} />
      <Route path="/user/password" element={<ProtectedRoute roles={["user"]}><UpdatePassword /></ProtectedRoute>} />

      <Route path="/owner/dashboard" element={<ProtectedRoute roles={["store_owner"]}><OwnerDashboard /></ProtectedRoute>} />
      <Route path="/owner/password" element={<ProtectedRoute roles={["store_owner"]}><UpdatePassword /></ProtectedRoute>} />

      <Route path="/update-password" element={<ProtectedRoute roles={["admin", "user", "store_owner"]}><UpdatePassword /></ProtectedRoute>} />
      <Route path="/not-allowed" element={<NotAllowed />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
