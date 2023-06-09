import * as Yup from "yup";

export const inputSchema = Yup.object({
  addressType: Yup.string().required("Required field"),
  streetNumber: Yup.number().required("Required field"),
  street: Yup.string().required("Required field"),
  city: Yup.string(),
  state: Yup.string(),
  zip: Yup.number(),
  benchmark: Yup.string().required("Required field"),
});
