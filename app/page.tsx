import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/header'

const routes = [
  { href: '/page1', label: 'Page 1', description: '示例页面 1' },
] as const

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-6 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            页面路由入口
          </h1>
          <p className="max-w-sm text-sm text-foreground/70">
            选择下方链接进入对应页面
          </p>
        </div>
        <nav className="flex flex-col gap-3" aria-label="页面导航">
          {routes.map(({ href, label, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-lg border border-border bg-card px-5 py-4 text-left transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <span className="font-medium text-foreground group-hover:text-primary">
                {label}
              </span>
              {description && (
                <span className="mt-0.5 text-sm text-muted-foreground">
                  {description}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8 text-center text-sm text-muted-foreground">
          <Link href="/api/test" className="hover:underline" target="_blank">
            API: /api/test
          </Link>
        </div>
      </main>
    </div>
  )
}
