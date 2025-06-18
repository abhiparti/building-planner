// import React, { useState, useEffect, useRef } from 'react';
// import { Stage, Layer, Line, Rect, Circle, RegularPolygon, Text } from 'react-konva';
// import axios from 'axios';
// import Toolbar from './components/Toolbar';
// import DrawingList from './components/DrawingList';
// import './App.css';

// function App() {
//   const [tool, setTool] = useState('line');
//   const [shapes, setShapes] = useState([]);
//   const [showAnnotations, setShowAnnotations] = useState(true);
//   const [drawingName, setDrawingName] = useState('');
//   const [drawings, setDrawings] = useState([]);
//   const [selectedShapeId, setSelectedShapeId] = useState(null);
//   const stageRef = useRef(null);
//   const startPoint = useRef(null);
//   const tempShape = useRef(null);

//   const handleDeleteShape = () => {
//     if (tool !== 'select' || selectedShapeId === null) {
//       console.log('Delete failed: tool=', tool, 'selectedShapeId=', selectedShapeId);
//       return;
//     }
//     console.log(`Deleting shape id: ${selectedShapeId}`);
//     setShapes(shapes.filter((shape) => shape.id !== selectedShapeId));
//     setSelectedShapeId(null);
//   };

//   const getAnnotation = (shape) => {
//     if (!showAnnotations) return null;
//     let text = '';
//     let x, y;
//     if (shape.type === 'line') {
//       const length = Math.sqrt((shape.points[2] - shape.points[0]) ** 2 + (shape.points[3] - shape.points[1]) ** 2).toFixed(2);
//       text = `Length: ${length}px`;
//       x = (shape.points[0] + shape.points[2]) / 2;
//       y = (shape.points[1] + shape.points[3]) / 2 - 15;
//     } else if (shape.type === 'rectangle') {
//       text = `Width: ${Math.abs(shape.width).toFixed(2)}px\nHeight: ${Math.abs(shape.height).toFixed(2)}px`;
//       x = shape.x + shape.width / 2;
//       y = shape.y - 25;
//     } else if (shape.type === 'circle') {
//       text = `Radius: ${shape.radius.toFixed(2)}px`;
//       x = shape.x;
//       y = shape.y - shape.radius - 15;
//     } else if (shape.type === 'triangle') {
//       const side = Math.sqrt((shape.x - (shape.x + shape.width / 2)) ** 2 + (shape.y - (shape.y + shape.height)) ** 2).toFixed(2);
//       text = `Side: ${side}px`;
//       x = shape.x;
//       y = shape.y - 15;
//     }
//     if (text) {
//       return { text, x, y };
//     }
//     return null;
//   };

//   const handleMouseDown = (e) => {
//     if (tool === 'select') {
//       const target = e.target;
//       if (target.attrs.id && target.attrs.type !== 'annotation') {
//         console.log(`Selected shape: ${target.attrs.type}, id: ${target.attrs.id}`);
//         setSelectedShapeId(target.attrs.id);
//         setShapes(shapes.map((s) => ({ ...s, selected: s.id === target.attrs.id })));
//       } else {
//         console.log('Selection cleared');
//         setSelectedShapeId(null);
//         setShapes(shapes.map((s) => ({ ...s, selected: false })));
//       }
//       return;
//     }
//     const pos = e.target.getStage().getPointerPosition();
//     startPoint.current = pos;
//     console.log(`Drawing started: ${tool} at (${pos.x}, ${pos.y})`);
//   };

