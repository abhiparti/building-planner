import React from 'react';

function Toolbar({
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
}) {
  const handleToolClick = (newTool) => {
    console.log(`Toolbar: Setting tool to ${newTool}`);
    if (setTool) setTool(newTool);
    else console.error('setTool is not a function');
  };

  const handleDeleteClick = () => {
    console.log('Delete button clicked, hasSelectedShape:', hasSelectedShape);
    if (handleDeleteShape) handleDeleteShape();
    else console.error('handleDeleteShape is not a function');
  };

  const handleToggleAnnotations = () => {
    console.log('Toggling annotations, current:', showAnnotations);
    if (setShowAnnotations) setShowAnnotations(!showAnnotations);
    else console.error('setShowAnnotations is not a function');
  };

  const handleClearClick = () => {
    console.log('Clear button clicked');
    if (handleClear) handleClear();
    else console.error('handleClear is not a function');
  };

  const handleSaveClick = () => {
    console.log('Save button clicked');
    if (handleSave) handleSave();
    else console.error('handleSave is not a function');
  };

  return (
    <div className="flex flex-col items-center space-y-2 mb-4">
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded ${tool === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleToolClick('line')}
        >
          Line
        </button>
        <button
          className={`px-4 py-2 rounded ${tool === 'rectangle' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleToolClick('rectangle')}
        >
          Rectangle
        </button>
        <button
          className={`px-4 py-2 rounded ${tool === 'circle' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleToolClick('circle')}
        >
          Circle
        </button>
        <button
          className={`px-4 py-2 rounded ${tool === 'triangle' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleToolClick('triangle')}
        >
          Triangle
        </button>
        <button
          className={`px-4 py-2 rounded ${tool === 'select' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleToolClick('select')}
        >
          Select
        </button>
      </div>
      <div className="flex space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={handleToggleAnnotations}
        >
          {showAnnotations ? 'Hide Annotations' : 'Show Annotations'}
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={handleClearClick}
        >
          Clear Canvas
        </button>
        <button
          className={`px-4 py-2 rounded ${hasSelectedShape ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          onClick={handleDeleteClick}
          disabled={!hasSelectedShape}
        >
          Delete Selected Shape
        </button>
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={drawingName || ''}
          onChange={(e) => setDrawingName && setDrawingName(e.target.value)}
          placeholder="Drawing name"
          className="px-4 py-2 border rounded"
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleSaveClick}
        >
          Save Drawing
        </button>
      </div>
    </div>
  );
}

export default Toolbar;