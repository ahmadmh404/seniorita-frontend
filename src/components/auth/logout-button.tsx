import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function LogoutButton() {
  const handleLogout = () => {
    // TODO: add logout logic here
  };

  return (
    <Button
      variant="outline"
      className="w-full bg-transparent text-muted-foreground hover:text-primary"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4 ml-2" />
      تسجيل الخروج
    </Button>
  );
}
