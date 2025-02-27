export class Loan {
  id: string;
  creditor_id: string;
  debtor_id: string;
  amount: number;
  interest_rate: number;
  due_date: Date;
  status: "PENDING" | "PAID" | "OVERDUE";
  created_at: Date;
}
