namespace MMX.Application.Controllers
{
    using Mainwave.MimeTypes;
    using Microsoft.AspNetCore.Mvc;
    using MMX.Application.Contracts.Requests;
    using MMX.Application.Contracts.Responses.Categories;
    using MMX.Application.Contracts.Responses.Dtos;
    using MMX.Application.Contracts.Responses.Transactions;
    using MMX.Application.Domain.Categories.TotalAmountPerCategory;
    using MMX.Application.Domain.Categories.TransactionsByCategory;
    using MMX.Application.Domain.Statistics.YearlyIncomeAndExpense;
    using MMX.Application.Domain.Transactions.TotalIncomeExpense;
    using MMX.Common.Contracts;
    using MMX.Common.Dtos;
    using MMX.Common.Mediator;
    using MMX.Domain.Enum;
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

        [SwaggerOperation(Summary = "Calculate total income", Description = "Returns: Total income.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Income retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("income")]
        public async Task<EnvelopeGeneric<TypeResult<decimal>>> GetTotalIncome([FromQuery] DateOnly date, [FromQuery] bool yearly)
        {
            return await queryReader.Get<CalculateTotalIncomeExpenseQuery, EnvelopeGeneric<TypeResult<decimal>>>(new CalculateTotalIncomeExpenseQuery(TransactionType.Income, date, yearly));
        }

        [SwaggerOperation(Summary = "Calculate total expense", Description = "Returns: Total expense.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Expense retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("expense")]
        public async Task<EnvelopeGeneric<TypeResult<decimal>>> GetTotalExpense([FromQuery] DateOnly date, [FromQuery] bool yearly)
        {
            return await queryReader.Get<CalculateTotalIncomeExpenseQuery, EnvelopeGeneric<TypeResult<decimal>>>(new CalculateTotalIncomeExpenseQuery(TransactionType.Expense, date, yearly));
        }

        [SwaggerOperation(Summary = "Total by category.", Description = "Total by category.")]
        [SwaggerResponse(StatusCodes.Status200OK, "List retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("total-per-cateogry")]
        public async Task<EnvelopeGeneric<List<TotalByCategoryResponse>>> GetTotalByCategory(
            [FromQuery] DateOnly month,
            [FromQuery] bool yearly)
        {
            return await queryReader.Get<GetTotalAmountPerCategoryQuery, EnvelopeGeneric<List<TotalByCategoryResponse>>>(new GetTotalAmountPerCategoryQuery(month, yearly));
        }

        [SwaggerOperation(Summary = "Transactions by category.", Description = "Transactions by category.")]
        [SwaggerResponse(StatusCodes.Status200OK, "List retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("{id:int}/transactions-per-category")]
        public async Task<EnvelopeGeneric<TransactionsByCategoryResponse>> GetTransactionsByCategory(
            [FromRoute] int id,
            [FromQuery] DateOnly month,
            [FromQuery] bool yearly)
        {
            return await queryReader.Get<GetTransactionsByCategoryQuery, EnvelopeGeneric<TransactionsByCategoryResponse>>(new GetTransactionsByCategoryQuery(id, month, yearly));
        }
    }
}
