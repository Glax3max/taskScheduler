import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../lib/api.js";
import { setToken } from "../lib/auth.js";
import { buttonClass, inputClass, subtleButtonClass } from "../components/ui.js";

export function Register() {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Email is required");
    if (password.length < 8) return setError("Password must be at least 8 characters");

    try {
      setSubmitting(true);
      const res = await api.post("/user/signup", { fname, lname, email, password });
      setToken(res.data.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Create account</h1>
            <p className="mt-1 text-sm text-white/60">Sign up and start managing tasks.</p>
          </div>

          {error ? (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-white/80">First name</label>
                <input
                  className={inputClass}
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  type="text"
                  autoComplete="given-name"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-white/80">Last name</label>
                <input
                  className={inputClass}
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  type="text"
                  autoComplete="family-name"
                  placeholder="Doe"
                />
              </div>
            </div>

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
                autoComplete="new-password"
                placeholder="At least 8 characters"
              />
              <p className="mt-1 text-xs text-white/45">
                Tip: use a long passphrase (this demo stores a hashed password in MongoDB).
              </p>
            </div>

            <button className={buttonClass + " w-full"} disabled={submitting}>
              {submitting ? "Creating..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-white/60">Already have an account?</span>
            <Link className={subtleButtonClass} to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

