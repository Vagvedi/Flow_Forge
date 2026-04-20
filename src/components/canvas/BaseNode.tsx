import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

interface BaseNodeProps extends NodeProps<WorkflowNode['data']> {
  type: 'start' | 'task' | 'approval' | 'automated' | 'end'
}

const getNodeStyles = (type: BaseNodeProps['type']) => {
  switch (type) {
    case 'start':
      return {
        bgColor: 'pastel-blue',
        iconColor: 'text-blue-600',
        icon: 'START'
      }
    case 'task':
      return {
        bgColor: 'pastel-pink',
        iconColor: 'text-pink-600',
        icon: 'TASK'
      }
    case 'approval':
      return {
        bgColor: 'pastel-peach',
        iconColor: 'text-orange-600',
        icon: 'APPROVE'
      }
    case 'automated':
      return {
        bgColor: 'pastel-lavender',
        iconColor: 'text-purple-600',
        icon: 'AUTO'
      }
    case 'end':
      return {
        bgColor: 'pastel-mint',
        iconColor: 'text-green-600',
        icon: 'END'
      }
    default:
      return {
        bgColor: 'bg-gray-100',
        iconColor: 'text-gray-600',
        icon: 'NODE'
      }
  }
}

export const BaseNode = memo(({ data, selected, type }: BaseNodeProps) => {
  const styles = getNodeStyles(type)

  return (
    <div
      className={`
        relative bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all
        ${selected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        min-w-[160px] max-w-[200px]
      `}
    >
      {/* Target Handle - Top */}
      {type !== 'start' && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-white border-2 border-gray-300"
        />
      )}

      {/* Node Content */}
      <div className={`p-4 ${styles.bgColor} rounded-t-xl`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${styles.bgColor} flex items-center justify-center flex-shrink-0 border border-gray-200`}>
            <span className={`text-lg ${styles.iconColor}`}>{styles.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-800 text-sm truncate">
              {data.title || type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
            <div className="text-xs text-gray-500 capitalize">
              {type}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content */}
      <div className="p-4 pt-2">
        {data.description && (
          <div className="text-xs text-gray-600 mb-2 line-clamp-2">
            {data.description}
          </div>
        )}

        {/* Type-specific content */}
        {type === 'task' && data.assignee && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-gray-400 font-medium">User:</span>
            <span className="truncate">{data.assignee}</span>
          </div>
        )}

        {type === 'approval' && data.approverRole && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-gray-400 font-medium">Role:</span>
            <span className="truncate">{data.approverRole}</span>
          </div>
        )}

        {type === 'automated' && data.automationId && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-gray-400 font-medium">ID:</span>
            <span className="truncate">{data.automationId}</span>
          </div>
        )}

        {type === 'end' && data.message && (
          <div className="text-xs text-gray-600 italic truncate">
            "{data.message}"
          </div>
        )}
      </div>

      {/* Source Handle - Bottom */}
      {type !== 'end' && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-white border-2 border-gray-300"
        />
      )}
    </div>
  )
})

BaseNode.displayName = 'BaseNode'