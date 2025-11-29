"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormBuilder from "@/components/form-builder"
import PromptSettings from "@/components/prompt-settings"
import AppSettings from "@/components/app-settings"
import AppPreview from "@/components/app-preview"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [appName, setAppName] = useState("")
  const [formFields, setFormFields] = useState<any[]>([])
  const [promptTemplate, setPromptTemplate] = useState("")
  const [appSettings, setAppSettings] = useState({
    model: "gpt-3.5-turbo",
    temperature: 1,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold text-lg">AI</span>
              </div>
              <div className="border-l border-border pl-2">
                <span className="text-sm font-medium text-muted-foreground">BUSINESS SCHOOL</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary">
                Train
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary">
                Apply
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary">
                Create
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary">
                Innovate
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary">
                Cockpit
              </a>
            </nav>
            <Button variant="ghost" size="sm">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My profile
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Simple AI App Creator</h1>
          <p className="text-lg text-muted-foreground">Create your own use cases and simple AI apps.</p>
        </div>

        <Tabs value={`step-${currentStep}`} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="step-1" onClick={() => setCurrentStep(1)}>
              1. Name App
            </TabsTrigger>
            <TabsTrigger value="step-2" onClick={() => setCurrentStep(2)}>
              2. Build Form
            </TabsTrigger>
            <TabsTrigger value="step-3" onClick={() => setCurrentStep(3)}>
              3. Configure Prompt
            </TabsTrigger>
            <TabsTrigger value="step-4" onClick={() => setCurrentStep(4)}>
              4. Settings
            </TabsTrigger>
            <TabsTrigger value="step-5" onClick={() => setCurrentStep(5)}>
              5. Preview & Create
            </TabsTrigger>
          </TabsList>

          <TabsContent value="step-1">
            <Card className="p-8">
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <Label htmlFor="appName" className="text-lg font-semibold">
                    Name of the use case app
                  </Label>
                  <Input
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="e.g., Customer care email generator"
                    className="mt-2 text-lg"
                  />
                </div>
                <Button onClick={() => setCurrentStep(2)} size="lg" disabled={!appName}>
                  Next: Define Input Parameters
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="step-2">
            <FormBuilder fields={formFields} onChange={setFormFields} onNext={() => setCurrentStep(3)} />
          </TabsContent>

          <TabsContent value="step-3">
            <PromptSettings
              fields={formFields}
              promptTemplate={promptTemplate}
              onChange={setPromptTemplate}
              onNext={() => setCurrentStep(4)}
            />
          </TabsContent>

          <TabsContent value="step-4">
            <AppSettings settings={appSettings} onChange={setAppSettings} onNext={() => setCurrentStep(5)} />
          </TabsContent>

          <TabsContent value="step-5">
            <AppPreview appName={appName} fields={formFields} promptTemplate={promptTemplate} settings={appSettings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
