namespace MMX.Common.Exceptions
{
    using System.Net;

    public class MmxNotFoundException : MmxApiException
    {
        private const HttpStatusCode ExceptionStatusCode = HttpStatusCode.NotFound;

        public MmxNotFoundException(string message) : base(ExceptionStatusCode, message)
        {
        }
    }
}
