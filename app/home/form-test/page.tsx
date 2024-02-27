'use client';

import { useState } from "react";
import { Button } from '@/app/ui/button';

export default function AddDynamicInputFields() {
  const [pairs, setPairs] = useState([{ term: "", definition: "" }]);

  const handleAddPair = () => {
    setPairs([...pairs, { term: "", definition: "" }]);
  };

  const handleChange = (event: any, index: number) => {
    let { name, value } = event.target;
    console.log(event.target)
    let onChangeValue = [...pairs];
    onChangeValue[index][name] = value;
    console.log(name);
    setPairs(onChangeValue);
  };

  const handleDeletePair = (index: number) => {
    const newArray = [...pairs];
    newArray.splice(index, 1);
    setPairs(newArray);
  };


  return (
    <div className="container">
      {pairs.map((item, index) => (
        <div className="input_container" key={index}>
          <input
            name="term"
            type="string"
            value={item.term}
            onChange={(event) => handleChange(event, index)}
            placeholder="Enter term"
            className="placeholder:text-black text-black"
          />
          <input
            name="definition"
            type="string"
            value={item.definition}
            onChange={(event) => handleChange(event, index)}
            placeholder="Enter definition"
            className="placeholder:text-black text-black"
          />
          {pairs.length > 1 && (
            <Button onClick={() => handleDeletePair(index)}>Delete</Button>
          )}
          {index === pairs.length - 1 && (
            <Button onClick={() => handleAddPair()}>Add</Button>
          )}
        </div>
      ))}

      <p>This is what the data looks like</p>
      <div className="body"> {JSON.stringify(pairs)} </div>
    </div>
  );
}