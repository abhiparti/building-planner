Building Planner
A web app to draw shapes (lines, rectangles, circles, triangles), select/move/resize/delete them, toggle annotations, and save/load drawings using MongoDB.
Features

Draw lines, rectangles, circles, triangles with live preview during drag.
Select tool: Drag to move, resize (rectangles, circles, triangles) with handles, delete (button or Delete key).
Toggle annotations (length, width/height, radius, side length).
Save/load/delete drawings.

Tech Stack

Frontend: Vite, React, Tailwind CSS, Konva.js (react-konva)
Backend: Node.js, Express, MongoDB

Quick Setup

Clone repo:git clone <your-repo-url>
cd building-planner


Backend:cd backend
npm install


Create .env:MONGO_URI=mongodb://localhost:27017/building_planner
PORT=5000


Run MongoDB: mongod
Start: npm run dev


Frontend:cd client
npm run dev


Open http://localhost:5173.



Quick Test

Resizing Shapes:
Click Select, click a rectangle, circle, or triangle.
Verify: Resize handles appear, drag to resize smoothly, shape persists after re-selecting Select tool or shape.
Check console: “Resize ended: ...”, “Updating shape: ...”.


Live Shape Preview:
Click Rectangle, click and drag on canvas.
Verify: Gray rectangle appears during drag, turns black on release.
Repeat for Line, Circle, Triangle.
Check console: “Drawing temp shape: ...”, “Finalizing shape: ...”.


Tool Switching:
Click Line, Rectangle, Circle, Triangle buttons.
Verify: Selected shape draws correctly.
Check console: “Tool changed to: ...”.


Drawing Shapes:
Select a tool, drag on canvas.
Verify: Shape appears (gray preview, black final).
Check console: “Drawing started: ...”.


Annotations:
Draw shapes, toggle “Show/Hide Annotations”.
Verify: Dimensions appear (e.g., “Length: 100.00px”).


Delete Shape:
Click Select, click a shape (red outline).
Click “Delete Selected Shape” or press Delete.
Verify: Shape disappears.
Check console: “Delete button clicked” or “Delete key pressed”.


Drag:
Select a shape, drag to move.


Save/Load:
Save a drawing, load from list.
