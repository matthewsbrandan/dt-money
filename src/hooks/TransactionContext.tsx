import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface TransactionContextData{
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  formatAmount: (amount: number, unsigned?: boolean) => string;
}
interface TransactionContextProviderProps{
  children: ReactNode;
}
interface Transaction{
  id: number;
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  category: string;
  createdAt: string;
}
type TransactionInput = Omit<Transaction, 'id' | 'createdAt' >;

const TransactionContext = createContext({} as TransactionContextData);

export function TransactionContextProvider({ children }: TransactionContextProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    api.get('transactions').then(response => {
      setTransactions(response.data.transactions);
    });
  },[])

  async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  }
  // BEGIN:: FUNCTIONS FORMAT
  function formatAmount(amount: number, unsigned: boolean = true){
    let amount_formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);

    if(!unsigned && amount > 0){
      amount_formatted = '-' + amount_formatted;
    }

    return amount_formatted;
  }  
  // END:: FUNCTIONS FORMAT
  return (
    <TransactionContext.Provider value={{
      transactions,
      createTransaction,
      formatAmount
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => {
  return useContext(TransactionContext);
}