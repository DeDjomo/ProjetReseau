'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import MenuBar from './MenuBar';
import Image from 'next/image';
import { 
    FaArrowLeft, 
    FaCar, 
    FaUser,
    FaRoute,
    FaInfoCircle,
    FaChartLine,
    FaTools,
    FaTachometerAlt,
    FaCalendarAlt,
} from 'react-icons/fa';
import styles from './VehiculeDetails.module.css';

export default function VehiculeDetails() {
    const router = useRouter();
    const params = useParams();
    const vehiculeId = params?.id as string;

    // Données du véhicule (en production, ça viendrait d'une API)
    const vehiculesData = {
        'v1': {
            id: 'v1',
            nom: 'Mercedes SUV',
            marque: 'MERCEDES',
            modele: 'GLE 350',
            immatriculation: 'CE304SD',
            matricule: 'MAT001',
            poids: '1500 kg',
            statut: 'EN ACTIVITE',
            chauffeur: {
                id: '1',
                nom: 'NKAMLA CHEDJOU',
                matricule: 'MAT001',
                permis: 'P01-237-XYZ',
                email: 'chedjoujohan13@gmail.com',
                telephone: '628171413',
                domicile: 'Nkomkana'
            },
            position: {
                adresse1: '123 6th St.',
                ville1: 'San Francisco, NL 32904',
                adresse2: '2 44 Hello Ave.',
                ville2: 'Campos Saçi, IL 60185',
                email2: 'pierluigi.gigio.01@gmail.com'
            },
            specifications: {
                dureeUtilisation: '4H : 3MIN : 25',
                niveauCarburant: 'HIGH',
                distanceParcourue: '10 KM',
                vitesseMoyenne: '45 km/h',
                derniereMaintenance: '15/05/2025',
                prochaineMaintenance: '15/07/2025'
            },
            carburantData: [
                { time: '0s', level: 45 },
                { time: '1s', level: 48 },
                { time: '2s', level: 52 },
                { time: '3s', level: 54 },
                { time: '4s', level: 56 },
                { time: '5s', level: 58 },
                { time: '6s', level: 55 },
                { time: '7s', level: 53 },
                { time: '8s', level: 57 },
                { time: '9s', level: 59 },
                { time: '10s', level: 50 }
            ]
        },
        'v2': {
            id: 'v2',
            nom: 'Toyota Hiace',
            marque: 'TOYOTA',
            modele: 'HIACE',
            immatriculation: 'LT920BC',
            matricule: 'MAT002',
            poids: '2200 kg',
            statut: 'EN ACTIVITE',
            chauffeur: {
                id: '2',
                nom: 'JEAN DUPONT',
                matricule: 'MAT002',
                permis: 'P02-456-ABC',
                email: 'jean.dupont@exemple.com',
                telephone: '677889912',
                domicile: 'Emombo'
            },
            position: {
                adresse1: '456 Central Ave.',
                ville1: 'Yaoundé, CM 12000',
                adresse2: '15 Airport Rd.',
                ville2: 'Nsimalen, CM 12100',
                email2: 'transport.hiace@gmail.com'
            },
            specifications: {
                dureeUtilisation: '6H : 15MIN : 10',
                niveauCarburant: 'MEDIUM',
                distanceParcourue: '45 KM',
                vitesseMoyenne: '38 km/h',
                derniereMaintenance: '10/06/2025',
                prochaineMaintenance: '10/08/2025'
            },
            carburantData: [
                { time: '0s', level: 30 },
                { time: '1s', level: 32 },
                { time: '2s', level: 35 },
                { time: '3s', level: 38 },
                { time: '4s', level: 40 },
                { time: '5s', level: 42 },
                { time: '6s', level: 39 },
                { time: '7s', level: 37 },
                { time: '8s', level: 41 },
                { time: '9s', level: 43 },
                { time: '10s', level: 45 }
            ]
        }
    };

    const vehicule = vehiculesData[vehiculeId as keyof typeof vehiculesData] || vehiculesData['v1'];

    const handleRetour = () => {
        router.push('/');
    };

    const handleVoirChauffeur = () => {
        router.push(`/chauffeurs/${vehicule.chauffeur.id}`);
    };

    const handleBilanVehicule = () => {
        // TODO: Créer la page de bilan véhicule
        alert('Fonctionnalité "Bilan véhicule" à venir');
    };

    const getStatutColor = (statut: string) => {
        return statut === 'EN ACTIVITE' ? '#10b981' : '#ef4444';
    };

    const getCarburantColor = (niveau: string) => {
        switch (niveau.toLowerCase()) {
            case 'high': return '#10b981';
            case 'medium': return '#f59e0b';
            case 'low': return '#ef4444';
            default: return '#6b7280';
        }
    };

    return (
        <div className={styles.container}>
            <MenuBar />
            
            {/* Header avec navigation */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <button onClick={handleRetour} className={styles.backButton}>
                        <FaArrowLeft />
                        <span>Retour au dashboard</span>
                    </button>
                    
                    <div className={styles.headerTitle}>
                        <h1>Informations sur le véhicule</h1>
                    </div>
                    
                    <button onClick={handleBilanVehicule} className={styles.detailsButton}>
                        <FaChartLine />
                        <span>Plus de détails</span>
                    </button>
                </div>
            </div>

            {/* Contenu principal */}
            <div className={styles.mainContent}>
                {/* Sidebar avec infos chauffeur */}
                <div className={styles.sidebar}>
                    <div className={styles.chauffeurCard}>
                        <div className={styles.chauffeurHeader}>
                            <div className={styles.chauffeurAvatar}>
                                <FaUser />
                            </div>
                            <div className={styles.chauffeurInfo}>
                                <h3>{vehicule.chauffeur.nom}</h3>
                                <span>{vehicule.chauffeur.matricule}</span>
                            </div>
                        </div>

                        <div className={styles.chauffeurDetails}>
                            <div className={styles.labelItem}>
                                <span className={styles.label}>Matricule:</span>
                                <span className={styles.value}>{vehicule.chauffeur.matricule}</span>
                            </div>
                            <div className={styles.labelItem}>
                                <span className={styles.label}>Permis:</span>
                                <span className={styles.value}>{vehicule.chauffeur.permis}</span>
                            </div>
                            <div className={styles.labelItem}>
                                <span className={styles.label}>Email:</span>
                                <span className={styles.value}>{vehicule.chauffeur.email}</span>
                            </div>
                            <div className={styles.labelItem}>
                                <span className={styles.label}>Tel:</span>
                                <span className={styles.value}>{vehicule.chauffeur.telephone}</span>
                            </div>
                            <div className={styles.labelItem}>
                                <span className={styles.label}>Domicile:</span>
                                <span className={styles.value}>{vehicule.chauffeur.domicile}</span>
                            </div>
                        </div>

                        <div className={styles.sidebarActions}>
                            <button onClick={handleVoirChauffeur} className={styles.infoButton}>
                                <FaInfoCircle />
                                <span>Plus d&apos;informations</span>
                            </button>
                            <button onClick={handleRetour} className={styles.retourButton}>
                                <FaArrowLeft />
                                <span>Retour</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section principale */}
                <div className={styles.mainSection}>
                    {/* Image et infos de base du véhicule */}
                    <div className={styles.vehiculeCard}>
                        <div className={styles.vehiculeImage}>
                            <div className={styles.vehiculeImageFallback}>
                                <FaCar className={styles.carIconLarge} />
                                <span>{vehicule.nom}</span>
                            </div>
                        </div>

                        <div className={styles.vehiculeInfoGrid}>
                            <div className={styles.infoSection}>
                                <div className={styles.infoCard}>
                                    <span className={styles.infoLabel}>Poids:</span>
                                    <span className={styles.infoValue}>{vehicule.poids}</span>
                                </div>
                                <div className={styles.infoCard}>
                                    <span className={styles.infoLabel}>Adresse:</span>
                                    <span className={styles.infoValue}>{vehicule.position.adresse1}</span>
                                    <span className={styles.infoSubValue}>{vehicule.position.ville1}</span>
                                </div>
                                <div className={styles.infoCard}>
                                    <span className={styles.infoLabel}>Email:</span>
                                    <span className={styles.infoValue}>{vehicule.chauffeur.email}</span>
                                </div>
                            </div>

                            <div className={styles.infoSection}>
                                <div className={styles.infoCard}>
                                    <span className={styles.infoLabel}>Adresse 2:</span>
                                    <span className={styles.infoValue}>{vehicule.position.adresse2}</span>
                                    <span className={styles.infoSubValue}>{vehicule.position.ville2}</span>
                                </div>
                                <div className={styles.infoCard}>
                                    <span className={styles.infoLabel}>Email 2:</span>
                                    <span className={styles.infoValue}>{vehicule.position.email2}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description et statut */}
                    <div className={styles.descriptionCard}>
                        <h2 className={styles.sectionTitle}>DESCRIPTION DU VEHICULE</h2>
                        
                        <div className={styles.statusGrid}>
                            <div className={styles.statusItem}>
                                <span className={styles.statusLabel}>{vehicule.marque}</span>
                            </div>
                            
                            <div className={styles.statusItem}>
                                <span className={styles.statusLabel}>STATUS:</span>
                                <span 
                                    className={styles.statusValue}
                                    style={{ color: getStatutColor(vehicule.statut) }}
                                >
                                    {vehicule.statut}
                                </span>
                            </div>

                            <div className={styles.statusItem}>
                                <span className={styles.statusLabel}>DUREE D&apos;UTILISATION:</span>
                                <span className={styles.statusValue}>{vehicule.specifications.dureeUtilisation}</span>
                            </div>

                            <div className={styles.statusItem}>
                                <span className={styles.statusLabel}>NIVEAU DE CARBURANT:</span>
                                <span 
                                    className={styles.statusValue}
                                    style={{ color: getCarburantColor(vehicule.specifications.niveauCarburant) }}
                                >
                                    {vehicule.specifications.niveauCarburant}
                                </span>
                            </div>

                            <div className={styles.statusItem}>
                                <span className={styles.statusLabel}>DISTANCE PARCOURUE:</span>
                                <span className={styles.statusValue}>{vehicule.specifications.distanceParcourue}</span>
                            </div>
                        </div>
                    </div>

                    {/* Graphique d'évolution du carburant */}
                    <div className={styles.chartCard}>
                        <h2 className={styles.sectionTitle}>EVOLUTION DU CARBURANT</h2>
                        <div className={styles.chartContainer}>
                            <svg className={styles.chart} viewBox="0 0 800 300">
                                {/* Grille de fond */}
                                <defs>
                                    <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="800" height="300" fill="url(#grid)" />
                                
                                {/* Axes */}
                                <line x1="50" y1="250" x2="750" y2="250" stroke="#374151" strokeWidth="2"/>
                                <line x1="50" y1="50" x2="50" y2="250" stroke="#374151" strokeWidth="2"/>
                                
                                {/* Labels axe Y */}
                                <text x="30" y="55" fontSize="12" fill="#6b7280">100</text>
                                <text x="35" y="105" fontSize="12" fill="#6b7280">75</text>
                                <text x="35" y="155" fontSize="12" fill="#6b7280">50</text>
                                <text x="35" y="205" fontSize="12" fill="#6b7280">25</text>
                                <text x="45" y="265" fontSize="12" fill="#6b7280">0</text>
                                
                                {/* Labels axe X */}
                                {vehicule.carburantData.map((point, index) => (
                                    <text 
                                        key={index}
                                        x={50 + (index * 70)} 
                                        y="275" 
                                        fontSize="12" 
                                        fill="#6b7280"
                                        textAnchor="middle"
                                    >
                                        {point.time}
                                    </text>
                                ))}
                                
                                {/* Ligne du graphique */}
                                <polyline
                                    points={vehicule.carburantData.map((point, index) => 
                                        `${50 + (index * 70)},${250 - (point.level * 2)}`
                                    ).join(' ')}
                                    fill="none"
                                    stroke="#FF7A00"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                
                                {/* Points sur la courbe */}
                                {vehicule.carburantData.map((point, index) => (
                                    <circle
                                        key={index}
                                        cx={50 + (index * 70)}
                                        cy={250 - (point.level * 2)}
                                        r="4"
                                        fill="#FF7A00"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                ))}
                                
                                {/* Label du graphique */}
                                <text x="400" y="30" fontSize="14" fill="#FF7A00" textAnchor="middle" fontWeight="bold">
                                    ← FuelLevel
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Statistiques supplémentaires */}
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <FaTachometerAlt />
                            </div>
                            <div className={styles.statContent}>
                                <span className={styles.statValue}>{vehicule.specifications.vitesseMoyenne}</span>
                                <span className={styles.statLabel}>Vitesse moyenne</span>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <FaRoute />
                            </div>
                            <div className={styles.statContent}>
                                <span className={styles.statValue}>{vehicule.specifications.distanceParcourue}</span>
                                <span className={styles.statLabel}>Distance totale</span>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <FaTools />
                            </div>
                            <div className={styles.statContent}>
                                <span className={styles.statValue}>{vehicule.specifications.derniereMaintenance}</span>
                                <span className={styles.statLabel}>Dernière maintenance</span>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <FaCalendarAlt />
                            </div>
                            <div className={styles.statContent}>
                                <span className={styles.statValue}>{vehicule.specifications.prochaineMaintenance}</span>
                                <span className={styles.statLabel}>Prochaine maintenance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}