'use client';
import DriverForm from '@/components/DriverForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function DriverFormPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header avec navigation */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
                <div className="max-width-1400px mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button 
                            onClick={() => router.push('/')}
                            className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                        >
                            <FontAwesomeIcon 
                                icon={faArrowLeft} 
                                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" 
                            />
                            <span className="font-medium">Retour au dashboard</span>
                        </button>
                        
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 text-slate-600">
                                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                                <span className="text-sm font-medium">Gestion des chauffeurs</span>
                            </div>
                            
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-bold">F</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="relative">
                {/* Background decoratif */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl"></div>
                </div>
                
                {/* Formulaire */}
                <div className="relative z-10">
                    <DriverForm />
                </div>
            </main>

            {/* Footer optionnel */}
            <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200 py-6 mt-12">
                <div className="max-width-1400px mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-600">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-orange-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">F</span>
                        </div>
                        <span className="text-sm">FleetFlow © 2025 - Gestion de flotte moderne</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}