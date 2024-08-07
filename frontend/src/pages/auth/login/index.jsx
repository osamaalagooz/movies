import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        await login(formData.email, formData.password);
        navigate("/");
      } catch (error) {
        setErrors({ login: "Failed to log in. Please try again." });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="login_container">
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        {errors.login && <span className="error">{errors.login}</span>}

        <button type="submit">Log In</button>

        <div className="login_links">
          <span className="register_link">
            Don't have an account? <Link to="/auth/register">Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
