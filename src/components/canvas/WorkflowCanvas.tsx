import { useCallback, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  addEdge,
  type Connection,
  type Edge,
  BackgroundVariant,
  MarkerType
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "../../store/workflowStore";
import { nodeTypes, edgeTypes } from "./nodeTypes";
import type { WorkflowNode } from "../../types";

export function WorkflowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const {
    nodes: storeNodes,
    edges: storeEdges,
    addNode,
    addEdge: addStoreEdge,
    deleteNode,
    setSelectedNode,
  } = useWorkflowStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges || []);

  // 🔗 CONNECT NODES (COLORED ARROWS)
  const getEdgeColor = (sourceType: string) => {
    switch (sourceType) {
      case 'start':
        return '#3b82f6'; // blue
      case 'task':
        return '#ec4899'; // pink
      case 'approval':
        return '#f97316'; // peach
      case 'automated':
        return '#8b5cf6'; // lavender
      case 'end':
        return '#10b981'; // mint
      default:
        return '#6b7280'; // gray
    }
  };

  const onConnect = useCallback(
  (params: Connection) => {
    if (!params.source || !params.target) return;
    
    // Find source node to get its type
    const sourceNode = nodes.find(node => node.id === params.source);
    const edgeColor = sourceNode ? getEdgeColor(sourceNode.type || '') : '#6b7280';
    
    const newEdge: Edge = {
      id: `edge-${params.source}-${params.target}`,
      source: params.source,
      target: params.target,
      sourceHandle: params.sourceHandle,
      targetHandle: params.targetHandle,
      type: "smoothstep",
      animated: false,
      style: {
        stroke: edgeColor,
        strokeWidth: 2,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edgeColor,
      },
    };

    setEdges((eds) => addEdge(newEdge, eds));
    addStoreEdge(newEdge);
  },
  [setEdges, addStoreEdge, nodes]
);

  // 🖱 SELECT NODE
  const onNodeClick = useCallback(
    (_: any, node: any) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  // ❌ DELETE NODE
  const onNodeDoubleClick = useCallback(
    (_: any, node: any) => {
      deleteNode(node.id);
    },
    [deleteNode]
  );

  // 🧠 DRAG OVER
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // 📦 DROP NODE (FIXED POSITION + SAFETY)
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!bounds) return;

      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      // safety check
      if (isNaN(position.x) || isNaN(position.y)) return;

      const newNode: WorkflowNode = {
        id: `${type}-${Date.now()}`,
        type: type as WorkflowNode['type'],
        position,
        data: {
          title: type.toUpperCase(),
          description: "",
        },
      };

      setNodes((nds) => [...nds, newNode]);
      addNode(newNode);
    },
    [setNodes, addNode]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-white"
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        {/* Clean light grid */}
        <Background 
          gap={20} 
          size={1} 
          color="#f3f4f6"
          variant={BackgroundVariant.Dots}
        />

        {/* Clean controls */}
        <Controls 
          className="bg-white border border-gray-200 rounded-lg shadow-sm"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />

        {/* Clean minimap */}
        <MiniMap
          className="bg-white border border-gray-200 rounded-lg shadow-sm"
          nodeColor={(node) => {
            switch (node.type) {
              case "start":
                return "#dbeafe"; // light blue
              case "task":
                return "#ffe4e6"; // light pink
              case "approval":
                return "#ffedd5"; // light peach
              case "automated":
                return "#ede9fe"; // light lavender
              case "end":
                return "#dcfce7"; // light mint
              default:
                return "#f3f4f6"; // light gray
            }
          }}
          maskColor="rgba(255, 255, 255, 0.95)"
        />
      </ReactFlow>
    </div>
  );
}