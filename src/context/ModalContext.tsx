'use client';

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isOpen: boolean;
  selectedProgramme: string;
  openModal: (programme?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState('hydroponics');

  const openModal = (programme?: string) => {
    if (programme) {
      setSelectedProgramme(programme);
    }
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <ModalContext.Provider value={{ isOpen, selectedProgramme, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useEnquiryModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within a ModalProvider');
  }
  return context;
};
