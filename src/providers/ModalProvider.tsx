import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextType {
  activeModal: string | null;
  payload: any;
  openModal: (name: string, payload?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [payload, setPayload] = useState<any>(null);

  const openModal = (name: string, data?: any) => {
    setPayload(data || null);
    setActiveModal(name);
  };

  const closeModal = () => {
    setActiveModal(null);
    setPayload(null);
  };

  return (
    <ModalContext.Provider
      value={{ activeModal, payload, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
