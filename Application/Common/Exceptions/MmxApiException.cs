namespace MMX.Common.Exceptions
{
    using System.Net;
    using System.Runtime.Serialization;

    public abstract class MmxApiException : Exception
    {
        public HttpStatusCode StatusCode { get; private set; }

        protected MmxApiException(HttpStatusCode statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }

        protected MmxApiException(HttpStatusCode statusCode, string message, Exception innerException) : base(message, innerException)
        {
            StatusCode = statusCode;
        }

        protected MmxApiException(HttpStatusCode statusCode, SerializationInfo info, StreamingContext context) : base(info, context)
        {
            StatusCode = statusCode;
        }
    }
}
