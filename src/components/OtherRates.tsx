'use client'
import PreTitles from './PreTitles'
import { Container } from './SectionContainer'

interface TasasItems {
	image: string
	title: string
	last_update: string
	currency: number
}

interface TasasProps {
	setCurrencyDollar: {
		datetime: {
			date: string
		}
		monitors: {
			promedio: {
				price: number
				last_update: string
				image: string
				title: string
			}
			dolar_today: {
				price: number
				last_update: string
				image: string
				title: string
			}
			binance: {
				price: number
				last_update: string
				image: string
				title: string
			}
			amazon_gift_card: {
				price: number
				last_update: string
				image: string
				title: string
			}

			cripto_dolar: {
				price: number
				last_update: string
				image: string
				title: string
			}

			paypal: {
				price: number
				last_update: string
				image: string
				title: string
			}

			skrill: {
				price: number
				last_update: string
				image: string
				title: string
			}

			uphold: {
				price: number
				last_update: string
				image: string
				title: string
			}
		}
	}
}

export default function Tasas({ setCurrencyDollar }: TasasProps) {
	const tasa: TasasItems[] = [
		{
			title: setCurrencyDollar.monitors.dolar_today.title,
			image: setCurrencyDollar.monitors.dolar_today.image,
			last_update: setCurrencyDollar.monitors.dolar_today.last_update,
			currency: setCurrencyDollar.monitors.dolar_today.price,
		},
		{
			title: setCurrencyDollar.monitors.binance.title,
			image: setCurrencyDollar.monitors.binance.image,
			last_update: setCurrencyDollar.monitors.binance.last_update,
			currency: setCurrencyDollar.monitors.binance.price,
		},
		{
			title: setCurrencyDollar.monitors.amazon_gift_card.title,
			image: setCurrencyDollar.monitors.amazon_gift_card.image,
			last_update: setCurrencyDollar.monitors.amazon_gift_card.last_update,
			currency: setCurrencyDollar.monitors.amazon_gift_card.price,
		},
		{
			title: setCurrencyDollar.monitors.cripto_dolar.title,
			image: setCurrencyDollar.monitors.cripto_dolar.image,
			last_update: setCurrencyDollar.monitors.cripto_dolar.last_update,
			currency: setCurrencyDollar.monitors.cripto_dolar.price,
		},
		{
			title: setCurrencyDollar.monitors.paypal.title,
			image: setCurrencyDollar.monitors.paypal.image,
			last_update: setCurrencyDollar.monitors.paypal.last_update,
			currency: setCurrencyDollar.monitors.paypal.price,
		},
		{
			title: setCurrencyDollar.monitors.skrill.title,
			image: setCurrencyDollar.monitors.skrill.image,
			last_update: setCurrencyDollar.monitors.skrill.last_update,
			currency: setCurrencyDollar.monitors.skrill.price,
		},
		{
			title: setCurrencyDollar.monitors.uphold.title,
			image: setCurrencyDollar.monitors.uphold.image,
			last_update: setCurrencyDollar.monitors.uphold.last_update,
			currency: setCurrencyDollar.monitors.uphold.price,
		},
	]
	return (
		<>
			<Container>
				<PreTitles
					title='Tasas de Cambio'
					pretitle='Consulta las tasas del dolar BCV y amazon_gift_card del dia de hoy'
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
					{tasa.map(item => (
						<article className='p-3 sm:px-5'>
							<div className='flex items-center'>
								<div className='flex-shrink-0'>
									<img
										src={item.image}
										className='aspect-square object-cover rounded-full w-10 h-10 md:min-h-11 md:min-w-11'
										alt={item.title}
										width='42'
										height='42'
										loading='lazy'
										decoding='async'
									/>
								</div>
								<div className='flex-1 min-w-0 ms-4'>
									<p className='md:text-md sm:text-md lg:text-xl font-medium text-gray-900 text-pretty dark:text-white'>
										{item.title}
									</p>
									<p className='text-lg text-gray-500  dark:text-gray-400 '>
										{item.last_update}
									</p>
								</div>

								<div className='inline-flex items-center text-3xl font-semibold text-primario'>
									<span>$</span> <span> {item.currency} </span>
								</div>
							</div>
						</article>
					))}
				</section>
			</Container>
		</>
	)
}
