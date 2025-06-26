
import React from 'react';
import UsageCounter from './UsageCounter';

const PlannerHeader: React.FC = () => {
  return (
    <header className="text-center mb-6 md:mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        <span className="text-white">MUV</span>
        <span className="text-green-400">.</span>
        <span className="text-white">Planner</span>
      </h1>
      <p className="text-gray-400 mt-2 text-lg">Il tuo assistente nutrizionale intelligente</p>
      
      <div className="mt-4">
        <UsageCounter />
      </div>
    </header>
  );
};

export default PlannerHeader;
