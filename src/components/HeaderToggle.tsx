import React from 'react'

interface Props {
	value: number // Changed to number
	value_datetime?: string // Made optional and typed as string
	sign: string
}

const HeaderToggle = ({ value, value_datetime, sign }: Props) => {
	return (
		<div className='items-center space-x-4 p-2 flex'>
			<div className='hidden sm:flex md:flex'>
				<div
					className='text-accent flex text-sm rounded-full border-2 px-3 py-1 text-center min-w-32 lg:min-w-80 items-center 
        text-neutral-900
        border-neutral-200
        dark:text-neutral-50
        dark:border-neutral-200 
        '
				>
					{sign}
					<strong className='ml-1'> 1.00 </strong>
					<span className='mx-1'> = </span>
					<span id='price-usd'>
						Bs.S <strong className=''>{value || 0}</strong>
					</span>
					<span className='hidden md:flex ms-2'>
						{value_datetime || 'No date available'}
					</span>
				</div>
			</div>
		</div>
	)
}

export default HeaderToggle
