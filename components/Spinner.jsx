import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
