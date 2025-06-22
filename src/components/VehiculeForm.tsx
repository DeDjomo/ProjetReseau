'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faQuestion,
    faUser,
    faEnvelope,
    faTruck,
    faIdCard
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
                    <h1 className={styles.mainTitle}>Ajouter un Chauffeur</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>

                    </div>
                </form>
            </div>
        </div>
    );
}