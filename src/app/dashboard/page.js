'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ChartBarIcon,
  ArrowRightIcon,
  UserIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  ArrowsPointingOutIcon,
  PlayIcon,
  DocumentTextIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import SlideOver from '../components/SlideOver';
import Navigation from '../components/Navigation';
export default function Dashboard() {
  const [selectedPath, setSelectedPath] = useState('Algorithms');
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();

    // Get mouse position relative to container
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate zoom
    const delta = -e.deltaY * 0.01;
    const newZoom = Math.min(Math.max(0.5, zoom + delta), 2);
    
    // Calculate new position to zoom towards cursor
    if (newZoom !== zoom) {
      const scale = newZoom / zoom;
      const newX = x - (x - position.x) * scale;
      const newY = y - (y - position.y) * scale;

      setZoom(newZoom);
      setPosition({ x: newX, y: newY });
    }
  };

  const handleGestureStart = (e) => {
    e.preventDefault();
  };

  const handleGestureChange = (e) => {
    e.preventDefault();
    const newZoom = Math.min(Math.max(0.5, zoom * e.scale), 2);
    setZoom(newZoom);
  };

  const handleZoom = (delta) => {
    if (!containerRef.current) return;

    // Get container center
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = rect.width / 2;
    const y = rect.height / 2;

    // Calculate new zoom
    const newZoom = Math.min(Math.max(0.5, zoom + delta), 2);
    
    // Calculate new position to zoom towards center
    if (newZoom !== zoom) {
      const scale = newZoom / zoom;
      const newX = x - (x - position.x) * scale;
      const newY = y - (y - position.y) * scale;

      setZoom(newZoom);
      setPosition({ x: newX, y: newY });
    }
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, dragStart]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('gesturestart', handleGestureStart);
      container.addEventListener('gesturechange', handleGestureChange);

      return () => {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('gesturestart', handleGestureStart);
        container.removeEventListener('gesturechange', handleGestureChange);
      };
    }
  }, [zoom, position]);

  const learningPaths = [
    { name: 'Algorithms', progress: '0/150' },
    { name: 'Courses', progress: '0/10' }
  ];

  const algorithmTopics = [
    {
      name: 'Arrays & Hashing',
      status: 'available',
      children: [
        {
          name: 'Two Pointers',
          status: 'locked',
          children: [
            { name: 'Binary Search', status: 'locked' },
            { name: 'Sliding Window', status: 'locked' },
            { name: 'Linked List', status: 'locked' }
          ]
        },
        {
          name: 'Stack',
          status: 'locked',
          children: []
        }
      ]
    },
    {
      name: 'Trees',
      status: 'locked',
      children: [
        { name: 'Tries', status: 'locked' },
        { 
          name: 'Heap / Priority Queue',
          status: 'locked',
          children: [
            { name: 'Intervals', status: 'locked' },
            { name: 'Greedy', status: 'locked' }
          ]
        }
      ]
    },
    {
      name: 'Backtracking',
      status: 'locked',
      children: [
        { 
          name: 'Graphs',
          status: 'locked',
          children: [
            { name: 'Advanced Graphs', status: 'locked' }
          ]
        },
        {
          name: '1-D DP',
          status: 'locked',
          children: [
            { name: '2-D DP', status: 'locked' },
            { name: 'Bit Manipulation', status: 'locked' }
          ]
        }
      ]
    },
    {
      name: 'Math & Geometry',
      status: 'locked'
    }
  ];

  const handleTopicClick = (topic) => {
    if (topic.status === 'locked') return;
    setSelectedTopic(topic);
    setIsSlideOverOpen(true);
  };

  const renderTopicContent = (topic) => {
    if (!topic) return null;

    return (
      <div className="py-6 space-y-8">
        {/* Description Section */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">About this topic</h3>
          <p className="text-gray-300">
            Learn the fundamentals of {topic.name} and how to apply them in coding interviews.
            Master the key concepts and common patterns to solve related problems effectively.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Problems</div>
            <div className="text-white text-lg font-semibold">0/15</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Completed</div>
            <div className="text-white text-lg font-semibold">0%</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Time Spent</div>
            <div className="text-white text-lg font-semibold">0h</div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors">
            <PlayIcon className="w-5 h-5 mr-2" />
            Start Learning
          </button>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              Resources
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <BeakerIcon className="w-5 h-5 mr-2" />
              Practice
            </button>
          </div>
        </div>

        {/* Prerequisites Section */}
        {topic.children && topic.children.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Prerequisites</h3>
            <div className="space-y-2">
              {topic.children.map((child) => (
                <div 
                  key={child.name}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <span className="text-gray-300">{child.name}</span>
                  <span className="text-gray-500">Locked</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderNode = (topic, level = 0) => {
    const nodeClasses = `
      relative px-4 py-2 rounded-lg 
      ${topic.status === 'available' ? 'bg-indigo-600 text-white cursor-pointer hover:bg-indigo-500' : 
        topic.status === 'completed' ? 'bg-green-600 text-white cursor-pointer hover:bg-green-500' : 
        'bg-gray-800 text-gray-300 cursor-not-allowed'}
    `;

    return (
      <div key={topic.name} className="flex flex-col items-center">
        <div 
          className={nodeClasses}
          onClick={() => handleTopicClick(topic)}
        >
          {topic.name}
        </div>
        {topic.children && topic.children.length > 0 && (
          <div className="mt-8 grid gap-8" 
               style={{ 
                 gridTemplateColumns: `repeat(${topic.children.length}, minmax(0, 1fr))`,
                 width: `${topic.children.length * 200}px`
               }}>
            {topic.children.map((child) => (
              <div key={child.name} className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-px h-4 bg-gray-600"></div>
                {renderNode(child, level + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <Navigation/>

      {/* Assessment Banner */}
      <div className="bg-indigo-900/50 border-b border-indigo-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <BeakerIcon className="h-5 w-5 text-indigo-400" aria-hidden="true" />
              </div>
              <div className="flex-1 md:flex md:justify-between">
                <p className="text-sm text-indigo-200">
                  Take your skill assessment exam to get a personalized learning path
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30">
                15 mins
              </span>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path Visualization */}
      <div 
        ref={containerRef}
        className="h-[calc(100vh-4rem)] w-full overflow-hidden"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className="min-w-max transition-transform duration-100"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: '50% 0%'
          }}
        >
          <div className="flex flex-col items-center space-y-16 p-8">
            {algorithmTopics.map((topic, index) => (
              <div key={topic.name} className="relative">
                {index > 0 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-px h-8 bg-gray-600"></div>
                )}
                {renderNode(topic)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="fixed bottom-4 left-4 flex flex-col space-y-2">
        {/* Zoom Controls */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 space-y-2">
            <button 
              onClick={() => handleZoom(0.1)}
              className="w-full p-2 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
              title="Zoom In"
            >
              <MagnifyingGlassPlusIcon className="w-5 h-5" />
              <span className="text-sm">Zoom In</span>
            </button>
            <button 
              onClick={() => handleZoom(-0.1)}
              className="w-full p-2 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
              title="Zoom Out"
            >
              <MagnifyingGlassMinusIcon className="w-5 h-5" />
              <span className="text-sm">Zoom Out</span>
            </button>
            <div className="border-t border-gray-700"></div>
            <button 
              onClick={resetView}
              className="w-full p-2 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
              title="Reset View"
            >
              <ArrowsPointingOutIcon className="w-5 h-5" />
              <span className="text-sm">Reset View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <div className="fixed bottom-4 right-4">
        <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg">
          ?
        </button>
      </div>

      {/* Topic Slide Over */}
      <SlideOver
        open={isSlideOverOpen}
        setOpen={setIsSlideOverOpen}
        title={selectedTopic?.name || ''}
      >
        {renderTopicContent(selectedTopic)}
      </SlideOver>
    </div>
  );
}
