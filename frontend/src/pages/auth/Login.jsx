import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import FormInput from "../../components/common/FormInput";
import { loginSchema } from "../../utils/validators";

const roleHome = {
  admin: "/admin/dashboard",
  user: "/user/stores",
  store_owner: "/owner/dashboard",
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      const res = await loginUser(values);
      login(res.data.user, res.data.token);
      toast.success("Logged in successfully.");

      const fallback = roleHome[res.data.user.role] || "/";
      navigate(location.state?.from?.pathname || fallback, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-logo">
          <img src="/ratehub-logo.png" alt="RateHub logo" />
          <span>RateHub</span>
        </div>
        <p className="eyebrow">Store Rating Platform</p>
        <h1>Welcome back</h1>
        <p className="muted">Sign in once and continue to the right workspace for your role.</p>

        <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Email" error={errors.email?.message} type="email" {...register("email")} />
          <FormInput label="Password" error={errors.password?.message} type="password" {...register("password")} />
          <button className="button button-primary button-full" disabled={!isValid || isSubmitting} type="submit">
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/signup">Create a normal user account</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
