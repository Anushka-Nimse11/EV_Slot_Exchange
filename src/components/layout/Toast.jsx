import { Check } from "lucide-react";
import { X } from "lucide-react";

function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div
      className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-[hsl(var(--secondary))] px-4 py-3 text-sm font-medium text-white shadow-xl rise"
      role="status"
      data-testid="status-toast"
    >
      <Check size={17} className="text-[hsl(var(--accent))]" />
      {message}
      <button
        aria-label="Close notification"
        onClick={onClose}
        data-testid="button-close-toast"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;
