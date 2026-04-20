import React, { useCallback, memo } from 'react'
import ReactFlow, {
  type Node,
  type Edge,
  type Connection,
  type NodeMouseHandler,
  type NodeChange,
  type EdgeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  type NodeProps
} from 'reactflow'
import 'reactflow/dist/style.css'

// Define a simple node component
const SimpleNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div className={`
      px-4 py-3 bg-blue-500 text-white rounded-lg shadow-lg border-2 transition-all
      ${selected ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-blue-700'}
      min-w-[150px]
    `}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-300 border-2 border-blue-600"
      />
      
      <div className="text-center">
        <div className="font-semibold text-sm">{data.title || 'Node'}</div>
        {data.description && (
          <div className="text-xs text-blue-100 mt-1">{data.description}</div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-300 border-2 border-blue-600"
      />
    </div>
  )
})

SimpleNode.displayName = 'SimpleNode'

// Define nodeTypes outside component to prevent recreation
const nodeTypes = {
  simple: SimpleNode,
} as const

// Initial default node to prevent rendering errors
const initialNodes: Node[] = [
  {
    id: 'default-node-1',
    type: 'simple',
    position: { x: 250, y: 50 },
    data: { 
      title: 'Start Node', 
      description: 'This is a default node' 
    }
  }
]

const initialEdges: Edge[] = []

export function MinimalFlow() {
  const [nodes, setNodes] = React.useState<Node[]>(initialNodes)
  const [edges, setEdges] = React.useState<Edge[]>(initialEdges)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds))
    },
    []
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    []
  )

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
    },
    []
  )

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    console.log('Node clicked:', node)
  }, [])

  const onNodeDoubleClick: NodeMouseHandler = useCallback((_event, node) => {
    // Delete node on double click
    setNodes((nds) => nds.filter((n) => n.id !== node.id))
  }, [])

  return (
    <div className="w-full h-screen bg-gray-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-gray-900"
        style={{ width: '100%', height: '100%' }}
      >
        <Background 
          color="#374151" 
          gap={16} 
          variant={BackgroundVariant.Dots}
        />
        <Controls 
          className="bg-gray-800 border border-gray-700 text-white"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  )
}
