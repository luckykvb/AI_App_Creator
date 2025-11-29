"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface PromptSettingsProps {
  fields: any[]
  promptTemplate: string
  onChange: (template: string) => void
  onNext: () => void
}

export default function PromptSettings({ fields, promptTemplate, onChange, onNext }: PromptSettingsProps) {
  const insertField = (fieldLabel: string) => {
    const placeholder = `{${fieldLabel.toLowerCase().replace(/\s+/g, "_")}}`
    onChange(promptTemplate + " " + placeholder)
  }

  const characterCount = promptTemplate.length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Prompt Settings</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Elements</h4>
              <p className="text-sm text-muted-foreground mb-4">
                You can include the form elements you have created into prompt with drag and drop method.
              </p>

              <div className="flex flex-wrap gap-2">
                {fields.map((field) => (
                  <Badge
                    key={field.id}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => insertField(field.label)}
                  >
                    {field.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Your prompt</h4>
                <span className="text-sm text-muted-foreground">{characterCount} / 700</span>
              </div>

              <Textarea
                value={promptTemplate}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Act as a customer care specialist working at the company named {your_company_name} and your task is to generate a personalized customer service email..."
                rows={12}
                className="font-mono text-sm"
              />

              <p className="text-xs text-muted-foreground mt-2">
                Click on field badges above to insert them as placeholders in your prompt
              </p>
            </div>

            <Button onClick={onNext} size="lg" disabled={!promptTemplate}>
              Next: Configure Settings
            </Button>
          </div>
        </Card>
      </div>

      <div>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">USER INPUTS</h3>
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-sm">{field.label}</p>
                  <p className="text-xs text-muted-foreground capitalize">{field.type}</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
