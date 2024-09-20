namespace MMX.Configurations
{
    using System.Reflection;
    using MassTransit;
    using MMX.Common.Mediator;
    using MMX.Common.Mediator.Contrats;
    using MMX.Common.Mediator.Handlers;

    public static class MassTransitConfiguration
    {
        private static readonly Func<Type, bool> MediatorHandlersFilter =
            (type) => (type.BaseType?.Name?.Contains(nameof(CommandHandler<MmxCommand, object>)) ?? false) ||
                          (type.BaseType?.Name?.Contains(nameof(QueryHandler<MmxQuery, object>)) ?? false);

        public static void AddMediator(this IServiceCollection services)
        {
            Assembly[] handlers = [];
            services.AddMediator(config =>
            {
                config.AddConsumers(MediatorHandlersFilter, handlers);
            });

            services.AddScoped<MmxMediator, MmxMediator>();
            services.AddScoped<IMmxQueryReader, MmxQueryReader>();
            services.AddScoped<IMmxCommandExecutor, MmxCommandExecutor>();
        }
    }
}
