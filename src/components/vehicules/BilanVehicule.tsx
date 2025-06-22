"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MenuBar from "@/components/MenuBar";
import { IconType } from "react-icons";
import {
  FaTruck, FaIdCard, FaCalendarAlt, FaUser, FaGasPump, FaCar,
  FaRoute, FaClock, FaCheckCircle, FaMapMarkerAlt, FaPhone, FaStar,
  FaArrowLeft, FaChevronLeft, FaChevronRight, FaTools, FaTachometerAlt,
  FaMoneyBillWave, FaChartLine, FaHistory, FaExclamationTriangle,
  FaClipboardList, FaFileInvoiceDollar
} from "react-icons/fa";
import Image from "next/image";
import dynamic from 'next/dynamic';
import styles from './BilanVehicule.module.css';

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
);

export default function BilanVehicule() {
  const router = useRouter();
  const params = useParams();
  const currentId = params?.id as string;
  
  const [ongletActif, setOngletActif] = useState("presentation");

  // Données des véhicules
  const vehicules = [
    {
      id: 'v1',
      nom: "Mercedes SUV",
      marque: "MERCEDES",
      modele: "GLE 350",
      immatriculation: "CE304SD",
      matricule: "VEH001",
      dateAcquisition: "2022-03-15",
      poids: "2.5 tonnes",
      couleur: "Noir métallisé",
      carburant: "Diesel",
      capaciteReservoir: "80 litres",
      consommationMoyenne: "8.5 L/100km",
      vitesseMax: "200 km/h",
      nbPlaces: "7 places",
      typeVehicule: "SUV",
      statut: "En service",
      chauffeur: {
        id: '1',
        nom: "NKAMLA CHEDJOU",
        telephone: "6 99 94 74 60",
        email: "nkamla.chedjou@exemple.com"
      },
      localisation: {
        adresse: "Avenue Kennedy, Yaoundé",
        ville: "Yaoundé",
        coordonnees: [3.848, 11.502] as [number, number]
      },
      statistiques: {
        kilometrage: "12,750 km",
        coursesTotales: 156,
        tempsUtilisation: "450 heures",
        vitesseMoyenne: "65 km/h",
        consommationReelle: "9.2 L/100km",
        note: 4.3
      },
      maintenance: {
        derniere: "15/05/2025",
        prochaine: "15/08/2025",
        frequence: "Tous les 3 mois",
        garage: "Garage Central"
      },
      finances: {
        revenus: "12,500 €",
        depenses: "3,200 €",
        profit: "9,300 €",
        coutParKm: "0.25 €"
      }
    },
    {
      id: 'v2',
      nom: "Toyota Hiace",
      marque: "TOYOTA",
      modele: "HIACE",
      immatriculation: "LT920BC",
      matricule: "VEH002",
      dateAcquisition: "2021-08-20",
      poids: "3.2 tonnes",
      couleur: "Blanc",
      carburant: "Diesel",
      capaciteReservoir: "70 litres",
      consommationMoyenne: "10.2 L/100km",
      vitesseMax: "160 km/h",
      nbPlaces: "14 places",
      typeVehicule: "Minibus",
      statut: "En service",
      chauffeur: {
        id: '2',
        nom: "JEAN DUPONT",
        telephone: "6 77 88 99 12",
        email: "jean.dupont@exemple.com"
      },
      localisation: {
        adresse: "Carrefour Emombo, Yaoundé",
        ville: "Yaoundé",
        coordonnees: [3.860, 11.520] as [number, number]
      },
      statistiques: {
        kilometrage: "45,230 km",
        coursesTotales: 298,
        tempsUtilisation: "780 heures",
        vitesseMoyenne: "58 km/h",
        consommationReelle: "11.1 L/100km",
        note: 3.8
      },
      maintenance: {
        derniere: "10/06/2025",
        prochaine: "10/09/2025",
        frequence: "Tous les 3 mois",
        garage: "Garage Sud"
      },
      finances: {
        revenus: "18,750 €",
        depenses: "5,100 €",
        profit: "13,650 €",
        coutParKm: "0.18 €"
      }
    }
  ];

  // Trouver le véhicule actuel
  const vehicule = vehicules.find(v => v.id === currentId) || vehicules[0];
  const currentIndex = vehicules.findIndex(v => v.id === vehicule.id);

  const champsPresentation: [IconType, string, string][] = [
    [FaTruck, "Nom du véhicule", vehicule.nom],
    [FaIdCard, "Immatriculation", vehicule.immatriculation],
    [FaIdCard, "Matricule", vehicule.matricule],
    [FaCalendarAlt, "Date d'acquisition", vehicule.dateAcquisition],
    [FaCar, "Marque", vehicule.marque],
    [FaCar, "Modèle", vehicule.modele],
    [FaTools, "Poids", vehicule.poids],
    [FaCheckCircle, "Couleur", vehicule.couleur],
    [FaGasPump, "Type carburant", vehicule.carburant],
    [FaGasPump, "Capacité réservoir", vehicule.capaciteReservoir],
    [FaTachometerAlt, "Vitesse maximale", vehicule.vitesseMax],
    [FaUser, "Nombre de places", vehicule.nbPlaces]
  ];

  const onglets = [
    "presentation",
    "statistiques",
    "courses",
    "maintenance",
    "finances",
    "historique",
    "incidents"
  ];

  // Données pour les courses
  const coursesData = [
    {
      date: "Samedi 15 juin 2025",
      items: [
        {
          heure: "08:30",
          titre: "Course Yaoundé - Douala",
          description: "Transport de passagers vers le port autonome",
          distance: "245 km",
          duree: "4h15",
          carburant: "28 litres",
          revenus: "150 €",
          statut: "Terminée"
        },
        {
          heure: "14:45",
          titre: "Course Centre-ville - Aéroport",
          description: "Transport VIP - Client privilégié",
          distance: "35 km",
          duree: "45min",
          carburant: "4 litres",
          revenus: "80 €",
          statut: "Terminée"
        }
      ]
    },
    {
      date: "Vendredi 14 juin 2025",
      items: [
        {
          heure: "07:00",
          titre: "Course Melen - Obili",
          description: "Transport scolaire - aller",
          distance: "18 km",
          duree: "35min",
          carburant: "2.5 litres",
          revenus: "25 €",
          statut: "Terminée"
        },
        {
          heure: "16:30",
          titre: "Course Obili - Melen",
          description: "Transport scolaire - retour",
          distance: "18 km",
          duree: "40min",
          carburant: "2.8 litres",
          revenus: "25 €",
          statut: "Terminée"
        }
      ]
    }
  ];

  // Données pour la maintenance
  const maintenanceData = [
    {
      date: "Lundi 15 mai 2025",
      items: [
        {
          heure: "09:00",
          titre: "Révision générale",
          description: "Contrôle complet du véhicule - 10 000 km",
          garage: "Garage Central Yaoundé",
          technicien: "MBARGA Robert",
          cout: "350 €",
          statut: "Terminée",
          prochainRDV: "15/08/2025"
        }
      ]
    },
    {
      date: "Mercredi 20 mars 2025",
      items: [
        {
          heure: "14:30",
          titre: "Changement d'huile",
          description: "Vidange complète + filtre à huile",
          garage: "Garage Central Yaoundé",
          technicien: "TCHOUMI Jean",
          cout: "85 €",
          statut: "Terminée",
          prochainRDV: "20/06/2025"
        }
      ]
    }
  ];

  // Données pour les finances
  const financesData = [
    {
      date: "Juin 2025",
      items: [
        {
          heure: "30/06",
          titre: "Revenus mensuels",
          description: "Total des courses effectuées ce mois",
          montant: "+2,450 €",
          type: "revenus",
          details: "28 courses, 1,240 km parcourus"
        },
        {
          heure: "25/06",
          titre: "Carburant",
          description: "Plein d'essence - Station Total",
          montant: "-120 €",
          type: "depense",
          details: "80 litres diesel"
        },
        {
          heure: "15/06",
          titre: "Assurance",
          description: "Prime mensuelle assurance tous risques",
          montant: "-180 €",
          type: "depense",
          details: "Assurance SAHAM"
        }
      ]
    },
    {
      date: "Mai 2025",
      items: [
        {
          heure: "31/05",
          titre: "Revenus mensuels",
          description: "Total des courses effectuées en mai",
          montant: "+2,850 €",
          type: "revenus",
          details: "35 courses, 1,580 km parcourus"
        },
        {
          heure: "15/05",
          titre: "Maintenance",
          description: "Révision générale du véhicule",
          montant: "-350 €",
          type: "depense",
          details: "Garage Central"
        }
      ]
    }
  ];

  // Données pour les incidents
  const incidentsData = [
    {
      date: "Mercredi 10 juin 2025",
      items: [
        {
          heure: "16:20",
          titre: "Incident mineur - Embouteillage",
          description: "Retard de 45 minutes dû aux embouteillages exceptionnels",
          lieu: "Carrefour Nlongkak",
          gravite: "Faible",
          impact: "Retard client",
          resolution: "Client informé et compensé",
          statut: "Résolu"
        }
      ]
    },
    {
      date: "Lundi 25 mai 2025",
      items: [
        {
          heure: "11:30",
          titre: "Crevaison - Pneu avant droit",
          description: "Pneu crevé suite à un clou sur la chaussée",
          lieu: "Route de Douala, km 15",
          gravite: "Modérée",
          impact: "Arrêt service 2h",
          resolution: "Remplacement pneu par roue de secours",
          statut: "Résolu"
        }
      ]
    }
  ];

  const navigateToNextVehicule = () => {
    const nextIndex = (currentIndex + 1) % vehicules.length;
    router.push(`/vehicules/bilan/${vehicules[nextIndex].id}`);
  };

  const navigateToPrevVehicule = () => {
    const prevIndex = currentIndex === 0 ? vehicules.length - 1 : currentIndex - 1;
    router.push(`/vehicules/bilan/${vehicules[prevIndex].id}`);
  };

  const getStatutColor = (statut: string) => {
    switch (statut?.toLowerCase()) {
      case 'en service': return 'bg-green-100 text-green-700';
      case 'maintenance': return 'bg-orange-100 text-orange-700';
      case 'arrêt': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={styles.container}>
      <MenuBar />
      
      {/* Header de navigation */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button 
            onClick={() => router.push('/vehicules')}
            className={styles.backButton}
          >
            <FaArrowLeft />
            <span>Retour à la liste</span>
          </button>
          
          <div className={styles.navigation}>
            <button 
              onClick={navigateToPrevVehicule}
              className={styles.navButton}
              disabled={vehicules.length <= 1}
            >
              <FaChevronLeft />
            </button>
            
            <div className={styles.pageInfo}>
              <span className={styles.pageTitle}>Bilan Véhicule</span>
              <span className={styles.pageCounter}>
                {currentIndex + 1} / {vehicules.length}
              </span>
            </div>
            
            <button 
              onClick={navigateToNextVehicule}
              className={styles.navButton}
              disabled={vehicules.length <= 1}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className={styles.mainContent}>
        {/* Section des informations véhicule */}
        <div className={styles.infoSection}>
          {/* Profil du véhicule */}
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.photoContainer}>
                <div className={styles.photoWrapper}>
                  <Image
                    src={`/images/vehicule-${vehicule.id}.png`}
                    alt="Véhicule"
                    width={200}
                    height={200}
                    className={styles.profilePhoto}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className={styles.photoFallback}>
                    <FaTruck />
                  </div>
                </div>
              </div>

              <div className={styles.profileInfo}>
                <div className={styles.nameContainer}>
                  <div className={styles.nameWrapper}>
                    <FaTruck className={styles.nameIcon} />
                    <h1 className={styles.vehiculeName}>{vehicule.nom}</h1>
                  </div>
                  
                  <div className={`${styles.statusBadge} ${getStatutColor(vehicule.statut)}`}>
                    <FaCheckCircle className={styles.statusIcon} />
                    <span>{vehicule.statut}</span>
                  </div>
                </div>

                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <FaIdCard className={styles.contactIcon} />
                    <span className={styles.contactText}>{vehicule.immatriculation}</span>
                  </div>

                  <div className={styles.ratingContainer}>
                    <FaStar className={styles.ratingIcon} />
                    <div className={styles.stars}>
                      {[1, 2, 3, 4, 5].map(i => (
                        <FaStar
                          key={i}
                          className={`${styles.star} ${
                            i <= Math.round(vehicule.statistiques.note) ? styles.starFilled : styles.starEmpty
                          }`}
                        />
                      ))}
                    </div>
                    <span className={styles.ratingValue}>{vehicule.statistiques.note}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabsHeader}>
              {onglets.map(tab => (
                <button
                  key={tab}
                  className={`${styles.tabButton} ${
                    ongletActif === tab ? styles.tabActive : ''
                  }`}
                  onClick={() => setOngletActif(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Contenu des onglets */}
            <div className={styles.tabContent}>
              {ongletActif === "presentation" && (
                <div className={styles.presentationGrid}>
                  {champsPresentation.map(([Icon, label, valeur], index) => (
                    <div key={index} className={styles.infoCard}>
                      <Icon className={styles.infoIcon} />
                      <div className={styles.infoContent}>
                        <span className={styles.infoLabel}>{label}</span>
                        <span className={styles.infoValue}>{valeur}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {ongletActif === "statistiques" && (
                <div className={styles.statsGrid}>
                  {[
                    {
                      label: "Kilométrage total",
                      valeur: vehicule.statistiques.kilometrage,
                      icon: <FaRoute />,
                      color: "blue"
                    },
                    {
                      label: "Courses totales",
                      valeur: vehicule.statistiques.coursesTotales.toString(),
                      icon: <FaTruck />,
                      color: "green"
                    },
                    {
                      label: "Temps d'utilisation",
                      valeur: vehicule.statistiques.tempsUtilisation,
                      icon: <FaClock />,
                      color: "orange"
                    },
                    {
                      label: "Vitesse moyenne",
                      valeur: vehicule.statistiques.vitesseMoyenne,
                      icon: <FaTachometerAlt />,
                      color: "purple"
                    },
                    {
                      label: "Consommation réelle",
                      valeur: vehicule.statistiques.consommationReelle,
                      icon: <FaGasPump />,
                      color: "red"
                    },
                    {
                      label: "Profit net",
                      valeur: vehicule.finances.profit,
                      icon: <FaMoneyBillWave />,
                      color: "cyan"
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`${styles.statCard} ${styles[`stat${item.color}`]}`}
                    >
                      <div className={styles.statIcon}>
                        {item.icon}
                      </div>
                      <div className={styles.statValue}>{item.valeur}</div>
                      <div className={styles.statLabel}>{item.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {ongletActif === "courses" && (
                <div className={styles.timelineContainer}>
                  {coursesData.map((groupe, index) => (
                    <div key={index} className={styles.timelineGroup}>
                      <h3 className={styles.timelineDate}>{groupe.date}</h3>
                      <div className={styles.timelineItems}>
                        {groupe.items.map((item, idx) => (
                          <div key={idx} className={styles.timelineItem}>
                            <div className={styles.timelineTime}>{item.heure}</div>
                            <div className={styles.timelineContent}>
                              <h4 className={styles.timelineTitle}>{item.titre}</h4>
                              <p className={styles.timelineDescription}>{item.description}</p>
                              <div className={styles.courseDetails}>
                                <span>Distance: {item.distance}</span>
                                <span>Durée: {item.duree}</span>
                                <span>Carburant: {item.carburant}</span>
                                <span className={styles.revenus}>Revenus: {item.revenus}</span>
                              </div>
                              <span className={`${styles.timelineStatus} ${styles.statusSuccess}`}>
                                {item.statut}
                              </span>
                            </div>
                            <div className={styles.timelineArrow}>→</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {ongletActif === "maintenance" && (
                <div className={styles.timelineContainer}>
                  {maintenanceData.map((groupe, index) => (
                    <div key={index} className={styles.timelineGroup}>
                      <h3 className={styles.timelineDate}>{groupe.date}</h3>
                      <div className={styles.timelineItems}>
                        {groupe.items.map((item, idx) => (
                          <div key={idx} className={`${styles.timelineItem} ${styles.maintenanceItem}`}>
                            <div className={styles.timelineTime}>{item.heure}</div>
                            <div className={styles.timelineContent}>
                              <h4 className={styles.timelineTitle}>{item.titre}</h4>
                              <p className={styles.timelineDescription}>{item.description}</p>
                              <div className={styles.maintenanceDetails}>
                                <span>Garage: {item.garage}</span>
                                <span>Technicien: {item.technicien}</span>
                                <span>Coût: {item.cout}</span>
                                <span>Prochain RDV: {item.prochainRDV}</span>
                              </div>
                              <span className={`${styles.timelineStatus} ${styles.statusSuccess}`}>
                                {item.statut}
                              </span>
                            </div>
                            <div className={styles.timelineArrow}>→</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {ongletActif === "finances" && (
                <div className={styles.timelineContainer}>
                  {financesData.map((groupe, index) => (
                    <div key={index} className={styles.timelineGroup}>
                      <h3 className={styles.timelineDate}>{groupe.date}</h3>
                      <div className={styles.timelineItems}>
                        {groupe.items.map((item, idx) => (
                          <div key={idx} className={`${styles.timelineItem} ${styles.financeItem}`}>
                            <div className={styles.timelineTime}>{item.heure}</div>
                            <div className={styles.timelineContent}>
                              <h4 className={styles.timelineTitle}>{item.titre}</h4>
                              <p className={styles.timelineDescription}>{item.description}</p>
                              <div className={`${styles.montant} ${item.type === 'revenus' ? styles.revenus : styles.depense}`}>
                                {item.montant}
                              </div>
                              <span className={styles.financeDetails}>{item.details}</span>
                            </div>
                            <div className={styles.timelineArrow}>→</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {ongletActif === "incidents" && (
                <div className={styles.timelineContainer}>
                  {incidentsData.map((groupe, index) => (
                    <div key={index} className={styles.timelineGroup}>
                      <h3 className={styles.timelineDate}>{groupe.date}</h3>
                      <div className={styles.timelineItems}>
                        {groupe.items.map((item, idx) => (
                          <div key={idx} className={`${styles.timelineItem} ${styles.incidentItem}`}>
                            <div className={styles.timelineTime}>{item.heure}</div>
                            <div className={styles.timelineContent}>
                              <h4 className={styles.timelineTitle}>{item.titre}</h4>
                              <p className={styles.timelineDescription}>{item.description}</p>
                              <div className={styles.incidentDetails}>
                                <span>Lieu: {item.lieu}</span>
                                <span>Gravité: {item.gravite}</span>
                                <span>Impact: {item.impact}</span>
                                <span>Résolution: {item.resolution}</span>
                              </div>
                              <span className={`${styles.timelineStatus} ${styles.statusSuccess}`}>
                                {item.statut}
                              </span>
                            </div>
                            <div className={styles.timelineArrow}>→</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>S'il te plait, donne moi les modifications à faire sur les autres fichiers pour pouvoir naviguer entre ces différentes routes de façon cohérente.
          </div>
        </div>

        {/* Section carte */}
        <div className={styles.mapSection}>
          <div className={styles.mapContainer}>
            <div className={styles.mapHeader}>
              <h3 className={styles.mapTitle}>Localisation actuelle</h3>
              <div className={styles.mapInfo}>
                <FaMapMarkerAlt className={styles.mapIcon} />
                <span>{vehicule.localisation.adresse}</span>
              </div>
            </div>
            
            <div className={styles.mapWrapper}>
              {typeof window !== 'undefined' && (
                <MapContainer
                  center={vehicule.localisation.coordonnees}
                  zoom={13}
                  scrollWheelZoom={false}
                  className={styles.leafletMap}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={vehicule.localisation.coordonnees}>
                    <Popup>
                      <div className={styles.popupContent}>
                        <strong>{vehicule.nom}</strong>
                        <br />
                        <small>{vehicule.immatriculation}</small>
                        <br />
                        Chauffeur: {vehicule.chauffeur.nom}
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>

            {/* Informations chauffeur */}
            <div className={styles.chauffeurInfo}>
              <h4 className={styles.chauffeurTitle}>Chauffeur assigné</h4>
              <div className={styles.chauffeurCard}>
                <FaUser className={styles.chauffeurIcon} />
                <div className={styles.chauffeurDetails}>
                  <div className={styles.chauffeurName}>{vehicule.chauffeur.nom}</div>
                  <div className={styles.chauffeurContact}>
                    <FaPhone className={styles.contactIcon} />
                    <span>{vehicule.chauffeur.telephone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}