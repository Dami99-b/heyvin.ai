import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun,
  Moon,
  Shield,
  Lock,
  Unlock,
  Crown,
  Users,
  FileText,
  Sparkles,
  Brain,
  Compass,
  LogOut,
  ArrowRight,
  Check,
  Plus,
  AlertCircle,
  RefreshCw,
  Smartphone,
  TrendingUp,
  Info,
  Heart,
  Calendar,
  Menu,
  X,
  HelpCircle,
  Eye,
  ChevronLeft,
  Target,
  Volume2,
  User,
  Database,
  Youtube,
  BookText,
  Map as MapIcon,
  Settings,
  MessageSquare,
} from "lucide-react";
import {
  UserProfile,
  CheckIn,
  Task,
  SovereigntyScore,
  WeeklyReport,
  RehearseSession,
} from "./types";
import {
  db,
  getActiveUser,
  seedUserData,
  authenticateSupabase,
  supabase,
} from "./lib/supabase";
import { getAffirmation } from "./data/affirmations";

// Modular Views
import SovereigntyScoreView from "./components/SovereigntyScoreView";
import WeeklyReportView from "./components/WeeklyReportView";
import SafeCirclesView from "./components/SafeCirclesView";
import PatternPredictionView from "./components/PatternPredictionView";
import RehearsePlayground from "./components/RehearsePlayground";
import { HeyvinLogo } from "./components/HeyvinLogo";

// New Redesign Features
import { FrictionHeatmapView } from "./components/FrictionHeatmapView";
import { HeyvinJournalView } from "./components/HeyvinJournalView";
import { MorningBriefingCard } from "./components/MorningBriefingCard";
import { FocusLockView } from "./components/FocusLockView";
import { TherapeuticCopingSuite } from "./components/TherapeuticCopingSuite";
import { SovereignSettingsView } from "./components/SovereignSettingsView";
import { SovereignChroniclesFeed } from "./components/SovereignChroniclesFeed";
import { LandingInteractiveShowcase } from "./components/LandingInteractiveShowcase";
import ConfettiCelebration from "./components/ConfettiCelebration";
import { WaitlistLandingView } from "./components/WaitlistLandingView";
import { PremiumUnlockScreen } from "./components/PremiumUnlockScreen";
import { SovereignHotlineView } from "./components/SovereignHotlineView";

// ===== NEW ANIMATION COMPONENTS =====
import { AnimatedBackground } from "./components/AnimatedBackground";
import { ScrollReveal } from "./components/ScrollReveal";
import { GradientMesh } from "./components/GradientMesh";
import { AnimatedCursor } from "./components/AnimatedCursor";
import { MagneticButton } from "./components/MagneticButton";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { AnimatedThemeToggle } from "./components/AnimatedThemeToggle";
import { ParallaxCard } from "./components/ParallaxCard";
import { AnimatedNotification } from "./components/AnimatedNotification";
import { AnimatedLoader } from "./components/AnimatedLoader";
import { AnimatedGradientText } from "./components/AnimatedGradientText";

