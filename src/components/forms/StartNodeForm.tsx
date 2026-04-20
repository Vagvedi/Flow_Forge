import type { WorkflowNode } from '../../types'
import { PlayCircle, Type, Info, Plus, Trash2 } from 'lucide-react'

interface StartNodeFormProps {
  node: WorkflowNode
  onUpdate: (updates: Partial<WorkflowNode>) => void
}

export function StartNodeForm({ node, onUpdate }: StartNodeFormProps) {
  const metadata = node.data.metadata || {}

  const handleMetadataChange = (key: string, value: string) => {
    const newMetadata = { ...metadata, [key]: value }
    onUpdate({
      data: { ...node.data, metadata: newMetadata }
    })
  }

  const addMetadataField = () => {
    const newKey = `key_${Object.keys(metadata).length + 1}`
    handleMetadataChange(newKey, 'value')
  }

  const removeMetadataField = (key: string) => {
    const newMetadata = { ...metadata }
    delete newMetadata[key]
    onUpdate({
      data: { ...node.data, metadata: newMetadata }
    })
  }

  const renameMetadataKey = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return
    const value = metadata[oldKey]
    const newMetadata = { ...metadata }
    delete newMetadata[oldKey]
    newMetadata[newKey] = value
    onUpdate({
      data: { ...node.data, metadata: newMetadata }
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Title Section */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Type className="w-3 h-3" />
          Workflow Identifier
        </label>
        <input
          type="text"
          value={node.data.title || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, title: e.target.value }
          })}
          className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl
                   text-gray-800 text-sm placeholder:text-gray-300
                   hover:border-gray-200 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 focus:outline-none transition-all shadow-sm"
          placeholder="e.g., Employee Onboarding 2024"
        />
      </div>

      {/* Trigger Context */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3">
        <PlayCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-tight">Manual Initiation</p>
          <p className="text-[10px] text-blue-500 leading-relaxed font-medium">
            This node represents the trigger for the entire sequence. It initiates the deployment environment once triggered.
          </p>
        </div>
      </div>

      {/* Metadata / Tags Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Info className="w-3 h-3" />
            Launch Context
          </label>
          <button 
            onClick={addMetadataField}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
          >
            <Plus className="w-2.5 h-2.5" />
            ADD KEY
          </button>
        </div>

        <div className="space-y-2">
          {Object.entries(metadata).length === 0 && (
            <p className="text-[10px] text-gray-300 text-center py-4 italic">No deployment tags configured.</p>
          )}
          {Object.entries(metadata).map(([key, value]) => (
            <div key={key} className="flex gap-2 items-center animate-in slide-in-from-right-2 duration-300">
              <input
                type="text"
                defaultValue={key}
                onBlur={(e) => renameMetadataKey(key, e.target.value)}
                className="flex-1 px-3 py-2 text-[11px] border border-gray-100 rounded-xl 
                         bg-gray-50/50 text-gray-500 font-bold focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="Key"
              />
              <input
                type="text"
                value={String(value)}
                onChange={(e) => handleMetadataChange(key, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-100 rounded-xl bg-white text-gray-800 text-[11px] font-medium focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="Value"
              />
              <button
                onClick={() => removeMetadataField(key)}
                className="p-2 text-gray-200 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
