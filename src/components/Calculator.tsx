'use client'
import { useState } from 'react'
import { tasa_dolar } from '@/lib/tasas'
import { PillMount } from './PillMount'
import { Container } from './SectionContainer'
import { CopyButton } from './CopyButton'
import { getCurrency } from '@/lib/index'
import { UnitedStatesIcon, VenezuelaIcon } from '@/icons/icons'
import Link from 'next/link'

// Obtención de tasas y moneda
const setCurrencyDollar = await getCurrency('dollar')
const rawTasaEnparalelo = await tasa_dolar('enparalelovzla')
const rawTasaCentral = await tasa_dolar('bcv')

// Función para parsear la tasa a número (BCV/Paralelo)
function parseRate(val: string): number {
	if (typeof val === 'number') return val
	if (typeof val === 'string') {
		const replaced = val.replace(',', '.')
		const parsed = parseFloat(replaced)
		return isNaN(parsed) ? 0 : parsed
	}
	return 0
}

// Convertimos las tasas a number
const tasaEnparalelo = parseRate(rawTasaEnparalelo) // p.e. 76.97
const tasaCentral = parseRate(rawTasaCentral) // p.e. 61.82

// ---------------------------------------------------------
// 1. Helpers para formatear el valor que ingresa el usuario
// ---------------------------------------------------------

/**
 * Formatea un valor numérico ingresado como string.
 * - Elimina todo lo que no sea dígito.
 * - Asume que los dos últimos dígitos son centavos.
 * - Agrega separadores de miles a la parte entera.
 * @param inputValue   Valor ingresado.
 * @param decimal      Carácter que se usará como separador decimal ('.' ó ',').
 * @param thousands    Carácter que se usará como separador de miles (',' ó '.').
 */
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
	// Si cleanedValue es '5', por ejemplo, lo interpretamos como 0.05
	const cents =
		cleanedValue.length > 2
			? cleanedValue.slice(-2)
			: cleanedValue.padStart(2, '0')

	const integerPart = removeLeadingZeros(amount)
	const formattedAmount = addThousandSeparators(integerPart, thousands)

	return `${formattedAmount}${decimal}${cents}`
}

/** Elimina ceros a la izquierda convirtiendo a número y de vuelta a string */
function removeLeadingZeros(cadena: string): string {
	return String(parseInt(cadena, 10))
}

/**
 * Inserta el carácter `thousands` como separador de miles.
 * Por ejemplo, si thousands = ',', convierte "1234" en "1,234".
 */
function addThousandSeparators(numberStr: string, thousands: string): string {
	return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, thousands)
}

/**
 * Convierte un string formateado a número flotante.
 * - Remueve los separadores de miles.
 * - Convierte el separador decimal a '.' para poder usar parseFloat.
 */
function parseFormattedCurrency(
	formatted: string,
	decimal: string,
	thousands: string,
): number {
	// Primero removemos los separadores de miles
	let normalized = formatted.replace(new RegExp(`\\${thousands}`, 'g'), '')
	// Luego, si el separador decimal no es '.', lo convertimos
	if (decimal !== '.') {
		normalized = normalized.replace(decimal, '.')
	}
	return parseFloat(normalized)
}

