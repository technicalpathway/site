import { BeakerIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function ProblemDescription() {
  // Mock data - in a real app this would come from your backend
  const featuredCompanies = [
    { name: 'Google' },
    { name: 'Amazon' },
    { name: 'Microsoft' },
    { name: 'Meta' }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Two Sum</h2>
            <div className="flex space-x-2">
              <div className="flex items-center bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full text-sm">
                <BeakerIcon className="w-4 h-4 mr-1" />
                <span>Medium</span>
              </div>
              <div className="flex items-center bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-full text-sm">
                <DocumentTextIcon className="w-4 h-4 mr-1" />
                <span>Array</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Companies:</span>
            {featuredCompanies.map((company, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
              >
                {company.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-300">
            Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
            You may assume that each input would have exactly one solution, and you may not use the same element twice.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white mb-1">Example 1:</h3>
          <pre className="bg-gray-800 p-3 rounded text-sm text-gray-300">
            Input: nums = [2,7,11,15], target = 9{'\n'}
            Output: [0,1]{'\n'}
            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
          </pre>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white mb-1">Constraints:</h3>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-0.5">
            <li>2 ≤ nums.length ≤ 104</li>
            <li>-109 ≤ nums[i] ≤ 109</li>
            <li>-109 ≤ target ≤ 109</li>
            <li>Only one valid answer exists.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 