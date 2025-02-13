import { Calculator } from '@/components/Calculator'
import Header from '@/components/Header'
import HeaderToggle from '@/components/HeaderToggle'

export default function Home() {
	return (
		<>
			<Header>
				<HeaderToggle value={0} sign={''} />
			</Header>
			<Calculator />
		</>
	)
}
