import type { WorkflowNode } from '../../types'
import { Flag, MessageSquare, CheckCircle } from 'lucide-react'

interface EndNodeFormProps {
  node: WorkflowNode
  onUpdate: (updates: Partial<WorkflowNode>) => void
}

export function EndNodeForm({ node, onUpdate }: EndNodeFormProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Title Section */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Flag className="w-3 h-3" />
          End State Label
        </label>
        <input
          type="text"
          value={node.data.title || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, title: e.target.value }
          })}
          className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl
                   text-gray-800 text-sm placeholder:text-gray-300
                   hover:border-gray-200 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 focus:outline-none transition-all shadow-sm"
          placeholder="Workflow Finalized"
        />
      </div>

      {/* Message Section */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <MessageSquare className="w-3 h-3" />
          Completion Message
        </label>
        <textarea
          value={node.data.message || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, message: e.target.value }
          })}
          rows={3}
          id="showSummary"
          checked={node.data.showSummary || false}
          onChange={(e) => onUpdate({
            data: { ...node.data, showSummary: e.target.checked }
          })}
          className="w-4 h-4 text-blue-400 border-gray-200 rounded 
                   focus:ring-blue-400 focus:ring-offset-0 focus:ring-2"
        />
        <label htmlFor="showSummary" className="text-sm text-gray-600 font-medium cursor-pointer">
          Show workflow summary
        </label>
      </div>
    </div>
  )
}
