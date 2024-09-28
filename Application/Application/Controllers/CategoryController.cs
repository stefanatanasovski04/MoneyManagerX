namespace MMX.Application.Controllers
{
    using Mainwave.MimeTypes;
    using Microsoft.AspNetCore.Mvc;
    using MMX.Application.Contracts.Requests;
    using MMX.Application.Contracts.Requests.Categories;
    using MMX.Application.Contracts.Responses.Categories;
    using MMX.Application.Contracts.Responses.Transactions;
    using MMX.Application.Domain.Categories.CreateCategory;
    using MMX.Application.Domain.Categories.DeleteCateogry;
    using MMX.Application.Domain.Categories.GetCategory;
    using MMX.Application.Domain.Categories.IconsList;
    using MMX.Application.Domain.Categories.List;
    using MMX.Application.Domain.Categories.TransactionsByCategory;
    using MMX.Application.Domain.Categories.UpdateCategory;
    using MMX.Application.Domain.Transactions.List;
    using MMX.Common.Contracts;
    using MMX.Common.Dtos;
    using MMX.Common.Mediator;
    using MMX.Common.ValueObjects.PagingValue;
    using MMX.Common.ValueObjects.SortingValue;
    using MMX.Domain.Enum;
    using Swashbuckle.AspNetCore.Annotations;

    [ApiController]
    [Route("api/categories")]
    [Produces(MimeType.Application.Json)]
    [Consumes(MimeType.Application.Json)]
    public class CategoryController
    {
        private readonly IMmxQueryReader queryReader;
        private readonly IMmxCommandExecutor commandExecutor;

        public CategoryController(IMmxQueryReader queryReader, IMmxCommandExecutor commandExecutor)
        {
            this.queryReader = queryReader;
            this.commandExecutor = commandExecutor;
        }

        [SwaggerOperation(Summary = "Retrieve a list of the categories.", Description = "Returns: List of the categories.")]
        [SwaggerResponse(StatusCodes.Status200OK, "List retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("")]
        public async Task<EnvelopeGeneric<ListResultDto<CategoryResponse>>> GetCategories(
            [FromQuery] int? page,
            [FromQuery] int? pageSize,
            [FromQuery] string? order,
            [FromQuery] string? orderBy,
            [FromQuery] CategoryType? type)
        {
            Paging paging = RegularPaging.Create(page, pageSize);
            Sorting sorting = Sorting.Create(orderBy, order);
            return await queryReader.Get<CategoriesListQuery, EnvelopeGeneric<ListResultDto<CategoryResponse>>>(new CategoriesListQuery(type, paging, sorting));
        }

        [SwaggerOperation(Summary = "Retreve a single Category.", Description = "Returns: Single Cateogry.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Category retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("{id:int}")]
        public async Task<EnvelopeGeneric<CategoryResponse>> GetCategory([FromRoute] int id)
        {
            return await queryReader.Get<GetCategoryQuery, EnvelopeGeneric<CategoryResponse>>(new GetCategoryQuery(id));
        }

        [SwaggerOperation(Summary = "Deletes a Category.", Description = "Deletes Category by Id.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Category deleted successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpDelete("{id:int}")]
        public async Task<VoidResult> DeleteCategory([FromRoute] int id)
        {
            return await commandExecutor.Execute<DeleteCategoryCommand, VoidResult>(new DeleteCategoryCommand(id));
        }

        [SwaggerOperation(Summary = "Create new Category.", Description = "Creates new Cateogry.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Category created successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpPost("")]
        public async Task<VoidResult> CreateCategory([FromBody] UpsertCategoryRequest request)
        {
            return await commandExecutor.Execute<CreateCategoryCommand, VoidResult>(new CreateCategoryCommand(request.Name, request.Type, request.IconFk));
        }

        [SwaggerOperation(Summary = "Update existing Category.", Description = "Updates existing Cateogry.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Category updated successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpPut("{id:int}")]
        public async Task<VoidResult> UpdateCategory([FromRoute] int id, [FromBody] UpsertCategoryRequest request)
        {
            return await commandExecutor.Execute<UpdateCategoryCommand, VoidResult>(
                new UpdateCategoryCommand(id, request.Name, request.Type, request.IconFk));
        }

        [SwaggerOperation(Summary = "Transactions by category.", Description = "Transactions by category.")]
        [SwaggerResponse(StatusCodes.Status200OK, "List retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("{id:int}/transactions")]
        public async Task<EnvelopeGeneric<TransactionsByCategoryResponse>> GetTransactionsByCategory(
            [FromRoute] int id,
            [FromQuery] DateOnly month,
            [FromQuery] bool yearly)
        {
            return await queryReader.Get<GetTransactionsByCategoryQuery, EnvelopeGeneric<TransactionsByCategoryResponse>>(new GetTransactionsByCategoryQuery(id, month, yearly));
        }

        [SwaggerOperation(Summary = "All Icons.", Description = "All Icons")]
        [SwaggerResponse(StatusCodes.Status200OK, "List retrieved successfully.")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Not authenticated.")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Not authorized.")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Some error when generating the response.")]
        [HttpGet("icons")]
        public async Task<EnvelopeGeneric<List<IconResponse>>> GetIcons()
        {
            return await queryReader.Get<GetIconsListQuery, EnvelopeGeneric<List<IconResponse>>>(new GetIconsListQuery());
        }
    }
}
