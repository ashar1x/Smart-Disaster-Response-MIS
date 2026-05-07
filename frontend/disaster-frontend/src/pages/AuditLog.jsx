import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const AuditLog = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/audit');
      setLogs(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const actionBadge = (action) => {
    const colorMap = {
      'INSERT': '#22c55e', // green
      'UPDATE': '#3b82f6', // blue
      'DELETE': '#ef4444', // red
      'LOGIN': '#eab308'   // yellow
    };
    const color = colorMap[action] || '#8b5cf6'; // purple default
    return (
      <span className="mono" style={{ 
        color: color, 
        backgroundColor: `${color}1A`, 
        padding: '2px 8px', 
        borderRadius: '12px',
        fontWeight: 600,
        fontSize: '0.85em'
      }}>
        {action}
      </span>
    );
  };

  const filteredLogs = filterAction ? logs.filter(log => log.action_type === filterAction) : logs;
  const uniqueActions = Array.from(new Set(logs.map(l => l.action_type))).filter(Boolean).sort();

  return (
    <>
      <Navbar active="audit log" />
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">System Audit Log</h1>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4a4845' }}>
            {new Date().toLocaleString()}
          </span>
        </div>

        <div className="filter-row">
          <div className="form-group">
            <label>Filter Action</label>
            <select value={filterAction} onChange={e => setFilterAction(e.target.value)}>
              <option value="">All Actions</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header">
            <span className="card-title">Audit Trail</span>
            <span className="mono">{filteredLogs.length} records</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Action</th>
                  <th>Table</th>
                  <th>Record ID</th>
                  <th>Performed By</th>
                  <th>Details</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7"><div className="empty">loading logs...</div></td></tr>
                ) : filteredLogs.length === 0 ? (
                  <tr><td colSpan="7"><div className="empty">no audit logs found</div></td></tr>
                ) : filteredLogs.map(log => (
                  <tr key={log.log_id}>
                    <td className="mono" style={{ color: '#7a7870' }}>{String(log.log_id).padStart(5, '0')}</td>
                    <td>{actionBadge(log.action_type)}</td>
                    <td className="mono">{log.table_name || '—'}</td>
                    <td className="mono" style={{ color: '#e8460a' }}>{log.record_id || '—'}</td>
                    <td>
                      <div>{log.user_name || 'System'}</div>
                      <div className="mono" style={{ fontSize: '0.8em', color: '#7a7870' }}>{log.role_name || ''}</div>
                    </td>
                    <td>
                      {log.old_value && (
                        <div style={{ fontSize: '0.85em', color: '#ef4444', marginBottom: 4 }}>
                          <span className="mono">OLD:</span> {log.old_value}
                        </div>
                      )}
                      {log.new_value && (
                        <div style={{ fontSize: '0.85em', color: '#22c55e' }}>
                          <span className="mono">NEW:</span> {log.new_value}
                        </div>
                      )}
                    </td>
                    <td className="mono" style={{ whiteSpace: 'nowrap' }}>
                      {new Date(log.log_time).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuditLog;
