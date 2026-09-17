import React from 'react';

function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      {icon && <div className="text-5xl text-slate-500 mb-2">{icon}</div>}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-slate-400 max-w-sm">{description}</p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
