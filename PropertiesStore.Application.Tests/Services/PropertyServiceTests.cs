using AutoMapper;
using FluentAssertions;
using Moq;
using PropertiesStore.Core.Entities;
using PropertiesStore.Core.Interfaces;
using PropertiesStore.Application.DTOs;
using PropertiesStore.Application.Services;
using Xunit;

namespace PropertiesStore.Application.Tests.Services
{
    public class PropertyServiceTests
    {
        private readonly Mock<IPropertyRepository> _mockPropertyRepository;
        private readonly Mock<IOwnerRepository> _mockOwnerRepository;
        private readonly Mock<IPropertyImageRepository> _mockPropertyImageRepository;
        private readonly Mock<IPropertyTraceRepository> _mockPropertyTraceRepository;
        private readonly Mock<IMapper> _mockMapper;
        private readonly PropertyService _propertyService;

        public PropertyServiceTests()
        {
            _mockPropertyRepository = new Mock<IPropertyRepository>();
            _mockOwnerRepository = new Mock<IOwnerRepository>();
            _mockPropertyImageRepository = new Mock<IPropertyImageRepository>();
            _mockPropertyTraceRepository = new Mock<IPropertyTraceRepository>();
            _mockMapper = new Mock<IMapper>();
            _propertyService = new PropertyService(
                _mockPropertyRepository.Object, 
                _mockOwnerRepository.Object,
                _mockPropertyImageRepository.Object,
                _mockPropertyTraceRepository.Object,
                _mockMapper.Object);
        }

        [Fact]
        public async Task GetPropertiesWithDetailsAsync_ShouldReturnPaginatedResults()
        {
            // Arrange
            var page = 1;
            var pageSize = 10;
            var totalCount = 25;
            var properties = CreateSampleProperties(5);
            var propertyDtos = CreateSamplePropertyWithDetailsDtos(5);

            _mockPropertyRepository
                .Setup(x => x.GetPropertiesWithDetailsAsync(page, pageSize))
                .ReturnsAsync((properties, totalCount));

            _mockMapper
                .Setup(x => x.Map<List<PropertyWithDetailsDto>>(properties))
                .Returns(propertyDtos);

            // Act
            var result = await _propertyService.GetPropertiesWithDetailsAsync(page, pageSize);

            // Assert
            result.Should().NotBeNull();
            result.Properties.Should().HaveCount(5);
            result.Pagination.Should().NotBeNull();
            result.Pagination.TotalCount.Should().Be(totalCount);
            result.Pagination.Page.Should().Be(page);
            result.Pagination.PageSize.Should().Be(pageSize);
            result.Pagination.TotalPages.Should().Be(3); // 25 items / 10 per page = 3 pages

            _mockPropertyRepository.Verify(x => x.GetPropertiesWithDetailsAsync(page, pageSize), Times.Once);
            _mockMapper.Verify(x => x.Map<List<PropertyWithDetailsDto>>(properties), Times.Once);
        }

        [Fact]
        public async Task GetFilteredPropertiesWithDetailsAsync_ShouldReturnFilteredResults()
        {
            // Arrange
            var page = 1;
            var pageSize = 10;
            var name = "Test Property";
            var address = "Test Address";
            var minPrice = 100000m;
            var maxPrice = 500000m;
            var totalCount = 3;
            var properties = CreateSampleProperties(3);
            var propertyDtos = CreateSamplePropertyWithDetailsDtos(3);

            _mockPropertyRepository
                .Setup(x => x.GetFilteredPropertiesWithDetailsAsync(name, address, minPrice, maxPrice, page, pageSize))
                .ReturnsAsync((properties, totalCount));

            _mockMapper
                .Setup(x => x.Map<List<PropertyWithDetailsDto>>(properties))
                .Returns(propertyDtos);

            // Act
            var result = await _propertyService.GetFilteredPropertiesWithDetailsAsync(name, address, minPrice, maxPrice, page, pageSize);

            // Assert
            result.Should().NotBeNull();
            result.Properties.Should().HaveCount(3);
            result.Pagination.TotalCount.Should().Be(totalCount);

            _mockPropertyRepository.Verify(x => x.GetFilteredPropertiesWithDetailsAsync(name, address, minPrice, maxPrice, page, pageSize), Times.Once);
            _mockMapper.Verify(x => x.Map<List<PropertyWithDetailsDto>>(properties), Times.Once);
        }

