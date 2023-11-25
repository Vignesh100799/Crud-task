import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLoading } from "./Reducers/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app);
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      street: "",
      city: "",
      zipcode: "",
      phone: "",
      companyname: "",
      catchPhrase: "",

    },
    validate: (values) => {
      let errors = {};
      if (values.username === "") {
        errors.username = "Please enter the name";
      }
      if (values.name.length <= 3 || values.name.length > 15) {
        errors.name = "Name should be between 3 to 15";
      }
      if (values.name === "") {
        errors.name = "Please enter User name";
      }
      if (values.username.length <= 3) {
        errors.username = "User Name should greaterthan 3";
      }

      if (values.email === "") {
        errors.email = "* Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "* Enter Proper Email (ex : abc@mail.com)";
      }
      if (values.city === "") {
        errors.city = "Please enter city name";
      }
      if (values.street === "") {
        errors.street = "Please enter street name";
      }
      if (!values.zipcode) {
        errors.zipcode = "Zip Code is required";
      } else if (!/^\d{6}$/.test(values.zipcode)) {
        errors.zipcode = 'Invalid zip code';
      }
      
      if (!values.phone) {
        errors.phone = "Phone Number is required";
      } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = 'Invalid Phone numer';
      }
      
      if (values.companyname.length <= 3) {
        errors.companyname = "company Name should be greaterthan 3";
      }
      if (values.companyname === "") {
        errors.companyname = "Please enter company name";
      }
      if (values.catchPhrase === "") {
        errors.catchPhrase = "Please enter Catch Phrase ";
      }
      if (values.bs === "") {
        errors.bs = "Please enter bs ";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        toast.success(`${values.name} user is Created`);
        await axios.post(
          "https://65575a72bd4bcef8b6127cfb.mockapi.io/users",
          values
        );
        navigate("/");
      } catch (error) {
        toast.error(`${values.name} user not Created`);

        console.error(error);
      }
      //   console.log(values);
    },
  });
  return (
    <div className="container-fluid">
      {data.loading ? (
        <MoonLoader
          className=" position-fixed"
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
          color="rgba(4, 163, 255, 1)"
        />
      ) : (
        <>
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-4">
                <label className=" form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <span style={{ color: "red", fontSize: "small" }}>
                  {formik.errors.name}
                </span>
              </div>
              <div className="col-lg-4">
                <label className=" form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                <span style={{ color: "red", fontSize: "small" }}>
                  {formik.errors.username}
                </span>
              </div>

              <div className="col-lg-4">
                <label className=" form-label">Email</label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="form-control"
                />
                <span style={{ color: "red", fontSize: "small" }}>
                  {formik.errors.email}
                </span>
              </div>

              <div className="col-lg-4">
                <label className=" form-label">Street</label>
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                />
                <span style={{ color: "red", fontSize: "small" }}>
                  {formik.errors.street}
                </span>
              </div>

                <div className="col-lg-4">
                <label className=" form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
                <span style={{ color: "red", fontSize: "small" }}>
                  {formik.errors.city}
                </span>
              </div>

                <div className="col-lg-4">
                <label className=" form-label">Zipcode</label>
                <input
                  type="text"
                  className="form-control"
                  name="zipcode"
                  value={formik.values.zipcode}
                  onChange={formik.handleChange}
                />
                <span style={{ color: "red", fontSize: "small" }}>
                  {formik.errors.zipcode}
                </span>
              </div>

                <div className="col-lg-4">
                <label className=" form-label">Phone number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                <span style={{ color: "red", fontSize: "small" }}>
                  {formik.errors.phone}
                </span>
              </div>
              <div className="col-lg-4">
                <label className=" form-label">Company name</label>
                <input
                  type="text"
                  className="form-control "
                  name="companyname"
                  value={formik.values.companyname}
                  onChange={formik.handleChange}
                />
                <span style={{ color: "red", fontSize: "small" }}>
                  {formik.errors.companyname}
                </span>
              </div>

                <div className="col-lg-4">

                <label className=" form-label">catchPhrase</label>
                <input
                  type="text"
                  className="form-control"
                  name="catchPhrase"
                  value={formik.values.catchPhrase}
                  onChange={formik.handleChange}
                />
                <span style={{ color: "red", fontSize: "small" }}>
                  {formik.errors.catchPhrase}
                </span>
              </div>
              <div className="col-lg-12 mt-4">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value={"Submit"}
                />
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateUser;
