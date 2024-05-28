"use client";

import FirstContent from "./components/homeNoAuth/content/firstContent";
import SectionContent from "./components/homeNoAuth/content/sectionContent";
import HeaderNoAuth from "./components/homeNoAuth/header";

export default function Home() {
  return (
    <main className="bg-slate-800 min-w-full min-h-dvh">
      <HeaderNoAuth />
      <FirstContent />
      {/* <SectionContent /> */}
    </main>
  );
}
