using Microsoft.Extensions.DependencyInjection;
using PropertiesStore.Core.Interfaces;
using PropertiesStore.Infrastructure.Repositories;

namespace PropertiesStore.Infrastructure.ServiceExtensions
{
    public static class RepositoryCollectionExtensions
    {
        /// <summary>
        /// Registers all application-level repositories with scoped lifetime.
        /// </summary>
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            return services
                .AddScoped<IPropertyRepository, PropertyRepository>()
                .AddScoped<IOwnerRepository, OwnerRepository>();
        }
    }
}
