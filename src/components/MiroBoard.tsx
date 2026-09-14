import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MousePointer2,
  StickyNote,
  Type,
  Square,
  Circle,
  Triangle,
  Pen,
  Minus,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Share2,
  Plus,
  Download,
  Copy,
  Palette,
  Undo2,
  Redo2,
  Save,
  FolderOpen,
  X,
  Check,
  Image,
  Link2,
  Layout,
  BookOpen,
  Brain,
  MessageSquare,
  MoreHorizontal,
  Lock,
  Unlock,
  Hand,
  Grid3x3,
  Layers,
  ChevronDown,
} from 'lucide-react';

type Tool = 'select' | 'pan' | 'sticky' | 'text' | 'rectangle' | 'circle' | 'triangle' | 'draw' | 'line' | 'eraser';

interface Point {
  x: number;
  y: number;
}

interface BoardElement {
  id: string;
  type: 'sticky' | 'text' | 'rectangle' | 'circle' | 'triangle' | 'drawing' | 'line';
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string;
  color?: string;
  points?: Point[];
  strokeColor?: string;
  strokeWidth?: number;
  fontSize?: number;
  rotation?: number;
  locked?: boolean;
  zIndex?: number;
  start?: Point;
  end?: Point;
}

interface Board {
  id: string;
  name: string;
  elements: BoardElement[];
  lastModified: string;
  thumbnail?: string;
  isTemplate?: boolean;
}

const COLORS = [
  '#FEF3C7', // yellow
  '#FECACA', // red
  '#BBF7D0', // green
  '#BFDBFE', // blue
  '#E9D5FF', // purple
  '#FED7AA', // orange
  '#FBCFE8', // pink
  '#FFFFFF', // white
];

const STICKY_COLORS = ['#FEF3C7', '#FECACA', '#BBF7D0', '#BFDBFE', '#E9D5FF', '#FED7AA'];

const generateId = () => Math.random().toString(36).substring(2, 11);

