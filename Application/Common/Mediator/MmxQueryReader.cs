namespace MMX.Common.Mediator
{
    using MMX.Common.Mediator.Contrats;

    public class MmxQueryReader : IMmxQueryReader
    {
        private readonly MmxMediator mediator;

        public MmxQueryReader(MmxMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task<TResult> Get<TQuery, TResult>(TQuery query)
            where TQuery : MmxQuery
            where TResult : class
        {
            return await mediator.Send<TQuery, TResult>(query);
        }
    }
}