// ---------------------
// Componente Calculator
// ---------------------
export function Calculator() {
	// Estados
	const [selectedRate, setSelectedRate] = useState<number>(tasaCentral)
	const [usdValue, setUsdValue] = useState<string>('')
	const [vesValue, setVesValue] = useState<string>('')

	// Estado para mostrar el resultado de la conversión.
	// Si no hay nada ingresado, mostramos la tasa actual por defecto.
	const [conversionResult, setConversionResult] = useState<string>(
		`Bs.S ${selectedRate}`,
	)

	// Cambia la tasa seleccionada y recalcula la conversión sin borrar los inputs
	const handleSelectRate = (rate: number) => {
		setSelectedRate(rate)

		// Si el input de USD tiene contenido, se convierte de USD a VES
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
		}
		// Si el input de VES tiene contenido, se convierte de VES a USD
		else if (vesValue.trim() !== '') {
			const num = parseFormattedCurrency(vesValue, ',', '.')
			if (!isNaN(num) && rate !== 0) {
				const result = num / rate
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(result)
				setConversionResult(formatted)
			}
		}
		// Si ninguno tiene contenido, se muestra el valor por defecto de la tasa
		else {
			setConversionResult(`Bs.S ${rate}`)
		}
	}

	// --------------------
	// 2. Input de USD
	// --------------------
	const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value

		// Formateamos para que:
		//   - "." sea decimal
		//   - "," sea miles
		const formattedValue = formatCurrencyInput(rawValue, '.', ',')
		setUsdValue(formattedValue)
		setVesValue('')

		if (rawValue.trim() === '') {
			// Si el input está vacío
			setConversionResult(`Bs.S ${selectedRate}`)
			return
		}

		// Convertimos el string formateado a número real
		const num = parseFormattedCurrency(formattedValue, '.', ',')
		if (!isNaN(num) && !isNaN(selectedRate)) {
			// Conversión de USD a VES
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
	// 3. Input de VES
	// --------------------
	const handleVesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value

		// Formateamos para que:
		//   - "," sea decimal
		//   - "." sea miles
		const formattedValue = formatCurrencyInput(rawValue, ',', '.')
		setVesValue(formattedValue)
		setUsdValue('')

		if (rawValue.trim() === '') {
			setConversionResult(`Bs.S ${selectedRate}`)
			return
		}

		const num = parseFormattedCurrency(formattedValue, ',', '.')
		if (!isNaN(num) && !isNaN(selectedRate) && selectedRate !== 0) {
			// Conversión de VES a USD
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
				<div className='flex flex-col mb-2 md:mb-0'>
					<label
						htmlFor='dolares'
						className='flex items-center gap-3 mb-2 md:text-lg text-base font-semibold text-secondary dark:text-white'
					>
						<UnitedStatesIcon />
						Dólares
					</label>
					<div className='relative'>
						<label
							htmlFor='dolares'
							className='text-1xl md:text-2xl text-primary font-semibold absolute top-3 left-4'
						>
							$
						</label>
						<input
							className='text-2xl md:text-3xl placeholder:text-2xl md:placeholder:text-3xl dark:bg-tertiary bg-gray-100 dark:text-white dark:ring-[#353535] ring-gray-200 ring-2 rounded-md p-2 focus:outline-none focus:ring-2 w-full focus:ring-accent h-auto ps-10 dark:bg-raisin-black'
							id='dolares'
							type='text'
							placeholder='1.00'
							autoComplete='off'
							spellCheck='false'
							value={usdValue}
							onChange={handleUsdChange}
						/>
					</div>
				</div>

				<div className='flex flex-col mb-2 md:mb-0'>
					<label
						htmlFor='bolivares'
						className='flex items-center gap-3 mb-2 md:text-lg text-base font-semibold dark:text-white'
					>
						<VenezuelaIcon />
						Bolívares
					</label>
					<div className='relative'>
						<label
							htmlFor='bolivares'
							className='text-1xl md:text-2xl text-primary font-semibold absolute top-3 left-4'
						>
							Bs.S
						</label>
						<input
							className='text-2xl md:text-3xl placeholder:text-2xl md:placeholder:text-3xl dark:bg-tertiary bg-gray-100 dark:text-white dark:ring-[#353535] ring-gray-200 ring-2 rounded-md p-2 focus:outline-none focus:ring-2 w-full focus:ring-accent h-auto ps-20 dark:bg-raisin-black'
							id='bolivares'
							name='value'
							type='text'
							placeholder={String(setCurrencyDollar.monitors.bcv.price)}
							autoComplete='off'
							spellCheck='false'
							value={vesValue}
							onChange={handleVesChange}
						/>
					</div>
				</div>
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
