import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const EndNode = memo(
  ({ data, selected }: NodeProps<WorkflowNode['data']>) => {
    return (
      <div
        className={`
          px-3 py-2 bg-white rounded-xl shadow-sm border transition-all min-w-[160px]
          ${selected ? 'border-green-400 ring-2 ring-green-50' : 'border-gray-100'}
        `}
      >
        {/* Top Handle */}
        <Handle
          type="target"
          position={Position.Top}
          className="w-1.5 h-1.5 bg-gray-300 border-none"
        />

        {/* Content */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="text-sm font-medium text-gray-700">
              {data?.title || 'End'}
            </div>

            {data?.showSummary && (
              <div className="text-xs text-gray-400 mt-1">
                Summary enabled
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

EndNode.displayName = 'EndNode'