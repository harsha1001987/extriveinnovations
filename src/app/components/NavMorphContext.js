"use client";

import { createContext, useContext, useState } from "react";

/**
 * Shares the hero's "reveal complete" signal with the Navbar so the
 * full nav can morph into the hex console once the model reveal finishes
 * (build spec §3.2). Pages without a hero simply never flip `morphed`,
 * so the Navbar stays in its full state there.
 */
const NavMorphContext = createContext({
  morphed: false,
  setMorphed: () => {},
});

export function useNavMorph() {
  return useContext(NavMorphContext);
}

export default function NavMorphProvider({ children }) {
  const [morphed, setMorphed] = useState(false);
  return (
    <NavMorphContext.Provider value={{ morphed, setMorphed }}>
      {children}
    </NavMorphContext.Provider>
  );
}
