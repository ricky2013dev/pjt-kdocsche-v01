import { useEffect } from "react";

const ICONS = {
  warning: (
    <svg className="w-7 h-7 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  error: (
    <svg className="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  success: (
    <svg className="w-7 h-7 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  info: (
    <svg className="w-7 h-7 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
};

const BG = {
  warning: "bg-amber-50",
  error:   "bg-red-50",
  success: "bg-teal-50",
  info:    "bg-blue-50",
};

/**
 * AlertModal — reusable modal for alerts/confirmations.
 *
 * Props:
 *   open        boolean          — show/hide
 *   type        warning|error|success|info  (default: warning)
 *   title       string           — bold heading
 *   message     string           — body text
 *   confirmLabel string          — primary button label (default: 확인)
 *   cancelLabel  string|null     — show a cancel button if provided
 *   onConfirm   () => void
 *   onCancel    () => void       — also called on backdrop click
 */
const AlertModal = ({
  open,
  type = "warning",
  title = "알림",
  message,
  confirmLabel = "확인",
  cancelLabel = null,
  onConfirm,
  onCancel,
}) => {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onCancel?.();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="alertdialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center text-center">
        {/* Icon */}
        <div className={`w-14 h-14 ${BG[type]} rounded-full flex items-center justify-center mb-4`}>
          {ICONS[type]}
        </div>

        {/* Text */}
        <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
        {message && (
          <p className="text-sm text-slate-500 leading-relaxed mb-6">{message}</p>
        )}

        {/* Actions */}
        <div className={`w-full flex gap-2 ${cancelLabel ? "flex-row" : "flex-col"}`}>
          {cancelLabel && (
            <button
              onClick={onCancel}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-all text-sm"
            >
              {cancelLabel}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl transition-all active:scale-[0.98] text-sm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
