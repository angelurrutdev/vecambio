import Tasas from '@/components/OtherRates'
import { getMonitorDollar } from '@/lib/index'

export const revalidate = 300

export default async function Home() {
	// Estas llamadas se ejecutan en el servidor
	const setCurrencyDollar = await getMonitorDollar('criptodolar')
	// Renderizamos el contenido
	return (
		<>
			<Tasas {...setCurrencyDollar} />
		</>
	)
}
