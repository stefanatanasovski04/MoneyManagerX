namespace MMX.Application.Domain.Transactions.List
{
    using MMX.Common.Mediator.Contrats;
    using MMX.Common.ValueObjects.PagingValue;
    using MMX.Common.ValueObjects.SortingValue;

    public class TransactionsListQuery : MmxQuery
    {
        public TransactionsListQuery(Paging paging, Sorting sorting)
        {
            Paging = paging;
            Sorting = sorting;
        }

        public Paging Paging { get; private set; }

        public Sorting Sorting { get; private set; }
    }
}
