import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addUser } from "../../api/users";
import FormInput from "../common/FormInput";
import { addUserSchema } from "../../utils/validators";

const AddUserForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    defaultValues: { name: "", email: "", password: "", address: "", role: "user" },
    mode: "onChange",
    resolver: yupResolver(addUserSchema),
  });

  const onSubmit = async (values) => {
    try {
      await addUser(values);
      toast.success("User created successfully.");
      reset();
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to create user.");
    }
  };

  return (
    <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="Full name" error={errors.name?.message} {...register("name")} />
      <FormInput label="Email" error={errors.email?.message} type="email" {...register("email")} />
      <FormInput label="Password" error={errors.password?.message} type="password" {...register("password")} />
      <FormInput label="Address" error={errors.address?.message} as="textarea" rows={3} {...register("address")} />
      <FormInput label="Role" error={errors.role?.message} as="select" {...register("role")}>
        <option value="user">Normal User</option>
        <option value="admin">System Administrator</option>
        <option value="store_owner">Store Owner</option>
      </FormInput>
      <button className="button button-primary" disabled={!isValid || isSubmitting} type="submit">
        {isSubmitting ? "Creating..." : "Create user"}
      </button>
    </form>
  );
};

export default AddUserForm;
