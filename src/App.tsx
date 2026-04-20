import { useState, useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

import { NodeSidebar } from "./components/sidebar/NodeSidebar";
import { WorkflowCanvas } from "./components/canvas/WorkflowCanvas";
import { ConfigurationPanel } from "./components/panels/ConfigurationPanel";
import { SimulationPanel } from "./components/panels/SimulationPanel";
import { useWorkflowStore } from "./store/workflowStore";
import { validateWorkflow } from "./utils/validation";

function AppContent() {
  const [activePanel, setActivePanel] = useState<"config" | "simulation">("config");
  const { nodes, edges, validationErrors, setValidationErrors } = useWorkflowStore();

  useEffect(() => {
    const errors = validateWorkflow(nodes, edges);
    setValidationErrors(errors);
  }, [nodes, edges, setValidationErrors]);

  return (
    <div className="h-screen w-screen flex flex-col bg-white">
      
      {/* HEADER */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">FlowForge HR</h1>
          </div>
          <span className="text-sm text-gray-500 hidden sm:inline">
            Visual Workflow Designer
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActivePanel("config")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activePanel === "config"
                ? "bg-blue-500 text-white border border-blue-500 shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            Configuration
          </button>
          <button
            onClick={() => setActivePanel("simulation")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activePanel === "simulation"
                ? "bg-blue-500 text-white border border-blue-500 shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            Simulation
          </button>
        </div>
      </header>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT SIDEBAR */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0">
          <NodeSidebar />
        </div>

        {/* CANVAS */}
        <div className="flex-1 h-full flex bg-white">
          <WorkflowCanvas />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-80 bg-white border-l border-gray-200 flex-shrink-0 overflow-auto">
          {activePanel === "config" ? <ConfigurationPanel /> : <SimulationPanel />}
        </div>

      </div>

      {/* VALIDATION BAR */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border-t border-red-200 px-6 py-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="font-medium text-red-800">Validation Errors:</span>
          </div>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-red-700">
            {validationErrors.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}