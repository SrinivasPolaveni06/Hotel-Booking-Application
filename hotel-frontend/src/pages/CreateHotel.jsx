import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { MainUrl } from "../components/EnvironmentVariables";
import { BookedHotelCountContext } from "../components/Context";
import { useContext } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../components/dashboard.css";

const CreateHotel = () => {
  const initialValues = {
    name: "",
    description: "",
    price: "",
    offer: "",
    img_url: "",
    location: "",
    rating: "",
    status: "available",
    features: [],
  };
  const navigate = useNavigate();
  //const [formData,setFormData]=useState(initialValues);
  const { fetchBookedHotel } = useContext(BookedHotelCountContext);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      description: Yup.string().min(10, "Too Short!").required("Required"),
      price: Yup.number()
        .required("Required")
        .positive("Use Positive Numbers")
        .integer(),
      offer: Yup.number()
        .required("Required")
        .positive("Use Positive Numbers")
        .integer(),
      img_url: Yup.string()
        .required("Required")
        .url("Provide Correct Url")
        .nullable(),
      location: Yup.string().min(2, "Too Short!").required("Required"),
      rating: Yup.number()
        .required("Required")
        .positive("Use Positive Numbers"),
      status: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Perform your submit logic here

      axios
        .post(`${MainUrl}`, values)
        .then((res) => {
          console.log(res);
          if (res.statusText === "OK") {
            fetchBookedHotel();
            navigate("/hotels");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const { features } = formik.values;

    if (checked) {
      formik.setFieldValue("features", [...features, value]);
    } else {
      const updatedCheckboxes = features.filter(
        (checkbox) => checkbox !== value
      );
      formik.setFieldValue("features", updatedCheckboxes);
    }
  };

  return (
    <>
      <div className=" d-flex flex-column align-items-center my-5">
        <div className="form-card ">
          <h3 className=" text-center mb-2">
            <b>Hotel Creation Form</b>
          </h3>

          <form
            className="form-card1 bg-light d-flex flex-column shadow-lg p-3 "
            onSubmit={formik.handleSubmit}
          >
            <TextField
              fullWidth
              id="name"
              label="Hotel Name"
              name="name"
              variant="outlined"
              className="my-2 login"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="description"
              label="Description"
              name="description"
              variant="outlined"
              className="my-2 login"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <TextField
              fullWidth
              id="img_url"
              label="Image Url"
              name="img_url"
              variant="outlined"
              className="my-2 login"
              value={formik.values.img_url}
              onChange={formik.handleChange}
              error={formik.touched.img_url && Boolean(formik.errors.img_url)}
              helperText={formik.touched.img_url && formik.errors.img_url}
            />
            <TextField
              fullWidth
              id="price"
              label="Hotel Price"
              name="price"
              type="number"
              variant="outlined"
              className="my-2 login"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              fullWidth
              id="offer"
              label="Offer"
              name="offer"
              type="number"
              variant="outlined"
              className="my-2 login"
              value={formik.values.offer}
              onChange={formik.handleChange}
              error={formik.touched.offer && Boolean(formik.errors.offer)}
              helperText={formik.touched.offer && formik.errors.offer}
            />
            <TextField
              fullWidth
              id="location"
              label="Hotel Location"
              name="location"
              variant="outlined"
              className="my-2 login"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
              fullWidth
              id="rating"
              label="Rating"
              name="rating"
              type="number"
              variant="outlined"
              className="my-2 login"
              value={formik.values.rating}
              onChange={formik.handleChange}
              error={formik.touched.rating && Boolean(formik.errors.rating)}
              helperText={formik.touched.rating && formik.errors.rating}
            />
            <FormControl component="fieldset" className="my-2">
              <FormLabel component="legend">Features:</FormLabel>
              <div className="d-lg-flex flex-row">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.features.includes("Wi-Fi")}
                      onChange={handleCheckboxChange}
                      name="Wi-Fi"
                      value="Wi-Fi"
                      color="primary"
                    />
                  }
                  label="Wi-Fi"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.features.includes("AC")}
                      onChange={handleCheckboxChange}
                      name="AC"
                      value="AC"
                      color="primary"
                    />
                  }
                  label="AC"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.features.includes("TV")}
                      onChange={handleCheckboxChange}
                      name="TV"
                      value="TV"
                      color="primary"
                    />
                  }
                  label="TV"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.features.includes("Swimming Pool")}
                      onChange={handleCheckboxChange}
                      name="Swimming Pool"
                      value="Swimming Pool"
                      color="primary"
                    />
                  }
                  label="Swimming Pool"
                />
              </div>
            </FormControl>

            <FormControl component="fieldset" className="my-2">
              <FormLabel component="legend">Booking Status:</FormLabel>
              <RadioGroup
                aria-label="radio"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                className="d-flex flex-row"
              >
                <FormControlLabel
                  value="booked"
                  control={<Radio />}
                  label="Booked"
                />
                <FormControlLabel
                  value="available"
                  control={<Radio />}
                  label="Available"
                />
              </RadioGroup>
              {formik.touched.radio && formik.errors.radio && (
                <Typography color="error" variant="caption">
                  {formik.errors.radio}
                </Typography>
              )}
            </FormControl>
            <div className="d-flex justify-content-center">
              <Button variant="contained" className="my-3" type="submit">
                Create Hotel
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateHotel;
