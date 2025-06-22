'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MenuBar from '@/components/MenuBar';
import SideBar from '@/components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTruck, 
    faSearch, 
    faFilter,
    faStar,
    faUser,
    faEye,
    faGasPump,
    faRoute,
    faTools,
    faCheckCircle,
    faTimesCircle,
    faExclamationTriangle,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

export default function VehiculesList() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('tous');

    // Données des véhicules
    const vehicules = [
        {
            id: 'v1',
            nom: 'Mercedes SUV',
            marque: 'MERCEDES',
            modele: 'GLE 350',
            immatriculation: 'CE304SD',
            chauffeur: { id: '1', nom: 'NKAMLA CHEDJOU' },
            statut: 'En service',
            carburant: 85,
            kilometrage: '12,750 km',
            vitesseMoyenne: '65 km/h',
            derniereMaintenance: '15/05/2025',
            prochaineMaintenance: '15/08/2025',
            coursesTotales: 156,
            note: 4.3,
            revenus: '12,500 €',
            depenses: '3,200 €',
            profit: '9,300 €'
        },
        {
            id: 'v2',
            nom: 'Toyota Hiace',
            marque: 'TOYOTA',
            modele: 'HIACE',
            immatriculation: 'LT920BC',
            chauffeur: { id: '2', nom: 'JEAN DUPONT' },
            statut: 'En service',
            carburant: 45,
            kilometrage: '45,230 km',
            vitesseMoyenne: '58 km/h',
            derniereMaintenance: '10/06/2025',
            prochaineMaintenance: '10/09/2025',
            coursesTotales: 298,
            note: 3.8,
            revenus: '18,750 €',
            depenses: '5,100 €',
            profit: '13,650 €'
        },
        {
            id: 'v3',
            nom: 'Renault Trafic',
            marque: 'RENAULT',
            modele: 'TRAFIC',
            immatriculation: 'AD234ZZ',
            chauffeur: { id: '3', nom: 'CLAIRE FOMEKONG' },
            statut: 'Maintenance',
            carburant: 20,
            kilometrage: '67,890 km',
            vitesseMoyenne: '52 km/h',
            derniereMaintenance: '01/06/2025',
            prochaineMaintenance: '01/07/2025',
            coursesTotales: 423,
            note: 4.7,
            revenus: '25,100 €',
            depenses: '8,900 €',
            profit: '16,200 €'
        },
        {
            id: 'v4',
            nom: 'Peugeot Boxer',
            marque: 'PEUGEOT',
            modele: 'BOXER',
            immatriculation: 'CE789XY',
            chauffeur: { id: '4', nom: 'MARTIN NGUESSANG' },
            statut: 'En service',
            carburant: 90,
            kilometrage: '23,156 km',
            vitesseMoyenne: '62 km/h',
            derniereMaintenance: '20/05/2025',
            prochaineMaintenance: '20/08/2025',
            coursesTotales: 89,
            note: 4.1,
            revenus: '8,900 €',
            depenses: '2,800 €',
            profit: '6,100 €'
        },
        {
            id: 'v5',
            nom: 'Ford Transit',
            marque: 'FORD',
            modele: 'TRANSIT',
            immatriculation: 'YA567MN',
            chauffeur: { id: '5', nom: 'AMINATA DIALLO' },
            statut: 'Arrêt',
            carburant: 15,
            kilometrage: '89,456 km',
            vitesseMoyenne: '48 km/h',
            derniereMaintenance: '25/05/2025',
            prochaineMaintenance: '25/06/2025',
            coursesTotales: 512,
            note: 3.9,
            revenus: '22,800 €',
            depenses: '9,500 €',
            profit: '13,300 €'
        }
    ];

    // Filtrage des véhicules
    const vehiculesFiltered = vehicules.filter(vehicule => {
        const matchesSearch = vehicule.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             vehicule.immatriculation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             vehicule.chauffeur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             vehicule.marque.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'tous' || vehicule.statut.toLowerCase() === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const handleVehiculeClick = (id: string) => {
        router.push(`/vehicules/bilan/${id}`);
    };

    const getStatutColor = (statut: string) => {
        switch (statut.toLowerCase()) {
            case 'en service': return 'bg-green-100 text-green-700';
            case 'maintenance': return 'bg-orange-100 text-orange-700';
            case 'arrêt': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatutIcon = (statut: string) => {
        switch (statut.toLowerCase()) {
            case 'en service': return faCheckCircle;
            case 'maintenance': return faTools;
            case 'arrêt': return faTimesCircle;
            default: return faExclamationTriangle;
        }
    };

    const getCarburantColor = (niveau: number) => {
        if (niveau > 60) return '#10b981';
        if (niveau > 30) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <MenuBar />
            <div className="flex min-h-screen">
                <SideBar />
                
                <main className="flex-1 p-6">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                                    Liste des Véhicules
                                </h1>
                                <p className="text-slate-600">
                                    Gérez et consultez les bilans de vos véhicules
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="bg-white rounded-lg p-4 shadow-lg border border-slate-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{vehicules.length}</div>
                                        <div className="text-sm text-slate-600">Total véhicules</div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-lg border border-slate-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {vehicules.filter(v => v.statut === 'En service').length}
                                        </div>
                                        <div className="text-sm text-slate-600">En service</div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-lg border border-slate-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">
                                            {vehicules.filter(v => v.statut === 'Maintenance').length}
                                        </div>
                                        <div className="text-sm text-slate-600">Maintenance</div>
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
                                            placeholder="Rechercher par nom, immatriculation, chauffeur ou marque..."
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
                                        <option value="en service">En service</option>
                                        <option value="maintenance">En maintenance</option>
                                        <option value="arrêt">À l'arrêt</option>
                                    </select>
                                    
                                    <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                        <FontAwesomeIcon icon={faFilter} />
                                        <span>Filtres</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grille des véhicules */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vehiculesFiltered.map((vehicule) => (
                            <div
                                key={vehicule.id}
                                onClick={() => handleVehiculeClick(vehicule.id)}
                                className="bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group"
                            >
                                {/* Header avec statut */}
                                <div className="relative">
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                                    <FontAwesomeIcon icon={faTruck} className="text-white text-lg" />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-semibold text-lg leading-tight">
                                                        {vehicule.nom}
                                                    </h3>
                                                    <p className="text-blue-100 text-sm">{vehicule.marque} {vehicule.modele}</p>
                                                </div>
                                            </div>
                                            
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatutColor(vehicule.statut)}`}>
                                                <FontAwesomeIcon 
                                                    icon={getStatutIcon(vehicule.statut)} 
                                                    className="mr-1"
                                                />
                                                {vehicule.statut}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contenu */}
                                <div className="p-6">
                                    {/* Immatriculation et chauffeur */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-slate-600">Immatriculation</span>
                                            <span className="font-mono text-slate-800 font-semibold">{vehicule.immatriculation}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                                            <FontAwesomeIcon icon={faUser} className="text-orange-500" />
                                            <span>Chauffeur: {vehicule.chauffeur.nom}</span>
                                        </div>
                                    </div>

                                    {/* Jauge de carburant */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <FontAwesomeIcon icon={faGasPump} className="text-slate-500" />
                                                <span className="text-sm font-medium text-slate-600">Carburant</span>
                                            </div>
                                            <span className="text-sm font-bold" style={{color: getCarburantColor(vehicule.carburant)}}>
                                                {vehicule.carburant}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div 
                                                className="h-2 rounded-full transition-all duration-500"
                                                style={{ 
                                                    width: `${vehicule.carburant}%`,
                                                    backgroundColor: getCarburantColor(vehicule.carburant)
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Statistiques */}
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <div className="text-center bg-slate-50 rounded-lg p-2">
                                            <div className="text-sm font-bold text-blue-600">{vehicule.coursesTotales}</div>
                                            <div className="text-xs text-slate-600">Courses</div>
                                        </div>
                                        <div className="text-center bg-slate-50 rounded-lg p-2">
                                            <div className="text-sm font-bold text-green-600">{vehicule.kilometrage}</div>
                                            <div className="text-xs text-slate-600">Distance</div>
                                        </div>
                                        <div className="text-center bg-slate-50 rounded-lg p-2">
                                            <div className="text-sm font-bold text-orange-600">{vehicule.vitesseMoyenne}</div>
                                            <div className="text-xs text-slate-600">Vitesse moy.</div>
                                        </div>
                                    </div>

                                    {/* Note et maintenance */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <FontAwesomeIcon
                                                        key={i}
                                                        icon={faStar}
                                                        className={`text-sm ${
                                                            i <= Math.round(vehicule.note) 
                                                                ? 'text-orange-500' 
                                                                : 'text-slate-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">
                                                {vehicule.note}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                            <span>{vehicule.derniereMaintenance}</span>
                                        </div>
                                    </div>

                                    {/* Finances */}
                                    <div className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-slate-600">Profit net</span>
                                            <span className="text-lg font-bold text-green-600">{vehicule.profit}</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                                            <span>Revenus: {vehicule.revenus}</span>
                                            <span>Dépenses: {vehicule.depenses}</span>
                                        </div>
                                    </div>

                                    {/* Bouton d'action */}
                                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2">
                                        <span>Voir le bilan détaillé</span>
                                        <FontAwesomeIcon icon={faEye} className="text-sm group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message si aucun résultat */}
                    {vehiculesFiltered.length === 0 && (
                        <div className="text-center py-12">
                            <FontAwesomeIcon icon={faTruck} className="text-6xl text-slate-300 mb-4" />
                            <h3 className="text-xl font-medium text-slate-600 mb-2">Aucun véhicule trouvé</h3>
                            <p className="text-slate-500">Essayez de modifier vos critères de recherche</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}