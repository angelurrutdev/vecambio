export default function Footer() {
	return (
		<footer className='group w-full text-sm text-neutral-600 dark:text-neutral-400 bg-white/60 backdrop-blur-md dark:bg-neutral-900/60 bottom-0 mt-4'>
			<div className='mx-4 flex items-center justify-between'>
				<div className='flex items-center space-x-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='14'
						height='14'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='lucide lucide-heart text-red-500 group-hover:transform group-hover:animate-pulse'
					>
						<path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'></path>
					</svg>

					<p>Made by Angel</p>
				</div>
				<div className='flex items-center'>
					<a
						href='https://github.com/angelurrutdev/vecambio/issues/new'
						target='_blank'
						rel='noreferrer'
						className='group flex items-center text-neutral-600 transition-colors duration-100 hover:text-black dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-white'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='14'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.4'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='mr-1 group-hover:stroke-yellow-600 dark:group-hover:stroke-yellow-500'
						>
							<path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3'></path>
							<path d='M12 9v4'></path>
							<path d='M12 17h.01'></path>
						</svg>
						<span>Encontraste un error?</span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='12'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.4'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='lucide lucide-arrow-up-right'
						>
							<path d='M7 7h10v10'></path>
							<path d='M7 17 17 7'></path>
						</svg>
					</a>
				</div>
			</div>
		</footer>
	)
}
