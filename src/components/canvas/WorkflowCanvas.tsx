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

  const getEdgeColor = (sourceType: string) => {
    switch (sourceType) {
      case 'start': return '#93c5fd';
      case 'task': return '#f9a8d4';
      case 'approval': return '#fdba74';
      case 'automated': return '#c4b5fd';
      case 'end': return '#86efac';
      default: return '#e5e7eb';
    }
  };

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      const sourceNode = nodes.find(node => node.id === params.source);
      const edgeColor = sourceNode ? getEdgeColor(sourceNode.type || '') : '#e5e7eb';

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
        {/* Subtle dot grid */}
        <Background
          gap={28}
          size={1.2}
          color="#d1d5db"
          variant={BackgroundVariant.Dots}
        />

        {/* MiniMap */}
        <MiniMap
          className="!bg-white !border !border-gray-100 !rounded-xl !shadow-sm"
          nodeColor={(node) => {
            switch (node.type) {
              case "start": return "#dbeafe";
              case "task": return "#ffe4e6";
              case "approval": return "#ffedd5";
              case "automated": return "#ede9fe";
              case "end": return "#dcfce7";
              default: return "#f3f4f6";
            }
          }}
          maskColor="rgba(255,255,255,0.7)"
        />

        {/* Custom zoom controls — top right */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5">
          <div className="flex flex-col bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => zoomIn()}
              className="p-2 hover:bg-gray-50 transition-colors border-b border-gray-100"
              title="Zoom In"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              onClick={() => zoomOut()}
              className="p-2 hover:bg-gray-50 transition-colors"
              title="Zoom Out"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
          </div>

          {/* Fit view button */}
          <button
            onClick={() => fitView({ padding: 0.2 })}
            className="bg-white border border-gray-100 rounded-xl shadow-sm p-2 hover:bg-gray-50 transition-colors"
            title="Fit View"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>

      </ReactFlow>
    </div>
  );
}