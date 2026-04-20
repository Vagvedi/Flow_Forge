import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const TaskNode = memo(({ data, selected }: NodeProps<WorkflowNode['data']>) => {
  return (
    <div className={`
      px-3 py-2 bg-white rounded-xl shadow-sm border transition-all min-w-[200px]
      ${selected ? 'border-pink-400 ring-2 ring-pink-50' : 'border-gray-100'}
    `}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-1.5 h-1.5 bg-gray-300 border-none"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-1.5 h-1.5 bg-gray-300 border-none"
      />
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-pink-100/80 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div>
          <div className="font-semibold text-gray-800 text-sm leading-tight">{data.title || 'Task'}</div>
          <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{data.description || 'Manual Task'}</div>
        </div>
      </div>
    </div>
  )
})

TaskNode.displayName = 'TaskNode'
