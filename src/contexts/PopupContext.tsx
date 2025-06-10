'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

interface PopupContextType {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

// Provide a default value that matches the interface,
// though it will be overridden by the Provider.
// The setShowPopup default is a no-op function.
export const PopupContext = createContext<PopupContextType | undefined>(undefined);
