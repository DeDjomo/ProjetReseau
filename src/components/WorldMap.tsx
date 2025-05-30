/**
 * Ce composant représente la carte sur laquelle seront visualisés les véhicules de la flotte.
 */
'use client';   // les hooks de react-leaflet doivent etre utilisés sur le client.

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import styles from './WorldMap.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTruck } from '@fortawesome/free-solid-svg-icons';

export default function WorldMap() {
  const center: LatLngExpression = [0, 0];
  
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer center={center} zoom={2} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        attribution='&copy; les contributeurs d’<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

        <Marker position={[0, 0]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°1
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : DeDjomo
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Circle className={styles.popupCircle} 
          center={[0, 0]}
          radius={1000000}
          color="red"
          fillColor="red"
          fillOpacity={0.5}
        />
        <Marker position={[50, 50]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>

        <Marker position={[100, 50]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Marker position={[50, 300]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Marker position={[0, 50]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Marker position={[50, 250]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Marker position={[20, 250]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Marker position={[50, 20]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Marker position={[20, 20]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Marker position={[70, 20]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Marker position={[0, -100]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Marker position={[0, -100]}>
          <Popup className={styles.popup}>
                <div className={styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
        <Marker position={[50, -100]}>
          <Popup className={styles.popup}>
                <div className={  styles.popupContent}>
                <div className={styles.popupTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                  Véhicule n°24
                </div>
                <div className={styles.popupDriver}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                  Chauffeur : Jean Dupont
                </div>
                <div className={styles.popupText}>Immatriculation : CE304SD</div>
                <div className={styles.popupText}>Depart      : Obili</div>
                <div className={styles.popupText}>Destination : Melen</div>
                <div className={styles.popupText}>Heure de depart : 10h00</div>
              </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
