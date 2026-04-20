import type { Automation, SimulationStep } from '../types'

export const mockApi = {
  // Get available automations
  async getAutomations(): Promise<Automation[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return [
      { 
        id: "send_email", 
        label: "Send Email", 
        params: ["to", "subject", "body"] 
      },
      { 
        id: "generate_doc", 
        label: "Generate Document", 
        params: ["template", "recipient", "type"] 
      },
      { 
        id: "notify_slack", 
        label: "Notify Slack", 
        params: ["channel", "message"] 
      },
      { 
        id: "update_database", 
        label: "Update Database", 
        params: ["table", "record_id", "data"] 
      },
      { 
        id: "schedule_meeting", 
        label: "Schedule Meeting", 
        params: ["attendees", "duration", "topic"] 
      },
      { 
        id: "create_ticket", 
        label: "Create Support Ticket", 
        params: ["title", "description", "priority"] 
      },
      { 
        id: "send_notification", 
        label: "Send Push Notification", 
        params: ["user_id", "message", "type"] 
      },
      { 
        id: "archive_records", 
        label: "Archive Records", 
        params: ["record_type", "retention_days"] 
      }
    ]
  },

  // Simulate workflow execution with detailed steps
  async simulateWorkflow(workflowData: {
    nodes: any[]
    edges: any[]
  }): Promise<SimulationStep[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const { nodes, edges } = workflowData
    const steps: SimulationStep[] = []
    
    // Find start node
    const startNode = nodes.find(node => node.type === 'start')
    if (!startNode) {
      throw new Error('No start node found')
    }
    
    // Build execution path
    const executionPath = this.buildExecutionPath(nodes, edges, startNode.id)
    
    // Simulate execution for each node in the path
    for (const node of executionPath) {
      const nodeSteps = await this.simulateNodeExecution(node, nodes)
      steps.push(...nodeSteps)
    }
    
    return steps
  },

  // Build the execution path based on node connections
  buildExecutionPath(nodes: any[], edges: any[], startNodeId: string): any[] {
    const path: any[] = []
    const visited = new Set<string>()
    const nodeMap = new Map(nodes.map(n => [n.id, n]))
    
    let currentNode = nodeMap.get(startNodeId)
    
    while (currentNode && !visited.has(currentNode.id)) {
      visited.add(currentNode.id)
      path.push(currentNode)
      
      // Find next node (handle multiple outgoing edges)
      const outgoingEdges = edges.filter(edge => edge.source === currentNode.id)
      if (outgoingEdges.length > 0) {
        // For simplicity, take the first outgoing edge
        // In a real system, this might involve conditional logic
        const nextEdge = outgoingEdges[0]
        currentNode = nodeMap.get(nextEdge.target)
      } else {
        break
      }
    }
    
    return path
  },

  // Simulate execution of a single node
  async simulateNodeExecution(node: any, allNodes: any[]): Promise<SimulationStep[]> {
    const steps: SimulationStep[] = []
    
    switch (node.type) {
      case 'start':
        steps.push({
          step: `🚀 Starting workflow: ${node.data.title || 'Workflow'}`,
          nodeType: 'start',
          nodeTitle: node.data.title
        })
        
        if (node.data.metadata && Object.keys(node.data.metadata).length > 0) {
          steps.push({
            step: `📋 Initializing with ${Object.keys(node.data.metadata).length} metadata parameters`,
            nodeType: 'start',
            nodeTitle: node.data.title
          })
        }
        break
        
      case 'task':
        steps.push({
          step: `📝 Assigning task: ${node.data.title}`,
          nodeType: 'task',
          nodeTitle: node.data.title
        })
        
        if (node.data.assignee) {
          steps.push({
            step: `👤 Task assigned to: ${node.data.assignee}`,
            nodeType: 'task',
            nodeTitle: node.data.title
          })
        }
        
        if (node.data.dueDate) {
          steps.push({
            step: `📅 Due date set: ${new Date(node.data.dueDate).toLocaleDateString()}`,
            nodeType: 'task',
            nodeTitle: node.data.title
          })
        }
        
        steps.push({
          step: `⏳ Waiting for task completion...`,
          nodeType: 'task',
          nodeTitle: node.data.title
        })
        
        steps.push({
          step: `✅ Task completed: ${node.data.title}`,
          nodeType: 'task',
          nodeTitle: node.data.title
        })
        break
        
      case 'approval':
        steps.push({
          step: `🔍 Requesting approval: ${node.data.title}`,
          nodeType: 'approval',
          nodeTitle: node.data.title
        })
        
        if (node.data.approverRole) {
          steps.push({
            step: `👔 Sent to ${node.data.approverRole} for review`,
            nodeType: 'approval',
            nodeTitle: node.data.title
          })
        }
        
        if (node.data.threshold) {
          steps.push({
            step: `🎯 Approval threshold: ${node.data.threshold}`,
            nodeType: 'approval',
            nodeTitle: node.data.title
          })
        }
        
        // Simulate approval decision
        await new Promise(resolve => setTimeout(resolve, 500))
        steps.push({
          step: `✅ Approved: ${node.data.title}`,
          nodeType: 'approval',
          nodeTitle: node.data.title
        })
        break
        
      case 'automated':
        steps.push({
          step: `⚙️ Executing automation: ${node.data.title}`,
          nodeType: 'automated',
          nodeTitle: node.data.title
        })
        
        if (node.data.automationId) {
          steps.push({
            step: `🔧 Running: ${node.data.automationId}`,
            nodeType: 'automated',
            nodeTitle: node.data.title
          })
          
          if (node.data.automationParams && Object.keys(node.data.automationParams).length > 0) {
            steps.push({
              step: `📦 Processing ${Object.keys(node.data.automationParams).length} parameters`,
              nodeType: 'automated',
              nodeTitle: node.data.title
            })
          }
          
          // Simulate automation execution time
          await new Promise(resolve => setTimeout(resolve, 300))
          steps.push({
            step: `✅ Automation completed: ${node.data.title}`,
            nodeType: 'automated',
            nodeTitle: node.data.title
          })
        }
        break
        
      case 'end':
        steps.push({
          step: `🏁 Workflow completed: ${node.data.title || 'End'}`,
          nodeType: 'end',
          nodeTitle: node.data.title
        })
        
        if (node.data.message) {
          steps.push({
            step: `💬 Final message: ${node.data.message}`,
            nodeType: 'end',
            nodeTitle: node.data.title
          })
        }
        
        if (node.data.showSummary) {
          steps.push({
            step: `📊 Generating workflow summary...`,
            nodeType: 'end',
            nodeTitle: node.data.title
          })
          
          const totalNodes = allNodes.length
          const taskNodes = allNodes.filter(n => n.type === 'task').length
          const approvalNodes = allNodes.filter(n => n.type === 'approval').length
          const automatedNodes = allNodes.filter(n => n.type === 'automated').length
          
          steps.push({
            step: `📈 Summary: ${totalNodes} total steps (${taskNodes} tasks, ${approvalNodes} approvals, ${automatedNodes} automations)`,
            nodeType: 'end',
            nodeTitle: node.data.title
          })
        }
        break
    }
    
    return steps
  }
}
