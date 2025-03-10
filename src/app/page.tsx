import Calculator from '@/components/Calculator'
import { getCurrency } from '@/lib/index'

// Configuración de revalidación: se actualizará cada 600 segundos = 10 minutos
export const revalidate = 300

export default async function Home() {
	// Estas llamadas se ejecutan en el servidor
	const setCurrencyDollar = await getCurrency('dollar')
	// Renderizamos el contenido
	return (
		<>
			<Calculator {...setCurrencyDollar} />
		</>
	)
}
