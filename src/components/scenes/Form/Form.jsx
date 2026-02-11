import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import Header from "../../Header/Header";
import * as yup from "yup";
import { Formik } from "formik";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

const userSchema = yup.object().shape({
  firstName: yup.string().min(3).required("First Name Is Required"),
  lastName: yup.string().min(3).required("Last Name Is Required"),
  email: yup.string().email("Email Not Vaild").required("Email Is Required"),
  contact: yup
    .string()
    .matches(/^01[0125]\d{8}$/, "Phone Must Be Egyption Phone Number")
    .required("Contact Is Required"),
  address1: yup.string().required("Address1 Name Is Required"),
  address2: yup.string().required("Address2 Name Is Required"),
});

export default function Form() {
  const inNonMobile = useMediaQuery("(min-width:600px)");
  const inMobile = useMediaQuery("(max-width:767px)");
  const handleFormSubmit = (values , {resetForm }) => {
    console.log(values);
    resetForm()
  };

  return (
    <>
      <Box className="mt-4 px-4">
        <Header title={"CREATE PROFILE"} subTitle={"Create A New Profile Now !"} />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            dirty
          }) => {
            return (
              <form className="mt-5 pb-3 md:pb-0" onSubmit={handleSubmit} >
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4,minmax(0,1fr))"
                  sx={{
                    "&>div": { gridColumn: inNonMobile ? undefined : "span 2" },
                    "&>div": { gridColumn: inMobile ? "span 4" : "" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    value={values.firstName}
                    onChange={handleChange}
                    name="firstName"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn:"span 2" }}
                  ></TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    value={values.lastName}
                    onChange={handleChange}
                    name="lastName"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn:"span 2" }}
                  ></TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="email"
                    label="Eamil Address"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn:"span 4" }}
                  ></TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="tel"
                    label="Phone Number"
                    onBlur={handleBlur}
                    value={values.contact}
                    onChange={handleChange}
                    name="contact"
                    error={touched.contact && Boolean(errors.contact)}
                    helperText={touched.contact && errors.contact}
                    sx={{ gridColumn:"span 4" }}
                  ></TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address 1"
                    onBlur={handleBlur}
                    value={values.address1}
                    onChange={handleChange}
                    name="address1"
                    error={touched.address1 && Boolean(errors.address1)}
                    helperText={touched.address1 && errors.address1}
                    sx={{ gridColumn:"span 4" }}
                  ></TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address 2"
                    onBlur={handleBlur}
                    value={values.address2}
                    onChange={handleChange}
                    name="address2"
                    error={touched.address2 && Boolean(errors.address2)}
                    helperText={touched.address2 && errors.address2}
                    sx={{ gridColumn:"span 4" }}
                  ></TextField>
                </Box>
                <Box display="flex" justifyContent={"end"} mt={"20px"}>
                  <Button type="submit" color="secondary" variant="contained" sx={{ fontWeight:"600" }} className={`${!(isValid && dirty) ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'opacity-100 cursor-allowed'}`}>
                    Create New User
                  </Button>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
}
