"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AppSettingsProps {
  settings: {
    model: string
    temperature: number
    topP: number
    frequencyPenalty: number
    presencePenalty: number
  }
  onChange: (settings: any) => void
  onNext: () => void
}

export default function AppSettings({ settings, onChange, onNext }: AppSettingsProps) {
  const updateSetting = (key: string, value: any) => {
    onChange({ ...settings, [key]: value })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6">App Settings</h2>

        <div className="space-y-8">
          <div>
            <Label className="text-lg font-semibold">ChatGPT Models</Label>
            <Select value={settings.model} onValueChange={(v) => updateSetting("model", v)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT 3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4">GPT 4</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT 4 Turbo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-lg font-semibold">Temperature</Label>
              <span className="text-sm font-medium">{settings.temperature}</span>
            </div>
            <Slider
              value={[settings.temperature]}
              onValueChange={(v) => updateSetting("temperature", v[0])}
              min={0}
              max={2}
              step={0.1}
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-lg font-semibold">Top P</Label>
              <span className="text-sm font-medium">{settings.topP}</span>
            </div>
            <Slider
              value={[settings.topP]}
              onValueChange={(v) => updateSetting("topP", v[0])}
              min={0}
              max={1}
              step={0.1}
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-lg font-semibold">Frequency penalty</Label>
              <span className="text-sm font-medium">{settings.frequencyPenalty}</span>
            </div>
            <Slider
              value={[settings.frequencyPenalty]}
              onValueChange={(v) => updateSetting("frequencyPenalty", v[0])}
              min={0}
              max={2}
              step={0.1}
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-lg font-semibold">Presence penalty</Label>
              <span className="text-sm font-medium">{settings.presencePenalty}</span>
            </div>
            <Slider
              value={[settings.presencePenalty]}
              onValueChange={(v) => updateSetting("presencePenalty", v[0])}
              min={0}
              max={2}
              step={0.1}
              className="mt-2"
            />
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-6">
              Kindly refrain from sharing confidential business data, including customer, product, or employee
              information with ChatGPT during exercises to ensure the security of sensitive data at all times.
            </p>

            <Button onClick={onNext} size="lg">
              Review app
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
