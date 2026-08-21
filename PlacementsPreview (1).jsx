/* ============================================================
   PREVIEW-ONLY FILE
   This wraps the redesigned Placements content with a mock of
   your existing sidebar, purely so the full page can be reviewed
   together. Do NOT use this file for integration — drop the
   content from PlacementsPage.jsx into your real app shell,
   which already has its own working sidebar component.
   ============================================================ */
import React, { useState, useEffect, useRef } from "react";
import {
  Trophy,
  TrendingUp,
  Award,
  Target,
  ArrowRight,
  RefreshCw,
  Percent,
  MoreVertical,
  Eye,
  PenLine,
  Inbox,
  ArrowUpRight,
  ChevronRight,
  CheckCheck,
  LayoutGrid,
  Building2,
  Users,
  Send,
  Briefcase,
  CalendarClock,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  ChevronsLeft,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Design tokens — Leapath purple system, matched to Import Students   */
/* ------------------------------------------------------------------ */
const T = {
  heroFrom: "#180F28",
  heroMid: "#241539",
  heroTo: "#4B2BB4",
  accent: "#7C5CFC",
  accent2: "#8B5CF6",
  accentDeep: "#6D3FE0",
  lavender: "#C4B5FD",
  page: "#F7F6FB",
};

/* ------------------------------------------------------------------ */
/* Sample data — shape mirrors the existing Placements table           */
/* ------------------------------------------------------------------ */
const STUDENTS = [
  { id: 1, name: "demoStudent", dept: "CSE · Final Year", recruiter: "Kiran", company: "CGI", status: "Joined", ctc: "8 LPA", activity: "13h ago" },
  { id: 2, name: "Neha Kapoor", dept: "IT · Final Year", recruiter: "Kiran", company: "CGI", status: "Contacted", ctc: "—", activity: "1d ago" },
  { id: 3, name: "Rohan Singh", dept: "ECE · Final Year", recruiter: "Kiran", company: "CGI", status: "Shortlisted", ctc: "—", activity: "3d ago" },
  { id: 4, name: "Rahul Sharma", dept: "CSE · Final Year", recruiter: "Kiran", company: "CGI", status: "Interested", ctc: "—", activity: "3d ago" },
  { id: 5, name: "Aisha Verma", dept: "IT · Final Year", recruiter: "Kiran", company: "CGI", status: "Rejected", ctc: "—", activity: "3d ago" },
  { id: 6, name: "Aisha Verma", dept: "IT · Final Year", recruiter: "Kiran", company: "CGI", status: "Bookmarked", ctc: "—", activity: "3d ago" },
  { id: 7, name: "Rohan Singh", dept: "ECE · Final Year", recruiter: "Kiran", company: "CGI", status: "Contacted", ctc: "—", activity: "7/30/2026" },
  { id: 8, name: "Priyanka Das", dept: "CSE · Final Year", recruiter: "Kiran", company: "CGI", status: "Shortlisted", ctc: "—", activity: "7/27/2026" },
  { id: 9, name: "Nikhil Sharma", dept: "IT · Final Year", recruiter: "Kiran", company: "CGI", status: "Shortlisted", ctc: "—", activity: "7/24/2026" },
  { id: 10, name: "Priya Singh", dept: "ECE · Final Year", recruiter: "Kiran", company: "CGI", status: "Shortlisted", ctc: "—", activity: "7/23/2026" },
  { id: 11, name: "Arjun Mehta", dept: "CSE · Final Year", recruiter: "Kiran", company: "CGI", status: "Shortlisted", ctc: "—", activity: "7/23/2026" },
  { id: 12, name: "Sana Iyer", dept: "IT · Final Year", recruiter: "Kiran", company: "CGI", status: "Contacted", ctc: "—", activity: "7/20/2026" },
];

const FILTERS = ["All", "Shortlisted", "Interview", "Offered", "Joined", "Rejected"];

const STATUS_STYLES = {
  Joined: { bg: "#ECFDF5", fg: "#15803D", dot: "#22C55E" },
  Offered: { bg: "#FFFBEB", fg: "#B45309", dot: "#F59E0B" },
  Interview: { bg: "#EFF6FF", fg: "#1D4ED8", dot: "#3B82F6" },
  Shortlisted: { bg: "#F5F3FF", fg: "#6D28D9", dot: "#8B5CF6" },
  Rejected: { bg: "#FEF2F2", fg: "#B91C1C", dot: "#EF4444" },
  Contacted: { bg: "#F3F4F6", fg: "#4B5563", dot: "#9CA3AF" },
  Interested: { bg: "#F3F4F6", fg: "#4B5563", dot: "#9CA3AF" },
  Bookmarked: { bg: "#F3F4F6", fg: "#6B7280", dot: "#9CA3AF" },
};

const AVATAR_PALETTE = ["#7C5CFC", "#8B5CF6", "#6366F1", "#A78BFA", "#4B2BB4", "#9333EA"];

function initials(name) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] || "").toUpperCase() + (parts[1]?.[0] || "").toUpperCase();
}
function colorFor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

