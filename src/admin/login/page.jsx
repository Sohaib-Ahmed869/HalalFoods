import React from "react";
import logo from "../../assets/logo.png";
import login from "../../assets/login.png";

const Form = () => {
  return (
    <form className="border border-gray-200 shadow-xl rounded-xl p-5 lg:p-10 bg-white flex flex-col gap-2 lg:gap-10">
      <div className="flex justify-between flex-col items-center lg:flex-row-reverse">
        <img src={logo} alt="logo" className="h-16" />
        <div>
          <h2 className="text-2xl font-bold">Admin Login</h2>
          <p className="text-gray-500">
            Welcome back. Enter your credentials to access your account
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input type="email" className="input input-bordered" id="email" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input type="password" className="input input-bordered" id="password" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <a href="#" className="text-primary">
          Forgot password?
        </a>
      </div>
      <button type="submit" className="btn btn-primary text-white w-full">
        Login
      </button>

      <p className="text-center text-gray-500">
        If you do not have an account, please contact the administrator
      </p>
    </form>
  );
};

const AdminLoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="z-10 lg:w-1/2 p-3 lg:p-0">
        <Form />
      </div>

      <img
        src={login}
        alt="login"
        className="absolute z-1 right-0 bottom-0 h-[40%] lg:h-[80%]"
      />
    </div>
  );
};

export default AdminLoginPage;
