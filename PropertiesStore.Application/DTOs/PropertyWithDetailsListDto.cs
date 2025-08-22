namespace PropertiesStore.Application.DTOs
{
    public class PropertyWithDetailsListDto
    {
        public List<PropertyWithDetailsDto> Properties { get; set; } = new();
        public PaginationDto Pagination { get; set; }
    }
}
