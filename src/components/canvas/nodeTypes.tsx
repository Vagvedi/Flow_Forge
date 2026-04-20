import type { NodeProps } from "reactflow";
import type { WorkflowNode } from "../../types";
import { BaseNode } from "./BaseNode";

type NodeData = WorkflowNode["data"];

const StartNode = (props: NodeProps<NodeData>) => (
  <BaseNode {...props} type="start" />
);

const TaskNode = (props: NodeProps<NodeData>) => (
  <BaseNode {...props} type="task" />
);

const ApprovalNode = (props: NodeProps<NodeData>) => (
  <BaseNode {...props} type="approval" />
);

const AutomatedNode = (props: NodeProps<NodeData>) => (
  <BaseNode {...props} type="automated" />
);

const EndNode = (props: NodeProps<NodeData>) => (
  <BaseNode {...props} type="end" />
);

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

export const edgeTypes = {};