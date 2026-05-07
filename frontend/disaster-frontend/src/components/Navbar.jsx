import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ active }) => {
  const { user, logout } = useAuth();

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    ...(['Administrator', 'Emergency Operator', 'Field Officer'].includes(user?.role)
      ? [{ href: '/emergencies', label: 'Emergencies' }] : []),
    ...(['Administrator', 'Warehouse Manager', 'Field Officer'].includes(user?.role)
      ? [{ href: '/resources', label: 'Resources' }] : []),
    ...(['Administrator', 'Emergency Operator', 'Field Officer'].includes(user?.role)
      ? [{ href: '/teams', label: 'Teams' }] : []),
    ...(['Administrator', 'Emergency Operator'].includes(user?.role)
      ? [{ href: '/hospitals', label: 'Hospitals' }] : []),
    ...(['Administrator', 'Finance Officer', 'Warehouse Manager'].includes(user?.role)
      ? [{ href: '/finance', label: 'Finance' }] : []),
    { href: '/approvals', label: 'Approvals' },
    ...(user?.role === 'Administrator' ? [{ href: '/audit', label: 'Audit Log' }] : []),
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="dot" />
        DR-MIS
      </div>
      <div className="navbar-links">
        {links.map(l => (
          <a key={l.href} href={l.href} className={active === l.label.toLowerCase() ? 'active' : ''}>
            {l.label}
          </a>
        ))}
      </div>
      <div className="navbar-right">
        <span className="user-badge">
          {user?.full_name} · <span>{user?.role}</span>
        </span>
        <button className="btn-logout" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;