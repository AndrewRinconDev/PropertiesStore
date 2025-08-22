using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PropertiesStore.API.Controllers;
using PropertiesStore.Application.DTOs;
using PropertiesStore.Application.Interfaces;
using Xunit;

namespace PropertiesStore.API.Tests.Controllers
{
    public class PropertiesControllerTests
    {
        private readonly Mock<IPropertyService> _mockPropertyService;
        private readonly PropertiesController _controller;

        public PropertiesControllerTests()
        {
            _mockPropertyService = new Mock<IPropertyService>();
            _controller = new PropertiesController(_mockPropertyService.Object);
        }

        [Fact]
        public async Task GetPropertiesWithDetails_WithValidParameters_ShouldReturnOkResult()
        {
            // Arrange
            var page = 1;
            var pageSize = 10;
            var expectedResult = CreateSamplePropertyWithDetailsListDto(page, pageSize, 25);

            _mockPropertyService
                .Setup(x => x.GetPropertiesWithDetailsAsync(page, pageSize))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.GetPropertiesWithDetails(page, pageSize);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var returnedDto = okResult.Value.Should().BeOfType<PropertyWithDetailsListDto>().Subject;
            
            returnedDto.Should().BeEquivalentTo(expectedResult);
            returnedDto.Properties.Should().HaveCount(5);
            returnedDto.Pagination.Page.Should().Be(page);
            returnedDto.Pagination.PageSize.Should().Be(pageSize);

            _mockPropertyService.Verify(x => x.GetPropertiesWithDetailsAsync(page, pageSize), Times.Once);
        }

        [Fact]
        public async Task GetPropertiesWithDetails_WithDefaultParameters_ShouldUseDefaultValues()
        {
            // Arrange
            var expectedResult = CreateSamplePropertyWithDetailsListDto(1, 10, 15);

            _mockPropertyService
                .Setup(x => x.GetPropertiesWithDetailsAsync(1, 10))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.GetPropertiesWithDetails();

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var returnedDto = okResult.Value.Should().BeOfType<PropertyWithDetailsListDto>().Subject;
            
            returnedDto.Should().BeEquivalentTo(expectedResult);

            _mockPropertyService.Verify(x => x.GetPropertiesWithDetailsAsync(1, 10), Times.Once);
        }

        [Fact]
        public async Task GetFilteredProperties_WithValidFilters_ShouldReturnOkResult()
        {
            // Arrange
            var page = 1;
            var pageSize = 10;
            var name = "Test Property";
            var address = "Test Address";
            var minPrice = 100000m;
            var maxPrice = 500000m;
            var expectedResult = CreateSamplePropertyListDto(page, pageSize, 3);

            _mockPropertyService
                .Setup(x => x.GetFilteredPropertiesAsync(name, address, minPrice, maxPrice, page, pageSize))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.GetFilteredProperties(name, address, minPrice, maxPrice, page, pageSize);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var returnedDto = okResult.Value.Should().BeOfType<PropertyListDto>().Subject;
            
            returnedDto.Should().BeEquivalentTo(expectedResult);

            _mockPropertyService.Verify(x => x.GetFilteredPropertiesAsync(name, address, minPrice, maxPrice, page, pageSize), Times.Once);
        }

        [Fact]
        public async Task GetFilteredProperties_WithNullFilters_ShouldReturnOkResult()
        {
            // Arrange
            var page = 1;
            var pageSize = 10;
            var expectedResult = CreateSamplePropertyListDto(page, pageSize, 10);

            _mockPropertyService
                .Setup(x => x.GetFilteredPropertiesAsync(null, null, null, null, page, pageSize))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.GetFilteredProperties(null, null, null, null, page, pageSize);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var returnedDto = okResult.Value.Should().BeOfType<PropertyListDto>().Subject;
            
            returnedDto.Should().BeEquivalentTo(expectedResult);

            _mockPropertyService.Verify(x => x.GetFilteredPropertiesAsync(null, null, null, null, page, pageSize), Times.Once);
        }

        [Fact]
        public async Task GetPropertyById_WithValidId_ShouldReturnOkResult()
        {
            // Arrange
            var propertyId = "507f1f77bcf86cd799439011";
            var expectedProperty = CreateSamplePropertyDto(propertyId);

            _mockPropertyService
                .Setup(x => x.GetPropertyByIdAsync(propertyId))
                .ReturnsAsync(expectedProperty);

            // Act
            var result = await _controller.GetPropertyById(propertyId);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var returnedProperty = okResult.Value.Should().BeOfType<PropertyDto>().Subject;
            
            returnedProperty.Should().BeEquivalentTo(expectedProperty);
            returnedProperty.Id.Should().Be(propertyId);

            _mockPropertyService.Verify(x => x.GetPropertyByIdAsync(propertyId), Times.Once);
        }

