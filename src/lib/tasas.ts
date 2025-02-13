// .monitors.enparalelovzla.price
// .monitors.bcv.price

import { getCurrency } from './index'

const setCurrencyDollar = await getCurrency('dollar')

export const tasa_dolar = async (tasas: string) => {
	const precio = setCurrencyDollar.monitors[tasas].price
	const tasaFormated =
		typeof precio === 'number'
			? precio
					.toLocaleString('es-VE', {
						useGrouping: true,
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					})
					.replace(/\./g, ',')
			: precio

	return tasaFormated // Devuelve el valor formateado
}
