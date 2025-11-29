"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, GripVertical, Trash2, Edit2 } from "lucide-react"

type FieldType = "text" | "textarea" | "dropdown" | "radio" | "checkbox"

interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  defaultValue?: string
  options?: string[]
}

interface FormBuilderProps {
  fields: FormField[]
  onChange: (fields: FormField[]) => void
  onNext: () => void
}

export default function FormBuilder({ fields, onChange, onNext }: FormBuilderProps) {
  const [selectedField, setSelectedField] = useState<FormField | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const fieldTypes: { type: FieldType; icon: string; label: string }[] = [
    { type: "text", icon: "T", label: "Short Text" },
    { type: "textarea", icon: "¶", label: "Paragraph" },
    { type: "dropdown", icon: "⌄", label: "Dropdown" },
    { type: "radio", icon: "◉", label: "Radio" },
    { type: "checkbox", icon: "☑", label: "Checkbox" },
  ]

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: "",
      placeholder: "",
      defaultValue: "",
      options: type === "dropdown" || type === "radio" ? [""] : undefined,
    }
    onChange([...fields, newField])
    setSelectedField(newField)
    setIsEditing(true)
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    onChange(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)))
    if (selectedField?.id === id) {
      setSelectedField({ ...selectedField, ...updates })
    }
  }

  const deleteField = (id: string) => {
    onChange(fields.filter((f) => f.id !== id))
    if (selectedField?.id === id) {
      setSelectedField(null)
      setIsEditing(false)
    }
  }

  const moveField = (index: number, direction: "up" | "down") => {
    const newFields = [...fields]
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex >= 0 && newIndex < fields.length) {
      ;[newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]]
      onChange(newFields)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form Canvas */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Form Builder</h3>
            <span className="text-sm text-muted-foreground">Element Limit: {fields.length}/5</span>
          </div>

          <div className="space-y-4 min-h-[400px]">
            {fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center border-2 border-dashed border-border rounded-lg">
                <p className="text-muted-foreground mb-2">No fields added yet</p>
                <p className="text-sm text-muted-foreground">Click field types on the right to add them</p>
              </div>
            ) : (
              fields.map((field, index) => (
                <div
                  key={field.id}
                  className="group relative border border-border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col gap-1 mt-2">
                      <button
                        onClick={() => moveField(index, "up")}
                        disabled={index === 0}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <GripVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{field.label || "Untitled Field"}</span>
                        <span className="text-xs text-muted-foreground">({field.type})</span>
                      </div>

                      {field.type === "text" && (
                        <Input
                          placeholder={field.placeholder || "Short text input"}
                          disabled
                          defaultValue={field.defaultValue}
                        />
                      )}
                      {field.type === "textarea" && (
                        <Textarea
                          placeholder={field.placeholder || "Long text input"}
                          disabled
                          defaultValue={field.defaultValue}
                          rows={3}
                        />
                      )}
                      {field.type === "dropdown" && (
                        <select className="w-full border border-border rounded-md px-3 py-2" disabled>
                          <option>{field.defaultValue || "Select option"}</option>
                        </select>
                      )}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedField(field)
                          setIsEditing(true)
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteField(field.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {fields.length < 5 && (
              <Button variant="outline" className="w-full border-dashed bg-transparent" onClick={() => {}}>
                <Plus className="mr-2 h-4 w-4" />
                Add field
              </Button>
            )}
          </div>

          <div className="mt-6">
            <Button onClick={onNext} size="lg" disabled={fields.length === 0}>
              Next: Configure Prompt
            </Button>
          </div>
        </Card>
      </div>

      {/* Field Types Panel */}
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">INPUT TYPES</h3>
          <div className="grid grid-cols-2 gap-3">
            {fieldTypes.slice(0, 2).map((fieldType) => (
              <button
                key={fieldType.type}
                onClick={() => addField(fieldType.type)}
                disabled={fields.length >= 5}
                className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-primary hover:bg-accent/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-2xl text-muted-foreground">{fieldType.icon}</span>
                <span className="text-sm font-medium">{fieldType.label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">MULTIPLE CHOICE</h3>
          <div className="grid grid-cols-2 gap-3">
            {fieldTypes.slice(2).map((fieldType) => (
              <button
                key={fieldType.type}
                onClick={() => addField(fieldType.type)}
                disabled={fields.length >= 5}
                className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-primary hover:bg-accent/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-2xl text-muted-foreground">{fieldType.icon}</span>
                <span className="text-sm font-medium">{fieldType.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Field Editor */}
        {isEditing && selectedField && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Edit Field</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditing(false)
                  setSelectedField(null)
                }}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Input Name</Label>
                <Input
                  value={selectedField.label}
                  onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                  placeholder="Add input name"
                />
              </div>

              <div>
                <Label>Default text</Label>
                <Input
                  value={selectedField.defaultValue || ""}
                  onChange={(e) => updateField(selectedField.id, { defaultValue: e.target.value })}
                  placeholder="Add default text (optional)"
                />
              </div>

              {selectedField.type === "text" && (
                <div>
                  <Label>Placeholder</Label>
                  <Input
                    value={selectedField.placeholder || ""}
                    onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                    placeholder="Add placeholder text"
                  />
                </div>
              )}

              {(selectedField.type === "dropdown" || selectedField.type === "radio") && (
                <div>
                  <Label>Options</Label>
                  {selectedField.options?.map((option, idx) => (
                    <Input
                      key={idx}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(selectedField.options || [])]
                        newOptions[idx] = e.target.value
                        updateField(selectedField.id, { options: newOptions })
                      }}
                      placeholder={`Option ${idx + 1}`}
                      className="mt-2"
                    />
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                    onClick={() => {
                      const newOptions = [...(selectedField.options || []), ""]
                      updateField(selectedField.id, { options: newOptions })
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Option
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