// ===== HOOKS =====
import { useTypewriter } from "./hooks/useTypewriter";
import { useScrollAnimation } from "./hooks/useScrollAnimation";

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.35,
      ease: [0.25, 0.8, 0.25, 1.0],
    },
  }),
};

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const [currentPath, setCurrentPath] = useState(
    () => window.location.pathname,
  );
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const [activeTab, setActiveTab] = useState<string>("today");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("heyvin_premium_unlocked") === "true";
  });
  const [showThemePremiumModal, setShowThemePremiumModal] = useState(false);

  const [theme, setTheme] = useState<"haven" | "dark">(() => {
    return (
      (localStorage.getItem("heyvin_theme") as "haven" | "dark") || "haven"
    );
  });

  const toggleTheme = () => {
    if (theme === "haven" && !isPremiumUnlocked) {
      setShowThemePremiumModal(true);
      return;
    }
    setTheme((prev) => (prev === "dark" ? "haven" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("heyvin_theme", theme);
    if (theme === "dark" && isPremiumUnlocked) {
      document.documentElement.classList.add("dark");
    } else {
      setTheme("haven");
      document.documentElement.classList.remove("dark");
    }
  }, [theme, isPremiumUnlocked]);

  const handleUnlockPremium = () => {
    setIsPremiumUnlocked(true);
    localStorage.setItem("heyvin_premium_unlocked", "true");
    triggerSuccessToast("👑 Premium unlocked successfully!");
    setShowConfetti(true);
    setShowThemePremiumModal(false);
  };

  const handleLockPremium = () => {
    setIsPremiumUnlocked(false);
    localStorage.removeItem("heyvin_premium_unlocked");
    setTheme("haven");
    localStorage.setItem("heyvin_theme", "haven");
    triggerSuccessToast("Premium tier locked.");
  };

  const [stealthActive, setStealthActive] = useState<boolean>(() => {
    return localStorage.getItem("stealth_active") === "true";
  });

  const [guestView, setGuestView] = useState<"landing" | "auth">("landing");
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");
  const [signupPassword, setSignupPassword] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupLocation, setSignupLocation] = useState<
    "Lagos" | "Delhi" | "Mexico" | "Other"
  >("Lagos");
  const [signupBasedIn, setSignupBasedIn] = useState<
    "Nigeria" | "India" | "Mexico" | "Other"
  >("Nigeria");
  const [signupHomeSituation, setSignupHomeSituation] = useState<
    "Living with parents" | "Partner" | "In-laws" | "Siblings" | "Other"
  >("Living with parents");
  const [signupPrimaryGoal, setSignupPrimaryGoal] = useState<
    "University degree" | "Career growth" | "Starting a business"
  >("University degree");

  const [googleAuthUser, setGoogleAuthUser] = useState<{
    email: string;
    name: string;
  } | null>(null);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [showOAuthHelp, setShowOAuthHelp] = useState(false);
  const [signUpStep, setSignUpStep] = useState<number>(1);

  const [stressLevel, setStressLevel] = useState<number>(40);
  const [frictionSource, setFrictionSource] = useState("Heavy family chores");
  const [hoursReclaimed, setHoursReclaimed] = useState<number>(2.0);
  const [journalNotes, setJournalNotes] = useState("");

  const [breathPhase, setBreathPhase] = useState<
    "idle" | "inhale" | "hold" | "exhale"
  >("idle");
  const [breathTimer, setBreathTimer] = useState(0);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<
    "Academics" | "Career Prep" | "Personal Boundaries" | "Life Admin"
  >("Academics");

  const [timedAffirmation, setTimedAffirmation] = useState<string | null>(null);
  const [showHighStressAlert, setShowHighStressAlert] = useState<string | null>(
    null,
  );
  const [todayAffirmationDismissed, setTodayAffirmationDismissed] =
    useState<boolean>(() => {
      return (
        localStorage.getItem("dismissed_today_aff") ===
        new Date().toDateString()
      );
    });

  const [logoClicks, setLogoClicks] = useState(0);
  const logoClickTimeout = useRef<any>(null);

  // ===== TYPEWRITER HOOK FOR HERO =====
  const { text: typedText } = useTypewriter({
    words: [
      "Reclaim Your Focus.",
      "Guard Your Time.",
      "Build Your Future.",
      "Protect Your Peace.",
    ],
    speed: 60,
    delay: 2000,
    loop: true,
  });

  useEffect(() => {
    const checkSupabaseSession = async () => {
      if (!supabase) return;
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session && session.user) {
          const sbUser = session.user;
          const userEmail = sbUser.email || "";
          
          // Hunt for user profile by email or Supabase uid in registry
          const allUsers = db.getAllUsers();
          let matchedUser = allUsers.find(
            (u: UserProfile) => u.email.toLowerCase() === userEmail.toLowerCase() || u.uid === sbUser.id
          );
          
          if (!matchedUser) {
            // Unregistered OAuth. Provision beautiful base profile.
            const name = sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || userEmail.split("@")[0] || "Sovereign Sister";
            matchedUser = {
              uid: sbUser.id,
              username: name,
              email: userEmail,
              location: "Other",
              based_in: "Other",
              home_situation: "Living with parents",
              primary_goal: "Career growth",
              created_at: new Date().toISOString(),
            };
            db.createUser(matchedUser);
            seedUserData(matchedUser.uid, matchedUser.location);
          }
          
          // Log in locally
          setCurrentUser(matchedUser);
          localStorage.setItem("heyvin_current_user", JSON.stringify(matchedUser));
          
          // Bind setGoogleAuthUser for UI indicator
          setGoogleAuthUser({
            email: userEmail,
            name: matchedUser.username,
          });
          
          loadUserData(matchedUser.uid);
          
          // sync
          db.syncFromCloud(matchedUser.uid).then(() => {
            loadUserData(matchedUser.uid);
          });

          triggerSuccessToast(`Welcome back, ${matchedUser.username}! 🛡️`);
          
          // Clear URL hash cleanly
          if (window.history.pushState) {
            window.history.pushState("", document.title, window.location.pathname + window.location.search);
          }
        }
      } catch (err) {
        console.error("Error retrieving Supabase session on startup:", err);
      }
    };

    const sessionUser = getActiveUser();
    if (sessionUser) {
      setCurrentUser(sessionUser);
      loadUserData(sessionUser.uid);
      authenticateSupabase(sessionUser.uid).then(() => {
        db.syncFromCloud(sessionUser.uid).then(() =>
          loadUserData(sessionUser.uid),
        );
      });
      
      if (supabase) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session && session.user) {
            setGoogleAuthUser({
              email: session.user.email || "",
              name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split("@")[0] || "Sovereign Sister",
            });
          }
        });
      }
    } else {
      checkSupabaseSession();
    }
  }, []);

  useEffect(() => {
    if (stealthActive) {
      document.title = "StudySync — Academic Planner v4";
    } else {
      document.title = "Heyvin AI — Your Private Focus Companion";
    }
  }, [stealthActive]);

  const loadUserData = (uid: string) => {
    const userTasks = db.get<Task>(uid, "tasks");
    setTasks(userTasks);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim()) return;
    const uuid = () => Math.random().toString(36).substr(2, 9);
    const newUser: UserProfile = {
      uid: uuid(),
      username: signupName.trim(),
      email: signupEmail.trim() || googleAuthUser?.email || "",
      location: signupLocation,
      based_in: signupBasedIn,
      home_situation: signupHomeSituation,
      primary_goal: signupPrimaryGoal,
      created_at: new Date().toISOString(),
    };
    db.createUser(newUser);
    seedUserData(newUser.uid, newUser.location);
    setCurrentUser(newUser);
    loadUserData(newUser.uid);
    authenticateSupabase(newUser.uid);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const users = db.getAllUsers();
    const found = users.find(
      (u: UserProfile) => u.email === signinEmail.trim(),
    );
    if (found) {
      setCurrentUser(found);
      loadUserData(found.uid);
      authenticateSupabase(found.uid);
    } else {
      triggerSuccessToast("No account found with that email.");
    }
  };

  const handleGoogleSignIn = async () => {
    setOauthLoading(true);
    try {
      const result = await supabase?.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (result?.error) throw result.error;
    } catch (err) {
      triggerSuccessToast(
        "Google sign-in unavailable. Use local sign-up below.",
      );
    } finally {
      setOauthLoading(false);
    }
  };

  const handleLoadDemoData = () => {
    if (!currentUser) return;
    const uuid = () => Math.random().toString(36).substr(2, 9);
    const user_id = currentUser.uid;

    const demoTasks: Task[] = [
      {
        id: uuid(),
        user_id,
        title: "Complete JAMB Mathematics past questions (2019-2023)",
        category: "Academics",
        completed: false,
        hours_estimate: 3,
        created_at: new Date().toISOString(),
      },
      {
        id: uuid(),
        user_id,
        title: "Draft personal statement for scholarship application",
        category: "Career Prep",
        completed: false,
        hours_estimate: 2,
        created_at: new Date().toISOString(),
      },
      {
        id: uuid(),
        user_id,
        title: "Practice saying no to unplanned chores after 8PM",
        category: "Personal Boundaries",
        completed: true,
        hours_estimate: 0.5,
        created_at: new Date().toISOString(),
      },
      {
        id: uuid(),
        user_id,
        title: "Set up weekly Google Calendar study blocks",
        category: "Life Admin",
        completed: false,
        hours_estimate: 1,
        created_at: new Date().toISOString(),
      },
    ];
    db.save(user_id, "tasks", demoTasks);

    const demoCheckins: CheckIn[] = [
      {
        id: uuid(),
        user_id,
        date: new Date().toISOString().split("T")[0],
        day_of_week: new Date().getDay(),
        hour_of_day: 8,
        stress_level: 55,
        friction_source: "Heavy family chores",
        hours_reclaimed: 2.5,
        notes: "Morning chores delayed study block by 2 hours.",
        created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
      {
        id: uuid(),
        user_id,
        date: new Date().toISOString().split("T")[0],
        day_of_week: 1,
        hour_of_day: 19,
        stress_level: 30,
        friction_source: "Power and tech cutoffs",
        hours_reclaimed: 3.0,
        notes: "Evening was quiet. Got 3 focused hours.",
        created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      },
    ];
    db.save(user_id, "check_ins", demoCheckins);

    const demoRehearseSessions: RehearseSession[] = [
      {
        id: uuid(),
        user_id,
        scenario: "Mom asking me to cook during exam revision",
        user_response:
          "Mum, I have an exam in 3 days. Can we agree I handle kitchen duties after 6PM only this week?",
        ai_tips: [
          "Strong boundary with a clear time limit — well framed.",
          "Coach: Offer an alternative time slot to reduce resistance.",
        ],
        analyzed_response: "Boundary Score: Strong Alternative Proposal.",
        created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      },
    ];
    db.save(user_id, "rehearse_sessions", demoRehearseSessions);

    const weekScores: SovereigntyScore[] = [
      {
        id: uuid(),
        user_id,
        week_start: "Week 1",
        score: 55,
        consistency: 15,
        protection: 18,
        resilience: 12,
        growth: 10,
        created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
      },
      {
        id: uuid(),
        user_id,
        week_start: "Week 2",
        score: 64,
        consistency: 20,
        protection: 22,
        resilience: 14,
        growth: 8,
        created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
      },
      {
        id: uuid(),
        user_id,
        week_start: "Week 3",
        score: 71,
        consistency: 22,
        protection: 24,
        resilience: 15,
        growth: 10,
        created_at: new Date().toISOString(),
      },
    ];
    db.save(user_id, "sovereignty_scores", weekScores);

    setTasks(demoTasks);
    window.dispatchEvent(new Event("heyvin_db_update"));
    triggerSuccessToast("Demo data loaded.");
  };

  const handleLogoClick = () => {
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        const nextStealth = !stealthActive;
        setStealthActive(nextStealth);
        localStorage.setItem("stealth_active", String(nextStealth));
        if (!nextStealth && currentUser) {
          triggerSuccessToast(`Welcome back, ${currentUser.username}.`);
        }
        return 0;
      }
      if (logoClickTimeout.current) clearTimeout(logoClickTimeout.current);
      logoClickTimeout.current = setTimeout(() => setLogoClicks(0), 1000);
      return next;
    });
  };

  const [successToast, setSuccessToast] = useState<string | null>(null);
  const triggerSuccessToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  useEffect(() => {
    let interval: any = null;
    if (breathPhase !== "idle") {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev <= 1) {
            if (breathPhase === "inhale") {
              setBreathPhase("hold");
              return 7;
            } else if (breathPhase === "hold") {
              setBreathPhase("exhale");
              return 8;
            } else if (breathPhase === "exhale") {
              setBreathPhase("inhale");
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathPhase]);

  const startBreathing = () => {
    setBreathPhase("inhale");
    setBreathTimer(4);
  };
  const stopBreathing = () => {
    setBreathPhase("idle");
    setBreathTimer(0);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newTaskTitle.trim()) return;
    const t: Task = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: currentUser.uid,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      completed: false,
      hours_estimate: 2,
      created_at: new Date().toISOString(),
    };
    db.upsert(currentUser.uid, "tasks", t);
    setNewTaskTitle("");
    loadUserData(currentUser.uid);
  };

  const handleToggleTask = (tid: string) => {
    if (!currentUser) return;
    const taskList = db.get<Task>(currentUser.uid, "tasks");
    const found = taskList.find((t) => t.id === tid);
    if (found) {
      const wasCompleted = found.completed;
      found.completed = !found.completed;
      db.upsert(currentUser.uid, "tasks", found);
      loadUserData(currentUser.uid);
      if (!wasCompleted && found.completed) {
        const updatedList = db.get<Task>(currentUser.uid, "tasks");
        if (
          updatedList.filter((t) => !t.completed).length === 0 &&
          updatedList.length > 0
        ) {
          setShowConfetti(true);
        }
      }
    }
  };

  const handleSubmitCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newCheck: CheckIn = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: currentUser.uid,
      date: new Date().toISOString().split("T")[0],
      day_of_week: new Date().getDay(),
      hour_of_day: new Date().getHours(),
      stress_level: stressLevel,
      friction_source: frictionSource,
      hours_reclaimed: Number(hoursReclaimed),
      notes: journalNotes,
      created_at: new Date().toISOString(),
    };

    db.upsert(currentUser.uid, "check_ins", newCheck);

    const activities = db.get<any>(currentUser.uid, "circle_activity");
    activities.unshift({
      id: Math.random().toString(36).substr(2, 9),
      user_id: currentUser.uid,
      username: currentUser.username,
      activity_type: "check_in",
      anonymized_label: `${currentUser.username} completed a check-in 🌿`,
      created_at: new Date().toISOString(),
    });
    db.save(currentUser.uid, "circle_activity", activities);

    if (stressLevel > 70) {
      setShowHighStressAlert(getAffirmation(stressLevel));
    } else {
      triggerSuccessToast("Check-in saved.");
    }

    setStressLevel(40);
    setFrictionSource("Heavy family chores");
    setHoursReclaimed(2.0);
    setJournalNotes("");

    db.calculateSovereigntyScore(currentUser.uid);
    setActiveTab("today");
  };

  const handleRehearseCallback = (aff: string) => {
    setTimedAffirmation(aff);
    setTimeout(() => setTimedAffirmation(null), 4000);
  };

  const handleDismissTodayAff = () => {
    setTodayAffirmationDismissed(true);
    localStorage.setItem("dismissed_today_aff", new Date().toDateString());
  };

  const handleSignOut = () => {
    localStorage.removeItem("heyvin_current_user");
    setCurrentUser(null);
    setGuestView("landing");
  };

  const getLogsCount = () => {
    if (!currentUser) return 0;
    return db.get(currentUser.uid, "check_ins").length;
  };

  const themeClassHeader =
    theme === "dark"
      ? "bg-slate-900 border-b border-slate-800 text-slate-100 shadow-sm"
      : stealthActive
        ? "bg-white border-b border-gray-200 text-gray-800 shadow-xs"
        : "bg-white border-b border-[#EDE8E0] text-[#1A1414] shadow-xs";

  const themeClassSidebar =
    theme === "dark"
      ? "bg-slate-950 border-r border-slate-800"
      : stealthActive
        ? "bg-white border-r border-gray-200"
        : "bg-white border-r border-[#EDE8E0]";

  const themeClassContent =
    theme === "dark"
      ? "bg-slate-950 text-slate-100 dark"
      : "bg-[#FAF7F2] text-[#1A1414]";

  const isWaitlistLanding = currentPath.replace(/\/$/, "") === "/landing";
  if (isWaitlistLanding) {
    return <WaitlistLandingView onNavigateToApp={() => navigateTo("/")} />;
  }

  return (
    <>
      {/* ===== GLOBAL ANIMATIONS ===== */}
      <AnimatedCursor />
      <GradientMesh />

      <div
        className={`min-h-screen will-change-transform flex flex-col font-sans transition-colors duration-300 ${themeClassContent} ${theme === "dark" ? "dark" : ""} relative overflow-hidden overflow-x-hidden`}
        style={{ maxWidth: "100vw", overflowX: "hidden" }}
      >
        {/* Subtle background watermark */}
        {!stealthActive && currentUser && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 select-none">
            <HeyvinLogo
              size="40vw"
              className="opacity-[0.012] md:opacity-[0.016] max-w-[340px] max-h-[340px]"
              glowOpacity={0.15}
            />
          </div>
        )}

        {/* Timed affirmation overlay */}
        <AnimatePresence>
          {timedAffirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#E28E75] text-[#FFF4F0] z-50 flex flex-col items-center justify-center p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
                className="space-y-6 max-w-2xl"
              >
                <Sparkles className="mx-auto w-10 h-10 text-orange-200 animate-pulse" />
                <blockquote className="text-2xl sm:text-3xl font-serif font-semibold italic leading-snug">
                  "{timedAffirmation}"
                </blockquote>
                <p className="eyebrow opacity-80">
                  Heyvin AI · You've got this
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* High stress modal */}
        <AnimatePresence>
          {showHighStressAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-orange-50 space-y-6"
              >
                <AlertCircle
                  size={44}
                  className="text-[#E28E75] mx-auto animate-pulse"
                />
                <div className="space-y-2 text-center">
                  <span className="badge badge-orange mx-auto">
                    High Stress Detected (&gt;70%)
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed font-serif italic py-2">
                    "{showHighStressAlert}"
                  </p>
                </div>
                <button
                  onClick={() => setShowHighStressAlert(null)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-amber-900 cursor-pointer hover:bg-amber-950 transition-all font-sans"
                >
                  Got it, close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dark mode premium gate modal */}
        <AnimatePresence>
          {showThemePremiumModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                className="bg-white text-gray-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-amber-100 space-y-5 animate-scaleUp"
              >
                <div className="mx-auto w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 animate-pulse">
                  <Crown size={24} />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-lg font-bold font-serif text-amber-950">
                    Dark Mode is Premium
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Late-night dark theme is a{" "}
                    <strong className="text-amber-800">
                      Sovereignty Premium
                    </strong>{" "}
                    feature. Upgrade to unlock it, plus private journal AI
                    analysis, weekly reports, pattern prediction, and anonymous
                    study circles.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <MagneticButton
                    onClick={handleUnlockPremium}
                    className="w-full py-3 rounded-xl text-xs font-bold text-[#FAF7F2] bg-amber-950 hover:bg-amber-900 transition-all font-sans cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles size={14} className="text-amber-300" />
                    <span>Unlock Premium (₦2,000 / $1.49)</span>
                  </MagneticButton>
                  <button
                    type="button"
                    onClick={() => setShowThemePremiumModal(false)}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-all font-sans cursor-pointer"
                  >
                    Keep light theme
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success toast */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-8 right-8 z-50 p-4 rounded-xl text-xs font-bold ring-1 border shadow-2xl flex items-center gap-3 cursor-pointer ${
                stealthActive
                  ? "bg-blue-600 text-white border-blue-500 ring-blue-500/10"
                  : "bg-amber-950 text-orange-50 border-orange-950 ring-amber-900/10"
              }`}
              onClick={() => {
                setActiveTab("report");
                setSuccessToast(null);
              }}
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>{successToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti */}
        <AnimatePresence>
          {showConfetti && (
            <ConfettiCelebration
              onClose={() => setShowConfetti(false)}
              stealthActive={stealthActive}
            />
          )}
        </AnimatePresence>

        {/* ── GUEST VIEWS ─────────────────────────────────────── */}
        {!currentUser ? (
          guestView === "landing" ? (
            /* ── LANDING PAGE ─────────────────────────────────── */
            <div className="min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE4] to-[#FAF7F2] lg:from-[#F3ECE0] lg:via-[#FAF7F2] lg:to-[#FAF7F2] text-[#1A1414] font-sans relative overflow-y-auto select-none">
              {/* Floating decorative shapes */}
              <div className="absolute top-20 left-10 w-48 h-48 rounded-full bg-gradient-warm opacity-5 animate-float-shape" />
              {/* <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-gradient-gold opacity-5 animate-orb-pulse" />
              <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-brand-terracotta opacity-5 animate-slow-rotate" /> */}
              
              {/* Floating particles */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-brand-wine animate-float-particle" />
              <div
                className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-brand-gold animate-float-particle"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-brand-terracotta animate-float-particle"
                style={{ animationDelay: "4s" }}
              />

              {/* Landing header */}
              <div className="w-full max-w-5xl flex items-center justify-between py-4 border-b border-[#EDE8E0] mb-8">
                <div className="flex items-center gap-2">
                  <HeyvinLogo size={32} glowOpacity={0.1} />
                  <div className="flex flex-col text-left">
                    <span className="font-serif font-bold uppercase tracking-[0.15em] text-[#1A1414] text-base leading-none">
                      HEYVIN AI
                    </span>
                    <span className="eyebrow mt-1">
                      Your private focus companion
                    </span>
                  </div>
                </div>
                <MagneticButton
                  onClick={() => setGuestView("auth")}
                  className="btn btn-primary"
                >
                  Sign In
                </MagneticButton>
              </div>

              {/* Hero split */}
              <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-8 pt-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left w-full">
                  {/* Left: copy */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#7C2D3E] font-semibold text-xs uppercase tracking-wider animate-fade-up-delay-1"></div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-[#1A1414] leading-tight">
                      <AnimatedGradientText
                        gradient="linear-gradient(135deg, #7C2D3E 0%, #C9983A 50%, #7C2D3E 100%)"
                        speed={4}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight leading-tight"
                      >
                        {typedText}
                      </AnimatedGradientText>
                    </h1>

                    <p className="animate-gentle-float text-sm sm:text-base text-[#46352E] font-semibold leading-relaxed font-sans max-w-xl">
                      A completely private productivity companion for ambitious
                      young women. Track your focus, understand your domestic
                      friction patterns, and protect your study time.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <MagneticButton
                        onClick={() => {
                          const el =
                            document.getElementById("quick_signup_card");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="btn btn-primary animate-pulse-ring"
                      >
                        <span>Get Started</span>
                        <ArrowRight size={14} />
                      </MagneticButton>
                      <MagneticButton
                        onClick={() => setGuestView("auth")}
                        className="btn btn-secondary"
                      >
                        Sign Up
                      </MagneticButton>
                      <MagneticButton
                        onClick={() => navigateTo("/landing")}
                        className="btn btn-ghost border border-[#7C2D3E]/20"
                      >
                        Waitlist
                      </MagneticButton>
                    </div>
                  </div>

                  {/* Right: quick signup card */}
                  <div
                    id="quick_signup_card"
                    className="animate-bounce-entrance lg:col-span-5 bg-white border border-[#EDE8E0] p-6 rounded-2xl shadow-xl space-y-5 relative"
                  >
                    <div className="absolute top-3 right-3">
                      <span className="badge badge-green">
                        <Shield size={9} /> Private & Local
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif font-black text-gray-950 text-sm tracking-tight">
                        Create your space
                      </h3>
                      <p className="text-xs text-gray-500 leading-normal">
                        Set up in under a minute. No card required.
                      </p>
                    </div>

                    {/* Google sign-in */}
                    <div className="space-y-3 pt-1">
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={oauthLoading}
                        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-[#7C2D3E]/10 text-xs text-gray-700 font-bold tracking-wide transition-all shadow-xs cursor-pointer disabled:opacity-55"
                      >
                        {oauthLoading ? (
                          <AnimatedLoader size={24} color="#7C2D3E" />
                        ) : (
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                        )}
                        <span>
                          {oauthLoading
                            ? "Connecting..."
                            : "Continue with Google"}
                        </span>
                      </button>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-mono">
                        <div className="h-px bg-gray-200 flex-1" />
                        <span>OR</span>
                        <div className="h-px bg-gray-200 flex-1" />
                      </div>
                    </div>

                    {/* Direct inputs */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="label">First Name / Pseudonym</label>
                        <input
                          type="text"
                          placeholder="e.g. Pricilla"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="field text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="label">Email Address</label>
                        <input
                          type="email"
                          placeholder="pricilla@gmail.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="field text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="label">Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="field text-xs"
                        />
                      </div>
                      <MagneticButton
                        type="button"
                        disabled={
                          !signupName.trim() ||
                          !signupEmail.trim() ||
                          !signupPassword.trim()
                        }
                        onClick={() => {
                          setGuestView("auth");
                          setSignUpStep(2);
                        }}
                        className="btn btn-primary w-full"
                      >
                        <span>Continue</span>
                        <ArrowRight size={12} />
                      </MagneticButton>
                      <p className="text-[11px] text-center text-gray-400 font-mono leading-tight">
                        🔒 Stored locally on your device only.
                      </p>
                    </div>
                  </div>
                </div>

                {/* USP columns with scroll reveal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-12 text-left">
                  <ScrollReveal direction="up" delay={0.1}>
                    <div className="p-6 bg-white border border-[#EDE8E0] rounded-xl shadow-xs space-y-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-[#7C2D3E] flex items-center justify-center">
                        <Shield size={16} />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#1A1414]">
                        Stealth Cover
                      </h3>
                      <p className="text-xs text-[#7A6860] leading-relaxed">
                        Triple-click the logo to instantly switch to a neutral
                        "StudySync" academic planner — safe from unannounced
                        visitors.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={0.2}>
                    <div className="p-6 bg-white border border-[#EDE8E0] rounded-xl shadow-xs space-y-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#C9983A] flex items-center justify-center">
                        <TrendingUp size={16} />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#1A1414]">
                        Friction Tracking
                      </h3>
                      <p className="text-xs text-[#7A6860] leading-relaxed">
                        Measure your focus time, log domestic interruptions, and
                        discover your personal patterns over time.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={0.3}>
                    <div className="p-6 bg-white border border-[#EDE8E0] rounded-xl shadow-xs space-y-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#543124] flex items-center justify-center">
                        <Brain size={16} />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#1A1414]">
                        AI Guidance
                      </h3>
                      <p className="text-xs text-[#7A6860] leading-relaxed">
                        Journal privately, practice difficult conversations, and
                        get AI-powered weekly summaries of your progress.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                <SovereignChroniclesFeed />
                <LandingInteractiveShowcase
                  onSignUpClick={() => {
                    const el = document.getElementById("quick_signup_card");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      setGuestView("auth");
                      setSignUpStep(1);
                    }
                  }}
                />
              </div>

              {/* Footer */}
              <div className="w-full max-w-5xl py-6 border-t border-[#EDE8E0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6860] gap-4 mt-8">
                <div>© 2026 Heyvin Team. All Rights Reserved.</div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://youtube.com/@heyvinaiteam?si=lI8AsHrtGB1Ow9WS"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs text-[#7A6860] hover:text-red-600 transition-colors"
                  >
                    <Youtube size={14} className="text-red-500" />
                    <span>Contact Us</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* ── AUTH PAGE ────────────────────────────────────── */
            <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-[#FAF7F2] select-none">
              {/* Left panel */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#96374a] via-[#852d3f] to-[#7C2D3E] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border-r border-[#691a29]">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#c54961]/3 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-8 relative z-10">
                  <button
                    onClick={() => setGuestView("landing")}
                    className="text-amber-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <ChevronLeft
                      size={16}
                      className="group-hover:-translate-x-1 transition-transform"
                    />{" "}
                    Back
                  </button>

                  <div className="space-y-4">
                    <span className="badge badge-gold">🛡️ Private & Local</span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight leading-tight">
                      Every Study Block,
                      <br />
                      <span className="text-amber-200">
                        Utterly Confidential.
                      </span>
                    </h2>
                    <p className="text-sm text-yellow-50/95 leading-relaxed font-sans max-w-md font-medium">
                      Everything stays in your browser — your logs, your
                      journal, your patterns. Nothing leaves your device without
                      your permission.
                    </p>
                  </div>

                  <div className="bg-red-950/30 border border-red-800/30 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="eyebrow text-orange-300">Focus Tip</span>
                    </div>
                    <p className="text-xs text-rose-50 leading-relaxed italic font-serif">
                      "Use a pseudonym when signing up — an extra layer of
                      privacy if someone picks up your phone."
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-red-800/30">
                    {[
                      "Local encrypted storage",
                      "No background data collection",
                      "Instant stealth cover (StudySync)",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs font-semibold text-rose-100"
                      >
                        <span className="p-0.5 bg-emerald-950/50 text-emerald-400 rounded-md">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 text-xs text-rose-200 border-t border-red-800/20 mt-8 relative z-10 flex items-center justify-between">
                  <span>Heyvin v2.8</span>
                  <a
                    href="https://youtube.com/@heyvinaiteam?si=lI8AsHrtGB1Ow9WS"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Right panel: forms */}
              <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 lg:p-14 overflow-y-auto max-h-screen flex flex-col justify-start py-8 sm:py-12 lg:py-16 font-sans">
                {/* Sign up / Sign in toggle */}
                <div className="flex bg-[#7C2D3E]/5 p-1 rounded-xl mb-6 max-w-xs border border-[#7C2D3E]/10">
                  {(["signup", "signin"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => {
                        setAuthMode(mode);
                        if (mode === "signup") setSignUpStep(1);
                      }}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs uppercase tracking-wider font-extrabold transition-all text-center cursor-pointer ${
                        authMode === mode
                          ? "bg-[#7C2D3E] text-white shadow-xs"
                          : "text-[#7C2D3E] hover:bg-[#7C2D3E]/5"
                      }`}
                    >
                      {mode === "signup" ? "Sign Up" : "Sign In"}
                    </button>
                  ))}
                </div>

                {authMode === "signup" && (
                  <>
                    {/* Stepper */}
                    <div className="flex items-center justify-between pb-4 border-b border-orange-100/30 mb-4">
                      {[
                        { step: 1, label: "Your details" },
                        { step: 2, label: "Your home" },
                        { step: 3, label: "Your goals" },
                      ].map(({ step, label }, idx) => (
                        <React.Fragment key={step}>
                          <button
                            type="button"
                            onClick={() =>
                              signUpStep > step && setSignUpStep(step)
                            }
                            className={`flex items-center gap-1.5 transition-all text-left ${signUpStep > step ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
                          >
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${signUpStep >= step ? "bg-[#7C2D3E] text-white" : "bg-gray-100 text-gray-400"}`}
                            >
                              {signUpStep > step ? "✓" : step}
                            </span>
                            <span
                              className={`text-xs font-bold tracking-tight ${signUpStep === step ? "text-[#7C2D3E]" : "text-gray-400"}`}
                            >
                              {label}
                            </span>
                          </button>
                          {idx < 2 && (
                            <div className="h-px bg-orange-100 flex-1 mx-2" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="space-y-1 mb-5">
                      <span className="eyebrow text-[#7C2D3E]">
                        Step {signUpStep} of 3
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-950 tracking-tight">
                        {signUpStep === 1
                          ? googleAuthUser
                            ? "Credentials Connected"
                            : "Create your account"
                          : signUpStep === 2
                            ? "Your home environment"
                            : "Set your goal"}
                      </h1>
                      <p className="text-xs text-[#4A3932] font-semibold leading-relaxed max-w-sm">
                        {signUpStep === 1
                          ? googleAuthUser
                            ? "Your identity is secure. Confirm your name below to continue."
                            : "Create a private account or connect with Google."
                          : signUpStep === 2
                            ? "Tell us about your living situation so we can personalise your experience."
                            : "Set your main goal so your score tracks what matters to you."}
                      </p>
                    </div>

                    {/* Live keycard preview */}
                    <div className="bg-radial from-amber-950 to-[#60202e] text-orange-50 p-4 rounded-xl border border-amber-900/40 relative overflow-hidden group shadow-md mb-5">
                      <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#7C2D3E]/35 rounded-full blur-2xl" />
                      <div className="flex justify-between items-start relative z-10">
                        <div className="space-y-1">
                          <span className="eyebrow text-[#E28E75] block">
                            YOUR ACCESS CARD
                          </span>
                          <span className="text-xs font-serif font-bold tracking-tight block">
                            {signupName.trim() ||
                              googleAuthUser?.name ||
                              "Anonymous Sister"}
                          </span>
                          <span className="text-[11px] font-mono text-rose-200 block">
                            {signupEmail.trim() ||
                              googleAuthUser?.email ||
                              "sandbox@heyvin.internal"}
                          </span>
                        </div>
                        <div className="px-2 py-1 bg-red-950/40 border border-red-800/10 rounded-md text-[11px] font-mono font-bold uppercase text-[#E28E75]">
                          {googleAuthUser ? "OAUTH" : "LOCAL"}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-white/10 relative z-10 text-[11px] font-sans">
                        <div>
                          <span className="text-[#E28E75] uppercase block text-[11px] font-mono">
                            Location
                          </span>
                          <span className="font-semibold text-white">
                            {signupBasedIn}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#E28E75] uppercase block text-[11px] font-mono">
                            Home
                          </span>
                          <span
                            className="font-semibold text-white truncate max-w-[90px] block"
                            title={signupHomeSituation}
                          >
                            {signupHomeSituation}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#E28E75] uppercase block text-[11px] font-mono">
                            Goal
                          </span>
                          <span
                            className="font-semibold text-white truncate max-w-[90px] block"
                            title={signupPrimaryGoal}
                          >
                            {signupPrimaryGoal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* STEP 1 */}
                {authMode === "signup" && signUpStep === 1 && (
                  <div className="space-y-4">
                    {!googleAuthUser && (
                      <div className="space-y-3 pb-4 border-b border-orange-100/40">
                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          disabled={oauthLoading}
                          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 font-bold tracking-wide transition-all shadow-xs cursor-pointer disabled:opacity-55"
                        >
                          {oauthLoading ? (
                            <AnimatedLoader size={24} color="#7C2D3E" />
                          ) : (
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                              />
                              <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                              />
                            </svg>
                          )}
                          <span>
                            {oauthLoading
                              ? "Connecting..."
                              : "Continue with Google"}
                          </span>
                        </button>
                        <p className="text-xs text-center text-gray-400 font-mono">
                          Works with school or personal Google accounts.
                        </p>

                        <div className="bg-amber-50/70 border border-amber-100 p-3 rounded-xl space-y-2 text-center mt-2">
                          <p className="text-xs text-amber-950 font-medium leading-relaxed">
                            ⚠️ <strong>Google sign-in blocked?</strong> Use our
                            offline local sign-up instead:
                          </p>
                          <button
                            type="button"
                            id="direct_sandbox_bypass_btn"
                            onClick={() => {
                              setSignupName("Sovereign Sister");
                              setSignupEmail("sister.sovereign@gmail.com");
                              setGoogleAuthUser({
                                email: "sister.sovereign@gmail.com",
                                name: "Sovereign Sister",
                              });
                              triggerSuccessToast(
                                "Local demo account created! 🛡️",
                              );
                              setSignUpStep(2);
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-amber-900 border border-amber-950 text-xs uppercase font-extrabold tracking-wider text-white hover:bg-amber-950 transition-all cursor-pointer shadow-xs inline-block"
                          >
                            Use Offline Demo Account
                          </button>
                        </div>
                      </div>
                    )}

                    {googleAuthUser && (
                      <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-emerald-800 uppercase block">
                            Google Account Linked
                          </span>
                          <span className="text-xs font-semibold text-emerald-950 font-mono block">
                            {signupEmail}
                          </span>
                        </div>
                        <span className="p-1 bg-emerald-600 text-white rounded-full">
                          <Check size={11} strokeWidth={3} />
                        </span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="label">First Name / Pseudonym</label>
                      <input
                        type="text"
                        required
                        placeholder="Pricilla"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="field text-xs"
                      />
                    </div>

                    {!googleAuthUser && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="label">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="pricilla@gmail.com"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            className="field text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="label">Password</label>
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            className="field text-xs"
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-3">
                      <button
                        type="button"
                        disabled={
                          !signupName.trim() ||
                          (!googleAuthUser &&
                            (!signupEmail.trim() || !signupPassword.trim()))
                        }
                        onClick={() => setSignUpStep(2)}
                        className="btn btn-primary w-full"
                      >
                        <span>Continue</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {authMode === "signup" && signUpStep === 2 && (
                  <div className="space-y-6 w-full">
                    <div className="space-y-3">
                      <label className="label text-[#7C2D3E]">
                        1. Where are you based?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          {
                            name: "Nigeria",
                            flag: "🇳🇬",
                            bgImage:
                              "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=320&q=80",
                          },
                          {
                            name: "India",
                            flag: "🇮🇳",
                            bgImage:
                              "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=320&q=80",
                          },
                          {
                            name: "Mexico",
                            flag: "🇲🇽",
                            bgImage:
                              "https://images.unsplash.com/photo-1512813583145-baaa340ef29f?auto=format&fit=crop&w=320&q=80",
                          },
                          {
                            name: "Other",
                            flag: "🌍",
                            bgImage:
                              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=320&q=80",
                          },
                        ].map((country) => (
                          <button
                            key={country.name}
                            type="button"
                            onClick={() =>
                              setSignupBasedIn(country.name as any)
                            }
                            className={`relative overflow-hidden group py-4 sm:py-5 px-2 rounded-2xl border transition-all cursor-pointer text-center flex flex-col items-center gap-1.5 shadow-sm hover:scale-[1.03] hover:shadow-md ${
                              signupBasedIn === country.name
                                ? "border-[#7C2D3E] bg-[#7C2D3E]/10 ring-2 ring-[#7C2D3E]/30 font-black"
                                : "border-gray-300 text-gray-800 bg-white hover:border-[#7C2D3E]/60"
                            }`}
                          >
                            <div
                              className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 rounded-2xl pointer-events-none"
                              style={{
                                backgroundImage: `url(${country.bgImage})`,
                              }}
                            />
                            <span className="text-2xl sm:text-3xl leading-none relative z-10">
                              {country.flag}
                            </span>
                            <span className="text-[11px] font-extrabold tracking-wide block uppercase relative z-10">
                              {country.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="label text-[#7C2D3E]">
                        2. Your current home situation
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          {
                            val: "Living with parents",
                            emoji: "🏡",
                            desc: "Frequent spontaneous chore assignments",
                          },
                          {
                            val: "Partner",
                            emoji: "💑",
                            desc: "Shared task delegation schedule",
                          },
                          {
                            val: "In-laws",
                            emoji: "👵🏽",
                            desc: "High cultural priority on domestic attendance",
                          },
                          {
                            val: "Siblings",
                            emoji: "👧🏻👦🏽",
                            desc: "Dynamic shared study interruptions",
                          },
                          {
                            val: "Other",
                            emoji: "✨",
                            desc: "Custom environment",
                          },
                        ].map((sit) => (
                          <button
                            key={sit.val}
                            type="button"
                            onClick={() =>
                              setSignupHomeSituation(sit.val as any)
                            }
                            className={`p-4 rounded-2xl text-left border flex items-center gap-3.5 transition-all cursor-pointer shadow-sm hover:scale-[1.01] ${
                              signupHomeSituation === sit.val
                                ? "border-[#7C2D3E] bg-[#7C2D3E]/10 ring-2 ring-[#7C2D3E]/30"
                                : "border-gray-300 bg-white hover:border-[#7C2D3E]/40"
                            }`}
                          >
                            <div
                              className={`text-2xl p-2 rounded-xl flex-shrink-0 ${signupHomeSituation === sit.val ? "bg-[#7C2D3E]/25" : "bg-gray-100 border border-gray-200"}`}
                            >
                              {sit.emoji}
                            </div>
                            <div>
                              <div className="block font-extrabold text-amber-950 text-xs">
                                {sit.val}
                              </div>
                              <span className="text-xs text-[#4A3932] font-semibold leading-normal block mt-0.5">
                                {sit.desc}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setSignUpStep(1)}
                        className="py-3 px-6 rounded-xl text-xs font-extrabold text-gray-800 border-2 border-gray-300 hover:bg-gray-100 bg-white transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setSignUpStep(3)}
                        className="btn btn-primary flex-1"
                      >
                        <span>Next: Set Goal</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {authMode === "signup" && signUpStep === 3 && (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <label className="label text-[#7C2D3E]">
                        Your primary goal
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          {
                            val: "University degree",
                            desc: "Preparing for exams, lectures, and thesis submissions.",
                          },
                          {
                            val: "Career growth",
                            desc: "Learning frameworks, mock interviews, and portfolio building.",
                          },
                          {
                            val: "Starting a business",
                            desc: "Prototyping, finding users, and exploring business models.",
                          },
                        ].map((goalOption) => (
                          <button
                            key={goalOption.val}
                            type="button"
                            onClick={() =>
                              setSignupPrimaryGoal(goalOption.val as any)
                            }
                            className={`p-3.5 rounded-xl text-left border text-xs transition-all cursor-pointer hover:scale-[1.01] ${
                              signupPrimaryGoal === goalOption.val
                                ? "border-[#7C2D3E] bg-[#7C2D3E]/10 ring-2 ring-[#7C2D3E]/30 font-black"
                                : "border-gray-300 bg-white hover:border-[#7C2D3E]/40"
                            }`}
                          >
                            <div className="font-extrabold text-amber-950">
                              {goalOption.val}
                            </div>
                            <span className="text-xs text-[#4A3932] font-semibold leading-normal block mt-1">
                              {goalOption.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-[#FAF7F2] border border-gray-200 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-xs font-extrabold text-[#7C2D3E] uppercase tracking-wide">
                        <span>🎯 Starting target</span>
                        <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          8 sessions / week
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 font-medium leading-normal">
                        We pre-load 8 study-lock slots per week tailored around
                        typical domestic patterns. Adjust anytime in settings.
                      </p>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSignUpStep(2)}
                        className="py-3 px-6 rounded-xl text-xs font-extrabold text-gray-800 border-2 border-gray-300 bg-white hover:bg-gray-100 transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button type="submit" className="btn btn-primary flex-1">
                        <span>Enter My Space 🌟</span>
                      </button>
                    </div>

                    {googleAuthUser && (
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setGoogleAuthUser(null);
                            setSignUpStep(1);
                          }}
                          className="text-xs text-amber-800 hover:underline cursor-pointer"
                        >
                          Disconnect Google account
                        </button>
                      </div>
                    )}
                  </form>
                )}

                {/* SIGN IN */}
                {authMode === "signin" && (
                  <div className="space-y-6 py-4">
                    <div className="space-y-1">
                      <span className="eyebrow text-[#7C2D3E]">
                        Welcome back
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-950 tracking-tight">
                        Sign In
                      </h1>
                      <p className="text-xs text-[#4A3932] font-semibold leading-relaxed max-w-sm">
                        Enter your email and password to access your dashboard.
                      </p>
                    </div>

                    <div className="space-y-3 pb-4 border-b border-orange-100/40">
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={oauthLoading}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 font-bold tracking-wide transition-all shadow-xs cursor-pointer disabled:opacity-55"
                      >
                        {oauthLoading ? (
                          <AnimatedLoader size={24} color="#7C2D3E" />
                        ) : (
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                        )}
                        <span>
                          {oauthLoading
                            ? "Connecting..."
                            : "Sign in with Google"}
                        </span>
                      </button>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-1">
                        <label className="label">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="pricilla@gmail.com"
                          value={signinEmail}
                          onChange={(e) => setSigninEmail(e.target.value)}
                          className="field text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="label">Password</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={signinPassword}
                          onChange={(e) => setSigninPassword(e.target.value)}
                          className="field text-xs"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={
                          oauthLoading ||
                          !signinEmail.trim() ||
                          !signinPassword.trim()
                        }
                        className="btn btn-primary w-full"
                      >
                        {oauthLoading ? (
                          <AnimatedLoader size={24} color="white" />
                        ) : (
                          <Shield size={14} />
                        )}
                        <span>Sign In</span>
                      </button>
                    </form>

                    <div className="text-center pt-2">
                      <p className="text-xs text-gray-400">
                        No account yet?{" "}
                        <button
                          type="button"
                          onClick={() => setAuthMode("signup")}
                          className="text-[#7C2D3E] font-bold hover:underline cursor-pointer"
                        >
                          Create one
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          /* ── MAIN APP DASHBOARD ───────────────────────────── */
          <div className="flex-1 flex flex-col md:flex-row relative">
            {/* Header */}
            <header
              className={`fixed top-0 left-0 w-full z-20 flex justify-between items-center px-4 py-3 border-b transition-all ${themeClassHeader}`}
            >
              <div
                onClick={handleLogoClick}
                className="flex items-center gap-2 cursor-pointer select-none"
                title="Triple-click to toggle stealth mode"
              >
                <div
                  className={`p-1.5 rounded-lg flex items-center justify-center ${stealthActive ? "bg-gray-100 text-gray-400" : ""}`}
                >
                  {stealthActive ? (
                    <Calendar size={18} />
                  ) : (
                    <HeyvinLogo size={24} glowOpacity={0} />
                  )}
                </div>
                <div>
                  <h1
                    className={
                      stealthActive
                        ? "text-sm font-extrabold tracking-wider font-sans text-gray-700"
                        : "text-sm font-semibold tracking-[0.15em] font-serif uppercase text-amber-950"
                    }
                  >
                    {stealthActive ? "StudySync" : "Heyvin AI"}
                  </h1>
                  <p className="eyebrow mt-0.5">
                    {stealthActive
                      ? "v4.1.2 Academic Planner"
                      : "Your private focus companion"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <AnimatedThemeToggle
                  isDark={theme === "dark"}
                  onToggle={toggleTheme}
                  className="hidden sm:inline-flex"
                />

                <MagneticButton
                  onClick={handleSignOut}
                  className={`btn btn-ghost px-3 py-2 text-xs border ${
                    theme === "dark"
                      ? "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                      : stealthActive
                        ? "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                        : "bg-orange-50 text-amber-900 border-orange-100 hover:bg-orange-100"
                  }`}
                >
                  <LogOut size={13} className="rotate-180" />
                  <span className="hidden sm:inline">Sign Out</span>
                </MagneticButton>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-1 text-gray-400 hover:text-gray-600"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </header>

            {/* Desktop sidebar */}
            <aside
              className={`hidden md:flex flex-col justify-between w-60 pt-20 pb-4 px-4 sticky top-0 min-h-screen h-[100vh] flex-shrink-0 z-10 transition-all ${themeClassSidebar}`}
            >
              <nav className="space-y-1 flex-1 mt-4 overflow-y-auto pr-1">
                {[
                  {
                    id: "today",
                    icon: Calendar,
                    label: "Today",
                    stealth: "Planner",
                  },
                  {
                    id: "tasks",
                    icon: Check,
                    label: "Tasks",
                    stealth: "To-Do",
                  },
                  {
                    id: "rehearse",
                    icon: Brain,
                    label: "Rehearse",
                    stealth: "Conversations",
                  },
                  { id: "calm", icon: Heart, label: "Calm", stealth: "Rest" },
                  {
                    id: "score",
                    icon: Crown,
                    label: "Score",
                    stealth: "Grades",
                  },
                  {
                    id: "journal",
                    icon: BookText,
                    label: "Journal",
                    stealth: "Chronicle",
                  },
                  {
                    id: "heatmap",
                    icon: MapIcon,
                    label: "Friction Map",
                    stealth: "Metrics Map",
                  },
                  {
                    id: "focus",
                    icon: Lock,
                    label: "Focus Lock",
                    stealth: "Task Shield",
                  },
                  {
                    id: "checkin",
                    icon: Smartphone,
                    label: "Daily Log",
                    stealth: "Metrics Log",
                  },
                  {
                    id: "circles",
                    icon: Users,
                    label: "Circles",
                    stealth: "Peer Group",
                  },
                  {
                    id: "predict",
                    icon: Compass,
                    label: "Predict",
                    stealth: "Timeline",
                  },
                  {
                    id: "report",
                    icon: FileText,
                    label: "Weekly Report",
                    stealth: "Syllabus Audit",
                  },
                  {
                    id: "hotline",
                    icon: MessageSquare,
                    label: "Sister Hotline",
                    stealth: "Support Desk",
                  },
                  {
                    id: "settings",
                    icon: Settings,
                    label: "Settings",
                    stealth: "Configuration",
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`nav-item ${active ? "nav-item--active" : ""} ${stealthActive ? "stealth" : ""}`}
                    >
                      <Icon size={15} />
                      <span>{stealthActive ? tab.stealth : tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="space-y-1 pt-4 border-t border-gray-100">
                <MagneticButton
                  onClick={handleLoadDemoData}
                  className="nav-item text-[var(--color-text-muted)] hover:text-amber-800 w-full"
                >
                  <Database size={15} />
                  <span>Load Demo Data</span>
                </MagneticButton>
                <a
                  href="https://youtube.com/@heyvinaiteam?si=lI8AsHrtGB1Ow9WS"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="nav-item"
                  id="sidebar_youtube_contact"
                >
                  <Youtube
                    size={15}
                    className={stealthActive ? "text-gray-400" : "text-red-500"}
                  />
                  <span>
                    {stealthActive ? "Video Resources" : "Contact Us"}
                  </span>
                </a>
                <button onClick={handleSignOut} className="nav-item">
                  <LogOut size={15} />
                  <span>Log Out</span>
                </button>
                {!stealthActive && (
                  <div
                    onClick={() => setStealthActive(true)}
                    className="flex items-center gap-2 px-3 py-1 cursor-pointer select-none group"
                  >
                    <Lock
                      size={12}
                      className="text-gray-300 group-hover:text-amber-500 animate-pulse"
                    />
                    <span className="eyebrow text-gray-300 group-hover:text-amber-500">
                      STEALTH ON
                    </span>
                  </div>
                )}
              </div>
            </aside>

            {/* Mobile menu overlay */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`fixed inset-0 z-30 pt-16 px-6 flex flex-col md:hidden w-64 border-r justify-between pb-6 shadow-2xl ${themeClassSidebar}`}
                >
                  <nav className="space-y-1 py-4 overflow-y-auto max-h-[70vh]">
                    {[
                      {
                        id: "today",
                        icon: Calendar,
                        label: "Today",
                        stealth: "Planner",
                      },
                      {
                        id: "tasks",
                        icon: Check,
                        label: "Tasks",
                        stealth: "To-Do",
                      },
                      {
                        id: "rehearse",
                        icon: Brain,
                        label: "Rehearse",
                        stealth: "Notes",
                      },
                      {
                        id: "calm",
                        icon: Heart,
                        label: "Calm",
                        stealth: "Break",
                      },
                      {
                        id: "score",
                        icon: Crown,
                        label: "Score",
                        stealth: "Grades",
                      },
                      {
                        id: "journal",
                        icon: BookText,
                        label: "Journal",
                        stealth: "Chronicle",
                      },
                      {
                        id: "heatmap",
                        icon: MapIcon,
                        label: "Friction Map",
                        stealth: "Metrics Map",
                      },
                      {
                        id: "focus",
                        icon: Lock,
                        label: "Focus Lock",
                        stealth: "Task Shield",
                      },
                      {
                        id: "checkin",
                        icon: Smartphone,
                        label: "Daily Log",
                        stealth: "Log",
                      },
                      {
                        id: "circles",
                        icon: Users,
                        label: "Circles",
                        stealth: "Peer Group",
                      },
                      {
                        id: "predict",
                        icon: Compass,
                        label: "Predict",
                        stealth: "Timeline",
                      },
                      {
                        id: "report",
                        icon: FileText,
                        label: "Weekly Report",
                        stealth: "Syllabus Audit",
                      },
                      {
                        id: "hotline",
                        icon: MessageSquare,
                        label: "Sister Hotline",
                        stealth: "Support Desk",
                      },
                      {
                        id: "settings",
                        icon: Settings,
                        label: "Settings",
                        stealth: "Configuration",
                      },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const active = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`nav-item ${active ? "nav-item--active" : ""}`}
                        >
                          <Icon size={15} />
                          <span>{stealthActive ? tab.stealth : tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>

                  <div className="space-y-1">
                    <button onClick={handleLoadDemoData} className="nav-item">
                      <Database size={15} />
                      <span>Load Demo Data</span>
                    </button>
                    <a
                      href="https://youtube.com/@heyvinaiteam?si=lI8AsHrtGB1Ow9WS"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="nav-item"
                      id="mobile_youtube_contact"
                    >
                      <Youtube
                        size={15}
                        className={
                          stealthActive ? "text-gray-400" : "text-red-500"
                        }
                      />
                      <span>
                        {stealthActive ? "Video Resources" : "Contact Us"}
                      </span>
                    </a>
                    <button onClick={handleSignOut} className="nav-item">
                      <LogOut size={15} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main content */}
            <main className="flex-1 min-h-screen pt-20 px-4 sm:px-8 pb-20 md:pb-8 overflow-y-auto">
              {/* TODAY */}
              {activeTab === "today" && currentUser && (
                <div
                  id="today_dashboard"
                  className="space-y-6 max-w-4xl mx-auto"
                >
                  {/* Greeting */}
                  <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#EDE8E0] pb-4 gap-4"
                  >
                    <div>
                      <h2 className="section-title text-2xl sm:text-3xl">
                        Good Day, {currentUser.username}
                      </h2>
                      <p className="section-subtitle">
                        {stealthActive
                          ? "Your daily overview."
                          : "Here's where you stand today."}
                      </p>
                    </div>
                    <MagneticButton
                      onClick={() => setActiveTab("focus")}
                      className={`btn btn-primary ${stealthActive ? "stealth" : ""}`}
                    >
                      <span>🔒 Lock In Focus</span>
                    </MagneticButton>
                  </motion.div>

                  {/* Morning briefing */}
                  <motion.div
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <MorningBriefingCard
                      userId={currentUser.uid}
                      stealthActive={stealthActive}
                      pendingTasksCount={
                        tasks.filter((t) => !t.completed).length
                      }
                      lastSovereigntyScore={
                        db.calculateSovereigntyScore(currentUser.uid).score
                      }
                      predictedSafeWindow="5:00 AM — 8:00 AM"
                      lastJournalMood={(() => {
                        const jrnl = db.get<any>(
                          currentUser.uid,
                          "journal_entries",
                        );
                        if (jrnl && jrnl.length > 0) {
                          const sorted = [...jrnl].sort((a, b) =>
                            b.created_at.localeCompare(a.created_at),
                          );
                          return sorted[0].mood;
                        }
                        return "Okay";
                      })()}
                    />
                  </motion.div>

                  {/* Affirmation */}
                  {!todayAffirmationDismissed && (
                    <motion.div
                      custom={2}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      className={`p-5 rounded-xl border border-[#EDE8E0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-l-4 ${stealthActive ? "border-l-blue-600" : "border-l-[#7C2D3E]"}`}
                    >
                      <div className="flex gap-3">
                        <Sparkles
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${stealthActive ? "text-blue-600" : "text-[#7C2D3E]"}`}
                        />
                        <blockquote className="text-sm text-[#1A1414] font-serif italic leading-relaxed">
                          "{getAffirmation()}"
                        </blockquote>
                      </div>
                      <button
                        onClick={handleDismissTodayAff}
                        className="text-xs font-bold text-gray-400 hover:text-gray-600 whitespace-nowrap cursor-pointer hover:underline uppercase tracking-wide"
                      >
                        Noted
                      </button>
                    </motion.div>
                  )}

                  {/* Score + Hours grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Score card */}
                    <motion.div
                      custom={3}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      onClick={() => setActiveTab("score")}
                      className="bg-white border border-[#EDE8E0] rounded-xl p-6 shadow-xs cursor-pointer hover:border-[#7C2D3E]/30 transition-all text-center space-y-4"
                    >
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="label text-[#7A6860]">
                          {stealthActive ? "DEGREE READINESS" : "YOUR SCORE"}
                        </span>
                        <Crown
                          size={14}
                          className={
                            stealthActive ? "text-blue-600" : "text-[#C9983A]"
                          }
                        />
                      </div>
                      <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                          <circle
                            cx="72"
                            cy="72"
                            r="62"
                            stroke="#FAF7F2"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <circle
                            cx="72"
                            cy="72"
                            r="62"
                            stroke={stealthActive ? "#2563EB" : "#7C2D3E"}
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 62}
                            strokeDashoffset={
                              2 *
                              Math.PI *
                              62 *
                              (1 -
                                db.calculateSovereigntyScore(currentUser.uid)
                                  .score /
                                  100)
                            }
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="text-center">
                          <span className="text-[48px] font-serif font-bold text-[#C9983A] leading-none block">
                            {
                              db.calculateSovereigntyScore(currentUser.uid)
                                .score
                            }
                          </span>
                          <span className="label block mt-1">Score</span>
                        </div>
                      </div>
                      <span className="text-xs font-serif font-bold text-[#7C2D3E] block">
                        {stealthActive ? "On track" : "Holding ground"}
                      </span>
                    </motion.div>

                    {/* Hours reclaimed card */}
                    <motion.div
                      custom={4}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      onClick={() => setActiveTab("checkin")}
                      className="bg-white border border-[#EDE8E0] rounded-xl p-6 shadow-xs cursor-pointer hover:border-gray-300 transition-all flex flex-col justify-between min-h-[220px]"
                    >
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="label text-[#7A6860]">
                          {stealthActive
                            ? "STUDY TIME SAVED"
                            : "HOURS RECLAIMED"}
                        </span>
                        <Smartphone
                          size={14}
                          className={
                            stealthActive ? "text-blue-600" : "text-[#7C2D3E]"
                          }
                        />
                      </div>
                      <div className="py-6 text-center">
                        <div className="font-serif text-5xl font-extrabold text-[#1A1414] leading-none">
                          15.2{" "}
                          <span className="text-sm font-sans font-extrabold text-[#7A6860] tracking-widest uppercase">
                            hrs
                          </span>
                        </div>
                        <p className="text-[11px] font-sans text-[#7A6860] mt-2 leading-relaxed">
                          Protected from interruptions this week.
                        </p>
                      </div>
                      <div className="text-center border-t border-gray-100 pt-3">
                        <span className="text-xs uppercase font-extrabold text-[#7C2D3E] hover:underline cursor-pointer">
                          Log your day →
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Heatmap + Safe windows grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mini heatmap */}
                    <motion.div
                      custom={5}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      onClick={() => setActiveTab("heatmap")}
                      className="bg-white border border-[#EDE8E0] rounded-xl p-5 shadow-xs cursor-pointer hover:border-[#7C2D3E]/20 transition-all space-y-4"
                    >
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="label text-[#7A6860]">
                          {stealthActive
                            ? "ACTIVITY CHART"
                            : "FRICTION HEATMAP"}
                        </span>
                        <span className="badge badge-neutral">
                          Last 28 days
                        </span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 max-w-[210px] mx-auto p-1.5 bg-[#FAF7F2] rounded-lg">
                        {Array.from({ length: 28 }).map((_, i) => {
                          const intensity = [
                            3, 1, 0, 4, 2, 0, 1, 3, 2, 4, 1, 0, 2, 3, 0, 1, 4,
                            2, 3, 1, 0, 2, 0, 1, 3, 4, 2, 1,
                          ][i];
                          let bg = "bg-gray-100";
                          if (intensity === 1)
                            bg = stealthActive
                              ? "bg-blue-100"
                              : "bg-[#7C2D3E]/20";
                          else if (intensity === 2)
                            bg = stealthActive
                              ? "bg-blue-300"
                              : "bg-[#7C2D3E]/45";
                          else if (intensity === 3)
                            bg = stealthActive
                              ? "bg-blue-500"
                              : "bg-[#7C2D3E]/70";
                          else if (intensity === 4)
                            bg = stealthActive ? "bg-blue-700" : "bg-[#7C2D3E]";
                          return (
                            <div
                              key={i}
                              className={`w-3.5 h-3.5 rounded-sm ${bg} transition-all`}
                            />
                          );
                        })}
                      </div>
                      <p className="text-[11px] font-sans text-center text-gray-500">
                        Weekend mornings show the highest friction. See the full
                        map →
                      </p>
                    </motion.div>

                    {/* Safe windows */}
                    <motion.div
                      custom={6}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      className="bg-white border border-[#EDE8E0] rounded-xl p-5 shadow-xs space-y-4"
                    >
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="label text-[#7A6860]">
                          BEST TIMES TODAY
                        </span>
                        <span className="badge badge-green">Optimal</span>
                      </div>
                      <div className="space-y-2.5">
                        <div className="p-3 rounded-lg bg-emerald-50/40 border border-emerald-100 flex items-center justify-between">
                          <div>
                            <strong className="text-xs text-emerald-950 block font-serif">
                              5:00 AM — 8:00 AM
                            </strong>
                            <span className="text-[11px] text-emerald-700 block mt-0.5">
                              Lowest interruption risk
                            </span>
                          </div>
                          <span className="text-xs font-extrabold text-emerald-800 font-mono">
                            100%
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#EDE8E0] flex items-center justify-between">
                          <div>
                            <strong className="text-xs text-gray-800 block font-serif">
                              7:00 PM — 9:00 PM
                            </strong>
                            <span className="text-[11px] text-[#7A6860] block mt-0.5">
                              Moderate — some noise expected
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-[#7A6860] font-mono">
                            60%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Tasks preview */}
                  <motion.div
                    custom={7}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="bg-white border border-[#EDE8E0] rounded-xl p-5 shadow-xs space-y-4"
                  >
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="label text-[#7A6860]">
                        {stealthActive ? "CHECKLIST PREVIEW" : "UP NEXT"}
                      </span>
                      <button
                        onClick={() => setActiveTab("tasks")}
                        className="text-xs uppercase font-bold text-[#7C2D3E] hover:underline cursor-pointer"
                      >
                        View all →
                      </button>
                    </div>

                    {tasks.filter((t) => !t.completed).length === 0 ? (
                      <div className="p-4 text-center text-xs text-gray-400">
                        🎉 All tasks done! Add new ones to keep your momentum.
                      </div>
                    ) : (
                      <div className="space-y-2 overflow-hidden">
                        {tasks
                          .filter((t) => !t.completed)
                          .slice(0, 3)
                          .map((t) => (
                            <div
                              key={t.id}
                              onClick={() => handleToggleTask(t.id)}
                              className="p-3 rounded-xl border border-[#EDE8E0] bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/40 transition-all flex items-center justify-between cursor-pointer group hover:border-[#7C2D3E]/20"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-md border border-gray-200 flex items-center justify-center group-hover:border-[#7C2D3E]">
                                  {t.completed && (
                                    <Check
                                      size={10}
                                      className="text-[#7C2D3E]"
                                    />
                                  )}
                                </div>
                                <span className="text-xs font-medium text-[#1A1414] font-serif leading-normal">
                                  {t.title}
                                </span>
                              </div>
                              <span className="badge badge-neutral capitalize">
                                {t.category}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Tomorrow forecast */}
                  <motion.div
                    custom={8}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    onClick={() => setActiveTab("predict")}
                    className="bg-white border border-[#EDE8E0] rounded-xl p-6 shadow-xs cursor-pointer hover:border-[#7C2D3E]/20 transition-all"
                  >
                    <div className="flex justify-between items-baseline mb-4">
                      <h4 className="label text-[#7A6860]">
                        {stealthActive
                          ? "UPCOMING SCHEDULE"
                          : "TOMORROW'S FORECAST"}
                      </h4>
                      <span className="badge badge-orange">Tomorrow</span>
                    </div>

                    {getLogsCount() < 5 ? (
                      <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                        <Lock size={16} className="text-gray-300 mx-auto" />
                        <p className="text-xs font-bold text-[#1A1414] font-serif">
                          Forecast locked
                        </p>
                        <p className="text-[11px] text-[#7A6860] leading-relaxed max-w-sm">
                          Log 5 check-ins to unlock your personalised forecast.{" "}
                          {getLogsCount()}/5 done.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="h-4 bg-gray-100 rounded-full w-full overflow-hidden flex">
                          {Array.from({ length: 24 }).map((_, i) => {
                            let color = "bg-green-300";
                            if (i >= 17 && i <= 21) color = "bg-red-400";
                            else if (i >= 9 && i <= 12) color = "bg-yellow-300";
                            return (
                              <div
                                key={i}
                                className={`h-full flex-1 border-r border-white/20 ${color}`}
                              />
                            );
                          })}
                        </div>
                        <div className="p-3 rounded-lg border border-green-50 text-green-800 bg-green-50/50 flex gap-2 text-xs">
                          <Check
                            size={14}
                            className="flex-shrink-0 mt-0.5 text-green-600"
                          />
                          <p className="leading-relaxed text-[11px]">
                            Best window tomorrow:{" "}
                            <strong>5:00 AM — 8:00 AM</strong>. Lowest friction
                            predicted during these hours.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* DAILY LOG (check-in) */}
              {activeTab === "checkin" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                  id="checkin_tab"
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <div>
                    <h2
                      className={`text-2xl font-bold tracking-tight ${stealthActive ? "font-sans text-gray-900" : "font-serif text-amber-900"}`}
                    >
                      Daily Check-In
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {stealthActive
                        ? "Record your study output and any schedule changes."
                        : "Record what interrupted your focus and how much time you protected."}
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmitCheckin}
                    className="space-y-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm font-sans"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-bold uppercase tracking-wider">
                          Stress level
                        </span>
                        <span
                          className={`font-mono font-bold ${stressLevel > 70 ? "text-rose-500" : "text-gray-700"}`}
                        >
                          {stressLevel}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={stressLevel}
                        onChange={(e) => setStressLevel(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#E28E75]"
                      />
                      <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                        <span>Calm</span>
                        <span>Stable</span>
                        <span className="text-rose-400 font-bold">
                          Overwhelmed
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="label">What interrupted you?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Heavy family chores",
                          "Loud street noise/Gen",
                          "Relatives unexpected stay",
                          "Power and tech cutoffs",
                          "Kitchen duty overstep",
                          "Family social pressure",
                        ].map((src) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setFrictionSource(src)}
                            className={`py-2 px-3 text-left rounded-xl text-xs font-sans transition-all border cursor-pointer ${
                              frictionSource === src
                                ? "border-[#E28E75] bg-orange-50/50 text-amber-900 font-medium"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {src}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-bold uppercase tracking-wide">
                          Hours of focus protected
                        </span>
                        <span className="font-mono font-bold text-gray-700">
                          {hoursReclaimed} hrs
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.5"
                        value={hoursReclaimed}
                        onChange={(e) =>
                          setHoursReclaimed(Number(e.target.value))
                        }
                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#E28E75]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="label">
                        {stealthActive
                          ? "Schedule comments"
                          : "What did you protect today?"}
                      </label>
                      <textarea
                        placeholder="What specific boundary did you protect? How did you claim these minutes?"
                        value={journalNotes}
                        onChange={(e) => setJournalNotes(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-orange-100 focus:outline-none h-20 text-gray-700 font-serif resize-none"
                        style={{ fontFamily: stealthActive ? "Inter" : "Lora" }}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-2.5 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer transition-all ${stealthActive ? "bg-blue-600 hover:bg-blue-700" : "bg-amber-900 hover:bg-amber-950"}`}
                    >
                      {stealthActive ? "Log Scheduled Task" : "Save Check-In"}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TASKS */}
              {activeTab === "tasks" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                  id="tasks_tab"
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <div>
                    <h2
                      className={`text-2xl font-bold tracking-tight ${stealthActive ? "font-sans text-gray-900" : "font-serif text-amber-900"}`}
                    >
                      {stealthActive ? "Task Syllabus" : "Your Tasks"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {stealthActive
                        ? "Establish task syllabi and milestone checklists."
                        : "Track your goals across academics, career, and personal boundaries."}
                    </p>
                  </div>

                  <form
                    onSubmit={handleAddTask}
                    className="flex gap-2 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <input
                      type="text"
                      required
                      maxLength={70}
                      placeholder="Lock study block, apply for scholarship..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs border border-gray-100 focus:outline-none rounded-lg focus:ring-1 focus:ring-orange-200"
                    />
                    <select
                      value={newTaskCategory}
                      onChange={(e) =>
                        setNewTaskCategory(e.target.value as any)
                      }
                      className="text-xs bg-gray-50 border border-gray-100 px-2 rounded-lg text-gray-500 focus:outline-none"
                    >
                      <option value="Academics">Academics</option>
                      <option value="Career Prep">Career Prep</option>
                      <option value="Personal Boundaries">Boundaries</option>
                      <option value="Life Admin">Admin</option>
                    </select>
                    <button
                      type="submit"
                      className={`px-3 py-2 rounded-lg text-xs font-bold text-white flex items-center justify-center cursor-pointer ${stealthActive ? "bg-blue-600" : "bg-amber-900"}`}
                    >
                      <Plus size={14} />
                    </button>
                  </form>

                  <div className="space-y-4">
                    {(
                      [
                        "Academics",
                        "Career Prep",
                        "Personal Boundaries",
                        "Life Admin",
                      ] as const
                    ).map((cat) => {
                      const groupTasks = tasks.filter(
                        (t) => t.category === cat,
                      );
                      return (
                        <div key={cat} className="space-y-2">
                          <h4
                            className={`text-xs uppercase font-bold tracking-widest ${stealthActive ? "text-gray-500" : "text-amber-800"}`}
                          >
                            {stealthActive && cat === "Personal Boundaries"
                              ? "My Boundaries"
                              : cat}
                          </h4>
                          {groupTasks.length === 0 ? (
                            <p className="text-xs text-gray-400 italic pl-1">
                              Nothing here yet.
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {groupTasks.map((t) => (
                                <div
                                  key={t.id}
                                  onClick={() => handleToggleTask(t.id)}
                                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                    t.completed
                                      ? "bg-gray-50/50 border-gray-100 opacity-60 line-through text-gray-400"
                                      : "bg-white border-gray-100 hover:shadow-xs"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                                        t.completed
                                          ? stealthActive
                                            ? "bg-blue-600 border-blue-600"
                                            : "bg-[#E28E75] border-[#E28E75]"
                                          : "border-gray-200"
                                      }`}
                                    >
                                      {t.completed && (
                                        <Check
                                          size={10}
                                          className="text-white"
                                        />
                                      )}
                                    </div>
                                    <span className="text-xs text-gray-700 leading-normal">
                                      {t.title}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* REHEARSE */}
              {activeTab === "rehearse" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  <RehearsePlayground
                    user={currentUser}
                    stealthActive={stealthActive}
                    onSessionComplete={handleRehearseCallback}
                  />
                </motion.div>
              )}

              {/* CALM */}
              {activeTab === "calm" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                  id="calm_section"
                  className="space-y-6 max-w-5xl mx-auto"
                >
                  <div className="border-b border-[#EDE8E0] pb-4">
                    <h2
                      className={`text-2xl font-bold tracking-tight ${stealthActive ? "font-sans text-gray-900" : "font-serif text-amber-900"}`}
                    >
                      {stealthActive ? "Academic Calm Zone" : "Calm & Breathe"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {stealthActive
                        ? "Self-regulated breathing breaks and pacing timers."
                        : "A quiet space to decompress, regulate your breath, and reset."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                      <div className="p-8 bg-white border border-[#EDE8E0] shadow-xs rounded-xl flex flex-col items-center justify-center min-h-[320px] text-center space-y-6">
                        <span className="label">Breathe with this</span>

                        <div className="relative w-40 h-40 flex items-center justify-center">
                          <div
                            className={`absolute inset-0 rounded-full flex items-center justify-center border transition-all duration-1000 ${
                              breathPhase === "idle"
                                ? "bg-gray-100 border-gray-200 scale-90"
                                : breathPhase === "inhale"
                                  ? "bg-green-100 border-green-300 scale-110 animate-pulse"
                                  : breathPhase === "hold"
                                    ? "bg-yellow-50 border-yellow-300 scale-110"
                                    : "bg-[#fedbd0] border-[#E28E75] scale-95"
                            }`}
                          >
                            <div className="text-center">
                              <span className="text-3xl font-extrabold text-gray-800 tracking-tight block">
                                {breathPhase === "idle" ? "—" : breathTimer}
                              </span>
                              <span className="label mt-1 block">
                                {breathPhase === "idle" ? "READY" : breathPhase}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 max-w-xs">
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {breathPhase === "idle" &&
                              "4s inhale, 7s hold, 8s exhale. Press start when ready."}
                            {breathPhase === "inhale" &&
                              "Breathe in deeply through your nose."}
                            {breathPhase === "hold" &&
                              "Hold quietly. Stay still."}
                            {breathPhase === "exhale" &&
                              "Exhale slowly through slightly parted lips."}
                          </p>
                          {breathPhase === "idle" ? (
                            <button
                              onClick={startBreathing}
                              className={`px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-sm cursor-pointer transition-all ${stealthActive ? "bg-blue-600" : "bg-[#7C2D3E] hover:bg-[#60202e]"}`}
                            >
                              Start breathing
                            </button>
                          ) : (
                            <button
                              onClick={stopBreathing}
                              className="px-6 py-2.5 rounded-full text-xs font-bold text-gray-400 bg-gray-50 border hover:bg-gray-100 cursor-pointer transition-all"
                            >
                              Stop
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-orange-50/20 border border-orange-100/40 rounded-xl text-xs text-gray-600 font-serif italic text-center leading-relaxed">
                        "{getAffirmation()}"
                      </div>
                    </div>

                    <div className="lg:col-span-12 xl:col-span-7">
                      {currentUser && (
                        <TherapeuticCopingSuite
                          userId={currentUser.uid}
                          stealthActive={stealthActive}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SCORE */}
              {activeTab === "score" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  <SovereigntyScoreView
                    userId={currentUser.uid}
                    stealthActive={stealthActive}
                  />
                </motion.div>
              )}

              {/* REPORT */}
              {activeTab === "report" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  {isPremiumUnlocked ? (
                    <WeeklyReportView
                      user={currentUser}
                      stealthActive={stealthActive}
                    />
                  ) : (
                    <PremiumUnlockScreen
                      onUnlock={handleUnlockPremium}
                      featureName="Weekly Report"
                    />
                  )}
                </motion.div>
              )}

              {/* CIRCLES */}
              {activeTab === "circles" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  {isPremiumUnlocked ? (
                    <SafeCirclesView
                      user={currentUser}
                      stealthActive={stealthActive}
                    />
                  ) : (
                    <PremiumUnlockScreen
                      onUnlock={handleUnlockPremium}
                      featureName="Safe Circles"
                    />
                  )}
                </motion.div>
              )}

              {/* PREDICT */}
              {activeTab === "predict" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  {isPremiumUnlocked ? (
                    <PatternPredictionView
                      user={currentUser}
                      stealthActive={stealthActive}
                    />
                  ) : (
                    <PremiumUnlockScreen
                      onUnlock={handleUnlockPremium}
                      featureName="Pattern Predictions"
                    />
                  )}
                </motion.div>
              )}

              {/* JOURNAL */}
              {activeTab === "journal" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  {isPremiumUnlocked ? (
                    <HeyvinJournalView
                      userId={currentUser.uid}
                      stealthActive={stealthActive}
                    />
                  ) : (
                    <PremiumUnlockScreen
                      onUnlock={handleUnlockPremium}
                      featureName="Private Journal"
                    />
                  )}
                </motion.div>
              )}

              {/* HEATMAP */}
              {activeTab === "heatmap" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  {isPremiumUnlocked ? (
                    <FrictionHeatmapView
                      userId={currentUser.uid}
                      stealthActive={stealthActive}
                    />
                  ) : (
                    <PremiumUnlockScreen
                      onUnlock={handleUnlockPremium}
                      featureName="Friction Heatmap"
                    />
                  )}
                </motion.div>
              )}

              {/* FOCUS */}
              {activeTab === "focus" && (
                <FocusLockView
                  userId={currentUser.uid}
                  stealthActive={stealthActive}
                  onExit={() => setActiveTab("today")}
                  onSignOut={handleSignOut}
                />
              )}

              {/* HOTLINE */}
              {activeTab === "hotline" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  {isPremiumUnlocked ? (
                    <SovereignHotlineView
                      user={currentUser}
                      stealthActive={stealthActive}
                    />
                  ) : (
                    <PremiumUnlockScreen
                      onUnlock={handleUnlockPremium}
                      featureName="Sister Hotline"
                    />
                  )}
                </motion.div>
              )}

              {/* SETTINGS */}
              {activeTab === "settings" && currentUser && (
                <SovereignSettingsView
                  user={currentUser}
                  onUpdateUser={(updated) => {
                    setCurrentUser(updated);
                    db.updateUserProfile(updated);
                  }}
                  stealthActive={stealthActive}
                />
              )}
            </main>

            {/* Mobile bottom nav */}
            <footer
              className={`fixed bottom-0 left-0 w-full p-2 z-20 md:hidden flex justify-around items-center border-t backdrop-blur-md bg-white/95 ${stealthActive ? "border-gray-200" : "border-[#EDE8E0]"}`}
            >
              {[
                {
                  id: "today",
                  icon: Calendar,
                  label: "Today",
                  stealth: "Planner",
                },
                { id: "tasks", icon: Check, label: "Tasks", stealth: "To-Do" },
                {
                  id: "rehearse",
                  icon: Brain,
                  label: "Rehearse",
                  stealth: "Notes",
                },
                { id: "calm", icon: Heart, label: "Calm", stealth: "Break" },
                { id: "score", icon: Crown, label: "Score", stealth: "Grades" },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                let activeStyle = active
                  ? "text-[#7C2D3E] font-bold"
                  : "text-[#9D8C82] hover:text-[#1A1414]";
                if (stealthActive)
                  activeStyle = active
                    ? "text-blue-600 font-bold"
                    : "text-gray-400 hover:text-gray-600";
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center py-1 px-2 cursor-pointer transition-all rounded-lg ${activeStyle}`}
                  >
                    <Icon size={19} />
                    <span className="text-[11px] font-semibold tracking-wide mt-0.5">
                      {stealthActive ? tab.stealth : tab.label}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex flex-col items-center justify-center py-1 px-2 text-[#9D8C82] hover:text-[#1A1414] rounded-lg transition-all cursor-pointer"
              >
                <Menu size={19} />
                <span className="text-[11px] font-semibold tracking-wide mt-0.5">
                  More
                </span>
              </button>
            </footer>
          </div>
        )}
      </div>
    </>
  );
}
