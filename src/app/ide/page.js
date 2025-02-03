'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import ProblemDescription from '../components/ide/ProblemDescription';
import CodeEditor from '../components/ide/CodeEditor';
import Console from '../components/ide/Console';
import TestCases from '../components/ide/TestCases';
import { executeCode } from '../utils/webcontainer';

const defaultCodes = {
  javascript: `function twoSum(nums, target) {
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
console.log(twoSum(nums, target));`,

  python: `def two_sum(nums, target):
    # Write your solution here
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return None

# Test the function
nums = [2, 7, 11, 15]
target = 9
print(two_sum(nums, target))`,

  java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = solution.twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}`,

  cpp: `#include <vector>
#include <unordered_map>
#include <iostream>

using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    unordered_map<int, int> map;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSum(nums, target);
    cout << "[" << result[0] << ", " << result[1] << "]" << endl;
    return 0;
}`,

  c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your solution here
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    return result;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int numsSize = 4;
    int target = 9;
    int returnSize;
    int* result = twoSum(nums, numsSize, target, &returnSize);
    printf("[%d, %d]\\n", result[0], result[1]);
    free(result);
    return 0;
}`
};

export default function IDEPage() {
  const [code, setCode] = useState(defaultCodes.javascript);
  const [theme, setTheme] = useState("vs-dark");
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(40); // percentage
  const [consoleHeight, setConsoleHeight] = useState(30); // percentage
  const [testPanelHeight, setTestPanelHeight] = useState(65); // percentage - problem description takes 65%, test cases 35%
  const [language, setLanguage] = useState('javascript');
  const [testCases, setTestCases] = useState([
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      expected: [0, 1]
    },
    {
      input: { nums: [3, 2, 4], target: 6 },
      expected: [1, 2]
    },
    {
      input: { nums: [3, 3], target: 6 },
      expected: [0, 1]
    }
  ]);
  const isDraggingRef = useRef(false);
  const isConsoleResizingRef = useRef(false);
  const isTestPanelResizingRef = useRef(false);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (newLanguage) => {
    // First update the language
    setLanguage(newLanguage);
    // Then update the code with the corresponding template
    if (defaultCodes[newLanguage]) {
      setCode(defaultCodes[newLanguage]);
    }
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

  const runTests = async () => {
    setIsRunning(true);
    setOutput("Running tests...");
    
    const results = [];
    let allPassed = true;
    
    try {
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const { nums, target } = testCase.input;
        
        // Create test wrapper based on language
        let testCode;
        if (language === 'javascript') {
          testCode = `
            ${code}
            const result = twoSum([${nums}], ${target});
            console.log(JSON.stringify(result));
          `;
        } else if (language === 'python') {
          testCode = `
            ${code}
            result = two_sum([${nums}], ${target})
            print(result)
          `;
        } else {
          throw new Error(`Language ${language} is not supported for testing`);
        }
        
        const result = await executeCode(testCode, language);
        
        if (result.success) {
          try {
            // Clean the output by removing any whitespace, newlines, or quotes
            const cleanOutput = result.output.trim().replace(/[\r\n"']/g, '');
            let output;
            
            try {
              // Try to parse as JSON first
              output = JSON.parse(cleanOutput);
            } catch {
              // If not valid JSON, try to parse array-like string
              const matches = cleanOutput.match(/\[(.*?)\]/);
              if (matches) {
                output = matches[1].split(',').map(num => parseInt(num.trim()));
              } else {
                throw new Error('Invalid output format');
              }
            }

            const passed = Array.isArray(output) && 
                          output.length === 2 && 
                          output[0] === testCase.expected[0] && 
                          output[1] === testCase.expected[1];
            
            results.push({
              ...testCase,
              result: {
                passed,
                output
              }
            });
            
            if (!passed) allPassed = false;
          } catch (e) {
            results.push({
              ...testCase,
              result: {
                passed: false,
                output: result.output.trim()
              }
            });
            allPassed = false;
          }
        } else {
          results.push({
            ...testCase,
            result: {
              passed: false,
              output: result.error
            }
          });
          allPassed = false;
        }
      }
      
      setTestCases(results);
      setOutput(allPassed ? "All test cases passed! 🎉" : "Some test cases failed.");
    } catch (error) {
      setOutput(`Error running tests: ${error.message}`);
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

  const startTestPanelResizing = (e) => {
    e.preventDefault();
    isTestPanelResizingRef.current = true;
    document.addEventListener('mousemove', handleTestPanelMouseMove);
    document.addEventListener('mouseup', stopTestPanelResizing);
  };

  const handleTestPanelMouseMove = (e) => {
    if (!isTestPanelResizingRef.current) return;
    
    const leftPanel = document.getElementById('left-panel');
    if (!leftPanel) return;

    const containerRect = leftPanel.getBoundingClientRect();
    const totalHeight = containerRect.height;
    const distanceFromTop = e.clientY - containerRect.top;
    const newHeight = (distanceFromTop / totalHeight) * 100;
    
    // Limit the height between 20% and 80%
    setTestPanelHeight(Math.min(Math.max(20, newHeight), 80));
  };

  const stopTestPanelResizing = () => {
    isTestPanelResizingRef.current = false;
    document.removeEventListener('mousemove', handleTestPanelMouseMove);
    document.removeEventListener('mouseup', stopTestPanelResizing);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResizing);
      document.removeEventListener('mousemove', handleConsoleMouseMove);
      document.removeEventListener('mouseup', stopConsoleResizing);
      document.removeEventListener('mousemove', handleTestPanelMouseMove);
      document.removeEventListener('mouseup', stopTestPanelResizing);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navigation />

      <div id="main-container" className="flex-1 flex relative">
        {/* Problem Description Panel */}
        <div 
          id="left-panel"
          className="border-r border-gray-800 overflow-hidden flex flex-col"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div 
            className="overflow-y-auto scrollbar-hide"
            style={{ height: `${testPanelHeight}%` }}
          >
            <ProblemDescription />
          </div>

          {/* Test Panel Resize Handle */}
          <div
            className="h-1 bg-gray-800 hover:bg-indigo-500 cursor-row-resize transition-colors"
            onMouseDown={startTestPanelResizing}
          />

          <div 
            className="flex-1 overflow-y-auto scrollbar-hide"
            style={{ height: `${100 - testPanelHeight}%` }}
          >
            <TestCases 
              testCases={testCases}
              onRunTests={runTests}
              isRunning={isRunning}
            />
          </div>
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
            onLanguageChange={handleLanguageChange}
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
