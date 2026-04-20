import { create } from 'zustand'
import type { WorkflowNode, ValidationError } from '../types'
import type { Edge } from 'reactflow'

interface WorkflowStore {
  nodes: WorkflowNode[]
  edges: Edge[]
  selectedNode: WorkflowNode | null
  validationErrors: ValidationError[]
  isSimulating: boolean
  simulationSteps: string[]

  // Actions
  setNodes: (nodes: WorkflowNode[]) => void
  setEdges: (edges: Edge[]) => void
  addNode: (node: WorkflowNode) => void
  updateNode: (nodeId: string, updates: Partial<WorkflowNode>) => void
  deleteNode: (nodeId: string) => void
  addEdge: (edge: Edge) => void
  deleteEdge: (edgeId: string) => void
  setSelectedNode: (node: WorkflowNode | null) => void
  setValidationErrors: (errors: ValidationError[]) => void
  setIsSimulating: (isSimulating: boolean) => void
  setSimulationSteps: (steps: string[]) => void
  clearWorkflow: () => void
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  validationErrors: [],
  isSimulating: false,
  simulationSteps: [],

  setNodes: (nodes) => set(() => {
    // Validate all nodes before setting
    const validNodes = nodes.filter(node => 
      node && 
      node.id && 
      node.position && 
      typeof node.position.x === 'number' && 
      typeof node.position.y === 'number' && 
      !isNaN(node.position.x) && 
      !isNaN(node.position.y)
    )
    
    if (validNodes.length !== nodes.length) {
      console.warn('Filtered out invalid nodes:', nodes.length - validNodes.length)
    }
    
    return { nodes: validNodes }
  }),
  
  setEdges: (edges) => set({ edges }),
  
  addNode: (node) => set((state) => {
    // Validate node before adding
    if (!node || !node.id || !node.position || 
        typeof node.position.x !== 'number' || 
        typeof node.position.y !== 'number' || 
        isNaN(node.position.x) || 
        isNaN(node.position.y)) {
      console.warn('Invalid node structure:', node)
      return state
    }
    
    return { 
      nodes: [...state.nodes, node] 
    }
  }),
  
  updateNode: (nodeId, updates) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ),
    selectedNode: state.selectedNode?.id === nodeId 
      ? { ...state.selectedNode, ...updates }
      : state.selectedNode
  })),
  
  deleteNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== nodeId),
    edges: state.edges.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    ),
    selectedNode: state.selectedNode?.id === nodeId ? null : state.selectedNode
  })),
  
  addEdge: (edge) => set((state) => ({ 
    edges: [...state.edges, edge] 
  })),
  
  deleteEdge: (edgeId) => set((state) => ({
    edges: state.edges.filter(edge => edge.id !== edgeId)
  })),
  
  setSelectedNode: (node) => set({ selectedNode: node }),
  
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  
  setIsSimulating: (isSimulating) => set({ isSimulating }),
  
  setSimulationSteps: (steps) => set({ simulationSteps: steps }),
  
  clearWorkflow: () => set({
    nodes: [],
    edges: [],
    selectedNode: null,
    validationErrors: [],
    isSimulating: false,
    simulationSteps: []
  })
}))
