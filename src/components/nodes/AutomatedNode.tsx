import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const AutomatedNode = memo(({ data, selected }: NodeProps<WorkflowNode['data']>) => {
  return (
    <div className={`
      px-3 py-2 bg-white rounded-xl shadow-sm border transition-all min-w-[200px]
      ${selected ? 'border-purple-400 ring-2 ring-purple-50' : 'border-gray-100'}
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
        <div className="w-8 h-8 rounded-lg bg-purple-100/80 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <div className="font-semibold text-gray-800 text-sm leading-tight">{data.title || 'Automation'}</div>
          <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{data.description || 'Automated Action'}</div>
        </div>
      </div>
    </div>
  )
})

AutomatedNode.displayName = 'AutomatedNode'
