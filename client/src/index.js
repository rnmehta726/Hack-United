import React from 'react';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Record from './pages/Record';
import Conversation from './pages/Conversation';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/record" element={<Record />}/>
      <Route path="/conversation" element={<Conversation />}/>
    </Routes>
  </BrowserRouter>,
  rootElement
);
