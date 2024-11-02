namespace MMX.Infrastructure.Entity.Dtos
{
    public class MonthlyIncomeExpense
    {
        public int TransactionMonth { get; set; }

        public decimal Expense { get; set; }

        public decimal Income { get; set; }
    }
}