/* ------------------------------------------------------------------ */
/* Reveal wrapper — staggered load-in animation                        */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, style = {}, className = "" }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown
          ? `${style.transform ? style.transform + " " : ""}translateY(0)`
          : `${style.transform ? style.transform + " " : ""}translateY(14px)`,
        transition: "opacity 0.65s cubic-bezier(.16,1,.3,1), transform 0.65s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {children}
    </div>
  );
}

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.Contacted;
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full font-semibold"
      style={{
        backgroundColor: s.bg,
        color: s.fg,
        fontSize: 12,
        padding: "5px 10px 5px 8px",
        border: `1px solid ${s.dot}26`,
      }}
    >
      <span className="relative flex" style={{ width: 6, height: 6 }}>
        {(status === "Joined" || status === "Interview") && (
          <span
            className="absolute inline-flex rounded-full"
            style={{ width: "100%", height: "100%", backgroundColor: s.dot, animation: "lpPulse 2.2s ease-in-out infinite" }}
          />
        )}
        <span className="relative inline-flex rounded-full" style={{ width: 6, height: 6, backgroundColor: s.dot }} />
      </span>
      {status}
    </span>
  );
}

function RowMenu({ open, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      ref={ref}
      className="lp-menu-in absolute right-0 top-9 z-20 bg-white border border-gray-100 overflow-hidden"
      style={{ width: 220, borderRadius: 16, boxShadow: "0 24px 48px -14px rgba(20,10,50,0.25)", padding: "8px" }}
    >
      <button
        className="flex w-full items-center gap-3 text-left text-gray-700 transition-colors duration-150 hover:bg-violet-50 hover:text-violet-700"
        style={{ padding: "9px 10px", fontSize: 13.5, fontWeight: 500, borderRadius: 10, border: "none", background: "none", cursor: "pointer" }}
      >
        <span className="flex items-center justify-center flex-shrink-0" style={{ width: 26, height: 26, borderRadius: 8, background: "#F5F3FF" }}>
          <Eye size={13.5} style={{ color: T.accent }} />
        </span>
        View student details
      </button>
      <button
        className="flex w-full items-center gap-3 text-left text-gray-700 transition-colors duration-150 hover:bg-violet-50 hover:text-violet-700"
        style={{ padding: "9px 10px", fontSize: 13.5, fontWeight: 500, borderRadius: 10, border: "none", background: "none", cursor: "pointer" }}
      >
        <span className="flex items-center justify-center flex-shrink-0" style={{ width: 26, height: 26, borderRadius: 8, background: "#F5F3FF" }}>
          <PenLine size={13.5} style={{ color: T.accent }} />
        </span>
        Update placement status
      </button>
    </div>
  );
}

