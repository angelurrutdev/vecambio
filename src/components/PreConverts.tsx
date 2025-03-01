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
			<section className='mb-3 overflow-hidden block rounded-xl items-center'>
				<div className='p-3   -mb-3 dark:bg-cuber-black bg-gray-200'>
					<p className='text-base text-left flex items-center'>
						{currencyInfo.Flag}
						<strong className='mx-2'>
							{currencyInfo.Currency} {formatNumber(mount)}
						</strong>
						{currencyInfo.CurrencyTitle}
					</p>
				</div>
				<Arrows />
				<div className=' p-3 -mt-3 dark:bg-cuber-black bg-gray-200'>
					<p className='text-base text-right flex items-center justify-end'>
						a Bolívares
						<strong className='mx-2'>
							Bs.S&nbsp;{formatNumber(convertedAmount)}
						</strong>
						<VenezuelaIcon />
					</p>
				</div>
			</section>

			<section className='mb-3 overflow-hidden block rounded-xl items-center'>
				<div className='p-3 -mb-3 dark:bg-cuber-black bg-gray-200'>
					<p className='text-base text-left flex items-center'>
						<VenezuelaIcon />
						<strong className='mx-2'>Bs.S&nbsp;{formatNumber(Bolivar)}</strong>
						Bolivares
					</p>
				</div>
				<Arrows />
				<div className=' p-3 -mt-3 dark:bg-cuber-black bg-gray-200'>
					<p className='text-base text-right flex items-center justify-end'>
						a {currencyInfo.CurrencyTitle}
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
