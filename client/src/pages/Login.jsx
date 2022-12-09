import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { reset, signin } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  // state affectors
  const { user, isLoading, message, isError, isSuccess } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isError) {
      console.log("error here");
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isLoading, isSuccess, message, dispatch, navigate]);

  // local affectors
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    console.log("dispatching signin");
    await dispatch(signin(userData));
  };

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Login
        </h1>
        <p>Please login to an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
