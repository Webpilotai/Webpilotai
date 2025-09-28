import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Send, Mic } from 'lucide-react'

interface CommandInputProps {
  onCommand: (command: string) => void
  isProcessing: boolean
}

export function CommandInput({ onCommand, isProcessing }: CommandInputProps) {
  const [command, setCommand] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim() && !isProcessing) {
      onCommand(command.trim())
      setCommand('')
    }
  }

  const exampleCommands = [
    "Search for laptops under $1000 and list top 5",
    "Find flight tickets from NYC to LA next week",
    "Compare iPhone prices on different websites",
    "Book a table at Italian restaurants near me",
    "Search for Python developer jobs in San Francisco"
  ]

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="mb-2">Give me a command</h3>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="e.g., Search for hotels in Paris under $200/night"
              className="flex-1"
              disabled={isProcessing}
            />
            <Button 
              type="submit" 
              disabled={!command.trim() || isProcessing}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline"
              disabled={isProcessing}
              className="shrink-0"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {exampleCommands.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setCommand(example)}
                disabled={isProcessing}
                className="text-xs"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}