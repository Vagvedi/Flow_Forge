import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const StartNode = memo(({ data, selected }: NodeProps<WorkflowNode['data']>) => {
  return (
    <div className={`
      px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 
      text-white rounded-lg shadow-lg border-2 transition-all
      ${selected ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-green-700'}
      min-w-[150px]
    `}>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-300 border-2 border-green-600"
      />
      
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div>
          <div className="font-semibold text-sm">{data.title || 'Start'}</div>
          {data.metadata && Object.keys(data.metadata).length > 0 && (
            <div className="text-xs text-green-100 mt-1">
              {Object.keys(data.metadata).length} metadata fields
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

StartNode.displayName = 'StartNode'