//   const handleMouseMove = (e) => {
//     if (!startPoint.current || tool === 'select') return;
//     const pos = e.target.getStage().getPointerPosition();
//     console.log(`Drawing temp shape: ${tool}`);
//     let shape = null;
//     if (tool === 'line') {
//       shape = {
//         type: 'line',
//         points: [startPoint.current.x, startPoint.current.y, pos.x, pos.y],
//         stroke: 'gray',
//         strokeWidth: 2,
//         isTemp: true,
//       };
//     } else if (tool === 'rectangle') {
//       const x = Math.min(startPoint.current.x, pos.x);
//       const y = Math.min(startPoint.current.y, pos.y);
//       const width = Math.abs(pos.x - startPoint.current.x);
//       const height = Math.abs(pos.y - startPoint.current.y);
//       shape = {
//         type: 'rectangle',
//         x,
//         y,
//         width,
//         height,
//         stroke: 'gray',
//         strokeWidth: 2,
//         isTemp: true,
//       };
//     } else if (tool === 'circle') {
//       const radius = Math.sqrt((pos.x - startPoint.current.x) ** 2 + (pos.y - startPoint.current.y) ** 2);
//       shape = {
//         type: 'circle',
//         x: startPoint.current.x,
//         y: startPoint.current.y,
//         radius,
//         stroke: 'gray',
//         strokeWidth: 2,
//         isTemp: true,
//       };
//     } else if (tool === 'triangle') {
//       const width = Math.abs(pos.x - startPoint.current.x) * 2;
//       const height = Math.abs(pos.y - startPoint.current.y);
//       shape = {
//         type: 'triangle',
//         x: startPoint.current.x - width / 2,
//         y: startPoint.current.y,
//         width,
//         height,
//         stroke: 'gray',
//         strokeWidth: 2,
//         isTemp: true,
//       };
//     }
//     tempShape.current = shape;
//   };

//   const handleMouseUp = () => {
//     if (!startPoint.current || tool === 'select') {
//       startPoint.current = null;
//       tempShape.current = null;
//       return;
//     }
//     console.log(`Finalizing shape: ${tool}`);
//     const shape = { ...tempShape.current, id: shapes.length, isTemp: false, stroke: 'black', selected: false };
//     if (shape.type === 'line' && (Math.abs(shape.points[2] - shape.points[0]) > 5 || Math.abs(shape.points[3] - shape.points[1]) > 5)) {
//       setShapes([...shapes, shape]);
//     } else if (shape.type === 'rectangle' && shape.width > 5 && shape.height > 5) {
//       setShapes([...shapes, shape]);
//     } else if (shape.type === 'circle' && shape.radius > 5) {
//       setShapes([...shapes, shape]);
//     } else if (shape.type === 'triangle' && shape.width > 5 && shape.height > 5) {
//       setShapes([...shapes, shape]);
//     }
//     startPoint.current = null;
//     tempShape.current = null;
//   };

//   const handleDragEnd = (e) => {
//     const shape = e.target.attrs;
//     console.log(`Moved shape: ${shape.type}, id: ${shape.id}`);
//     setShapes(shapes.map((s) => {
//       if (s.id !== shape.id) return s;
//       if (shape.type === 'rectangle') {
//         return { ...s, x: shape.x, y: shape.y };
//       } else if (shape.type === 'circle') {
//         return { ...s, x: shape.x, y: shape.y };
//       } else if (shape.type === 'triangle') {
//         return { ...s, x: shape.x, y: shape.y };
//       }
//       return s;
//     }));
//   };

//   const handleTransformEnd = (e) => {
//     const shape = e.target.attrs;
//     console.log(`Resized shape: ${shape.type}, id: ${shape.id}`);
//     setShapes(shapes.map((s) => {
//       if (s.id !== shape.id) return s;
//       if (shape.type === 'rectangle') {
//         return { ...s, x: shape.x, y: shape.y, width: shape.width * shape.scaleX, height: shape.height * shape.scaleY };
//       } else if (shape.type === 'circle') {
//         return { ...s, x: shape.x, y: shape.y, radius: shape.radius * shape.scaleX };
//       } else if (shape.type === 'triangle') {
//         return { ...s, x: shape.x, y: shape.y, width: shape.width * shape.scaleX, height: shape.height * shape.scaleY };
//       }
//       return s;
//     }));
//     e.target.scaleX(1);
//     e.target.scaleY(1);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Delete' && tool === 'select' && selectedShapeId !== null) {
//       console.log('Delete key pressed');
//       handleDeleteShape();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [tool, selectedShapeId]);

//   useEffect(() => {
//     console.log(`Tool changed to: ${tool}`);
//     startPoint.current = null;
//     tempShape.current = null;
//   }, [tool]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/drawings')
//       .then((res) => setDrawings(res.data))
//       .catch((err) => console.error('Error fetching drawings:', err));
//   }, []);

//   const handleSave = async () => {
//     if (!drawingName) return alert('Enter a drawing name');
//     try {
//       const res = await axios.post('http://localhost:5000/api/drawings', {
//         name: drawingName,
//         shapes,
//       });
//       setDrawings([...drawings, res.data]);
//       setDrawingName('');
//       alert('Drawing saved!');
//     } catch (err) {
//       console.error('Error saving drawing:', err);
//       alert('Error saving drawing');
//     }
//   };

