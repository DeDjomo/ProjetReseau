import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faSearch, 
    faSignOutAlt, 
    faTruck, 
    faUser, 
    faBell,
    faChevronDown,
    faCog,
    faHome
} from "@fortawesome/free-solid-svg-icons";
import styles from './MenuBar.module.css';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function MenuBar() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Fonction pour obtenir le titre de la page actuelle
    const getPageTitle = () => {
        if (pathname === '/') return 'Dashboard';
        if (pathname.startsWith('/chauffeurs/') && pathname !== '/chauffeurs') return 'Bilan Chauffeur';
        if (pathname === '/chauffeurs') return 'Liste des Chauffeurs';
        if (pathname === '/driverForm') return 'Ajouter un Chauffeur';
        if (pathname.startsWith('/vehicules/bilan/')) return 'Bilan Véhicule';
        if (pathname === '/vehicules/historique') return 'Historique Véhicules';
        if (pathname === '/vehicules') return 'Liste des Véhicules';
        if (pathname.startsWith('/vehicules/') && pathname !== '/vehicules') return 'Détails Véhicule';
        return 'FleetFlow';
    };

    return (
        <header className={styles.menuBar}>
            <div className={styles.container}>
                {/* Logo Section - Cliquable pour retourner au dashboard */}
                <div 
                    className={styles.logoSection}
                    onClick={() => router.push('/')}
                    style={{ cursor: 'pointer' }}
                >
                    <img src="/images/logo.png" alt="FleetFlow Logo" className={styles.logo}/>
                    <div className={styles.logoText}>
                        <span className={styles.brandName}>FleetFlow</span>
                        <span className={styles.brandTagline}>{getPageTitle()}</span>
                    </div>
                </div>

                {/* Stats rapides au centre - Cliquables */}
                <div className={styles.quickStats}>
                    <div 
                        className={styles.statItem}
                        onClick={() => router.push('/vehicules')}
                        style={{ cursor: 'pointer' }}
                    >
                        <FontAwesomeIcon icon={faTruck} className={styles.statIcon} />
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>14</span>
                            <span className={styles.statLabel}>Véhicules actifs</span>
                        </div>
                    </div>
                    
                    <div 
                        className={styles.statItem}
                        onClick={() => router.push('/chauffeurs')}
                        style={{ cursor: 'pointer' }}
                    >
                        <FontAwesomeIcon icon={faUser} className={styles.statIcon} />
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>8</span>
                            <span className={styles.statLabel}>Chauffeurs en service</span>
                        </div>
                    </div>
                </div>

                {/* Actions utilisateur */}
                <div className={styles.userActions}>
                    <div className={styles.searchContainer}>
                        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                        <input 
                            type="text" 
                            placeholder="Rechercher véhicule, chauffeur..." 
                            className={styles.searchInput}
                        />
                    </div>

                    <button className={styles.actionButton}>
                        <FontAwesomeIcon icon={faBell} />
                        <span className={styles.badge}>3</span>
                    </button>

                    <button className={styles.actionButton}>
                        <FontAwesomeIcon icon={faCog} />
                    </button>

                    {/* Menu utilisateur avec dropdown */}
                    <div className={styles.userMenu}>
                        <button 
                            className={styles.userProfile}
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                            <div className={styles.avatar}>
                                <span>M</span>
                            </div>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>Martin D.</span>
                                <span className={styles.userRole}>Gestionnaire</span>
                            </div>
                            <FontAwesomeIcon 
                                icon={faChevronDown} 
                                className={`${styles.chevron} ${userMenuOpen ? styles.chevronOpen : ''}`}
                            />
                        </button>

                        {userMenuOpen && (
                            <div className={styles.userDropdown}>
                                <button className={styles.dropdownItem}>
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Mon profil</span>
                                </button>
                                <button className={styles.dropdownItem}>
                                    <FontAwesomeIcon icon={faCog} />
                                    <span>Paramètres</span>
                                </button>
                                <hr className={styles.dropdownSeparator} />
                                <button className={styles.dropdownItem}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span>Se déconnecter</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}