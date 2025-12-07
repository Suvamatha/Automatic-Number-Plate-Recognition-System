import { Activity, Car, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { title: 'Total Scans', value: '1,234', icon: <Car size={24} />, color: 'var(--cyan)' },
        { title: 'Success Rate', value: '98.5%', icon: <CheckCircle size={24} />, color: '#10b981' }, // emerald-500
        { title: 'Avg Time', value: '0.8s', icon: <Clock size={24} />, color: '#f59e0b' }, // amber-500
        { title: 'Active Hours', value: '24/7', icon: <Activity size={24} />, color: '#8b5cf6' }, // violet-500
    ];

    const recentScans = [
        { id: 1, plate: 'BA 2 PA 1234', time: '2 mins ago', status: 'Success', confidence: '99%' },
        { id: 2, plate: 'BA 1 JA 5678', time: '5 mins ago', status: 'Success', confidence: '98%' },
        { id: 3, plate: 'BA 3 CHA 9012', time: '12 mins ago', status: 'Review', confidence: '75%' },
        { id: 4, plate: 'NA 1 PA 3456', time: '1 hour ago', status: 'Success', confidence: '99%' },
    ];

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ borderTop: `4px solid ${stat.color}` }}>
                        <div className="stat-header">
                            <span className="stat-title">{stat.title}</span>
                            <div className="stat-icon" style={{ color: stat.color }}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
                <h3>Recent Scans</h3>
                <div className="table-container">
                    <table className="activity-table">
                        <thead>
                            <tr>
                                <th>Plate Number</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Confidence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentScans.map((scan) => (
                                <tr key={scan.id}>
                                    <td className="font-mono">{scan.plate}</td>
                                    <td>{scan.time}</td>
                                    <td>
                                        <span
                                            className={`status-badge ${scan.status === 'Success' ? 'status-success' : 'status-review'}`}
                                        >
                                            {scan.status}
                                        </span>
                                    </td>
                                    <td>{scan.confidence}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
