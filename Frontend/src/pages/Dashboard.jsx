import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";
import { clearToken } from "../lib/auth.js";
import { buttonClass, inputClass, subtleButtonClass } from "../components/ui.js";

function ProfileCard({ user, onSave, saving }) {
  // Initialize from props once; when `user` changes we remount via `key` from the parent.
  const [fname, setFname] = useState(user?.fname || "");
  const [lname, setLname] = useState(user?.lname || "");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Profile</h2>
          <p className="mt-1 text-sm text-white/60">Fetched from the backend (`/user/me`).</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/70">
          {user?.email}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">First name</label>
          <input className={inputClass} value={fname} onChange={(e) => setFname(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">Last name</label>
          <input className={inputClass} value={lname} onChange={(e) => setLname(e.target.value)} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <button className={buttonClass} onClick={() => onSave({ fname, lname })} disabled={saving}>
          {saving ? "Saving..." : "Save profile"}
        </button>
      </div>
    </div>
  );
}

function TasksPanel({ tasks, onCreate, onToggle, onRename, onDelete, loading }) {
  const [taskName, setTaskName] = useState("");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  const filtered = useMemo(() => {
    const byStatus = tasks.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return !!t.completed;
      return true;
    });

    const query = q.trim().toLowerCase();
    if (!query) return byStatus;
    return byStatus.filter((t) => (t.taskName || "").toLowerCase().includes(query));
  }, [tasks, q, filter]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Tasks</h2>
          <p className="mt-1 text-sm text-white/60">CRUD + search/filter UI (protected APIs).</p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <input
            className={inputClass + " md:w-64"}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tasks..."
          />
          <select
            className={inputClass + " md:w-44"}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          const name = taskName.trim();
          if (!name) return;
          onCreate(name);
          setTaskName("");
        }}
      >
        <input
          className={inputClass}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className={buttonClass + " sm:w-40"} type="submit" disabled={loading}>
          Add task
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {loading ? (
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            Loading tasks...
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            No tasks found.
          </div>
        ) : (
          filtered.map((t) => (
            <TaskRow
              key={t._id}
              task={t}
              onToggle={onToggle}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

function TaskRow({ task, onToggle, onRename, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(task.taskName || "");

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <input
          className="mt-1 h-4 w-4 accent-sky-500"
          type="checkbox"
          checked={!!task.completed}
          onChange={(e) => onToggle(task._id, e.target.checked)}
        />
        <div className="min-w-0">
          {editing ? (
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <div className={"truncate text-sm " + (task.completed ? "text-white/50 line-through" : "text-white")}>
              {task.taskName}
            </div>
          )}
          <div className="mt-1 text-xs text-white/40">
            {task.completed ? "Completed" : "Active"}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 sm:justify-end">
        {editing ? (
          <>
            <button
              className={buttonClass}
              onClick={() => {
                const trimmed = name.trim();
                if (!trimmed) return;
                onRename(task._id, trimmed);
                setEditing(false);
              }}
            >
              Save
            </button>
            <button className={subtleButtonClass} onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className={subtleButtonClass}
              onClick={() => {
                // When entering edit mode, copy the latest server value into the input.
                setName(task.taskName || "");
                setEditing(true);
              }}
            >
              Edit
            </button>
            <button
              className="inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/15"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 2000);
  }

  async function safeApi(fn) {
    try {
      return await fn();
    } catch (err) {
      // If token is invalid/expired, force logout.
      if (err?.response?.status === 401) {
        clearToken();
        navigate("/login", { replace: true });
        return;
      }
      throw err;
    }
  }

  async function loadMe() {
    const res = await safeApi(() => api.get("/user/me"));
    if (res?.data?.user) setUser(res.data.user);
  }

  async function loadTasks() {
    setLoadingTasks(true);
    const res = await safeApi(() => api.get("/task"));
    setTasks(res?.data?.tasks || []);
    setLoadingTasks(false);
  }

  useEffect(() => {
    // Dashboard boot: fetch profile + tasks in parallel-ish.
    loadMe();
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLogout() {
    // Backend endpoint exists (future token revocation), but UI flow is token deletion.
    await safeApi(() => api.post("/user/logout")).catch(() => {});
    clearToken();
    navigate("/login", { replace: true });
  }

  async function onSaveProfile(payload) {
    setSavingProfile(true);
    try {
      const res = await safeApi(() => api.put("/user/me", payload));
      if (res?.data?.user) setUser(res.data.user);
      showToast("Profile updated");
    } finally {
      setSavingProfile(false);
    }
  }

  async function onCreateTask(name) {
    const res = await safeApi(() => api.post("/task", { taskName: name }));
    if (res?.data?.task) {
      setTasks((prev) => [res.data.task, ...prev]);
      showToast("Task added");
    }
  }

  async function onToggleTask(id, completed) {
    const res = await safeApi(() => api.patch(`/task/${id}`, { completed }));
    if (res?.data?.task) {
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data.task : t)));
    }
  }

  async function onRenameTask(id, taskName) {
    const res = await safeApi(() => api.patch(`/task/${id}`, { taskName }));
    if (res?.data?.task) {
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data.task : t)));
      showToast("Task updated");
    }
  }

  async function onDeleteTask(id) {
    await safeApi(() => api.delete(`/task/${id}`));
    setTasks((prev) => prev.filter((t) => t._id !== id));
    showToast("Task deleted");
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0b1220]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-white">Dashboard</div>
            <div className="truncate text-xs text-white/50">
              {user ? `Welcome, ${user.fname || user.email}` : "Loading profile..."}
            </div>
          </div>
          <button className={subtleButtonClass} onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProfileCard key={user?.id || "me"} user={user} onSave={onSaveProfile} saving={savingProfile} />
          <TasksPanel
            tasks={tasks}
            loading={loadingTasks}
            onCreate={onCreateTask}
            onToggle={onToggleTask}
            onRename={onRenameTask}
            onDelete={onDeleteTask}
          />
        </div>
      </main>

      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2">
          <div className="rounded-xl border border-white/10 bg-black/60 px-4 py-2 text-sm text-white shadow-xl">
            {toast}
          </div>
        </div>
      ) : null}
    </div>
  );
}

