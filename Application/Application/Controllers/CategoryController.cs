namespace MMX.Application.Controllers
{
    using Mainwave.MimeTypes;
    using Microsoft.AspNetCore.Mvc;
    using MMX.Application.Contracts.Requests;
    using MMX.Application.Contracts.Requests.Categories;
    using MMX.Application.Contracts.Responses.Categories;
    using MMX.Application.Domain.Categories.CreateCategory;
    using MMX.Application.Domain.Categories.DeleteCateogry;
    using MMX.Application.Domain.Categories.GetCategory;
    using MMX.Application.Domain.Categories.List;
    using MMX.Application.Domain.Categories.UpdateCategory;
    using MMX.Common.Contracts;
    using MMX.Common.Contracts.Dtos;
    using MMX.Common.Mediator;
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
        public async Task<EnvelopeGeneric<List<CategoriesListResponse>>> GetCategories([FromQuery] CategoryType type)
        {
            return await queryReader.Get<CategoriesListQuery, EnvelopeGeneric<List<CategoriesListResponse>>>(new CategoriesListQuery(type));
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
    }
}
