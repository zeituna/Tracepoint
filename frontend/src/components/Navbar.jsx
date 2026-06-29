import React from 'react'
import { Menu, Bell, Sun, Moon, User } from 'lucide-react'

const Navbar = ({ toggleSidebar, isDark, toggleTheme }) => {
  return (
    <nav style={{
      background: 'white',
      padding: '12px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <Menu size={24} color="#4b5563" />
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>Dashboard</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          {isDark ? <Sun size={20} color="#4b5563" /> : <Moon size={20} color="#4b5563" />}
        </button>
        
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            position: 'relative'
          }}
        >
          <Bell size={20} color="#4b5563" />
          <span style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '8px',
            height: '8px',
            background: '#ef4444',
            borderRadius: '50%'
          }}></span>
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingLeft: '12px',
          borderLeft: '1px solid #e5e7eb'
        }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>Admin User</p>
            <p style={{ fontSize: '12px', color: '#6b7280' }}>Administrator</p>
          </div>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600'
          }}>
            <User size={18} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
