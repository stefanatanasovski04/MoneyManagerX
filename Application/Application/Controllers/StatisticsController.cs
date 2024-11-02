namespace MMX.Application.Controllers
{
    using Mainwave.MimeTypes;
    using Microsoft.AspNetCore.Mvc;
    using MMX.Application.Contracts.Requests;
    using MMX.Application.Contracts.Responses.Dtos;
    using MMX.Application.Domain.Statistics.YearlyIncomeAndExpense;
    using MMX.Common.Contracts;
    using MMX.Common.Dtos;
    using MMX.Common.Mediator;
    using Swashbuckle.AspNetCore.Annotations;

    [ApiController]
    [Route("api/statistics")]
    [Produces(MimeType.Application.Json)]
    [Consumes(MimeType.Application.Json)]
    public class StatisticsController
    {
        private readonly IMmxQueryReader queryReader;

        public StatisticsController(IMmxQueryReader queryReader)
        {
            this.queryReader = queryReader;
        }

        [SwaggerOperation(Summary = "Retrieve a yearly incomes and expenses by month.", Description = "Returns: Yearly incomes and expenses by month.")]
        [SwaggerResponse(StatusCodes.Status200OK, "List retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("yearly-income-expense")]
        public async Task<EnvelopeGeneric<List<MonthlyIncomeExpenseDto>>> GetYearlyIncomesAndExpensesByMonth([FromQuery] int year)
        {
            return await queryReader.Get<GetYearlyIncomeAndExpenseQuery, EnvelopeGeneric<List<MonthlyIncomeExpenseDto>>>(new GetYearlyIncomeAndExpenseQuery(year));
        }
    }
}
