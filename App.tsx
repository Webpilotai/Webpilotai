import { useState, useEffect } from 'react'
import { CommandInput } from './components/CommandInput'
import { BrowserSimulator } from './components/BrowserSimulator'
import { ResultsDisplay } from './components/ResultsDisplay'
import { ActivityLog } from './components/ActivityLog'
import { SystemStatus } from './components/SystemStatus'
import { Card } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Bot, Settings, HelpCircle } from 'lucide-react'
import { Button } from './components/ui/button'

interface Result {
  id: string
  title: string
  description: string
  url: string
  price?: string
  rating?: number
  image?: string
}

interface LogEntry {
  id: string
  timestamp: Date
  type: 'planning' | 'navigation' | 'interaction' | 'extraction' | 'completion' | 'error'
  message: string
  details?: string
}

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState('')
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [currentQuery, setCurrentQuery] = useState('')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [resultStatus, setResultStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle')
  const [executionTime, setExecutionTime] = useState<number>()

  const addLog = (type: LogEntry['type'], message: string, details?: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type,
      message,
      details
    }
    setLogs(prev => [newLog, ...prev])
  }

  const simulateExecution = async (command: string) => {
    setIsProcessing(true)
    setResultStatus('processing')
    setCurrentQuery(command)
    setResults([])
    setProgress(0)
    
    const startTime = Date.now()

    // Step 1: Planning
    setCurrentStep('Analyzing command with LLM')
    addLog('planning', 'Parsing natural language command', command)
    await new Promise(resolve => setTimeout(resolve, 800))
    setProgress(20)

    // Step 2: Browser Navigation
    setCurrentStep('Launching browser and navigating to websites')
    addLog('navigation', 'Opening browser session', 'Chrome Headless initialized')
    await new Promise(resolve => setTimeout(resolve, 600))
    setProgress(40)

    // Determine target websites based on command
    const getTargetWebsites = (cmd: string) => {
      if (cmd.includes('laptop')) return ['amazon.com', 'bestbuy.com', 'newegg.com']
      if (cmd.includes('flight')) return ['expedia.com', 'kayak.com', 'google.com/flights']
      if (cmd.includes('iphone')) return ['apple.com', 'amazon.com', 'bestbuy.com']
      if (cmd.includes('restaurant')) return ['opentable.com', 'resy.com', 'yelp.com']
      if (cmd.includes('python') && cmd.includes('job')) return ['linkedin.com', 'indeed.com', 'glassdoor.com']
      return ['google.com']
    }
    
    const websites = getTargetWebsites(command.toLowerCase())
    addLog('navigation', `Navigating to ${websites[0]}`, `Visiting ${websites.length} websites for comparison`)
    await new Promise(resolve => setTimeout(resolve, 500))
    setProgress(60)

    // Step 3: Interaction
    setCurrentStep('Interacting with page elements')
    const getInteractionMessage = (cmd: string) => {
      if (cmd.includes('laptop')) return 'Filling search filters: price <$1000, sorting by rating'
      if (cmd.includes('flight')) return 'Entering dates: NYC to LA, selecting departure times'
      if (cmd.includes('iphone')) return 'Comparing iPhone 15 Pro prices across retailers'
      if (cmd.includes('restaurant')) return 'Setting location, cuisine type, and availability'
      if (cmd.includes('python') && cmd.includes('job')) return 'Applying job filters: Python, San Francisco, salary range'
      return 'Filling search forms with specified criteria'
    }
    addLog('interaction', getInteractionMessage(command.toLowerCase()), 'Automated form filling and filtering')
    await new Promise(resolve => setTimeout(resolve, 700))
    setProgress(80)

    // Step 4: Data extraction
    setCurrentStep('Extracting and structuring data')
    const getExtractionMessage = (cmd: string) => {
      if (cmd.includes('laptop')) return 'Extracting laptop specs, prices, and reviews'
      if (cmd.includes('flight')) return 'Collecting flight times, prices, and airline ratings'
      if (cmd.includes('iphone')) return 'Scraping iPhone prices from multiple retailers'
      if (cmd.includes('restaurant')) return 'Gathering restaurant details, ratings, and availability'
      if (cmd.includes('python') && cmd.includes('job')) return 'Extracting job details, salaries, and company info'
      return 'Scraping and parsing relevant data'
    }
    addLog('extraction', getExtractionMessage(command.toLowerCase()), 'Found 5 matching results')
    await new Promise(resolve => setTimeout(resolve, 600))
    setProgress(90)

    // Generate mock results based on command
    const mockResults = generateMockResults(command)
    setResults(mockResults)
    setProgress(100)

    const endTime = Date.now()
    const duration = (endTime - startTime) / 1000
    setExecutionTime(duration)

    addLog('completion', `Task completed successfully`, `Found ${mockResults.length} results in ${duration.toFixed(1)}s`)
    
    setIsProcessing(false)
    setResultStatus('completed')
    setCurrentStep('')
  }

  const generateMockResults = (command: string): Result[] => {
    const cmd = command.toLowerCase()
    
    if (cmd.includes('laptop') && cmd.includes('1000')) {
      return [
        {
          id: '1',
          title: 'ASUS VivoBook 15 OLED - Intel Core i5-13500H, 16GB RAM, 512GB SSD',
          description: '15.6" OLED display, excellent color accuracy, lightweight design. Perfect for productivity and content creation.',
          url: 'https://amazon.com/asus-vivobook-15-oled',
          price: '$899',
          rating: 4.6
        },
        {
          id: '2',
          title: 'Acer Swift 3 - AMD Ryzen 7 5700U, 8GB RAM, 512GB NVMe SSD',
          description: 'Ultra-portable with all-day battery life. Premium aluminum build with backlit keyboard.',
          url: 'https://bestbuy.com/acer-swift-3-ryzen7',
          price: '$749',
          rating: 4.4
        },
        {
          id: '3',
          title: 'HP Pavilion 15 - Intel Core i7-1255U, 16GB DDR4, 512GB SSD',
          description: 'Balanced performance laptop with numeric keypad. Great for students and professionals.',
          url: 'https://hp.com/pavilion-15-i7',
          price: '$849',
          rating: 4.3
        },
        {
          id: '4',
          title: 'Lenovo IdeaPad 3 Gaming - AMD Ryzen 5 5600H, GTX 1650, 8GB RAM',
          description: 'Entry-level gaming laptop with dedicated graphics. 120Hz display for smooth gaming.',
          url: 'https://lenovo.com/ideapad-3-gaming',
          price: '$699',
          rating: 4.2
        },
        {
          id: '5',
          title: 'MSI Modern 14 - Intel Core i5-1235U, 16GB LPDDR5, 512GB SSD',
          description: 'Business-focused ultrabook with military-grade durability. Carbon grey finish.',
          url: 'https://newegg.com/msi-modern-14-i5',
          price: '$799',
          rating: 4.5
        }
      ]
    }
    
    if (cmd.includes('flight') && (cmd.includes('nyc') || cmd.includes('new york')) && (cmd.includes('la') || cmd.includes('los angeles'))) {
      return [
        {
          id: '1',
          title: 'JetBlue Airways B6 423 - Nonstop',
          description: 'JFK to LAX • Dec 4, 8:30 AM - 11:45 AM PST • A321neo with Mint available',
          url: 'https://jetblue.com/book-flight-b6423',
          price: '$298',
          rating: 4.2
        },
        {
          id: '2',
          title: 'Delta Air Lines DL 1243 - Nonstop',
          description: 'LGA to LAX • Dec 4, 6:00 AM - 9:15 AM PST • Boeing 757-200 with WiFi',
          url: 'https://delta.com/book/dl1243',
          price: '$342',
          rating: 4.4
        },
        {
          id: '3',
          title: 'American Airlines AA 31 - Nonstop',
          description: 'JFK to LAX • Dec 4, 10:15 AM - 1:35 PM PST • Airbus A321T with lie-flat seats',
          url: 'https://aa.com/booking/aa31',
          price: '$389',
          rating: 4.1
        },
        {
          id: '4',
          title: 'United Airlines UA 1 - Nonstop',
          description: 'EWR to LAX • Dec 4, 7:05 AM - 10:20 AM PST • Boeing 757-200 with Premium Plus',
          url: 'https://united.com/book-ua1',
          price: '$356',
          rating: 4.0
        },
        {
          id: '5',
          title: 'Alaska Airlines AS 6 - Nonstop',
          description: 'JFK to LAX • Dec 4, 11:59 PM - 3:25 AM+1 PST • Red-eye flight, significant savings',
          url: 'https://alaskaair.com/book-as6',
          price: '$198',
          rating: 3.9
        }
      ]
    }
    
    if (cmd.includes('iphone') && cmd.includes('price')) {
      return [
        {
          id: '1',
          title: 'iPhone 15 Pro 128GB Natural Titanium - Apple Store',
          description: 'Official Apple pricing with trade-in options. Free shipping and AppleCare+ available.',
          url: 'https://apple.com/iphone-15-pro',
          price: '$999',
          rating: 4.8
        },
        {
          id: '2',
          title: 'iPhone 15 Pro 128GB Natural Titanium - Amazon',
          description: 'Unlocked for all carriers. Prime shipping available. 30-day return policy.',
          url: 'https://amazon.com/iphone-15-pro-128gb',
          price: '$949',
          rating: 4.6
        },
        {
          id: '3',
          title: 'iPhone 15 Pro 128GB Natural Titanium - Best Buy',
          description: 'Carrier deals available. Geek Squad setup included. Price match guarantee.',
          url: 'https://bestbuy.com/iphone-15-pro',
          price: '$999',
          rating: 4.5
        },
        {
          id: '4',
          title: 'iPhone 15 Pro 128GB Natural Titanium - Costco',
          description: 'Members get additional $100 off with activation. Includes accessories bundle.',
          url: 'https://costco.com/iphone-15-pro-deal',
          price: '$899',
          rating: 4.7
        },
        {
          id: '5',
          title: 'iPhone 15 Pro 128GB Natural Titanium - Verizon',
          description: 'Up to $1000 off with trade-in and unlimited plan. 5G network included.',
          url: 'https://verizon.com/iphone-15-pro-offer',
          price: '$599',
          rating: 4.3
        }
      ]
    }
    
    if (cmd.includes('italian') && cmd.includes('restaurant') && cmd.includes('table')) {
      return [
        {
          id: '1',
          title: 'Osteria Mozza - West Hollywood',
          description: 'Upscale Italian with house-made pasta. Celebrity chef Nancy Silverton. Reservations via OpenTable.',
          url: 'https://opentable.com/osteria-mozza',
          price: '$$$',
          rating: 4.6
        },
        {
          id: '2',
          title: 'Guelaguetza - Koreatown',
          description: 'Family-owned since 1994. Authentic Roman cuisine with wood-fired pizza. Available tonight 7:30 PM.',
          url: 'https://resy.com/guelaguetza-italian',
          price: '$$',
          rating: 4.5
        },
        {
          id: '3',
          title: 'Bestia - Arts District',
          description: 'Industrial-chic spot known for charcuterie and bone marrow. Busy atmosphere, book ahead.',
          url: 'https://opentable.com/bestia-la',
          price: '$$$',
          rating: 4.4
        },
        {
          id: '4',
          title: 'Republique - Mid-City',
          description: 'French-Italian bistro in historic building. Great for dates. Weekend brunch available.',
          url: 'https://resy.com/republique',
          price: '$$$',
          rating: 4.7
        },
        {
          id: '5',
          title: 'Pizzana - Brentwood',
          description: 'Neapolitan pizza with creative toppings. Casual dining, good for families. Walk-ins welcome.',
          url: 'https://pizzana.com/reservations',
          price: '$$',
          rating: 4.3
        }
      ]
    }
    
    if (cmd.includes('python') && cmd.includes('developer') && cmd.includes('san francisco')) {
      return [
        {
          id: '1',
          title: 'Senior Python Developer - Stripe',
          description: 'Build payment infrastructure at scale. 5+ years Python, Django/Flask. $180k-$250k + equity.',
          url: 'https://stripe.com/jobs/senior-python-dev',
          price: '$180k-$250k',
          rating: 4.8
        },
        {
          id: '2',
          title: 'Python Backend Engineer - Airbnb',
          description: 'Work on core platform services. Python, microservices, AWS. Remote-friendly. $160k-$220k.',
          url: 'https://airbnb.com/careers/python-backend',
          price: '$160k-$220k',
          rating: 4.6
        },
        {
          id: '3',
          title: 'Machine Learning Engineer - OpenAI',
          description: 'Build next-gen AI systems. Python, PyTorch, distributed computing. $200k-$300k + significant equity.',
          url: 'https://openai.com/jobs/ml-engineer',
          price: '$200k-$300k',
          rating: 4.9
        },
        {
          id: '4',
          title: 'Full Stack Python Developer - Uber',
          description: 'Rider/Driver platform development. Python, React, PostgreSQL. $150k-$200k + RSUs.',
          url: 'https://uber.com/careers/fullstack-python',
          price: '$150k-$200k',
          rating: 4.2
        },
        {
          id: '5',
          title: 'Python Data Engineer - Salesforce',
          description: 'Data pipeline architecture. Python, Spark, Snowflake. Great benefits. $140k-$190k.',
          url: 'https://salesforce.com/jobs/data-engineer-python',
          price: '$140k-$190k',
          rating: 4.4
        }
      ]
    }
    
    // Fallback for other commands
    return [
      {
        id: '1',
        title: 'Sample Result 1',
        description: 'This is a mock result based on your search query. Real results would be extracted from actual websites.',
        url: 'https://example.com/result-1',
        price: '$99',
        rating: 4.0
      },
      {
        id: '2',
        title: 'Sample Result 2',
        description: 'Another example result with relevant information from web scraping.',
        url: 'https://example.com/result-2',
        price: '$149',
        rating: 4.3
      }
    ]
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1>Web Navigator AI Agent</h1>
                <p className="text-muted-foreground">
                  Autonomous web browsing powered by LLM reasoning
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online
              </Badge>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Command Input */}
        <CommandInput onCommand={simulateExecution} isProcessing={isProcessing} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Browser and Results */}
          <div className="lg:col-span-2 space-y-6">
            <BrowserSimulator 
              currentAction={currentStep}
              isActive={isProcessing}
              progress={progress}
            />
            
            <ResultsDisplay 
              results={results}
              query={currentQuery}
              status={resultStatus}
              executionTime={executionTime}
            />
          </div>

          {/* Right Column - Status and Logs */}
          <div className="space-y-6">
            <SystemStatus 
              isProcessing={isProcessing}
              currentStep={currentStep}
              progress={progress}
            />
            
            <ActivityLog logs={logs} />
          </div>
        </div>

        {/* Footer */}
        <Card className="p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Powered by Ollama + LangChain + Playwright</p>
            <p>Demo Version - Full automation coming soon</p>
          </div>
        </Card>
      </div>
    </div>
  )
}