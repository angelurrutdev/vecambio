import type { Metadata, Viewport } from 'next'

// Styles:
import '@styles/globals.css'

// Providers:
import { ThemeProvider } from '@/components/ThemeProvider'

// Fonts:
import localFont from 'next/font/local'
import Footer from '@/components/Footer'

const interVariable = localFont({
	variable: '--font-sans',
	src: '../fonts/InterVariable.woff2',
	weight: '100 900',
	display: 'swap',
	preload: true,
})

const geistMonoVariable = localFont({
	variable: '--font-geist-mono',
	src: '../fonts/GeistMonoVF.woff2',
	weight: '100 900',
	display: 'swap',
	preload: true,
})

// Metadata:
export const metadata: Metadata = {
	metadataBase: new URL('https://vecambio.vercel.app'),
	title: {
		default:
			'VeCambio - Dolar Oficial BCV Paralelo a la tasa del día | Cambia tus dólares a bolivares y viceversa en tiempo real',
		template: '%v - VeCambio',
	},
	manifest: '/manifest.json',
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/images/logo_png.png',
		},
		{
			rel: 'icon',
			type: 'image/svg+xml',
			sizes: 'any',
			url: '/images/logo_svg.svg',
		},
		{
			rel: 'apple-touch-icon',
			type: 'image/png',
			sizes: '180x180',
			url: '/images/apple-touch-icon.png',
		},
	],
	description: 'Dolar Oficial BCV Paralelo a la tasa del día',
	openGraph: {
		title: 'VeCambio',
		description: 'Dolar Oficial BCV Paralelo a la tasa del día',
		url: 'https://VeCambio.vercel.app/images/og_image.png', // Ensure this path is correct
		siteName: 'VeCambio - Dolar Oficial BCV Paralelo a la tasa del día',
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		title: 'VeCambio - Dolar Oficial BCV Paralelo a la tasa del día',
		card: 'summary_large_image',
	},
}

// Viewport:
export const viewport: Viewport = {
	themeColor: '#171717',
}

// App layout:
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='es'>
			<body
				className={`font-sans ${interVariable.variable} ${geistMonoVariable.variable} antialiased bg-white dark:bg-neutral-900 selection:bg-neutral-200 dark:selection:bg-neutral-700`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
