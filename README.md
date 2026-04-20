# FlowForge HR - Visual Workflow Designer

A production-quality React application for designing HR workflows using React Flow. Build drag-and-drop workflows with custom nodes, dynamic configuration forms, and workflow simulation.

## 🚀 Features

### Core Workflow Builder
- **Drag & Drop Interface**: Intuitive node placement from sidebar to canvas
- **Custom Node Types**: Start, Task, Approval, Automated, and End nodes
- **Dynamic Edge Handling**: Smart connections with visual feedback
- **Real-time Validation**: Instant workflow integrity checking

### Node Configuration
- **Dynamic Forms**: Type-specific configuration panels
- **Controlled Inputs**: Proper state management with validation
- **Metadata Support**: Extensible data structures for each node type

### Workflow Simulation
- **Mock API Layer**: Async simulation with realistic delays
- **Step-by-step Execution**: Visual workflow execution path
- **Error Handling**: Comprehensive error reporting

### UI/UX Design
- **Dark Theme**: Modern glass-morphism design
- **Responsive Layout**: 3-panel layout with collapsible sections
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: ARIA labels and keyboard navigation

## 🛠 Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Flow** - Interactive node-based UI
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **PostCSS** - CSS processing pipeline

## 📁 Architecture

```
src/
├── components/           # React components
│   ├── nodes/           # Custom React Flow nodes
│   │   ├── StartNode.tsx
│   │   ├── TaskNode.tsx
│   │   ├── ApprovalNode.tsx
│   │   ├── AutomatedNode.tsx
│   │   ├── EndNode.tsx
│   │   └── index.ts
│   ├── forms/           # Dynamic configuration forms
│   │   ├── StartNodeForm.tsx
│   │   ├── TaskNodeForm.tsx
│   │   ├── ApprovalNodeForm.tsx
│   │   ├── AutomatedNodeForm.tsx
│   │   ├── EndNodeForm.tsx
│   │   └── index.ts
│   ├── canvas/          # React Flow canvas
│   │   └── WorkflowCanvas.tsx
│   ├── sidebar/         # Draggable node sidebar
│   │   └── NodeSidebar.tsx
│   └── panels/          # Configuration & simulation panels
│       ├── ConfigurationPanel.tsx
│       ├── SimulationPanel.tsx
│       └── index.ts
├── store/               # Zustand state management
│   └── workflowStore.ts
├── services/            # API and external services
│   └── api.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── validation.ts
├── hooks/               # Custom React hooks
└── App.tsx             # Main application component
```

## 🎯 Design Principles

### Clean Architecture
- **Separation of Concerns**: Each module has a single responsibility
- **Dependency Injection**: Services are injected, not hard-coded
- **Interface Segregation**: Small, focused interfaces
- **Single Responsibility**: Each component does one thing well

### Extensibility
- **Plugin Architecture**: Easy to add new node types
- **Configuration-Driven**: Node behavior defined by configuration
- **Event System**: Loose coupling between components
- **Type Safety**: Full TypeScript coverage

### Performance
- **React.memo**: Optimized re-renders
- **Lazy Loading**: Components loaded on demand
- **State Optimization**: Minimal re-renders with Zustand
- **Bundle Splitting**: Optimized build output

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd flowforge-hr

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📖 Usage Guide

### Creating Workflows

1. **Add Nodes**: Drag node types from the left sidebar to the canvas
2. **Configure Nodes**: Click on any node to open the configuration panel
3. **Connect Nodes**: Drag from node handles to create connections
4. **Validate**: Real-time validation shows workflow errors
5. **Simulate**: Switch to Simulation panel to test workflow execution

### Node Types

#### Start Node
- **Purpose**: Workflow entry point
- **Configuration**: Title and metadata fields
- **Validation**: Exactly one required per workflow

#### Task Node
- **Purpose**: Manual task assignment
- **Configuration**: Title, description, assignee, due date
- **Features**: Required title field, optional assignee

#### Approval Node
- **Purpose**: Approval workflow step
- **Configuration**: Title, approver role, threshold
- **Features**: Role-based approvals, configurable thresholds

