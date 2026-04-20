import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { WorkflowNode } from "../../types";

interface BaseNodeProps extends NodeProps<WorkflowNode["data"]> {
  type: "start" | "task" | "approval" | "automated" | "end";
}

const getStyles = (type: BaseNodeProps["type"]) => {
  switch (type) {
    case "start":
      return { bg: "bg-blue-100", text: "text-blue-600" };
    case "task":
      return { bg: "bg-pink-100", text: "text-pink-600" };
    case "approval":
      return { bg: "bg-orange-100", text: "text-orange-600" };
    case "automated":
      return { bg: "bg-purple-100", text: "text-purple-600" };
    case "end":
      return { bg: "bg-green-100", text: "text-green-600" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-600" };
  }
};

export const BaseNode = memo(({ data, selected, type }: BaseNodeProps) => {
  const styles = getStyles(type);

  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-xl shadow-sm
        px-4 py-3 min-w-[180px]
        transition
        ${selected ? "ring-2 ring-blue-300" : ""}
      `}
    >
      {/* INPUT HANDLE */}
      {type !== "start" && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-2 h-2 bg-gray-400 border-0"
        />
      )}

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${styles.bg}`}
        >
          <div className={`w-2 h-2 rounded-full ${styles.text}`} />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-800">
            {data.title || type}
          </p>
          <p className="text-xs text-gray-500 capitalize">{type}</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      {data.description && (
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {data.description}
        </p>
      )}

      {/* EXTRA DATA */}
      {type === "task" && data.assignee && (
        <p className="text-xs text-gray-500">
          User: <span className="text-gray-700">{data.assignee}</span>
        </p>
      )}

      {type === "approval" && data.approverRole && (
        <p className="text-xs text-gray-500">
          Role: <span className="text-gray-700">{data.approverRole}</span>
        </p>
      )}

      {type === "automated" && data.automationId && (
        <p className="text-xs text-gray-500">
          ID: <span className="text-gray-700">{data.automationId}</span>
        </p>
      )}

      {type === "end" && data.message && (
        <p className="text-xs text-gray-500 italic truncate">
          "{data.message}"
        </p>
      )}

      {/* OUTPUT HANDLE */}
      {type !== "end" && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-2 h-2 bg-gray-400 border-0"
        />
      )}
    </div>
  );
});

BaseNode.displayName = "BaseNode";