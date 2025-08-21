using PropertiesStore.API.ServiceExtensions;
using PropertiesStore.Application.ServiceExtensions;
using PropertiesStore.Infrastructure.ServiceExtensions;
using PropertiesStore.Infrastructure.Settings;
using PropertiesStore.Infrastructure.Data;
using PropertiesStore.Core.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Swagger configuration
builder.Services.ConfigureSwagger(builder.Environment);

// Register MongoDB settings from configuration
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));

// DbContext registration
builder.Services.AddSingleton<IMongoDbContext, MongoDbContext>();

// Repositories registration
builder.Services.AddRepositories();

// Register other services
builder.Services.AddServices();

// Register automapper
builder.Services.ConfigureAutoMapper();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Properties Store API V1");
        c.RoutePrefix = "swagger/"; // Set Swagger UI at the app's root
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
