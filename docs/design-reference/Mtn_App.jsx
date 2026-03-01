/*this code is not to be used as production code, but rather as a design reference for the app's UI and UX. It is a simplified React component that demonstrates the visual style, layout, and interactions of the app's main screens. The code includes inline styles for ease of reference, but in a real application, you would likely use a more robust styling solution. The focus here is on conveying the overall design and user flow rather than on best practices for React development or code organization.*/

import { useState } from "react";

/* ─── Monochromatic Green Tokens ─── */
const C = {
  bg: "#0f1210",
  surface: "#161b18",
  surfaceAlt: "#1b211d",
  border: "#252e28",
  borderLight: "#2e3832",
  accent: "#5fa85f",
  accentLight: "#7cc47c",
  accentDim: "rgba(95,168,95,0.10)",
  accentHover: "rgba(95,168,95,0.18)",
  accentBorder: "rgba(95,168,95,0.25)",
  text: "#e2e8e4",
  textSec: "#8f9b92",
  textDim: "#546058",
  green100: "#b8dbb8",
  green200: "#7cc47c",
  green300: "#5fa85f",
  green400: "#4a8f4a",
  green500: "#3a7a3a",
  greenDim: "rgba(95,168,95,0.10)",
  greenMid: "rgba(95,168,95,0.18)",
  greenStrong: "rgba(95,168,95,0.28)",
  navBg: "#121714",
  feedBg: "#121714",
};

const SANS = `'Outfit', 'DM Sans', -apple-system, sans-serif`;
const MONO = `'JetBrains Mono', 'SF Mono', monospace`;

