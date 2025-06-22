'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import MenuBar from '@/components/MenuBar';
import SideBar from '@/components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHistory, faSearch, faFilter, faCalendarAlt, faTruck, faUser,
    faTools, faGasPump, faRoute, faCheckCircle, faTimesCircle,
    faExclamationTriangle, faClock, faMapMarkerAlt, faFileAlt,
    faChartLine, faMoneyBillWave, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

// Interfaces pour le typage
interface ArretEvent {
    id: string;
    date: string;
    heure: string;
    vehicule: string;
    chauffeur: string;
    duree: string;
    raison: string;
    lieu: string;
    type: 'arret';
}

interface MaintenanceEvent {
    id: string;
    date: string;
    heure: string;
    vehicule: string;
    technicien: string;
    lieu: string;
    probleme: string;
    cout: string;
    statut: 'Terminé' | 'En cours' | 'Planifié';
    type: 'maintenance';
}

interface VisiteEvent {
    id: string;
    date: string;
    heure: string;
    vehicule: string;
    chauffeur: string;
    kilometrage: string;
    typeVisite: string;
    resultat: string;
    prochainRDV: string;
    type: 'visite';
}

interface IncidentEvent {
    id: string;
    date: string;
    heure: string;
    vehicule: string;
    chauffeur: string;
    lieu: string;
    description: string;
    gravite: 'Faible' | 'Modérée' | 'Élevée';
    statut: 'Résolu' | 'En cours' | 'Signalé';
    type: 'incident';
}

type HistoriqueEvent = ArretEvent | MaintenanceEvent | VisiteEvent | IncidentEvent;

