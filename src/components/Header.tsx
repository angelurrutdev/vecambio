import React from 'react'
import { Logo, EuroIcon, DollarIcon, CashIcon } from '../icons/icons'
import Link from 'next/link'
import { ModeToggle } from './ThemeToggle'

interface HeaderProps {
	children?: React.ReactNode // 'children' ahora es opcional
}

function Header({ children }: HeaderProps) {
	return (
		<header className='border-b py-2 md:py-2 ring-white/40 dark:ring-white dark:border-b-white/40 border-b-white/20 px-2 text-dusky flex flex-row justify-between items-center'>
			<nav className='flex flex-row'>
				<Link href='/' className='flex'>
					<Logo />
					<span className='flex self-center whitespace-nowrap text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-50'>
						VeCambio
					</span>
				</Link>
				<ul className='flex flex-row items-center justify-center md:justify-between mx-4'>
					<li>
						<Link
							href='/'
							className='dark:text-white inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:hover:border-neutral-700/50 h-9 px-4 py-2 group'
						>
							<DollarIcon aria-hidden='true' />
							<span className='md:block hidden'>Convertir Dolares</span>
						</Link>
					</li>
					<li>
						<Link
							href='/euros'
							className=' mx-1 dark:text-white inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:hover:border-neutral-700/50 h-9 px-4 py-2 group'
						>
							<EuroIcon aria-hidden='true' />
							<span className='md:block hidden'>Convertir Euros</span>
						</Link>
					</li>
					<li>
						<Link
							href='/tasas'
							className=' dark:text-white inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:hover:border-neutral-700/50 h-9 px-4 py-2 group mr-[340px]'
						>
							<CashIcon aria-hidden='true' />
							<span className='md:block hidden'>Otras Tasas</span>
						</Link>
					</li>
				</ul>
			</nav>
			{children}
			<ModeToggle />
		</header>
	)
}

export default Header