//   const handleLoad = async (id) => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/drawings');
//       const drawing = res.data.find((d) => d._id === id);
//       if (!drawing) throw new Error('Drawing not found');
//       setShapes(drawing.shapes);
//       setSelectedShapeId(null);
//     } catch (err) {
//       console.error('Error loading drawing:', err);
//       alert('Error loading drawing');
//     }
//   };

//   const handleDeleteDrawing = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/drawings/${id}`);
//       setDrawings(drawings.filter((d) => d._id !== id));
//       alert('Drawing deleted');
//     } catch (err) {
//       console.error('Error deleting drawing:', err);
//       alert('Error deleting drawing');
//     }
//   };

//   const handleClear = () => {
//     setShapes([]);
//     setDrawingName('');
//     setSelectedShapeId(null);
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold my-4">Building Planner</h1>
//       <Toolbar
//         tool={tool}
//         setTool={setTool}
//         showAnnotations={showAnnotations}
//         setShowAnnotations={setShowAnnotations}
//         handleClear={handleClear}
//         drawingName={drawingName}
//         setDrawingName={setDrawingName}
//         handleSave={handleSave}
//         handleDeleteShape={handleDeleteShape}
//         hasSelectedShape={selectedShapeId !== null}
//       />
//       <Stage
//         width={800}
//         height={600}
//         ref={stageRef}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         style={{ border: '1px solid gray', background: '#fff' }}
//       >
//         <Layer>
//           {shapes.map((shape) => {
//             const isSelected = shape.id === selectedShapeId;
//             if (shape.type === 'line') {
//               return (
//                 <Line
//                   key={shape.id}
//                   id={shape.id}
//                   type="line"
//                   points={shape.points}
//                   stroke={isSelected ? 'red' : shape.stroke}
//                   strokeWidth={shape.strokeWidth}
//                   draggable={tool === 'select'}
//                   onDragEnd={handleDragEnd}
//                 />
//               );
//             } else if (shape.type === 'rectangle') {
//               return (
//                 <Rect
//                   key={shape.id}
//                   id={shape.id}
//                   type="rectangle"
//                   x={shape.x}
//                   y={shape.y}
//                   width={shape.width}
//                   height={shape.height}
//                   stroke={isSelected ? 'red' : shape.stroke}
//                   strokeWidth={shape.strokeWidth}
//                   fill="transparent"
//                   draggable={tool === 'select'}
//                   onDragEnd={handleDragEnd}
//                   onTransformEnd={handleTransformEnd}
//                 />
//               );
//             } else if (shape.type === 'circle') {
//               return (
//                 <Circle
//                   key={shape.id}
//                   id={shape.id}
//                   type="circle"
//                   x={shape.x}
//                   y={shape.y}
//                   radius={shape.radius}
//                   stroke={isSelected ? 'red' : shape.stroke}
//                   strokeWidth={shape.strokeWidth}
//                   fill="transparent"
//                   draggable={tool === 'select'}
//                   onDragEnd={handleDragEnd}
//                   onTransformEnd={handleTransformEnd}
//                 />
//               );
//             } else if (shape.type === 'triangle') {
//               return (
//                 <RegularPolygon
//                   key={shape.id}
//                   id={shape.id}
//                   type="triangle"
//                   x={shape.x}
//                   y={shape.y}
//                   sides={3}
//                   radius={shape.width / 2}
//                   stroke={isSelected ? 'red' : shape.stroke}
//                   strokeWidth={shape.strokeWidth}
//                   fill="transparent"
//                   draggable={tool === 'select'}
//                   onDragEnd={handleDragEnd}
//                   onTransformEnd={handleTransformEnd}
//                 />
//               );
//             }
//             return null;
//           })}
//           {tempShape.current && (
//             <>
//               {tempShape.current.type === 'line' && (
//                 <Line
//                   points={tempShape.current.points}
//                   stroke={tempShape.current.stroke}
//                   strokeWidth={tempShape.current.strokeWidth}
//                 />
//               )}
//               {tempShape.current.type === 'rectangle' && (
//                 <Rect
//                   x={tempShape.current.x}
//                   y={tempShape.current.y}
//                   width={tempShape.current.width}
//                   height={tempShape.current.height}
//                   stroke={tempShape.current.stroke}
//                   strokeWidth={tempShape.current.strokeWidth}
//                   fill="transparent"
//                 />
//               )}
//               {tempShape.current.type === 'circle' && (
//                 <Circle
//                   x={tempShape.current.x}
//                   y={tempShape.current.y}
//                   radius={tempShape.current.radius}
//                   stroke={tempShape.current.stroke}
//                   strokeWidth={tempShape.current.strokeWidth}
//                   fill="transparent"
//                 />
//               )}
//               {tempShape.current.type === 'triangle' && (
//                 <RegularPolygon
//                   x={tempShape.current.x}
//                   y={tempShape.current.y}
//                   sides={3}
//                   radius={tempShape.current.width / 2}
//                   stroke={tempShape.current.stroke}
//                   strokeWidth={tempShape.current.strokeWidth}
//                   fill="transparent"
//                 />
//               )}
//             </>
//           )}
//           {shapes.map((shape) => {
//             const annotation = getAnnotation(shape);
//             if (annotation) {
//               return (
//                 <Text
//                   key={`annotation-${shape.id}`}
//                   id={`annotation-${shape.id}`}
//                   type="annotation"
//                   text={annotation.text}
//                   x={annotation.x}
//                   y={annotation.y}
//                   fontSize={12}
//                   fill="black"
//                   align="center"
//                 />
//               );
//             }
//             return null;
//           })}
//         </Layer>
//       </Stage>
//       <p className="mt-2 text-sm text-gray-600">
//         {tool === 'select' ? 'Click to select, drag to move, resize with handles, press Delete or use button' : 'Click and drag to draw'}
//       </p>
//       <DrawingList drawings={drawings} handleLoad={handleLoad} handleDeleteDrawing={handleDeleteDrawing} />
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Line, Rect, Circle, RegularPolygon, Text, Transformer } from 'react-konva';
import axios from 'axios';
import Toolbar from './components/Toolbar';
import DrawingList from './components/DrawingList';
import './App.css';

