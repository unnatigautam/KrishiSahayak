import React, { useState } from "react";
import {
  Home as HomeIcon,
  Mic,
  CloudSun,
  Camera,
  TrendingUp,
  BarChart3,
  Bell,
  User,
  Sun,
  Wind,
  Droplets,
  ChevronRight,
  Leaf,
  CloudRain,
  Thermometer,
  Gauge,
  Bug,
  Snowflake,
  Send,
  Volume2,
  Languages,
  Wheat,
  IndianRupee,
  Activity,
  ChevronRight as ChevronRightIcon,
  MapPin,
  Zap,
  Sprout,
  ShieldAlert,
  SlidersHorizontal,
  Upload,
  Clock,
  CheckCircle2,
  Phone,
} from "lucide-react";

/* ---------------------------------------------------------
   KrishiSahayak — AI Farming Copilot
   App shell (sidebar + header) + Home dashboard
   Matches the Figma prototype: green brand, left nav,
   card-based content area, Hindi-first greeting.
--------------------------------------------------------- */

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "copilot", label: "AI Copilot", icon: Mic },
  { id: "weather", label: "Weather", icon: CloudSun },
  { id: "scanner", label: "Crop Scanner", icon: Camera },
  { id: "mandi", label: "Mandi Market", icon: TrendingUp },
  { id: "dashboard", label: "Farm Dashboard", icon: BarChart3 },
  { id: "alerts", label: "Smart Alerts", icon: Bell, badge: 3 },
  { id: "profile", label: "Profile", icon: User },
];

