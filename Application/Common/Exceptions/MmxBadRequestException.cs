namespace MMX.Common.Exceptions
{
    using System.Net;

    public class MmxBadRequestException : MmxApiException
    {
        private const HttpStatusCode ExceptionStatusCode = HttpStatusCode.BadRequest;

        public MmxBadRequestException(string message) : base(ExceptionStatusCode, message)
        {
        }
    }
}
