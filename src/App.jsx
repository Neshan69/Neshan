import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import ShaderBackground from "./components/ShaderBackground";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import LoadingFallback from "./components/LoadingFallback";
import SEO from "./components/SEO";
import { useAuth } from "./contexts/AuthContext";
import AuthModal from "./features/auth/AuthModal";
import AdminLayout from "./features/admin/AdminLayout";

const Expertise = lazy(() => import("./sections/Expertise"));
const Work = lazy(() => import("./sections/Work"));
const Home = lazy(() => import("./sections/Home"));
const About = lazy(() => import("./sections/About"));
const Contact = lazy(() => import("./sections/Contact"));
const Profile = lazy(() => import("./sections/Profile"));
const Chat = lazy(() => import("./sections/Chat"));

const AdminDashboard = lazy(() => import("./features/admin/pages/Dashboard"));
const AdminUsers = lazy(() => import("./features/admin/pages/Users"));
const AdminMessages = lazy(() => import("./features/admin/pages/Messages"));
const AdminSettings = lazy(() => import("./features/admin/pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

function AdminRoute({ routeKey, Page }) {
  return (
    <>
      <SEO routeKey={routeKey} />
      <Suspense fallback={<LoadingFallback />}>
        <Page />
      </Suspense>
    </>
  );
}

const SECTIONS = [
  { id: "expertise", label: "EXPERTISE" },
  { id: "work", label: "WORK" },
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(2);
  const indexRef = useRef(2);
  const [view, setView] = useState("portfolio");
  const pendingIndexRef = useRef(null);
  const lastIndexRef = useRef(2);
  const animatingRef = useRef(false);
  const touchXRef = useRef(null);
  const touchYRef = useRef(null);
  const { user, loading } = useAuth();

  const TRANSITION_MS = 640;

  // Slide to a section one page at a time. `animatingRef` locks input during
  // the transition so a single gesture can't skip multiple pages.
  const goTo = useCallback((index, smooth = true) => {
    const clamped = Math.min(Math.max(index, 0), SECTIONS.length - 1);
    if (clamped === indexRef.current) return;
    indexRef.current = clamped;
    setActiveIndex(clamped);
    if (smooth) {
      animatingRef.current = true;
      window.setTimeout(() => {
        animatingRef.current = false;
      }, TRANSITION_MS);
    }
  }, []);

  // When returning from chat/profile, land on the section we left from.
  useEffect(() => {
    if (view !== "portfolio") return;
    const target = pendingIndexRef.current ?? lastIndexRef.current ?? 2;
    pendingIndexRef.current = null;
    if (target !== indexRef.current) {
      indexRef.current = target;
      setActiveIndex(target);
    }
  }, [view]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target?.tagName || "").toLowerCase();
      const isEditable =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        e.target?.isContentEditable;
      if (isEditable || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight" && indexRef.current < SECTIONS.length - 1) {
        goTo(indexRef.current + 1);
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && indexRef.current > 0) {
        goTo(indexRef.current - 1);
        e.preventDefault();
      } else if (e.key === "Home") {
        goTo(0);
        e.preventDefault();
      } else if (e.key === "End") {
        goTo(SECTIONS.length - 1);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  // Wheel: advance exactly one page per gesture (desktop / fine pointers only).
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (view !== "portfolio") return;

    const onWheel = (e) => {
      const tag = (e.target?.tagName || "").toLowerCase();
      const isEditable =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        e.target?.isContentEditable;
      if (isEditable) return;
      const verticalIntent = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      const delta = verticalIntent ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 8) return;
      e.preventDefault();
      if (animatingRef.current) return;
      const dir = delta > 0 ? 1 : -1;
      const current = indexRef.current;
      const next = Math.min(Math.max(current + dir, 0), SECTIONS.length - 1);
      if (next !== current) goTo(next, true);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [view, goTo]);

  // Touch: swipe one page at a time (coarse pointers / mobile).
  const onTouchStart = useCallback((e) => {
    touchXRef.current = e.touches[0].clientX;
    touchYRef.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e) => {
    const startX = touchXRef.current;
    const startY = touchYRef.current;
    touchXRef.current = null;
    touchYRef.current = null;
    if (startX == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    // Ignore mostly-vertical gestures so inner vertical content still works.
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (animatingRef.current) return;
    const dir = dx < 0 ? 1 : -1;
    const current = indexRef.current;
    const next = Math.min(Math.max(current + dir, 0), SECTIONS.length - 1);
    if (next !== current) goTo(next, true);
  }, [goTo]);

  const switchView = useCallback((nextView, index) => {
    if (nextView !== "portfolio") {
      lastIndexRef.current = indexRef.current;
    }
    if (nextView === "portfolio") {
      pendingIndexRef.current = index ?? lastIndexRef.current ?? 2;
    }
    setView(nextView);
  }, []);

  const openChat = useCallback(() => switchView("chat", null), [switchView]);
  const closeChat = useCallback(() => switchView("portfolio", null), [switchView]);
  const openProfile = useCallback(() => switchView("profile", null), [switchView]);
  const closeProfile = useCallback(() => switchView("portfolio", null), [switchView]);
  const goToSection = useCallback((i) => switchView("portfolio", i), [switchView]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface">
        <LoadingFallback />
      </div>
    );
  }

  return (
    <>
      <ShaderBackground />
      <SEO routeKey="home" />
      <Header onContact={openChat} />

      <AnimatePresence mode="wait">
        {view === "chat" && !user ? (
          <motion.div
            key="auth-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <AuthModal onClose={closeChat} />
          </motion.div>
        ) : view === "chat" && user ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Chat onBack={closeChat} onExit={goToSection} />
            </Suspense>
          </motion.div>
        ) : view === "profile" ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Profile onBack={closeProfile} />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <main
              id="main"
              className="horizontal-scroller z-10 relative"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="horizontal-track"
                style={{ transform: `translateX(-${activeIndex * 100}vw)` }}
              >
                <Suspense fallback={<LoadingFallback />}>
                  <Expertise active={activeIndex === 0} />
                  <Work active={activeIndex === 1} />
                  <Home
                    active={activeIndex === 2}
                    onOpenProfile={openProfile}
                  />
                  <About active={activeIndex === 3} />
                  <Contact active={activeIndex === 4} />
                </Suspense>
              </div>
            </main>
            <NavBar
              sections={SECTIONS}
              activeIndex={activeIndex}
              onNavigate={goTo}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="sr-only">© 2024 Neshan Niroula</footer>
    </>
  );
}

function AppInner() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminRoute routeKey="admin" Page={AdminDashboard} />} />
        <Route path="users" element={<AdminRoute routeKey="adminUsers" Page={AdminUsers} />} />
        <Route path="messages" element={<AdminRoute routeKey="adminMessages" Page={AdminMessages} />} />
        <Route path="settings" element={<AdminRoute routeKey="adminSettings" Page={AdminSettings} />} />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <SEO routeKey="notFound" />
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default function App() {
  return <AppInner />;
}
