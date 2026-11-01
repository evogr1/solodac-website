import { MotionConfig, motion } from "framer-motion";
import { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import About from "./pages/About";
import Katran from "./pages/Katran";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Legal from "./pages/Legal";
import Network from "./pages/Network";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";

// Old URLs from the previous site still live in bios, DMs and decks.
const redirects: Array<[string, string]> = [
  ["/marketing", "/contact"],
  ["/eyeballs", "/contact"],
  ["/youtube", "/services#youtube"],
  ["/clipping", "/services#youtube"],
  ["/studio", "/services"],
  ["/services/:slug", "/services"],
  ["/approach", "/about"],
  ["/careers", "/about#careers"],
  ["/thesis", "/about"],
  ["/stories", "/network"],
  ["/stories/:slug", "/network"],
  ["/events", "/network"],
  ["/campaigns", "/network"],
  ["/case-studies", "/network"],
  ["/testimonials", "/network"],
  ["/portfolio", "/network"],
  ["/fireyoureditor", "/katran"],
  ["/tools", "/katran"],
  ["/chop-shop", "/katran"],
];

const titles: Record<string, string> = {
  "/": "SoloDac | We grow pages, channels and brands",
  "/services": "Services | SoloDac",
  "/network": "Our pages | SoloDac",
  "/katran": "Katran by SoloDac | A full production house",
  "/about": "About | SoloDac",
  "/contact": "Book a call | SoloDac",
  "/privacy": "Privacy policy | SoloDac",
  "/terms": "Terms of service | SoloDac",
  "/refunds": "Refunds and cancellation | SoloDac",
};

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    document.title = titles[location] ?? "Page not found | SoloDac";
  }, [location]);

  // A short fade on the incoming page only. The old page leaves at once, so a click never waits.
  return (
    <motion.div key={location} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Switch location={location}>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/network" component={Network} />
        <Route path="/katran" component={Katran} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy">{() => <Legal doc="privacy" />}</Route>
        <Route path="/terms">{() => <Legal doc="terms" />}</Route>
        <Route path="/refunds">{() => <Legal doc="refunds" />}</Route>
        {redirects.map(([from, to]) => (
          <Route key={from} path={from}>{() => <Redirect to={to} replace />}</Route>
        ))}
        <Route component={NotFound} />
      </Switch>
    </motion.div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      {/* Every Framer animation on the site follows the visitor's reduce-motion setting. */}
      <MotionConfig reducedMotion="user">
        <Router />
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
