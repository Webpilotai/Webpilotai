import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Cpu, 
  Globe, 
  Brain, 
  Database,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react'

interface SystemStatusProps {
  isProcessing: boolean
  currentStep: string
  progress: number
}

export function SystemStatus({ isProcessing, currentStep, progress }: SystemStatusProps) {
  const systemComponents = [
    {
      name: 'Local LLM (Ollama)',
      status: 'online',
      icon: <Brain className="h-4 w-4" />,
      details: 'llama3:8b model loaded'
    },
    {
      name: 'Browser Engine',
      status: isProcessing ? 'active' : 'ready',
      icon: <Globe className="h-4 w-4" />,
      details: 'Playwright + Chrome Headless'
    },
    {
      name: 'Orchestration',
      status: isProcessing ? 'running' : 'idle',
      icon: <Cpu className="h-4 w-4" />,
      details: 'Node.js + LangChain'
    },
    {
      name: 'Data Storage',
      status: 'online',
      icon: <Database className="h-4 w-4" />,
      details: 'Session cache active'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'ready':
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case 'active':
      case 'running':
        return <Clock className="h-3 w-3 text-blue-500" />
      default:
        return <AlertCircle className="h-3 w-3 text-red-500" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'online':
      case 'ready':
        return 'default'
      case 'active':
      case 'running':
        return 'secondary'
      default:
        return 'destructive'
    }
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>System Status</h3>
          <Badge variant={isProcessing ? 'secondary' : 'default'}>
            {isProcessing ? 'Processing' : 'Ready'}
          </Badge>
        </div>

        <div className="space-y-3">
          {systemComponents.map((component) => (
            <div key={component.name} className="flex items-center justify-between p-2 rounded-lg border">
              <div className="flex items-center gap-2">
                {component.icon}
                <div>
                  <p className="text-sm">{component.name}</p>
                  <p className="text-xs text-muted-foreground">{component.details}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {getStatusIcon(component.status)}
                <Badge variant={getStatusVariant(component.status)} className="text-xs">
                  {component.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Current Step:</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">{currentStep}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="text-center">
            <p className="text-lg">2.3s</p>
            <p className="text-xs text-muted-foreground">Avg Response Time</p>
          </div>
          <div className="text-center">
            <p className="text-lg">15</p>
            <p className="text-xs text-muted-foreground">Commands Executed</p>
          </div>
        </div>
      </div>
    </Card>
  )
}