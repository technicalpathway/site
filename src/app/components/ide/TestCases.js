import { BeakerIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function TestCases({ testCases, onRunTests, isRunning }) {
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return `[${value.join(', ')}]`;
    }
    if (typeof value === 'object') {
      const { nums, target } = value;
      return `{"nums": [${nums.join(', ')}], "target": ${target}}`;
    }
    return String(value);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-10">
        <h3 className="text-white font-medium">Test Cases</h3>
        <button
          onClick={onRunTests}
          disabled={isRunning}
          className={`px-3 py-1.5 rounded-md inline-flex items-center justify-center space-x-1.5 text-sm ${
            isRunning
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
        >
          <BeakerIcon className="w-4 h-4" />
          <span>Run Tests</span>
        </button>
      </div>
      
      <div className="divide-y divide-gray-800 flex-1">
        {testCases.map((testCase, index) => (
          <div key={index} className="p-4 bg-gray-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 font-medium">Test Case {index + 1}</span>
              {testCase.result && (
                <div className="flex items-center">
                  {testCase.result.passed ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-400">Input: </span>
                <span className="text-gray-300 font-mono">{formatValue(testCase.input)}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Expected: </span>
                <span className="text-gray-300 font-mono">{formatValue(testCase.expected)}</span>
              </div>
              {testCase.result && !testCase.result.passed && (
                <div className="text-sm">
                  <span className="text-gray-400">Got: </span>
                  <span className="text-red-400 font-mono">{formatValue(testCase.result.output)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 