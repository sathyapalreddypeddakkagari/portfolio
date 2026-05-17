import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { assetPath } from '@/lib/assetPath'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

// Update this to your final custom domain when DNS is live.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sathyapal.dev'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Sathyapal Reddy — Data Analytics | AI Research',
  description:
    'MS Data Analytics Engineering candidate at George Mason University (GPA 3.96). Specializing in AI/ML, NLP, RAG systems, and cloud-scale data engineering. Open to research opportunities.',
  keywords: [
    'Data Analytics', 'Machine Learning', 'NLP', 'LLM', 'RAG',
    'George Mason University', 'Data Engineer', 'AI Research',
    'Python', 'LangChain', 'BERT', 'LightGBM',
  ],
  authors: [{ name: 'Sathyapal Reddy Peddakkagari' }],
  icons: { icon: assetPath('/logo.png'), apple: assetPath('/logo.png') },
  openGraph: {
    title: 'Sathyapal Reddy — Data Analytics | AI Research',
    description: 'MS Data Analytics Engineering | GMU | GPA 3.96 | Open to Research Opportunities',
    type: 'website',
    images: [assetPath('/logo.png')],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sathyapal Reddy — Data Analytics | AI Research',
    description: 'MS Data Analytics Engineering | GMU | GPA 3.96 | Open to Research',
    images: [assetPath('/logo.png')],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFC' },
    { media: '(prefers-color-scheme: dark)',  color: '#060608' },
  ],
}

// Set theme before hydration to prevent FOUC.
const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = 'dark';
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch(e) { document.documentElement.classList.add('dark'); }
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className="bg-bg text-primary font-sans antialiased overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
