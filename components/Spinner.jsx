import React from 'react';

export default function Spinner(){
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-solid border-blue-500 border-t-transparent md`}
        style={{ animation: 'spin 1s linear infinite' }}
      ></div>
    </div>
  );
};