import type { WorkflowNode } from '../../types'

interface ApprovalNodeFormProps {
  node: WorkflowNode
  onUpdate: (updates: Partial<WorkflowNode>) => void
}

export function ApprovalNodeForm({ node, onUpdate }: ApprovalNodeFormProps) {
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
          placeholder="Enter approval title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Approver Role
        </label>
        <select
          value={node.data.approverRole || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, approverRole: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select approver role</option>
          <option value="manager">Manager</option>
          <option value="hr">HR Representative</option>
          <option value="director">Director</option>
          <option value="ceo">CEO</option>
          <option value="finance">Finance</option>
          <option value="legal">Legal</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Approval Threshold
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={node.data.threshold || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, threshold: parseInt(e.target.value) || undefined }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter threshold (1-100)"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Number of approvals required (leave empty for single approval)
        </p>
      </div>
    </div>
  )
}
