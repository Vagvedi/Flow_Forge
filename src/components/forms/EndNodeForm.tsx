import type { WorkflowNode } from '../../types'

interface EndNodeFormProps {
  node: WorkflowNode
  onUpdate: (updates: Partial<WorkflowNode>) => void
}

export function EndNodeForm({ node, onUpdate }: EndNodeFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={node.data.title || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, title: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter end node title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message
        </label>
        <textarea
          value={node.data.message || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, message: e.target.value }
          })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter completion message"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="showSummary"
          checked={node.data.showSummary || false}
          onChange={(e) => onUpdate({
            data: { ...node.data, showSummary: e.target.checked }
          })}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded 
                   focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
        />
        <label htmlFor="showSummary" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          Show workflow summary
        </label>
      </div>
    </div>
  )
}
