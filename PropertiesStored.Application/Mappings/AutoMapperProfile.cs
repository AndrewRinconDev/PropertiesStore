using AutoMapper;
using PropertiesStore.Core.Entities;
using PropertiesStored.Application.DTOs;

namespace PropertiesStored.Application.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Property, PropertyDto>()
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Image.FilePath))
                .ForMember(dest => dest.OwnerName, opt => opt.Ignore()); // Will be populated in service
        }
    }
}
