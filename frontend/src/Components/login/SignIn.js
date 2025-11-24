import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // reuse your Login.css for background & styles

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, confirmPassword, pic } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please fill all the fields", {
        position: "bottom-center",
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match", {
        position: "bottom-center",
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }

    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        "http://localhost:5000/allUsers",
        { name, email, password, pic },
        config
      );

      toast.success("Registration successful", {
        position: "bottom-center",
        autoClose: 4000,
      });

      // Save user data and token to localStorage (same behavior as Login)
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chatpage");
    } catch (error) {
      console.error("Register error:", error.response || error);
      toast.error(
        error.response?.data?.message || "Registration failed",
        { position: "bottom-center", autoClose: 5000 }
      );
      setLoading(false);
    }
  };

  const handleGuest = () => {
    setFormData({
      name: "Guest User",
      email: "guest@example.com",
      password: "12345",
      confirmPassword: "12345",
      pic: "",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white/90">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2 rounded"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border p-2 rounded"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Profile picture URL (optional)</label>
          <input
            type="text"
            name="pic"
            className="w-full border p-2 rounded"
            value={formData.pic}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <button
          type="button"
          className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700 mt-4"
          onClick={handleGuest}
        >
          Fill as Guest
        </button>
      </form>

      <div className="mt-4 text-sm">
        Already have an account?{" "}
        <button
          className="text-blue-600 underline"
          onClick={() => navigate("/")}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignIn;
