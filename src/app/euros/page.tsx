// app/page.tsx
import Header from '@/components/Header'
import Calculator from '@/components/Calculator'
import { getCurrency } from '@/lib/index'

// Configuración de revalidación: se actualizará cada 600 segundos = 10 minutos
export const revalidate = 600

export default async function Home() {
	// Estas llamadas se ejecutan en el servidor
	const setCurrencyDollar = await getCurrency('euro')
	// Renderizamos el contenido
	return (
		<>
			<Header />
			<Calculator setCurrencyDollar={setCurrencyDollar} />
		</>
	)
}
