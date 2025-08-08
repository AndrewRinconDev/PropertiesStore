namespace PropertiesStored.Application.DTOs
{
    public class PropertyDto
    {
        public string Id { get; set; }
        public string IdOwner { get; set; }
        public string OwnerName { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
    }
}
