import { Routes, Route } from '@solidjs/router';
import { Component, onMount } from 'solid-js';
import BuyPage from '../pages/BuyPage/BuyPage';

import ClientPage from '../pages/ClientPage/ClientPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ManagerPage from '../pages/ManagerPage/ManagerPage';
import TechManagerPage from '../pages/TechManagerPage/TechManagerPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
// import { checkLogin } from '../utils/login';


const App: Component = () => {
  // localStorage.setItem("test", "false");
  // onMount(checkLogin)
  // checkLogin()

  return (
    <Routes>
      <Route path="/" component={WelcomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/client" component={ClientPage} />
      {/* <Route path="/manager" component={ManagerPage} /> */}
      {/* <Route path="/techmanager" component={TechManagerPage} /> */}
      <Route path="/flight-info-small/:id" component={BuyPage} />
    </Routes>
  );
};

export default App;