        [Fact]
        public async Task GetPropertyWithDetailsByIdAsync_WithValidId_ShouldReturnProperty()
        {
            // Arrange
            var propertyId = "507f1f77bcf86cd799439011";
            var property = CreateSampleProperty(propertyId);
            var propertyDto = CreateSamplePropertyWithDetailsDto(propertyId);

            _mockPropertyRepository
                .Setup(x => x.GetPropertyWithDetailsByIdAsync(propertyId))
                .ReturnsAsync(property);

            _mockMapper
                .Setup(x => x.Map<PropertyWithDetailsDto>(property))
                .Returns(propertyDto);

            // Act
            var result = await _propertyService.GetPropertyWithDetailsByIdAsync(propertyId);

            // Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(propertyId);
            result.Name.Should().Be(property.Name);

            _mockPropertyRepository.Verify(x => x.GetPropertyWithDetailsByIdAsync(propertyId), Times.Once);
            _mockMapper.Verify(x => x.Map<PropertyWithDetailsDto>(property), Times.Once);
        }

        [Fact]
        public async Task GetPropertyWithDetailsByIdAsync_WithInvalidId_ShouldReturnNull()
        {
            // Arrange
            var invalidId = "invalid-id";

            _mockPropertyRepository
                .Setup(x => x.GetPropertyWithDetailsByIdAsync(invalidId))
                .ReturnsAsync((PropertyWithDetails?)null);

            // Act
            var result = await _propertyService.GetPropertyWithDetailsByIdAsync(invalidId);

            // Assert
            result.Should().BeNull();

            _mockPropertyRepository.Verify(x => x.GetPropertyWithDetailsByIdAsync(invalidId), Times.Once);
            _mockMapper.Verify(x => x.Map<PropertyWithDetailsDto>(It.IsAny<PropertyWithDetails>()), Times.Never);
        }

        [Theory]
        [InlineData(1, 10, 25, 3)] // 25 items, 10 per page = 3 pages
        [InlineData(1, 5, 12, 3)]  // 12 items, 5 per page = 3 pages
        [InlineData(2, 10, 15, 2)] // 15 items, 10 per page = 2 pages
        [InlineData(1, 20, 5, 1)]  // 5 items, 20 per page = 1 page
        public async Task GetPropertiesWithDetailsAsync_ShouldCalculatePaginationCorrectly(int page, int pageSize, int totalCount, int expectedTotalPages)
        {
            // Arrange
            var properties = CreateSampleProperties(Math.Min(pageSize, totalCount));
            var propertyDtos = CreateSamplePropertyWithDetailsDtos(Math.Min(pageSize, totalCount));

            _mockPropertyRepository
                .Setup(x => x.GetPropertiesWithDetailsAsync(page, pageSize))
                .ReturnsAsync((properties, totalCount));

            _mockMapper
                .Setup(x => x.Map<List<PropertyWithDetailsDto>>(properties))
                .Returns(propertyDtos);

            // Act
            var result = await _propertyService.GetPropertiesWithDetailsAsync(page, pageSize);

            // Assert
            result.Pagination.TotalPages.Should().Be(expectedTotalPages);
            result.Pagination.TotalCount.Should().Be(totalCount);
            result.Pagination.Page.Should().Be(page);
            result.Pagination.PageSize.Should().Be(pageSize);
        }

        #region Helper Methods

        private static List<PropertyWithDetails> CreateSampleProperties(int count)
        {
            var properties = new List<PropertyWithDetails>();
            for (int i = 1; i <= count; i++)
            {
                properties.Add(CreateSampleProperty($"507f1f77bcf86cd7994390{i:D2}"));
            }
            return properties;
        }

        private static PropertyWithDetails CreateSampleProperty(string id)
        {
            var index = id.Substring(id.Length - 2);
            return new PropertyWithDetails
            {
                Id = id,
                IdProperty = $"PROP{index}",
                Name = $"Test Property {index}",
                Address = $"Test Address {index}",
                Price = 100000 + (int.Parse(index) * 50000),
                CodeInternal = $"CODE{index}",
                Year = 2020 + int.Parse(index),
                IdOwner = $"OWNER{index}",
                Owner = new Owner
                {
                    Id = $"507f1f77bcf86cd7994390{index}",
                    IdOwner = $"OWNER{index}",
                    Name = $"Test Owner {index}",
                    Address = $"Owner Address {index}",
                    Photo = $"photo{index}.jpg",
                    Birthday = DateTime.Now.AddYears(-30 - int.Parse(index))
                },
                Images = new List<PropertyImage>(),
                Traces = new List<PropertyTrace>()
            };
        }

        private static List<PropertyWithDetailsDto> CreateSamplePropertyWithDetailsDtos(int count)
        {
            var dtos = new List<PropertyWithDetailsDto>();
            for (int i = 1; i <= count; i++)
            {
                dtos.Add(CreateSamplePropertyWithDetailsDto($"507f1f77bcf86cd7994390{i:D2}"));
            }
            return dtos;
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

        #endregion
    }
}
