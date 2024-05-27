
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RSAUserLoginTemplate from "./templates/RSAUserLoginTemplate";
import RSALogin from "./pages/RSALogin";
import RSARegister from "./pages/RSARegister";
import RSASignupTemplate from "./templates/RSAUserSignUpTemplate";
import { GlobalNavigate } from "./util/RSAGlobalNavigate";
import SecureCommunicationRSA from "./Component/SecureCommunicationRSA";

function App() {
   

  return (
    <BrowserRouter>
    <GlobalNavigate />
      <Routes>
        <Route path="/login" element={<RSAUserLoginTemplate Component={RSALogin}/>}></Route>
        <Route path="/register" element={<RSASignupTemplate Component={RSARegister}/>}></Route>
        <Route path="/" element={<SecureCommunicationRSA />}></Route>
        <Route path="/home" element={<SecureCommunicationRSA />}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
