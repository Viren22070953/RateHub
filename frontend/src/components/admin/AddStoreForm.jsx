import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addStore } from "../../api/stores";
import FormInput from "../common/FormInput";
import { addStoreSchema } from "../../utils/validators";

const AddStoreForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    defaultValues: { name: "", email: "", address: "", owner_id: "" },
    mode: "onChange",
    resolver: yupResolver(addStoreSchema),
  });

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      owner_id: values.owner_id ? Number(values.owner_id) : null,
    };

    try {
      await addStore(payload);
      toast.success("Store created successfully.");
      reset();
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to create store.");
    }
  };

  return (
    <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="Store name" error={errors.name?.message} {...register("name")} />
      <FormInput label="Store email" error={errors.email?.message} type="email" {...register("email")} />
      <FormInput label="Address" error={errors.address?.message} as="textarea" rows={3} {...register("address")} />
      <FormInput label="Owner ID" error={errors.owner_id?.message} inputMode="numeric" {...register("owner_id")} />
      <button className="button button-primary" disabled={!isValid || isSubmitting} type="submit">
        {isSubmitting ? "Creating..." : "Create store"}
      </button>
    </form>
  );
};

export default AddStoreForm;
