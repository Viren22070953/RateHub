import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updatePassword } from "../../api/users";
import FormInput from "../../components/common/FormInput";
import { passwordSchema } from "../../utils/validators";

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    defaultValues: { currentPassword: "", password: "", confirm: "" },
    mode: "onChange",
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async ({ currentPassword, password }) => {
    try {
      await updatePassword({ currentPassword, password });
      toast.success("Password updated successfully.");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to update password.");
    }
  };

  return (
    <main className="page narrow-page">
      <section className="panel">
        <p className="eyebrow">Account Security</p>
        <h1>Update Password</h1>
        <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Current password" error={errors.currentPassword?.message} type="password" {...register("currentPassword")} />
          <FormInput label="New password" error={errors.password?.message} type="password" {...register("password")} />
          <FormInput label="Confirm new password" error={errors.confirm?.message} type="password" {...register("confirm")} />
          <button className="button button-primary button-full" disabled={!isValid || isSubmitting} type="submit">
            {isSubmitting ? "Updating..." : "Update password"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default UpdatePassword;
