import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Console({ isOpen, onToggle, output, height }) {
  return (
    <div 
      className="border-t border-gray-800 flex flex-col"
      style={{ height: `${height}%` }}
    >
      <div
        className="px-4 py-2 bg-gray-800 flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <span className="text-gray-300 font-medium">Console</span>
        {isOpen ? (
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronUpIcon className="w-5 h-5 text-gray-400" />
        )}
      </div>
      {isOpen && (
        <div className="flex-1 bg-gray-900 p-4 font-mono text-sm overflow-auto">
          <pre className="text-gray-300 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
} 