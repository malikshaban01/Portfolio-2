import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../lib/supabase';
import { Loader2, Upload, LogOut, FileText, Mail, Trash2, Plus, ArrowLeft, CheckCircle2, AlertCircle, ExternalLink, Calendar } from 'lucide-react';

interface Message { id: number; name: string; email: string; message: string; created_at: string }
interface Project { id: number; title: string; description: string; tech: string[]; github_url: string }
interface Resume { id: number; filename: string; url: string; uploaded_at: string }

export default function Admin() {
  const { user, loading: authLoading, session } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<'resume' | 'messages' | 'projects'>('resume');
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [resume, setResume] = useState<Resume | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newProject, setNewProject] = useState({ title: '', description: '', tech: '', github_url: '' });

  useEffect(() => {
    if (!authLoading && !user) nav('/admin/login');
  }, [authLoading, user, nav]);

  const load = () => {
    fetch('/api/resume').then(r => r.json()).then(setResume).catch(() => {});
    fetch('/api/projects').then(r => r.json()).then(setProjects).catch(() => {});
    if (session?.access_token) {
      fetch('/api/messages', { headers: { Authorization: `Bearer ${session.access_token}` } })
        .then(r => r.json()).then(setMessages).catch(() => {});
    }
  };

  useEffect(() => { if (user) load(); }, [user, session]);

  const uploadResume = async (file: File) => {
    setStatus(null);
    if (file.type !== 'application/pdf') { setStatus({ type: 'error', text: 'Only PDF files allowed.' }); return; }
    if (file.size > 5 * 1024 * 1024) { setStatus({ type: 'error', text: 'File must be under 5MB.' }); return; }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const res = await fetch('/api/resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
          body: JSON.stringify({ fileName: file.name, fileBase64: base64 }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setStatus({ type: 'success', text: 'Resume uploaded successfully.' });
        load();
      } catch (e: any) {
        setStatus({ type: 'error', text: e.message });
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({
        title: newProject.title,
        description: newProject.description,
        tech: newProject.tech.split(',').map(s => s.trim()).filter(Boolean),
        github_url: newProject.github_url,
      }),
    });
    if (res.ok) {
      setNewProject({ title: '', description: '', tech: '', github_url: '' });
      load();
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    await fetch('/api/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    await fetch('/api/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const logout = async () => { await supabase.auth.signOut(); nav('/admin/login'); };

  if (authLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-teal-400" /></div>;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5 bg-navy-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-400 hover:text-teal-400 transition" aria-label="Back"><ArrowLeft size={18} /></Link>
            <div>
              <h1 className="font-bold text-slate-100">Admin Panel</h1>
              <p className="font-mono text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <nav className="flex gap-1 mb-8 border-b border-white/5">
          {[
            { id: 'resume', label: 'Resume', icon: FileText },
            { id: 'messages', label: `Messages (${messages.length})`, icon: Mail },
            { id: 'projects', label: 'Projects', icon: Plus },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                tab === t.id ? 'text-teal-400 border-teal-400' : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </nav>

        {status && (
          <div className={`mb-6 flex items-center gap-2 px-4 py-3 rounded-lg border text-sm ${
            status.type === 'success' ? 'bg-teal-400/10 border-teal-400/20 text-teal-300' : 'bg-red-400/10 border-red-400/20 text-red-400'
          }`}>
            {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {status.text}
          </div>
        )}

        {tab === 'resume' && (
          <div className="space-y-6">
            <div className="bg-navy-900/50 border border-white/5 rounded-xl p-6">
              <h2 className="font-semibold text-slate-100 mb-2">Current Resume</h2>
              {resume ? (
                <div className="flex items-center justify-between p-4 bg-navy-950/60 rounded-lg">
                  <div>
                    <div className="font-mono text-teal-400 text-sm">{resume.filename}</div>
                    <div className="text-xs text-slate-500 mt-1">Uploaded {new Date(resume.uploaded_at).toLocaleString()}</div>
                  </div>
                  <a href={resume.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-teal-400 hover:underline text-sm">
                    View <ExternalLink size={14} />
                  </a>
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No resume uploaded yet.</p>
              )}
            </div>

            <div className="bg-navy-900/50 border border-white/5 rounded-xl p-6">
              <h2 className="font-semibold text-slate-100 mb-4">Upload New Resume</h2>
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:border-teal-400/40 transition">
                  {uploading ? (
                    <Loader2 className="animate-spin text-teal-400 mx-auto" />
                  ) : (
                    <>
                      <Upload className="text-teal-400 mx-auto mb-3" size={32} />
                      <p className="text-slate-300">Click to select PDF</p>
                      <p className="text-xs text-slate-500 mt-1 font-mono">max 5MB · PDF only</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && uploadResume(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-16 text-slate-500">No messages yet.</div>
            ) : messages.map(m => (
              <div key={m.id} className="bg-navy-900/50 border border-white/5 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="font-semibold text-slate-100">{m.name}</div>
                    <a href={`mailto:${m.email}`} className="text-teal-400 text-sm font-mono hover:underline">{m.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                      <Calendar size={12} /> {new Date(m.created_at).toLocaleDateString()}
                    </div>
                    <button onClick={() => deleteMessage(m.id)} className="text-slate-500 hover:text-red-400" aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-slate-300 text-sm whitespace-pre-wrap">{m.message}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'projects' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <form onSubmit={addProject} className="bg-navy-900/50 border border-white/5 rounded-xl p-6 space-y-3 h-fit">
              <h2 className="font-semibold text-slate-100 mb-2">Add Project</h2>
              <input required placeholder="Title" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} className="w-full px-3 py-2 bg-navy-950/60 border border-white/10 rounded-lg text-slate-100 focus:border-teal-400 focus:outline-none" />
              <textarea required placeholder="Description" rows={3} value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} className="w-full px-3 py-2 bg-navy-950/60 border border-white/10 rounded-lg text-slate-100 focus:border-teal-400 focus:outline-none resize-none" />
              <input placeholder="Tech (comma separated: C++, OOP)" value={newProject.tech} onChange={e => setNewProject({ ...newProject, tech: e.target.value })} className="w-full px-3 py-2 bg-navy-950/60 border border-white/10 rounded-lg text-slate-100 focus:border-teal-400 focus:outline-none" />
              <input placeholder="GitHub URL" value={newProject.github_url} onChange={e => setNewProject({ ...newProject, github_url: e.target.value })} className="w-full px-3 py-2 bg-navy-950/60 border border-white/10 rounded-lg text-slate-100 focus:border-teal-400 focus:outline-none" />
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-400 text-navy-950 rounded-lg font-semibold hover:bg-teal-300 transition">
                <Plus size={16} /> Add Project
              </button>
            </form>

            <div className="space-y-3">
              {projects.map(p => (
                <div key={p.id} className="bg-navy-900/50 border border-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-100">{p.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.tech.map(t => <span key={t} className="font-mono text-[10px] text-teal-300 px-1.5 py-0.5 bg-teal-400/10 rounded">{t}</span>)}
                      </div>
                    </div>
                    <button onClick={() => deleteProject(p.id)} className="text-slate-500 hover:text-red-400" aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
