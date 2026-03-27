import { NavLink } from 'react-router-dom';
import { HomeIcon, ExploreIcon, LibraryIcon, SettingsIcon } from '../Icons.jsx';
import styles from './BottomNav.module.css';

const tabs = [
  { to: '/', icon: HomeIcon, label: 'Home', exact: true },
  { to: '/search', icon: ExploreIcon, label: 'Explore' },
  { to: '/library', icon: LibraryIcon, label: 'Library' },
  { to: '/settings', icon: SettingsIcon, label: 'Settings' },
];

export function BottomNav() {
  return (
    <nav className={styles.nav}>
      {tabs.map(({ to, icon: Icon, label, exact }) => (
        <NavLink
          key={to}
          to={to}
          end={exact}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActive : ''}`
          }
        >
          <Icon size={22} />
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
