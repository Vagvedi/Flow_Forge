import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const StartNode = memo(({ data, selected }: NodeProps<WorkflowNode['data']>) => {
  return (
    <div className={`
      px-3 py-2 bg-white rounded-xl shadow-sm border transition-all min-w-[160px]
      ${selected ? 'border-blue-400 ring-2 ring-blue-50' : 'border-gray-100'}
    `}>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-1.5 h-1.5 bg-gray-300 border-none"
      />
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-100/80 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className="font-semibold text-gray-800 text-sm leading-tight">{data.title || 'Start'}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Initialize Workflow</div>
        </div>
      </div>
    </div>
  )
})

StartNode.displayName = 'StartNode'
