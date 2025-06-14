import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Navbar from "./Components/Navbar";
import Pricing from "./Pages/Pricing"
import Features from "./Pages/Features"
import Start from "./Pages/Start"
import ClientFeedback from "./Pages/ClientFeedback"
import FAQ from "./Pages/FAQ"
import Footer from "./Components/Footer"
import About from "./Components/About"
import HowItWorks from "./Components/HowItWorks"
import Plan from "./Components/Plan"
import Contact from "./Components/Contact"
import SignIn from "./Components/SignIn"
import SignUp from "./Components/SignUp"
import ForgotPassword from "./Components/ForgotPassword"
import TandC from "./Components/TandC"
import PrivacyPolicy from "./Components/PrivacyPolicy"
import UserDashboard from "./Pages/UserDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import UserView from "./Pages/UserView";
import ViewUser from "./Pages/ViewUser";
import Profile from "./Pages/Profile";
import Downline from "./Pages/Downline";
import { Toaster } from "react-hot-toast";
import Payment from "./Pages/Payment";
import Credits from "./Pages/Credits";
import MyTeam from "./Pages/MyTeam";

function App() {
  return (
    <>
    <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/home" element={<UserDashboard />}/>
          <Route path="/admin" element={<AdminDashboard />}/>
          <Route path="/admin/user/:userId/:sponsorId" element={<UserView />}/>
          <Route path="/view-user/:userId" element={<ViewUser />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/downline/direct" element={<Downline type='direct' />}/>
          <Route path="/downline/all" element={<Downline type='all' />}/>
          <Route path="/payment" element={<Payment />}/>
          <Route path="/credits" element={<Credits />}/>
          <Route path="/withdrawals" element={<Credits type="withdrawals" />}/>
          <Route path="/downlines" element={<MyTeam />}/>
          <Route path="/uplines" element={<MyTeam type="uplines" />}/>
          <Route path="navbar" element={<Navbar />}/>
          <Route path="pricing" element={<Pricing />}/>
          <Route path="features" element={<Features />}/>
          <Route path="ClientFeedback" element={<ClientFeedback />}/>
          <Route path="start" element={<Start />}/>
          <Route path="FAQ" element={<FAQ />}/>
          
          <Route path="About" element={<About/>}/>
          <Route path="how-it-works" element={<HowItWorks/>}/>
          <Route path="plan" element={<Plan/>}/>
          <Route path="Contact" element={<Contact/>}/>
          <Route path="sign-in" element={<SignIn/>}/>
          {/* <Route path="sign-up" element={<SignUp/>}/> */}
          <Route path="forgot-pass" element={<ForgotPassword/>}/>
          <Route path="t&c" element={<TandC/>}/>
          <Route path="privacy-policy" element={<PrivacyPolicy/>}/>







          <Route path="/signin" element={<SignIn />}/>
          <Route path="Footer" element={<Footer />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
