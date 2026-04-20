import { BaseNode } from "./BaseNode";

export const nodeTypes = {
  start: (props: any) => <BaseNode {...props} type="start" />,
  task: (props: any) => <BaseNode {...props} type="task" />,
  approval: (props: any) => <BaseNode {...props} type="approval" />,
  automated: (props: any) => <BaseNode {...props} type="automated" />,
  end: (props: any) => <BaseNode {...props} type="end" />,
};

export const edgeTypes = {};