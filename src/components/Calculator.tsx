'use client'
import { useState } from 'react'
import { PillMount } from './PillMount'
import { Container } from './SectionContainer'
import { CopyButton } from './CopyButton'
import { UnitedStatesIcon, VenezuelaIcon } from '@/icons/icons'
import Link from 'next/link'
import { InputContainer } from './InputContainer'

/* Definición de las props que recibirá el componente. 
   Puedes ajustar los tipos según la estructura exacta de los datos */
type CalculatorProps = {
	setCurrencyDollar: {
		monitors: {
			bcv: {
				last_update: string
				price: string
			}
		}
	}
	rawTasaEnparalelo: string
	rawTasaCentral: string
}

// Función para parsear la tasa (BCV/Paralelo)
function parseRate(val: string): number {
	if (typeof val === 'number') return val
	if (typeof val === 'string') {
		const replaced = val.replace(',', '.')
		const parsed = parseFloat(replaced)
		return isNaN(parsed) ? 0 : parsed
	}
	return 0
}

export default function Calculator({
	setCurrencyDollar,
	rawTasaEnparalelo,
	rawTasaCentral,
}: CalculatorProps) {
	// Convertimos las tasas a number
	const tasaEnparalelo = parseRate(rawTasaEnparalelo)
	const tasaCentral = parseRate(rawTasaCentral)

	// Estados
	const [selectedRate, setSelectedRate] = useState<number>(tasaCentral)
	const [usdValue, setUsdValue] = useState<string>('')
	const [vesValue, setVesValue] = useState<string>('')

	// Estado para mostrar el resultado de la conversión.
	const [conversionResult, setConversionResult] = useState<string>(
		`Bs.S ${selectedRate}`,
	)

	// Cambia la tasa seleccionada y recalcula la conversión sin borrar los inputs
	const handleSelectRate = (rate: number) => {
		setSelectedRate(rate)

		if (usdValue.trim() !== '') {
			const num = parseFormattedCurrency(usdValue, '.', ',')
			if (!isNaN(num)) {
				const result = num * rate
				const formatted = new Intl.NumberFormat('es-VE', {
					style: 'currency',
					currency: 'VES',
				}).format(result)
				setConversionResult(formatted)
			}
		} else if (vesValue.trim() !== '') {
			const num = parseFormattedCurrency(vesValue, ',', '.')
			if (!isNaN(num) && rate !== 0) {
				const result = num / rate
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(result)
				setConversionResult(formatted)
			}
		} else {
			setConversionResult(`Bs.S ${rate}`)
		}
	}

	// --------------------
	// 1. Input de USD
	// --------------------
	const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value
		// Formateamos para que "." sea decimal y "," miles
		const formattedValue = formatCurrencyInput(rawValue, '.', ',')
		setUsdValue(formattedValue)
		setVesValue('')

		if (rawValue.trim() === '') {
			setConversionResult(`Bs.S ${selectedRate}`)
			return
		}

		const num = parseFormattedCurrency(formattedValue, '.', ',')
		if (!isNaN(num) && !isNaN(selectedRate)) {
			const result = num * selectedRate
			const formatted = new Intl.NumberFormat('es-VE', {
				style: 'currency',
				currency: 'VES',
			}).format(result)
			setConversionResult(formatted)
		} else {
			setConversionResult(`Bs.S ${selectedRate}`)
		}
	}

	// --------------------
	// 2. Input de VES
	// --------------------
	const handleVesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value
		// Formateamos para que "," sea decimal y "." miles
		const formattedValue = formatCurrencyInput(rawValue, ',', '.')
		setVesValue(formattedValue)
		setUsdValue('')

		if (rawValue.trim() === '') {
			setConversionResult(`Bs.S ${selectedRate}`)
			return
		}

		const num = parseFormattedCurrency(formattedValue, ',', '.')
		if (!isNaN(num) && !isNaN(selectedRate) && selectedRate !== 0) {
			const result = num / selectedRate
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(result)
			setConversionResult(formatted)
		} else {
			setConversionResult(`Bs.S ${selectedRate}`)
		}
	}

	// ---------------------------------------------------------
	// Helpers para formatear y parsear valores de entrada
	// ---------------------------------------------------------

	function formatCurrencyInput(
		inputValue: string,
		decimal: string,
		thousands: string,
	): string {
		// Eliminar todo lo que no sean dígitos
		const cleanedValue = inputValue.replace(/[^0-9]/g, '')
		if (cleanedValue === '') {
			return '0' + decimal + '00'
		}

		// Se asume que los dos últimos dígitos son los centavos
		const amount = cleanedValue.length > 2 ? cleanedValue.slice(0, -2) : '0'
		const cents =
			cleanedValue.length > 2
				? cleanedValue.slice(-2)
				: cleanedValue.padStart(2, '0')

		const integerPart = removeLeadingZeros(amount)
		const formattedAmount = addThousandSeparators(integerPart, thousands)

		return `${formattedAmount}${decimal}${cents}`
	}

	function removeLeadingZeros(cadena: string): string {
		return String(parseInt(cadena, 10))
	}

	function addThousandSeparators(numberStr: string, thousands: string): string {
		return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, thousands)
	}

	function parseFormattedCurrency(
		formatted: string,
		decimal: string,
		thousands: string,
	): number {
		let normalized = formatted.replace(new RegExp(`\\${thousands}`, 'g'), '')
		if (decimal !== '.') {
			normalized = normalized.replace(decimal, '.')
		}
		return parseFloat(normalized)
	}

	return (
		<Container>
			<div className='flex flex-col gap-1 z-[1]'>
				<h3 className='text-2xl font-bold'>Calculadora</h3>
				<h1 className='md:text-base text-sm opacity-70'>
					Convierte USD a VES al BCV o Paralelo a la tasa del día.
				</h1>
			</div>

			<section className='flex justify-center mt-2'>
				<ul className='grid grid-cols-2 rounded-lg gap-x-2'>
					<PillMount
						id='BCV'
						value={tasaCentral}
						name='BCV'
						title='BCV'
						onClick={() => handleSelectRate(tasaCentral)}
					/>
					<PillMount
						id='Paralelo'
						value={tasaEnparalelo}
						name='Paralelo'
						title='Paralelo'
						onClick={() => handleSelectRate(tasaEnparalelo)}
					/>
				</ul>
			</section>

			<article className='text-center text-accent md:my-2 my-3 items-center flex flex-col'>
				<p
					className='text-5xl md:text-6xl font-semibold text-primario'
					id='mount'
				>
					{conversionResult}
				</p>
				<p className='text-neutral-500 px-9 py-1 my-3 max-w-72 text-xs'>
					Última actualización <br />
					<strong className='font-mono'>
						{setCurrencyDollar.monitors.bcv.last_update}
					</strong>
				</p>
				<CopyButton id='mount' />
			</article>

			<form className='dark:bg-tertiary bg-secondary-white border-t dark:border-t-secondary border-t-primary-white grid grid-cols-1 md:grid-cols-2 gap-x-9 px-7 py-5 items-center'>
				<InputContainer
					className='pl-10'
					for_currency={'dolares'}
					icon={<UnitedStatesIcon />}
					label_currency={'$'}
					placeholder_input={'1.00'}
					value={usdValue}
					label_title='Dolares'
					handleChange={handleUsdChange}
				/>

				<InputContainer
					className='pl-20'
					for_currency='bolivares'
					icon={<VenezuelaIcon />}
					label_currency='Bs.S'
					placeholder_input={String(setCurrencyDollar.monitors.bcv.price)}
					value={vesValue}
					label_title='Bolívares'
					handleChange={handleVesChange}
				/>
			</form>

			<p className='text-neutral-400 text-sm text-center'>
				Usamos la tasa del{' '}
				<Link
					href='https://www.bcv.org.ve/'
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-500 underline'
				>
					BCV
				</Link>{' '}
				para nuestra calculadora. Esta información es solo para fines
				informativos.
			</p>
		</Container>
	)
}
