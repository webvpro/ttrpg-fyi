declare module 'vanilla-cookieconsent' {
  interface CookieConsentConfig {
    autoClearCookies?: boolean
    guiOptions?: {
      consentModal?: {
        layout?: string
        position?: string
        flipButtons?: boolean
        equalWeightButtons?: boolean
      }
      preferencesModal?: {
        layout?: string
        position?: string
        flipButtons?: boolean
        equalWeightButtons?: boolean
      }
    }
    language?: {
      default: string
      translations: Record<string, any>
    }
    categories?: Record<string, {
      enabled: boolean
      readOnly?: boolean
      autoClear?: {
        cookies: Array<{
          name: string | RegExp
        }>
      }
    }>
  }

  export function run(config: CookieConsentConfig): void
  export function showPreferences(): void
  export function reset(clearCookies?: boolean): void
  export function acceptCategory(category: string): void
  export function rejectCategory(category: string): void
  export function acceptedCategory(category: string): boolean
  export function getConfig(key: string): any
}