namespace MMX.Application.Domain.Statistics.YearlyIncomeAndExpense
{
    using MMX.Common.Mediator.Contrats;

    public class GetYearlyIncomeAndExpenseQuery : MmxQuery
    {
        public GetYearlyIncomeAndExpenseQuery(int year)
        {
            Year = year;
        }
        public int Year {  get; set; }
    }
}
