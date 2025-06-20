'use client';
import MenuBar from "@/components/MenuBar";
import SideBar from "@/components/SideBar";
import WorldMapWrapper from "@/components/WorldMapWrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <MenuBar />
      <main className="flex gap-4 p-4 min-h-[calc(100vh-80px)]">
        <SideBar />
        <div className="flex-1 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="h-full relative">
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-1">
                  Suivi en temps réel
                </h2>
                <p className="text-sm text-slate-600">
                  14 véhicules actifs • 3 alertes
                </p>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 z-10">
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 text-sm font-medium">
                  Vue satellite
                </button>
                <button className="bg-white/90 hover:bg-white text-slate-700 px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 text-sm font-medium backdrop-blur-sm border border-slate-200">
                  Filtres
                </button>
              </div>
            </div>
            
            <WorldMapWrapper />
          </div>
        </div>
      </main>
    </div>
  );
}