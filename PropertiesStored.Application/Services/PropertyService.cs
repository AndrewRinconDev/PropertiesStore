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
        private readonly IMapper _mapper;

        public PropertyService(IPropertyRepository propertyRepository, IOwnerRepository ownerRepository, IMapper mapper)
        {
            _propertyRepository = propertyRepository;
            _ownerRepository = ownerRepository;
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

        public async Task<PropertyDto> GetPropertyByIdAsync(string id)
        {
            var property = await _propertyRepository.GetPropertyByIdAsync(id);
            if (property == null) return null;

            var dto = _mapper.Map<PropertyDto>(property);

            if (!string.IsNullOrEmpty(property.IdOwner))
            {
                var owner = await _ownerRepository.GetOwnerByOwnerIdAsync(property.IdOwner);
                if (owner != null)
                {
                    dto.OwnerName = owner.Name;
                }
            }

            return dto;
        }

        private async Task<IEnumerable<PropertyDto>> MapPropertiesToDtos(IEnumerable<Property> properties)
        {
            var dtos = new List<PropertyDto>();

            foreach (var property in properties)
            {
                var dto = _mapper.Map<PropertyDto>(property);

                if (!string.IsNullOrEmpty(property.IdOwner))
                {
                    var owner = await _ownerRepository.GetOwnerByOwnerIdAsync(property.IdOwner);
                    if (owner != null)
                    {
                        dto.OwnerName = owner.Name;
                    }
                }

                dtos.Add(dto);
            }

            return dtos;
        }
    }
}
