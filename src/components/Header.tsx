import React from 'react'
import { ModeToggle } from './ThemeToggle'
import { Logo, EuroIcon, DollarIcon, CashIcon } from '../icons/icons'

interface NavItem {
	href: string
	label: string

	className?: string
	icon?: React.ComponentType
}

export default function Header() {
	const items: NavItem[] = [
		{
			href: '/',
			label: 'Convertir Dolares',

			icon: DollarIcon,
		},
		{
			href: '/euros',
			label: 'Convertir Euros',

			icon: EuroIcon,
		},
		{
			href: '/tasas',
			label: 'Otras Tasas',

			icon: CashIcon,
		},
	]

	return (
		<nav className='sticky top-3 z-10 flex items-center justify-between gap-8 rounded-full border px-3 py-1.5 backdrop-blur-lg md:top-2 mx-auto w-full max-w-3xl md:px-0 dark:border-secondary'>
			<div className='flex items-center gap-2'>
				<div className='ml-3 flex items-center gap-3'>
					<span>
						<a
							className='flex items-center gap-1 dark:text-white font-semibold'
							href='/'
						>
							<Logo />
							VeCambio
						</a>
					</span>
				</div>
				<div className='mx-auto items-center justify-center border border-transparent md:flex md:gap-1'>
					<nav className='relative z-10 flex max-w-max flex-1 items-center justify-center'>
						<div className='relative'>
							<ul className='group flex flex-1 list-none items-center justify-center space-x-1'>
								{items.map(item => (
									<li key={item.href}>
										{' '}
										<a
											className={`group w-max px-2 py-2  focus:text-neutral-800 focus:outline-none h-9  gap-1 text-neutral-500 ring-transparent ring-2 
                                            
                                            dark:text-white inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium transition focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 hover:text-neutral-900  dark:hover:text-neutral-50 group
                                            hover:scale-105
                                                ${item.className}`}
											href={item.href}
										>
											{item.icon && <item.icon />}
											<p className='md:block hidden'>{item.label}</p>
										</a>
									</li>
								))}
							</ul>
						</div>
					</nav>
				</div>
			</div>
			<div className=''>
				<ModeToggle />
			</div>
		</nav>
	)
}
