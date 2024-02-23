'use client';

import React, { useState } from 'react';
import { Button } from '@/app/ui/button';

const MyComponent: React.FC = () => {
  const [components, setComponents] = useState<JSX.Element[]>([]);

  const handleAddComponent = () => {
    // Add a new component to the existing list of components
    setComponents(prevComponents => [...prevComponents, <NewComponent key={prevComponents.length} onDelete={() => handleDeleteComponent(prevComponents.length)} />]);
  };

  const handleDeleteComponent = (index: number) => {
    // Filter out the component at the specified index
    setComponents(prevComponents => prevComponents.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Render existing components */}
      {components.map((component, index) => (
        <div key={index}>
          {component}
        </div>
      ))}

      {/* Button to add a new component */}
      <Button onClick={handleAddComponent}>Add Component</Button>
    </div>
  );
};

interface NewComponentProps {
  onDelete: () => void;
}

const NewComponent: React.FC<NewComponentProps> = ({ onDelete }) => {
  return (
    <div>
      {/* Content of the new component */}
      <p>New Component</p>
      {/* Button to delete the component */}
      <Button onClick={onDelete}>Delete Component</Button>
    </div>
  );
};

export default MyComponent;
