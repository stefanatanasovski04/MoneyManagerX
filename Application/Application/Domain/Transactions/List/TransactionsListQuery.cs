namespace MMX.Application.Domain.Transactions.List
{
    using MMX.Common.Mediator.Contrats;
    using MMX.Common.ValueObjects.PagingValue;
    using MMX.Common.ValueObjects.SortingValue;

    public class TransactionsListQuery : MmxQuery
    {
        public TransactionsListQuery(Paging paging, Sorting sorting, DateOnly month, bool yearly)
        {
            Paging = paging;
            Sorting = sorting;
            Month = month;
            Yearly = yearly;
        }

        public Paging Paging { get; private set; }

        public Sorting Sorting { get; private set; }

        public DateOnly Month { get; private set; }

        public bool Yearly { get; private set; }
    }
}
