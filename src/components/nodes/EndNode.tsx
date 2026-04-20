import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const EndNode = memo(({ data, selected }: NodeProps<WorkflowNode['data']>) => {
  return (
    <div className={`
      px-3 py-2 bg-white rounded-xl shadow-sm border transition-all min-w-[160px]
      ${selected ? 'border-green-400 ring-2 ring-green-50' : 'border-gray-100'}
    `}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-1.5 h-1.5 bg-gray-300 border-none"
      />
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-green-100/80 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-7l.5.5" />
          </svg>
        </div>
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