function App() {
  const [tool, setTool] = useState('line');
  const [shapes, setShapes] = useState([]);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [drawingName, setDrawingName] = useState('');
  const [drawings, setDrawings] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [tempShapeState, setTempShapeState] = useState(null);
  const stageRef = useRef(null);
  const startPoint = useRef(null);
  const shapeRefs = useRef({});
  const transformerRef = useRef(null);

  const handleDeleteShape = () => {
    if (tool !== 'select' || selectedShapeId === null) {
      console.log('Delete failed: tool=', tool, 'selectedShapeId=', selectedShapeId);
      return;
    }
    console.log(`Deleting shape id: ${selectedShapeId}`);
    setShapes(shapes.filter((shape) => shape.id !== selectedShapeId));
    setSelectedShapeId(null);
    delete shapeRefs.current[selectedShapeId];
  };

  const getAnnotation = (shape) => {
    if (!showAnnotations) return null;
    let text = '';
    let x, y;
    if (shape.type === 'line') {
      const length = Math.sqrt((shape.points[2] - shape.points[0]) ** 2 + (shape.points[3] - shape.points[1]) ** 2).toFixed(2);
      text = `Length: ${length}px`;
      x = (shape.points[0] + shape.points[2]) / 2;
      y = (shape.points[1] + shape.points[3]) / 2 - 15;
    } else if (shape.type === 'rectangle') {
      text = `Width: ${Math.abs(shape.width).toFixed(2)}px\nHeight: ${Math.abs(shape.height).toFixed(2)}px`;
      x = shape.x + shape.width / 2;
      y = shape.y - 25;
    } else if (shape.type === 'circle') {
      text = `Radius: ${shape.radius.toFixed(2)}px`;
      x = shape.x;
      y = shape.y - shape.radius - 15;
    } else if (shape.type === 'triangle') {
      const side = Math.sqrt((shape.x - (shape.x + shape.width / 2)) ** 2 + (shape.y - (shape.y + shape.height)) ** 2).toFixed(2);
      text = `Side: ${side}px`;
      x = shape.x;
      y = shape.y - 15;
    }
    if (text) {
      return { text, x, y };
    }
    return null;
  };

  const handleMouseDown = (e) => {
    if (tool === 'select') {
      const target = e.target;
      if (target.attrs.id && target.attrs.type !== 'annotation') {
        console.log(`Selected shape: ${target.attrs.type}, id: ${target.attrs.id}`);
        setSelectedShapeId(target.attrs.id);
        setShapes(shapes.map((s) => ({ ...s, selected: s.id === target.attrs.id })));
      } else {
        console.log('Selection cleared');
        setSelectedShapeId(null);
        setShapes(shapes.map((s) => ({ ...s, selected: false })));
      }
      return;
    }
    const pos = e.target.getStage().getPointerPosition();
    startPoint.current = pos;
    console.log(`Drawing started: ${tool} at (${pos.x}, ${pos.y})`);
  };

  const handleMouseMove = (e) => {
    if (!startPoint.current || tool === 'select') return;
    const pos = e.target.getStage().getPointerPosition();
    console.log(`Drawing temp shape: ${tool}`);
    let shape = null;
    if (tool === 'line') {
      shape = {
        type: 'line',
        points: [startPoint.current.x, startPoint.current.y, pos.x, pos.y],
        stroke: 'gray',
        strokeWidth: 2,
        isTemp: true,
      };
    } else if (tool === 'rectangle') {
      const x = Math.min(startPoint.current.x, pos.x);
      const y = Math.min(startPoint.current.y, pos.y);
      const width = Math.abs(pos.x - startPoint.current.x);
      const height = Math.abs(pos.y - startPoint.current.y);
      shape = {
        type: 'rectangle',
        x,
        y,
        width,
        height,
        stroke: 'gray',
        strokeWidth: 2,
        isTemp: true,
      };
    } else if (tool === 'circle') {
      const radius = Math.sqrt((pos.x - startPoint.current.x) ** 2 + (pos.y - startPoint.current.y) ** 2);
      shape = {
        type: 'circle',
        x: startPoint.current.x,
        y: startPoint.current.y,
        radius,
        stroke: 'gray',
        strokeWidth: 2,
        isTemp: true,
      };
    } else if (tool === 'triangle') {
      const width = Math.abs(pos.x - startPoint.current.x) * 2;
      const height = Math.abs(pos.y - startPoint.current.y);
      shape = {
        type: 'triangle',
        x: startPoint.current.x - width / 2,
        y: startPoint.current.y,
        width,
        height,
        stroke: 'gray',
        strokeWidth: 2,
        isTemp: true,
      };
    }
    setTempShapeState(shape);
  };

  const handleMouseUp = () => {
    if (!startPoint.current || tool === 'select') {
      startPoint.current = null;
      setTempShapeState(null);
      return;
    }
    console.log(`Finalizing shape: ${tool}`);
    const shape = { ...tempShapeState, id: shapes.length, isTemp: false, stroke: 'black', selected: false };
    if (shape.type === 'line' && (Math.abs(shape.points[2] - shape.points[0]) > 5 || Math.abs(shape.points[3] - shape.points[1]) > 5)) {
      setShapes([...shapes, shape]);
    } else if (shape.type === 'rectangle' && shape.width > 5 && shape.height > 5) {
      setShapes([...shapes, shape]);
    } else if (shape.type === 'circle' && shape.radius > 5) {
      setShapes([...shapes, shape]);
    } else if (shape.type === 'triangle' && shape.width > 5 && shape.height > 5) {
      setShapes([...shapes, shape]);
    }
    startPoint.current = null;
    setTempShapeState(null);
  };

  const handleDragEnd = (e) => {
    const shape = e.target.attrs;
    console.log(`Moved shape: ${shape.type}, id: ${shape.id}`);
    setShapes(shapes.map((s) => {
      if (s.id !== shape.id) return s;
      return { ...s, x: shape.x, y: shape.y };
    }));
  };

  const handleTransformEnd = (e) => {
    const node = e.target;
    const shape = node.attrs;
    console.log(`Resize ended: ${shape.type}, id: ${shape.id}, scaleX: ${node.scaleX()}, scaleY: ${node.scaleY()}`);
    
    const newAttrs = {};
    let scaleX = node.scaleX();
    let scaleY = node.scaleY();
    
    if (shape.type === 'rectangle') {
      const width = Math.abs(node.width() * scaleX);
      const height = Math.abs(node.height() * scaleY);
      newAttrs.x = node.x() + (scaleX < 0 ? width : 0);
      newAttrs.y = node.y() + (scaleY < 0 ? height : 0);
      newAttrs.width = width;
      newAttrs.height = height;
    } else if (shape.type === 'circle') {
      const radius = Math.abs(node.radius() * scaleX);
      newAttrs.x = node.x();
      newAttrs.y = node.y();
      newAttrs.radius = radius > 5 ? radius : 5; // Ensure minimum radius
    } else if (shape.type === 'triangle') {
      const width = Math.abs((node.width() || shape.width) * scaleX);
      const height = Math.abs((node.height() || shape.height) * scaleY);
      newAttrs.x = node.x() + (scaleX < 0 ? width / 2 : 0);
      newAttrs.y = node.y() + (scaleY < 0 ? height : 0);
      newAttrs.width = width;
      newAttrs.height = height;
    }

    // Reset scale
    node.scaleX(1);
    node.scaleY(1);
    
    // Update shape state
    setShapes(shapes.map((s) => {
      if (s.id !== shape.id) return s;
      console.log(`Updating shape: ${shape.type}, newAttrs:`, newAttrs);
      return { ...s, ...newAttrs };
    }));

    // Update node attributes
    node.setAttrs(newAttrs);
    node.getLayer().batchDraw();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Delete' && tool === 'select' && selectedShapeId !== null) {
      console.log('Delete key pressed');
      handleDeleteShape();
    }
  };

  useEffect(() => {
    console.log('Stage rendered, shapes:', shapes.length, 'tool:', tool);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tool, selectedShapeId, shapes]);

  useEffect(() => {
    console.log(`Tool changed to: ${tool}`);
    startPoint.current = null;
    setTempShapeState(null);
  }, [tool]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/drawings')
      .then((res) => setDrawings(res.data))
      .catch((err) => console.error('Error fetching drawings:', err));
  }, []);

  useEffect(() => {
    if (selectedShapeId && transformerRef.current && tool === 'select') {
      const selectedNode = shapeRefs.current[selectedShapeId];
      console.log(`Binding Transformer to shape: ${selectedShapeId}, node exists: ${!!selectedNode}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedShapeId, tool]);

  const handleSave = async () => {
    if (!drawingName) return alert('Enter a drawing name');
    try {
      const res = await axios.post('http://localhost:5000/api/drawings', {
        name: drawingName,
        shapes,
      });
      setDrawings([...drawings, res.data]);
      setDrawingName('');
      alert('Drawing saved!');
    } catch (err) {
      console.error('Error saving drawing:', err);
      alert('Error saving drawing');
    }
  };

  const handleLoad = async (id) => {
    try {
      const res = await axios.get('http://localhost:5000/api/drawings');
      const drawing = res.data.find((d) => d._id === id);
      if (!drawing) throw new Error('Drawing not found');
      setShapes(drawing.shapes);
      setSelectedShapeId(null);
      shapeRefs.current = {};
    } catch (err) {
      console.error('Error loading drawing:', err);
      alert('Error loading drawing');
    }
  };

  const handleDeleteDrawing = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/drawings/${id}`);
      setDrawings(drawings.filter((d) => d._id !== id));
      alert('Drawing deleted');
    } catch (err) {
      console.error('Error deleting drawing:', err);
      alert('Error deleting drawing');
    }
  };

  const handleClear = () => {
    setShapes([]);
    setDrawingName('');
    setSelectedShapeId(null);
    setTempShapeState(null);
    shapeRefs.current = {};
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold my-4">Building Planner</h1>
      <Toolbar
        tool={tool}
        setTool={setTool}
        showAnnotations={showAnnotations}
        setShowAnnotations={setShowAnnotations}
        handleClear={handleClear}
        drawingName={drawingName}
        setDrawingName={setDrawingName}
        handleSave={handleSave}
        handleDeleteShape={handleDeleteShape}
        hasSelectedShape={selectedShapeId !== null}
      />
      <Stage
        width={800}
        height={600}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: '1px solid gray', background: '#fff' }}
      >
        <Layer>
          {shapes.map((shape) => {
            const isSelected = shape.id === selectedShapeId;
            if (shape.type === 'line') {
              return (
                <Line
                  key={shape.id}
                  id={shape.id}
                  type="line"
                  points={shape.points}
                  stroke={isSelected ? 'red' : shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  draggable={tool === 'select'}
                  onDragEnd={handleDragEnd}
                />
              );
            } else if (shape.type === 'rectangle') {
              return (
                <Rect
                  key={shape.id}
                  id={shape.id}
                  type="rectangle"
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  stroke={isSelected ? 'red' : shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  fill="transparent"
                  draggable={tool === 'select'}
                  onDragEnd={handleDragEnd}
                  onTransformEnd={handleTransformEnd}
                  ref={(node) => {
                    if (node) shapeRefs.current[shape.id] = node;
                  }}
                />
              );
            } else if (shape.type === 'circle') {
              return (
                <Circle
                  key={shape.id}
                  id={shape.id}
                  type="circle"
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  stroke={isSelected ? 'red' : shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  fill="transparent"
                  draggable={tool === 'select'}
                  onDragEnd={handleDragEnd}
                  onTransformEnd={handleTransformEnd}
                  ref={(node) => {
                    if (node) shapeRefs.current[shape.id] = node;
                  }}
                />
              );
            } else if (shape.type === 'triangle') {
              return (
                <RegularPolygon
                  key={shape.id}
                  id={shape.id}
                  type="triangle"
                  x={shape.x}
                  y={shape.y}
                  sides={3}
                  radius={shape.width / 2}
                  stroke={isSelected ? 'red' : shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  fill="transparent"
                  draggable={tool === 'select'}
                  onDragEnd={handleDragEnd}
                  onTransformEnd={handleTransformEnd}
                  ref={(node) => {
                    if (node) shapeRefs.current[shape.id] = node;
                  }}
                />
              );
            }
            return null;
          })}
          {tempShapeState && (
            <>
              {tempShapeState.type === 'line' && (
                <Line
                  points={tempShapeState.points}
                  stroke={tempShapeState.stroke}
                  strokeWidth={tempShapeState.strokeWidth}
                />
              )}
              {tempShapeState.type === 'rectangle' && (
                <Rect
                  x={tempShapeState.x}
                  y={tempShapeState.y}
                  width={tempShapeState.width}
                  height={tempShapeState.height}
                  stroke={tempShapeState.stroke}
                  strokeWidth={tempShapeState.strokeWidth}
                  fill="transparent"
                />
              )}
              {tempShapeState.type === 'circle' && (
                <Circle
                  x={tempShapeState.x}
                  y={tempShapeState.y}
                  radius={tempShapeState.radius}
                  stroke={tempShapeState.stroke}
                  strokeWidth={tempShapeState.strokeWidth}
                  fill="transparent"
                />
              )}
              {tempShapeState.type === 'triangle' && (
                <RegularPolygon
                  x={tempShapeState.x}
                  y={tempShapeState.y}
                  sides={3}
                  radius={tempShapeState.width / 2}
                  stroke={tempShapeState.stroke}
                  strokeWidth={tempShapeState.strokeWidth}
                  fill="transparent"
                />
              )}
            </>
          )}
          {shapes.map((shape) => {
            const annotation = getAnnotation(shape);
            if (annotation) {
              return (
                <Text
                  key={`annotation-${shape.id}`}
                  id={`annotation-${shape.id}`}
                  type="annotation"
                  text={annotation.text}
                  x={annotation.x}
                  y={annotation.y}
                  fontSize={12}
                  fill="black"
                  align="center"
                />
              );
            }
            return null;
          })}
          {tool === 'select' && selectedShapeId && (
            <Transformer
              ref={transformerRef}
              keepRatio={shapes.find(s => s.id === selectedShapeId)?.type === 'circle'}
              rotateEnabled={false}
              shouldOverdrawWholeArea={true}
              enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right', 'middle-left', 'middle-right', 'top-center', 'bottom-center']}
              boundBoxFunc={(oldBox, newBox) => {
                if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
      <p className="mt-2 text-sm text-gray-600">
        {tool === 'select' ? 'Click to select, drag to move, resize with handles, press Delete or use button' : 'Click and drag to draw'}
      </p>
      <DrawingList drawings={drawings} handleLoad={handleLoad} handleDeleteDrawing={handleDeleteDrawing} />
    </div>
  );
}

export default App;