#### Automated Node
- **Purpose**: Automated system actions
- **Configuration**: Action selection, dynamic parameters
- **Features**: Mock API integration, parameter validation

#### End Node
- **Purpose**: Workflow completion
- **Configuration**: Title, message, summary toggle
- **Features**: Completion messaging, optional summary

## 🔧 Adding New Node Types

### 1. Create Node Component

```tsx
// src/components/nodes/NewNodeType.tsx
import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import type { WorkflowNode } from '../../types'

export const NewNodeType = memo(({ data, selected }: NodeProps<WorkflowNode['data']>) => {
  return (
    <div className={`custom-node-styles ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      {/* Node content */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
})
```

### 2. Create Configuration Form

```tsx
// src/components/forms/NewNodeTypeForm.tsx
import { WorkflowNode } from '../../types'

interface NewNodeTypeFormProps {
  node: WorkflowNode
  onUpdate: (updates: Partial<WorkflowNode>) => void
}

export function NewNodeTypeForm({ node, onUpdate }: NewNodeTypeFormProps) {
  return (
    <div className="space-y-4">
      {/* Form fields */}
    </div>
  )
}
```

### 3. Update Type Definitions

```ts
// src/types/index.ts
export interface WorkflowNode extends Omit<Node, 'data'> {
  type: 'start' | 'task' | 'approval' | 'automated' | 'end' | 'newtype'
  data: {
    // Existing fields...
    newField?: string
  }
}
```

### 4. Register Components

```tsx
// src/components/canvas/WorkflowCanvas.tsx
const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
  newtype: NewNodeType, // Add new type
}
```

### 5. Update Sidebar

```tsx
// src/components/sidebar/NodeSidebar.tsx
const nodeTypes: NodeType[] = [
  // Existing types...
  {
    type: 'newtype',
    label: 'New Type',
    description: 'Description of new node type',
    icon: '🆕',
    color: 'from-indigo-500 to-indigo-600'
  }
]
```

## 🧪 Testing

### Running Tests
```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### Test Structure
- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full workflow testing

## 🔍 API Integration

### Mock API Service

The application includes a mock API service for demonstration:

```typescript
// src/services/api.ts
export const mockApi = {
  async getAutomations(): Promise<Automation[]> {
    // Returns available automation types
  },
  
  async simulateWorkflow(workflowData: WorkflowData): Promise<SimulationStep[]> {
    // Simulates workflow execution
  }
}
```

### Real API Integration

Replace the mock API with real endpoints:

```typescript
// src/services/api.ts
export const api = {
  async getAutomations(): Promise<Automation[]> {
    const response = await fetch('/api/automations')
    return response.json()
  },
  
  async simulateWorkflow(workflowData: WorkflowData): Promise<SimulationStep[]> {
    const response = await fetch('/api/simulate', {
      method: 'POST',
      body: JSON.stringify(workflowData)
    })
    return response.json()
  }
}
```

## 🎨 Customization

### Theming

Update `tailwind.config.js` for custom themes:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-brand-color',
        secondary: '#your-secondary-color'
      }
    }
  }
}
```

### Node Styling

Each node component can be customized with Tailwind classes:

```tsx
<div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg">
  {/* Node content */}
</div>
```

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

**White Screen**: Check PostCSS configuration and Tailwind imports
**Import Errors**: Verify file paths and TypeScript configuration
**State Issues**: Check Zustand store implementation
**Build Errors**: Run `npm run build` to identify issues

### Debug Mode

Enable debug mode in development:

```tsx
// src/App.tsx
if (process.env.NODE_ENV === 'development') {
  // Debug logging
}
```

## 📊 Performance

### Optimization Tips
- Use React.memo for expensive components
- Implement virtual scrolling for large workflows
- Optimize bundle size with dynamic imports
- Use service workers for offline support

### Monitoring
- React DevTools for component profiling
- Chrome DevTools for performance analysis
- Bundle analyzer for size optimization

---

Built with ❤️ using React, TypeScript, and React Flow
