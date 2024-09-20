namespace MMX.Common.ExceptionHandler
{
    using MMX.Common.Contracts;
    using MMX.Common.Exceptions;
    using Newtonsoft.Json;
    using System.Net;

    public class MmxExceptionHandler
    {
        private readonly RequestDelegate next;

        public MmxExceptionHandler(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (MmxApiException e)
            {
                await HandleExceptionAsync(context, e);
            }
            catch (Exception e) when (e.InnerException is MmxApiException)
            {
                await HandleExceptionAsync(context, e.InnerException);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(context, e);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception e)
        {
            string result = JsonConvert.SerializeObject(Envelope.CreateError(e == null ? "Exception was null" : e.Message ?? "Message was null"));
            context.Response.ContentType = "application/json";

            if (e is MmxApiException ex)
            {
                context.Response.StatusCode = (int)ex.StatusCode;
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }

            return context.Response.WriteAsync(result);
        }
    }
}
