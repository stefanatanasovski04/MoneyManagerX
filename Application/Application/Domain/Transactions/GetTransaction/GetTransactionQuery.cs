namespace MMX.Application.Domain.Transactions.GetTransaction
{
    using MMX.Common.Mediator.Contrats;

    public class GetTransactionQuery : MmxQuery
    {
        public GetTransactionQuery(int id)
        {
            Id = id;
        }

        public int Id { get; private set; }
    }
}
