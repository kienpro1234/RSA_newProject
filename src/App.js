import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SecureCommunicationRSA from "./Component/SecureCommunicationRSA";
import RSAUserLoginTemplate from "./templates/RSAUserLoginTemplate";
import RSALogin from "./pages/RSALogin";
import RSASignupTemplate from "./templates/RSAUserSignUpTemplate";
import RSARegister from "./pages/RSARegister";
import { GlobalNavigate } from "./util/RSAGlobalNavigate";


function App() {
   

  return (
    <BrowserRouter>
    <GlobalNavigate />
      <Routes>
        <Route path="/login" element={<RSAUserLoginTemplate Component={RSALogin}/>}></Route>
        <Route path="/register" element={<RSASignupTemplate Component={RSARegister}/>}></Route>
        <Route path="/" element={<SecureCommunicationRSA />}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
 