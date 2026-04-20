import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const EndNode = memo(({ data, selected }: NodeProps<WorkflowNode['data']>) => {
  return (
    <div className={`
      px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 
      text-white rounded-lg shadow-lg border-2 transition-all
      ${selected ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-red-700'}
      min-w-[150px]
    `}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-red-300 border-2 border-red-600"
      />
      
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{data.title || 'End'}</div>
          {data.message && (
            <div className="text-xs text-red-100 mt-1 line-clamp-2">
              {data.message}
            </div>
          )}
          {data.showSummary && (
            <div className="text-xs text-red-100 mt-1">
              Summary enabled
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

EndNode.displayName = 'EndNode'
