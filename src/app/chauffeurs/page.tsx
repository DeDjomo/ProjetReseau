'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MenuBar from '@/components/MenuBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faSearch, 
    faFilter,
    faStar,
    faPhone,
    faArrowRight,
    faCar,
    faCheckCircle,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

export default function ChauffeursList() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('tous');

    // Données des chauffeurs (en production, ça viendrait d'une API)
    const chauffeurs = [
        {
            id: '1',
            nom: 'Djomo de Djomo Karlyn',
            telephone: '6 99 94 74 60',
            email: 'karlyn.djomo@exemple.com',
            statut: 'Actif',
            note: 4.2,
            experience: '12 ans',
            vehiculeActuel: 'Toyota Hiace - CM-458-AC',
            coursesTotales: 342,
            derniereCourse: '2025-06-16',
            photo: '/images/photo_chauffeur.png'
        },
        {
            id: '2',
            nom: 'Martin Nguessang',
            telephone: '6 77 88 99 12',
            email: 'martin.nguessang@exemple.com',
            statut: 'Actif',
            note: 3.8,
            experience: '8 ans',
            vehiculeActuel: 'Renault Trafic - LT-920-BC',
            coursesTotales: 189,
            derniereCourse: '2025-06-15',
            photo: '/images/photo_chauffeur.png'
        },
        {
            id: '3',
            nom: 'Claire Fomekong',
            telephone: '6 55 44 33 22',
            email: 'claire.fomekong@exemple.com',
            statut: 'Inactif',
            note: 4.7,
            experience: '15 ans',
            vehiculeActuel: null,
            coursesTotales: 567,
            derniereCourse: '2025-06-10',
            photo: '/images/photo_chauffeur.png'
        },
        {
            id: '4',
            nom: 'Jean Baptiste Mboa',
            telephone: '6 11 22 33 44',
            email: 'jb.mboa@exemple.com',
            statut: 'Actif',
            note: 3.2,
            experience: '5 ans',
            vehiculeActuel: 'Peugeot Boxer - AD-234-ZZ',
            coursesTotales: 98,
            derniereCourse: '2025-06-16',
            photo: '/images/photo_chauffeur.png'
        },
        {
            id: '5',
            nom: 'Aminata Diallo',
            telephone: '6 88 77 66 55',
            email: 'aminata.diallo@exemple.com',
            statut: 'Actif',
            note: 4.9,
            experience: '20 ans',
            vehiculeActuel: 'Mercedes Sprinter - CE-789-XY',
            coursesTotales: 812,
            derniereCourse: '2025-06-16',
            photo: '/images/photo_chauffeur.png'
        }
    ];

    // Filtrage des chauffeurs
    const chauffeursFiltered = chauffeurs.filter(chauffeur => {
        const matchesSearch = chauffeur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             chauffeur.telephone.includes(searchTerm) ||
                             chauffeur.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'tous' || chauffeur.statut.toLowerCase() === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const handleChauffeurClick = (id: string) => {
        router.push(`/chauffeurs/${id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <MenuBar />
            
            <main className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">
                                Liste des Chauffeurs
                            </h1>
                            <p className="text-slate-600">
                                Gérez et consultez les bilans de vos chauffeurs
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="bg-white rounded-lg p-4 shadow-lg border border-slate-200">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{chauffeurs.length}</div>
                                    <div className="text-sm text-slate-600">Total chauffeurs</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-lg border border-slate-200">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {chauffeurs.filter(c => c.statut === 'Actif').length}
                                    </div>
                                    <div className="text-sm text-slate-600">Actifs</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filtres et recherche */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <FontAwesomeIcon 
                                        icon={faSearch} 
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Rechercher par nom, téléphone ou email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                >
                                    <option value="tous">Tous les statuts</option>
                                    <option value="actif">Actifs seulement</option>
                                    <option value="inactif">Inactifs seulement</option>
                                </select>
                                
                                <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                    <FontAwesomeIcon icon={faFilter} />
                                    <span>Filtres</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grille des chauffeurs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chauffeursFiltered.map((chauffeur) => (
                        <div
                            key={chauffeur.id}
                            onClick={() => handleChauffeurClick(chauffeur.id)}
                            className="bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group"
                        >
                            {/* Header avec statut */}
                            <div className="relative">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                                <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold text-lg leading-tight">
                                                    {chauffeur.nom}
                                                </h3>
                                                <p className="text-blue-100 text-sm">{chauffeur.experience}</p>
                                            </div>
                                        </div>
                                        
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            chauffeur.statut === 'Actif' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            <FontAwesomeIcon 
                                                icon={chauffeur.statut === 'Actif' ? faCheckCircle : faTimesCircle} 
                                                className="mr-1"
                                            />
                                            {chauffeur.statut}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contenu */}
                            <div className="p-6">
                                {/* Note et contact */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <FontAwesomeIcon
                                                    key={i}
                                                    icon={faStar}
                                                    className={`text-sm ${
                                                        i <= Math.round(chauffeur.note) 
                                                            ? 'text-orange-500' 
                                                            : 'text-slate-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">
                                            {chauffeur.note}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1 text-slate-600">
                                        <FontAwesomeIcon icon={faPhone} className="text-xs" />
                                        <span className="text-sm">{chauffeur.telephone}</span>
                                    </div>
                                </div>

                                {/* Véhicule actuel */}
                                <div className="mb-4">
                                    {chauffeur.vehiculeActuel ? (
                                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                                            <FontAwesomeIcon icon={faCar} className="text-orange-500" />
                                            <span>{chauffeur.vehiculeActuel}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-50 rounded-lg p-3">
                                            <FontAwesomeIcon icon={faCar} />
                                            <span>Aucun véhicule assigné</span>
                                        </div>
                                    )}
                                </div>

                                {/* Statistiques */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="text-center bg-slate-50 rounded-lg p-3">
                                        <div className="text-lg font-bold text-blue-600">{chauffeur.coursesTotales}</div>
                                        <div className="text-xs text-slate-600">Courses</div>
                                    </div>
                                    <div className="text-center bg-slate-50 rounded-lg p-3">
                                        <div className="text-lg font-bold text-green-600">
                                            {new Date(chauffeur.derniereCourse).toLocaleDateString('fr-FR', { 
                                                day: '2-digit', 
                                                month: '2-digit' 
                                            })}
                                        </div>
                                        <div className="text-xs text-slate-600">Dernière course</div>
                                    </div>
                                </div>

                                {/* Bouton d'action */}
                                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2">
                                    <span>Voir le bilan</span>
                                    <FontAwesomeIcon icon={faArrowRight} className="text-sm group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message si aucun résultat */}
                {chauffeursFiltered.length === 0 && (
                    <div className="text-center py-12">
                        <FontAwesomeIcon icon={faUser} className="text-6xl text-slate-300 mb-4" />
                        <h3 className="text-xl font-medium text-slate-600 mb-2">Aucun chauffeur trouvé</h3>
                        <p className="text-slate-500">Essayez de modifier vos critères de recherche</p>
                    </div>
                )}
            </main>
        </div>
    );
}