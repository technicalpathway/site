import Editor from "@monaco-editor/react";
import { PlayIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

// Define custom theme
const customTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#111827',              // gray-900
    'editor.lineHighlightBackground': '#1F2937', // gray-800
    'editor.selectionBackground': '#374151',     // gray-700
    'editorCursor.foreground': '#818CF8',        // indigo-400
    'editorLineNumber.foreground': '#4B5563',    // gray-600
    'editorLineNumber.activeForeground': '#9CA3AF', // gray-400
    'editor.selectionHighlightBackground': '#374151', // gray-700
    'editorIndentGuide.background': '#374151',   // gray-700
  }
};

export default function CodeEditor({ 
  code, 
  onCodeChange, 
  theme, 
  isRunning, 
  onRun, 
  height,
  language = 'javascript',
  onLanguageChange = () => {} // Add default no-op function
}) {
  const languages = [
    { id: 'javascript', name: 'JavaScript', supported: true },
    { id: 'python', name: 'Python', supported: true },
    { id: 'java', name: 'Java', supported: false },
    { id: 'cpp', name: 'C++', supported: false },
    { id: 'c', name: 'C', supported: false },
  ];

  const getLanguageDisplay = (lang) => {
    const language = languages.find(l => l.id === lang);
    if (!language) return lang;
    if (!language.supported) return `${language.name}`;
    return language.name;
  };

  return (
    <>
      {/* Editor Header */}
      <div className="bg-gray-800 px-4 py-2 py-3.2 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Editor</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onRun}
              disabled={isRunning || !languages.find(l => l.id === language)?.supported}
              className={`px-3 py-1.5 rounded-md inline-flex items-center justify-center space-x-1.5 text-sm ${
                isRunning || !languages.find(l => l.id === language)?.supported
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-indigo-500'
              }`}
            >
              <PlayIcon className="w-4 h-4" />
              <span>Run</span>
            </button>
            <div className="flex items-center space-x-2">
              <CodeBracketIcon className="w-5 h-5 text-gray-400" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-gray-700 text-white rounded-md px-3 py-1.5 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:bg-gray-600 transition-colors cursor-pointer appearance-none pr-8"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                {languages.map((lang) => (
                  <option 
                    key={lang.id} 
                    value={lang.id}
                    disabled={!lang.supported}
                    className={!lang.supported ? 'text-gray-500' : ''}
                  >
                    {getLanguageDisplay(lang.id)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div 
        className="flex-1"
        style={{ height }}
      >
        <Editor
          height="100%"
          language={language}
          theme="customTheme"
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('customTheme', customTheme);
          }}
          value={code}
          onChange={onCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            tabSize: 2,
            fontFamily: 'var(--font-geist-mono)',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </>
  );
} 