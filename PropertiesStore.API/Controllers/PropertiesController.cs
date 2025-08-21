using Microsoft.AspNetCore.Mvc;
using PropertiesStored.Application.Interfaces;

namespace PropertiesStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProperties(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await _propertyService.GetAllPropertiesAsync(page, pageSize);

            return Ok(result);
        }

        [HttpGet("filtered")]
        public async Task<IActionResult> GetFilteredProperties(
            [FromQuery] string name,
            [FromQuery] string address,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await _propertyService.GetFilteredPropertiesAsync(
                name, address, minPrice, maxPrice, page, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPropertyById(string id)
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property == null) return NotFound();

            return Ok(property);
        }

        [HttpGet("details")]
        public async Task<IActionResult> GetPropertiesWithDetails(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await _propertyService.GetPropertiesWithDetailsAsync(page, pageSize);
            return Ok(result);
        }
    }
}
