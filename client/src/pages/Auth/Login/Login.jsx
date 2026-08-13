import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../../../validation/auth.validation";
import { login } from "../../../services/auth.service";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // console.log(errors);

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      // console.log(response);
      setUser(response.data);
      navigate("/", { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      console.log(message);
    }
    // console.log("form submit")
  };
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
  return (
    <main className={styles.login}>
      <section className={styles.card}>
        <header className={styles.header}>
          <Link to={"/"}><h1>DevConnect</h1></Link>
          <p>Connect • Learn • Grow</p>
        </header>

        <section className={styles.formSection}>
          <h2>Welcome Back 👋</h2>
          <p>Login to continue</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />

              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>

            {/* Password */}

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>

              <div className={styles.passwordContainer}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                />

                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}

            <div className={styles.options}>
              <div className={styles.rememberMe}>
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register("rememberMe")}
                />

                <label htmlFor="rememberMe">Remember Me</label>
              </div>

              <Link to="/forgot-password" className={styles.forgotPassword}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>

          <footer className={styles.footer}>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </footer>
        </section>
      </section>
    </main>
  );
}

export default Login;