        [Fact]
        public async Task GetPropertyById_WithInvalidId_ShouldReturnNotFound()
        {
            // Arrange
            var invalidId = "invalid-id";

            _mockPropertyService
                .Setup(x => x.GetPropertyByIdAsync(invalidId))
                .ReturnsAsync((PropertyDto?)null);

            // Act
            var result = await _controller.GetPropertyById(invalidId);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            _mockPropertyService.Verify(x => x.GetPropertyByIdAsync(invalidId), Times.Once);
        }

        [Fact]
        public async Task GetAllProperties_WithValidParameters_ShouldReturnOkResult()
        {
            // Arrange
            var page = 1;
            var pageSize = 10;
            var expectedResult = CreateSamplePropertyListDto(page, pageSize, 25);

            _mockPropertyService
                .Setup(x => x.GetAllPropertiesAsync(page, pageSize))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.GetAllProperties(page, pageSize);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var returnedDto = okResult.Value.Should().BeOfType<PropertyListDto>().Subject;
            
            returnedDto.Should().BeEquivalentTo(expectedResult);
            returnedDto.Properties.Should().HaveCount(5);
            returnedDto.Pagination.Page.Should().Be(page);
            returnedDto.Pagination.PageSize.Should().Be(pageSize);

            _mockPropertyService.Verify(x => x.GetAllPropertiesAsync(page, pageSize), Times.Once);
        }

        [Fact]
        public async Task GetAllProperties_WithDefaultParameters_ShouldUseDefaultValues()
        {
            // Arrange
            var expectedResult = CreateSamplePropertyListDto(1, 10, 15);

            _mockPropertyService
                .Setup(x => x.GetAllPropertiesAsync(1, 10))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.GetAllProperties();

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var returnedDto = okResult.Value.Should().BeOfType<PropertyListDto>().Subject;
            
            returnedDto.Should().BeEquivalentTo(expectedResult);

            _mockPropertyService.Verify(x => x.GetAllPropertiesAsync(1, 10), Times.Once);
        }

        #region Helper Methods

        private static PropertyWithDetailsListDto CreateSamplePropertyWithDetailsListDto(int page, int pageSize, int totalCount)
        {
            var properties = new List<PropertyWithDetailsDto>();
            for (int i = 1; i <= Math.Min(5, totalCount); i++)
            {
                properties.Add(CreateSamplePropertyWithDetailsDto($"507f1f77bcf86cd7994390{i:D2}"));
            }

            return new PropertyWithDetailsListDto
            {
                Properties = properties,
                Pagination = new PaginationDto
                {
                    Page = page,
                    PageSize = pageSize,
                    TotalCount = totalCount
                }
            };
        }

        private static PropertyListDto CreateSamplePropertyListDto(int page, int pageSize, int totalCount)
        {
            var properties = new List<PropertyDto>();
            for (int i = 1; i <= Math.Min(5, totalCount); i++)
            {
                properties.Add(CreateSamplePropertyDto($"507f1f77bcf86cd7994390{i:D2}"));
            }

            return new PropertyListDto
            {
                Properties = properties,
                Pagination = new PaginationDto
                {
                    Page = page,
                    PageSize = pageSize,
                    TotalCount = totalCount
                }
            };
        }

        private static PropertyWithDetailsDto CreateSamplePropertyWithDetailsDto(string id)
        {
            var index = id.Substring(id.Length - 2);
            return new PropertyWithDetailsDto
            {
                Id = id,
                IdProperty = $"PROP{index}",
                Name = $"Test Property {index}",
                Address = $"Test Address {index}",
                Price = 100000 + (int.Parse(index) * 50000),
                CodeInternal = $"CODE{index}",
                Year = 2020 + int.Parse(index),
                IdOwner = $"OWNER{index}",
                Owner = new OwnerDto
                {
                    IdOwner = $"OWNER{index}",
                    Name = $"Test Owner {index}",
                    Address = $"Owner Address {index}",
                    Photo = $"photo{index}.jpg"
                },
                Images = new List<PropertyImageDto>(),
                Traces = new List<PropertyTraceDto>()
            };
        }

        private static PropertyDto CreateSamplePropertyDto(string id)
        {
            var index = id.Substring(id.Length - 2);
            return new PropertyDto
            {
                Id = id,
                IdProperty = $"PROP{index}",
                Name = $"Test Property {index}",
                Address = $"Test Address {index}",
                Price = 100000 + (int.Parse(index) * 50000),
                CodeInternal = $"CODE{index}",
                Year = 2020 + int.Parse(index),
                IdOwner = $"OWNER{index}",
                Owner = new OwnerDto
                {
                    IdOwner = $"OWNER{index}",
                    Name = $"Test Owner {index}",
                    Address = $"Owner Address {index}",
                    Photo = $"photo{index}.jpg"
                }
            };
        }

        #endregion
    }
}

