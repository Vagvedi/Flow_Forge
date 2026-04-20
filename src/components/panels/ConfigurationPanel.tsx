import { useWorkflowStore } from '../../store/workflowStore'
import { Settings2, Trash2, Info, Layout } from 'lucide-react'
import { 
  StartNodeForm, 
  TaskNodeForm, 
  ApprovalNodeForm, 
  AutomatedNodeForm, 
  EndNodeForm 
} from '../forms'

export function ConfigurationPanel() {
  const { selectedNode, updateNode, clearWorkflow } = useWorkflowStore()

  const handleUpdate = (updates: any) => {
    if (selectedNode) {
      updateNode(selectedNode.id, updates)
    }
  }

  const renderForm = () => {
    if (!selectedNode) return null

    switch (selectedNode.type) {
      case 'start':
        return <StartNodeForm node={selectedNode} onUpdate={handleUpdate} />
      case 'task':
        return <TaskNodeForm node={selectedNode} onUpdate={handleUpdate} />
      case 'approval':
        return <ApprovalNodeForm node={selectedNode} onUpdate={handleUpdate} />
      case 'automated':
        return <AutomatedNodeForm node={selectedNode} onUpdate={handleUpdate} />
      case 'end':
        return <EndNodeForm node={selectedNode} onUpdate={handleUpdate} />
      default:
        return (
          <div className="flex items-center gap-2 p-4 bg-amber-50 text-amber-700 rounded-xl border border-amber-100 text-sm">
            <Info className="w-4 h-4" />
            Unknown node type configuration
          </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 bg-[#fafcff]/50">
        <div className="flex items-center gap-2 mb-1">
          <Settings2 className="w-4 h-4 text-blue-500" />
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-tighter">
            Properties
          </h2>
        </div>
        <p className="text-[11px] text-gray-400 font-medium">
          {selectedNode ? `Configuring ${selectedNode.type} #${selectedNode.id.slice(-4)}` : 'Select a node on the canvas'}
        </p>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
        {selectedNode ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
               {renderForm()}
            </div>

            <div className="pt-4">
               <button
                className="w-full px-4 py-3.5 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-gray-200 hover:bg-black transition-all transform active:scale-[0.98]"
              >
                Sync Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 pointer-events-none">
             <div className="w-20 h-20 bg-gray-50 rounded-[40px] flex items-center justify-center mb-6">
                <Layout className="w-8 h-8 text-gray-300" />
             </div>
             <p className="text-sm font-bold text-gray-400">Environment Idle</p>
             <p className="text-[11px] text-gray-400 mt-1 max-w-[150px]">
                Click any workflow node to adjust its operational parameters.
             </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-50 bg-gray-50/30">
        <button
          onClick={clearWorkflow}
          className="w-full py-3 flex items-center justify-center gap-2 text-red-500 text-xs font-bold border border-red-50 rounded-2xl hover:bg-red-50 transition-all active:scale-[0.98]"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Canvas
        </button>
      </div>
    </div>
  )
}

