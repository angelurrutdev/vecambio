import Header from '@/components/Header'
import { Container } from '@/components/SectionContainer'

export default function Tasas() {
	return (
		<>
			<Header />
			<Container>
				<article>
					<ul className='mt-4'>
						<li className='dark:text-primary-white text-primary text-balance mb-4'>
							<details className='open:bg-secondary-white dark:open:bg-tertiary open:ring-1 open:ring-black/5 dark:open:ring-white/10 p-4 rounded-lg'>
								<summary className='text-lg leading-6 text-slate-900 dark:text-white font-semibold select-none'>
									¿Con qué frecuencia se actualiza la tasa del BCV en esta
									página?
								</summary>
								<p className='mt-2 text-lg' id='faq-a1'>
									La tasa del{' '}
									<a
										href='https://www.bcv.org.ve/'
										target='_blank'
										rel='noopener noreferrer'
										className='text-blue-500 underline'
									>
										BCV
									</a>{' '}
									se actualiza diariamente para asegurarnos de que siempre
									tengas acceso a la información más reciente.
								</p>
							</details>
						</li>
						<li className='dark:text-primary-white text-primary text-balance mb-4'>
							<details className='open:bg-secondary-white dark:open:bg-tertiary open:ring-1 open:ring-black/5 dark:open:ring-white/10 p-4 rounded-lg'>
								<summary className='text-lg leading-6 text-slate-900 dark:text-white font-semibold select-none'>
									¿Cómo puedo convertir de dólares (USD) a bolívares (Bs.) y
									viceversa en la calculadora?
								</summary>
								<p className='mt-2 text-lg' id='faq-a2'>
									Para <strong>convertir de dólares a bolívares</strong>,
									ingresa el monto en dólares en el campo correspondiente y
									automáticamente obtendrás el equivalente en bolívares. Para
									<strong>convertir de bolívares a dólares</strong>, selecciona
									la opción de bolívares, ingresa la cantidad y la calculadora
									te proporcionará el valor en dólares.
								</p>
							</details>
						</li>
						<li className='dark:text-primary-white text-primary text-balance mb-4'>
							<details className='open:bg-secondary-white dark:open:bg-tertiary open:ring-1 open:ring-black/5 dark:open:ring-white/10 p-4 rounded-lg'>
								<summary className='text-lg leading-6 text-slate-900 dark:text-white font-semibold select-none'>
									¿Puedo comparar la tasa del BCV con el mercado paralelo?
								</summary>
								<p className='mt-2 text-lg' id='faq-a3'>
									Sí, nuestra herramienta te permite visualizar tanto la tasa
									oficial del BCV como la tasa del mercado paralelo para que
									puedas compararlas fácilmente y elegir la que más te convenga.
								</p>
							</details>
						</li>
						<li className='dark:text-primary-white text-primary text-balance mb-4'>
							<details className='open:bg-secondary-white dark:open:bg-tertiary open:ring-1 open:ring-black/5 dark:open:ring-white/10 p-4 rounded-lg'>
								<summary className='text-lg leading-6 text-slate-900 dark:text-white font-semibold select-none'>
									¿Cómo puedo utilizar el gráfico de histórico de tasas?
								</summary>
								<p className='mt-2 text-lg' id='faq-a4'>
									El gráfico interactivo te muestra el comportamiento de las
									tasas de cambio en diferentes periodos (7, 30 y 90 días), lo
									que te ayuda a analizar las fluctuaciones del valor del
									bolívar.
								</p>
							</details>
						</li>
						<li className='dark:text-primary-white text-primary text-balance mb-4'>
							<details className='open:bg-secondary-white dark:open:bg-tertiary open:ring-1 open:ring-black/5 dark:open:ring-white/10 p-4 rounded-lg'>
								<summary className='text-lg leading-6 text-slate-900 dark:text-white font-semibold select-none'>
									¿Es posible copiar los resultados de la calculadora?
								</summary>
								<p className='mt-2 text-lg' id='faq-a5'>
									Sí, nuestra calculadora cuenta con una opción de "Copiar" para
									que puedas guardar y utilizar los resultados de manera rápida
									y sencilla en tus operaciones diarias.
								</p>
							</details>
						</li>
						<li className='dark:text-primary-white text-primary text-balance mb-4'>
							<details className='open:bg-secondary-white dark:open:bg-tertiary open:ring-1 open:ring-black/5 dark:open:ring-white/10 p-4 rounded-lg'>
								<summary className='text-lg leading-6 text-slate-900 dark:text-white font-semibold select-none'>
									¿Cuál es la fórmula para convertir divisas entre dólares y
									bolívares?
								</summary>
								<p className='mt-2 text-lg mb-2' id='faq-a6'>
									Para convertir de <strong>dólares a bolívares</strong>,
									utiliza la fórmula:
								</p>
								<code className='bg-gray-100 dark:bg-neutral-800 p-2 rounded-lg text-md'>
									Monto en bolívares = Monto en dólares × Tasa de cambio
								</code>
								<p className='mt-4 text-lg mb-2' id='faq-a6'>
									Para convertir de <strong>bolívares a dólares</strong>, la
									fórmula es
								</p>
								<code className='bg-gray-100 dark:bg-neutral-800 p-2 rounded-lg text-md'>
									Monto en dólares = Monto en bolívares ÷ Tasa de cambio
								</code>
								<p></p>
							</details>
						</li>
					</ul>
				</article>
			</Container>
		</>
	)
}
