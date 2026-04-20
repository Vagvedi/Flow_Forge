import { useState, useEffect } from 'react'
import { useWorkflowStore } from '../../store/workflowStore'
import { mockApi } from '../../services/api'
import { validateWorkflow } from '../../utils/validation'

interface WorkflowStats {
  totalNodes: number
  totalEdges: number
  nodeTypes: Record<string, number>
  estimatedDuration: string
  complexity: 'Simple' | 'Moderate' | 'Complex'
}

export function SimulationPanel() {
  const { 
    nodes, 
    edges, 
    isSimulating, 
    simulationSteps, 
    validationErrors,
    setIsSimulating, 
    setSimulationSteps 
  } = useWorkflowStore()
  
  const [error, setError] = useState<string | null>(null)
  const [isValidationExpanded, setIsValidationExpanded] = useState(false)
  const [workflowStats, setWorkflowStats] = useState<WorkflowStats | null>(null)
  const [executionTime, setExecutionTime] = useState<number | null>(null)

  // Calculate workflow stats whenever nodes/edges change
  useEffect(() => {
    const stats = calculateWorkflowStats(nodes, edges)
    setWorkflowStats(stats)
  }, [nodes, edges])

  // Validate workflow whenever nodes/edges change
  useEffect(() => {
    validateWorkflow(nodes, edges)
    // Validation errors are handled by the store
  }, [nodes, edges])

  const calculateWorkflowStats = (nodes: any[], edges: any[]): WorkflowStats => {
    const nodeTypes = nodes.reduce((acc, node) => {
      acc[node.type] = (acc[node.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Estimate complexity based on nodes and connections
    let complexity: 'Simple' | 'Moderate' | 'Complex' = 'Simple'
    if (nodes.length > 10 || edges.length > 15) {
      complexity = 'Complex'
    } else if (nodes.length > 5 || edges.length > 7) {
      complexity = 'Moderate'
    }

    // Estimate duration (mock calculation)
    const baseMinutes = nodes.length * 2
    const approvalMinutes = (nodeTypes.approval || 0) * 30
    const automationMinutes = (nodeTypes.automated || 0) * 1
    const totalMinutes = baseMinutes + approvalMinutes + automationMinutes
    
    let estimatedDuration = ''
    if (totalMinutes < 60) {
      estimatedDuration = `${totalMinutes} min`
    } else {
      const hours = Math.floor(totalMinutes / 60)
      const mins = totalMinutes % 60
      estimatedDuration = `${hours}h ${mins}m`
    }

    return {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      nodeTypes,
      estimatedDuration,
      complexity
    }
  }

  const runSimulation = async () => {
    setError(null)
    setIsSimulating(true)
    setSimulationSteps([])
    setExecutionTime(null)

    const startTime = Date.now()

    try {
      // First validate the workflow
      const errors = validateWorkflow(nodes, edges)
      if (errors.length > 0) {
        throw new Error(`Workflow validation failed: ${errors[0].message}`)
      }

      const workflowData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target
        }))
      }

      const steps = await mockApi.simulateWorkflow(workflowData)
      setSimulationSteps(steps.map(step => step.step))
      
      const endTime = Date.now()
      setExecutionTime(endTime - startTime)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed')
    } finally {
      setIsSimulating(false)
    }
  }

  const exportWorkflow = () => {
    const workflowData = {
      name: 'HR Workflow',
      version: '1.0',
      createdAt: new Date().toISOString(),
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type
      }))
    }

    const blob = new Blob([JSON.stringify(workflowData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'workflow.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const canRunSimulation = nodes.length > 0 && edges.length > 0 && validationErrors.length === 0

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Workflow Testing</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Validation Status */}
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Validation Status</h3>
              <button
                onClick={() => setIsValidationExpanded(!isValidationExpanded)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {isValidationExpanded ? 'Hide' : 'Show'}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                validationErrors.length === 0 ? 'bg-green-400' : 'bg-red-400'
              }`} />
              <span className={`text-sm font-medium ${
                validationErrors.length === 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                {validationErrors.length === 0 ? 'Valid' : `${validationErrors.length} errors`}
              </span>
            </div>

            {isValidationExpanded && validationErrors.length > 0 && (
              <div className="mt-3 space-y-2">
                {validationErrors.map((error, index) => (
                  <div key={index} className="text-xs text-red-600 p-3 bg-red-50 rounded-lg border border-red-200">
                    {error.message}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={runSimulation}
              disabled={!canRunSimulation || isSimulating}
              className={`
                w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                ${canRunSimulation && !isSimulating
                  ? 'bg-blue-500 text-white hover:bg-blue-600 border border-blue-500 shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-300'
                }
              `}
            >
              {isSimulating ? 'Running Simulation...' : 'Run Workflow Test'}
            </button>

            <button
              onClick={exportWorkflow}
              disabled={nodes.length === 0}
              className={`
                w-full px-4 py-3 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2
                ${nodes.length > 0
                  ? 'bg-blue-500 text-white hover:bg-blue-600 border border-blue-500 shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-300'
                }
              `}
            >
              Export Workflow
            </button>
            
            {!canRunSimulation && !isSimulating && (
              <p className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                {validationErrors.length > 0 
                  ? 'Fix validation errors to enable simulation'
                  : 'Add nodes and connections to enable simulation'
                }
              </p>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Execution Results */}
          {simulationSteps.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Execution Steps</h3>
                {executionTime && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                    {executionTime}ms
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {simulationSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-green-700">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workflow Statistics */}
          {workflowStats && (
            <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Workflow Analysis</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Complexity:</span>
                  <span className={`
                    text-xs font-medium px-3 py-1 rounded-lg
                    ${workflowStats.complexity === 'Simple' ? 'bg-green-50 text-green-700' : ''}
                    ${workflowStats.complexity === 'Moderate' ? 'bg-yellow-50 text-yellow-700' : ''}
                    ${workflowStats.complexity === 'Complex' ? 'bg-red-50 text-red-700' : ''}
                  `}>
                    {workflowStats.complexity}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Est. Duration:</span>
                  <span className="text-xs font-medium text-gray-700">{workflowStats.estimatedDuration}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="text-xs text-gray-500 mb-3">Node Breakdown:</div>
                  <div className="space-y-2">
                    {Object.entries(workflowStats.nodeTypes).map(([type, count]) => (
                      <div key={type} className="flex justify-between text-xs">
                        <span className="text-gray-500 capitalize">{type}:</span>
                        <span className="font-medium text-gray-700">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Nodes:</span>
                    <span className="font-medium text-gray-700">{workflowStats.totalNodes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Edges:</span>
                    <span className="font-medium text-gray-700">{workflowStats.totalEdges}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
