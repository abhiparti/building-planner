import React from 'react';

const DrawingList = ({ drawings, handleLoad, handleDeleteDrawing }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg mb-2">Saved Drawings</h3>
      <ul className="list-disc pl-5">
        {drawings.map((d) => (
          <li key={d._id} className="flex justify-between">
            <span
              onClick={() => handleLoad(d._id)}
              className="text-blue-500 cursor-pointer"
            >
              {d.name}
            </span>
            <button
              onClick={() => handleDeleteDrawing(d._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrawingList;