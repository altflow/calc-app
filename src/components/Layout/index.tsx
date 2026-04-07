import React, { useState } from 'react';
import AspectRatio from '../../features/AspectRatio';
import styles from './Layout.module.css';

type MenuItem = {
  id: string;
  label: string;
  component: React.ComponentType;
};

const menuItems: MenuItem[] = [
  { id: 'aspectRatio', label: 'Aspect Ratio', component: AspectRatio },
  { id: 'costPerYear', label: 'Cost Per Year', component: () => <div>Cost Per Year Component Coming Soon</div> },
  { id: 'networkAddress', label: 'Network Address', component: () => <div>Network Address Component Coming Soon</div> },
  { id: 'packetsToBytes', label: 'Packets to Bytes', component: () => <div>Packets to Bytes Component Coming Soon</div> },
  { id: 'pixelPerInch', label: 'Pixel Per Inch', component: () => <div>Pixel Per Inch Component Coming Soon</div> },
];

const Layout: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('aspectRatio');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (id: string) => {
    setSelectedMenu(id);
    setIsSidebarOpen(false); // スマホでメニュー選択後に閉じる
  };

  const selectedComponent = menuItems.find(item => item.id === selectedMenu)?.component;

  return (
    <div className={styles.layout}>
      <button className={styles.hamburger} onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.mobileOpen : ''}`}>
        <h2>Menu</h2>
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
      <div className={styles.content}>
        {selectedComponent && React.createElement(selectedComponent)}
      </div>
    </div>
  );
};

export default Layout;
