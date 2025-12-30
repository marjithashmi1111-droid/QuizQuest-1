
import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ value, children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>
    {children}
  </div>
);

/**
 * Updated TabsTrigger to support onClick and activeValue for full interactivity.
 */
export const TabsTrigger: React.FC<{ 
  value: string; 
  children: React.ReactNode; 
  className?: string; 
  activeValue?: string; 
  "data-state"?: string;
  onClick?: () => void;
}> = ({ value, children, className = '', activeValue, "data-state": dataState, onClick }) => {
  // Determine if the tab is active based on provided props
  const isActive = dataState === 'active' || (activeValue !== undefined && activeValue === value);
  
  return (
    <button 
      type="button"
      onClick={onClick}
      data-state={isActive ? 'active' : 'inactive'}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{ value: string; children: React.ReactNode; activeValue?: string }> = ({ value, children, activeValue }) => {
  if (value !== activeValue) return null;
  return <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">{children}</div>;
};
