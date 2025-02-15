import Header from '@/components/Header'
import HeaderToggle from '@/components/HeaderToggle'
import Calculator from '@/components/Calculator'
import { getCurrency } from '@/lib/index'
import { tasa_dolar } from '@/lib/tasas'

// Configuración de revalidación: se actualizará cada 600 segundos =  10 minutos
export const revalidate = 600

export default async function Home() {
	// Estas llamadas se ejecutan en el servidor
	const setCurrencyDollar = await getCurrency('dollar')
	const rawTasaEnparalelo = await tasa_dolar('enparalelovzla')
	const rawTasaCentral = await tasa_dolar('bcv')

	return (
		<>
			<Header>
				<HeaderToggle
					value={setCurrencyDollar.monitors.bcv.price}
					sign={'$'}
					value_datetime={setCurrencyDollar.monitors.bcv.last_update}
				/>
			</Header>
			<Calculator
				setCurrencyDollar={setCurrencyDollar}
				rawTasaEnparalelo={rawTasaEnparalelo}
				rawTasaCentral={rawTasaCentral}
			/>
		</>
	)
}
