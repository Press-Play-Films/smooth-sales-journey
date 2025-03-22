
import React from 'react';

const Index: React.FC = () => {
  console.log("Rendering Index page");
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-600">Brio Sales Management</h1>
      <p className="mt-4">
        Welcome to the Brio Sales Management application.
      </p>
    </div>
  );
};

export default Index;
