import React, { useState } from 'react';
import AspectRatio from '../../features/AspectRatio';
import CostPerYear from '../../features/CostPerYear';
import NetworkAddress from '../../features/NetworkAddress';
import PacketsToBytes from '../../features/PacketsToBytes';
import PixelPerInch from '../../features/PixelPerInch';
import styles from './Layout.module.css';

type MenuItem = {
  id: string;
  label: string;
  component: React.ComponentType;
};

const menuItems: MenuItem[] = [
  { id: 'aspectRatio', label: 'Aspect Ratio', component: AspectRatio },
  { id: 'costPerYear', label: 'Cost Per Year', component: CostPerYear },
  { id: 'networkAddress', label: 'Network Address', component: NetworkAddress },
  { id: 'packetsToBytes', label: 'Packets to Bytes', component: PacketsToBytes },
  { id: 'pixelPerInch', label: 'Pixel Per Inch', component: PixelPerInch },
];

const Layout: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('aspectRatio');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (id: string) => {
    setSelectedMenu(id);
    setIsSidebarOpen(false);
  };

  const selectedComponent = menuItems.find(item => item.id === selectedMenu)?.component;

  return (
    <div className={styles.layout}>
      <button className={`${styles.hamburger} ${isSidebarOpen ? styles.hidden : ''}`} onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.mobileOpen : ''}`}>
        <h2 className={styles.menuTitle}>Menu</h2>
        <ul>
          {menuItems.map(item => (
            <li
              key={item.id}
              className={`${styles.menuItem} ${selectedMenu === item.id ? styles.selected : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.content} onClick={() => setIsSidebarOpen(false)}>
        {selectedComponent && React.createElement(selectedComponent)}
      </div>
    </div>
  );
};

export default Layout;