const templateBoards: Board[] = [
  {
    id: 'tpl-1',
    name: '📚 Lesson Plan Template',
    lastModified: 'Template',
    isTemplate: true,
    elements: [
      { id: '1', type: 'sticky', x: 100, y: 100, width: 220, height: 180, content: '🎯 Lesson Objectives\n\n• What will students learn?\n• What skills will they practice?', color: '#FEF3C7', zIndex: 1 },
      { id: '2', type: 'sticky', x: 380, y: 100, width: 220, height: 180, content: '📖 Warm-up (5-10 min)\n\n• Activate prior knowledge\n• Engage students', color: '#BBF7D0', zIndex: 2 },
      { id: '3', type: 'sticky', x: 660, y: 100, width: 220, height: 180, content: '📝 Presentation (15 min)\n\n• Introduce new material\n• Examples & explanations', color: '#BFDBFE', zIndex: 3 },
      { id: '4', type: 'sticky', x: 100, y: 340, width: 220, height: 180, content: '🎮 Practice (20 min)\n\n• Guided practice\n• Pair/group work', color: '#E9D5FF', zIndex: 4 },
      { id: '5', type: 'sticky', x: 380, y: 340, width: 220, height: 180, content: '💬 Production (15 min)\n\n• Free practice\n• Real-world application', color: '#FED7AA', zIndex: 5 },
      { id: '6', type: 'sticky', x: 660, y: 340, width: 220, height: 180, content: '✅ Wrap-up (5 min)\n\n• Review key points\n• Homework assignment', color: '#FECACA', zIndex: 6 },
      { id: '7', type: 'text', x: 100, y: 40, content: 'PPP Lesson Framework', fontSize: 28, zIndex: 7 },
    ],
  },
  {
    id: 'tpl-2',
    name: '🧠 Vocabulary Mind Map',
    lastModified: 'Template',
    isTemplate: true,
    elements: [
      { id: '1', type: 'circle', x: 400, y: 250, width: 160, height: 160, color: '#BFDBFE', zIndex: 1 },
      { id: '2', type: 'text', x: 430, y: 310, content: 'TRAVEL', fontSize: 24, zIndex: 2 },
      { id: '3', type: 'sticky', x: 100, y: 100, width: 180, height: 120, content: '✈️ Transport\nplane, train, bus, taxi', color: '#FEF3C7', zIndex: 3 },
      { id: '4', type: 'sticky', x: 650, y: 100, width: 180, height: 120, content: '🏨 Accommodation\nhotel, hostel, resort', color: '#BBF7D0', zIndex: 4 },
      { id: '5', type: 'sticky', x: 100, y: 400, width: 180, height: 120, content: '🍽️ Food & Drink\nrestaurant, menu, order', color: '#E9D5FF', zIndex: 5 },
      { id: '6', type: 'sticky', x: 650, y: 400, width: 180, height: 120, content: '🗺️ Sightseeing\ntour, museum, landmark', color: '#FED7AA', zIndex: 6 },
    ],
  },
  {
    id: 'tpl-3',
    name: '💬 Conversation Activity',
    lastModified: 'Template',
    isTemplate: true,
    elements: [
      { id: '1', type: 'text', x: 100, y: 40, content: 'Role Play: At the Airport', fontSize: 28, zIndex: 1 },
      { id: '2', type: 'sticky', x: 100, y: 120, width: 260, height: 200, content: '👤 Student A: Passenger\n\nYou are traveling to London.\n• Ask about your flight\n• Check in your luggage\n• Ask about the gate', color: '#BFDBFE', zIndex: 2 },
      { id: '3', type: 'sticky', x: 420, y: 120, width: 260, height: 200, content: '👤 Student B: Agent\n\nYou work at the check-in desk.\n• Ask for passport & ticket\n• Weigh the luggage\n• Give boarding pass', color: '#BBF7D0', zIndex: 3 },
      { id: '4', type: 'sticky', x: 100, y: 380, width: 580, height: 140, content: '📝 Useful Language\n\n• "I\'d like to check in for..." • "Can I have a window/aisle seat?"\n• "How many bags are you checking?" • "Your gate is..."\n• "Is this bag too heavy?" • "Have a good flight!"', color: '#FEF3C7', zIndex: 4 },
    ],
  },
];

