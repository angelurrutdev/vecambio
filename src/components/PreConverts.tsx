'use client'
import {
	Arrows,
	SpainIcon,
	UnitedStatesIcon,
	VenezuelaIcon,
} from '@/icons/icons'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'

interface PreConvertsProps {
	mountConvert: number
	mount: number
	BolivarMount: number
	Bolivar: number
}

export default function PreConverts({
	mountConvert: initialMountConvert,
	mount,
	BolivarMount,
	Bolivar,
}: PreConvertsProps) {
	const pathname = usePathname()

	const currencyInfo = useMemo(() => {
		if (pathname === '/euros') {
			return {
				Flag: <SpainIcon />,
				Currency: '€',
				CurrencyTitle: 'Euros',
			}
		}
		return {
			Flag: <UnitedStatesIcon />,
			Currency: '$',
			CurrencyTitle: 'Dolares',
		}
	}, [pathname])

	const [convertedAmount, setConvertedAmount] = useState(
		mount * initialMountConvert,
	)
	const [divisionResult, setDivisionResult] = useState(0) // Nuevo estado para la división

	useEffect(() => {
		if (mount && initialMountConvert) {
			setConvertedAmount(mount * initialMountConvert)
		}
	}, [mount, initialMountConvert])

	useEffect(() => {
		if (BolivarMount !== 0) {
			setDivisionResult(Bolivar / BolivarMount)
		} else {
			setDivisionResult(0) // Manejo de división por cero
		}
	}, [Bolivar, BolivarMount])

	const formatNumber = (number: number | undefined) => {
		if (typeof number !== 'number') {
			return '0.00' // O algún otro valor por defecto
		}
		return number.toLocaleString('es-VE', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})
	}

	return (
		<article className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 text-primary-white gap-3 mt-4'>
			<section className='dark:border-secondary mb-3 border-gray-200 dark:text-primary-white text-primary border overflow-hidden block rounded-xl items-center'>
				<div className='p-3 dark:border-secondary border-gray-200 border-b -mb-3'>
					<p className='text-base text-left flex items-center'>
						{currencyInfo.Flag}
						<strong className='mx-2'>
							{currencyInfo.Currency} {formatNumber(mount)}
						</strong>
						{currencyInfo.CurrencyTitle}
					</p>
				</div>
				<Arrows />
				<div className='dark:bg-tertiary bg-secondary-white p-3 -mt-3'>
					<p className='text-base text-right flex items-center justify-end'>
						a Bolívares son{' '}
						<strong className='mx-2'>
							Bs.S&nbsp;{formatNumber(convertedAmount)}
						</strong>
						<VenezuelaIcon />
					</p>
				</div>
			</section>

			<section className='dark:border-secondary mb-3 border-gray-200 dark:text-primary-white text-primary border overflow-hidden block rounded-xl items-center'>
				<div className='p-3 dark:border-secondary border-gray-200 border-b -mb-3'>
					<p className='text-base text-left flex items-center'>
						<VenezuelaIcon />
						<strong className='mx-2'>Bs.S&nbsp;{formatNumber(Bolivar)}</strong>
						Bolivares
					</p>
				</div>
				<Arrows />
				<div className='dark:bg-tertiary bg-secondary-white p-3 -mt-3'>
					<p className='text-base text-right flex items-center justify-end'>
						a {currencyInfo.CurrencyTitle} son{' '}
						<strong className='mx-2'>
							{currencyInfo.Currency} {formatNumber(divisionResult)}
						</strong>
						{currencyInfo.Flag}
					</p>
				</div>
			</section>
		</article>
	)
}
