import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFail,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [user, setuser] = useState();
  const { loading, error } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setuser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };
  console.log(user);

  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      if (data.success === false) {
        dispatch(signInFail(error));
      } else {
        Navigate("/");
      }
    } catch (error) {
      dispatch(signInFail(error));
    }
  };

  return (
    <div className="items-center max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-3 text-center">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className=" bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className=" bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-700 p-3 rounded text-white uppercase disabled: opacity-95 hover:opacity-80">
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-3 mt-3">
        <p>Dont Have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700"> Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-2">{error && "Wrong Cerdentails"}</p>
    </div>
  );
}
