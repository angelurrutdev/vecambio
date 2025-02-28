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
			href: '/tasas-de-cambio-promedio-hoy',
			label: 'Convertir Euros',
			icon: EuroIcon,
		},
		{ href: '/bancos', label: 'Otras Tasas', icon: CashIcon },
	]

	return (
		<nav className='sticky top-3 z-10 flex items-center justify-between gap-8 rounded-full border px-3 py-1.5 backdrop-blur-lg bg-secondary-white/25 dark:bg-primary/25 md:top-2 mx-auto w-full max-w-3xl md:px-0 dark:border-secondary'>
			<div className='flex items-center gap-6'>
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
									<li>
										<a
											className={`group inline-flex w-max items-center justify-center px-2 py-2 text-sm font-medium transition-colors hover:text-neutral-800 focus:bg-accent focus:text-neutral-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 h-9 rounded-full bg-transparent hover:bg-accent/50 gap-1 text-neutral-500 ring-transparent ring-2 dark:text-white ${item.className}`}
											href={item.href}
										>
											{item.icon && <item.icon />}
											{item.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					</nav>
				</div>
			</div>
			<div className='px-3'>
				<ModeToggle />
			</div>
		</nav>
	)
}
