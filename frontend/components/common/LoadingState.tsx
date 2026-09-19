'use client';

import React from 'react';
import { Loader2, AlertTriangle, Inbox, RefreshCw } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  isAsyncJob?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data...',
  subMessage = 'Fetching the latest updates from CareerLens backend engine.',
  isAsyncJob = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-neutral-900/50 border border-neutral-800/80 my-6">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-primary-500/20 border-t-primary-500 animate-spin flex items-center justify-center" />
        {isAsyncJob && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-400 animate-ping" />
          </div>
        )}
      </div>
      <h4 className="text-base font-semibold text-white mt-4">{message}</h4>
      <p className="text-xs text-neutral-400 max-w-sm mt-1 leading-relaxed">{subMessage}</p>
      {isAsyncJob && (
        <div className="mt-4 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-400 text-[11px] font-mono flex items-center gap-1.5">
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>Processing async background pipeline...</span>
        </div>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load content',
  message = 'An unexpected error occurred while communicating with the backend.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center rounded-2xl bg-red-950/20 border border-red-900/40 my-6">
      <div className="p-3 rounded-full bg-red-500/10 text-red-400 mb-3 border border-red-500/20">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-white">{title}</h4>
      <p className="text-xs text-neutral-400 max-w-sm mt-1">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white border border-neutral-700 transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Operation</span>
        </button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  message = 'There is currently no data to display in this view.',
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-neutral-900/30 border border-dashed border-neutral-800 my-6">
      <div className="p-3 rounded-full bg-neutral-800 text-neutral-400 mb-3">
        <Inbox className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <p className="text-xs text-neutral-500 max-w-sm mt-1">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-xs font-medium text-white transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
