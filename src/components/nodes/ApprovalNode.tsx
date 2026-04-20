import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const ApprovalNode = memo(({ data, selected }: NodeProps<WorkflowNode['data']>) => {
  return (
    <div className={`
      px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
      text-white rounded-lg shadow-lg border-2 transition-all
      ${selected ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-orange-700'}
      min-w-[180px]
    `}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-orange-300 border-2 border-orange-600"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-orange-300 border-2 border-orange-600"
      />
      
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 bg-orange-300 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-orange-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{data.title || 'Approval'}</div>
          {data.approverRole && (
            <div className="text-xs text-orange-100 mt-1">
              Approver: {data.approverRole}
            </div>
          )}
          {data.threshold && (
            <div className="text-xs text-orange-100 mt-1">
              Threshold: {data.threshold}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

ApprovalNode.displayName = 'ApprovalNode'
