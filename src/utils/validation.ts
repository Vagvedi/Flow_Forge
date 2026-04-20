import type { WorkflowNode, ValidationError } from '../types'
import type { Edge } from 'reactflow'

export function validateWorkflow(
  nodes: WorkflowNode[], 
  edges: Edge[]
): ValidationError[] {
  const errors: ValidationError[] = []

  // Check for exactly one start node
  const startNodes = nodes.filter(node => node.type === 'start')
  if (startNodes.length === 0) {
    errors.push({
      type: 'start_node',
      message: 'Workflow must have exactly one Start node'
    })
  } else if (startNodes.length > 1) {
    errors.push({
      type: 'duplicate_start',
      message: 'Workflow can only have one Start node'
    })
  }

  // Check for at least one end node
  const endNodes = nodes.filter(node => node.type === 'end')
  if (endNodes.length === 0) {
    errors.push({
      type: 'connectivity',
      message: 'Workflow should have at least one End node'
    })
  }

  // Check for cycles in the workflow
  const cycleCheck = detectCycles(nodes, edges)
  if (cycleCheck.hasCycle) {
    errors.push({
      type: 'connectivity',
      message: `Cycle detected in workflow: ${cycleCheck.cyclePath?.join(' → ')}`
    })
  }

  // Check for connectivity (all nodes should be reachable from start)
  if (startNodes.length === 1) {
    const reachableNodes = new Set<string>()
    const queue = [startNodes[0].id]
    
    while (queue.length > 0) {
      const currentId = queue.shift()!
      if (reachableNodes.has(currentId)) continue
      
      reachableNodes.add(currentId)
      
      // Find all nodes connected from current node
      const connectedEdges = edges.filter(edge => edge.source === currentId)
      connectedEdges.forEach(edge => {
        if (!reachableNodes.has(edge.target)) {
          queue.push(edge.target)
        }
      })
    }

    // Check if all nodes (except start) are reachable
    nodes.forEach(node => {
      if (node.type !== 'start' && !reachableNodes.has(node.id)) {
        errors.push({
          type: 'connectivity',
          message: `Node "${node.data.title || node.id}" is not connected to the workflow`,
          nodeId: node.id
        })
      }
    })
  }

  // Validate individual node data
  nodes.forEach(node => {
    const nodeErrors = validateNodeData(node)
    errors.push(...nodeErrors)
  })

  // Check for disconnected edges
  edges.forEach(edge => {
    const sourceExists = nodes.some(node => node.id === edge.source)
    const targetExists = nodes.some(node => node.id === edge.target)
    
    if (!sourceExists) {
      errors.push({
        type: 'connectivity',
        message: `Edge connects to non-existent source node: ${edge.source}`
      })
    }
    
    if (!targetExists) {
      errors.push({
        type: 'connectivity',
        message: `Edge connects to non-existent target node: ${edge.target}`
      })
    }
  })

  return errors
}

function detectCycles(nodes: WorkflowNode[], edges: Edge[]): { hasCycle: boolean; cyclePath?: string[] } {
  const visited = new Set<string>()
  const recursionStack = new Set<string>()
  const parent = new Map<string, string>()
  
  const nodeMap = new Map(nodes.map(node => [node.id, node]))

  function dfs(nodeId: string, path: string[]): { hasCycle: boolean; cyclePath?: string[] } {
    visited.add(nodeId)
    recursionStack.add(nodeId)
    path.push(nodeId)

    const outgoingEdges = edges.filter(edge => edge.source === nodeId)
    
    for (const edge of outgoingEdges) {
      const neighborId = edge.target
      
      if (!visited.has(neighborId)) {
        parent.set(neighborId, nodeId)
        const result = dfs(neighborId, path)
        if (result.hasCycle) {
          return result
        }
      } else if (recursionStack.has(neighborId)) {
        // Cycle detected
        const cycleStart = path.indexOf(neighborId)
        const cyclePath = path.slice(cycleStart).map(id => 
          nodeMap.get(id)?.data.title || id
        )
        return { hasCycle: true, cyclePath }
      }
    }

    recursionStack.delete(nodeId)
    path.pop()
    return { hasCycle: false }
  }

  // Check each component
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      const result = dfs(node.id, [])
      if (result.hasCycle) {
        return result
      }
    }
  }

  return { hasCycle: false }
}

function validateNodeData(node: WorkflowNode): ValidationError[] {
  const errors: ValidationError[] = []

  // Common validation for all nodes
  if (!node.data.title || node.data.title.trim() === '') {
    errors.push({
      type: 'connectivity',
      message: `Node "${node.id}" must have a title`,
      nodeId: node.id
    })
  }

  // Type-specific validation
  switch (node.type) {
    case 'task':
      if (!node.data.assignee || node.data.assignee.trim() === '') {
        errors.push({
          type: 'connectivity',
          message: `Task node "${node.data.title || node.id}" must have an assignee`,
          nodeId: node.id
        })
      }
      break
      
    case 'approval':
      if (!node.data.approverRole || node.data.approverRole.trim() === '') {
        errors.push({
          type: 'connectivity',
          message: `Approval node "${node.data.title || node.id}" must specify an approver role`,
          nodeId: node.id
        })
      }
      if (node.data.threshold && (typeof node.data.threshold !== 'number' || node.data.threshold < 1)) {
        errors.push({
          type: 'connectivity',
          message: `Approval node "${node.data.title || node.id}" threshold must be a positive number`,
          nodeId: node.id
        })
      }
      break
      
    case 'automated':
      if (!node.data.automationId || node.data.automationId.trim() === '') {
        errors.push({
          type: 'connectivity',
          message: `Automated node "${node.data.title || node.id}" must select an automation`,
          nodeId: node.id
        })
      }
      break
  }

  return errors
}
