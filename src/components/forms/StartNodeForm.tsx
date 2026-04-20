import { useState } from 'react'
import type { WorkflowNode } from '../../types'

interface StartNodeFormProps {
  node: WorkflowNode
  onUpdate: (updates: Partial<WorkflowNode>) => void
}

export function StartNodeForm({ node, onUpdate }: StartNodeFormProps) {
  const [metadata, setMetadata] = useState(
    node.data.metadata || {}
  )

  const handleMetadataChange = (key: string, value: string) => {
    const newMetadata = { ...metadata, [key]: value }
    setMetadata(newMetadata)
    onUpdate({
      data: { ...node.data, metadata: newMetadata }
    })
  }

  const addMetadataField = () => {
    const key = `field_${Object.keys(metadata).length + 1}`
    handleMetadataChange(key, '')
  }

  const removeMetadataField = (key: string) => {
    const newMetadata = { ...metadata }
    delete newMetadata[key]
    setMetadata(newMetadata)
    onUpdate({
      data: { ...node.data, metadata: newMetadata }
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={node.data.title || ''}
          onChange={(e) => onUpdate({
            data: { ...node.data, title: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg 
                   bg-white text-gray-900
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
          placeholder="Enter start node title"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Metadata
          </label>
          <button
            onClick={addMetadataField}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 border border-blue-500 font-medium shadow-sm"
          >
            Add Field
          </button>
        </div>
        
        <div className="space-y-2">
          {Object.entries(metadata).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  const newMetadata = { ...metadata }
                  delete newMetadata[key]
                  newMetadata[e.target.value] = value
                  setMetadata(newMetadata)
                  onUpdate({
                    data: { ...node.data, metadata: newMetadata }
                  })
                }}
                className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded-lg 
                         bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Key"
              />
              <input
                type="text"
                value={String(value)}
                onChange={(e) => handleMetadataChange(key, e.target.value)}
                className="flex-1 px-3 py-1 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
              <button
                onClick={() => removeMetadataField(key)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 border border-red-500 font-medium shadow-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
