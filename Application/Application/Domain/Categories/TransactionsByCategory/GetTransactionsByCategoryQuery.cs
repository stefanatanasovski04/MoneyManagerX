namespace MMX.Application.Domain.Categories.TransactionsByCategory
{
    using MMX.Common.Mediator.Contrats;

    public class GetTransactionsByCategoryQuery : MmxQuery
    {
        public GetTransactionsByCategoryQuery(int categoryId, DateOnly month, bool yearly)
        {
            CategoryId = categoryId;
            Month = month;
            Yearly = yearly;
        }

        public int CategoryId { get; private set; }

        public DateOnly Month { get; private set; }

        public bool Yearly { get; private set; }
    }
}
