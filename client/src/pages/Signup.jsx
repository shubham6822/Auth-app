import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function Signup() {
  // const { Users } = { username: "", email: "", passwor: ""}
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setuser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror(false);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);
      setloading(false);
      if (data.success === false) {
        seterror(true);
      } else {
        Navigate("/signin");
      }
    } catch (error) {
      seterror(true);
      setloading(false);
      console.log(error);
    }
  };

  return (
    <div className="items-center max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-3">Sign-Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className=" bg-slate-200 p-3 rounded-lg"
        />
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
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-80 disabled:opacity-90"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 my-3">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-600">Sign-in</span>
        </Link>
      </div>
      <p className="text-red-700">{error && "Some went wrong"}</p>
    </div>
  );
}