const label = {
  display: "block", marginBottom: 6, fontFamily: MONO,
  fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.13em",
  color: C.textDim, fontWeight: 500,
};
const inputBase = {
  width: "100%", padding: "11px 14px", background: C.bg,
  border: `1px solid ${C.border}`, borderRadius: 8, color: C.text,
  fontFamily: SANS, fontSize: "14px", outline: "none", boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const Icon = ({ d, size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const ic = {
  briefing: "M3 12h4l3-9 4 18 3-9h4",
  log: "M12 20V10M18 20V4M6 20v-4",
  adventure: "M3 20L12 4l9 16H3z",
  meal: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3",
  nav: "M4 6h16M4 12h16M4 18h16",
  feed: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  chevL: "M15 18l-6-6 6-6",
};

const feedItems = [
  { time: "Today, 6:12 AM", type: "briefing", text: "Morning briefing generated. Readiness at 72 — on track for Rockwall." },
  { time: "Yesterday, 7:45 PM", type: "training", text: "Logged: 12km hike, 400m gain, moderate intensity. 2h 15m." },
  { time: "Yesterday, 7:00 AM", type: "briefing", text: "Morning briefing generated. Nutrition focus: anti-inflammatory." },
  { time: "Feb 26, 6:30 AM", type: "meal", text: "New 3-day meal plan generated. Kidney-friendly emphasis." },
  { time: "Feb 25, 8:10 PM", type: "training", text: "Logged: 45min strength session, hard intensity." },
  { time: "Feb 25, 6:15 AM", type: "briefing", text: "Morning briefing generated. Readiness at 69." },
  { time: "Feb 24, 6:00 PM", type: "adventure", text: "Target adventure updated: Rockwall Trail, Jul 15 start." },
  { time: "Feb 23, 7:30 PM", type: "training", text: "Logged: 8km trail run, easy intensity. 52min." },
];
const feedDot = { briefing: C.green300, training: C.green200, meal: C.green400, adventure: C.green100 };

/* ════════════════════════════════════════
   SCREEN 1: Morning Briefing
   ════════════════════════════════════════ */
function MorningBriefing({ goTo }) {
  const readiness = 72;
  const today = new Date().toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div>
      <p style={{ margin: "0 0 28px", fontSize: "13px", color: C.textDim, fontFamily: MONO }}>{today}</p>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ ...label, marginBottom: 4 }}>Target Adventure</p>
            <h2 style={{ margin: "0 0 6px", fontSize: "22px", fontWeight: 600 }}>Rockwall Trail</h2>
            <p style={{ margin: 0, fontSize: "13px", color: C.textSec }}>Kootenay NP · 4 nights · ~55 km</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ ...label, marginBottom: 2 }}>Readiness</p>
            <span style={{ fontSize: "44px", fontWeight: 700, lineHeight: 1, color: C.accent }}>{readiness}</span>
            <p style={{ margin: "2px 0 0", fontFamily: MONO, fontSize: "11px", color: C.textDim }}>/ 100</p>
          </div>
        </div>
        <div style={{ marginTop: 18, padding: "10px 14px", background: C.greenDim, border: `1px solid ${C.accentBorder}`, borderRadius: 8, fontFamily: MONO, fontSize: "12px", color: C.accent }}>
          42 days out · On track · Last session: Yesterday
        </div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", marginBottom: 20 }}>
        <p style={{ ...label, color: C.accentLight, marginBottom: 14 }}>Today's Briefing</p>
        <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.75, fontWeight: 300, color: C.text }}>
          You're 6 weeks from Rockwall. Yesterday's 12km hike with 400m elevation was solid — your consistency this week pushed readiness up 3 points. Today is a rest day. Focus on hydration: aim for 3L minimum. Your kidney markers favor potassium-rich foods today — the meal plan reflects this. Tomorrow's session should be a moderate trail run to maintain aerobic base without accumulating fatigue.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
        {[
          { lab: "Nutrition Focus", title: "Potassium & Hydration", sub: "Rest day recovery. Anti-inflammatory emphasis." },
          { lab: "Training Note", title: "Rest Day", sub: "3 consecutive training days. Active recovery only." },
        ].map((c, i) => (
          <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 22px" }}>
            <p style={{ ...label, marginBottom: 10 }}>{c.lab}</p>
            <p style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 600 }}>{c.title}</p>
            <p style={{ margin: 0, fontSize: "13px", color: C.textSec, lineHeight: 1.5 }}>{c.sub}</p>
          </div>
        ))}
      </div>

      <button onClick={() => goTo("log")} style={{
        display: "block", width: "100%", padding: "14px",
        background: "transparent", border: `1px solid ${C.accent}`, borderRadius: 10,
        color: C.accent, fontFamily: SANS, fontSize: "14px", fontWeight: 500,
        cursor: "pointer", transition: "background 0.15s",
      }}
        onMouseEnter={e => e.target.style.background = C.accentDim}
        onMouseLeave={e => e.target.style.background = "transparent"}
      >Log Today's Training →</button>
    </div>
  );
}

/* ════════════════════════════════════════
   SCREEN 2: Log Training
   ════════════════════════════════════════ */
