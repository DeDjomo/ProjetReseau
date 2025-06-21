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

export default function DriverForm() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        autrePrenom: '',
        civilité: '',
        dateNaissance: '',
        paysNaissance: '',
        villeNaissance: '',
        provinceNaissance: '',
        paysNationalite1: '',
        paysNationalite2: '',
        email: '',
        telephone: '',
        telephone2: '',
        pays: '',
        ville: '',
        adresse: '',
        nomFlotte: '',
        service: '',
        typePermis: '',
        dateObtention: '',
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
                        {/* Section Informations Personnelles */}
                        <div className={styles.formSection}>
                            <div className={styles.sectionHeader}>
                                <FontAwesomeIcon icon={faUser} className={styles.sectionIcon} />
                                <h2 className={styles.sectionTitle}>Informations Personnelles</h2>
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
                                            Nom <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.nom}
                                            onChange={handleChange('nom')}
                                            placeholder="Entrez le nom"
                                            required
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Prénom <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.prenom}
                                            onChange={handleChange('prenom')}
                                            placeholder="Entrez le prénom"
                                            required
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Autre Prénom</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.autrePrenom}
                                            onChange={handleChange('autrePrenom')}
                                            placeholder="Autre prénom (optionnel)"
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Civilité <span className={styles.required}>*</span>
                                        </label>
                                        <select 
                                            className={styles.input}
                                            value={formData.civilité}
                                            onChange={(e) => setFormData(prev => ({ ...prev, civilité: e.target.value }))}
                                            required
                                        >
                                            <option value="">Sélectionnez</option>
                                            <option value="M.">M.</option>
                                            <option value="Mme">Mme</option>
                                            <option value="Mlle">Mlle</option>
                                        </select>
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Date de naissance
                                            <FontAwesomeIcon icon={faQuestion} className={styles.helpIcon} />
                                            <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className={styles.input}
                                            value={formData.dateNaissance}
                                            onChange={handleChange('dateNaissance')}
                                            required
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Pays de naissance <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.paysNaissance}
                                            onChange={handleChange('paysNaissance')}
                                            placeholder="Pays de naissance"
                                            required
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Ville de naissance <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.villeNaissance}
                                            onChange={handleChange('villeNaissance')}
                                            placeholder="Ville de naissance"
                                            required
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Province de naissance</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.provinceNaissance}
                                            onChange={handleChange('provinceNaissance')}
                                            placeholder="Province de naissance"
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Nationalité 1
                                            <FontAwesomeIcon icon={faQuestion} className={styles.helpIcon} />
                                            <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.paysNationalite1}
                                            onChange={handleChange('paysNationalite1')}
                                            placeholder="Première nationalité"
                                            required
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Nationalité 2</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.paysNationalite2}
                                            onChange={handleChange('paysNationalite2')}
                                            placeholder="Seconde nationalité (optionnel)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Contact */}
                        <div className={styles.formSection}>
                            <div className={styles.sectionHeader}>
                                <FontAwesomeIcon icon={faEnvelope} className={styles.sectionIcon} />
                                <h2 className={styles.sectionTitle}>Contact</h2>
                            </div>
                            <div className={styles.sectionContent}>
                                <div className={styles.fieldsGrid}>
                                    <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
                                        <label className={styles.label}>
                                            Email
                                            <FontAwesomeIcon icon={faQuestion} className={styles.helpIcon} />
                                            <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className={styles.input}
                                            value={formData.email}
                                            onChange={handleChange('email')}
                                            placeholder="exemple@email.com"
                                            required
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Téléphone 1 <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            className={styles.input}
                                            value={formData.telephone}
                                            onChange={handleChange('telephone')}
                                            placeholder="+237 6XX XXX XXX"
                                            required
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Téléphone 2</label>
                                        <input
                                            type="tel"
                                            className={styles.input}
                                            value={formData.telephone2}
                                            onChange={handleChange('telephone2')}
                                            placeholder="+237 6XX XXX XXX"
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Pays <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.pays}
                                            onChange={handleChange('pays')}
                                            placeholder="Pays de résidence"
                                            required
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Ville <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.ville}
                                            onChange={handleChange('ville')}
                                            placeholder="Ville de résidence"
                                            required
                                        />
                                    </div>

                                    <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
                                        <label className={styles.label}>Adresse</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.adresse}
                                            onChange={handleChange('adresse')}
                                            placeholder="Adresse complète"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Flotte */}
                        <div className={styles.formSection}>
                            <div className={styles.sectionHeader}>
                                <FontAwesomeIcon icon={faTruck} className={styles.sectionIcon} />
                                <h2 className={styles.sectionTitle}>Flotte</h2>
                            </div>
                            <div className={styles.sectionContent}>
                                <div className={styles.fieldsGrid}>
                                    <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
                                        <label className={styles.label}>
                                            Nom de la flotte
                                            <FontAwesomeIcon icon={faQuestion} className={styles.helpIcon} />
                                            <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.nomFlotte}
                                            onChange={handleChange('nomFlotte')}
                                            placeholder="Nom de la flotte"
                                            required
                                        />
                                    </div>

                                    <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
                                        <label className={styles.label}>Service</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={formData.service}
                                            onChange={handleChange('service')}
                                            placeholder="Service assigné"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Permis */}
                        <div className={styles.formSection}>
                            <div className={styles.sectionHeader}>
                                <FontAwesomeIcon icon={faIdCard} className={styles.sectionIcon} />
                                <h2 className={styles.sectionTitle}>Permis</h2>
                            </div>
                            <div className={styles.sectionContent}>
                                <div className={styles.fieldsGrid}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Type de permis
                                            <FontAwesomeIcon icon={faQuestion} className={styles.helpIcon} />
                                            <span className={styles.required}>*</span>
                                        </label>
                                        <select 
                                            className={styles.input}
                                            value={formData.typePermis}
                                            onChange={(e) => setFormData(prev => ({ ...prev, typePermis: e.target.value }))}
                                            required
                                        >
                                            <option value="">Sélectionnez le type</option>
                                            <option value="A">Permis A (Moto)</option>
                                            <option value="B">Permis B (Voiture)</option>
                                            <option value="C">Permis C (Poids lourd)</option>
                                            <option value="D">Permis D (Transport en commun)</option>
                                        </select>
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>
                                            Date obtention <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className={styles.input}
                                            value={formData.dateObtention}
                                            onChange={handleChange('dateObtention')}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bouton de soumission */}
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