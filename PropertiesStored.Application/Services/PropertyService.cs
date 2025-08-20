using AutoMapper;
using PropertiesStore.Core.Entities;
using PropertiesStore.Core.Interfaces;
using PropertiesStored.Application.DTOs;
using PropertiesStored.Application.Interfaces;

namespace PropertiesStored.Application.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _propertyRepository;
        private readonly IMapper _mapper;

        public PropertyService(IPropertyRepository propertyRepository, IMapper mapper)
        {
            _propertyRepository = propertyRepository;
            _mapper = mapper;
        }

        public async Task<PropertyWithDetailsListDto> GetPropertiesWithDetailsAsync(int page, int pageSize)
        {
            var (properties, totalCount) = await _propertyRepository.GetPropertiesWithDetailsAsync(page, pageSize);
            return CreatePropertyWithDetailsListDto(properties, page, pageSize, totalCount);
        }

        public async Task<PropertyWithDetailsListDto> GetFilteredPropertiesWithDetailsAsync(
            string name, string address, decimal? minPrice, decimal? maxPrice, int page, int pageSize)
        {
            var (properties, totalCount) = await _propertyRepository.GetFilteredPropertiesWithDetailsAsync(
                name, address, minPrice, maxPrice, page, pageSize);
            return CreatePropertyWithDetailsListDto(properties, page, pageSize, totalCount);
        }

        public async Task<PropertyWithDetailsDto?> GetPropertyWithDetailsByIdAsync(string id)
        {
            var property = await _propertyRepository.GetPropertyWithDetailsByIdAsync(id);
            return property != null ? _mapper.Map<PropertyWithDetailsDto>(property) : null;
        }

        #region Private Methods
        private PropertyWithDetailsListDto CreatePropertyWithDetailsListDto(IEnumerable<PropertyWithDetails> properties, int page, int pageSize, int totalCount)
        {
            var propertyDtos = _mapper.Map<List<PropertyWithDetailsDto>>(properties);
            return new PropertyWithDetailsListDto
            {
                Properties = propertyDtos,
                Pagination = CreatePaginationDto(page, pageSize, totalCount)
            };
        }

        private static PaginationDto CreatePaginationDto(int page, int pageSize, int totalCount)
        {
            return new PaginationDto
            {
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount
            };
        }

        #endregion
    }
}
