import React, { useState } from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

const initialAgents = [
  { id: 1, icon: '🧠', name: 'Supervisor Agent', status: 'Running', lastAction: 'Delegating tasks', time: '12s' },
  { id: 2, icon: '✈️', name: 'Flight Agent', status: 'Complete', lastAction: 'Found 15 flights', time: '4s' },
  { id: 3, icon: '🚆', name: 'Train Agent', status: 'Idle', lastAction: '-', time: '-' },
  { id: 4, icon: '🚌', name: 'Bus Agent', status: 'Idle', lastAction: '-', time: '-' },
  { id: 5, icon: '🏨', name: 'Hotel Agent', status: 'Running', lastAction: 'Scanning properties', time: '8s' },
  { id: 6, icon: '🎯', name: 'Activity Agent', status: 'Idle', lastAction: '-', time: '-' },
  { id: 7, icon: '🌦️', name: 'Weather Agent', status: 'Complete', lastAction: 'Fetched forecast', time: '2s' },
  { id: 8, icon: '💰', name: 'Budget Agent', status: 'Running', lastAction: 'Calculating totals', time: '5s' },
  { id: 9, icon: '📅', name: 'Itinerary Agent', status: 'Idle', lastAction: 'Waiting for inputs', time: '-' },
  { id: 10, icon: '🔄', name: 'Replanning Agent', status: 'Idle', lastAction: '-', time: '-' },
];

function AgentMonitor() {
  const [agents, setAgents] = useState(initialAgents);

  const simulateProgress = () => {
    setAgents(prev => prev.map(a => {
      if (a.status === 'Running') return { ...a, status: 'Complete', lastAction: 'Finished task' };
      if (a.status === 'Idle' && Math.random() > 0.5) return { ...a, status: 'Running', lastAction: 'Started task', time: '1s' };
      return a;
    }));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Complete': return <Check className="w-4 h-4 text-green-400" />;
      case 'Running': return <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />;
      case 'Error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Agent Monitor</h1>
          <p className="text-slate-400">Developer dashboard for autonomous travel agents.</p>
        </div>
        <button onClick={simulateProgress} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
          Simulate Step
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700">
              <th className="p-4 text-slate-300 font-medium">Agent</th>
              <th className="p-4 text-slate-300 font-medium">Status</th>
              <th className="p-4 text-slate-300 font-medium">Last Action</th>
              <th className="p-4 text-slate-300 font-medium text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {agents.map(agent => (
              <tr key={agent.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{agent.icon}</span>
                    <span className="font-medium text-white">{agent.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(agent.status)}
                    <span className={`text-sm ${agent.status === 'Complete' ? 'text-green-400' : agent.status === 'Running' ? 'text-indigo-400' : 'text-slate-400'}`}>
                      {agent.status}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-300">{agent.lastAction}</td>
                <td className="p-4 text-sm text-slate-400 text-right">{agent.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AgentMonitor;
