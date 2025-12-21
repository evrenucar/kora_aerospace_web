
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import Pillars from './components/Pillars';
import Research from './components/Research';
import Team from './components/Team';
import TrackRecord from './components/TrackRecord';
import Sponsors from './components/Sponsors';
import GetInvolved from './components/GetInvolved';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ChatButton from './components/ChatButton';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-kora-bg selection:bg-kora-cyan selection:text-kora-bg">
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <Pillars />
        <Research />
        <Team />
        <TrackRecord />
        <Sponsors />
        <GetInvolved />
        <FAQ />
      </main>
      <Footer />
      <ChatButton />
    </div>
  );
};

export default App;
