namespace MMX.Application.Contracts.Responses.Dtos
{
    using System.Text.Json.Serialization;


    public class MonthlyIncomeExpenseDto
    {
        public string Month { get; set; } = string.Empty;

        [JsonIgnore]
        public int TransactionMonth { get; set; }

        public decimal Expense { get; set; }

        public decimal Income { get; set; }
    }
}
