import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Start from "./pages/Start";
import Debts from "./pages/Debts";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Customers1 from "./pages/Customers1";
import Debts1 from "./pages/Debts1";
import { useEffect } from "react";
import LoginProvider, { useLogin } from "./context/LoginProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-activity/dist/library.css";
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    //TODO: Update meta titles and descriptions below
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/debts1":
        title = "";
        metaDescription = "";
        break;
      case "/customers":
        title = "";
        metaDescription = "";
        break;
      case "/dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/sign-up":
        title = "";
        metaDescription = "";
        break;
      case "/customers1":
        title = "";
        metaDescription = "";
        break;
      case "/debts":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <LoginProvider>
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/sign-up" element={<SignUp />} />
        
        <Route path="/debts1" element={<Debts />} />

        <Route path="/customers" element={<Customers />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/customers1" element={<Customers1 />} />

        <Route path="/debts" element={<Debts1 />} />
      </Routes>
    </LoginProvider>
  );
}
export default App;
