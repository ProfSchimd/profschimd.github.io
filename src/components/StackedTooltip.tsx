"use client";

import React, { useState } from 'react';


const StackedTooltip = ({ data }: { data: { name: string; description: string }[] }) => {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500'
  ];

  const handleClick = (index: number) => {
    if (pinnedIndex === index) {
      setPinnedIndex(null);
    } else {
      setPinnedIndex(index);
    }
  };

  const shouldShowTooltip = (index: number) => {
    return pinnedIndex === index || (pinnedIndex === null && hoveredIndex === index);
  };

  return (
    <div className="flex flex-col-reverse gap-1 p-8">
      {data.map((item, index) => (
        <div key={index} className="relative">
          <div
            className={`${colors[index % colors.length]} w-2/3 text-white p-1 rounded-lg shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(index)}
          >
            <h2 className="text-2xl font-bold text-center">{item.name}</h2>
          </div>

          {shouldShowTooltip(index) && (
            <div className="absolute left-2/3 top-1/2 transform -translate-y-1/2 ml-4 z-10">
              <div className="bg-gray-800 dark:bg-gray-300 text-gray-200 dark:text-gray-800 p-1 rounded-lg shadow-lg max-w-xs">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
                  <div className="w-2 h-2 bg-gray-800 dark:bg-gray-300 rotate-45"></div>
                </div>
                <p className="text-base">{item.description}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StackedTooltip;