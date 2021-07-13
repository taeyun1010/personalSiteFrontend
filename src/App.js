import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import RegistrationForm from "./components/SignUp";

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} />
      <Route path="/signUp" component={RegistrationForm} />
    </div>
  );
};

export default App;
