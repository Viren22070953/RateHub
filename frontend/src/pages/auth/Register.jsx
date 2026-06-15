import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signupUser } from "../../api/auth";
import FormInput from "../../components/common/FormInput";
import { signupSchema } from "../../utils/validators";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: { name: "", email: "", password: "", address: "" },
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (values) => {
    try {
      await signupUser(values);
      toast.success("Registration successful. Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-logo">
          <img src="/ratehub-logo.png" alt="RateHub logo" />
          <span>RateHub</span>
        </div>
        <p className="eyebrow">Normal User Signup</p>
        <h1>Create your account</h1>
        <p className="muted">Use your store experiences to rate registered businesses.</p>

        <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Full name" error={errors.name?.message} {...register("name")} />
          <FormInput label="Email" error={errors.email?.message} type="email" {...register("email")} />
          <FormInput label="Password" error={errors.password?.message} type="password" {...register("password")} />
          <FormInput label="Address" error={errors.address?.message} as="textarea" rows={4} {...register("address")} />
          <button className="button button-primary button-full" disabled={!isValid || isSubmitting} type="submit">
            {isSubmitting ? "Creating..." : "Signup"}
          </button>
        </form>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
