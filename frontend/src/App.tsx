import { Routes, Route } from '@solidjs/router';
import type { Component } from 'solid-js';

import ClientPage from './pages/ClientPage/ClientPage';
import ManagerPage from './pages/ManagerPage/ManagerPage';
import TechManagerPage from './pages/TechManagerPage/TechManagerPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';


const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={WelcomePage} />
      <Route path="/client" component={ClientPage} />
      <Route path="/manager" component={ManagerPage} />
      <Route path="/techmanager" component={TechManagerPage} />
    </Routes>
  );
};

export default App;