function LogTraining() {
  const [activity, setActivity] = useState("");
  const [intensity, setIntensity] = useState("");
  const [hrs, setHrs] = useState("");
  const [mins, setMins] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [saved, setSaved] = useState(false);

  const activities = ["Hiking", "Running", "Cycling", "Strength", "Other"];
  const intensities = [
    { name: "Easy", color: C.green500, dim: "rgba(58,122,58,0.14)" },
    { name: "Moderate", color: C.green300, dim: C.greenDim },
    { name: "Hard", color: C.green100, dim: "rgba(184,219,184,0.10)" },
  ];

  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ marginBottom: 28 }}>
        <p style={label}>Date</p>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...inputBase, colorScheme: "dark" }} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <p style={label}>Activity</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {activities.map(a => (
            <button key={a} onClick={() => setActivity(a)} style={{
              padding: "9px 18px", background: activity === a ? C.accentDim : "transparent",
              border: `1px solid ${activity === a ? C.accent : C.border}`, borderRadius: 8,
              color: activity === a ? C.accent : C.textSec, fontFamily: SANS, fontSize: "13px",
              cursor: "pointer", fontWeight: activity === a ? 500 : 400, transition: "all 0.15s",
            }}>{a}</button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <p style={label}>Duration</p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <input type="number" placeholder="0" min="0" max="24" value={hrs} onChange={e => setHrs(e.target.value)} style={inputBase} />
            <span style={{ display: "block", marginTop: 4, fontFamily: MONO, fontSize: "10px", color: C.textDim }}>HOURS</span>
          </div>
          <span style={{ fontSize: "18px", color: C.textDim, paddingBottom: 18 }}>:</span>
          <div style={{ flex: 1 }}>
            <input type="number" placeholder="00" min="0" max="59" value={mins} onChange={e => setMins(e.target.value)} style={inputBase} />
            <span style={{ display: "block", marginTop: 4, fontFamily: MONO, fontSize: "10px", color: C.textDim }}>MINUTES</span>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <p style={label}>Intensity</p>
        <div style={{ display: "flex", gap: 8 }}>
          {intensities.map(i => {
            const sel = intensity === i.name;
            return (
              <button key={i.name} onClick={() => setIntensity(i.name)} style={{
                flex: 1, padding: "11px 0",
                background: sel ? i.dim : "transparent",
                border: `1px solid ${sel ? i.color : C.border}`, borderRadius: 8,
                color: sel ? i.color : C.textSec, fontFamily: SANS, fontSize: "13px",
                fontWeight: sel ? 500 : 400, cursor: "pointer", transition: "all 0.15s",
              }}>{i.name}</button>
            );
          })}
        </div>
      </div>
      <div style={{ marginBottom: 32 }}>
        <p style={label}>Notes</p>
        <textarea placeholder="How did it feel? Terrain, weather, anything notable..."
          value={notes} onChange={e => setNotes(e.target.value)} rows={4}
          style={{ ...inputBase, resize: "vertical", lineHeight: 1.6 }} />
      </div>
      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
        style={{
          display: "block", width: "100%", padding: "14px",
          background: saved ? C.green400 : C.accent, border: "none", borderRadius: 10,
          color: "#0f1210", fontFamily: SANS, fontSize: "14px", fontWeight: 600,
          cursor: "pointer", transition: "background 0.3s",
        }}>{saved ? "✓ Session Saved" : "Save Session"}</button>
    </div>
  );
}

/* ════════════════════════════════════════
   SCREEN 3: Set Target Adventure
   ════════════════════════════════════════ */
function SetAdventure() {
  const [trail, setTrail] = useState("Rockwall Trail");
  const [startDate, setStartDate] = useState("2026-07-15");
  const [nights, setNights] = useState("4");
  const [dist, setDist] = useState("55");
  const [elev, setElev] = useState("2300");
  const [diff, setDiff] = useState("Hard");
  const [saved, setSaved] = useState(false);

  const diffs = [
    { name: "Moderate", color: C.green500, bg: "rgba(58,122,58,0.12)", req: 60 },
    { name: "Hard", color: C.green300, bg: C.greenDim, req: 75 },
    { name: "Extreme", color: C.green100, bg: "rgba(184,219,184,0.08)", req: 90 },
  ];
  const sel = diffs.find(d => d.name === diff) || diffs[1];
  const daysOut = Math.max(0, Math.ceil((new Date(startDate) - new Date()) / 864e5));

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 28, alignItems: "start" }}>
        <div>
          <div style={{ marginBottom: 24 }}>
            <p style={label}>Trail Name</p>
            <input type="text" value={trail} onChange={e => setTrail(e.target.value)} style={inputBase} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <p style={label}>Start Date</p>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ ...inputBase, colorScheme: "dark" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
            <div><p style={label}>Nights</p><input type="number" value={nights} onChange={e => setNights(e.target.value)} min="1" style={inputBase} /></div>
            <div><p style={label}>Distance (km)</p><input type="number" value={dist} onChange={e => setDist(e.target.value)} min="1" style={inputBase} /></div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <p style={label}>Elevation Gain (m)</p>
            <input type="number" value={elev} onChange={e => setElev(e.target.value)} style={inputBase} />
          </div>
          <div style={{ marginBottom: 32 }}>
            <p style={label}>Difficulty</p>
            <div style={{ display: "flex", gap: 8 }}>
              {diffs.map(d => {
                const s = diff === d.name;
                return (
                  <button key={d.name} onClick={() => setDiff(d.name)} style={{
                    flex: 1, padding: "11px 0", background: s ? d.bg : "transparent",
                    border: `1px solid ${s ? d.color : C.border}`, borderRadius: 8,
                    color: s ? d.color : C.textSec, fontFamily: SANS, fontSize: "13px",
                    fontWeight: s ? 500 : 400, cursor: "pointer", transition: "all 0.15s",
                  }}>{d.name}</button>
                );
              })}
            </div>
          </div>
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
            style={{
              display: "block", width: "100%", padding: "14px",
              background: saved ? C.green400 : C.accent, border: "none", borderRadius: 10,
              color: "#0f1210", fontFamily: SANS, fontSize: "14px", fontWeight: 600,
              cursor: "pointer", transition: "background 0.3s",
            }}>{saved ? "✓ Adventure Set" : "Set as Target"}</button>
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", position: "sticky", top: 20 }}>
          <p style={{ ...label, color: C.accentLight, marginBottom: 16 }}>Summary</p>
          <h3 style={{ margin: "0 0 18px", fontSize: "18px", fontWeight: 600 }}>{trail || "—"}</h3>
          {[
            ["Start", startDate ? new Date(startDate + "T12:00:00").toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" }) : "—"],
            ["Nights", nights || "—"],
            ["Distance", `${dist || "—"} km`],
            ["Elevation", `${elev || "—"} m`],
            ["Difficulty", diff],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <span style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: C.textDim }}>{k}</span>
              <span style={{ fontSize: "14px", color: k === "Difficulty" ? sel.color : C.text }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 12, paddingTop: 14 }}>
            <span style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: C.textDim, display: "block", marginBottom: 4 }}>Days Out</span>
            <span style={{ fontSize: "14px" }}>{daysOut}</span>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 14, paddingTop: 14 }}>
            <span style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: C.textDim, display: "block", marginBottom: 6 }}>Fitness Requirement</span>
            <span style={{ fontSize: "32px", fontWeight: 700, color: sel.color, lineHeight: 1 }}>{sel.req}</span>
            <span style={{ fontFamily: MONO, fontSize: "11px", color: C.textDim, marginLeft: 4 }}>/ 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   SCREEN 4: Meal Plan
   ════════════════════════════════════════ */
