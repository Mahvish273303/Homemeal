import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaChartPie,
  FaShoppingCart,
  FaUtensils,
} from 'react-icons/fa';
import SubscriptionDashboard from './SubscriptionDashboard';
import HomemakerDashboard from './HomemakerDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isHomemaker = user.role === 'homemaker';
  const isAdmin = user.role === 'admin';

  const studentNav = [
    { path: '/dashboard', label: 'My subscriptions', icon: <FaShoppingCart /> },
    { path: '/meals', label: 'Browse meals', icon: <FaUtensils /> },
  ];
  const homemakerNav = [
    { path: '/dashboard', label: 'My dashboard', icon: <FaChartPie /> },
  ];
  const adminNav = [
    { path: '/dashboard', label: 'Admin', icon: <FaChartPie /> },
  ];

  const nav = isAdmin ? adminNav : isHomemaker ? homemakerNav : studentNav;

  const renderContent = () => {
    if (isAdmin) return <AdminDashboard />;
    if (isHomemaker) return <HomemakerDashboard />;
    return <SubscriptionDashboard />;
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-56 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
        <h1 className="text-xl font-bold text-[#dfd218] mb-6">HomeMeal</h1>
        <p className="text-gray-400 text-sm mb-4">{user.name} ({user.role})</p>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? 'bg-[#dfd218] text-black'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <Link
            to="/meals"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition"
          >
            <FaUtensils />
            <span>Browse meals</span>
          </Link>
        </nav>
        <button
          onClick={logout}
          className="mt-auto px-3 py-2 rounded-lg text-red-400 hover:bg-gray-700 text-left w-full"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
