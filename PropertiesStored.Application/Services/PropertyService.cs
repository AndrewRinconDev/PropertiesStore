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
        private readonly IOwnerRepository _ownerRepository;
        private readonly IPropertyImageRepository _propertyImageRepository;
        private readonly IPropertyTraceRepository _propertyTraceRepository;
        private readonly IMapper _mapper;

        public PropertyService(IPropertyRepository propertyRepository, IOwnerRepository ownerRepository, IPropertyImageRepository propertyImageRepository, IPropertyTraceRepository propertyTraceRepository, IMapper mapper)
        {
            _propertyRepository = propertyRepository;
            _ownerRepository = ownerRepository;
            _propertyImageRepository = propertyImageRepository;
            _propertyTraceRepository = propertyTraceRepository;
            _mapper = mapper;
        }

        public async Task<PropertyListDto> GetAllPropertiesAsync(int page, int pageSize)
        {
            var (properties, totalCount) = await _propertyRepository.GetPropertiesAsync(page, pageSize);
            var propertyDtos = await MapPropertiesToDtos(properties);

            return new PropertyListDto
            {
                Properties = propertyDtos,
                Pagination = new PaginationDto
                {
                    Page = page,
                    PageSize = pageSize,
                    TotalCount = totalCount
                }
            };
        }

        public async Task<PropertyListDto> GetFilteredPropertiesAsync(
            string name,
            string address,
            decimal? minPrice,
            decimal? maxPrice,
            int page,
            int pageSize)
        {
            var (properties, totalCount) = await _propertyRepository.GetFilteredPropertiesAsync(
                name, address, minPrice, maxPrice, page, pageSize);

            var propertyDtos = await MapPropertiesToDtos(properties);

            return new PropertyListDto
            {
                Properties = propertyDtos,
                Pagination = new PaginationDto
                {
                    Page = page,
                    PageSize = pageSize,
                    TotalCount = totalCount
                }
            };
        }

        public async Task<PropertyDto?> GetPropertyByIdAsync(string id)
        {
            var property = await _propertyRepository.GetPropertyByIdAsync(id);
            if (property == null) return null;

            return await MapPropertyToDto(property);
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


        private async Task<IEnumerable<PropertyDto>> MapPropertiesToDtos(IEnumerable<Property> properties)
        {
            var dtos = new List<PropertyDto>();

            foreach (var property in properties)
            {
                var dto = await MapPropertyToDto(property);

                dtos.Add(dto);
            }

            return dtos;
        }

        private async Task<PropertyDto> MapPropertyToDto(Property property)
        {
            var dto = _mapper.Map<PropertyDto>(property);

            if (!string.IsNullOrEmpty(property.IdOwner))
            {
                var owner = await _ownerRepository.GetOwnerByIdOwnerAsync(property.IdOwner);
                if (owner != null)
                {
                    dto.Owner = _mapper.Map<OwnerDto>(owner);
                }
            }

            var images = await _propertyImageRepository.GetImagesByPropertyIdAsync(property.IdProperty);
            dto.Images = _mapper.Map<List<PropertyImageDto>>(images);

            var traces = await _propertyTraceRepository.GetTracesByPropertyIdAsync(property.IdProperty);
            dto.Traces = _mapper.Map<List<PropertyTraceDto>>(traces);

            return dto;
        }

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
