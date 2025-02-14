import React, { ReactNode } from 'react'

interface InputContainerProps {
	for_currency: string
	icon: ReactNode
	label_currency: string
	label_title: string
	placeholder_input: string
	value: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	className: string
}

export function InputContainer({
	for_currency,
	icon,
	label_currency,
	label_title,
	placeholder_input,
	value,
	handleChange,
	className,
}: InputContainerProps) {
	return (
		<div className='flex flex-col mb-2 md:mb-0'>
			<label
				htmlFor={for_currency}
				className='flex items-center gap-3 mb-2 md:text-lg text-base font-semibold dark:text-white'
			>
				{icon}
				{label_title}
			</label>
			<div className='relative'>
				<label
					htmlFor={for_currency}
					className='text-1xl md:text-2xl text-primary font-semibold absolute top-3 left-4 '
				>
					{label_currency}
				</label>

				<input
					className={`text-2xl md:text-3xl placeholder:text-2xl md:placeholder:text-3xl dark:bg-tertiary bg-gray-100 dark:text-white dark:ring-[#353535] ring-gray-200 ring-2 rounded-md p-2 focus:outline-none focus:ring-2 w-full focus:ring-accent h-auto dark:bg-raisin-black ${className}`}
					id={for_currency}
					name='value'
					type='text'
					placeholder={placeholder_input}
					autoComplete='off'
					spellCheck='false'
					value={value}
					onChange={handleChange}
				/>
			</div>
		</div>
	)
}
