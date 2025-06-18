import React from 'react';

const Toolbar = ({
  tool,
  setTool,
  showAnnotations,
  setShowAnnotations,
  handleClear,
  drawingName,
  setDrawingName,
  handleSave,
  handleDeleteShape,
  hasSelectedShape,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className='flex justify-center'>TOOLBAR</h1>
      <div className="flex flex-col gap-2">
        <button
          className={`px-4 py-2 rounded ${tool === 'line' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-200'}`}
          onClick={() => setTool('line')}
        >
          Line
        </button>
        <button
          className={`px-4 py-2 rounded ${tool === 'rectangle' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-200'}`}
          onClick={() => setTool('rectangle')}
        >
          Rectangle
        </button>
        <button
          className={`px-4 py-2 rounded ${tool === 'circle' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-200'}`}
          onClick={() => setTool('circle')}
        >
          Circle
        </button>
        <button
          className={`px-4 py-2 rounded ${tool === 'triangle' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-200'}`}
          onClick={() => setTool('triangle')}
        >
          Triangle
        </button>
        <button
          className={`px-4 py-2 rounded ${tool === 'select' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-200'}`}
          onClick={() => setTool('select')}
        >
          Select
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showAnnotations}
            onChange={() => setShowAnnotations(!showAnnotations)}
          />
          Show Annotations
        </label>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => {
            console.log('Clear canvas clicked');
            handleClear();
          }}
        >
          Clear Canvas
        </button>
        <button
          className={`px-4 py-2 rounded ${hasSelectedShape ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          onClick={() => {
            console.log('Delete button clicked');
            handleDeleteShape();
          }}
          disabled={!hasSelectedShape}
        >
          Delete Selected Shape
        </button>
      </div>
      <div className="mt-6 flex flex-col gap-2 border-t-4">
        <input
          type="text"
          value={drawingName}
          onChange={(e) => setDrawingName(e.target.value)}
          placeholder="Drawing Name"
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => handleSave()}
        >
          Save Drawing
        </button>
      </div>
    </div>
  );
};

export default Toolbar;