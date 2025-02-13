export function Container({ children }: { children: React.ReactNode }) {
	return (
		<section className='mt-12 mx-auto w-[340px] md:w-1/2 rounded-3xl bg-moonlit border-2 border-transparent dark:bg-raisin-black overflow-hidden p-6 lg:p-8'>
			{children}
		</section>
	)
}
