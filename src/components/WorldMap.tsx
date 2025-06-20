/**
 * Ce composant représente la carte sur laquelle seront visualisés les véhicules de la flotte.
 * Version corrigée pour éviter les erreurs TileLayer et optimiser les performances.
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTruck, faEye, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './WorldMap.module.css';

// Import dynamique des composants Leaflet pour éviter les erreurs SSR
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
);

export default function WorldMap() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showArea, setShowArea] = useState<string | null>(null);

  // Chargement des dépendances Leaflet côté client
  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window !== 'undefined') {
        // Import des CSS Leaflet
        await import('leaflet/dist/leaflet.css');
        
        // Configuration des icônes par défaut
        const L = await import('leaflet');
        
        // Fix pour les icônes manquantes
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
        
        setIsLoaded(true);
      }
    };

    loadLeaflet();
  }, []);

  // Position centrale de la carte (Yaoundé, Cameroun)
  const center: [number, number] = [3.848, 11.502];
  const radius = 100000; // 100km de rayon

  // Données des véhicules avec positions réalistes autour de Yaoundé
  const vehicules = [
    {
      id: 'v1',
      nom: 'Véhicule n°1',
      immatriculation: 'CE304SD',
      chauffeur: { id: '1', nom: 'DeDjomo Karlyn' },
      depart: 'Obili',
      destination: 'Melen',
      heureDepart: '10h00',
      statut: 'En route',
      carburant: 75,
      position: [3.848, 11.502] as [number, number] // Centre Yaoundé
    },
    {
      id: 'v2',
      nom: 'Véhicule n°24',
      immatriculation: 'LT920BC',
      chauffeur: { id: '2', nom: 'Jean Dupont' },
      depart: 'Centre-ville',
      destination: 'Aéroport',
      heureDepart: '14h30',
      statut: 'Pause',
      carburant: 45,
      position: [3.860, 11.520] as [number, number] // Nord de Yaoundé
    },
    {
      id: 'v3',
      nom: 'Véhicule n°12',
      immatriculation: 'AD234ZZ',
      chauffeur: { id: '3', nom: 'Claire Fomekong' },
      depart: 'Mendong',
      destination: 'Université',
      heureDepart: '08h15',
      statut: 'Arrêté',
      carburant: 20,
      position: [3.835, 11.480] as [number, number] // Sud de Yaoundé
    },
    {
      id: 'v4',
      nom: 'Véhicule n°8',
      immatriculation: 'CE789XY',
      chauffeur: { id: '4', nom: 'Martin Nguessang' },
      depart: 'Emombo',
      destination: 'Nlongkak',
      heureDepart: '16h00',
      statut: 'En route',
      carburant: 90,
      position: [3.870, 11.490] as [number, number] // Est de Yaoundé
    },
    {
      id: 'v5',
      nom: 'Véhicule n°15',
      immatriculation: 'LT456GH',
      chauffeur: { id: '5', nom: 'Aminata Diallo' },
      depart: 'Nkomkana',
      destination: 'Biyem-Assi',
      heureDepart: '12h45',
      statut: 'En route',
      carburant: 65,
      position: [3.820, 11.510] as [number, number] // Ouest de Yaoundé
    }
  ];

  const handleVoirDetails = (vehiculeId: string) => {
    router.push(`/vehicules/${vehiculeId}`);
  };

  const handleVoirChauffeur = (chauffeurId: string) => {
    router.push(`/chauffeurs/${chauffeurId}`);
  };

  const toggleArea = (vehiculeId: string) => {
    setShowArea(showArea === vehiculeId ? null : vehiculeId);
  };

  const getStatutColor = (statut: string) => {
    switch (statut.toLowerCase()) {
      case 'en route': return '#10b981';
      case 'pause': return '#f59e0b';
      case 'arrêté': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCarburantColor = (niveau: number) => {
    if (niveau > 60) return '#10b981';
    if (niveau > 30) return '#f59e0b';
    return '#ef4444';
  };

  // Affichage du loader pendant le chargement
  if (!isLoaded) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
          <p className={styles.loadingText}>Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapWrapper}>
      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={true} 
        className={styles.mapContainer}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          tileSize={256}
          zoomOffset={0}
        />

        {vehicules.map((vehicule) => (
          <div key={vehicule.id}>
            <Marker 
              position={vehicule.position}
              eventHandlers={{
                click: () => toggleArea(vehicule.id),
              }}
            >
              <Popup 
                className={styles.customPopup}
                maxWidth={350}
                minWidth={300}
                closeButton={true}
                autoClose={false}
                closeOnClick={false}
              >
                <div className={styles.popupContent}>
                  {/* Header avec statut */}
                  <div className={styles.popupHeader}>
                    <div className={styles.popupTitle}>
                      <FontAwesomeIcon icon={faTruck} className={styles.vehiculeIcon}/>
                      <span>{vehicule.nom}</span>
                    </div>
                    <div 
                      className={styles.statutBadge}
                      style={{ backgroundColor: getStatutColor(vehicule.statut) }}
                    >
                      {vehicule.statut}
                    </div>
                  </div>

                  {/* Informations principales */}
                  <div className={styles.popupInfo}>
                    <div className={styles.infoRow}>
                      <FontAwesomeIcon icon={faUser} className={styles.infoIcon}/>
                      <span className={styles.infoLabel}>Chauffeur :</span>
                      <button 
                        className={styles.chauffeurLink}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVoirChauffeur(vehicule.chauffeur.id);
                        }}
                      >
                        {vehicule.chauffeur.nom}
                      </button>
                    </div>
                    
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Immatriculation :</span>
                      <span className={styles.infoValue}>{vehicule.immatriculation}</span>
                    </div>
                    
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Départ :</span>
                      <span className={styles.infoValue}>{vehicule.depart}</span>
                    </div>
                    
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Destination :</span>
                      <span className={styles.infoValue}>{vehicule.destination}</span>
                    </div>
                    
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Heure de départ :</span>
                      <span className={styles.infoValue}>{vehicule.heureDepart}</span>
                    </div>
                  </div>

                  {/* Jauge de carburant */}
                  <div className={styles.carburantSection}>
                    <div className={styles.carburantHeader}>
                      <span className={styles.carburantLabel}>Niveau carburant</span>
                      <span className={styles.carburantValue}>{vehicule.carburant}%</span>
                    </div>
                    <div className={styles.carburantBarre}>
                      <div 
                        className={styles.carburantNiveau}
                        style={{ 
                          width: `${vehicule.carburant}%`,
                          backgroundColor: getCarburantColor(vehicule.carburant)
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className={styles.popupActions}>
                    <button 
                      className={styles.btnSecondaire}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVoirChauffeur(vehicule.chauffeur.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <span>Voir chauffeur</span>
                    </button>
                    
                    <button 
                      className={styles.btnPrimaire}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVoirDetails(vehicule.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                      <span>Plus de détails</span>
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* Cercle de zone d'activité */}
            {showArea === vehicule.id && (
              <Circle
                center={vehicule.position}
                radius={radius}
                pathOptions={{ 
                  color: getStatutColor(vehicule.statut),
                  fillColor: getStatutColor(vehicule.statut),
                  fillOpacity: 0.1,
                  weight: 2
                }}
              />
            )}
          </div>
        ))}
      </MapContainer>
    </div>
  );
}