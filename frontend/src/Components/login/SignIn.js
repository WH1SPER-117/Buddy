import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      toast.warning("Please select a valid image file", {
        position: "bottom-center",
      });
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please fill all the fields", {
        position: "bottom-center",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match", {
        position: "bottom-center",
      });
      setLoading(false);
      return;
    }

    try {
      // Use FormData for file upload
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("password", password);
      if (file) fd.append("pic", file);

      const { data } = await axios.post(
        "http://localhost:5000/allUsers",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ---- important: persist and set axios default auth header ----
      localStorage.setItem("userInfo", JSON.stringify(data));

      // If token present, set axios default header for subsequent requests
      if (data?.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      }

      toast.success("Account created successfully", {
        position: "bottom-center",
      });

      setLoading(false);

      // Pass user data to ChatPage so it can use it immediately
      navigate("/chatpage", { state: { userInfo: data } });
    } catch (error) {
      console.error("Register error:", error.response || error);
      toast.error(error.response?.data?.message || "Registration failed", {
        position: "bottom-center",
      });
      setLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white/90">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="w-full border p-2 rounded"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            className="w-full border p-2 rounded"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </div>

        {/* FILE UPLOAD */}
        <div className="mb-4">
          <label htmlFor="pic" className="block mb-1">Profile Picture (optional)</label>
          <input
            id="pic"
            type="file"
            name="pic"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />

          {/* Preview */}
          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 object-cover rounded"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
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
