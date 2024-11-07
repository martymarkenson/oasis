import { chromium, Browser, BrowserContext } from 'playwright';

interface ScrapeConfig {
  [key: string]: {
    selector: string;
    transform?: (value: string) => any;
    attribute?: string;
  };
}

export class BrowserService {
  private static instance: BrowserService;
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;

  private constructor() {}

  static getInstance(): BrowserService {
    if (!BrowserService.instance) {
      BrowserService.instance = new BrowserService();
    }
    return BrowserService.instance;
  }

  private async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      console.log('Launching new browser instance');
      this.browser = await chromium.launch({
        headless: true
      });
    }
    return this.browser;
  }

  private async getContext(): Promise<BrowserContext> {
    if (!this.context) {
      const browser = await this.getBrowser();
      this.context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
      });
    }
    return this.context;
  }

  async scrapeData(url: string, config: ScrapeConfig) {
    const context = await this.getContext();
    const page = await context.newPage();
    
    try {
      console.log('Navigating to URL:', url);
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });
      
      const results: { [key: string]: any } = {};
      
      for (const [key, { selector, transform, attribute }] of Object.entries(config)) {
        try {
          console.log(`Searching for selector: ${selector}`);
          await page.waitForSelector(selector, { timeout: 5000 });
          const element = await page.$(selector);
          
          if (element) {
            console.log(`Found element for ${key}`);
            let value;
            
            if (attribute) {
              value = await element.getAttribute(attribute);
            } else {
              value = await element.textContent();
            }
            
            console.log(`Raw value for ${key}:`, value);
            results[key] = transform ? transform(value || '') : value;
            console.log(`Transformed value for ${key}:`, results[key]);
          }
        } catch (error) {
          console.log(`Error finding selector ${selector}:`, error.message);
        }
      }
      
      return results;
    } finally {
      await page.close();
    }
  }

  async cleanup() {
    if (this.context) {
      await this.context.close();
      this.context = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
} 