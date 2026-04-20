import { useState, useEffect } from 'react'
import { useWorkflowStore } from '../../store/workflowStore'
import { mockApi } from '../../services/api'
import { validateWorkflow } from '../../utils/validation'
import { 
  Play, 
  Terminal, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  BarChart3, 
  Clock, 
  Layers,
  ChevronRight,
  Loader2
} from 'lucide-react'

interface WorkflowStats {
  totalNodes: number
  totalEdges: number
  nodeTypes: Record<string, number>
  estimatedDuration: string
  complexity: 'Simple' | 'Moderate' | 'Complex'
}

const complexityStyle = {
  Simple: 'text-green-500 bg-green-50 border-green-100',
  Moderate: 'text-amber-500 bg-amber-50 border-amber-100',
  Complex: 'text-rose-500 bg-rose-50 border-rose-100',
}

const nodeTypeColor: Record<string, string> = {
  start: 'bg-blue-400',
  task: 'bg-pink-400',
  approval: 'bg-orange-400',
  automated: 'bg-purple-400',
  end: 'bg-green-400',
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

  useEffect(() => {
    setWorkflowStats(calculateWorkflowStats(nodes, edges))
  }, [nodes, edges])

  const calculateWorkflowStats = (nodes: any[], edges: any[]): WorkflowStats => {
    const nodeTypes = nodes.reduce((acc, node) => {
      acc[node.type] = (acc[node.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    let complexity: 'Simple' | 'Moderate' | 'Complex' = 'Simple'
    if (nodes.length > 10 || edges.length > 15) complexity = 'Complex'
    else if (nodes.length > 5 || edges.length > 7) complexity = 'Moderate'

    const totalMinutes =
      nodes.length * 2 +
      (nodeTypes.approval || 0) * 30 +
      (nodeTypes.automated || 0) * 1

    const estimatedDuration = totalMinutes < 60
      ? `${totalMinutes} min`
      : `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`

    return { totalNodes: nodes.length, totalEdges: edges.length, nodeTypes, estimatedDuration, complexity }
  }

  const runSimulation = async () => {
    setError(null)
    setIsSimulating(true)
    setSimulationSteps([])
    setExecutionTime(null)
    const startTime = Date.now()

    try {
      const errors = validateWorkflow(nodes, edges)
      if (errors.length > 0) throw new Error(`Workflow validation failed: ${errors[0].message}`)

      const workflowData = {
        nodes: nodes.map(n => ({ id: n.id, type: n.type, data: n.data })),
        edges: edges.map(e => ({ id: e.id, source: e.source, target: e.target }))
      }

      const steps = await mockApi.simulateWorkflow(workflowData)
      setSimulationSteps(steps.map(s => s.step))
      setExecutionTime(Date.now() - startTime)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed')
    } finally {
      setIsSimulating(false)
    }
  }

  const exportWorkflow = () => {
    const data = {
      name: 'HR Workflow',
      version: '1.0',
      createdAt: new Date().toISOString(),
      nodes: nodes.map(n => ({ id: n.id, type: n.type, position: n.position, data: n.data })),
      edges: edges.map(e => ({ id: e.id, source: e.source, target: e.target, type: e.type }))
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'workflow.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const canRun = nodes.length > 0 && edges.length > 0 && validationErrors.length === 0

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-100">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-50 bg-[#fafcff]/50">
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="w-4 h-4 text-blue-500" />
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-tighter">
            Execution Hub
          </h2>
        </div>
        <p className="text-[11px] text-gray-400 font-medium">Validation and environment simulation</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide">
        {/* Validation Status */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className={`relative flex items-center justify-center w-6 h-6 rounded-full ${validationErrors.length === 0 ? 'bg-green-50' : 'bg-rose-50'}`}>
                {validationErrors.length === 0 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                )}
                <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-white ${validationErrors.length === 0 ? 'bg-green-500' : 'bg-rose-500'} animate-pulse`} />
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${validationErrors.length === 0 ? 'text-green-600' : 'text-rose-500'}`}>
                {validationErrors.length === 0 ? 'System Operational' : 'Critical Faults Found'}
              </span>
            </div>
            {validationErrors.length > 0 && (
              <button
                onClick={() => setIsValidationExpanded(!isValidationExpanded)}
                className="text-xs font-bold text-blue-500 px-3 py-1 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {isValidationExpanded ? 'Hide' : 'Review'}
              </button>
            )}
          </div>

          {isValidationExpanded && validationErrors.length > 0 && (
            <div className="px-5 pb-5 space-y-2 border-t border-gray-50 pt-4 animate-in slide-in-from-top-2 duration-300">
              {validationErrors.map((e, i) => (
                <div key={i} className="flex gap-2 text-[10px] text-rose-500 bg-rose-50/50 px-3 py-2 rounded-xl border border-rose-100 font-medium leading-relaxed">
                   <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                   {e.message}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={runSimulation}
            disabled={!canRun || isSimulating}
            className={`w-full py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-3 shadow-xl transform active:scale-[0.98]
              ${canRun && !isSimulating
                ? 'bg-blue-500 text-white shadow-blue-100 hover:bg-blue-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-100'
              }`}
          >
            {isSimulating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Simulating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Initialize Environment
              </>
            )}
          </button>

          <button
            onClick={exportWorkflow}
            disabled={nodes.length === 0}
            className={`w-full py-4 rounded-full text-xs font-bold transition-all border flex items-center justify-center gap-2
              ${nodes.length > 0
                ? 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                : 'bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100'
              }`}
          >
            <Download className="w-3.5 h-3.5" />
            Export Blueprint (JSON)
          </button>

          {!canRun && !isSimulating && nodes.length > 0 && (
            <div className="flex gap-2 items-center p-4 bg-amber-50 rounded-2xl border border-amber-100">
               <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
               <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
                 {validationErrors.length > 0
                   ? 'The workflow requires fault correction before initialization.'
                   : 'Establishing logic connections is required for execution.'}
               </p>
            </div>
          )}
        </div>

        {/* Simulation Steps */}
        {simulationSteps.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-gray-400" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Console Output</p>
              </div>
              {executionTime && (
                <div className="flex items-center gap-1">
                   <Clock className="w-3 h-3 text-gray-300" />
                   <span className="text-[9px] font-bold text-gray-300 uppercase">{executionTime}ms</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {simulationSteps.map((step, i) => (
                <div key={i} className="group flex items-start gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                  <div className="w-6 h-6 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-blue-100">
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500">{i + 1}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 font-medium leading-relaxed pt-1 flex-1">{step}</p>
                  <ChevronRight className="w-3 h-3 text-gray-200 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workflow Stats */}
        {workflowStats && workflowStats.totalNodes > 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logic Analysis</p>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-3 bg-gray-50/50 rounded-2xl border border-gray-50">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mb-1">Complexity</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${complexityStyle[workflowStats.complexity]}`}>
                      {workflowStats.complexity}
                    </span>
                 </div>
                 <div className="p-3 bg-gray-50/50 rounded-2xl border border-gray-50">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mb-1">Est. Runtime</p>
                    <div className="flex items-center gap-1 text-gray-700 font-bold text-[11px]">
                       <Clock className="w-3 h-3 opacity-30" />
                       {workflowStats.estimatedDuration}
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1 px-1">
                   <Layers className="w-3 h-3 text-gray-300" />
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Operational Breakdown</p>
                </div>
                <div className="space-y-2.5">
                  {Object.entries(workflowStats.nodeTypes).map(([type, count]) => (
                    <div key={type} className="space-y-1.5">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] text-gray-500 font-bold capitalize">{type} Modules</span>
                        <span className="text-[10px] font-bold text-gray-800">{count}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                         <div 
                           className={`h-full rounded-full ${nodeTypeColor[type] ?? 'bg-gray-300'} transition-all duration-1000`} 
                           style={{ width: `${(count / workflowStats.totalNodes) * 100}%` }}
                         />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}