namespace MMX.Common.Mediator
{
    using MMX.Common.Mediator.Contrats;

    public interface IMmxQueryReader
    {
        Task<TResult> Get<TQuery, TResult>(TQuery query)
            where TQuery : MmxQuery
            where TResult : class;
    }
}
