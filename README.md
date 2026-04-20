# FlowForge HR - Visual Workflow Designer

A modern React application for designing HR workflows using React Flow. Build drag-and-drop workflows with custom nodes, dynamic configuration forms, and workflow simulation.

## 🚀 Features

### Core Workflow Builder
- **Drag & Drop Interface**: Intuitive node placement from sidebar to canvas
- **Custom Node Types**: Start, Task, Approval, Automated, and End nodes
- **Dynamic Edge Handling**: Smart connections with colored arrows based on node type
- **Real-time Validation**: Instant workflow integrity checking

### Node Configuration
- **Dynamic Forms**: Type-specific configuration panels with clean UI
- **Controlled Inputs**: Proper state management with validation
- **Metadata Support**: Extensible data structures for each node type

### Workflow Simulation
- **Mock API Layer**: Async simulation with realistic delays
- **Step-by-step Execution**: Visual workflow execution path
- **Error Handling**: Comprehensive error reporting

### UI/UX Design
- **Light Pastel Theme**: Clean SaaS aesthetic with white surfaces
- **Color Palette**: Blue, Pink, Peach, Lavender, Mint for node types
- **Responsive Layout**: 3-panel layout with proper flex structure
- **Smooth Animations**: Hover effects and transitions
- **Professional Styling**: Consistent spacing, rounded corners, minimal design

## 🛠 Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Flow** - Interactive node-based UI
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **PostCSS** - CSS processing pipeline

## 🏗️ Architecture

### Component Structure
```
src/
├── components/           # React components
│   ├── canvas/          # React Flow canvas and nodes
│   │   ├── BaseNode.tsx     # Base node component with shared logic
│   │   ├── WorkflowCanvas.tsx # Main canvas with drag-drop
│   │   └── nodeTypes.tsx    # Node type definitions
│   ├── sidebar/         # Draggable node sidebar
│   │   └── NodeSidebar.tsx  # Node palette with drag-drop
│   ├── panels/          # Configuration & simulation panels
│   │   ├── ConfigurationPanel.tsx # Node configuration forms
│   │   └── SimulationPanel.tsx    # Workflow testing
│   └── forms/           # Dynamic configuration forms
│       ├── StartNodeForm.tsx
│       ├── TaskNodeForm.tsx
│       ├── ApprovalNodeForm.tsx
│       ├── AutomatedNodeForm.tsx
│       └── EndNodeForm.tsx
├── store/               # Zustand state management
│   └── workflowStore.ts # Central workflow state
├── types/               # TypeScript type definitions
│   └── index.ts         # Workflow and node types
├── utils/               # Utility functions
│   └── validation.ts    # Workflow validation logic
└── App.tsx              # Main application component
```

### State Management Architecture
- **Zustand Store**: Centralized state for nodes, edges, and validation
- **React Flow State**: Local state for canvas interactions
- **Component State**: Local state for UI interactions (selected nodes, panels)

### Data Flow
1. **User Actions** → Component Events → Zustand Store Updates
2. **Store Changes** → React Flow State → Canvas Re-render
3. **Form Updates** → Component State → Store Updates → Canvas Sync

## 🚀 How to Run

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Vagvedi/Flow_Forge.git
cd flowforge-hr

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

### Development Workflow
1. **Start Dev Server**: `npm run dev` for hot reloading
2. **Type Checking**: TypeScript runs automatically
3. **Linting**: ESLint configured for code quality
4. **Building**: `npm run build` for production optimization

## 🎨 Design Decisions

### UI/UX Design Philosophy
- **Light Pastel Theme**: Chosen for professional SaaS aesthetic
- **Color Coding**: Each node type has distinct color (Blue, Pink, Peach, Lavender, Mint)
- **Minimal Design**: No gradients, glass effects, or heavy styling
- **Consistent Spacing**: Standardized gaps and padding throughout
- **Rounded Corners**: Modern, friendly appearance with `rounded-lg`

### Technical Architecture Decisions

#### React Flow Integration
- **Why React Flow**: Industry standard for node-based interfaces
- **Custom Nodes**: BaseNode component for consistent styling
- **Dynamic Edges**: Color-coded based on source node type
- **Handles**: Clean white handles with subtle borders

