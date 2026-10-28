import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Redirect, Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import About from "./pages/About";
import ChopShop from "./pages/ChopShop";
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
  ["/fireyoureditor", "/chop-shop"],
  ["/tools", "/chop-shop"],
];

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      >
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/network" component={Network} />
          <Route path="/chop-shop" component={ChopShop} />
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
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
