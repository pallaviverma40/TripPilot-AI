import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="text-4xl">⚠️</div>
      <p className="text-red-400 font-medium">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
