namespace MMX.Common.Decorators
{
    using GreenPipes;
    using MassTransit;
    using MMX.Common.Exceptions;

    public class ValidationFilter<TMessage, THandler, TValidator, TPayload> : IFilter<ConsumerConsumeContext<THandler>>
        where TMessage : class
        where THandler : class, IConsumer<TMessage>
        where TPayload : class
        where TValidator : Validator<TPayload>
    {
        private readonly IServiceProvider serviceProvider;
        private readonly Func<IServiceProvider, TMessage, Task<TPayload>> payloadProvider;

        public ValidationFilter(IServiceProvider serviceProvider, Func<IServiceProvider, TMessage, Task<TPayload>> payloadProvider)
        {
            this.serviceProvider = serviceProvider;
            this.payloadProvider = payloadProvider;
        }

        public void Probe(ProbeContext context)
        {
            // We dont have probe
        }

        public async Task Send(ConsumerConsumeContext<THandler> context, IPipe<ConsumerConsumeContext<THandler>> next)
        {
            if (!context.TryGetMessage(out ConsumeContext<TMessage> messageContext))
            {
                throw new MmxInternalServerErrorException($"Unable to get message for {GetType().FullName}");
            }

            using (IServiceScope scope = serviceProvider.CreateScope())
            {
                TValidator validator = ActivatorUtilities.CreateInstance<TValidator>(scope.ServiceProvider);
                TPayload payload = await payloadProvider(scope.ServiceProvider, messageContext.Message);

                await validator.Validate(payload);
            }

            await next.Send(context);
        }
    }
}
