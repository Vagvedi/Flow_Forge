import { useState, useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { 
  Zap, 
  Settings2, 
  Terminal, 
  AlertCircle, 
  ShieldCheck, 
  Layers,
  Info
} from "lucide-react";

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
    <div className="h-screen w-screen flex flex-col bg-[#fdfcff] text-gray-900 font-sans tracking-tight">
      
      {/* GLOBAL HEADER */}
      <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between flex-shrink-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-100 transform -rotate-3">
            <Zap className="w-5 h-5 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 uppercase tracking-tighter">FlowForge HR</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 leading-none opacity-60">Engine v4.2.0</p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center p-1 bg-gray-50 rounded-2xl border border-gray-100">
          <button
            onClick={() => setActivePanel("config")}
            className={`flex items-center gap-2 px-6 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${activePanel === "config"
              ? "bg-white text-blue-600 shadow-sm border border-blue-50"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <Settings2 className="w-3.5 h-3.5" />
            Workspace
          </button>
          <button
            onClick={() => setActivePanel("simulation")}
            className={`flex items-center gap-2 px-6 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${activePanel === "simulation"
              ? "bg-white text-blue-600 shadow-sm border border-blue-50"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Simulation
          </button>
        </div>

        {/* User / Org Context */}
        <div className="flex items-center gap-3">
           <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-[11px] font-bold text-gray-800">Operational Alpha</span>
              <span className="text-[9px] font-bold text-green-500 uppercase tracking-wider">Sync Active</span>
           </div>
           <div className="w-10 h-10 rounded-full border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-gray-300" />
           </div>
        </div>

      </header>

      {/* CORE INFRASTRUCTURE */}
      <div className="flex flex-1 overflow-hidden">

        {/* COMPONENT REPOSITORY */}
        <aside className="w-72 overflow-hidden flex-shrink-0">
          <NodeSidebar />
        </aside>

        {/* LOGIC CANVAS */}
        <main className="flex-1 overflow-hidden bg-[#fdfcff] relative">
          <WorkflowCanvas />
          
          {/* Overlay Status (Contextual) */}
          <div className="absolute top-6 left-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500 pointer-events-none">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Drafting Environment</span>
          </div>
        </main>

        {/* PARAMETER INTERFACE */}
        <aside className="w-80 overflow-hidden flex-shrink-0 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="h-full transition-transform duration-500">
            {activePanel === "config" ? <ConfigurationPanel /> : <SimulationPanel />}
          </div>
        </aside>

      </div>

      {/* INTELLIGENT FEEDBACK BAR */}
      {validationErrors.length > 0 && (
        <div className="bg-rose-50 border-t border-rose-100 px-8 py-3.5 flex items-center justify-between flex-shrink-0 animate-in slide-in-from-bottom-full duration-500">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-200">
               <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <div>
               <p className="text-[11px] font-bold text-rose-700 uppercase tracking-widest leading-none mb-1">Architecture Integrity Fault</p>
               <p className="text-xs text-rose-500 font-medium">{validationErrors.length} logical inconsistencies detected in the current blueprint.</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-600 transition-all shadow-md active:scale-95">
             Review Errors
          </button>
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