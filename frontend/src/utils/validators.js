import * as yup from "yup";

const passwordRule = yup
  .string()
  .required("Password is required.")
  .min(8, "Password must be at least 8 characters.")
  .max(16, "Password must not exceed 16 characters.")
  .matches(/[A-Z]/, "Password must include at least one uppercase letter.")
  .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character.");

export const nameRule = yup
  .string()
  .trim()
  .required("Name is required.")
  .min(20, "Name must be at least 20 characters.")
  .max(60, "Name must not exceed 60 characters.");

export const emailRule = yup
  .string()
  .trim()
  .required("Email is required.")
  .email("Enter a valid email address.");

export const addressRule = yup
  .string()
  .trim()
  .required("Address is required.")
  .max(400, "Address must not exceed 400 characters.");

export const loginSchema = yup.object({
  email: emailRule,
  password: yup.string().required("Password is required."),
});

export const signupSchema = yup.object({
  name: nameRule,
  email: emailRule,
  password: passwordRule,
  address: addressRule,
});

export const addUserSchema = signupSchema.shape({
  role: yup
    .string()
    .oneOf(["admin", "user", "store_owner"], "Select a valid role.")
    .required("Role is required."),
});

export const addStoreSchema = yup.object({
  name: nameRule,
  email: emailRule,
  address: addressRule,
  owner_id: yup
    .string()
    .nullable()
    .test("owner-id", "Owner ID must be a positive number.", (value) => {
      if (!value) return true;
      return Number.isInteger(Number(value)) && Number(value) > 0;
    }),
});

export const passwordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required."),
  password: passwordRule,
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match.")
    .required("Confirm your new password."),
});
