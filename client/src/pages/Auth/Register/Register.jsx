import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import { registerUser } from "../../../services/auth.service";
import styles from "./Register.module.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await registerUser(formData);

      // Registration successful
      navigate("/login", {
        replace: true,
        state: {
          message: "Registration successful. Please login.",
        },
      });
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            DevConnect
          </Link>

          <div className={styles.leftContent}>
            <h1>
              Join <span>DevConnect</span>
            </h1>

            <p>
              Create your account and connect with developers, share your
              knowledge, and grow your professional network.
            </p>

            <div className={styles.features}>
              <div>
                <strong>Connect</strong>
                <span>Connect with developers.</span>
              </div>

              <div>
                <strong>Share</strong>
                <span>Share posts and ideas.</span>
              </div>

              <div>
                <strong>Grow</strong>
                <span>Build your developer network.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Register Card */}
        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.heading}>
              <h2>Create account</h2>
              <p>Start your journey with DevConnect</p>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className={styles.inputGroup}>
                <label>Full Name</label>

                <div className={styles.inputWrapper}>
                  <FiUser />

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Username */}
              <div className={styles.inputGroup}>
                <label>Username</label>

                <div className={styles.inputWrapper}>
                  <span className={styles.at}>@</span>

                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className={styles.inputGroup}>
                <label>Email</label>

                <div className={styles.inputWrapper}>
                  <FiMail />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className={styles.inputGroup}>
                <label>Password</label>

                <div className={styles.inputWrapper}>
                  <FiLock />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className={styles.passwordBtn}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                <small>Password must be at least 6 characters.</small>
              </div>

              <button
                type="submit"
                className={styles.registerBtn}
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className={styles.loginText}>
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}