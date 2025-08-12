import Header from "../components/header.jsx";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background fixed inset-0 z-0"></div>
      <main className="relative z-10 min-h-screen container mx-auto px-4">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10 text-white">
        Made by Nihaal Rathi
      </div>
    </div>
  );
};

export default AppLayout;
