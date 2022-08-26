import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
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

export interface TransactionContextType {
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

  const loadTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])

  const createNewTransaction = useCallback(async (data: NewTransaction) => {
    const response = await api.post('transactions', {
      ...data,
      createdAt: new Date(),
    })
    setTransactions((state) => [...state, response.data])
  }, [])

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
