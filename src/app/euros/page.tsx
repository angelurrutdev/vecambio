import Calculator from '@/components/Calculator'
import { getCurrency } from '@/lib/index'

export const revalidate = 300

export default async function Home() {
	const setCurrencyDollar = await getCurrency('dollar')

	return (
		<>
			<Calculator monitors={setCurrencyDollar.monitors} />
		</>
	)
}
