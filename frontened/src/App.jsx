// src/App.jsx
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { motion } from "framer-motion";

function Layout() {
  const location = useLocation();
  const { theme } = useTheme();
  const hideLayoutPaths = ["/login", "/register", "/forgot-password"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div 
      className="flex h-screen transition-colors duration-300"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(to bottom right, #111827, #1f2937, #111827)' 
          : '#ffffff'
      }}
    >
      {!hideLayout && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-auto">
        {!hideLayout && <Navbar />}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6"
        >
          <AppRoutes />
        </motion.main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
