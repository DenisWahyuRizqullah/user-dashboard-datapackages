import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Fetch semua users dari endpoint /users
      const response = await api.get("/users");
      const users = response.data;

      // Cari user yang cocok dengan email dan password
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Login berhasil, redirect ke dashboard
        console.log("Login berhasil:", user);
        navigate("/dashboard");
      } else {
        // Login gagal
        setError("Email atau password salah!");
      }
    } catch (error) {
      console.error("Error saat login:", error);
      setError("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Selamat Datang</h1>
          <p>Silakan login untuk melanjutkan</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <p className="demo-info">
            Demo: admin@mail.com / 123456
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
