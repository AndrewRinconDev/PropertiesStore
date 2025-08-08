namespace PropertiesStored.Application.DTOs
{
    public class PropertyListDto
    {
        public IEnumerable<PropertyDto> Properties { get; set; }
        public PaginationDto Pagination { get; set; }
    }
}
