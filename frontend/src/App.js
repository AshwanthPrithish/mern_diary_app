import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyScripts from "./screens/MyScripts/MyScripts";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CreateEntry from "./screens/CreateAndUpdate/CreateEntry";
import UpdateEntry from "./screens/CreateAndUpdate/UpdateEntry";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

const App = () => {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/signup" element={<RegisterScreen />} exact />
          <Route path="/profile" element={<ProfileScreen />} exact />
          <Route path="/create-entry" element={<CreateEntry />} exact />
          <Route path="/entry/:id" element={<UpdateEntry />} exact />
          <Route path="/myscripts" element={<MyScripts search={search} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
