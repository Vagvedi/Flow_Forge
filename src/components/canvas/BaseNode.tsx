import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { 
  Play, 
  CheckSquare, 
  ShieldCheck, 
  Zap, 
  Flag 
} from 'lucide-react'
import type { WorkflowNode } from "../../types";

interface BaseNodeProps extends NodeProps<WorkflowNode["data"]> {
  type: "start" | "task" | "approval" | "automated" | "end";
}

const nodeConfig = {
  start: { icon: Play, color: "bg-blue-500", border: "border-blue-100" },
  task: { icon: CheckSquare, color: "bg-pink-500", border: "border-pink-100" },
  approval: { icon: ShieldCheck, color: "bg-orange-500", border: "border-orange-100" },
  automated: { icon: Zap, color: "bg-purple-500", border: "border-purple-100" },
  end: { icon: Flag, color: "bg-green-500", border: "border-green-100" },
}

export const BaseNode = memo(({ data, selected, type }: BaseNodeProps) => {
  const config = nodeConfig[type] || nodeConfig.task;
  const Icon = config.icon;

  return (
    <div
      className={`
        bg-white border-2 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
        px-5 py-4 min-w-[200px] group transition-all duration-300
        ${selected ? "border-blue-400 ring-4 ring-blue-50" : "border-gray-50 hover:border-gray-100 hover:shadow-xl"}
      `}
    >
      {/* INPUT HANDLE */}
      {type !== "start" && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !bg-gray-200 !border-2 !border-white !-top-1.5 shadow-sm hover:!bg-blue-400 transition-colors"
        />
      )}

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-3">
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center ${config.color} shadow-lg shadow-current/10 group-hover:scale-110 transition-transform duration-500`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div>
          <p className="text-[13px] font-bold text-gray-800 leading-none mb-1">
            {data.title || type.charAt(0).toUpperCase() + type.slice(1)}
          </p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">
            {type} Component
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      {data.description && (
        <p className="text-[11px] text-gray-500 font-medium mb-3 line-clamp-2 leading-relaxed">
          {data.description}
        </p>
      )}

      {/* METADATA SNIPPETS */}
      <div className="space-y-1.5 pt-3 border-t border-gray-50 mt-1">
        {type === "task" && data.assignee && (
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-gray-400 uppercase">Operator</span>
            <span className="text-[10px] font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-md">{data.assignee}</span>
          </div>
        )}

        {type === "approval" && data.approverRole && (
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-gray-400 uppercase">Authority</span>
            <span className="text-[10px] font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-md">{data.approverRole}</span>
          </div>
        )}

        {type === "automated" && data.automationId && (
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-gray-400 uppercase">Module ID</span>
            <span className="text-[10px] font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-md truncate max-w-[80px]">{data.automationId}</span>
          </div>
        )}

        {type === "end" && data.message && (
          <p className="text-[10px] text-gray-400 font-medium italic truncate">
            &ldquo;{data.message}&rdquo;
          </p>
        )}
      </div>

      {/* OUTPUT HANDLE */}
      {type !== "end" && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !bg-gray-200 !border-2 !border-white !-bottom-1.5 shadow-sm hover:!bg-blue-400 transition-colors"
        />
      )}
    </div>
  );
});

BaseNode.displayName = "BaseNode";