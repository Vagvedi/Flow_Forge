import { useState, useEffect } from 'react'
import type { WorkflowNode, Automation } from '../../types'
import { mockApi } from '../../services/api'
import { Zap, Cpu, Settings, ListFilter, Activity } from 'lucide-react'

interface AutomatedNodeFormProps {
  node: WorkflowNode
  onUpdate: (updates: Partial<WorkflowNode>) => void
}

export function AutomatedNodeForm({ node, onUpdate }: AutomatedNodeFormProps) {
  const [automations, setAutomations] = useState<Automation[]>([])
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAutomations()
  }, [])

  useEffect(() => {
    if (node.data.automationId && automations.length > 0) {
      const automation = automations.find(a => a.id === node.data.automationId)
      setSelectedAutomation(automation || null)
    }
  }, [node.data.automationId, automations])

  const loadAutomations = async () => {
    try {
      const data = await mockApi.getAutomations()
      setAutomations(data)
    } catch (error) {
      console.error('Failed to load automations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAutomationChange = (automationId: string) => {
    const automation = automations.find(a => a.id === automationId)
    setSelectedAutomation(automation || null)
    
    // Reset parameters when automation changes
    const newParams: Record<string, any> = {}
    if (automation) {
      automation.params.forEach(param => {
        newParams[param] = ''
      })
    }
    
    onUpdate({
      data: { 
        ...node.data, 
        automationId: automationId || undefined,
        automationParams: newParams
      }
    })
  }

  const handleParamChange = (param: string, value: string) => {
    const newParams = { 
      ...node.data.automationParams, 
      [param]: value 
    }
    onUpdate({
      data: { ...node.data, automationParams: newParams }
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Title Section */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Activity className="w-3 h-3" />
          Sequence Title
        </label>
        <input
          type="text"
          value={node.data.title || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, title: e.target.value }
          })}
          className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl
                   text-gray-800 text-sm placeholder:text-gray-300
                   hover:border-gray-200 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 focus:outline-none transition-all shadow-sm"
          placeholder="Operational Sequence Trigger"
        />
      </div>

      {/* Action Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Zap className="w-3 h-3" />
          Automation Module
        </label>
        {loading ? (
          <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100 animate-pulse">
            <div className="w-4 h-4 bg-gray-200 rounded-full" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
          </div>
        ) : (
          <div className="relative group">
            <select
              value={node.data.automationId || ''}
              onChange={(e) => handleAutomationChange(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl
                       text-gray-800 text-sm appearance-none
                       hover:border-gray-200 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 focus:outline-none transition-all cursor-pointer shadow-sm"
            >
              <option value="" disabled>Select workforce module...</option>
              {automations.map(automation => (
                <option key={automation.id} value={automation.id}>
                  {automation.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-focus-within:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Parameters */}
      {selectedAutomation && (
        <div className="pt-4 space-y-4 border-t border-gray-50 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <Settings className="w-3 h-3" />
              Module Parameters
            </label>
            <span className="text-[10px] font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">Dynamic</span>
          </div>
          
          <div className="space-y-4">
            {selectedAutomation.params.map(param => (
              <div key={param} className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500 capitalize px-1">
                  {param.replace('_', ' ')}
                </label>
                <input
                  type="text"
                  value={node.data.automationParams?.[param] || ''}
                  onChange={(e) => handleParamChange(param, e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl
                           text-sm text-gray-700 placeholder:text-gray-300
                           focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 focus:outline-none transition-all shadow-sm"
                  placeholder={`Set ${param} value...`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {!selectedAutomation && !loading && (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-100 rounded-3xl bg-gray-50/30">
           <Cpu className="w-8 h-8 text-gray-200 mb-3" />
           <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight text-center">
             Module configuration offline
           </p>
           <p className="text-[10px] text-gray-400 mt-1 text-center max-w-[150px]">
             Select an integration to view dynamic operational properties.
           </p>
        </div>
      )}
    </div>
  )
}