const mealData = [
  { day: "Day 1", sub: "Rest Day", meals: {
    breakfast: { name: "Berry Oat Bowl", desc: "Steel-cut oats, blueberries, walnuts, flaxseed, honey.", tags: ["Anti-inflammatory", "Kidney-friendly"] },
    lunch: { name: "Mediterranean Quinoa", desc: "Quinoa, cucumber, tomatoes, olives, lemon-olive oil.", tags: ["Cardiovascular", "Potassium"] },
    dinner: { name: "Baked Salmon", desc: "Wild salmon, sweet potato, broccolini, garlic.", tags: ["Anti-inflammatory", "Omega-3"] },
  }},
  { day: "Day 2", sub: "Training Day", meals: {
    breakfast: { name: "Egg & Avocado Toast", desc: "Sourdough, poached eggs, avocado, micro greens.", tags: ["Cardiovascular", "Pre-training"] },
    lunch: { name: "Chicken Lentil Soup", desc: "Red lentils, chicken, carrots, turmeric broth.", tags: ["Anti-inflammatory", "Recovery"] },
    dinner: { name: "Chicken Power Bowl", desc: "Brown rice, chicken, chickpeas, spinach, tahini.", tags: ["Kidney-friendly", "Post-training"] },
  }},
  { day: "Day 3", sub: "Active Recovery", meals: {
    breakfast: { name: "Smoothie Bowl", desc: "Banana, mango, spinach, protein, pumpkin seeds.", tags: ["Potassium", "Hydrating"] },
    lunch: { name: "Tuna Nicoise", desc: "Seared tuna, greens, green beans, egg, vinaigrette.", tags: ["Omega-3", "Anti-inflammatory"] },
    dinner: { name: "Turkey Stir-Fry", desc: "Turkey, bok choy, peppers, ginger-tamari, rice.", tags: ["Cardiovascular", "Kidney-friendly"] },
  }},
];

