import { SummaryCard, SummaryContainer } from './styles'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { priceFormatter } from '../../utils/formatter'
import { useSummary } from '../../hooks/useSummary'

export function Summary() {
  const summary = useSummary()
  const { income, outcome, total } = summary

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="green" />
        </header>
        <strong>{priceFormatter.format(income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="red" />
        </header>
        <strong>{priceFormatter.format(outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="white" />
        </header>
        <strong>{priceFormatter.format(total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
