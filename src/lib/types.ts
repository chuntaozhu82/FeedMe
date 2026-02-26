export interface FeedItem {
  title: string
  link?: string
  pubDate?: string
  isoDate?: string
  content?: string
  contentSnippet?: string
  creator?: string
  summary?: string
  enclosure?: {
    url: string
    type: string
  }
}

export interface Feed {
  title: string
  description: string
  link: string
  items: FeedItem[]
}

export interface FeedData {
  sourceUrl: string
  title: string
  description: string
  link: string
  items: FeedItem[]
  lastUpdated: string
}

export interface RssSource {
  name: string
  url: string
  category: string
  isCustom?: boolean
  type?: 'rss' | 'weread'
  wereadId?: string
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  fontSize: 'small' | 'medium' | 'large' | 'xlarge'
  lineHeight: 'compact' | 'normal' | 'relaxed'
  backgroundColor: 'default' | 'sepia' | 'dark'
  readingMode: 'summary' | 'original'
  autoMarkRead: boolean
  showImages: boolean
}

export interface FavoriteItem {
  id: string
  feedItem: FeedItem
  sourceUrl: string
  sourceName: string
  category: string
  savedAt: string
  tags: string[]
  note?: string
}

export interface ReadingProgress {
  itemId: string
  sourceUrl: string
  scrollPosition: number
  lastReadAt: string
  isCompleted: boolean
}

export interface UserPreferences {
  frequentlyReadCategories: Record<string, number>
  readingHistory: ReadingHistoryItem[]
  preferredSources: string[]
}

export interface ReadingHistoryItem {
  itemId: string
  sourceUrl: string
  title: string
  readAt: string
  readDuration?: number
}

export interface Category {
  id: string
  name: string
  parentId?: string
  order: number
}

export interface Tag {
  id: string
  name: string
  color: string
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  fontSize: 'medium',
  lineHeight: 'normal',
  backgroundColor: 'default',
  readingMode: 'summary',
  autoMarkRead: false,
  showImages: true,
}

export const FONT_SIZE_MAP: Record<UserSettings['fontSize'], string> = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
  xlarge: 'text-xl',
}

export const LINE_HEIGHT_MAP: Record<UserSettings['lineHeight'], string> = {
  compact: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
}

export const BACKGROUND_COLOR_MAP: Record<UserSettings['backgroundColor'], string> = {
  default: '',
  sepia: 'bg-amber-50 dark:bg-amber-950',
  dark: 'bg-slate-900 dark:bg-slate-950',
}