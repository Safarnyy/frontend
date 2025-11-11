import LoginModal from "../../../features/user/auth/components/LoginModal";

export default function UserNavbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b bg-background">
      <div className="text-xl font-bold text-primary">TourEase</div>
      <div className="flex gap-3">
        <LoginModal />
        {/*TODO: <RegisterModal /> */}
      </div>
    </nav>
  );
}
