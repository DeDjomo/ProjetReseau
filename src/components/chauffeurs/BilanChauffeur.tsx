"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MenuBar from "@/components/MenuBar";
import { IconType } from "react-icons";
import {
  FaUser, FaIdCard, FaBirthdayCake, FaEnvelope, FaHome, FaCar,
  FaCalendarCheck, FaClock, FaCheckCircle, FaMapMarkerAlt, FaPhone, FaStar,
  FaArrowLeft, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import Image from "next/image";
import dynamic from 'next/dynamic';
import styles from './BilanChauffeur.module.css';

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

export default function BilanChauffeur() {
  const router = useRouter();
  const params = useParams();
  const currentId = params?.id as string;
  
  const [ongletActif, setOngletActif] = useState("presentation");
  const [recherche] = useState("");

  // Données des chauffeurs (en production, ça viendrait d'une API)
  const chauffeurs = [
    {
      id: '1',
      nom: "Djomo de Djomo Karlyn",
      matricule: "22p236",
      telephone: "6 99 94 74 60",
      cni: "104768393",
      dateNaissance: "1988-03-12",
      email: "jean.mbarga@exemple.com",
      domicile: "Nkolbisson, Yaoundé",
      permis: "Permis B",
      dateDelivrancePermis: "2010-06-15",
      experience: "12 ans",
      typeVehicule: "Camionnette, minibus",
      disponibilite: "Disponible",
      statut: "Actif",
      situation: "Aucun accident enregistré",
      note: 4.2,
      coordonnees: [3.848, 11.502] as [number, number]
    },
    {
      id: '2',
      nom: "Martin Nguessang",
      matricule: "22p237",
      telephone: "6 77 88 99 12",
      cni: "104768394",
      dateNaissance: "1985-07-20",
      email: "martin.nguessang@exemple.com",
      domicile: "Emombo, Yaoundé",
      permis: "Permis B",
      dateDelivrancePermis: "2008-03-10",
      experience: "8 ans",
      typeVehicule: "Camionnette",
      disponibilite: "En course",
      statut: "Actif",
      situation: "Aucun accident enregistré",
      note: 3.8,
      coordonnees: [3.860, 11.520] as [number, number]
    },
    {
      id: '3',
      nom: "Claire Fomekong",
      matricule: "22p238",
      telephone: "6 55 44 33 22",
      cni: "104768395",
      dateNaissance: "1982-11-15",
      email: "claire.fomekong@exemple.com",
      domicile: "Mendong, Yaoundé",
      permis: "Permis B",
      dateDelivrancePermis: "2005-09-22",
      experience: "15 ans",
      typeVehicule: "Minibus",
      disponibilite: "Repos",
      statut: "Inactif",
      situation: "En congé maladie",
      note: 4.7,
      coordonnees: [3.835, 11.480] as [number, number]
    }
  ];

  // Trouver le chauffeur actuel
  const chauffeur = chauffeurs.find(c => c.id === currentId) || chauffeurs[0];
  const currentIndex = chauffeurs.findIndex(c => c.id === chauffeur.id);


  const champsPresentation: [IconType, string, string][] = [
    [FaUser, "Nom complet", chauffeur.nom],
    [FaIdCard, "Numéro CNI", chauffeur.cni],
    [FaBirthdayCake, "Date de naissance", chauffeur.dateNaissance],
    [FaEnvelope, "Email", chauffeur.email],
    [FaHome, "Domicile", chauffeur.domicile],
    [FaIdCard, "Permis", chauffeur.permis],
    [FaCalendarCheck, "Date délivrance", chauffeur.dateDelivrancePermis],
    [FaClock, "Expérience", chauffeur.experience],
    [FaCar, "Véhicules", chauffeur.typeVehicule],
    [FaMapMarkerAlt, "Disponibilité", chauffeur.disponibilite],
    [FaCheckCircle, "Situation", chauffeur.situation]
  ];

  const onglets = [
    "presentation",
    "statistiques", 
    "courses",
    "visites automobiles",
    "finances",
    "véhicules conduits",
    "avis",
    "incidents"
  ];

  // Données pour les avis
  const avisData = [
    {
      auteur: "DJOMO DE DJOMO",
      date: "12 AOUT 2024",
      note: 3,
      texte: "CHAUFFEUR AIMABLE ET RESPECTUEUX"
    },
    {
      auteur: "DONFACK MEGNENGUE",
      date: "12 AOUT 2024",
      note: 2,
      texte: "chauffeur ponctuel"
    },
    {
      auteur: "MBARGA ESSOMBA",
      date: "08 AOUT 2024",
      note: 5,
      texte: "Excellent service, très professionnel"
    },
    {
      auteur: "NKOMO PATRICK",
      date: "05 AOUT 2024",
      note: 4,
      texte: "Conduite sécurisée et respectueuse"
    },
    {
      auteur: "FOUDA MARIE",
      date: "01 AOUT 2024",
      note: 3,
      texte: "Bon chauffeur mais peut améliorer la ponctualité"
    },
    {
      auteur: "TCHOUMI JEAN",
      date: "28 JUILLET 2024",
      note: 4,
      texte: "Très courtois et serviable"
    },
    {
      auteur: "ATEBA SOPHIE",
      date: "25 JUILLET 2024",
      note: 5,
      texte: "Je recommande vivement ce chauffeur"
    },
    {
      auteur: "OWONA PAUL",
      date: "20 JUILLET 2024",
      note: 2,
      texte: "Quelques retards mais service correct"
    }
  ];

  // Données pour les courses
  const coursesData = [
    {
      date: "Samedi 03 mai 2025",
      items: [
        {
          heure: "20:06",
          titre: "Course Yaoundé - Douala",
          description: "Transport de marchandises vers le port",
          remarque: "Livraison effectuée avec succès"
        },
        {
          heure: "12:19",
          titre: "Course Centre-ville - Aéroport",
          description: "Transport de passagers",
          remarque: "Annulé - Problème technique véhicule"
        }
      ]
    },
    {
      date: "Vendredi 02 mai 2025",
      items: [
        {
          heure: "18:45",
          titre: "Course Obili - Melen",
          description: "Transport scolaire - retour",
          remarque: "RAS - Course normale"
        },
        {
          heure: "07:30",
          titre: "Course Melen - Obili",
          description: "Transport scolaire - aller",
          remarque: "Retard de 10 minutes"
        }
      ]
    },
    {
      date: "Jeudi 01 mai 2025",
      items: [
        {
          heure: "16:15",
          titre: "Course Nlongkak - Mvog-Ada",
          description: "Livraison de matériel médical",
          remarque: "Livraison urgente - Délai respecté"
        },
        {
          heure: "09:00",
          titre: "Course Emombo - Centre Commercial",
          description: "Transport de marchandises",
          remarque: "Client très satisfait"
        }
      ]
    }
  ];

  // Données pour les incidents
  const incidentsData = [
    {
      date: "Lundi 15 avril 2025",
      items: [
        {
          heure: "14:30",
          titre: "Incident mineur - Embouteillage",
          description: "Retard de 30 minutes dû aux embouteillages",
          remarque: "Situation normale - Pas de responsabilité du chauffeur"
        }
      ]
    },
    {
      date: "Mercredi 28 mars 2025",
      items: [
        {
          heure: "11:45",
          titre: "Crevaison - Route de Douala",
          description: "Pneu crevé suite à un objet sur la chaussée",
          remarque: "Réparation effectuée rapidement - RAS"
        }
      ]
    },
    {
      date: "Vendredi 10 mars 2025",
      items: [
        {
          heure: "08:20",
          titre: "Contrôle de police",
          description: "Contrôle de routine - Tous documents en règle",
          remarque: "Aucun problème signalé"
        }
      ]
    }
  ];

  // Données pour les visites automobiles
  const visitesData = [
    {
      date: "Lundi 20 mai 2025",
      items: [
        {
          heure: "09:00",
          titre: "Visite technique annuelle",
          description: "Contrôle technique obligatoire du véhicule Toyota Hiace",
          remarque: "Visite réussie - Certificat valide 1 an"
        }
      ]
    },
    {
      date: "Mercredi 15 avril 2025",
      items: [
        {
          heure: "14:30",
          titre: "Maintenance préventive",
          description: "Révision des 50 000 km - Changement huile et filtres",
          remarque: "Maintenance complète effectuée"
        }
      ]
    },
    {
      date: "Vendredi 02 mars 2025",
      items: [
        {
          heure: "10:15",
          titre: "Réparation système de freinage",
          description: "Remplacement des plaquettes de frein avant",
          remarque: "Réparation urgente - Sécurité rétablie"
        }
      ]
    }
  ];

  // Données pour les finances
  const financesData = [
    {
      date: "Mai 2025",
      items: [
        {
          heure: "31/05",
          titre: "Salaire mensuel",
          description: "Paiement du salaire de base + primes de performance",
          remarque: "Montant: 185 000 FCFA"
        },
        {
          heure: "15/05",
          titre: "Prime de ponctualité",
          description: "Prime pour respect des horaires tout le mois",
          remarque: "Montant: 25 000 FCFA"
        }
      ]
    },
    {
      date: "Avril 2025",
      items: [
        {
          heure: "30/04",
          titre: "Salaire mensuel",
          description: "Paiement du salaire de base",
          remarque: "Montant: 180 000 FCFA"
        },
        {
          heure: "20/04",
          titre: "Prime kilométrage",
          description: "Prime pour distance parcourue supérieure à 2000 km",
          remarque: "Montant: 30 000 FCFA"
        }
      ]
    }
  ];

  // Données pour les véhicules conduits
  const vehiculesData = [
    {
      nom: "Toyota Hiace",
      plaque: "CM-458-AC",
      type: "Minibus",
      couleur: "Blanc",
      miseEnService: "2021",
      kilometrage: "153 000 km",
      statut: "Actif",
      periodeUtilisation: "Janvier 2023 - Présent"
    },
    {
      nom: "Renault Trafic",
      plaque: "LT-920-BC",
      type: "Camionnette",
      couleur: "Gris",
      miseEnService: "2019",
      kilometrage: "245 000 km",
      statut: "En maintenance",
      periodeUtilisation: "Mars 2022 - Décembre 2022"
    },
    {
      nom: "Peugeot Boxer",
      plaque: "AD-234-ZZ",
      type: "Fourgon",
      couleur: "Bleu",
      miseEnService: "2018",
      kilometrage: "310 000 km",
      statut: "Retiré",
      periodeUtilisation: "Juin 2021 - Février 2022"
    }
  ];

  const navigateToNextChauffeur = () => {
    const nextIndex = (currentIndex + 1) % chauffeurs.length;
    router.push(`/chauffeurs/${chauffeurs[nextIndex].id}`);
  };

  const navigateToPrevChauffeur = () => {
    const prevIndex = currentIndex === 0 ? chauffeurs.length - 1 : currentIndex - 1;
    router.push(`/chauffeurs/${chauffeurs[prevIndex].id}`);
  };

  return (
    <div className={styles.container}>
      <MenuBar />
      
      {/* Header de navigation */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button 
            onClick={() => router.push('/chauffeurs')}
            className={styles.backButton}
          >
            <FaArrowLeft />
            <span>Retour à la liste</span>
          </button>
          
          <div className={styles.navigation}>
            <button 
              onClick={navigateToPrevChauffeur}
              className={styles.navButton}
              disabled={chauffeurs.length <= 1}
            >
              <FaChevronLeft />
            </button>
            
            <div className={styles.pageInfo}>
              <span className={styles.pageTitle}>Bilan Chauffeur</span>
              <span className={styles.pageCounter}>
                {currentIndex + 1} / {chauffeurs.length}
              </span>
            </div>
            
            <button 
              onClick={navigateToNextChauffeur}
              className={styles.navButton}
              disabled={chauffeurs.length <= 1}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className={styles.mainContent}>
        {/* Section des informations chauffeur */}
        <div className={styles.infoSection}>
          {/* Profil du chauffeur */}
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.photoContainer}>
                <div className={styles.photoWrapper}>
                  <Image
                    src="/images/photo_chauffeur.png"
                    alt="Chauffeur"
                    width={200}
                    height={200}
                    className={styles.profilePhoto}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className={styles.photoFallback}>
                    <FaUser />
                  </div>
                </div>
              </div>

              <div className={styles.profileInfo}>
                <div className={styles.nameContainer}>
                  <div className={styles.nameWrapper}>
                    <FaIdCard className={styles.nameIcon} />
                    <h1 className={styles.chauffeurName}>{chauffeur.nom}</h1>
                  </div>
                  
                  {/* Statut avec couleur dynamique */}
                  <div className={`${styles.statusBadge} ${
                    chauffeur.statut === 'Actif' ? styles.statusActive : styles.statusInactive
                  }`}>
                    <FaCheckCircle className={styles.statusIcon} />
                    <span>{chauffeur.statut}</span>
                  </div>
                </div>

                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <FaPhone className={styles.contactIcon} />
                    <span className={styles.contactText}>{chauffeur.telephone}</span>
                  </div>

                  <div className={styles.ratingContainer}>
                    <FaStar className={styles.ratingIcon} />
                    <div className={styles.stars}>
                      {[1, 2, 3, 4, 5].map(i => (
                        <FaStar
                          key={i}
                          className={`${styles.star} ${
                            i <= Math.round(chauffeur.note) ? styles.starFilled : styles.starEmpty
                          }`}
                        />
                      ))}
                    </div>
                    <span className={styles.ratingValue}>{chauffeur.note}</span>
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
                  {champsPresentation.map(([Icon, label, valeur], index) =>
                    (typeof valeur === "string" && valeur.toLowerCase().includes(recherche.toLowerCase())) || recherche === "" ? (
                      <div key={index} className={styles.infoCard}>
                        <Icon className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>{label}</span>
                          <span className={styles.infoValue}>
                            {typeof valeur === "function"
                              ? React.createElement(valeur)
                              : valeur}
                          </span>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              )}

              {ongletActif === "statistiques" && (
                <div className={styles.statsGrid}>
                  {[
                    {
                      label: "Note moyenne",
                      valeur: chauffeur.note.toString(),
                      icon: <FaStar />,
                      cible: "avis",
                      color: "orange"
                    },
                    {
                      label: "Courses totales",
                      valeur: "247",
                      icon: <FaCar />,
                      cible: "courses",
                      color: "blue"
                    },
                    {
                      label: "Incidents",
                      valeur: "3",
                      icon: <FaCheckCircle />,
                      cible: "incidents",
                      color: "red"
                    },
                    {
                      label: "Visites automobiles",
                      valeur: "12",
                      icon: <FaMapMarkerAlt />,
                      cible: "visites automobiles",
                      color: "green"
                    },
                    {
                      label: "Gains mensuels",
                      valeur: "185 000 FCFA",
                      icon: <FaClock />,
                      cible: "finances",
                      color: "purple"
                    },
                    {
                      label: "Véhicules conduits",
                      valeur: "3",
                      icon: <FaCar />,
                      cible: "véhicules conduits",
                      color: "cyan"
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setOngletActif(item.cible)}
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

              {ongletActif === "avis" && (
                <div className={styles.avisGrid}>
                  {avisData.map((avis, index) => (
                    <div
                      key={index}
                      className={`${styles.avisCard} ${
                        index === 1 ? styles.avisHighlight : ''
                      }`}
                    >
                      <div className={styles.avisHeader}>
                        <span className={styles.avisAuteur}>{avis.auteur}</span>
                        <span className={styles.avisDate}>{avis.date}</span>
                      </div>

                      <div className={styles.avisRating}>
                        {[1, 2, 3, 4, 5].map(i => (
                          <FaStar
                            key={i}
                            className={`${styles.avisStarIcon} ${
                              i <= avis.note ? styles.avisStarFilled : styles.avisStarEmpty
                            }`}
                          />
                        ))}
                        <span className={styles.avisNoteValue}>
                          {(avis.note + 0.34).toFixed(2)}
                        </span>
                      </div>

                      <p className={styles.avisTexte}>{avis.texte}</p>
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
                              <span className={styles.timelineRemarque}>{item.remarque}</span>
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
                              <span className={styles.timelineRemarque}>{item.remarque}</span>
                            </div>
                            <div className={styles.timelineArrow}>→</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {ongletActif === "visites automobiles" && (
                <div className={styles.timelineContainer}>
                  {visitesData.map((groupe, index) => (
                    <div key={index} className={styles.timelineGroup}>
                      <h3 className={styles.timelineDate}>{groupe.date}</h3>
                      <div className={styles.timelineItems}>
                        {groupe.items.map((item, idx) => (
                          <div key={idx} className={`${styles.timelineItem} ${styles.visiteItem}`}>
                            <div className={styles.timelineTime}>{item.heure}</div>
                            <div className={styles.timelineContent}>
                              <h4 className={styles.timelineTitle}>{item.titre}</h4>
                              <p className={styles.timelineDescription}>{item.description}</p>
                              <span className={styles.timelineRemarque}>{item.remarque}</span>
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
                              <span className={styles.timelineRemarque}>{item.remarque}</span>
                            </div>
                            <div className={styles.timelineArrow}>→</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {ongletActif === "véhicules conduits" && (
                <div className={styles.vehiculesGrid}>
                  {vehiculesData.map((vehicule, index) => (
                    <div key={index} className={styles.vehiculeCard}>
                      <div className={styles.vehiculeHeader}>
                        <div className={styles.vehiculeNom}>{vehicule.nom}</div>
                        <span
                          className={`${styles.vehiculeStatut} ${
                            vehicule.statut === "Actif"
                              ? styles.statutActif
                              : vehicule.statut === "En maintenance"
                              ? styles.statutMaintenance
                              : styles.statutRetire
                          }`}
                        >
                          {vehicule.statut}
                        </span>
                      </div>
                      <div className={styles.vehiculeDetails}>
                        <div className={styles.vehiculeRow}>
                          <strong>Plaque :</strong> {vehicule.plaque}
                        </div>
                        <div className={styles.vehiculeRow}>
                          <strong>Type :</strong> {vehicule.type} | <strong>Couleur :</strong> {vehicule.couleur}
                        </div>
                        <div className={styles.vehiculeRow}>
                          <strong>Mise en service :</strong> {vehicule.miseEnService} | <strong>Kilométrage :</strong> {vehicule.kilometrage}
                        </div>
                        <div className={styles.vehiculeRow}>
                          <strong>Période d&apos;utilisation :</strong> {vehicule.periodeUtilisation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section carte */}
        <div className={styles.mapSection}>
          <div className={styles.mapContainer}>
            <div className={styles.mapHeader}>
              <h3 className={styles.mapTitle}>Localisation</h3>
              <div className={styles.mapInfo}>
                <FaMapMarkerAlt className={styles.mapIcon} />
                <span>{chauffeur.disponibilite}</span>
              </div>
            </div>
            
            <div className={styles.mapWrapper}>
              {typeof window !== 'undefined' && (
                <MapContainer
                  center={chauffeur.coordonnees}
                  zoom={13}
                  scrollWheelZoom={false}
                  className={styles.leafletMap}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={chauffeur.coordonnees}>
                    <Popup>
                      <div className={styles.popupContent}>
                        <strong>{chauffeur.nom}</strong>
                        <br />
                        {chauffeur.disponibilite}
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}