import { Button } from "./ui/button";

interface LoginButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

export default function LoginButton({ 
  className = "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg shadow-cyan-500/30 transition-all",
  variant,
  size,
  children = "LOGIN"
}: LoginButtonProps) {
  const handleLogin = () => {
    window.location.href = '/signin';;
  };
  
  return (
    <>
      {variant ? (
        <Button 
          onClick={handleLogin}
          variant={variant}
          size={size}
          className={className}
        >
          {children}
        </Button>
      ) : (
        <button 
          onClick={handleLogin}
          className={className}
        >
          {children}
        </button>
      )}
    </>
  );
}

// Export a hook for programmatic login control
export function useLoginModal() {
  return {
    showLogin: false,
    openLogin: () => { window.location.href = '/signin';; },
    closeLogin: () => {},
    LoginModal: () => null
  };
}
