using Microsoft.Extensions.DependencyInjection;
using PropertiesStored.Application.Interfaces;
using PropertiesStored.Application.Mappings;
using PropertiesStored.Application.Services;

namespace PropertiesStore.Application.ServiceExtensions
{
    public static class ApplicationServices
    {
        /// <summary>
        /// Registers all application-level services with scoped lifetime.
        /// </summary>
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            return services.AddScoped<IPropertyService, PropertyService>();
        }

        /// <summary>
        /// Configures AutoMapper to scan and register all profiles in the Application layer.
        /// </summary>
        public static IServiceCollection ConfigureAutoMapper(this IServiceCollection services)
        {
            // Fix: Use a lambda to configure AutoMapper with the profile
            services.AddAutoMapper(cfg => cfg.AddProfile<AutoMapperProfile>());
            return services;
        }
    }
}
