type PreTitleProps = {
	title: string
	pretitle: string
}

export default function ({ title, pretitle }: PreTitleProps) {
	return (
		<>
			<h1 className='text-2xl font-bold'>{title}</h1>
			<h3 className='md:text-base text-sm opacity-70'>{pretitle}</h3>
		</>
	)
}