#### State Management
- **Why Zustand**: Lightweight, simple, no boilerplate
- **Centralized Store**: Single source of truth for workflow data
- **Reactive Updates**: Automatic UI updates on state changes

#### Component Architecture
- **Component Composition**: Reusable BaseNode with type-specific styling
- **Form Components**: Dynamic forms based on node type
- **Panel System**: Separate panels for configuration and simulation

#### Styling Approach
- **Tailwind CSS**: Utility-first for rapid development
- **Custom Colors**: Pastel palette for brand consistency
- **Responsive Design**: Flex layouts for proper scaling
- **No CSS-in-JS**: Better performance and maintainability

### Performance Considerations
- **React.memo**: Optimized node re-renders
- **Callback Memoization**: Prevents unnecessary function recreation
- **Efficient State Updates**: Minimal re-renders with Zustand
- **Build Optimization**: Vite for fast builds and hot reload

## ✅ What Was Completed

### Core Functionality
- ✅ **Drag & Drop Interface**: Full node placement from sidebar to canvas
- ✅ **5 Node Types**: Start, Task, Approval, Automated, End with unique styling
- ✅ **Dynamic Configuration Forms**: Type-specific forms for each node
- ✅ **Real-time Validation**: Workflow integrity checking with error display
- ✅ **Colored Edges**: Arrows colored based on source node type
- ✅ **Workflow Simulation**: Step-by-step execution with timing
- ✅ **Professional UI**: Light pastel theme with consistent design

### UI/UX Features
- ✅ **Clean SaaS Layout**: 3-panel design with proper flex structure
- ✅ **Professional Logo**: Lightning bolt icon with brand name
- ✅ **Consistent Buttons**: Proper hover states and styling
- ✅ **Responsive Design**: Works on different screen sizes
- ✅ **Smooth Animations**: Hover effects and transitions
- ✅ **No Emojis**: Clean text labels throughout

### Technical Implementation
- ✅ **TypeScript**: Full type safety throughout
- ✅ **State Management**: Zustand for centralized state
- ✅ **Component Architecture**: Clean separation of concerns
- ✅ **Build System**: Vite with optimized production builds
- ✅ **Git Setup**: Proper .gitignore and repository initialization

## 🚀 What Would Be Added With More Time

### Advanced Features
- 🔄 **Workflow Persistence**: Save/load workflows to local storage or backend
- 🔄 **Real-time Collaboration**: Multiple users editing workflows simultaneously
- 🔄 **Advanced Validation**: Complex business rule validation
- 🔄 **Workflow Templates**: Pre-built workflow templates for common HR processes
- 🔄 **Export Options**: Export workflows as JSON, images, or other formats

### Enhanced UI/UX
- 🔄 **Dark Mode**: Toggle between light and dark themes
- 🔄 **Keyboard Shortcuts**: Power user features for faster workflow building
- 🔄 **Undo/Redo System**: Full history management for workflow changes
- 🔄 **Zoom Controls**: Better canvas navigation and zoom controls
- 🔄 **Node Search**: Find and filter nodes in complex workflows

### Integration & API
- 🔄 **Backend API**: Real API endpoints for workflow execution
- 🔄 **Database Integration**: Persistent storage for workflows
- 🔄 **Authentication**: User accounts and workflow ownership
- 🔄 **Webhook Support**: Trigger external services from workflow nodes
- 🔄 **Email Notifications**: Send notifications for workflow events

### Performance & Scalability
- 🔄 **Virtual Scrolling**: Handle large workflows with hundreds of nodes
- 🔄 **Lazy Loading**: Load components and data on demand
- 🔄 **Caching Strategy**: Optimize performance with intelligent caching
- 🔄 **Analytics**: Track workflow usage and performance metrics
- 🔄 **Testing Suite**: Comprehensive unit, integration, and E2E tests

### Production Features
- 🔄 **Error Boundaries**: Graceful error handling and recovery
- 🔄 **Performance Monitoring**: Real-time performance tracking
- 🔄 **CI/CD Pipeline**: Automated testing and deployment
- 🔄 **Documentation**: Comprehensive API documentation
- 🔄 **Docker Support**: Containerized deployment options

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
