namespace MMX.Common.Decorators
{
    using System.Threading.Tasks;

    public abstract class Validator<TPayload>
    {
        public abstract Task Validate(TPayload payload);
    }
}
