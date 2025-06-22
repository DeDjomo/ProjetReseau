'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faChartBar,  
    faList, 
    faTruck, 
    faUser, 
    faPlus,
    faDashboard,
    faUsers,
    faHistory
} from '@fortawesome/free-solid-svg-icons'
import styles from './SideBar.module.css'
import { useRouter, usePathname } from 'next/navigation';

export default function SideBar() {
    const router = useRouter();
    const pathname = usePathname();
    
    const mainMenuItems = [
        {
            icon: faDashboard,
            title: "Mes flottes",
            subtitle: "flotte actuelle: flotte 1",
            onClick: () => router.push('/'),
            path: '/',
            color: "#4ade80"
        },
        {
            icon: faUser,
            title: "Ajouter un chauffeur",
            subtitle: "Nouveau membre",
            onClick: () => router.push('/driverForm'),
            path: '/driverForm',
            color: "#60a5fa"
        },
        {
            icon: faUsers,
            title: "Liste des chauffeurs",
            subtitle: "Gestion équipe",
            onClick: () => router.push('/chauffeurs'),
            path: '/chauffeurs',
            color: "#06b6d4"
        },
        {
            icon: faTruck,
            title: "Ajouter un véhicule",
            subtitle: "Nouveau véhicule",
            onClick: () => router.push("/vehiculeForm"), // TODO: Créer cette page plus tard
            path: '/vehiculeForm',
            color: "#f59e0b",
            disabled: false // Temporairement désactivé
        },
        {
            icon: faList,
            title: "Liste des véhicules",
            subtitle: "Gestion flotte",
            onClick: () => router.push('/vehicules'),
            path: '/vehicules',
            color: "#8b5cf6"
        }
    ];

    const analyticsItems = [
        {
            icon: faChartBar,
            title: "Bilan des véhicules",
            subtitle: "Statistiques",
            onClick: () => router.push('/vehicules'), // Redirige vers la liste pour l'instant
            path: '/vehicules',
            color: "#10b981"
        },
        {
            icon: faChartBar,
            title: "Bilan des chauffeurs",
            subtitle: "Performance",
            onClick: () => router.push('/chauffeurs'),
            path: '/chauffeurs',
            color: "#f43f5e"
        },
        {
            icon: faHistory,
            title: "Historique véhicules",
            subtitle: "Suivi activités",
            onClick: () => router.push('/vehicules/historique'),
            path: '/vehicules/historique',
            color: "#6366f1"
        }
    ];

    const isActive = (itemPath: string) => {
        if (itemPath === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(itemPath);
    };

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
                                className={`${styles.menuItem} ${isActive(item.path) ? styles.menuItemActive : ''} ${item.disabled ? styles.menuItemDisabled : ''}`}
                                onClick={item.onClick}
                                disabled={item.disabled}
                            >
                                <div 
                                    className={styles.menuIcon}
                                    style={{ backgroundColor: item.disabled ? '#94a3b8' : item.color }}
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
                                className={`${styles.menuItem} ${isActive(item.path) ? styles.menuItemActive : ''}`}
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
                    <button 
                        className={styles.quickActionButton}
                        onClick={() => router.push('/driverForm')} // Redirige vers l'ajout de chauffeur existant
                    >
                        <FontAwesomeIcon icon={faPlus} className={styles.quickActionIcon} />
                        <span>Action rapide</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}