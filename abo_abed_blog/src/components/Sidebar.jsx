import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
  // Basic style for active NavLink (can be moved to CSS)
  const activeStyle = {
    fontWeight: 'bold',
    color: 'var(--primary-color)', // Example: use CSS variable
    backgroundColor: 'rgba(0, 123, 255, 0.1)' // Light primary color background
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>لوحة تحكم أبو عبد</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/admin/" style={({ isActive }) => isActive ? activeStyle : undefined} end>
              لوحة التحكم الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-content" style={({ isActive }) => isActive ? activeStyle : undefined}>
              إدارة المحتوى
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/statistics" style={({ isActive }) => isActive ? activeStyle : undefined}>
              الإحصائيات
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" style={({ isActive }) => isActive ? activeStyle : undefined}>
              الإعدادات
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/notifications" style={({ isActive }) => isActive ? activeStyle : undefined}>
              الإشعارات والبث
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/seo-control" style={({ isActive }) => isActive ? activeStyle : undefined}>
              لوحة تحكم SEO
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/monetization" style={({ isActive }) => isActive ? activeStyle : undefined}>
              إدارة الإعلانات
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <Link to="/" className="button-secondary">عودة إلى الموقع</Link>
        {/* <button onClick={() => {
          sessionStorage.removeItem('isAdminLoggedIn');
          window.location.href = '/'; // Or to login page
        }}>تسجيل الخروج</button> */}
      </div>
    </aside>
  );
}

export default Sidebar;
