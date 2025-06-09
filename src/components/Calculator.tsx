'use client'

import { APIDolarResponse } from '@/lib/index'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { PillMount } from './PillMount'
import { Container } from './SectionContainer'
import { CopyButton } from './CopyButton'
import { SpainIcon, UnitedStatesIcon, VenezuelaIcon } from '@/icons/icons'
import Link from 'next/link'
import { InputContainer } from './InputContainer'
import PreConverts from './PreConverts'
import PreTitles from './PreTitles'

type CalculatorProps = {
  monitors: APIDolarResponse['monitors']
}

export default function Calculator({ monitors }: CalculatorProps) {
  const pathname = usePathname()
  const isEuro = pathname === '/euros'
  const selectedMonitor = isEuro ? monitors.eur : monitors.usd

  const [selectedRate, setSelectedRate] = useState<number>(selectedMonitor.price)
  const [usdValue, setUsdValue] = useState<string>('')
  const [vesValue, setVesValue] = useState<string>('')

  const [conversionResult, setConversionResult] = useState<string>(
    `Bs.S ${selectedRate}`
  )

  const handleSelectRate = (rate: number) => {
    setSelectedRate(rate)

    if (usdValue.trim() !== '') {
      const num = parseFormattedCurrency(usdValue, '.', ',')
      if (!isNaN(num)) {
        const result = num * rate
        const formatted = new Intl.NumberFormat('es-VE', {
          style: 'currency',
          currency: 'VES',
        }).format(result)
        setConversionResult(formatted)
      }
    } else if (vesValue.trim() !== '') {
      const num = parseFormattedCurrency(vesValue, ',', '.')
      if (!isNaN(num) && rate !== 0) {
        const result = num / rate
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: isEuro ? 'EUR' : 'USD',
        }).format(result)
        setConversionResult(formatted)
      }
    } else {
      setConversionResult(`Bs.S ${rate}`)
    }
  }

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatCurrencyInput(rawValue, '.', ',')
    setUsdValue(formattedValue)
    setVesValue('')

    if (rawValue.trim() === '') {
      setConversionResult(`Bs.S ${selectedRate}`)
      return
    }

    const num = parseFormattedCurrency(formattedValue, '.', ',')
    if (!isNaN(num) && !isNaN(selectedRate)) {
      const result = num * selectedRate
      const formatted = new Intl.NumberFormat('es-VE', {
        style: 'currency',
        currency: 'VES',
      }).format(result)
      setConversionResult(formatted)
    } else {
      setConversionResult(`Bs.S ${selectedRate}`)
    }
  }

  const handleVesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatCurrencyInput(rawValue, ',', '.')
    setVesValue(formattedValue)
    setUsdValue('')

    if (rawValue.trim() === '') {
      setConversionResult(`Bs.S ${selectedRate}`)
      return
    }

    const num = parseFormattedCurrency(formattedValue, ',', '.')
    if (!isNaN(num) && !isNaN(selectedRate) && selectedRate !== 0) {
      const result = num / selectedRate
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: isEuro ? 'EUR' : 'USD',
      }).format(result)
      setConversionResult(formatted)
    } else {
      setConversionResult(`Bs.S ${selectedRate}`)
    }
  }

  function formatCurrencyInput(
    inputValue: string,
    decimal: string,
    thousands: string
  ): string {
    const cleanedValue = inputValue.replace(/[^0-9]/g, '')
    if (cleanedValue === '') {
      return '0' + decimal + '00'
    }

    const amount = cleanedValue.length > 2 ? cleanedValue.slice(0, -2) : '0'
    const cents =
      cleanedValue.length > 2
        ? cleanedValue.slice(-2)
        : cleanedValue.padStart(2, '0')

    const integerPart = removeLeadingZeros(amount)
    const formattedAmount = addThousandSeparators(integerPart, thousands)

    return `${formattedAmount}${decimal}${cents}`
  }

  function removeLeadingZeros(cadena: string): string {
    return String(parseInt(cadena, 10))
  }

  function addThousandSeparators(numberStr: string, thousands: string): string {
    return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, thousands)
  }

  function parseFormattedCurrency(
    formatted: string,
    decimal: string,
    thousands: string
  ): number {
    let normalized = formatted.replace(new RegExp(`\\${thousands}`, 'g'), '')
    if (decimal !== '.') {
      normalized = normalized.replace(decimal, '.')
    }
    return parseFloat(normalized)
  }

  // Etiquetas según moneda
  const usdLabelTitle = isEuro ? 'Euros' : 'Dólares'
  const usdLabelCurrency = isEuro ? '€' : '$'
  const usdIcon = isEuro ? <SpainIcon /> : <UnitedStatesIcon />

  return (
    <Container>
      <div className='flex flex-col gap-1 z-[1]'>
        <PreTitles
          title='Calculadora'
          pretitle={`Convierte ${usdLabelTitle} a VES al BCV o Paralelo a la tasa del día.`}
        />
      </div>

      <section className='flex justify-center mt-2'>
        <ul className='grid grid-cols-1 rounded-lg gap-x-2'>
          <PillMount
            id='BCV'
            value={selectedMonitor.price}
            name='BCV'
            title='BCV'
            onClick={() => handleSelectRate(selectedMonitor.price)}
          />
        </ul>
      </section>

      <article className='text-center text-accent md:my-2 my-3 items-center flex flex-col'>
        <p
          className='text-5xl md:text-6xl font-semibold text-primario flex'
          id='mount'
        >
          {conversionResult}
        </p>
        <p className='text-neutral-500 px-9 py-1 my-3 max-w-72 text-xs'>
          Última actualización <br />
          <strong className='font-mono'>{selectedMonitor.last_update}</strong>
        </p>
        <CopyButton id='mount' />
      </article>

      <form className='grid grid-cols-1 md:grid-cols-2 gap-x-9 px-7 py-5 items-center'>
        <InputContainer
          className='pl-10'
          for_currency={usdLabelTitle.toLowerCase()}
          icon={usdIcon}
          label_currency={usdLabelCurrency}
          placeholder_input={'1.00'}
          value={usdValue}
          label_title={usdLabelTitle}
          handleChange={handleUsdChange}
        />

        <InputContainer
          className='pl-20'
          for_currency='bolivares'
          icon={<VenezuelaIcon />}
          label_currency='Bs.S'
          placeholder_input={String(selectedMonitor.price)}
          value={vesValue}
          label_title='Bolívares'
          handleChange={handleVesChange}
        />
      </form>

      <p className='text-neutral-400 text-sm text-center'>
        Usamos la tasa del{' '}
        <Link
          href='https://www.bcv.org.ve/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          BCV
        </Link>{' '}
        para nuestra calculadora. Esta información es solo para fines informativos.
      </p>

      {[1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((amount) => (
        <PreConverts
          key={amount}
          mountConvert={selectedMonitor.price}
          mount={amount}
          BolivarMount={selectedMonitor.price}
          Bolivar={amount * 100}
        />
      ))}
    </Container>
  )
}
