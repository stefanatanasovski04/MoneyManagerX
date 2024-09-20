using MassTransit.ConsumeConfigurators;
using MassTransit.Definition;
using MassTransit;
using GreenPipes;

namespace MMX.Common.Decorators
{
    public class MmxConsumerDefinition<TMessage, THandler> : ConsumerDefinition<THandler>
        where TMessage : class
        where THandler : class, IConsumer<TMessage>
    {
        private readonly IServiceProvider serviceProvider;
        private IConsumerConfigurator<THandler> consumerConfigurator;

        protected MmxConsumerDefinition(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        protected override void ConfigureConsumer(IReceiveEndpointConfigurator endpointConfigurator, IConsumerConfigurator<THandler> consumerConfigurator)
        {
            base.ConfigureConsumer(endpointConfigurator, consumerConfigurator);

            this.consumerConfigurator = consumerConfigurator;
        }

        protected void AddValidator<TValidator, TPayload>(Func<TMessage, TPayload> payloadProvider)
            where TValidator : Validator<TPayload>
            where TPayload : class
        {
            AddValidator<TValidator, TPayload>((serviceProvider, message) => Task.FromResult(payloadProvider(message)));
        }

        protected void AddValidator<TValidator, TPayload>(Func<IServiceProvider, TMessage, Task<TPayload>> payloadProvider)
            where TValidator : Validator<TPayload>
            where TPayload : class
        {
            consumerConfigurator.UseFilter(new ValidationFilter<TMessage, THandler, TValidator, TPayload>(serviceProvider, payloadProvider));
        }
    }
}
