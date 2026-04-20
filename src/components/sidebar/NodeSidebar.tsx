import { useState } from 'react'

interface NodeType {
  type: 'start' | 'task' | 'approval' | 'automated' | 'end'
  label: string
  description: string
  icon: string
  bgColor: string
  iconColor: string
}

const nodeTypes: NodeType[] = [
  {
    type: 'start',
    label: 'Start',
    description: 'Beginning of workflow',
    icon: 'START',
    bgColor: 'pastel-blue',
    iconColor: 'text-blue-600'
  },
  {
    type: 'task',
    label: 'Task',
    description: 'Manual task assignment',
    icon: 'TASK',
    bgColor: 'pastel-pink',
    iconColor: 'text-pink-600'
  },
  {
    type: 'approval',
    label: 'Approval',
    description: 'Approval step',
    icon: 'APPROVE',
    bgColor: 'pastel-peach',
    iconColor: 'text-orange-600'
  },
  {
    type: 'automated',
    label: 'Automation',
    description: 'Automated action',
    icon: 'AUTO',
    bgColor: 'pastel-lavender',
    iconColor: 'text-purple-600'
  },
  {
    type: 'end',
    label: 'End',
    description: 'End of workflow',
    icon: 'END',
    bgColor: 'pastel-mint',
    iconColor: 'text-green-600'
  }
]

export function NodeSidebar() {
  const [draggedNodeType, setDraggedNodeType] = useState<NodeType['type'] | null>(null)

  const onDragStart = (event: React.DragEvent, nodeType: NodeType['type']) => {
    setDraggedNodeType(nodeType)
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  const onDragEnd = () => {
    setDraggedNodeType(null)
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-6">Node Types</h2>
      
      <div className="space-y-3">
        {nodeTypes.map((nodeType, index) => (
          <div
            key={`node-${index}`}
            draggable
            onDragStart={(e) => onDragStart(e, nodeType.type)}
            onDragEnd={onDragEnd}
            className={`
              p-4 rounded-2xl cursor-move transition-all shadow-sm hover:shadow-md
              ${draggedNodeType === nodeType.type 
                ? 'opacity-50 scale-95 shadow-lg border-2 border-gray-300' 
                : 'hover:scale-[1.02] border-2 border-gray-200 hover:border-gray-300'
              }
              bg-white
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-12 h-12 rounded-xl ${nodeType.bgColor}
                flex items-center justify-center border border-gray-200
              `}>
                <span className={`text-sm font-bold ${nodeType.iconColor}`}>{nodeType.icon}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-sm">
                  {nodeType.label}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {nodeType.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Instructions</h3>
        <ul className="text-xs text-gray-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>Drag nodes to canvas to add them</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>Click nodes to configure properties</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>Connect nodes with edges</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>Double-click to delete nodes</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
