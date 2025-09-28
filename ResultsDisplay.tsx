import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'

interface Result {
  id: string
  title: string
  description: string
  url: string
  price?: string
  rating?: number
  image?: string
}

interface ResultsDisplayProps {
  results: Result[]
  query: string
  status: 'idle' | 'processing' | 'completed' | 'error'
  executionTime?: number
}

export function ResultsDisplay({ results, query, status, executionTime }: ResultsDisplayProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'processing':
        return 'Processing...'
      case 'completed':
        return 'Completed'
      case 'error':
        return 'Error occurred'
      default:
        return 'Ready'
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Results</h3>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge variant={status === 'completed' ? 'default' : status === 'error' ? 'destructive' : 'secondary'}>
              {getStatusText()}
            </Badge>
          </div>
        </div>

        {query && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="text-muted-foreground">Query:</span> {query}
            </p>
            {executionTime && (
              <p className="text-xs text-muted-foreground mt-1">
                Completed in {executionTime}s
              </p>
            )}
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Found {results.length} results
            </p>
            
            <div className="space-y-3">
              {results.map((result, index) => (
                <Card key={result.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm">{index + 1}</span>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="line-clamp-2">{result.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                        
                        {result.price && (
                          <Badge variant="secondary" className="shrink-0">
                            {result.price}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {result.rating && (
                            <div className="flex items-center gap-1">
                              <span className="text-sm">★</span>
                              <span className="text-sm">{result.rating}</span>
                            </div>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {new URL(result.url).hostname}
                          </span>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {status === 'idle' && results.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Enter a command above to see results here</p>
          </div>
        )}
      </div>
    </Card>
  )
}