import { Suspense } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { RssFeed } from '@/components/rss-feed';
import { SourceSwitcher } from '@/components/source-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SmartRecommendations } from '@/components/smart-recommendations';
import { defaultSource, config } from '@/config/rss-config';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RssSource } from '@/lib/types';
import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from '@/hooks/use-navigation';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <main className="min-h-screen bg-background">
        <div className="container py-10 mx-auto max-w-4xl">
          <Header />
          <SourceSwitcherWrapper />
          <FeedContent />
        </div>

        <footer className="border-t border-border">
          <div className="container mx-auto max-w-4xl py-6">
            <p className="text-center text-sm text-muted-foreground">Stay hungry. 😋</p>
          </div>
        </footer>
        <ScrollToTop />
      </main>
    </ThemeProvider>
  );
}

function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <a href="./" className="text-4xl font-bold hover:text-primary transition-colors">
        😋FeedMe
      </a>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <a
          href="https://github.com/Seanium/feedme"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 仓库"
        >
          <Button variant="outline" size="icon" className="relative">
            <Github className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">GitHub 仓库</span>
          </Button>
        </a>
      </div>
    </div>
  );
}

function SourceSwitcherWrapper() {
  return (
    <div className="mb-8">
      <Suspense fallback={<div className="w-full md:w-[300px] h-10 bg-muted rounded-md animate-pulse" />}>
        <SourceSwitcher />
      </Suspense>
    </div>
  );
}

function FeedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSourceSelect = useCallback((source: RssSource) => {
    const params = new URLSearchParams(searchParams);
    params.set("source", source.url);
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?${params.toString()}`);
    setRefreshKey(prev => prev + 1);
  }, [router, searchParams]);

  return (
    <>
      <Suspense fallback={null}>
        <SmartRecommendations onSourceSelect={handleSourceSelect} />
      </Suspense>
      
      <Suspense fallback={<FeedSkeleton />}>
        <RssFeed key={refreshKey} defaultSource={defaultSource.url} />
      </Suspense>
    </>
  );
}

function FeedSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6 space-y-4 feed-card">
          <div className="h-7 bg-muted rounded-md animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded-md animate-pulse w-1/2" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded-md animate-pulse w-full" />
            <div className="h-4 bg-muted rounded-md animate-pulse w-full" />
            <div className="h-4 bg-muted rounded-md animate-pulse w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;