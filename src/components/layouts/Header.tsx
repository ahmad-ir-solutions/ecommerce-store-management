import { useAuthStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { logout } from "@/pages/auth/core/_requests";

interface HeaderProps {
  title: string;
  showUserInfo?: boolean;
  className?: string;
}

export function Header({ title, showUserInfo = true, className = "" }: HeaderProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  return (
    <header className={`shadow-sm ${className}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        {showUserInfo && user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
} 