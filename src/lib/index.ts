export const getCurrency = async (currency: string) => {
	const url = `https://pydolarve.org/api/v2/${currency}?page=bcv&format_date=default`
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
	datetime: {
	  date: string;
	  time: string;
	};
	monitors: {
	  [key: string]: Monitor;
	};
  };
  
  export type Monitor = {
	change: number;
	color: "green" | "red" | "neutral";
	image: string | null;
	last_update: string;
	percent: number;
	price: number;
	price_old: number;
	symbol: "▲" | "▼" | "";
	title: string;
  };
  