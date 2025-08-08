using System.Reflection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace PropertiesStore.API.ServiceExtensions
{
    /// <summary>
    /// Extension methods for configuring Swagger in the service collection.
    /// </summary>
    public static class SwaggerExtensions
    {
    /// <summary>
    /// Configures Swagger services.
    /// </summary>
    /// <param name="services">The service collection to add the Swagger configuration to.</param>
    /// <param name="environment">The hosting environment.</param>
    /// <returns>The updated service collection.</returns>
    public static IServiceCollection ConfigureSwagger(this IServiceCollection services, IHostEnvironment environment)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Properties Store API",
                    Version = "v1",
                    Description = "Comprehensive API documentation for Properties Store (v1).",
                    Contact = new OpenApiContact
                    {
                        Name = "Development team",
                        Email = "dev@realestate.com"
                    }
                });
            });

            return services;
        }
}
}
