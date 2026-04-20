import type { WorkflowNode } from '../../types'

interface TaskNodeFormProps {
  node: WorkflowNode
  onUpdate: (updates: Partial<WorkflowNode>) => void
}

export function TaskNodeForm({ node, onUpdate }: TaskNodeFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          value={node.data.title || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, title: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg 
                   bg-white text-gray-900
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={node.data.description || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, description: e.target.value }
          })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg 
                   bg-white text-gray-900
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none resize-none"
          placeholder="Enter task description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assignee
        </label>
        <input
          type="text"
          value={node.data.assignee || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, assignee: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg 
                   bg-white text-gray-900
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
          placeholder="Enter assignee name or email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={node.data.dueDate || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, dueDate: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg 
                   bg-white text-gray-900
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
        />
      </div>
    </div>
  )
}
