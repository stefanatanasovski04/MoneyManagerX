namespace MMX.Common.Contracts
{
    using Newtonsoft.Json;

    public class Envelope : EnvelopeGeneric<string>
    {
        [JsonConstructor]
        protected Envelope(string error) : base(null, error)
        {
        }

        public static EnvelopeGeneric<T> CreateOk<T>(T result)
        {
            return new EnvelopeGeneric<T>(result, null);
        }

        public static Envelope CreateOk()
        {
            return new Envelope(null);
        }

        public static EnvelopeGeneric<T> CreateError<T>(string error)
        {
            return new EnvelopeGeneric<T>(default(T), error);
        }

        public static Envelope CreateError(string error)
        {
            return new Envelope(error);
        }

        public static EnvelopeGeneric<T> CreateEmpty<T>()
        {
            return new EnvelopeGeneric<T>(default(T), null);
        }
    }
}
