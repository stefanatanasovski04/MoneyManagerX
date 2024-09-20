namespace MMX.Common.Exceptions
{
    using System.Net;

    public class MmxInternalServerErrorException : MmxApiException
    {
        private const HttpStatusCode ExceptionStatusCode = HttpStatusCode.NotFound;

        public MmxInternalServerErrorException(string message) : base(ExceptionStatusCode, message)
        {
        }
    }
}
