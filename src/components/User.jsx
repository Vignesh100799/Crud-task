import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, setLoading, setUsers } from "./Reducers/UserReducer";
import Table from "./Table";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";

const User = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app);
  // console.log()
  const handleDelete = async (userId, name) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(
        `https://65575a72bd4bcef8b6127cfb.mockapi.io/users/${userId}`
      );

      dispatch(deleteUser(userId));
      toast.success(`${name} is deleted`);
    } catch (error) {
      console.log(error);
      toast.error(`${name} is not deleted`);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const getData = async () => {
    try {
      dispatch(setLoading(true));

      const userdata = await axios.get(
        "https://65575a72bd4bcef8b6127cfb.mockapi.io/users"
      );
      dispatch(setUsers(userdata.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="row justify-content-end text-bg-secondary">
        <h1 className="m-5 text-center">Users List</h1>
        <Link
          to="/create-user"
          // className="d-none d-sm-inline-block btn btn-primary"
          className="btn btn-success p-2 m-3 col-xl-2 col-sm-2"

        >
          <i className="fa-solid fa-plus" /> Create User
        </Link>

        {data.loading ? (
          <MoonLoader
            className=" text-center position-fixed"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
            color="rgba(4, 163, 255, 1)"
          />
        ) : (
          <div className=" container mb-4">
            <div className="row">
              <div className="card-body">
                <div className="table-responsive">
                  {data.users.length === 0 ? (
                    <h1
                      className=" position-fixed"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      }}
                      color="rgba(4, 163, 255, 1)"
                    >
                      No Users in this list
                    </h1>
                  ) : (
                    <Table data={data} handleDelete={handleDelete} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