const tagGreen = {
  "Anti-inflammatory": C.green300, "Kidney-friendly": C.green200,
  "Cardiovascular": C.green400, "Potassium": C.green100,
  "Omega-3": C.green500, "Pre-training": C.green200,
  "Recovery": C.green300, "Post-training": C.green400, "Hydrating": C.green100,
};

function MealPlan() {
  const [regen, setRegen] = useState(false);
  return (
    <div>
      <p style={{ margin: "0 0 24px", fontSize: "13px", color: C.textSec }}>
        Optimized for kidney health · anti-inflammatory · cardiovascular
      </p>
      <div style={{
        background: C.accentDim, border: `1px solid ${C.accentBorder}`, borderRadius: 10,
        padding: "12px 16px", marginBottom: 24, fontFamily: MONO, fontSize: "11px", color: C.accent,
      }}>
        Tuned for Rockwall Trail · 42 days out · Rest / training / recovery split
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {mealData.map(day => (
          <div key={day.day}>
            <div style={{ marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>
              <h3 style={{ margin: "0 0 2px", fontSize: "15px", fontWeight: 600 }}>{day.day}</h3>
              <span style={{ fontFamily: MONO, fontSize: "10px", color: C.textDim }}>{day.sub}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["breakfast", "lunch", "dinner"].map(type => {
                const m = day.meals[type];
                return (
                  <div key={type} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px" }}>
                    <p style={{ ...label, fontSize: "9px", marginBottom: 8 }}>{type}</p>
                    <p style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: 600 }}>{m.name}</p>
                    <p style={{ margin: "0 0 10px", fontSize: "12px", color: C.textSec, lineHeight: 1.5 }}>{m.desc}</p>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {m.tags.map(t => {
                        const tc = tagGreen[t] || C.green300;
                        return (
                          <span key={t} style={{
                            padding: "2px 7px", borderRadius: 4, fontFamily: MONO, fontSize: "9px",
                            color: tc, background: `${tc}14`, border: `1px solid ${tc}28`,
                          }}>{t}</span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => { setRegen(true); setTimeout(() => setRegen(false), 1500); }}
        style={{
          display: "block", width: "100%", padding: "14px",
          background: "transparent", border: `1px solid ${regen ? C.textDim : C.accent}`, borderRadius: 10,
          color: regen ? C.textDim : C.accent, fontFamily: SANS, fontSize: "14px", fontWeight: 500,
          cursor: regen ? "default" : "pointer", transition: "all 0.15s",
        }}
        onMouseEnter={e => { if (!regen) e.target.style.background = C.accentDim; }}
        onMouseLeave={e => e.target.style.background = "transparent"}
      >{regen ? "Generating..." : "Generate New Plan"}</button>
    </div>
  );
}

/* ════════════════════════════════════════
   APP SHELL
   ════════════════════════════════════════ */
const screens = [
  { id: "briefing", name: "Briefing", icon: ic.briefing },
  { id: "log", name: "Log Training", icon: ic.log },
  { id: "adventure", name: "Adventure", icon: ic.adventure },
  { id: "meal", name: "Meal Plan", icon: ic.meal },
];

export default function App() {
  const [screen, setScreen] = useState("briefing");
  const [showNav, setShowNav] = useState(true);
  const [showFeed, setShowFeed] = useState(true);

  const titles = { briefing: "Morning Briefing", log: "Log Training Session", adventure: "Set Target Adventure", meal: "3-Day Meal Plan" };

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, color: C.text, fontFamily: SANS, overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* LEFT NAV */}
      <div style={{
        width: showNav ? 220 : 0, minWidth: showNav ? 220 : 0,
        background: C.navBg, borderRight: showNav ? `1px solid ${C.border}` : "none",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "22px 20px 18px", borderBottom: `1px solid ${C.border}` }}>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, letterSpacing: "0.1em", color: C.accent, whiteSpace: "nowrap" }}>MTN</h1>
          <p style={{ margin: "4px 0 0", fontFamily: MONO, fontSize: "10px", color: C.textDim, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>Adventure Readiness</p>
        </div>
        <nav style={{ padding: "14px 10px", flex: 1 }}>
          {screens.map(s => {
            const active = screen === s.id;
            return (
              <button key={s.id} onClick={() => setScreen(s.id)} style={{
                display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 12px", marginBottom: 4,
                background: active ? C.accentDim : "transparent", border: "none", borderRadius: 8,
                color: active ? C.accent : C.textSec, fontFamily: SANS, fontSize: "13px",
                fontWeight: active ? 500 : 400, cursor: "pointer", textAlign: "left", whiteSpace: "nowrap", transition: "all 0.12s",
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.surfaceAlt; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon d={s.icon} size={18} color={active ? C.accent : C.textDim} />
                {s.name}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "14px 16px", borderTop: `1px solid ${C.border}` }}>
          <p style={{ margin: 0, fontFamily: MONO, fontSize: "10px", color: C.textDim, whiteSpace: "nowrap" }}>Cycle 0 · Pre-build</p>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 20px", borderBottom: `1px solid ${C.border}`, background: C.bg, flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setShowNav(!showNav)} title={showNav ? "Hide nav" : "Show nav"} style={{
              display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34,
              background: showNav ? C.accentDim : "transparent",
              border: `1px solid ${showNav ? C.accentBorder : C.border}`, borderRadius: 8,
              color: showNav ? C.accent : C.textSec, cursor: "pointer", transition: "all 0.15s",
            }}><Icon d={showNav ? ic.chevL : ic.nav} size={16} /></button>
            <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>{titles[screen]}</h2>
          </div>
          <button onClick={() => setShowFeed(!showFeed)} title={showFeed ? "Hide feed" : "Show feed"} style={{
            display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34,
            background: showFeed ? C.accentDim : "transparent",
            border: `1px solid ${showFeed ? C.accentBorder : C.border}`, borderRadius: 8,
            color: showFeed ? C.accent : C.textSec, cursor: "pointer", transition: "all 0.15s",
          }}><Icon d={ic.feed} size={16} /></button>
        </header>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px 64px" }}>
            {screen === "briefing" && <MorningBriefing goTo={setScreen} />}
            {screen === "log" && <LogTraining />}
            {screen === "adventure" && <SetAdventure />}
            {screen === "meal" && <MealPlan />}
          </div>

          {/* RIGHT FEED */}
          <div style={{
            width: showFeed ? 280 : 0, minWidth: showFeed ? 280 : 0,
            background: C.feedBg, borderLeft: showFeed ? `1px solid ${C.border}` : "none",
            transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ padding: "16px 18px 12px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: C.textDim, fontWeight: 500, whiteSpace: "nowrap" }}>Activity Feed</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
              {feedItems.map((item, i) => (
                <div key={i} style={{ padding: "12px 18px", borderBottom: `1px solid ${C.border}`, transition: "background 0.1s", cursor: "default" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.surfaceAlt}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: feedDot[item.type] || C.textDim, flexShrink: 0 }} />
                    <span style={{ fontFamily: MONO, fontSize: "10px", color: C.textDim, whiteSpace: "nowrap" }}>{item.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "12px", lineHeight: 1.5, color: C.textSec, whiteSpace: "normal" }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
