"use client";

import FeatureSection from "./components/section/FeatureSection";
import HeroSection from "./components/section/HeroSection";
import FooterSection from "./components/section/FooterSection";
import { useEffect, useState } from "react";
import Modal from "./components/modal/Modal";

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleButtonClick = (id?: string) => {
    if (!id) return;
    setActiveModal(id);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };


  return (
    <main>
      <HeroSection onButtonClick={handleButtonClick} />
      <FeatureSection />
      <FooterSection />
      <Modal activeModal={activeModal} onClose={handleCloseModal} />
    </main>
  );
}