import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { 
  Brain, 
  Globe, 
  Search, 
  MousePointer, 
  Download, 
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react'

interface LogEntry {
  id: string
  timestamp: Date
  type: 'planning' | 'navigation' | 'interaction' | 'extraction' | 'completion' | 'error'
  message: string
  details?: string
}

interface ActivityLogProps {
  logs: LogEntry[]
}

export function ActivityLog({ logs }: ActivityLogProps) {
  const getIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'planning':
        return <Brain className="h-4 w-4 text-purple-500" />
      case 'navigation':
        return <Globe className="h-4 w-4 text-blue-500" />
      case 'interaction':
        return <MousePointer className="h-4 w-4 text-orange-500" />
      case 'extraction':
        return <Download className="h-4 w-4 text-green-500" />
      case 'completion':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getBadgeVariant = (type: LogEntry['type']) => {
    switch (type) {
      case 'completion':
        return 'default'
      case 'error':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Activity Log</h3>
          <Badge variant="outline">
            {logs.length} entries
          </Badge>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No activity yet</p>
                <p className="text-sm">Logs will appear here when you run a command</p>
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon(log.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm truncate">{log.message}</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={getBadgeVariant(log.type)} className="text-xs">
                          {log.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(log.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    {log.details && (
                      <p className="text-xs text-muted-foreground">
                        {log.details}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </Card>
  )
}