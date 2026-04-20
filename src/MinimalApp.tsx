import { ReactFlowProvider } from 'reactflow'
import { MinimalFlow } from './MinimalFlow'
import 'reactflow/dist/style.css'

function MinimalApp() {
  return (
    <ReactFlowProvider>
      <MinimalFlow />
    </ReactFlowProvider>
  )
}

export default MinimalApp
