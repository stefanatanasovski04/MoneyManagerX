namespace MMX.Application.Controllers
{
    using Mainwave.MimeTypes;
    using Microsoft.AspNetCore.Mvc;
    using MMX.Application.Contracts.Responses.Transactions;
    using MMX.Application.Domain.Transactions.List;
    using MMX.Common.Contracts;
    using MMX.Common.Dtos;
    using MMX.Common.Mediator;
    using MMX.Common.ValueObjects.PagingValue;
    using MMX.Common.ValueObjects.SortingValue;
    using Swashbuckle.AspNetCore.Annotations;
    using MMX.Application.Domain.Transactions.GetTransaction;
    using MMX.Application.Domain.Transactions.DeleteTransaction;
    using MMX.Application.Contracts.Requests.Transactions;
    using MMX.Application.Domain.Transactions.CreateTransaction;
    using MMX.Application.Domain.Transactions.UpdateTransaction;

    [ApiController]
    [Route("api/transactions")]
    [Produces(MimeType.Application.Json)]
    [Consumes(MimeType.Application.Json)]
    public class TransactionController
    {
        private readonly IMmxQueryReader queryReader;
        private readonly IMmxCommandExecutor commandExecutor;

        public TransactionController(IMmxQueryReader queryReader, IMmxCommandExecutor commandExecutor)
        {
            this.queryReader = queryReader;
            this.commandExecutor = commandExecutor;
        }

        [SwaggerOperation(Summary = "Retrieve a list of the transactions.", Description = "Returns: List of the transactions.")]
        [SwaggerResponse(StatusCodes.Status200OK, "List retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("")]
        public async Task<EnvelopeGeneric<ListResultDto<TransactionResponse>>> GetTransactions(
            [FromQuery] int? page,
            [FromQuery] int? pageSize,
            [FromQuery] string? order,
            [FromQuery] string? orderBy,
            [FromQuery] DateOnly month,
            [FromQuery] bool yearly)
        {
            Paging paging = RegularPaging.Create(page, pageSize);
            Sorting sorting = Sorting.Create(orderBy, order);
            return await queryReader.Get<TransactionsListQuery, EnvelopeGeneric<ListResultDto<TransactionResponse>>>(new TransactionsListQuery(paging, sorting, month, yearly));
        }

        [SwaggerOperation(Summary = "Retreve a single Transaction.", Description = "Returns: Transaction Cateogry.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Transaction retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("{id:int}")]
        public async Task<EnvelopeGeneric<TransactionResponse>> GetTransaction([FromRoute] int id)
        {
            return await queryReader.Get<GetTransactionQuery, EnvelopeGeneric<TransactionResponse>>(new GetTransactionQuery(id));
        }

        [SwaggerOperation(Summary = "Deletes a Transactions.", Description = "Deletes Transaction by Id.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Transaction deleted successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpDelete("{id:int}")]
        public async Task<VoidResult> DeleteTransaction([FromRoute] int id)
        {
            return await commandExecutor.Execute<DeleteTransactionCommand, VoidResult>(new DeleteTransactionCommand(id));
        }

        [SwaggerOperation(Summary = "Create new Transaction.", Description = "Creates new Transaction.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Transaction created successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpPost("")]
        public async Task<VoidResult> CreateTransaction([FromBody] UpsertTransactionRequest request)
        {
            return await commandExecutor.Execute<CreateTransactionCommand, VoidResult>(
                new CreateTransactionCommand(
                    request.Name,
                    request.CategoryFk,
                    request.Type,
                    request.Amount,
                    request.TransactionDate,
                    request.TransactionTime));
        }

        [SwaggerOperation(Summary = "Update existing Transaction.", Description = "Updates existing Transaction.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Transaction updated successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpPut("{id:int}")]
        public async Task<VoidResult> UpdateTransaction([FromRoute] int id, [FromBody] UpsertTransactionRequest request)
        {
            return await commandExecutor.Execute<UpdateTransactionCommand, VoidResult>(
                new UpdateTransactionCommand(
                    id,
                    request.Name,
                    request.CategoryFk,
                    request.Type,
                    request.Amount,
                    request.TransactionDate,
                    request.TransactionTime));
        }
    }
}
