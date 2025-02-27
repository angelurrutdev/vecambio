import Header from '@/components/Header'
import HeaderToggle from '@/components/HeaderToggle'
import PreTitles from '@/components/PreTitles'
import { Container } from '@/components/SectionContainer'
import { getMonitorDollar } from '@/lib/index'

const setCurrencyDollar = await getMonitorDollar('criptodolar')

export default function Tasas() {
	return (
		<>
			<Header>
				<HeaderToggle
					value={setCurrencyDollar.monitors.bcv.price}
					sign={'$'}
					value_datetime={setCurrencyDollar.monitors.bcv.last_update}
				/>
			</Header>
			<Container>
				<PreTitles
					title='Tasas de Cambio Promedio al Día'
					pretitle='Consulta las tasas del dolar BCV y Paralelo del dia de hoy'
				/>
				<article className='text-center p-4 border-b dark:border-secondary dark:bg-tertiary bg-white'>
					<h1 className='text-4xl font-medium text-gray-500 dark:text-white'>
						Tasa promedio
					</h1>
					<div className='text-gray-900 dark:text-white text-center'>
						<div className='mb-4 text-xl font-normal text-gray-500 dark:text-gray-400'>
							{setCurrencyDollar.datetime.date}
						</div>
						<div>
							<span className='text-5xl text-accent font-semibold'>$</span>
							<span className='text-7xl text-accent font-extrabold tracking-tight'>
								{setCurrencyDollar.monitors.promedio.price}
							</span>
						</div>
					</div>
				</article>
				<section className='divide-y divide-gray-200 dark:divide-secondary'>
					<article className='p-3 sm:px-5'>
						<div className='flex items-center'>
							<div className='flex-shrink-0'>
								<img
									src='https://vcoud.nyc3.digitaloceanspaces.com/criptodolar/divisas/vmo.png'
									className='aspect-square object-cover rounded-full w-10 h-10 md:min-h-11 md:min-w-11'
									alt='Logo de Dólar Monitor'
									width='42'
									height='42'
									loading='lazy'
									decoding='async'
								/>
							</div>
							<div className='flex-1 min-w-0 ms-4'>
								<p className='text-xl font-medium text-gray-900 truncate dark:text-white'>
									Dólar Monitor
								</p>
								<p className='text-lg text-gray-500 truncate dark:text-gray-400'>
									jueves, 27 de febrero de 2025
								</p>
							</div>
							<div className='inline-flex items-center text-3xl font-semibold text-accent'>
								<span>$</span> <span>80.24</span>
							</div>
						</div>
					</article>
				</section>
			</Container>
		</>
	)
}
