import { useState } from "react";
import Reveal from "../components/Reveal";
import MicroLabel from "../components/MicroLabel";
import { useAuth } from "../contexts/AuthContext";

export default function Profile({ active, onBack }) {
  const { user, profile, loading, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ full_name: "", avatar_url: "" });
  const [saving, setSaving] = useState(false);

  const startEditing = () => {
    setForm({
      full_name: profile?.full_name || "",
      avatar_url: profile?.avatar_url || "",
    });
    setEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    await updateProfile(user.id, form);
    setSaving(false);
    setEditing(false);
  };

  if (loading) return null;

  return (
    <section
      id="profile"
      aria-label="Profile"
      className={`section-spread snap-center-force relative bg-surface/30 backdrop-blur-sm ${
        active ? "active" : ""
      }`}
    >
      <Reveal className="max-w-2xl w-full px-6 md:px-16">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to portfolio"
          className="mb-6 inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors text-xs font-bold tracking-widest uppercase"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            arrow_back
          </span>
          Back
        </button>
        <MicroLabel className="mb-6 block">05 / PROFILE</MicroLabel>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8">
          Your Profile
        </h2>

        {!user ? (
          <p className="text-on-surface-variant">Please sign in to view your profile.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {profile?.avatar_url && !editing && (
              <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 mb-4">
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <label htmlFor="profile-full-name" className="text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase">Full Name</label>
            {editing ? (
              <input
                id="profile-full-name"
                value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-outline-variant py-3 focus:border-secondary outline-none text-primary"
                placeholder="John Doe"
                autoComplete="name"
                 />
              ) : (
                <p className="text-primary text-lg font-display">{profile?.full_name || "—"}</p>
              )}
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase">Email</p>
              <p className="text-primary text-lg font-display">{user.email}</p>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase">Role</p>
              <p className="text-primary text-lg font-display capitalize">{profile?.role || "user"}</p>
            </div>

            {editing && (
              <div>
                <label htmlFor="profile-avatar-url" className="text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase">Avatar URL</label>
                <input
                  id="profile-avatar-url"
                  value={form.avatar_url}
                  onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-outline-variant py-3 focus:border-secondary outline-none text-primary"
                  placeholder="https://example.com/avatar.jpg"
                  autoComplete="photo"
                 />
                <p className="text-xs text-on-surface-variant/80 mt-1">Avatar upload will be available soon.</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {editing ? (
                <>
                  <button type="submit" disabled={saving} className="bg-secondary text-surface px-6 py-3 rounded-xl font-bold text-xs tracking-widest hover:brightness-110 transition-all disabled:opacity-50">
                    {saving ? "SAVING…" : "SAVE CHANGES"}
                  </button>
                  <button type="button" onClick={() => setEditing(false)} className="text-on-surface-variant hover:text-primary transition-colors text-xs tracking-widest uppercase">
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" onClick={startEditing} className="bg-primary text-surface px-6 py-3 rounded-xl font-bold text-xs tracking-widest hover:bg-secondary hover:text-white transition-all">
                  EDIT PROFILE
                </button>
              )}
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}