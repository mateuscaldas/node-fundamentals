import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes: number[] = [];
    const outcomes: number[] = [];

    this.transactions.map(income => {
      if (income.type === 'income') {
        incomes.push(income.value);
      }
      return null;
    });

    this.transactions.map(income => {
      if (income.type === 'outcome') {
        outcomes.push(income.value);
      }
      return null;
    });

    const totalIncome = incomes.reduce((acc, curr) => acc + curr, 0);
    const totalOutcome = outcomes.reduce((acc, curr) => acc + curr, 0);

    const total = totalIncome - totalOutcome;

    this.balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
