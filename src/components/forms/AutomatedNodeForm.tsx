import { useState, useEffect } from 'react'
import type { WorkflowNode, Automation } from '../../types'
import { mockApi } from '../../services/api'

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
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={node.data.title || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, title: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter automation title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Select Action
        </label>
        {loading ? (
          <div className="text-sm text-gray-500 dark:text-gray-400">Loading automations...</div>
        ) : (
          <select
            value={node.data.automationId || ''}
            onChange={(e) => handleAutomationChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an automation</option>
            {automations.map(automation => (
              <option key={automation.id} value={automation.id}>
                {automation.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedAutomation && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Parameters
          </label>
          <div className="space-y-2">
            {selectedAutomation.params.map(param => (
              <div key={param}>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {param.charAt(0).toUpperCase() + param.slice(1)}
                </label>
                <input
                  type="text"
                  value={node.data.automationParams?.[param] || ''}
                  onChange={(e) => handleParamChange(param, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Enter ${param}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
