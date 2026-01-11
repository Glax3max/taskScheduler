import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { api } from "../lib/api.js";
import { setToken } from "../lib/auth.js";
import { buttonClass, inputClass, subtleButtonClass } from "../components/ui.js";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = useMemo(() => location.state?.from || "/dashboard", [location.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    // Client-side validation (server will validate again).
    if (!email.trim()) return setError("Email is required");
    if (password.length < 1) return setError("Password is required");

    try {
      setSubmitting(true);
      const res = await api.post("/user/login", { email, password });
      setToken(res.data.token);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Sign in</h1>
            <p className="mt-1 text-sm text-white/60">Access your dashboard securely.</p>
          </div>

          {error ? (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/80">Email</label>
              <input
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white/80">Password</label>
              <input
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>

            <button className={buttonClass + " w-full"} disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-white/60">New here?</span>
            <Link className={subtleButtonClass} to="/register">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

