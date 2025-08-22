using AutoMapper;
using PropertiesStore.Core.Entities;
using PropertiesStore.Application.DTOs;

namespace PropertiesStore.Application.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Property, PropertyDto>()
                .ForMember(dest => dest.Owner, opt => opt.Ignore())
                .ForMember(dest => dest.Images, opt => opt.Ignore())
                .ForMember(dest => dest.Traces, opt => opt.Ignore());

            CreateMap<PropertyImage, PropertyImageDto>();
            CreateMap<PropertyTrace, PropertyTraceDto>();
            CreateMap<Owner, OwnerDto>();
            
            CreateMap<PropertyWithDetails, PropertyWithDetailsDto>();
        }
    }
}
