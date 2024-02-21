'use client';

import React, { useState } from 'react';

const FormComponent: React.FC = () => {
  const [numberOfComponents, setNumberOfComponents] = useState<number>(1);
  const [inputs, setInputs] = useState<string[]>(['']);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setNumberOfComponents(value);
    setInputs(new Array(value).fill(''));
  };

  return (
    <div>
      <label>Number of Components: 
        <input type="number" value={numberOfComponents} onChange={handleNumberInputChange} />
      </label>
      <form>
        {Array.from({ length: numberOfComponents }).map((_, index) => (
          <input
            key={index}
            type="text"
            value={inputs[index]}
            onChange={(event) => handleInputChange(index, event.target.value)}
          />
        ))}
      </form>
    </div>
  );
};

export default FormComponent;
