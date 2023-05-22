import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyScripts from "./screens/MyScripts/MyScripts";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/signup" element={<RegisterScreen />} exact />
          <Route path="/myscripts" element={<MyScripts />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </>
);

export default App;
