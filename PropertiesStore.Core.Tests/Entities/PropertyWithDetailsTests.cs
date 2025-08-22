using FluentAssertions;
using PropertiesStore.Core.Entities;
using Xunit;

namespace PropertiesStore.Core.Tests.Entities
{
    public class PropertyWithDetailsTests
    {
        [Fact]
        public void PropertyWithDetails_ShouldInitializeCollections()
        {
            // Act
            var property = new PropertyWithDetails();

            // Assert
            property.Images.Should().NotBeNull();
            property.Traces.Should().NotBeNull();
            property.Owner.Should().NotBeNull();
        }

        [Fact]
        public void PropertyWithDetails_ShouldSetPropertiesCorrectly()
        {
            // Arrange
            var id = "507f1f77bcf86cd799439011";
            var idProperty = "PROP001";
            var name = "Test Property";
            var address = "Test Address";
            var price = 250000m;
            var codeInternal = "CODE001";
            var year = 2020;
            var idOwner = "OWNER001";

            // Act
            var property = new PropertyWithDetails
            {
                Id = id,
                IdProperty = idProperty,
                Name = name,
                Address = address,
                Price = price,
                CodeInternal = codeInternal,
                Year = year,
                IdOwner = idOwner
            };

            // Assert
            property.Id.Should().Be(id);
            property.IdProperty.Should().Be(idProperty);
            property.Name.Should().Be(name);
            property.Address.Should().Be(address);
            property.Price.Should().Be(price);
            property.CodeInternal.Should().Be(codeInternal);
            property.Year.Should().Be(year);
            property.IdOwner.Should().Be(idOwner);
        }

        [Fact]
        public void PropertyWithDetails_ShouldHandleOwnerDetails()
        {
            // Arrange
            var owner = new Owner
            {
                Id = "507f1f77bcf86cd799439012",
                IdOwner = "OWNER001",
                Name = "Test Owner",
                Address = "Owner Address",
                Photo = "photo.jpg",
                Birthday = DateTime.Now.AddYears(-30)
            };

            // Act
            var property = new PropertyWithDetails
            {
                Owner = owner
            };

            // Assert
            property.Owner.Should().NotBeNull();
            property.Owner.Id.Should().Be(owner.Id);
            property.Owner.Name.Should().Be(owner.Name);
            property.Owner.Address.Should().Be(owner.Address);
        }

        [Fact]
        public void PropertyWithDetails_ShouldHandleImagesAndTraces()
        {
            // Arrange
            var images = new List<PropertyImage>
            {
                new PropertyImage { Id = "1", IdProperty = "PROP001", File = "image1.jpg", Enabled = true },
                new PropertyImage { Id = "2", IdProperty = "PROP001", File = "image2.jpg", Enabled = false }
            };

            var traces = new List<PropertyTrace>
            {
                new PropertyTrace { Id = "1", IdProperty = "PROP001", DateSale = DateTime.Now, Name = "Buyer 1", Value = 250000m, Tax = 5000m },
                new PropertyTrace { Id = "2", IdProperty = "PROP001", DateSale = DateTime.Now.AddDays(-30), Name = "Buyer 2", Value = 240000m, Tax = 4800m }
            };

            // Act
            var property = new PropertyWithDetails
            {
                Images = images,
                Traces = traces
            };

            // Assert
            property.Images.Should().HaveCount(2);
            property.Traces.Should().HaveCount(2);
            property.Images[0].File.Should().Be("image1.jpg");
            property.Traces[0].Name.Should().Be("Buyer 1");
        }

        [Fact]
        public void PropertyWithDetails_ShouldHandleNullValuesGracefully()
        {
            // Act
            var property = new PropertyWithDetails();

            // Assert
            property.Id.Should().BeEmpty();
            property.IdProperty.Should().BeEmpty();
            property.Name.Should().BeEmpty();
            property.Address.Should().BeEmpty();
            property.CodeInternal.Should().BeEmpty();
            property.IdOwner.Should().BeEmpty();
            property.Price.Should().Be(0);
            property.Year.Should().Be(0);
        }
    }
}

