import React from 'react'

interface PillMountProps {
	id: string
	value: string
	name: string
	title: string
}

export function PillMount({ id, value, name, title }: PillMountProps) {
	return (
		<li
			className='
        px-2
        cursor-pointer
        inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:hover:border-neutral-700/50'
		>
			<input
				type='radio'
				name={name}
				id={id}
				value={value}
				className='hidden peer'
			/>
			<label
				htmlFor={id}
				className='
          text-neutral-900
          hover:text-neutral-700
          dark:text-neutral-50
          dark:hover:text-neutral-300
          dark:peer-checked:text-neutral-400
          cursor-pointer
          transition
          px-2
          flex flex-col justify-center items-center text-sm w-full px-2 py-1
          ring-2 ring-transparent rounded-lg 
          peer-checked:bg-accent/80
          peer-checked:text-neutral-600 
          rounded-none'
			>
				<div>{title}</div>
				<div className='font-semibold flex' id={`price-tasa-${id}`}>
					Bs.S {value}
				</div>
			</label>
		</li>
	)
}
