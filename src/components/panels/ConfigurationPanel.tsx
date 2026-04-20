import { useWorkflowStore } from '../../store/workflowStore'
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
        return <div className="text-gray-500">Unknown node type</div>
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          {selectedNode ? 'Node Configuration' : 'Workflow Settings'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {selectedNode ? (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Node Type</h3>
                  <p className="text-gray-800 capitalize font-medium">{selectedNode.type}</p>
                </div>
                <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-lg border border-gray-200">
                  ID: {selectedNode.id.slice(-8)}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {renderForm()}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="text-gray-400 text-sm font-medium">
                No Selection
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              Select a node to configure its properties
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-200 bg-white">
        <button
          onClick={clearWorkflow}
          className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium border border-red-500 shadow-sm flex items-center justify-center gap-2"
        >
          Clear Workflow
        </button>
      </div>
    </div>
  )
}
