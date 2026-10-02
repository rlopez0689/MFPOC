import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WidgetPage from "./pages/WidgetPage";

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="UserWidget POC home">
          <span className="brand-mark">U</span> UserWidget POC
        </Link>
        <nav aria-label="Main navigation"><Link to="/">Home</Link><Link to="/widget">Widget</Link></nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/widget" element={<WidgetPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer>Proof of concept · React · React Query · styled-components</footer>
    </div>
  );
}
