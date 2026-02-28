import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

export { Card, CardContent };
