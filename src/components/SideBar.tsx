'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faChartBar,  
    faList, 
    faTruck, 
    faUser, 
    faPlus,
    faDashboard,
    faUsers
} from '@fortawesome/free-solid-svg-icons'
import styles from './SideBar.module.css'
import { useRouter } from 'next/navigation';

export default function SideBar() {
    const router = useRouter();
    
    const mainMenuItems = [
        {
            icon: faDashboard,
            title: "Mes flottes",
            subtitle: "flotte actuelle: flotte 1",
            onClick: () => router.push('/'),
            color: "#4ade80"
        },
        {
            icon: faUser,
            title: "Ajouter un chauffeur",
            subtitle: "Nouveau membre",
            onClick: () => router.push('/driverForm'),
            color: "#60a5fa"
        },
        {
            icon: faUsers,
            title: "Liste des chauffeurs",
            subtitle: "Gestion équipe",
            onClick: () => router.push('/chauffeurs'),
            color: "#06b6d4"
        },
        {
            icon: faTruck,
            title: "Ajouter un véhicule",
            subtitle: "Nouveau véhicule",
            onClick: () => router.push('/vehiculeForm'),
            color: "#f59e0b"
        },
        {
            icon: faList,
            title: "Liste des véhicules",
            subtitle: "Gestion flotte",
            onClick: () => {},
            color: "#8b5cf6"
        }
    ];

    const analyticsItems = [
        {
            icon: faChartBar,
            title: "Bilan des véhicules",
            subtitle: "Statistiques",
            onClick: () => {},
            color: "#10b981"
        },
        {
            icon: faChartBar,
            title: "Bilan des chauffeurs",
            subtitle: "Performance",
            onClick: () => router.push('/chauffeurs'),
            color: "#f43f5e"
        }
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarContainer}>
                {/* Section principale */}
                <div className={styles.menuSection}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Menu Principal</h3>
                        <div className={styles.sectionLine}></div>
                    </div>
                    
                    <nav className={styles.menuItems}>
                        {mainMenuItems.map((item, index) => (
                            <button
                                key={index}
                                className={styles.menuItem}
                                onClick={item.onClick}
                            >
                                <div 
                                    className={styles.menuIcon}
                                    style={{ backgroundColor: item.color }}
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                <div className={styles.menuContent}>
                                    <span className={styles.menuTitle}>{item.title}</span>
                                    <span className={styles.menuSubtitle}>{item.subtitle}</span>
                                </div>
                                <div className={styles.menuArrow}>→</div>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Section analytics */}
                <div className={styles.menuSection}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Analytics</h3>
                        <div className={styles.sectionLine}></div>
                    </div>
                    
                    <nav className={styles.menuItems}>
                        {analyticsItems.map((item, index) => (
                            <button
                                key={index}
                                className={styles.menuItem}
                                onClick={item.onClick}
                            >
                                <div 
                                    className={styles.menuIcon}
                                    style={{ backgroundColor: item.color }}
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                <div className={styles.menuContent}>
                                    <span className={styles.menuTitle}>{item.title}</span>
                                    <span className={styles.menuSubtitle}>{item.subtitle}</span>
                                </div>
                                <div className={styles.menuArrow}>→</div>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Bouton d'action rapide */}
                <div className={styles.quickAction}>
                    <button className={styles.quickActionButton}>
                        <FontAwesomeIcon icon={faPlus} className={styles.quickActionIcon} />
                        <span>Action rapide</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}