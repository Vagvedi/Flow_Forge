import type { WorkflowNode } from '../../types'
import { ShieldCheck, Hash, MessageSquare } from 'lucide-react'

interface ApprovalNodeFormProps {
  node: WorkflowNode
  onUpdate: (updates: Partial<WorkflowNode>) => void
}

export function ApprovalNodeForm({ node, onUpdate }: ApprovalNodeFormProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Approver Role Section */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3" />
          Review Authority
        </label>
        <div className="relative group">
          <select
            value={node.data.approverRole || ''}
            onChange={(e) => onUpdate({
              data: { ...node.data, approverRole: e.target.value }
            })}
            className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl
                     text-gray-800 text-sm appearance-none
                     hover:border-gray-200 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 focus:outline-none transition-all cursor-pointer shadow-sm"
          >
            <option value="" disabled>Select authority role...</option>
            <option value="hr_manager">HR Director / Manager</option>
            <option value="dept_head">Department Head</option>
            <option value="finance">Finance Controller</option>
            <option value="legal">Legal Counsel</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-focus-within:text-blue-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {/* Threshold Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Hash className="w-3 h-3" />
            Requirement Threshold
          </label>
          <span className="text-[9px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">Numeric</span>
        </div>
        <input
          type="number"
          min="1"
          max="10"
          value={node.data.threshold || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, threshold: parseInt(e.target.value) || undefined }
          })}
          className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl
                   text-gray-800 text-sm
                   hover:border-gray-200 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 focus:outline-none transition-all shadow-sm"
          placeholder="Min. approvals required (e.g., 1)"
        />
        <p className="text-[10px] text-gray-400 font-medium pl-1">
          Specify the number of unique identifiers required to pass this stage.
        </p>
      </div>

      {/* Description Section */}
      <div className="space-y-2 pt-2">
        <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <MessageSquare className="w-3 h-3" />
          Refusal / Approval Context
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
          placeholder="Provide instructions for the reviewing authority..."
        />
      </div>
    </div>
  )
}