export default function HistoriqueVehicule() {
    const router = useRouter();
    const [selectedVehicule, setSelectedVehicule] = useState<string>('tous');
    const [selectedType, setSelectedType] = useState<string>('tous');
    const [selectedPeriode, setSelectedPeriode] = useState<string>('7jours');
    const [searchTerm, setSearchTerm] = useState('');

    // Options pour les filtres
    const vehiculeOptions = [
        { value: 'tous', label: 'Tous les véhicules' },
        { value: 'CE304SD', label: 'Mercedes SUV - CE304SD' },
        { value: 'LT920BC', label: 'Toyota Hiace - LT920BC' },
        { value: 'AD234ZZ', label: 'Renault Trafic - AD234ZZ' },
        { value: 'CE789XY', label: 'Peugeot Boxer - CE789XY' },
    ];

    const typeOptions = [
        { value: 'tous', label: 'Tous les événements' },
        { value: 'arret', label: 'Arrêts' },
        { value: 'maintenance', label: 'Maintenances' },
        { value: 'visite', label: 'Visites techniques' },
        { value: 'incident', label: 'Incidents' },
    ];

    const periodeOptions = [
        { value: '7jours', label: '7 derniers jours' },
        { value: '1mois', label: '1 mois' },
        { value: '3mois', label: '3 mois' },
        { value: '6mois', label: '6 mois' },
        { value: '1an', label: '1 an' },
    ];

    // Données fictives pour l'historique
    const historiqueData: HistoriqueEvent[] = [
        // Arrêts
        {
            id: '1',
            date: '2025-06-20',
            heure: '14:30',
            vehicule: 'CE304SD',
            chauffeur: 'NKAMLA CHEDJOU',
            duree: '2h30',
            raison: 'Pause déjeuner prolongée',
            lieu: 'Restaurant Le Palais - Yaoundé',
            type: 'arret'
        },
        {
            id: '2',
            date: '2025-06-19',
            heure: '09:15',
            vehicule: 'LT920BC',
            chauffeur: 'JEAN DUPONT',
            duree: '45min',
            raison: 'Attente client',
            lieu: 'Aéroport Nsimalen',
            type: 'arret'
        },
        // Maintenances
        {
            id: '3',
            date: '2025-06-18',
            heure: '08:00',
            vehicule: 'CE304SD',
            technicien: 'MBARGA Robert',
            lieu: 'Garage Central',
            probleme: 'Révision 10 000 km',
            cout: '350 €',
            statut: 'Terminé',
            type: 'maintenance'
        },
        {
            id: '4',
            date: '2025-06-17',
            heure: '15:20',
            vehicule: 'AD234ZZ',
            technicien: 'TCHOUMI Jean',
            lieu: 'Garage Sud',
            probleme: 'Changement plaquettes de frein',
            cout: '180 €',
            statut: 'Terminé',
            type: 'maintenance'
        },
        // Visites
        {
            id: '5',
            date: '2025-06-16',
            heure: '10:30',
            vehicule: 'LT920BC',
            chauffeur: 'JEAN DUPONT',
            kilometrage: '45,230 km',
            typeVisite: 'Contrôle technique',
            resultat: 'Conforme',
            prochainRDV: '16/06/2026',
            type: 'visite'
        },
        // Incidents
        {
            id: '6',
            date: '2025-06-15',
            heure: '16:45',
            vehicule: 'CE789XY',
            chauffeur: 'MARTIN NGUESSANG',
            lieu: 'Carrefour Nlongkak',
            description: 'Accrochage mineur avec un taxi',
            gravite: 'Modérée',
            statut: 'Résolu',
            type: 'incident'
        },
        {
            id: '7',
            date: '2025-06-14',
            heure: '11:20',
            vehicule: 'AD234ZZ',
            chauffeur: 'CLAIRE FOMEKONG',
            lieu: 'Route de Douala',
            description: 'Crevaison pneu avant',
            gravite: 'Faible',
            statut: 'Résolu',
            type: 'incident'
        }
    ];

    // Fonction de filtrage
    const evenementsFiltered = useMemo(() => {
        return historiqueData.filter(event => {
            // Filtre par véhicule
            const matchesVehicule = selectedVehicule === 'tous' || event.vehicule === selectedVehicule;
            
            // Filtre par type
            const matchesType = selectedType === 'tous' || event.type === selectedType;
            
            // Filtre par recherche
            const matchesSearch = searchTerm === '' || 
                Object.values(event).some(value => 
                    value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            
            return matchesVehicule && matchesType && matchesSearch;
        });
    }, [selectedVehicule, selectedType, searchTerm]);

    // Grouper par date
    const evenementsGroupes = useMemo(() => {
        const groupes: { [key: string]: HistoriqueEvent[] } = {};
        
        evenementsFiltered.forEach(event => {
            const dateKey = new Date(event.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            if (!groupes[dateKey]) {
                groupes[dateKey] = [];
            }
            groupes[dateKey].push(event);
        });
        
        // Trier par date décroissante
        Object.keys(groupes).forEach(key => {
            groupes[key].sort((a, b) => b.heure.localeCompare(a.heure));
        });
        
        return groupes;
    }, [evenementsFiltered]);

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'arret': return faClock;
            case 'maintenance': return faTools;
            case 'visite': return faCheckCircle;
            case 'incident': return faExclamationTriangle;
            default: return faFileAlt;
        }
    };

    const getEventColor = (type: string) => {
        switch (type) {
            case 'arret': return 'border-blue-400 bg-blue-50';
            case 'maintenance': return 'border-orange-400 bg-orange-50';
            case 'visite': return 'border-green-400 bg-green-50';
            case 'incident': return 'border-red-400 bg-red-50';
            default: return 'border-gray-400 bg-gray-50';
        }
    };

    const getStatutColor = (statut: string) => {
        switch (statut) {
            case 'Terminé':
            case 'Résolu':
            case 'Conforme':
                return 'bg-green-100 text-green-700';
            case 'En cours':
                return 'bg-yellow-100 text-yellow-700';
            case 'Planifié':
            case 'Signalé':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const renderEventContent = (event: HistoriqueEvent) => {
        switch (event.type) {
            case 'arret':
                return (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                            <span>Chauffeur: {event.chauffeur}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                            <span>Durée: {event.duree}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
                            <span>Lieu: {event.lieu}</span>
                        </div>
                        <div className="text-sm">
                            <strong>Raison:</strong> {event.raison}
                        </div>
                    </div>
                );
            
            case 'maintenance':
                return (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                            <span>Technicien: {event.technicien}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
                            <span>Lieu: {event.lieu}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="w-4 h-4" />
                            <span>Coût: {event.cout}</span>
                        </div>
                        <div className="text-sm">
                            <strong>Problème:</strong> {event.probleme}
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(event.statut)}`}>
                            {event.statut}
                        </span>
                    </div>
                );
            
            case 'visite':
                return (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                            <span>Chauffeur: {event.chauffeur}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faRoute} className="w-4 h-4" />
                            <span>Kilométrage: {event.kilometrage}</span>
                        </div>
                        <div className="text-sm">
                            <strong>Type:</strong> {event.typeVisite}
                        </div>
                        <div className="text-sm">
                            <strong>Prochain RDV:</strong> {event.prochainRDV}
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(event.resultat)}`}>
                            {event.resultat}
                        </span>
                    </div>
                );
            
            case 'incident':
                return (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                            <span>Chauffeur: {event.chauffeur}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
                            <span>Lieu: {event.lieu}</span>
                        </div>
                        <div className="text-sm">
                            <strong>Description:</strong> {event.description}
                        </div>
                        <div className="flex gap-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                event.gravite === 'Élevée' ? 'bg-red-100 text-red-700' :
                                event.gravite === 'Modérée' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                            }`}>
                                {event.gravite}
                            </span>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(event.statut)}`}>
                                {event.statut}
                            </span>
                        </div>
                    </div>
                );
            
            default:
                return null;
        }
    };

    // Statistiques
    const stats = {
        total: evenementsFiltered.length,
        arrets: evenementsFiltered.filter(e => e.type === 'arret').length,
        maintenances: evenementsFiltered.filter(e => e.type === 'maintenance').length,
        visites: evenementsFiltered.filter(e => e.type === 'visite').length,
        incidents: evenementsFiltered.filter(e => e.type === 'incident').length,
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
                                <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                                    <FontAwesomeIcon icon={faHistory} className="text-blue-600" />
                                    Historique des Véhicules
                                </h1>
                                <p className="text-slate-600">
                                    Consultez l'historique complet des événements de votre flotte
                                </p>
                            </div>
                        </div>

                        {/* Statistiques */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                            <div className="bg-white rounded-lg p-4 shadow-lg border border-slate-200">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
                                    <div className="text-sm text-slate-600">Total événements</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-lg border border-blue-200">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{stats.arrets}</div>
                                    <div className="text-sm text-slate-600">Arrêts</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-lg border border-orange-200">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">{stats.maintenances}</div>
                                    <div className="text-sm text-slate-600">Maintenances</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-lg border border-green-200">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{stats.visites}</div>
                                    <div className="text-sm text-slate-600">Visites</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-lg border border-red-200">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{stats.incidents}</div>
                                    <div className="text-sm text-slate-600">Incidents</div>
                                </div>
                            </div>
                        </div>

                        {/* Filtres */}
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Filtres de recherche</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Véhicule</label>
                                    <select
                                        value={selectedVehicule}
                                        onChange={(e) => setSelectedVehicule(e.target.value)}
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {vehiculeOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Type d'événement</label>
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {typeOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Période</label>
                                    <select
                                        value={selectedPeriode}
                                        onChange={(e) => setSelectedPeriode(e.target.value)}
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {periodeOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Recherche</label>
                                    <div className="relative">
                                        <FontAwesomeIcon 
                                            icon={faSearch} 
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Rechercher..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline des événements */}
                    <div className="space-y-8">
                        {Object.keys(evenementsGroupes).length === 0 ? (
                            <div className="text-center py-12">
                                <FontAwesomeIcon icon={faHistory} className="text-6xl text-slate-300 mb-4" />
                                <h3 className="text-xl font-medium text-slate-600 mb-2">Aucun événement trouvé</h3>
                                <p className="text-slate-500">Essayez de modifier vos critères de recherche</p>
                            </div>
                        ) : (
                            Object.entries(evenementsGroupes)
                                .sort((a, b) => new Date(b[1][0].date).getTime() - new Date(a[1][0].date).getTime())
                                .map(([date, events]) => (
                                    <div key={date} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                                            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                                {date}
                                            </h3>
                                            <p className="text-blue-100 text-sm mt-1">
                                                {events.length} événement{events.length > 1 ? 's' : ''}
                                            </p>
                                        </div>
                                        
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {events.map((event) => (
                                                    <div 
                                                        key={event.id}
                                                        className={`flex gap-4 p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md ${getEventColor(event.type)}`}
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                                                                <FontAwesomeIcon 
                                                                    icon={getEventIcon(event.type)} 
                                                                    className="text-lg text-slate-600"
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="font-semibold text-slate-800 text-lg">
                                                                        {event.type === 'arret' && 'Arrêt véhicule'}
                                                                        {event.type === 'maintenance' && 'Maintenance'}
                                                                        {event.type === 'visite' && 'Visite technique'}
                                                                        {event.type === 'incident' && 'Incident'}
                                                                    </h4>
                                                                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                                                                        <span className="flex items-center gap-1">
                                                                            <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                                                                            {event.heure}
                                                                        </span>
                                                                        <span className="flex items-center gap-1">
                                                                            <FontAwesomeIcon icon={faTruck} className="w-4 h-4" />
                                                                            {event.vehicule}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="text-right">
                                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                                                        event.type === 'arret' ? 'bg-blue-100 text-blue-700' :
                                                                        event.type === 'maintenance' ? 'bg-orange-100 text-orange-700' :
                                                                        event.type === 'visite' ? 'bg-green-100 text-green-700' :
                                                                        'bg-red-100 text-red-700'
                                                                    }`}>
                                                                        {event.type}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="mt-3">
                                                                {renderEventContent(event)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>

                    {/* Boutons d'action */}
                    <div className="mt-8 flex justify-center gap-4">
                        <button 
                            onClick={() => router.push('/vehicules')}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span>Retour aux véhicules</span>
                        </button>
                        
                        <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium">
                            <FontAwesomeIcon icon={faFileAlt} />
                            <span>Exporter rapport</span>
                        </button>
                        
                        <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
                            <FontAwesomeIcon icon={faChartLine} />
                            <span>Voir statistiques</span>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}