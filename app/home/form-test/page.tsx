'use client';

import { useState } from "react";
import { Button } from '@/app/ui/button';
import { createTest } from "@/app/lib/actions";

export default function Form() {
  const [pairs, setPairs] = useState<{ term: string; definition: string; }[]>([{ term: "", definition: "" }]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    let data = [...pairs];
    (data[index] as any)[event.target.name] = event.target.value;
    setPairs(data);
  };

  const handleAddPair = () => {
      let newPair = { term: "", definition: ""};
      setPairs([...pairs, newPair]);
    };

  const handleDeletePair = (index: number, event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let data = [...pairs];
    data.splice(index, 1);
    setPairs(data);
  };

  // const submit = (e: any) => {
  //   e.preventDefault();
  //   console.log(pairs);
  // }

  return (
    <form action={createTest}>
      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-black">
          Title
        </label>
        <div className="relative">
          <input
              id="title"
              name="title"
              type="string"
              placeholder="Enter title"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
          />
        </div>
      </div>
      <div className="container">
        {pairs.map((input, index) => (
          <div key={index}>
            <input
              name="term"
              value={input.term}
              onChange={event => handleChange (index, event)}
              placeholder="Enter term"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
            />
            <input
              name="definition"
              value={input.definition}
              onChange={event => handleChange (index, event)}
              placeholder="Enter definition"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
            />
            {pairs.length > 1 && (
              <Button onClick={(event) => handleDeletePair(index, event)}>Delete</Button>
            )}
            {index === pairs.length - 1 && (
              <Button onClick={handleAddPair}>Add</Button>
            )}
          </div>
        ))}

        {/* <p>This is what the data looks like</p>
        <div className="body"> {JSON.stringify(pairs)} </div> */}
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}