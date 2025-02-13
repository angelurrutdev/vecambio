import { tasa_dolar } from '@/lib/tasas'
import { PillMount } from './PillMount'
import { Container } from './SectionContainer'
import { CopyButton } from './CopyButton'
import { getCurrency } from '@/lib/index'
import { UnitedStatesIcon, VenezuelaIcon } from '@/icons/icons'
import Link from 'next/link'

const setCurrencyDollar = await getCurrency('dollar')

const tasaEnparalelo = await tasa_dolar('enparalelovzla')
const tasaCentral = await tasa_dolar('bcv')

export function Calculator() {
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
					<PillMount id='BCV' value={tasaCentral} name='BCV' title='BCV' />

					<PillMount
						id='Paralelo'
						value={tasaEnparalelo}
						name='Paralelo'
						title='Paralelo'
					/>
				</ul>
			</section>
			<article className='text-center text-accent md:my-2 my-3 items-center flex flex-col'>
				<p
					className='text-5xl md:text-6xl font-semibold text-primario'
					id='mount'
				>
					Bs.S <strong>{tasaCentral}</strong>
				</p>
				<p className='text-neutral-500 px-9 py-1 my-3 max-w-72 text-xs'>
					Última actualización <br />
					<strong className='font-mono'>
						{setCurrencyDollar.monitors.bcv.last_update}
					</strong>
				</p>
				<CopyButton id='btn-copy-convert' />
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
							placeholder={setCurrencyDollar.monitors.bcv.price}
							autoComplete='off'
							spellCheck='false'
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
