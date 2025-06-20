import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faSearch, 
    faSignOutAlt, 
    faTruck, 
    faUser, 
    faBell,
    faChevronDown,
    faCog
} from "@fortawesome/free-solid-svg-icons";
import styles from './MenuBar.module.css';
import { useState } from 'react';

export default function MenuBar() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <header className={styles.menuBar}>
            <div className={styles.container}>
                {/* Logo Section */}
                <div className={styles.logoSection}>
                    <img src="/images/logo.png" alt="FleetFlow Logo" className={styles.logo}/>
                    <div className={styles.logoText}>
                        <span className={styles.brandName}>FleetFlow</span>
                        <span className={styles.brandTagline}>Gestion de flotte</span>
                    </div>
                </div>

                {/* Stats rapides au centre */}
                <div className={styles.quickStats}>
                    <div className={styles.statItem}>
                        <FontAwesomeIcon icon={faTruck} className={styles.statIcon} />
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>14</span>
                            <span className={styles.statLabel}>Véhicules actifs</span>
                        </div>
                    </div>
                    
                    <div className={styles.statItem}>
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