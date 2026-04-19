// Compatibility shim — the current platform uses sonner for toasts.
// V2 pages import from @/hooks/use-toast, so we re-export a compatible API.
import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: ({ title, description, variant }: { title?: string; description?: string; variant?: "default" | "destructive" }) => {
      if (variant === "destructive") {
        sonnerToast.error(title || "Error", { description });
      } else {
        sonnerToast.success(title || "", { description });
      }
    },
  };
}

export const toast = ({
  title,
  description,
  variant,
}: {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}) => {
  if (variant === "destructive") {
    sonnerToast.error(title || "Error", { description });
  } else {
    sonnerToast(title || "", { description });
  }
};
