import { useCallback, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Background,
  addEdge,
  type Connection,
  type Edge,
  BackgroundVariant,
  MarkerType,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "../../store/workflowStore";
import { nodeTypes, edgeTypes } from "./nodeTypes";
import type { WorkflowNode } from "../../types";

export function WorkflowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

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

  const getEdgeStyle = (sourceType: string) => {
    switch (sourceType) {
      case 'start': return { color: '#3b82f6', width: 3 };    // blue-500
      case 'task': return { color: '#ec4899', width: 3 };     // pink-500
      case 'approval': return { color: '#f97316', width: 3 }; // orange-500
      case 'automated': return { color: '#a855f7', width: 3 };// purple-500
      case 'end': return { color: '#22c55e', width: 3 };       // green-500
      default: return { color: '#94a3b8', width: 2 };
    }
  };

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      const sourceNode = nodes.find(node => node.id === params.source);
      const style = getEdgeStyle(sourceNode?.type || '');

      const newEdge: Edge = {
        id: `edge-${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        type: "default", // Smooth bezier curves
        animated: false,
        style: {
          stroke: style.color,
          strokeWidth: style.width,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: style.color,
        },
      };

      setEdges((eds) => addEdge(newEdge, eds));
      addStoreEdge(newEdge);
    },
    [setEdges, addStoreEdge, nodes]
  );

  const onNodeClick = useCallback(
    (_: any, node: any) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onNodeDoubleClick = useCallback(
    (_: any, node: any) => {
      deleteNode(node.id);
    },
    [deleteNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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

      if (isNaN(position.x) || isNaN(position.y)) return;

      const newNode: WorkflowNode = {
        id: `${type}-${Date.now()}`,
        type: type as WorkflowNode['type'],
        position,
        data: {
          title: type.charAt(0).toUpperCase() + type.slice(1),
          description: "",
        },
      };

      setNodes((nds) => [...nds, newNode]);
      addNode(newNode);
    },
    [setNodes, addNode]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full relative">
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
        proOptions={{ hideAttribution: true }}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        {/* Modern grid foundation */}
        <Background
          gap={32}
          size={1}
          color="#f1f5f9"
          variant={BackgroundVariant.Dots}
        />

        {/* Global Blueprint View */}
        <MiniMap
          className="!bg-white/80 !backdrop-blur-md !border !border-gray-100 !rounded-3xl !shadow-2xl !bottom-6 !right-6"
          nodeColor={(node) => {
            switch (node.type) {
              case "start": return "#3b82f6";
              case "task": return "#ec4899";
              case "approval": return "#f97316";
              case "automated": return "#a855f7";
              case "end": return "#22c55e";
              default: return "#f3f4f6";
            }
          }}
          maskColor="rgba(248,250,252,0.6)"
        />

        {/* Floating View Controls */}
        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 p-1 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-xl">
            <button
              onClick={() => zoomIn()}
              className="p-2.5 hover:bg-gray-50 transition-all rounded-xl text-gray-400 hover:text-blue-500"
              title="Expand Perspective"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              onClick={() => zoomOut()}
              className="p-2.5 hover:bg-gray-50 transition-all rounded-xl text-gray-400 hover:text-blue-500"
              title="Compress Perspective"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
              </svg>
            </button>
            <div className="w-[1px] h-4 bg-gray-100 mx-1" />
            <button
              onClick={() => fitView({ padding: 0.2 })}
              className="p-2.5 hover:bg-gray-50 transition-all rounded-xl text-gray-400 hover:text-blue-500"
              title="Analyze Full Layout"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
        </div>

      </ReactFlow>
    </div>
  );
}