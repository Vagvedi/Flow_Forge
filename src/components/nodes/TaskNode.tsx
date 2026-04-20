import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const TaskNode = memo(({ data, selected }: NodeProps<WorkflowNode['data']>) => {
  return (
    <div className={`
      px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 
      text-white rounded-lg shadow-lg border-2 transition-all
      ${selected ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-blue-700'}
      min-w-[180px]
    `}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-300 border-2 border-blue-600"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-300 border-2 border-blue-600"
      />
      
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 bg-blue-300 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{data.title || 'Task'}</div>
          {data.description && (
            <div className="text-xs text-blue-100 mt-1 line-clamp-2">
              {data.description}
            </div>
          )}
          {data.assignee && (
            <div className="text-xs text-blue-100 mt-1">
              Assigned to: {data.assignee}
            </div>
          )}
          {data.dueDate && (
            <div className="text-xs text-blue-100 mt-1">
              Due: {new Date(data.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

TaskNode.displayName = 'TaskNode'
