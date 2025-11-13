// src/layouts/UserLayout.tsx
import { Outlet } from 'react-router';

export default function UserLayout() {
  return (
    <div>
      {/* User Navbar */}
      {/* Theme Toggle */}

      <main>
        <Outlet />
      </main>

      {/* User Footer */}
    </div>
  );
}
