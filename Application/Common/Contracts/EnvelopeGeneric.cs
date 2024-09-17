namespace MMX.Common.Contracts
{
    using Newtonsoft.Json;

    public class EnvelopeGeneric<T>
    {
        [JsonConstructor]
        protected internal EnvelopeGeneric(T result, string error)
        {
            Result = result;
            Error = error;
        }

        public T Result { get; private set; }

        public string Error { get; private set; }

        public bool IsError
        {
            get
            {
                return !string.IsNullOrWhiteSpace(Error);
            }
        }
    }
}
