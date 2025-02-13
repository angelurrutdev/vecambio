import { useState } from 'react'
import { CopyButtonIcon } from '@/icons/icons'

export function CopyButton({ id }: { id: string }) {
	const [copied, setCopied] = useState(false)

	const handleCopy = () => {
		const element = document.getElementById(id)
		if (element) {
			navigator.clipboard.writeText(element.innerText).then(() => {
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			})
		}
	}

	return (
		<button
			onClick={handleCopy}
			className='
        text-neutral-500 hover:text-neutral-700 dark:text-neutral-300
        inline-flex items-center space-x-3 justify-center whitespace-nowrap
        rounded-md text-sm font-medium transition-colors focus-visible:outline-none
        focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50
        dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500
        border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100
        hover:text-neutral-900 dark:border-neutral-800 dark:bg-cuber-black
        dark:hover:bg-raisin-black dark:hover:text-neutral-50 dark:hover:border-neutral-700/50
        h-9 px-4 py-2'
		>
			<CopyButtonIcon />
			{copied ? 'Copiado' : 'Copiar'}
		</button>
	)
}
