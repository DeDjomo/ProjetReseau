'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faTruck,
} from '@fortawesome/free-solid-svg-icons';
import styles from './DriverForm.module.css';

export default function VehiculeForm(){
    const [formData, setFormData] = useState({
        marque: '',
        immatriculation: '',
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Données du formulaire:', formData);
    };

    return (
        <div className={styles.driverForm}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <img src="/images/logo.png" alt="Logo FleetFlow" className={styles.logo} />
                    <div className={styles.fleetFlow}>FleetFlow</div>
                    <h1 className={styles.mainTitle}>Ajouter un véhicule</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className="w-250">
                            <div className={styles.sectionHeader}>
                                <FontAwesomeIcon icon={faTruck} className={styles.sectionIcon} />
                                <h2 className={styles.sectionTitle}>Informations sur le véhicule</h2>
                            </div>
                            <div className={styles.sectionContent}>
                                <div className={styles.photoSection}>
                                    <div className={styles.photoLabel}>Photo du profil</div>
                                    <FontAwesomeIcon icon={faUser} className={styles.photoIcon} />
                                    <small style={{ color: '#64748b', marginTop: '0.5rem' }}>
                                        Cliquez pour ajouter une photo
                                    </small>
                                </div>

                                <div className={styles.fieldsGrid}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Marque <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.marque}
                                            onChange={handleChange('nom')}
                                            placeholder="Entrez la marque du véhicule"
                                            required
                                        />
                                    </div>

                                </div>
                                <div className={styles.fieldsGrid}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Immatriculation <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.immatriculation}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.submitSection}>
                            <button type="submit" className={styles.submitButton}>
                                Enregistrer les informations
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}