const METRIC_THEMES = {
  violet: { chip: "linear-gradient(135deg, #F5F3FF, #EDE9FE)", fg: T.accent, glow: T.accent, bar: `linear-gradient(90deg, ${T.accent}, ${T.heroTo})` },
  amber: { chip: "linear-gradient(135deg, #FFFBEB, #FEF3C7)", fg: "#B45309", glow: "#F59E0B", bar: "linear-gradient(90deg, #F59E0B, #D97706)" },
  emerald: { chip: "linear-gradient(135deg, #ECFDF5, #D1FAE5)", fg: "#059669", glow: "#10B981", bar: "linear-gradient(90deg, #10B981, #059669)" },
  blue: { chip: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", fg: "#1D4ED8", glow: "#3B82F6", bar: "linear-gradient(90deg, #3B82F6, #1D4ED8)" },
};

function MetricCard({ icon: Icon, label, value, trend, delay, theme = "violet", progress }) {
  const th = METRIC_THEMES[theme];
  return (
    <Reveal delay={delay}>
      <div
        className="group relative overflow-hidden bg-white border border-gray-100 transition-all duration-300 hover:-translate-y-1"
        style={{ borderRadius: 20, padding: 20, boxShadow: "0 1px 2px rgba(16,4,48,0.05)" }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 22px 44px -18px ${th.glow}55`)}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 2px rgba(16,4,48,0.05)")}
      >
        {/* top accent bar, brightens on hover */}
        <div className="absolute inset-x-0 top-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ height: 3, background: th.bar }} />
        <div
          className="pointer-events-none absolute transition-transform duration-500 group-hover:scale-125"
          style={{
            top: -24,
            right: -24,
            width: 96,
            height: 96,
            borderRadius: 999,
            opacity: 0.08,
            background: `radial-gradient(circle, ${th.glow}, transparent 70%)`,
          }}
        />
        <div className="relative flex items-start justify-between">
          <div
            className="flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6"
            style={{ width: 44, height: 44, borderRadius: 14, background: th.chip }}
          >
            <Icon size={20} style={{ color: th.fg }} strokeWidth={2} />
          </div>
          {trend && (
            <span
              className="flex items-center gap-1 rounded-full font-semibold"
              style={{ background: "#ECFDF5", color: "#059669", fontSize: 11, padding: "4px 8px" }}
            >
              <ArrowUpRight size={11} /> {trend}
            </span>
          )}
          {typeof progress === "number" && (
            <svg width="34" height="34" viewBox="0 0 34 34" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="17" cy="17" r="14" fill="none" stroke="#F3F1FB" strokeWidth="4" />
              <circle
                cx="17"
                cy="17"
                r="14"
                fill="none"
                stroke={th.glow}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 14}`}
                strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
                style={{ transition: "stroke-dashoffset 1s cubic-bezier(.16,1,.3,1)" }}
              />
            </svg>
          )}
        </div>
        <div className="relative" style={{ marginTop: 18 }}>
          <div className="font-extrabold text-gray-900" style={{ fontSize: 28, lineHeight: 1, letterSpacing: "-0.02em" }}>
            {value}
          </div>
          <div className="font-medium text-gray-500" style={{ fontSize: 13, marginTop: 7 }}>
            {label}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar mock — matches your existing nav, for preview purposes only */
/* ------------------------------------------------------------------ */
const NAV = [
  { section: "OVERVIEW", items: [{ icon: LayoutGrid, label: "Dashboard" }] },
  {
    section: "DEPARTMENTS",
    items: [
      { icon: Building2, label: "Departments" },
      { icon: Users, label: "Staff Management" },
      { icon: Send, label: "Announcements" },
    ],
  },
  {
    section: "RECRUITERS",
    items: [
      { icon: Briefcase, label: "Recruiters" },
      { icon: CalendarClock, label: "Drives" },
      { icon: Award, label: "Placements", active: true },
    ],
  },
  {
    section: "COMMUNICATION",
    items: [
      { icon: MessageSquare, label: "Student Messages" },
      { icon: Settings, label: "Settings" },
      { icon: HelpCircle, label: "Support" },
    ],
  },
];

function Sidebar() {
  return (
    <div
      style={{
        width: 272,
        flexShrink: 0,
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${T.heroFrom}, ${T.heroMid})`,
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px" }}>
        <div className="text-white font-extrabold" style={{ fontSize: 30, lineHeight: 1 }}>
          L
        </div>
        <div>
          <div className="text-white font-bold" style={{ fontSize: 17 }}>Leapath.</div>
        </div>
      </div>
      <div style={{ margin: "10px 8px 26px" }}>
        <span
          className="font-bold"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.06em",
            color: "#6EE7B7",
            background: "rgba(16,185,129,0.14)",
            borderRadius: 999,
            padding: "4px 10px",
          }}
        >
          TPO WORKSPACE
        </span>
      </div>

      {NAV.map((group) => (
        <div key={group.section} style={{ marginBottom: 22 }}>
          <div
            className="font-bold"
            style={{ color: "rgba(255,255,255,0.32)", fontSize: 10.5, letterSpacing: "0.08em", padding: "0 12px 10px" }}
          >
            {group.section}
          </div>
          {group.items.map((item) => (
            <div
              key={item.label}
              className="flex items-center"
              style={{
                gap: 12,
                borderRadius: 12,
                padding: "10px 12px",
                marginBottom: 2,
                cursor: "pointer",
                color: item.active ? "#fff" : "rgba(255,255,255,0.55)",
                fontWeight: item.active ? 700 : 500,
                fontSize: 14,
                background: item.active
                  ? `linear-gradient(90deg, ${T.accent}30, transparent)`
                  : "transparent",
                borderLeft: item.active ? `3px solid ${T.accent}` : "3px solid transparent",
              }}
            >
              <item.icon size={17} />
              {item.label}
            </div>
          ))}
        </div>
      ))}

      <div style={{ flex: 1 }} />

      <div
        className="flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, marginTop: 12 }}
      >
        <div className="flex items-center" style={{ gap: 10 }}>
          <div
            className="flex items-center justify-center text-white font-bold"
            style={{ width: 34, height: 34, borderRadius: 999, background: `linear-gradient(135deg, ${T.accent2}, ${T.accentDeep})`, fontSize: 12 }}
          >
            AK
          </div>
          <div>
            <div className="text-white font-bold" style={{ fontSize: 13 }}>Arun Kumar</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11.5 }}>Training & Placement</div>
          </div>
        </div>
        <LogOut size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
      </div>
      <div className="flex items-center" style={{ gap: 6, color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", marginTop: 14, padding: "0 4px", cursor: "pointer" }}>
        <ChevronsLeft size={14} /> COLLAPSE
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */
function PlacementsContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const counts = {
    All: STUDENTS.length,
    Shortlisted: STUDENTS.filter((s) => s.status === "Shortlisted").length,
    Interview: STUDENTS.filter((s) => s.status === "Interview").length,
    Offered: STUDENTS.filter((s) => s.status === "Offered").length,
    Joined: STUDENTS.filter((s) => s.status === "Joined").length,
    Rejected: STUDENTS.filter((s) => s.status === "Rejected").length,
  };
  const filtered = activeFilter === "All" ? STUDENTS : STUDENTS.filter((s) => s.status === activeFilter);
  const totalPlacements = counts.Joined;
  const activeOffers = counts.Offered;
  const avgCtc = "8.0 LPA";
  const placementRate = Math.round((counts.Joined / counts.All) * 100) || 0;

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: T.page, padding: "32px 24px" }}>
      <style>{`
        @keyframes lpPulse { 0%,100% { opacity:.55; transform:scale(1);} 50% { opacity:1; transform:scale(1.2);} }
        @keyframes lpFloat { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-10px);} }
        @keyframes lpFloat2 { 0%,100% { transform: translateY(0);} 50% { transform: translateY(9px);} }
        @keyframes lpSpin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        @keyframes lpSpinRev { from { transform: rotate(360deg);} to { transform: rotate(0deg);} }
        @keyframes lpMenuIn { from { opacity:0; transform: translateY(-6px) scale(.97);} to { opacity:1; transform: translateY(0) scale(1);} }
        .lp-menu-in { animation: lpMenuIn 0.16s cubic-bezier(.16,1,.3,1); transform-origin: top right; }
        .lp-dot { animation: lpPulse 2.2s ease-in-out infinite; }
        .lp-float { animation: lpFloat 6s ease-in-out infinite; }
        .lp-float2 { animation: lpFloat2 7s ease-in-out infinite .3s; }
        .lp-ring1 { animation: lpSpin 70s linear infinite; }
        .lp-ring2 { animation: lpSpinRev 90s linear infinite; }

        .lp-hero-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        .lp-hero-visual { display: none; }
        .lp-divider { display: none; }
        .lp-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 16px;
        }
        @media (min-width: 900px) {
          .lp-hero-grid { grid-template-columns: 1.15fr 0.85fr; }
          .lp-hero-visual { display: block; }
          .lp-divider { display: block; }
        }
      `}</style>

      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        {/* ============================== HERO ============================== */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 36,
            padding: "56px 44px",
            background: `linear-gradient(125deg, ${T.heroFrom} 0%, ${T.heroMid} 40%, ${T.heroTo} 100%)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.3,
              backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(55% 75% at 88% 45%, ${T.accent}4D, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -100,
              top: -100,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: `${T.accent2}26`,
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          <div className="lp-hero-grid" style={{ position: "relative" }}>
            {/* ------------------------- LEFT: content ------------------------- */}
            <div>
              <Reveal delay={60}>
                <div
                  className="inline-flex items-center"
                  style={{
                    gap: 10,
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                    padding: "8px 8px 8px 16px",
                  }}
                >
                  <span className="relative flex" style={{ width: 8, height: 8 }}>
                    <span className="lp-dot absolute inline-flex rounded-full" style={{ width: "100%", height: "100%", backgroundColor: T.lavender }} />
                    <span className="relative inline-flex rounded-full" style={{ width: 8, height: 8, backgroundColor: T.lavender }} />
                  </span>
                  <span className="text-white font-semibold" style={{ fontSize: 13.5 }}>
                    Placement center online
                  </span>
                  <span
                    className="font-bold text-emerald-300"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      background: "rgba(16,185,129,0.12)",
                      border: "1px solid rgba(52,211,153,0.3)",
                      borderRadius: 999,
                      padding: "5px 10px",
                    }}
                  >
                    LIVE
                  </span>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <h1
                  className="text-white font-extrabold"
                  style={{ fontSize: "clamp(38px, 5.4vw, 68px)", lineHeight: 1.04, letterSpacing: "-0.02em", marginTop: 26 }}
                >
                  Placements.
                  <br />
                  <span style={{ color: T.lavender }}>Turn opportunities into outcomes.</span>
                </h1>
              </Reveal>

              <Reveal delay={220}>
                <p style={{ color: "rgba(255,255,255,0.62)", fontSize: 16, lineHeight: 1.65, maxWidth: 620, marginTop: 24 }}>
                  Track every student journey from shortlist to interview, offer, and final placement — all from
                  one intelligent workspace.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap items-center" style={{ gap: 14, marginTop: 32 }}>
                  <button
                    className="group inline-flex items-center transition-all duration-300"
                    style={{
                      gap: 9,
                      background: "#ffffff",
                      color: "#3B1F94",
                      fontWeight: 700,
                      fontSize: 14.5,
                      borderRadius: 16,
                      padding: "14px 22px",
                      boxShadow: "0 10px 26px rgba(0,0,0,0.2)",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 16px 32px rgba(124,92,252,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 26px rgba(0,0,0,0.2)";
                    }}
                  >
                    Manage placements
                    <ArrowRight size={16} />
                  </button>
                  <button
                    className="inline-flex items-center transition-all duration-300"
                    style={{
                      gap: 9,
                      background: "rgba(255,255,255,0.04)",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 14.5,
                      borderRadius: 16,
                      padding: "14px 22px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    }}
                  >
                    View placement insights
                  </button>
                </div>
              </Reveal>

              <Reveal delay={380}>
                <div className="flex flex-wrap items-center" style={{ gap: "14px 32px", marginTop: 32, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                  <div>
                    <span className="text-white font-bold">Live tracking</span> · From shortlist to joining
                  </div>
                  <div className="lp-divider" style={{ width: 1, height: 16, background: "rgba(255,255,255,0.15)" }} />
                  <div>
                    <span className="text-white font-bold">Student outcomes</span> · Updated in real time
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ------------------------- RIGHT: visual ------------------------- */}
            <div className="lp-hero-visual relative" style={{ height: 380, width: "100%", maxWidth: 420, margin: "0 auto" }}>
              <div
                className="lp-ring1 pointer-events-none absolute rounded-full"
                style={{ right: -60, bottom: -50, width: 340, height: 340, border: "1px solid rgba(255,255,255,0.12)", zIndex: 1 }}
              />
              <div
                className="lp-ring2 pointer-events-none absolute rounded-full"
                style={{ right: -110, bottom: -110, width: 440, height: 440, border: "1px solid rgba(255,255,255,0.07)", zIndex: 1 }}
              />

              <Reveal delay={420} style={{ position: "absolute", inset: "10px 30px", zIndex: 5 }}>
                <div
                  className="lp-float relative"
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 30,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "linear-gradient(160deg, rgba(139,92,246,0.4), rgba(76,41,180,0.28))",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 34px 70px -22px rgba(15,4,45,0.6)",
                    padding: 30,
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 56, height: 56, borderRadius: 18, background: `linear-gradient(135deg, ${T.accent2}, ${T.accentDeep})`, boxShadow: `0 0 0 1px rgba(255,255,255,0.15), 0 12px 26px ${T.accent}80` }}
                  >
                    <Trophy size={26} className="text-white" strokeWidth={2} />
                  </div>
                  <div className="font-bold" style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.16em", marginTop: 30 }}>
                    PLACEMENT PULSE
                  </div>
                  <div className="text-white font-extrabold" style={{ fontSize: 24, lineHeight: 1.25, marginTop: 10 }}>
                    Opportunities in motion
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5, marginTop: 10 }}>
                    Track every placement milestone
                  </div>
                </div>
              </Reveal>

              <Reveal delay={520} style={{ position: "absolute", top: -14, right: -10, zIndex: 10 }}>
                <div
                  className="lp-float2"
                  style={{ width: 186, borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(13,7,28,0.82)", backdropFilter: "blur(14px)", boxShadow: "0 18px 36px -14px rgba(0,0,0,0.55)", padding: "13px 15px" }}
                >
                  <div className="flex items-center" style={{ gap: 7 }}>
                    <span className="relative flex" style={{ width: 7, height: 7 }}>
                      <span className="lp-dot absolute inline-flex rounded-full bg-emerald-400" style={{ width: "100%", height: "100%" }} />
                      <span className="relative inline-flex rounded-full bg-emerald-400" style={{ width: 7, height: 7 }} />
                    </span>
                    <span className="text-white font-bold" style={{ fontSize: 13 }}>Pipeline active</span>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11.5, marginTop: 4 }}>Recruiter activity live</div>
                </div>
              </Reveal>

              <Reveal delay={580} style={{ position: "absolute", bottom: -18, left: -26, zIndex: 10 }}>
                <div
                  className="lp-float flex items-center"
                  style={{ gap: 11, width: 208, borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(13,7,28,0.82)", backdropFilter: "blur(14px)", boxShadow: "0 18px 36px -14px rgba(0,0,0,0.55)", padding: "12px 14px" }}
                >
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36, borderRadius: 999, background: `linear-gradient(135deg, ${T.accent2}, ${T.accentDeep})` }}>
                    <CheckCheck size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold" style={{ fontSize: 13 }}>Students progressing</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11.5 }}>Shortlist to joining</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ============================== METRICS ============================== */}
        <div className="lp-metrics-grid" style={{ marginTop: 32 }}>
          <MetricCard icon={Award} label="Total placements" value={totalPlacements} delay={80} theme="violet" />
          <MetricCard icon={Target} label="Active offers" value={activeOffers} delay={140} theme="amber" />
          <MetricCard icon={Trophy} label="Average CTC" value={avgCtc} delay={200} theme="emerald" />
          <MetricCard icon={Percent} label="Placement rate" value={`${placementRate}%`} delay={260} theme="blue" progress={placementRate} />
        </div>

        {/* ============================== FILTERS ============================== */}
        <Reveal delay={320} style={{ marginTop: 36 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
            <span className="font-bold" style={{ fontSize: 11, letterSpacing: "0.08em", color: "#9CA3AF" }}>
              STUDENT PIPELINE
            </span>
            <span className="font-medium" style={{ fontSize: 12, color: "#B4AEDB" }}>
              Filter by stage
            </span>
          </div>
          <div className="inline-flex flex-wrap bg-white border border-gray-100" style={{ gap: 6, borderRadius: 18, padding: 6, boxShadow: "0 1px 2px rgba(16,4,48,0.05)" }}>
            {FILTERS.map((f) => {
              const active = f === activeFilter;
              const dotColor = f !== "All" ? (STATUS_STYLES[f]?.dot || "#9CA3AF") : null;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="flex items-center transition-all duration-300"
                  style={{
                    gap: 8,
                    borderRadius: 13,
                    padding: "9px 16px",
                    fontSize: 13.5,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    color: active ? "#fff" : "#6B7280",
                    background: active ? `linear-gradient(135deg, ${T.accent}, ${T.heroTo})` : "transparent",
                    boxShadow: active ? "0 8px 18px -6px rgba(124,92,252,0.6)" : "none",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#F5F3FF"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  {dotColor && (
                    <span
                      className="rounded-full flex-shrink-0"
                      style={{ width: 6, height: 6, background: active ? "rgba(255,255,255,0.85)" : dotColor }}
                    />
                  )}
                  {f}
                  <span
                    className="font-bold"
                    style={{ borderRadius: 999, fontSize: 11, lineHeight: 1, padding: "3px 7px", background: active ? "rgba(255,255,255,0.22)" : "#F3F4F6", color: active ? "#fff" : "#6B7280" }}
                  >
                    {counts[f]}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ============================== TABLE / EMPTY ============================== */}
        <Reveal delay={380} style={{ marginTop: 24 }}>
          <div className="relative bg-white border border-gray-100 overflow-hidden" style={{ borderRadius: 26, boxShadow: "0 1px 2px rgba(16,4,48,0.05)" }}>
            <div className="absolute inset-x-0 top-0" style={{ height: 3, background: `linear-gradient(90deg, ${T.accent}, ${T.heroTo}, ${T.accent2})` }} />
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100" style={{ padding: "18px 24px" }}>
              <div className="flex items-center" style={{ gap: 10 }}>
                <div className="flex items-center justify-center" style={{ width: 30, height: 30, borderRadius: 10, background: "linear-gradient(135deg, #F5F3FF, #EDE9FE)" }}>
                  <Users size={14} style={{ color: T.accent }} />
                </div>
                <div className="font-semibold text-gray-400" style={{ fontSize: 13 }}>
                  Showing <span className="font-bold text-gray-800">{filtered.length}</span> of {counts.All} students
                </div>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center border border-gray-200 font-semibold text-gray-600 transition-all duration-200 hover:-translate-y-px hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 hover:shadow-sm"
                style={{ gap: 8, borderRadius: 13, padding: "9px 15px", fontSize: 13, cursor: refreshing ? "default" : "pointer" }}
              >
                <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} style={refreshing ? { color: T.accent } : {}} />
                {refreshing ? "Refreshing…" : "Refresh"}
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center" style={{ padding: "80px 24px" }}>
                <div className="lp-float flex items-center justify-center" style={{ width: 64, height: 64, borderRadius: 24, background: "linear-gradient(135deg, #F5F3FF, #EDE9FE)", boxShadow: "0 0 0 8px #FAF9FE" }}>
                  <Inbox size={26} style={{ color: T.accent }} />
                </div>
                <div className="font-bold text-gray-900" style={{ fontSize: 17, marginTop: 20 }}>No placements here yet</div>
                <p className="text-gray-500" style={{ fontSize: 13.5, marginTop: 6, maxWidth: 340 }}>
                  Students who reach the <span className="font-semibold text-gray-700">{activeFilter}</span> stage will appear here.
                </p>
                <button
                  onClick={() => setActiveFilter("All")}
                  className="inline-flex items-center font-bold transition-transform duration-200 hover:translate-x-0.5"
                  style={{ gap: 6, marginTop: 20, fontSize: 13.5, color: T.accent, border: "none", background: "none", cursor: "pointer" }}
                >
                  View all placements <ChevronRight size={15} />
                </button>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: 860, borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr className="border-b border-gray-100" style={{ background: "#FBFAFE" }}>
                      {["Student", "Recruiter", "Company", "Status", "Offer CTC", "Last activity", ""].map((h) => (
                        <th key={h} className="font-bold text-gray-400" style={{ padding: "13px 24px", fontSize: 11, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s, i) => {
                      const isJoined = s.status === "Joined";
                      const statusColor = (STATUS_STYLES[s.status] || STATUS_STYLES.Contacted).dot;
                      return (
                        <tr
                          key={s.id}
                          className="group border-b border-gray-50 transition-colors duration-200 last:border-0 hover:bg-violet-50/40"
                          style={{ background: isJoined ? "#FAFFFC" : i % 2 === 1 ? "#FCFBFE" : "transparent" }}
                        >
                          <td style={{ padding: "15px 24px" }}>
                            <div className="flex items-center" style={{ gap: 12 }}>
                              <div
                                className="flex flex-shrink-0 items-center justify-center text-white font-bold transition-transform duration-200 group-hover:scale-105"
                                style={{ width: 36, height: 36, borderRadius: 999, backgroundColor: colorFor(s.name), fontSize: 12, boxShadow: `0 0 0 2px #fff, 0 0 0 3.5px ${statusColor}55` }}
                              >
                                {initials(s.name)}
                              </div>
                              <div>
                                <div className="font-bold text-gray-900" style={{ fontSize: 13.5 }}>{s.name}</div>
                                <div className="text-gray-400" style={{ fontSize: 11.5 }}>{s.dept}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "15px 24px" }}>
                            <div className="flex items-center" style={{ gap: 8 }}>
                              <div className="flex items-center justify-center bg-gray-100 font-bold text-gray-500" style={{ width: 24, height: 24, borderRadius: 999, fontSize: 10 }}>
                                {initials(s.recruiter)}
                              </div>
                              <span className="font-medium text-gray-600" style={{ fontSize: 13 }}>{s.recruiter}</span>
                            </div>
                          </td>
                          <td style={{ padding: "15px 24px" }}>
                            <div className="flex items-center" style={{ gap: 8 }}>
                              <div className="flex items-center justify-center text-white font-bold" style={{ width: 24, height: 24, borderRadius: 7, fontSize: 9, background: `linear-gradient(135deg, ${T.heroTo}, ${T.accent})` }}>
                                {s.company.slice(0, 2)}
                              </div>
                              <span className="font-medium text-gray-600" style={{ fontSize: 13 }}>{s.company}</span>
                            </div>
                          </td>
                          <td style={{ padding: "15px 24px" }}>
                            <StatusPill status={s.status} />
                          </td>
                          <td style={{ padding: "15px 24px", fontSize: 13 }}>
                            <span className={isJoined ? "font-bold" : "font-semibold text-gray-700"} style={isJoined ? { color: "#059669" } : {}}>
                              {s.ctc}
                            </span>
                          </td>
                          <td className="text-gray-400" style={{ padding: "15px 24px", fontSize: 13 }}>{s.activity}</td>
                          <td className="relative text-right" style={{ padding: "15px 24px" }}>
                            <button
                              onClick={() => setOpenMenuId(openMenuId === s.id ? null : s.id)}
                              className="text-gray-300 opacity-0 transition-all duration-150 hover:bg-gray-100 hover:text-gray-600 group-hover:opacity-100"
                              style={{ borderRadius: 8, padding: 6, border: "none", background: "none", cursor: "pointer" }}
                            >
                              <MoreVertical size={16} />
                            </button>
                            <RowMenu open={openMenuId === s.id} onClose={() => setOpenMenuId(null)} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function PlacementsPreview() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.page }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <PlacementsContent />
      </div>
    </div>
  );
}
