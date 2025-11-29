"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AppPreviewProps {
  appName: string
  fields: any[]
  promptTemplate: string
  settings: any
}

export default function AppPreview({ appName, fields, promptTemplate, settings }: AppPreviewProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [output, setOutput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock generated output
    const mockOutput = `Subject: Re: Lost Package Inquiry - Refund Policy Information

Dear ${formData["Customer name"] || "Customer"},

I hope this email finds you well. Thank you for reaching out to ${
      formData["Your company name"] || "our company"
    } regarding your recent inquiry about ${formData["Brief description of the issue"] || "your concern"}.

We sincerely apologize for any inconvenience this may have caused. Our team is working diligently to resolve this matter and ensure your satisfaction.

Please feel free to reach out if you have any further questions.

Best regards,
Customer Care Team
${formData["Your company name"] || "Company Name"}`

    setOutput(mockOutput)
    setIsGenerating(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">App Review</h2>
        <div className="flex gap-3">
          <Button variant="outline">Edit</Button>
          <Button className="bg-secondary hover:bg-secondary/90">Create App</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">{appName}</h3>
          </div>

          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.id}>
                <Label>{field.label}</Label>
                {field.type === "text" && (
                  <Input
                    value={formData[field.label] || field.defaultValue || ""}
                    onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                    placeholder={field.placeholder}
                    className="mt-1"
                  />
                )}
                {field.type === "textarea" && (
                  <Textarea
                    value={formData[field.label] || field.defaultValue || ""}
                    onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                    placeholder={field.placeholder}
                    rows={3}
                    className="mt-1"
                  />
                )}
                {field.type === "dropdown" && (
                  <Select
                    value={formData[field.label] || field.defaultValue}
                    onValueChange={(v) => setFormData({ ...formData, [field.label]: v })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option: string, idx: number) => (
                        <SelectItem key={idx} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}

            <Button onClick={handleGenerate} className="w-full mt-6" disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </Card>

        {/* Output */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Output:</h3>
          {output ? (
            <div className="bg-muted rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm font-sans">{output}</pre>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">Fill out the form and click Generate to see output</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
