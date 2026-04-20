import type { Node } from 'reactflow'

export interface WorkflowNode extends Omit<Node, 'data'> {
  type: 'start' | 'task' | 'approval' | 'automated' | 'end'
  data: {
    title: string
    description?: string
    assignee?: string
    dueDate?: string
    approverRole?: string
    threshold?: number
    automationId?: string
    automationParams?: Record<string, any>
    metadata?: Record<string, any>
    message?: string
    showSummary?: boolean
  }
}

export interface WorkflowEdge {}

export interface Automation {
  id: string
  label: string
  params: string[]
}

export interface SimulationStep {
  step: string
  nodeType: string
  nodeTitle: string
}

export interface ValidationError {
  type: 'start_node' | 'connectivity' | 'duplicate_start'
  message: string
  nodeId?: string
}
