import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Globe, Lock, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

interface BrowserSimulatorProps {
  currentAction: string
  isActive: boolean
  progress: number
}

export function BrowserSimulator({ currentAction, isActive, progress }: BrowserSimulatorProps) {
  const [currentUrl, setCurrentUrl] = useState('https://google.com')
  const [pageContent, setPageContent] = useState('Google Search')

  useEffect(() => {
    if (isActive && currentAction) {
      // Simulate different websites based on the action
      if (currentAction.includes('search')) {
        setCurrentUrl('https://google.com/search?q=...')
        setPageContent('Google Search Results')
      } else if (currentAction.includes('navigate')) {
        setCurrentUrl('https://example-shop.com')
        setPageContent('E-commerce Website')
      } else if (currentAction.includes('extract')) {
        setCurrentUrl('https://example-site.com/products')
        setPageContent('Product Listings')
      }
    }
  }, [currentAction, isActive])

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Browser Automation</h3>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? 'Active' : 'Idle'}
          </Badge>
        </div>

        {/* Browser Controls */}
        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
          <Button variant="ghost" size="sm" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" disabled>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" disabled>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex items-center gap-2 bg-background px-3 py-1 rounded border">
            <Lock className="h-3 w-3 text-green-600" />
            <span className="text-sm text-muted-foreground">{currentUrl}</span>
          </div>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Progress Bar */}
        {isActive && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Action:</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-blue-600">{currentAction}</p>
          </div>
        )}

        {/* Simulated Page Content */}
        <div className="bg-background border rounded-lg p-4 min-h-[200px]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <span className="text-sm">{pageContent}</span>
            </div>
            
            {pageContent === 'Google Search Results' && (
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted/50 rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
                <div className="h-3 bg-muted/50 rounded w-1/3"></div>
              </div>
            )}

            {pageContent === 'E-commerce Website' && (
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted rounded h-20"></div>
                <div className="bg-muted rounded h-20"></div>
                <div className="bg-muted rounded h-20"></div>
                <div className="bg-muted rounded h-20"></div>
              </div>
            )}

            {pageContent === 'Product Listings' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-green-200 rounded w-16"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-green-200 rounded w-16"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-green-200 rounded w-16"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}