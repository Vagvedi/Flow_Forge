import type { WorkflowNode } from '../../types'
import { User, Calendar, FileText, HelpCircle } from 'lucide-react'

interface TaskNodeFormProps {
  node: WorkflowNode
  onUpdate: (updates: Partial<WorkflowNode>) => void
}

export function TaskNodeForm({ node, onUpdate }: TaskNodeFormProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Assignee Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <User className="w-3 h-3" />
            Execution Assignee
          </label>
          <HelpCircle className="w-3 h-3 text-gray-200 cursor-help" />
        </div>
        <div className="relative group">
          <select
            value={node.data.assignee || ''}
            onChange={(e) => onUpdate({
              data: { ...node.data, assignee: e.target.value }
            })}
            className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl
                     text-gray-800 text-sm appearance-none
                     hover:border-gray-200 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 focus:outline-none transition-all cursor-pointer shadow-sm"
          >
            <option value="" disabled>Select workforce role...</option>
            <option value="manager">Lead Manager</option>
            <option value="hr">HR Specialist</option>
            <option value="candidate">Candidate / External</option>
            <option value="ops">Ops Coordinator</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-focus-within:text-blue-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <FileText className="w-3 h-3" />
          Task Directives
        </label>
        <textarea
          value={node.data.description || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, description: e.target.value }
          })}
          rows={3}
          className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl
                   text-gray-800 text-sm placeholder:text-gray-300
                   hover:border-gray-200 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 focus:outline-none resize-none transition-all shadow-sm"
          placeholder="Specify the operational goals for this task..."
        />
        <div className="flex justify-end">
          <span className="text-[9px] text-gray-300 font-medium">Character count: {node.data.description?.length || 0}</span>
        </div>
      </div>

      {/* Due Date Section */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Calendar className="w-3 h-3" />
          Completion Deadline
        </label>
        <div className="relative">
          <input
            type="date"
            value={node.data.dueDate || ''}
            onChange={(e) => onUpdate({
              data: { ...node.data, dueDate: e.target.value }
            })}
            className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl
                     text-gray-800 text-sm
                     hover:border-gray-200 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 focus:outline-none transition-all shadow-sm"
          />
        </div>
      </div>
    </div>
  )
}

