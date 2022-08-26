import { Children, createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

type NewTransaction = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionContextType {
  transactions: Transaction[]
  loadTransactions: (query?: string) => Promise<void>
  createNewTransaction: (data: NewTransaction) => Promise<void>
}

interface TransasctionsProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransasctionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  async function createNewTransaction(data: NewTransaction) {
    const response = await api.post('transactions', {
      ...data,
      createdAt: new Date(),
    })
    setTransactions((state) => [...state, response.data])
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionContext.Provider
      value={{ transactions, loadTransactions, createNewTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
