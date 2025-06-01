import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Footer from "./components/Footer";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

function App() {
  return (
    <div>
    <Header />

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Artifex</h1>
          <p className="lead">Shop or something.</p>
          <a href="#features" className="btn btn-light mt-3">Explore Features</a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h3>Fast Setup</h3>
              <p>asdasdasdasdas</p>
            </div>
            <div className="col-md-4 mb-4">
              <h3>Smart Design</h3>
              <p>adasdasdasdasd</p>
            </div>
            <div className="col-md-4 mb-4">
              <h3>Collaboration</h3>
              <p>adasdasdasadasasd</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h2>Ready to get started?</h2>
          <a href="#login" className="btn btn-primary mt-3">Login Now</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;