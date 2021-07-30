import { useTransactions } from "../../hooks/TransactionContext";
import { Container } from "./styles";

export function TransactionsTable(){
  const { transactions, formatAmount } = useTransactions();

  function formateCreatedAt(createdAt: string){
    let date_formated = new Intl.DateTimeFormat('pt-BR').format(new Date(createdAt));
    return date_formated;
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions && (transactions.length > 0 ? transactions.map(transaction => { return (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {formatAmount(transaction.amount, transaction.type == 'deposit')}
              </td>
              <td>{transaction.category}</td>
              <td>{formateCreatedAt(transaction.createdAt)}</td>
            </tr>
          );}) : (
            <tr>
              <th colSpan={4} style={{background: 'transparent', textAlign: 'center'}}>Nenhuma Transação</th>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}