const MiroBoard: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([
    { id: 'board-1', name: 'My First Lesson', elements: [], lastModified: 'Just now' },
  ]);
  const [currentBoardId, setCurrentBoardId] = useState('board-1');
  const [tool, setTool] = useState<Tool>('select');
  const [elements, setElements] = useState<BoardElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
  const [elementDragStart, setElementDragStart] = useState<Point>({ x: 0, y: 0 });
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [shapeStart, setShapeStart] = useState<Point | null>(null);
  const [tempShape, setTempShape] = useState<BoardElement | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showBoardList, setShowBoardList] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState('#FEF3C7');
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<BoardElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [lineStart, setLineStart] = useState<Point | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const currentBoard = boards.find((b) => b.id === currentBoardId);

  // Save to history
  const saveHistory = useCallback((newElements: BoardElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setElements(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setElements(history[newIndex]);
    }
  };

  // Convert screen coords to canvas coords
  const screenToCanvas = (screenX: number, screenY: number): Point => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: (screenX - rect.left - pan.x) / zoom,
      y: (screenY - rect.top - pan.y) / zoom,
    };
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(5, zoom * delta));

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newPan = {
      x: mouseX - (mouseX - pan.x) * (newZoom / zoom),
      y: mouseY - (mouseY - pan.y) * (newZoom / zoom),
    };

    setZoom(newZoom);
    setPan(newPan);
  };

  // Mouse down on canvas
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target !== canvasRef.current && e.target !== svgRef.current && !(e.target as HTMLElement).closest('.canvas-bg')) {
      return;
    }

    const point = screenToCanvas(e.clientX, e.clientY);

    if (tool === 'pan' || e.button === 1 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    if (tool === 'select') {
      setSelectedId(null);
      setEditingId(null);
      return;
    }

    if (tool === 'sticky') {
      const newElement: BoardElement = {
        id: generateId(),
        type: 'sticky',
        x: point.x - 100,
        y: point.y - 75,
        width: 200,
        height: 150,
        content: 'Double-click to edit...',
        color: currentColor,
        zIndex: elements.length + 1,
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      saveHistory(newElements);
      setSelectedId(newElement.id);
      setTool('select');
      return;
    }

    if (tool === 'text') {
      const newElement: BoardElement = {
        id: generateId(),
        type: 'text',
        x: point.x,
        y: point.y,
        content: 'Text',
        fontSize: 18,
        color: '#1F2937',
        zIndex: elements.length + 1,
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      saveHistory(newElements);
      setSelectedId(newElement.id);
      setEditingId(newElement.id);
      setTool('select');
      return;
    }

    if (tool === 'rectangle' || tool === 'circle' || tool === 'triangle') {
      setShapeStart(point);
      return;
    }

    if (tool === 'draw') {
      setIsDrawing(true);
      setCurrentPath([point]);
      return;
    }

    if (tool === 'line') {
      if (!lineStart) {
        setLineStart(point);
      } else {
        const newElement: BoardElement = {
          id: generateId(),
          type: 'line',
          x: lineStart.x,
          y: lineStart.y,
          start: lineStart,
          end: point,
          strokeColor: '#1F2937',
          strokeWidth: 2,
          zIndex: elements.length + 1,
        };
        const newElements = [...elements, newElement];
        setElements(newElements);
        saveHistory(newElements);
        setLineStart(null);
      }
      return;
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
      return;
    }

    if (isDragging && selectedId) {
      const point = screenToCanvas(e.clientX, e.clientY);
      const dx = point.x - elementDragStart.x;
      const dy = point.y - elementDragStart.y;
      setElements((prev) =>
        prev.map((el) =>
          el.id === selectedId
            ? { ...el, x: (el.x || 0) + dx, y: (el.y || 0) + dy }
            : el
        )
      );
      setElementDragStart(point);
      return;
    }

    if (isDrawing) {
      const point = screenToCanvas(e.clientX, e.clientY);
      setCurrentPath((prev) => [...prev, point]);
      return;
    }

    if (shapeStart && (tool === 'rectangle' || tool === 'circle' || tool === 'triangle')) {
      const point = screenToCanvas(e.clientX, e.clientY);
      const x = Math.min(shapeStart.x, point.x);
      const y = Math.min(shapeStart.y, point.y);
      const width = Math.abs(point.x - shapeStart.x);
      const height = Math.abs(point.y - shapeStart.y);
      setTempShape({
        id: 'temp',
        type: tool,
        x,
        y,
        width,
        height,
        color: currentColor,
      });
    }
  };

  const handleCanvasMouseUp = (e: React.MouseEvent) => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (isDragging) {
      setIsDragging(false);
      saveHistory(elements);
      return;
    }

    if (isDrawing && currentPath.length > 1) {
      const newElement: BoardElement = {
        id: generateId(),
        type: 'drawing',
        x: 0,
        y: 0,
        points: currentPath,
        strokeColor: '#1F2937',
        strokeWidth: 3,
        zIndex: elements.length + 1,
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      saveHistory(newElements);
      setIsDrawing(false);
      setCurrentPath([]);
      return;
    }

    if (shapeStart && tempShape) {
      const newElement: BoardElement = {
        ...tempShape,
        id: generateId(),
        zIndex: elements.length + 1,
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      saveHistory(newElements);
      setShapeStart(null);
      setTempShape(null);
      setTool('select');
      return;
    }

    setIsDrawing(false);
    setCurrentPath([]);
    setShapeStart(null);
    setTempShape(null);
  };

  // Element drag start
  const handleElementMouseDown = (e: React.MouseEvent, element: BoardElement) => {
    if (tool !== 'select' || element.locked) return;
    e.stopPropagation();
    setSelectedId(element.id);
    setIsDragging(true);
    const point = screenToCanvas(e.clientX, e.clientY);
    setElementDragStart(point);
  };

  // Element double click to edit
  const handleElementDoubleClick = (e: React.MouseEvent, element: BoardElement) => {
    e.stopPropagation();
    if (element.type === 'sticky' || element.type === 'text') {
      setEditingId(element.id);
    }
  };

  // Update element content
  const updateElementContent = (id: string, content: string) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, content } : el)));
  };

  // Delete selected
  const deleteSelected = () => {
    if (!selectedId) return;
    const newElements = elements.filter((el) => el.id !== selectedId);
    setElements(newElements);
    saveHistory(newElements);
    setSelectedId(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editingId) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected();
      }
      if (e.key === 'v' || e.key === 'V') setTool('select');
      if (e.key === 'h' || e.key === 'H') setTool('pan');
      if (e.key === 'n' || e.key === 'N') setTool('sticky');
      if (e.key === 't' || e.key === 'T') setTool('text');
      if (e.key === 'r' || e.key === 'R') setTool('rectangle');
      if (e.key === 'o' || e.key === 'O') setTool('circle');
      if (e.key === 'p' || e.key === 'P') setTool('draw');
      if (e.key === 'l' || e.key === 'L') setTool('line');
      if (e.key === 'Escape') {
        setSelectedId(null);
        setEditingId(null);
        setLineStart(null);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, editingId, elements]);

  // Board management
  const createNewBoard = () => {
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      name: `New Board ${boards.length + 1}`,
      elements: [],
      lastModified: 'Just now',
    };
    setBoards([...boards, newBoard]);
    setCurrentBoardId(newBoard.id);
    setElements([]);
    setShowBoardList(false);
  };

  const loadBoard = (boardId: string) => {
    // Save current
    setBoards((prev) =>
      prev.map((b) => (b.id === currentBoardId ? { ...b, elements, lastModified: 'Just now' } : b))
    );
    const board = boards.find((b) => b.id === boardId);
    if (board) {
      setCurrentBoardId(boardId);
      setElements(board.elements);
      setSelectedId(null);
      setEditingId(null);
    }
    setShowBoardList(false);
  };

  const loadTemplate = (template: Board) => {
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      name: template.name.replace(/^[^\s]+\s/, '') + ' (Copy)',
      elements: template.elements.map((el) => ({ ...el, id: generateId() })),
      lastModified: 'Just now',
    };
    setBoards([...boards, newBoard]);
    setCurrentBoardId(newBoard.id);
    setElements(newBoard.elements);
    setShowBoardList(false);
  };

  const deleteBoard = (boardId: string) => {
    if (boards.length === 1) return;
    const newBoards = boards.filter((b) => b.id !== boardId);
    setBoards(newBoards);
    if (boardId === currentBoardId) {
      setCurrentBoardId(newBoards[0].id);
      setElements(newBoards[0].elements);
    }
  };

  // Zoom controls
  const zoomIn = () => setZoom(Math.min(5, zoom * 1.2));
  const zoomOut = () => setZoom(Math.max(0.1, zoom / 1.2));
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const selectedElement = elements.find((el) => el.id === selectedId);

  // Render element
  const renderElement = (element: BoardElement) => {
    const isSelected = selectedId === element.id;

    if (element.type === 'drawing' && element.points) {
      const pathData = element.points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
        .join(' ');
      return (
        <path
          key={element.id}
          d={pathData}
          stroke={element.strokeColor || '#1F2937'}
          strokeWidth={element.strokeWidth || 3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={(e) => {
            e.stopPropagation();
            if (tool === 'select') setSelectedId(element.id);
          }}
          className={isSelected ? 'cursor-move' : 'cursor-pointer'}
          style={{ filter: isSelected ? 'drop-shadow(0 0 4px #6366F1)' : undefined }}
        />
      );
    }

    if (element.type === 'line' && element.start && element.end) {
      return (
        <line
          key={element.id}
          x1={element.start.x}
          y1={element.start.y}
          x2={element.end.x}
          y2={element.end.y}
          stroke={element.strokeColor || '#1F2937'}
          strokeWidth={element.strokeWidth || 2}
          strokeLinecap="round"
          onClick={(e) => {
            e.stopPropagation();
            if (tool === 'select') setSelectedId(element.id);
          }}
          className={isSelected ? 'cursor-move' : 'cursor-pointer'}
          style={{ filter: isSelected ? 'drop-shadow(0 0 4px #6366F1)' : undefined }}
        />
      );
    }

    const commonStyle: React.CSSProperties = {
      position: 'absolute',
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      zIndex: element.zIndex || 1,
      cursor: tool === 'select' ? (element.locked ? 'not-allowed' : 'move') : 'default',
      outline: isSelected ? '2px solid #6366F1' : 'none',
      outlineOffset: '2px',
    };

    if (element.type === 'sticky') {
      return (
        <div
          key={element.id}
          style={{
            ...commonStyle,
            backgroundColor: element.color || '#FEF3C7',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            padding: '16px',
          }}
          onMouseDown={(e) => handleElementMouseDown(e, element)}
          onDoubleClick={(e) => handleElementDoubleClick(e, element)}
        >
          {editingId === element.id ? (
            <textarea
              autoFocus
              value={element.content || ''}
              onChange={(e) => updateElementContent(element.id, e.target.value)}
              onBlur={() => { setEditingId(null); saveHistory(elements); }}
              onKeyDown={(e) => { if (e.key === 'Escape') { setEditingId(null); saveHistory(elements); } }}
              className="w-full h-full bg-transparent resize-none outline-none text-sm text-gray-800"
              style={{ fontSize: '14px', lineHeight: '1.5' }}
            />
          ) : (
            <div className="w-full h-full text-sm text-gray-800 whitespace-pre-wrap overflow-hidden" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              {element.content}
            </div>
          )}
        </div>
      );
    }

    if (element.type === 'text') {
      return (
        <div
          key={element.id}
          style={{
            ...commonStyle,
            width: 'auto',
            height: 'auto',
            minWidth: '50px',
          }}
          onMouseDown={(e) => handleElementMouseDown(e, element)}
          onDoubleClick={(e) => handleElementDoubleClick(e, element)}
        >
          {editingId === element.id ? (
            <input
              autoFocus
              value={element.content || ''}
              onChange={(e) => updateElementContent(element.id, e.target.value)}
              onBlur={() => { setEditingId(null); saveHistory(elements); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') { setEditingId(null); saveHistory(elements); } }}
              className="bg-transparent outline-none text-gray-800 font-semibold"
              style={{ fontSize: element.fontSize || 18, minWidth: '100px' }}
            />
          ) : (
            <div
              className="text-gray-800 font-semibold whitespace-nowrap"
              style={{ fontSize: element.fontSize || 18 }}
            >
              {element.content}
            </div>
          )}
        </div>
      );
    }

    if (element.type === 'rectangle') {
      return (
        <div
          key={element.id}
          style={{
            ...commonStyle,
            backgroundColor: element.color || '#BFDBFE',
            borderRadius: '4px',
            border: '2px solid rgba(0,0,0,0.1)',
          }}
          onMouseDown={(e) => handleElementMouseDown(e, element)}
        />
      );
    }

    if (element.type === 'circle') {
      return (
        <div
          key={element.id}
          style={{
            ...commonStyle,
            backgroundColor: element.color || '#BFDBFE',
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.1)',
          }}
          onMouseDown={(e) => handleElementMouseDown(e, element)}
        />
      );
    }

    if (element.type === 'triangle') {
      return (
        <div
          key={element.id}
          style={{
            ...commonStyle,
            width: element.width,
            height: element.height,
            backgroundColor: 'transparent',
          }}
          onMouseDown={(e) => handleElementMouseDown(e, element)}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon
              points="50,5 95,95 5,95"
              fill={element.color || '#BFDBFE'}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="2"
            />
          </svg>
        </div>
      );
    }

    return null;
  };

  const tools: { id: Tool; icon: any; label: string; shortcut: string }[] = [
    { id: 'select', icon: MousePointer2, label: 'Select', shortcut: 'V' },
    { id: 'pan', icon: Hand, label: 'Pan', shortcut: 'H' },
    { id: 'sticky', icon: StickyNote, label: 'Sticky Note', shortcut: 'N' },
    { id: 'text', icon: Type, label: 'Text', shortcut: 'T' },
    { id: 'rectangle', icon: Square, label: 'Rectangle', shortcut: 'R' },
    { id: 'circle', icon: Circle, label: 'Circle', shortcut: 'O' },
    { id: 'triangle', icon: Triangle, label: 'Triangle', shortcut: '' },
    { id: 'draw', icon: Pen, label: 'Draw', shortcut: 'P' },
    { id: 'line', icon: Minus, label: 'Line', shortcut: 'L' },
  ];

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBoardList(!showBoardList)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FolderOpen size={18} className="text-indigo-600" />
            <span className="font-semibold text-gray-900 text-sm">{currentBoard?.name || 'Untitled'}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <span className="text-xs text-gray-500">Auto-saved</span>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={undo} disabled={historyIndex === 0} className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30" title="Undo (Ctrl+Z)">
            <Undo2 size={16} className="text-gray-600" />
          </button>
          <button onClick={redo} disabled={historyIndex === history.length - 1} className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30" title="Redo (Ctrl+Y)">
            <Redo2 size={16} className="text-gray-600" />
          </button>
          <div className="h-5 w-px bg-gray-200 mx-1" />
          <button onClick={() => setShowGrid(!showGrid)} className={`p-2 rounded-lg ${showGrid ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100 text-gray-600'}`} title="Toggle grid">
            <Grid3x3 size={16} />
          </button>
          <button onClick={resetView} className="p-2 hover:bg-gray-100 rounded-lg" title="Reset view">
            <Maximize2 size={16} className="text-gray-600" />
          </button>
          <div className="h-5 w-px bg-gray-200 mx-1" />
          <button onClick={() => setShowShareModal(true)} className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      {/* Board List Dropdown */}
      {showBoardList && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 max-w-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Your Boards</h3>
            <button onClick={() => setShowBoardList(false)} className="p-1 hover:bg-gray-100 rounded">
              <X size={16} className="text-gray-400" />
            </button>
          </div>
          <button
            onClick={createNewBoard}
            className="w-full flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-sm text-gray-600 mb-3"
          >
            <Plus size={16} /> New Blank Board
          </button>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {boards.map((board) => (
              <div
                key={board.id}
                className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer ${
                  board.id === currentBoardId ? 'bg-indigo-50' : ''
                }`}
                onClick={() => loadBoard(board.id)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Layout size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-700 truncate">{board.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">{board.lastModified}</span>
                  {boards.length > 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteBoard(board.id); }}
                      className="p-1 hover:bg-red-100 rounded"
                    >
                      <Trash2 size={12} className="text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">TEMPLATES</p>
            <div className="space-y-1">
              {templateBoards.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => loadTemplate(tpl)}
                  className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <span className="text-sm">{tpl.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-200" style={{ height: 'calc(100vh - 260px)', minHeight: '500px' }}>
        {/* Left Toolbar */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex flex-col gap-1">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`p-2.5 rounded-xl transition-all relative group ${
                  tool === t.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={`${t.label} (${t.shortcut})`}
              >
                <Icon size={18} />
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {t.label} {t.shortcut && `(${t.shortcut})`}
                </span>
              </button>
            );
          })}
          <div className="h-px bg-gray-200 my-1" />
          <button
            onClick={deleteSelected}
            disabled={!selectedId}
            className="p-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-30"
            title="Delete (Del)"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Color Picker (when relevant tool selected) */}
        {(tool === 'sticky' || tool === 'rectangle' || tool === 'circle' || tool === 'triangle') && (
          <div className="absolute left-20 top-1/2 -translate-y-1/2 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 p-3">
            <p className="text-xs font-medium text-gray-500 mb-2">Color</p>
            <div className="grid grid-cols-3 gap-2">
              {(tool === 'sticky' ? STICKY_COLORS : COLORS).map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setCurrentColor(color);
                    if (selectedElement && (selectedElement.type === 'sticky' || selectedElement.type === 'rectangle' || selectedElement.type === 'circle' || selectedElement.type === 'triangle')) {
                      const newElements = elements.map((el) => el.id === selectedId ? { ...el, color } : el);
                      setElements(newElements);
                      saveHistory(newElements);
                    }
                  }}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    currentColor === color ? 'border-indigo-600 scale-110' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Selected Element Properties */}
        {selectedElement && tool === 'select' && (
          <div className="absolute left-20 top-4 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 w-56">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Properties</p>
              <button onClick={() => setSelectedId(null)} className="p-1 hover:bg-gray-100 rounded">
                <X size={12} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Type</span>
                <span className="font-medium text-gray-700 capitalize">{selectedElement.type}</span>
              </div>
              {(selectedElement.type === 'sticky' || selectedElement.type === 'rectangle' || selectedElement.type === 'circle' || selectedElement.type === 'triangle') && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Color</p>
                  <div className="flex gap-1 flex-wrap">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          const newElements = elements.map((el) => el.id === selectedId ? { ...el, color } : el);
                          setElements(newElements);
                          saveHistory(newElements);
                        }}
                        className={`w-6 h-6 rounded border ${selectedElement.color === color ? 'ring-2 ring-indigo-600' : 'border-gray-200'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-1 pt-1">
                <button
                  onClick={() => {
                    const copy = { ...selectedElement, id: generateId(), x: (selectedElement.x || 0) + 20, y: (selectedElement.y || 0) + 20 };
                    const newElements = [...elements, copy];
                    setElements(newElements);
                    saveHistory(newElements);
                    setSelectedId(copy.id);
                  }}
                  className="flex-1 px-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium text-gray-700 flex items-center justify-center gap-1"
                >
                  <Copy size={12} /> Duplicate
                </button>
                <button
                  onClick={deleteSelected}
                  className="flex-1 px-2 py-1.5 bg-red-50 hover:bg-red-100 rounded text-xs font-medium text-red-700 flex items-center justify-center gap-1"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Canvas */}
        <div
          ref={canvasRef}
          className={`w-full h-full relative overflow-hidden ${
            tool === 'pan' ? 'cursor-grab' :
            tool === 'draw' ? 'cursor-crosshair' :
            tool === 'sticky' || tool === 'text' ? 'cursor-crosshair' :
            tool === 'rectangle' || tool === 'circle' || tool === 'triangle' ? 'cursor-crosshair' :
            tool === 'line' ? 'cursor-crosshair' :
            'cursor-default'
          } ${isPanning ? 'cursor-grabbing' : ''}`}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
          onWheel={handleWheel}
        >
          {/* Transformed content */}
          <div
            className="absolute inset-0 origin-top-left canvas-bg"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
            }}
          >
            {/* Grid */}
            {showGrid && (
              <svg className="absolute inset-0 pointer-events-none" style={{ width: '10000px', height: '10000px', left: '-5000px', top: '-5000px' }}>
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="#CBD5E1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            )}

            {/* SVG layer for drawings and lines */}
            <svg
              ref={svgRef}
              className="absolute inset-0 pointer-events-none"
              style={{ width: '10000px', height: '10000px', left: '-5000px', top: '-5000px', overflow: 'visible' }}
            >
              <g className="pointer-events-auto">
                {elements.filter(el => el.type === 'drawing' || el.type === 'line').map(renderElement)}
                {/* Current drawing path */}
                {currentPath.length > 1 && (
                  <path
                    d={currentPath.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                    stroke="#1F2937"
                    strokeWidth={3}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                {/* Temp shape */}
                {tempShape && tempShape.type === 'rectangle' && (
                  <rect x={tempShape.x} y={tempShape.y} width={tempShape.width} height={tempShape.height} fill={tempShape.color} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
                )}
                {tempShape && tempShape.type === 'circle' && (
                  <ellipse cx={tempShape.x + (tempShape.width || 0) / 2} cy={tempShape.y + (tempShape.height || 0) / 2} rx={(tempShape.width || 0) / 2} ry={(tempShape.height || 0) / 2} fill={tempShape.color} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
                )}
                {tempShape && tempShape.type === 'triangle' && tempShape.width && tempShape.height && (
                  <polygon
                    points={`${tempShape.x + tempShape.width / 2},${tempShape.y} ${tempShape.x + tempShape.width},${tempShape.y + tempShape.height} ${tempShape.x},${tempShape.y + tempShape.height}`}
                    fill={tempShape.color}
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth={2}
                  />
                )}
                {/* Line preview */}
                {lineStart && (
                  <circle cx={lineStart.x} cy={lineStart.y} r={5} fill="#6366F1" />
                )}
              </g>
            </svg>

            {/* HTML elements */}
            {elements.filter(el => el.type !== 'drawing' && el.type !== 'line').map(renderElement)}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 z-20 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center p-1">
          <button onClick={zoomOut} className="p-2 hover:bg-gray-100 rounded-lg" title="Zoom out">
            <ZoomOut size={16} className="text-gray-600" />
          </button>
          <button onClick={resetView} className="px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded min-w-[50px]">
            {Math.round(zoom * 100)}%
          </button>
          <button onClick={zoomIn} className="p-2 hover:bg-gray-100 rounded-lg" title="Zoom in">
            <ZoomIn size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Help tooltip */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur rounded-xl shadow-sm border border-gray-100 px-3 py-2 text-xs text-gray-500">
          <span className="font-medium text-gray-700">Tip:</span> Scroll to zoom • Shift+drag to pan • Double-click sticky to edit
        </div>

        {/* Empty state */}
        {elements.length === 0 && tool === 'select' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Start creating your lesson</h3>
              <p className="text-sm text-gray-500 mb-4">Choose a tool from the left toolbar to begin</p>
              <div className="flex gap-2 justify-center pointer-events-auto">
                <button
                  onClick={() => loadTemplate(templateBoards[0])}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                >
                  Use Lesson Template
                </button>
                <button
                  onClick={() => setTool('sticky')}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Add Sticky Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Share Board</h2>
              <button onClick={() => setShowShareModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Board link</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    readOnly
                    value={`https://eslhub.com/board/${currentBoardId}`}
                    className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600"
                  />
                  <button className="px-3 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Invite by email</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="email"
                    placeholder="colleague@school.com"
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-sm font-medium">
                    Invite
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <p className="text-sm font-medium text-gray-700">Permissions</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="perm" defaultChecked className="text-indigo-600" />
                  <span className="text-sm text-gray-700">Can edit</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="perm" className="text-indigo-600" />
                  <span className="text-sm text-gray-700">Can view only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="perm" className="text-indigo-600" />
                  <span className="text-sm text-gray-700">Can comment</span>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Link2 size={16} className="text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-900">Anyone with the link</span>
                </div>
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">Change</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiroBoard;
