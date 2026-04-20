import { useState } from 'react'
import { 
  Play, 
  CheckSquare, 
  ShieldCheck, 
  Zap, 
  Flag, 
  MousePointer2, 
  Settings, 
  GitBranch, 
  Trash2,
  Layers
} from 'lucide-react'

interface NodeType {
  type: 'start' | 'task' | 'approval' | 'automated' | 'end'
  label: string
  description: string
  Icon: any
  bgColor: string
  iconColor: string
}

const nodeTypes: NodeType[] = [
  {
    type: 'start',
    label: 'Start Node',
    description: 'Entry point of the workflow',
    Icon: Play,
    bgColor: 'bg-blue-50',
    iconColor: 'bg-blue-500'
  },
  {
    type: 'task',
    label: 'Manual Task',
    description: 'Human-centric operations',
    Icon: CheckSquare,
    bgColor: 'bg-pink-50',
    iconColor: 'bg-pink-500'
  },
  {
    type: 'approval',
    label: 'Review Gate',
    description: 'Multi-stage approval process',
    Icon: ShieldCheck,
    bgColor: 'bg-orange-50',
    iconColor: 'bg-orange-500'
  },
  {
    type: 'automated',
    label: 'Integrator',
    description: 'External service automation',
    Icon: Zap,
    bgColor: 'bg-purple-50',
    iconColor: 'bg-purple-500'
  },
  {
    type: 'end',
    label: 'Terminal',
    description: 'Process finalization state',
    Icon: Flag,
    bgColor: 'bg-green-50',
    iconColor: 'bg-green-500'
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
    <div className="h-full flex flex-col bg-white border-r border-gray-100">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-50 bg-[#fafcff]/50">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-4 h-4 text-blue-500" />
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-tighter">Components</h2>
        </div>
        <p className="text-[11px] text-gray-400 font-medium">Drag nodes to build workflow</p>
      </div>

      {/* Node Catalog */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 scrollbar-hide">
        {nodeTypes.map((node, index) => {
          const { Icon } = node
          return (
            <div
              key={`node-${index}`}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
              onDragEnd={onDragEnd}
              className={`
                group flex items-center gap-4 p-4 rounded-2xl border cursor-grab active:cursor-grabbing
                transition-all duration-300
                ${draggedNodeType === node.type
                  ? 'opacity-40 scale-95 border-blue-200 bg-blue-50 shadow-inner'
                  : 'bg-white border-gray-100 shadow-sm hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5'
                }
              `}
            >
              <div className={`w-10 h-10 rounded-xl ${node.iconColor} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="min-w-0">
                <p className="text-[13px] font-bold text-gray-800 leading-tight mb-0.5">{node.label}</p>
                <p className="text-[10px] text-gray-400 font-medium truncate">{node.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Operator Guidelines */}
      <div className="p-6 border-t border-gray-50 bg-gray-50/30">
        <div className="flex items-center gap-2 mb-4">
           <MousePointer2 className="w-3.5 h-3.5 text-gray-400" />
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Operator Guide</p>
        </div>
        <ul className="space-y-4">
          {[
            { Icon: MousePointer2, text: 'Click & drag nodes to build logic' },
            { Icon: Settings, text: 'Select components to configure logic' },
            { Icon: GitBranch, text: 'Connect nodes to define data flow' },
            { Icon: Trash2, text: 'Double-click elements to remove' },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 group">
              <div className="w-6 h-6 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:bg-blue-50 transition-colors">
                <item.Icon className="w-3 h-3 text-gray-400 group-hover:text-blue-500" />
              </div>
              <span className="text-[10px] text-gray-500 font-medium leading-normal">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}