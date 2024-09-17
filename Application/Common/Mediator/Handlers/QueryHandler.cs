namespace MMX.Common.Mediator.Handlers
{
    using MassTransit;
    using MMX.Common.Mediator.Contrats;

    public abstract class QueryHandler<TQuery, TResult> : IConsumer<TQuery>
        where TQuery : MmxQuery
        where TResult : class
    {
        public async Task Consume(ConsumeContext<TQuery> context)
        {
            TResult result = await Handle(context.Message);

            await context.RespondAsync(result);
        }

        public abstract Task<TResult> Handle(TQuery query);
    }
}
