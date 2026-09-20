import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('React Runtime Error Boundary caught an exception:', error, errorInfo);
  }

  private handleResetState = () => {
    try {
      localStorage.removeItem('user_uploaded_resume');
      localStorage.removeItem('careeroptic_token');
      localStorage.removeItem('careeroptic_user');
    } catch (e) {
      console.warn('Failed to clear storage:', e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060911] text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full glass-panel rounded-3xl p-8 border border-amber-500/30 shadow-2xl space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-white">Application State Refresh Required</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                A transient browser session error was encountered. Click below to refresh your session state.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-left font-mono text-[11px] text-amber-300/80 overflow-x-auto max-h-24">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md shadow-amber-600/20"
              >
                <RefreshCw className="w-4 h-4" /> Reload Page
              </button>
              <button
                onClick={this.handleResetState}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
              >
                <Trash2 className="w-4 h-4" /> Reset Cache & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
