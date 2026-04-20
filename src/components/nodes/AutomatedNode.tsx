import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const AutomatedNode = memo(({ data, selected }: NodeProps<WorkflowNode['data']>) => {
  return (
    <div className={`
      px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 
      text-white rounded-lg shadow-lg border-2 transition-all
      ${selected ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-purple-700'}
      min-w-[180px]
    `}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-300 border-2 border-purple-600"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-purple-300 border-2 border-purple-600"
      />
      
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 bg-purple-300 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{data.title || 'Automation'}</div>
          {data.automationId && (
            <div className="text-xs text-purple-100 mt-1">
              ID: {data.automationId}
            </div>
          )}
          {data.automationParams && Object.keys(data.automationParams).length > 0 && (
            <div className="text-xs text-purple-100 mt-1">
              {Object.keys(data.automationParams).length} parameters
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

AutomatedNode.displayName = 'AutomatedNode'
