export const getCurrency = async (currency: string) => {
	const url = `https://pydolarve.org/api/v1/${currency}?page=criptodolar`
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error(`Error fetching data for ${currency}`)
	}
	return await res.json()
}

export const getMonitorDollar = async (monitor: string) => {
	const url = `https://pydolarve.org/api/v1/dollar?page=${monitor}&format_date=default`
	const res = await fetch(url)
	return await res.json()
}
// https://pydolarve.org/api/v1/dollar?page=criptodolar?format_date=default

export type APIDolarResponse = {
	datetime: Datetime
	monitors: { [key: string]: Monitor }
}

export type Datetime = {
	date: string
	time: string
}

export type Monitor = {
	change: number
	color: Color
	image: string
	last_update: string
	percent: number
	price: number
	price_old: number
	symbol: symbol
	title: string
}

export enum Color {
	Green = 'green',
	Neutral = 'neutral',
	Red = 'red',
}

export enum Symbol {
	Empty = '▼',
	Purple = '',
	Symbol = '▲',
}
