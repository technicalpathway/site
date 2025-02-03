'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import ProblemDescription from '../components/ide/ProblemDescription';
import CodeEditor from '../components/ide/CodeEditor';
import Console from '../components/ide/Console';
import { executeCode } from '../utils/webcontainer';

const defaultCode = `function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return null;
}

// Test the function
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target));`;

export default function IDEPage() {
  const [code, setCode] = useState(defaultCode);
  const [theme, setTheme] = useState("vs-dark");
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(40); // percentage
  const [consoleHeight, setConsoleHeight] = useState(30); // percentage
  const [language, setLanguage] = useState('javascript');
  const isDraggingRef = useRef(false);
  const isConsoleResizingRef = useRef(false);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running...");
    
    try {
      const result = await executeCode(code, language);
      if (result.success) {
        setOutput(result.output);
      } else {
        setOutput(`Error: ${result.error}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const startResizing = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
  };

  const startConsoleResizing = (e) => {
    e.preventDefault();
    isConsoleResizingRef.current = true;
    document.addEventListener('mousemove', handleConsoleMouseMove);
    document.addEventListener('mouseup', stopConsoleResizing);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    
    const container = document.getElementById('main-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Limit the width between 20% and 80%
    setLeftPanelWidth(Math.min(Math.max(20, newWidth), 80));
  };

  const handleConsoleMouseMove = (e) => {
    if (!isConsoleResizingRef.current) return;
    
    const editorContainer = document.getElementById('editor-container');
    if (!editorContainer) return;

    const containerRect = editorContainer.getBoundingClientRect();
    const totalHeight = containerRect.height;
    const distanceFromBottom = totalHeight - (e.clientY - containerRect.top);
    const newHeight = (distanceFromBottom / totalHeight) * 100;
    
    // Limit the height between 10% and 80%
    setConsoleHeight(Math.min(Math.max(10, newHeight), 80));
  };

  const stopResizing = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
  };

  const stopConsoleResizing = () => {
    isConsoleResizingRef.current = false;
    document.removeEventListener('mousemove', handleConsoleMouseMove);
    document.removeEventListener('mouseup', stopConsoleResizing);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResizing);
      document.removeEventListener('mousemove', handleConsoleMouseMove);
      document.removeEventListener('mouseup', stopConsoleResizing);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navigation />

      <div id="main-container" className="flex-1 flex relative">
        {/* Problem Description Panel */}
        <div 
          className="border-r border-gray-800 overflow-hidden flex flex-col"
          style={{ width: `${leftPanelWidth}%` }}
        >
       
          <ProblemDescription />
        </div>

        {/* Resize Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gray-800 hover:bg-indigo-500 cursor-col-resize transition-colors z-10"
          style={{ left: `${leftPanelWidth}%` }}
          onMouseDown={startResizing}
        />

        {/* Editor and Console */}
        <div 
          id="editor-container"
          className="flex-1 flex flex-col relative overflow-hidden"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <CodeEditor 
            code={code}
            onCodeChange={handleEditorChange}
            theme={theme}
            isRunning={isRunning}
            onRun={runCode}
            height={`${100 - consoleHeight}%`}
            language={language}
            onLanguageChange={setLanguage}
          />

          {/* Console Resize Handle */}
          <div
            className="absolute left-0 right-0 h-1 bg-gray-800 hover:bg-indigo-500 cursor-row-resize transition-colors z-10"
            style={{ bottom: `${consoleHeight}%` }}
            onMouseDown={startConsoleResizing}
          />

          <Console 
            isOpen={isConsoleOpen}
            onToggle={() => setIsConsoleOpen(!isConsoleOpen)}
            output={output}
            height={consoleHeight}
          />
        </div>
      </div>
    </div>
  );
}
