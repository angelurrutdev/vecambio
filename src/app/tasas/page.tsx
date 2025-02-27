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
					title='Tasas de Cambio'
					pretitle='Consulta las tasas del dolar BCV y Paralelo del dia de hoy'
				/>
				<article className='rounded-lg text-center p-4 '>
					<h1 className='text-4xl font-medium text-gray-500 dark:text-white'>
						Tasa promedio
					</h1>
					<div className='text-gray-900 dark:text-white text-center'>
						<div className='mb-4 text-xl font-normal text-gray-500 dark:text-gray-400'>
							{setCurrencyDollar.datetime.date}
						</div>
						<div className='text-primario'>
							<span className='text-5xl font-semibold'>$</span>
							<span className='text-7xl  font-extrabold tracking-tight'>
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
								<p className='md:text-md sm:text-md lg:text-xl font-medium text-gray-900 text-pretty dark:text-white'>
									Dólar Monitor
								</p>
								<p className='text-lg text-gray-500  dark:text-gray-400 '>
									{setCurrencyDollar.monitors.promedio.last_update}
								</p>
							</div>

							<div className='inline-flex items-center text-3xl font-semibold text-primario'>
								<span>$</span> <span>80.24</span>
							</div>
						</div>
					</article>
				</section>
			</Container>
		</>
	)
}