function Sidebar({ active, onNavigate }) {
  return (
    <aside
      style={{ display: "flex", flexDirection: "column", width: 256, height: "100%" }}
      className="shrink-0 bg-white border-r border-stone-200 overflow-y-auto"
    >
      {/* Brand */}
      <div
        style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        className="gap-3 px-5 py-5 border-b border-stone-100"
      >
        <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center shrink-0">
          <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <p className="font-semibold text-stone-900 text-[15px]">KrishiSahayak</p>
          <p className="text-xs text-stone-500">AI Farming Copilot</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto" }} className="px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-emerald-700 text-white"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span
                  className={`text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center ${
                    isActive ? "bg-white/25 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Farmer profile footer */}
      <button
        onClick={() => onNavigate("profile")}
        style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        className="mx-3 mb-4 gap-3 px-3 py-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors text-left"
      >
        <div className="w-9 h-9 rounded-full bg-emerald-200 flex items-center justify-center text-base shrink-0">
          👨‍🌾
        </div>
        <div className="leading-tight min-w-0">
          <p className="text-sm font-semibold text-stone-900 truncate">Ramesh Patil</p>
          <p className="text-xs text-stone-500 truncate">Nashik · Cotton, Wheat</p>
        </div>
      </button>
    </aside>
  );
}

function TopHeader({ title }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-white">
      <h1 className="text-lg font-semibold text-stone-900">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative w-9 h-9 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors">
          <Bell className="w-[18px] h-[18px] text-stone-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <div className="w-9 h-9 rounded-full bg-stone-200 flex items-center justify-center text-sm">
          👤
        </div>
      </div>
    </header>
  );
}

/* ---------------- Home Dashboard ---------------- */

function AlertCard({ tone, icon, title, body, actionLabel }) {
  const tones = {
    urgent: "bg-red-50 border-red-100",
    info: "bg-blue-50 border-blue-100",
    positive: "bg-emerald-50 border-emerald-100",
    warn: "bg-amber-50 border-amber-100",
  };
  const actionColor = {
    urgent: "text-red-700",
    info: "text-blue-700",
    positive: "text-emerald-700",
    warn: "text-amber-700",
  };
  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <span className="text-lg leading-none mt-0.5">{icon}</span>
          <div>
            <p className="text-sm font-semibold text-stone-900">{title}</p>
            <p className="text-sm text-stone-600 mt-0.5">{body}</p>
          </div>
        </div>
      </div>
      <button className={`text-sm font-semibold mt-2 flex items-center gap-0.5 ${actionColor[tone]}`}>
        {actionLabel} <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function QuickStat({ icon: Icon, value, label, sub, iconTone }) {
  return (
    <button className="rounded-xl bg-white border border-stone-200 p-4 text-left hover:border-stone-300 transition-colors">
      <div className="flex items-start justify-between">
        <Icon className={`w-5 h-5 ${iconTone}`} />
        <ChevronRightIcon className="w-4 h-4 text-stone-300" />
      </div>
      <p className="text-xl font-bold text-stone-900 mt-2">{value}</p>
      <p className="text-sm font-medium text-stone-700 mt-0.5">{label}</p>
      <p className="text-xs text-stone-400">{sub}</p>
    </button>
  );
}

function HomePage() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Greeting / weather hero */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-700 text-white p-6 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-emerald-100 text-sm flex items-center gap-1.5">
            Good Morning <span>🌅</span>
          </p>
          <h2 className="text-2xl font-bold mt-1">नमस्ते, रमेश जी!</h2>
          <p className="text-emerald-100 text-sm mt-1 max-w-md">
            Your farm is doing well. Rain expected tomorrow — check your action plan.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button className="flex items-center gap-2 bg-white text-emerald-800 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-emerald-50 transition-colors">
              <Mic className="w-4 h-4" /> Talk to AI
            </button>
            <button className="flex items-center gap-2 bg-amber-500 text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-amber-600 transition-colors">
              <Camera className="w-4 h-4" /> Scan Crop
            </button>
          </div>
        </div>

        <div className="absolute top-5 right-5 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 text-right">
          <div className="flex items-center gap-2 justify-end">
            <Sun className="w-6 h-6 text-amber-300" />
            <span className="text-2xl font-bold">34°C</span>
          </div>
          <p className="text-xs text-emerald-100 mt-0.5">Nashik · Partly Sunny</p>
          <div className="flex gap-3 mt-2 text-xs text-emerald-100">
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3" /> 68%
            </span>
            <span className="flex items-center gap-1">
              <Wind className="w-3 h-3" /> 12 km/h
            </span>
          </div>
        </div>
      </div>

      {/* Today's alerts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-stone-900">Today's Alerts</h3>
          <button className="text-sm font-medium text-emerald-700 flex items-center gap-0.5">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AlertCard
            tone="urgent"
            icon="🐛"
            title="Pest Outbreak!"
            body="High bollworm risk — inspect cotton today."
            actionLabel="Get Advice"
          />
          <AlertCard
            tone="info"
            icon="🌧️"
            title="Rain Tomorrow"
            body="Skip irrigation today. Drain paddy fields."
            actionLabel="View Weather"
          />
          <AlertCard
            tone="positive"
            icon="📈"
            title="Tomato Prices Up"
            body="₹1,960/Q at Nashik — good time to sell."
            actionLabel="See Prices"
          />
          <AlertCard
            tone="warn"
            icon="🌡️"
            title="Heatwave Next Week"
            body="Temp >40°C on Tuesday. Increase irrigation."
            actionLabel="View Weather"
          />
        </div>
      </div>

      {/* AI Action Plan */}
      <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-white text-sm">⚡</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-stone-900">Today's AI Action Plan</p>
          <p className="text-sm text-stone-600 mt-0.5">
            Rain forecast for tomorrow. Apply fungicide today before 10 AM to protect wheat from
            blight. Skip irrigation. Check cotton field for bollworm signs — pest risk is elevated
            this week.
          </p>
          <button className="flex items-center gap-2 bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg mt-3 hover:bg-emerald-800 transition-colors">
            <Mic className="w-3.5 h-3.5" /> Ask AI for Details
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickStat icon={Wheat} value="58 Q" label="Yield Estimate" sub="+8% vs last season" iconTone="text-emerald-600" />
        <QuickStat icon={IndianRupee} value="₹1.1L" label="Expected Profit" sub="This season" iconTone="text-emerald-600" />
        <QuickStat icon={Activity} value="82/100" label="Farm Health" sub="Good condition" iconTone="text-blue-600" />
        <QuickStat icon={Bell} value="3 New" label="Alerts Today" sub="Tap to review" iconTone="text-red-500" />
      </div>
    </div>
  );
}

/* ---------------- Weather Page ---------------- */

const FORECAST_7DAY = [
  { day: "Today", hi: 34, lo: 24, rain: 0, icon: Sun, active: true },
  { day: "Tue", hi: 30, lo: 22, rain: 75, icon: CloudRain },
  { day: "Wed", hi: 27, lo: 20, rain: 90, icon: CloudRain },
  { day: "Thu", hi: 28, lo: 21, rain: 60, icon: CloudRain },
  { day: "Fri", hi: 31, lo: 23, rain: 0, icon: Sun },
  { day: "Sat", hi: 33, lo: 24, rain: 0, icon: Sun },
  { day: "Sun", hi: 35, lo: 25, rain: 0, icon: Sun },
];

const RISK_ALERTS = [
  {
    icon: CloudRain,
    label: "Heavy Rain",
    level: "High Risk",
    levelTone: "bg-red-100 text-red-700",
    title: "80mm rain expected Wednesday. Drain fields.",
  },
  {
    icon: Thermometer,
    label: "Heatwave",
    level: "Next Week",
    levelTone: "bg-amber-100 text-amber-700",
    title: "Temp >40°C Tuesday. Increase irrigation.",
  },
  {
    icon: Snowflake,
    label: "Frost Risk",
    level: "Low Risk",
    levelTone: "bg-stone-100 text-stone-600",
    title: "No frost expected this week. Monitor.",
  },
  {
    icon: Bug,
    label: "Pest Risk",
    level: "High Risk",
    levelTone: "bg-red-100 text-red-700",
    title: "Humid conditions favor bollworm. Inspect.",
  },
];

const CROP_IMPACTS = [
  {
    crop: "Cotton",
    tone: "border-red-200 bg-red-50",
    points: ["High pest risk from humidity", "Bollworm activity likely to rise", "Prices holding steady in Nashik"],
    action: "Inspect fields today and apply recommended pesticide before rain.",
    actionTone: "text-red-700",
  },
  {
    crop: "Tomato",
    tone: "border-emerald-200 bg-emerald-50",
    points: ["Low rain risk today", "Demand pushing prices up 12%", "Good harvest conditions"],
    action: "Good time to sell — prices at ₹1,960/Q, a seasonal high.",
    actionTone: "text-emerald-700",
  },
  {
    crop: "Wheat",
    tone: "border-amber-200 bg-amber-50",
    points: ["Rain tomorrow raises blight risk", "Fungicide window closing", "Stable mandi prices"],
    action: "Apply fungicide before 10 AM tomorrow to protect against blight.",
    actionTone: "text-amber-700",
  },
  {
    crop: "Onion",
    tone: "border-stone-200 bg-stone-50",
    points: ["Minimal weather impact expected", "Prices softening slightly", "Storage conditions favorable"],
    action: "Hold produce — prices likely to recover in 5–7 days.",
    actionTone: "text-stone-700",
  },
];

function WeatherPage() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        {/* Right now */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-700 text-white p-5">
          <p className="text-emerald-100 text-sm">Right Now · Nashik</p>
          <div className="flex items-center gap-2 mt-1">
            <Sun className="w-9 h-9 text-amber-300" />
            <span className="text-4xl font-bold">34°</span>
          </div>
          <p className="text-emerald-100 text-sm mt-0.5">Partly Sunny</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                <Droplets className="w-3 h-3" /> Humidity
              </p>
              <p className="text-base font-semibold mt-0.5">68%</p>
            </div>
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                <Wind className="w-3 h-3" /> Wind
              </p>
              <p className="text-base font-semibold mt-0.5">12 km/h</p>
            </div>
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                <Thermometer className="w-3 h-3" /> Feels Like
              </p>
              <p className="text-base font-semibold mt-0.5">37°C</p>
            </div>
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                <Gauge className="w-3 h-3" /> UV Index
              </p>
              <p className="text-base font-semibold mt-0.5">High</p>
            </div>
          </div>
        </div>

        {/* 7-day forecast */}
        <div className="rounded-2xl bg-white border border-stone-200 p-5">
          <p className="text-sm font-semibold text-stone-900 mb-3">7-Day Forecast</p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {FORECAST_7DAY.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.day}
                  className={`rounded-xl p-2.5 text-center ${
                    d.active ? "bg-emerald-700 text-white" : "bg-stone-50 text-stone-700"
                  }`}
                >
                  <p className="text-xs font-medium">{d.day}</p>
                  <Icon className={`w-5 h-5 mx-auto my-1.5 ${d.active ? "text-amber-300" : "text-stone-400"}`} />
                  <p className="text-sm font-semibold">{d.hi}°</p>
                  <p className={`text-xs ${d.active ? "text-emerald-100" : "text-stone-400"}`}>{d.lo}°</p>
                </div>
              );
            })}
          </div>

          <p className="text-xs font-semibold text-stone-500 mt-5 mb-2 tracking-wide">
            RAINFALL PROBABILITY (%)
          </p>
          <div className="flex items-end gap-2 h-16">
            {FORECAST_7DAY.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                <div
                  className="w-full bg-blue-400 rounded-t"
                  style={{ height: `${Math.max(d.rain, 3)}%` }}
                  title={`${d.rain}%`}
                />
                <span className="text-[10px] text-stone-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk alerts */}
      <div>
        <p className="text-base font-semibold text-stone-900 mb-3">Risk Alerts</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {RISK_ALERTS.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.label} className="rounded-xl border border-stone-200 bg-white p-4">
                <div className="flex items-start justify-between">
                  <Icon className="w-5 h-5 text-stone-500" />
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${r.levelTone}`}>
                    {r.level}
                  </span>
                </div>
                <p className="text-sm font-semibold text-stone-900 mt-2">{r.label}</p>
                <p className="text-xs text-stone-500 mt-1">{r.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crop impact */}
      <div>
        <p className="text-base font-semibold text-stone-900 mb-1">What This Means For Your Crops</p>
        <p className="text-sm text-stone-500 mb-3">
          Today's conditions (34°C, 68% humidity, rain tomorrow) — explained crop by crop.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CROP_IMPACTS.map((c) => (
            <div key={c.crop} className={`rounded-xl border p-4 ${c.tone}`}>
              <p className="text-sm font-semibold text-stone-900">{c.crop}</p>
              <ul className="mt-2 space-y-1">
                {c.points.map((pt) => (
                  <li key={pt} className="text-xs text-stone-600 flex gap-1.5">
                    <span className="text-stone-400">•</span> {pt}
                  </li>
                ))}
              </ul>
              <p className={`text-xs font-semibold mt-3 ${c.actionTone}`}>Your Action: {c.action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- AI Copilot Page ---------------- */

const LANGUAGES = ["हिंदी", "मराठी", "தமிழ்", "తెలుగు", "ಕನ್ನಡ", "ਪੰਜਾਬੀ", "বাংলা", "English"];

const QUICK_PROMPTS = ["कीट नियंत्रण", "बारिश की सलाह", "आज बेचें?", "सिंचाई कब?", "Pest control", "Weather advice"];

const SAMPLE_QUESTIONS = [
  "मेरी कपास में कौन सी बीमारी है?",
  "कल बारिश के बाद क्या करें?",
  "आज टमाटर बेचना सही है?",
  "गेहूं में सिंचाई कब दें?",
  "Which pesticide for bollworm?",
  "Best mandi for onion today?",
];

function ChatBubble({ from, text, time }) {
  const isAI = from === "ai";
  return (
    <div className={`flex items-start gap-2.5 ${isAI ? "" : "flex-row-reverse"}`}>
      {isAI && (
        <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center shrink-0">
          <Leaf className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div className={`max-w-[85%] sm:max-w-[70%] ${isAI ? "" : "flex flex-col items-end"}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isAI
              ? "bg-stone-100 text-stone-800 rounded-tl-sm"
              : "bg-emerald-700 text-white rounded-tr-sm"
          }`}
        >
          {text}
        </div>
        <div className={`flex items-center gap-1.5 mt-1 ${isAI ? "" : "flex-row-reverse"}`}>
          <span className="text-[11px] text-stone-400">{time}</span>
          {isAI && <Volume2 className="w-3 h-3 text-stone-400" />}
        </div>
      </div>
    </div>
  );
}

function CopilotPage() {
  const [messages, setMessages] = useState([
    {
      from: "ai",
      time: "Now",
      text:
        "नमस्ते! I'm KrishiSahayak AI. Ask me anything about your crops, weather, pests, or market prices — in Hindi, Marathi, Tamil, Telugu, or English.",
    },
  ]);
  const [input, setInput] = useState("");

  const send = (text) => {
    const value = text ?? input;
    if (!value.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "user", text: value, time: "Now" },
      {
        from: "ai",
        time: "Now",
        text:
          "Got it — I'll check the latest weather and crop data for your farm in Nashik and get back with specific guidance shortly.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 h-full">
      {/* Chat panel */}
      <div className="rounded-2xl border border-stone-200 bg-white flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-100">
          <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center relative">
            <Mic className="w-4 h-4 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">AI Farming Copilot</p>
            <p className="text-xs text-stone-500">Online · Hindi, Marathi, Tamil, Telugu, English</p>
          </div>
        </div>

        {/* Quick prompt chips */}
        <div className="px-5 py-3 border-b border-stone-100 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-stone-200 text-stone-600 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto min-h-[300px]">
          {messages.map((m, i) => (
            <ChatBubble key={i} {...m} />
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-stone-100 flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center shrink-0 hover:bg-emerald-800 transition-colors">
            <Mic className="w-4 h-4 text-white" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type or speak in any language..."
            className="flex-1 text-sm bg-stone-100 rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
          />
          <button
            onClick={() => send()}
            className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center shrink-0 hover:bg-emerald-800 transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Side panel */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-4">
          <p className="text-sm font-semibold text-stone-900 flex items-center gap-1.5 mb-3">
            ⭐ Sample Questions
          </p>
          <div className="space-y-2">
            {SAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="w-full text-left text-xs text-stone-600 bg-stone-50 hover:bg-stone-100 rounded-lg px-3 py-2 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-stone-900 flex items-center gap-1.5 mb-3">
            <Languages className="w-4 h-4 text-emerald-700" /> Supported Languages
          </p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <span
                key={l}
                className="text-xs font-medium bg-white border border-emerald-200 text-stone-700 rounded-full px-2.5 py-1"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Mandi Market Page ---------------- */

const MANDI_ROWS = [
  {
    crop: "Tomato",
    variety: "Hybrid",
    prices: { Nashik: 1960, Pune: 1840, Kolhapur: 1720, Solapur: 1890 },
    best: "Nashik",
    change: "+12.4%",
    changeTone: "text-emerald-600 bg-emerald-50",
  },
  {
    crop: "Onion",
    variety: "Red",
    prices: { Nashik: 1980, Pune: 2100, Kolhapur: 2240, Solapur: 2150 },
    best: "Kolhapur",
    change: "-3.2%",
    changeTone: "text-red-600 bg-red-50",
  },
  {
    crop: "Cotton",
    variety: "Long Staple",
    prices: { Nashik: 6920, Pune: 6850, Kolhapur: 6780, Solapur: 6900 },
    best: "Nashik",
    change: "+5.8%",
    changeTone: "text-emerald-600 bg-emerald-50",
  },
  {
    crop: "Wheat",
    variety: "Sharbati",
    prices: { Nashik: 2380, Pune: 2300, Kolhapur: 2260, Solapur: 2320 },
    best: "Nashik",
    change: "Stable",
    changeTone: "text-stone-500 bg-stone-100",
  },
  {
    crop: "Soybean",
    variety: "Yellow",
    prices: { Nashik: 4800, Pune: 4920, Kolhapur: 4750, Solapur: 4870 },
    best: "Pune",
    change: "-1.1%",
    changeTone: "text-red-600 bg-red-50",
  },
];

const MANDI_COLS = ["Nashik", "Pune", "Kolhapur", "Solapur"];

function MandiMarketPage() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-base font-semibold text-stone-900">Mandi Market Insights</p>
          <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Live · Updated
            15 min ago
          </p>
        </div>
        <span className="text-xs font-medium text-stone-600 bg-stone-100 rounded-full px-3 py-1.5 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" /> Maharashtra
        </span>
      </div>

      {/* Price table */}
      <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
        <div className="px-5 py-3 border-b border-stone-100">
          <p className="text-sm font-semibold text-stone-900">Today's Prices (₹/Quintal)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold text-stone-400 tracking-wide">
                <th className="px-5 py-2.5">CROP</th>
                {MANDI_COLS.map((c) => (
                  <th key={c} className="px-3 py-2.5 text-right">
                    {c.toUpperCase()}
                  </th>
                ))}
                <th className="px-5 py-2.5 text-right">CHANGE</th>
              </tr>
            </thead>
            <tbody>
              {MANDI_ROWS.map((row) => (
                <tr key={row.crop} className="border-t border-stone-100">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-stone-900">{row.crop}</p>
                    <p className="text-xs text-stone-400">{row.variety}</p>
                  </td>
                  {MANDI_COLS.map((c) => (
                    <td key={c} className="px-3 py-3 text-right">
                      <span className={row.best === c ? "font-semibold text-stone-900" : "text-stone-600"}>
                        ₹{row.prices[c].toLocaleString("en-IN")}
                      </span>
                      {row.best === c && (
                        <span className="ml-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Best
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-5 py-3 text-right">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${row.changeTone}`}>
                      {row.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Trend chart (simplified) */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-stone-900">4-Week Price Trend</p>
            <select className="text-xs font-medium text-stone-600 bg-stone-100 rounded-lg px-2.5 py-1.5 outline-none">
              <option>Tomato</option>
              <option>Onion</option>
              <option>Cotton</option>
            </select>
          </div>
          <TrendChart />
          <div className="flex items-center gap-4 mt-3">
            <Legend color="bg-emerald-500" label="Tomato" />
            <Legend color="bg-amber-500" label="Onion" />
            <Legend color="bg-stone-400" label="Cotton" />
          </div>
        </div>

        {/* AI recommendation */}
        <div className="rounded-2xl bg-emerald-800 text-white p-5">
          <p className="text-sm font-semibold flex items-center gap-1.5 mb-4">
            <Zap className="w-4 h-4 text-amber-300" /> AI Market Recommendation
          </p>
          <div className="space-y-3">
            <RecoRow crop="Tomato" price="₹1,960/Q" action="Sell Today" tone="bg-amber-500" />
            <RecoRow crop="Onion" price="Price likely to recover" action="Wait 5–7 Days" tone="bg-white/20" />
            <RecoRow crop="Cotton" price="₹6,920/Q" action="Sell Today" tone="bg-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-stone-500">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} /> {label}
    </span>
  );
}

function RecoRow({ crop, price, action, tone }) {
  return (
    <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2.5">
      <div>
        <p className="text-sm font-semibold">{crop}</p>
        <p className="text-xs text-emerald-100">{price}</p>
      </div>
      <span className={`text-xs font-semibold text-white px-2.5 py-1 rounded-full ${tone}`}>{action}</span>
    </div>
  );
}

function TrendChart() {
  // Simple inline sparkline-style SVG trend (illustrative, no external chart lib needed)
  const tomato = [40, 42, 45, 44, 48, 52, 58];
  const onion = [55, 53, 50, 48, 47, 45, 44];
  const cotton = [60, 61, 60, 62, 63, 62, 64];
  const toPoints = (arr) =>
    arr.map((v, i) => `${(i / (arr.length - 1)) * 280},${70 - (v / 70) * 60}`).join(" ");
  return (
    <svg viewBox="0 0 280 72" className="w-full h-32">
      <polyline points={toPoints(cotton)} fill="none" stroke="#a8a29e" strokeWidth="2" />
      <polyline points={toPoints(onion)} fill="none" stroke="#f59e0b" strokeWidth="2" />
      <polyline points={toPoints(tomato)} fill="none" stroke="#10b981" strokeWidth="2.5" />
    </svg>
  );
}

/* ---------------- Farm Dashboard Page ---------------- */

const YIELD_HISTORY = [
  { month: "Aug", val: 40 },
  { month: "Sep", val: 45 },
  { month: "Oct", val: 60 },
  { month: "Nov", val: 62 },
  { month: "Dec", val: 50 },
  { month: "Jan", val: 78 },
];

const YIELD_FACTORS = [
  { label: "Soil Moisture", value: 72, tone: "bg-blue-500" },
  { label: "Fertilizer Level", value: 65, tone: "bg-emerald-500" },
  { label: "Pest Control", value: 80, tone: "bg-emerald-500" },
  { label: "Irrigation", value: 58, tone: "bg-amber-500" },
  { label: "Weather Impact", value: 45, tone: "bg-orange-500" },
];

function FarmDashboardPage() {
  const [rainfall, setRainfall] = useState(0);

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-base font-semibold text-stone-900">Farm Analytics Dashboard</p>
        <span className="text-xs font-medium text-stone-600 bg-stone-100 rounded-full px-3 py-1.5">
          Ramesh Farm · 4.2 Acres · Nashik
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-white border border-stone-200 p-4">
          <Sprout className="w-5 h-5 text-emerald-600" />
          <p className="text-xl font-bold text-stone-900 mt-2">58 Q</p>
          <p className="text-sm font-medium text-stone-700">Estimated Yield</p>
          <p className="text-xs text-emerald-600">+8% vs last season</p>
        </div>
        <div className="rounded-xl bg-white border border-stone-200 p-4">
          <IndianRupee className="w-5 h-5 text-emerald-600" />
          <p className="text-xl font-bold text-stone-900 mt-2">₹1,10,000</p>
          <p className="text-sm font-medium text-stone-700">Expected Profit</p>
          <p className="text-xs text-stone-400">Cotton + Wheat</p>
        </div>
        <div className="rounded-xl bg-white border border-stone-200 p-4">
          <Activity className="w-5 h-5 text-blue-600" />
          <p className="text-xl font-bold text-stone-900 mt-2">82 / 100</p>
          <p className="text-sm font-medium text-stone-700">Farm Health Score</p>
          <p className="text-xs text-stone-400">Good condition</p>
        </div>
        <div className="rounded-xl bg-white border border-stone-200 p-4">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <p className="text-xl font-bold text-amber-600 mt-2">Low</p>
          <p className="text-sm font-medium text-stone-700">Yield Risk</p>
          <p className="text-xs text-stone-400">No major threats</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        {/* Yield history chart */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-sm font-semibold text-stone-900 mb-4">Yield History (Quintals)</p>
          <div className="flex items-end gap-3 h-40">
            {YIELD_HISTORY.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5">
                <div
                  className="w-full max-w-[36px] bg-emerald-600 rounded-t-md"
                  style={{ height: `${(d.val / 80) * 100}%` }}
                />
                <span className="text-[11px] text-stone-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key yield factors */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-sm font-semibold text-stone-900 mb-4">Key Yield Factors</p>
          <div className="space-y-3.5">
            {YIELD_FACTORS.map((f) => (
              <div key={f.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-stone-600">{f.label}</span>
                  <span className="font-semibold text-stone-800">{f.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                  <div className={`h-full rounded-full ${f.tone}`} style={{ width: `${f.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What-if simulator */}
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
        <div className="flex items-center gap-2 mb-1">
          <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
          <p className="text-sm font-semibold text-stone-900">What-If Simulator</p>
          <span className="text-[10px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
            Predictive AI
          </span>
        </div>
        <p className="text-xs text-stone-500 mb-4">
          Adjust conditions to see the projected impact on this season's yield and profit.
        </p>
        <label className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
          <span>Extra rainfall this month</span>
          <span className="font-semibold text-stone-800">{rainfall} mm</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={rainfall}
          onChange={(e) => setRainfall(Number(e.target.value))}
          className="w-full accent-emerald-700"
        />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white rounded-lg px-4 py-3">
            <p className="text-xs text-stone-500">Projected Yield</p>
            <p className="text-lg font-bold text-stone-900">{(58 + rainfall * 0.12).toFixed(0)} Q</p>
          </div>
          <div className="bg-white rounded-lg px-4 py-3">
            <p className="text-xs text-stone-500">Projected Profit</p>
            <p className="text-lg font-bold text-stone-900">
              ₹{(110000 + rainfall * 220).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Crop Scanner Page ---------------- */

const SCAN_TIPS = [
  "Take photo in natural daylight",
  "Focus on the affected leaf clearly",
  "Include both healthy and diseased parts",
  "Avoid blurry or dark photos",
  "Capture a single leaf close-up",
];

const RECENT_SCANS = [
  { crop: "Cotton", disease: "Bacterial Blight", when: "Yesterday", severity: "Mild", tone: "text-amber-600 bg-amber-50" },
  { crop: "Tomato", disease: "Early Blight", when: "3 days ago", severity: "Moderate", tone: "text-orange-600 bg-orange-50" },
];

function CropScannerPage() {
  const [photo, setPhoto] = useState(null);

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <div>
        <p className="text-base font-semibold text-stone-900">AI Crop Health Scanner</p>
        <p className="text-sm text-stone-500 mt-0.5">
          Scan a leaf photo for instant disease detection — works offline using on-device AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upload zone */}
        <label className="rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-100/60 transition-colors">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && setPhoto(e.target.files[0].name)}
          />
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-3">
            <Camera className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-sm font-semibold text-stone-900">Upload or Capture Leaf Photo</p>
          <p className="text-xs text-stone-500 mt-1">JPG, PNG, WEBP · Max 10MB</p>
          <span className="mt-4 inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">
            <Upload className="w-4 h-4" /> Choose Photo
          </span>
          {photo && <p className="text-xs text-emerald-700 mt-3 font-medium">Selected: {photo}</p>}
        </label>

        {/* Result placeholder */}
        <div className="rounded-2xl border border-stone-200 bg-white p-8 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-3">
            <Leaf className="w-6 h-6 text-stone-400" />
          </div>
          <p className="text-sm font-semibold text-stone-700">No photo uploaded yet</p>
          <p className="text-xs text-stone-400 mt-1">Upload a leaf photo to get instant disease analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tips */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-sm font-semibold text-stone-900 mb-3">Tips for Best Results</p>
          <ul className="space-y-2">
            {SCAN_TIPS.map((t) => (
              <li key={t} className="text-sm text-stone-600 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-emerald-300 flex items-center justify-center text-emerald-600 text-[10px] shrink-0">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Recent scans */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-sm font-semibold text-stone-900 mb-3">Recent Scans</p>
          <div className="space-y-3">
            {RECENT_SCANS.map((s) => (
              <div key={s.disease} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-stone-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">
                      {s.crop} — {s.disease}
                    </p>
                    <p className="text-xs text-stone-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {s.when}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.tone}`}>{s.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Smart Alerts Page ---------------- */

const ALERT_CATEGORIES = [
  { icon: CloudRain, count: 2, label: "Weather", tone: "text-blue-600" },
  { icon: Bug, count: 1, label: "Pest & Disease", tone: "text-red-500" },
  { icon: TrendingUp, count: 2, label: "Market Price", tone: "text-emerald-600" },
  { icon: ShieldAlert, count: 1, label: "Yield Risk", tone: "text-amber-500" },
];

const ACTION_ALERTS = [
  {
    title: "Pest Outbreak Warning",
    body: "High pink bollworm risk in cotton fields across Nashik region. Inspect field and apply recommended pesticide.",
    when: "2 hours ago",
    level: "High",
    levelTone: "bg-red-500 text-white",
  },
  {
    title: "Heavy Rain Alert",
    body: "Heavy rainfall expected tomorrow (80mm). Skip irrigation today. Drain excess water from paddy fields.",
    when: "4 hours ago",
    level: "High",
    levelTone: "bg-red-500 text-white",
  },
];

const NOTIFICATIONS = [
  {
    title: "Tomato Price Rising",
    body: "Tomato prices at Nashik mandi up 12% this week (₹1,960/Q). Good time to sell your produce.",
    when: "6 hours ago",
    level: "Medium",
    levelTone: "bg-amber-100 text-amber-700",
  },
  {
    title: "Heatwave Risk Next Week",
    body: "Temperature forecast to exceed 40°C next Tuesday–Wednesday. Increase irrigation frequency for all crops.",
    when: "1 day ago",
    level: "Medium",
    levelTone: "bg-amber-100 text-amber-700",
  },
];

function SmartAlertsPage() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-base font-semibold text-stone-900">Smart Alert Center</p>
          <p className="text-xs text-stone-500 mt-0.5">3 unread alerts</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 border border-emerald-200 bg-emerald-50 rounded-lg px-3 py-1.5 hover:bg-emerald-100 transition-colors">
          <CheckCircle2 className="w-4 h-4" /> Mark All Read
        </button>
      </div>

      {/* Category tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ALERT_CATEGORIES.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-xl bg-white border border-stone-200 p-4">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${c.tone}`} />
                <span className="text-xl font-bold text-stone-900">{c.count}</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">{c.label}</p>
            </div>
          );
        })}
      </div>

      {/* Action required */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <p className="text-sm font-semibold text-stone-900">Smart Alerts — Action Required</p>
          <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
            {ACTION_ALERTS.length} Unread
          </span>
        </div>
        <div className="space-y-3">
          {ACTION_ALERTS.map((a) => (
            <div key={a.title} className="rounded-xl bg-red-50 border border-red-100 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-red-500 mt-0.5">⚠️</span>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{a.title}</p>
                    <p className="text-sm text-stone-600 mt-0.5">{a.body}</p>
                  </div>
                </div>
                <span className="text-[11px] text-stone-400 whitespace-nowrap">{a.when}</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <button className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5" /> Ask AI
                </button>
                <button className="text-sm font-medium text-stone-500">Mark Read</button>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ml-auto ${a.levelTone}`}>
                  {a.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <p className="text-sm font-semibold text-stone-900">Notifications</p>
          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {NOTIFICATIONS.length} Unread
          </span>
        </div>
        <div className="space-y-3">
          {NOTIFICATIONS.map((n) => (
            <div key={n.title} className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 mt-0.5">📈</span>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{n.title}</p>
                    <p className="text-sm text-stone-600 mt-0.5">{n.body}</p>
                  </div>
                </div>
                <span className="text-[11px] text-stone-400 whitespace-nowrap">{n.when}</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <button className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5" /> Ask AI
                </button>
                <button className="text-sm font-medium text-stone-500">Mark Read</button>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ml-auto ${n.levelTone}`}>
                  {n.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Profile Page ---------------- */

const LANGUAGE_OPTIONS = [
  { native: "हिंदी", en: "Hindi" },
  { native: "मराठी", en: "Marathi" },
  { native: "தமிழ்", en: "Tamil" },
  { native: "తెలుగు", en: "Telugu" },
  { native: "English", en: "English" },
  { native: "ਪੰਜਾਬੀ", en: "Punjabi" },
];

function Toggle({ defaultOn = true }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors shrink-0 ${
        on ? "bg-emerald-600 justify-end" : "bg-stone-200 justify-start"
      }`}
    >
      <span className="w-5 h-5 rounded-full bg-white shadow" />
    </button>
  );
}

function ProfilePage() {
  const [language, setLanguage] = useState("Hindi");

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <p className="text-base font-semibold text-stone-900">Farmer Profile</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile card */}
        <div className="rounded-2xl bg-emerald-800 text-white p-5 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-3xl">
            👨‍🌾
          </div>
          <p className="text-base font-semibold mt-3">Ramesh Patil</p>
          <p className="text-xs text-emerald-200">Farmer · Maharashtra</p>
          <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-4 border-t border-white/15">
            <div>
              <p className="text-sm font-bold">4.2 Acres</p>
              <p className="text-[10px] text-emerald-200">Farm Size</p>
            </div>
            <div>
              <p className="text-sm font-bold">12 Yrs</p>
              <p className="text-[10px] text-emerald-200">Experience</p>
            </div>
            <div>
              <p className="text-sm font-bold">2 Crops</p>
              <p className="text-[10px] text-emerald-200">Active</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-stone-50 border border-stone-200 p-5">
          <p className="text-xs text-stone-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Farm Location
          </p>
          <p className="text-sm font-semibold text-stone-900 mt-1">Nashik, Maharashtra 422001</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
          <p className="text-xs text-stone-500 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5" /> Current Crops
          </p>
          <p className="text-sm font-semibold text-stone-900 mt-1">Cotton (2.5 ac) · Wheat (1.7 ac)</p>
        </div>

        <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
          <p className="text-xs text-stone-500 flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5" /> Preferred Language
          </p>
          <p className="text-sm font-semibold text-stone-900 mt-1">{language}</p>
        </div>

        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-5">
          <p className="text-xs text-stone-500 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> Phone Number
          </p>
          <p className="text-sm font-semibold text-stone-900 mt-1">+91 98765 43210</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Notification preferences */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-sm font-semibold text-stone-900 flex items-center gap-1.5 mb-4">
            <Bell className="w-4 h-4 text-stone-500" /> Notification Preferences
          </p>
          <div className="space-y-4">
            {[
              { label: "Weather Alerts", sub: "Rain, heatwave, frost warnings", on: true },
              { label: "Pest & Disease Alerts", sub: "Outbreak risk notifications", on: true },
              { label: "Market Price Updates", sub: "Daily mandi price summary", on: true },
              { label: "AI Farming Tips", sub: "Daily crop care advice", on: false },
              { label: "Yield Risk Alerts", sub: "Low soil moisture, high temp", on: true },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-stone-800">{n.label}</p>
                  <p className="text-xs text-stone-400">{n.sub}</p>
                </div>
                <Toggle defaultOn={n.on} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Language settings */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-sm font-semibold text-stone-900 flex items-center gap-1.5 mb-4">
              <Languages className="w-4 h-4 text-stone-500" /> Language Settings
            </p>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGE_OPTIONS.map((l) => (
                <button
                  key={l.en}
                  onClick={() => setLanguage(l.en)}
                  className={`rounded-lg px-3 py-2.5 text-center transition-colors ${
                    language === l.en
                      ? "bg-emerald-700 text-white"
                      : "bg-stone-50 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <p className="text-sm font-semibold">{l.native}</p>
                  <p className={`text-[11px] ${language === l.en ? "text-emerald-100" : "text-stone-400"}`}>
                    {l.en}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Helpline */}
          <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-stone-500">Helpline</p>
              <p className="text-sm font-bold text-stone-900">Kisan Helpline · 1800-180-1551</p>
              <p className="text-xs text-emerald-700">Free · Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- App shell ---------------- */

const TITLES = {
  home: "Home",
  copilot: "AI Copilot",
  weather: "Weather",
  scanner: "Crop Scanner",
  mandi: "Mandi Market",
  dashboard: "Farm Dashboard",
  alerts: "Smart Alerts",
  profile: "Profile",
};

export default function KrishiSahayakApp() {
  const [active, setActive] = useState("home");

  return (
    <div
      style={{ display: "flex", flexDirection: "row", width: "100%", height: 800 }}
      className="bg-stone-50 font-sans text-stone-800 overflow-hidden"
    >
      <Sidebar active={active} onNavigate={setActive} />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, height: "100%" }}>
        <TopHeader title={TITLES[active]} />
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
          {active === "home" ? (
            <HomePage />
          ) : active === "weather" ? (
            <WeatherPage />
          ) : active === "copilot" ? (
            <CopilotPage />
          ) : active === "mandi" ? (
            <MandiMarketPage />
          ) : active === "dashboard" ? (
            <FarmDashboardPage />
          ) : active === "scanner" ? (
            <CropScannerPage />
          ) : active === "alerts" ? (
            <SmartAlertsPage />
          ) : active === "profile" ? (
            <ProfilePage />
          ) : (
            <div className="p-10 text-center text-stone-400">
              <p className="text-sm">
                <span className="font-semibold text-stone-600">{TITLES[active]}</span> page —
                coming next.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
