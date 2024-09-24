namespace MMX.Application.Domain.Transactions.TotalIncomeExpense
{
    using MMX.Common.Mediator.Contrats;
    using MMX.Domain.Enum;

    public class CalculateTotalIncomeExpenseQuery : MmxQuery
    {
        public TransactionType Type { get; private set; }

        public DateOnly Month { get; private set; }

        public bool Yearly { get; private set; }

        public CalculateTotalIncomeExpenseQuery(TransactionType type, DateOnly month, bool yearly)
        {
            Type = type;
            Month = month;
            Yearly = yearly;
        }
    }
}
