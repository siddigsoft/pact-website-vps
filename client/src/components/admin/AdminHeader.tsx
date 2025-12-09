import React from 'react';

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  title, 
  description 
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      {description && (
        <p className="text-gray-500 text-lg">{description}</p>
      )}
      <div className="h-1 w-20 bg-primary mt-4"></div>
    </div>
  );
};

export default AdminHeader; 