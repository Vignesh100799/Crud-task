import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, setUsers } from "./Reducers/UserReducer";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

const EditUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      bs: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.username === "") {
        errors.username = "Please enter the name";
      }

      if (values.username.length <= 3 || values.username.length > 15) {
        errors.username = "User Name should be between 3 to 15";
      }
      if (values.name === "") {
        errors.name = "Please enter User name";
      }

      if (values.email === "") {
        errors.email = "* Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "* Enter Proper Email (ex : abc@mail.com)";
      }

      let enteredDate = new Date(values.dob);
      let currentDate = new Date();
      if (currentDate.getFullYear() - enteredDate.getFullYear() <= 18) {
        errors.dob = "Age should greater than 18";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const userdata = await axios.put(
          `https://65575a72bd4bcef8b6127cfb.mockapi.io/users/${params.id}`,
          values
        );

        dispatch(setUsers(userdata.data));
        toast.success(`${values.name} Updated Successfully`);
        navigate("/user");
      } catch (error) {
        console.error(error);
        toast.error(`${values.name} Not updated.`);
      }
      // console.log(values);
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const empList = await axios.get(
          `https://65575a72bd4bcef8b6127cfb.mockapi.io/users/${params.id}`
        );
        dispatch(editUser(empList.data));
        // delete empList.data.id;
        formik.setValues(empList.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="container-fluid">
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

          <div className="col-lg-12">
            <label className=" form-label">Street</label>
            <input
              type="text"
              className="form-control col-2"
              name="street"
              value={formik.values.street}
              onChange={formik.handleChange}
            />
            <label className=" form-label">City</label>
            <input
              type="text"
              className="form-control col-2"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
            <label className=" form-label">Zipcode</label>
            <input
              type="text"
              className="form-control col-2"
              name="zipcode"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
            />
            <label className=" form-label">Phone number</label>
            <input
              type="text"
              className="form-control col-3"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
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
            <label className=" form-label">catchPhrase</label>
            <input
              type="text"
              className="form-control"
              name="catchPhrase"
              value={formik.values.catchPhrase}
              onChange={formik.handleChange}
            />
            <label className=" form-label">bs</label>
            <input
              type="text"
              className="form-control"
              name="bs"
              value={formik.values.bs}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-lg-12 mt-4">
            <input type="submit" className="btn btn-primary" value={"Submit"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
