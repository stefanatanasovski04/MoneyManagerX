namespace MMX.Application.Controllers
{
    using Mainwave.MimeTypes;
    using Microsoft.AspNetCore.Mvc;
    using MMX.Application.Contracts.Responses;
    using MMX.Application.Domain.Categories.List;
    using MMX.Common.Contracts;
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

        public CategoryController(IMmxQueryReader queryReader)
        {
            this.queryReader = queryReader;
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
    }
}
