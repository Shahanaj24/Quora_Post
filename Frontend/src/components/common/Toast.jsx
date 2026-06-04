import { createContext, useEffect, useMemo, useState } from 'react';

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? <Toast message={toast.message} type={toast.type} /> : null}
    </ToastContext.Provider>
  );
}

function Toast({ message, type }) {
  const palette = type === 'error' ? 'bg-rose-500/95 text-white' : 'bg-cyan-500/95 text-slate-950';

  return (
    <div className="fixed right-4 top-4 z-50 w-fit rounded-3xl px-5 py-4 shadow-soft shadow-cyan-500/20 backdrop-blur-sm">
      <div className={`flex items-center gap-3 rounded-3xl px-4 py-3 ${palette}`}>
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950/90">
          {type === 'error' ? 'Error' : 'Success'}
        </span>
        <p className="max-w-xs text-sm leading-6">{message}</p>
      </div>
    </div>
  );
}
