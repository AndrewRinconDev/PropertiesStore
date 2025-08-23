# PropertiesStore

## Project Description

PropertiesStore is a modern web application for managing and displaying real estate properties. The project includes a Next.js frontend with React and a .NET Core backend API with MongoDB as the database.

### Main Features

- **Property Management**: Display, filtering, and search of real estate properties
- **Pagination System**: Efficient navigation with records per page selector (3, 5, 10, 25, 50)
- **Advanced Filters**: Search by name, address, price range
- **Responsive Design**: Adaptive interface for different devices
- **Image Gallery**: Property image display with optimized component
- **Modular Architecture**: Code organized in reusable components and custom hooks

## Technologies Used

### Frontend
- **Next.js 15.1.5** - React framework for web applications
- **React 19** - User interface library
- **TypeScript 5** - JavaScript superset with static typing
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Jest + React Testing Library** - Unit testing and component testing

### Backend
- **.NET 8** - Microsoft development framework
- **MongoDB** - NoSQL document-oriented database
- **Entity Framework Core** - .NET ORM
- **Swagger/OpenAPI** - API documentation

### Development Tools
- **ESLint** - JavaScript/TypeScript linter
- **PostCSS** - CSS processor
- **Jest** - Testing framework

## Prerequisites

### Required Software
- **Node.js 18+** - JavaScript runtime
- **npm 9+** - Node.js package manager
- **.NET 8 SDK** - .NET development SDK
- **MongoDB 6+** - MongoDB database
- **Git** - Version control

### Recommended Versions
- Node.js: 22.14.0
- npm: 10.9.2
- .NET: 8.0.x
- MongoDB: 6.0+

## Installation and Configuration

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PropertiesStore
```

### 2. Configure the Database

1. Make sure MongoDB is running
2. Create a database called `PropertiesStore`
3. Execute the seed scripts in the specified order

#### Create Database
Create a Database called **PropertiesStore**

#### Import Database Data

The initialization scripts are located in `PropertiesStore.Infrastructure/Scripts/` and first you need to create each collection called as the file name without the extension, for example de firs collection should be call **Owners** and must be imported in the following order:

1. **Owners.json** - Owner data
2. **Properties.json** - Property data
3. **PropertyImages.json** - Property images
4. **PropertyTraces.json** - Property traceability

### 3. Configure the Backend

```bash
cd PropertiesStore.API
dotnet restore
dotnet build
```

#### Connection Configuration

Edit `appsettings.json` or `appsettings.Development.json` to configure the MongoDB connection:

```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "PropertiesStore"
  }
}
```

### 4. Configure the Frontend

```bash
cd PropertiesStored.Frontend
npm install
```

## Project Execution

### 1. Start the Backend

```bash
cd PropertiesStore.API
dotnet run
```

The API will be available at:
- **Main URL**: https://localhost:7001
- **Swagger UI**: https://localhost:7001/swagger

### 2. Start the Frontend

```bash
cd PropertiesStored.Frontend
npm run dev
```

The frontend will be available at:
- **URL**: http://localhost:3000

### 3. Verify the Application

1. Open http://localhost:3000 in your browser
2. Verify that properties load correctly
3. Test the filtering and pagination functionality
4. Navigate to property details

### Preview

#### Home

<img width="1909" height="766" alt="Screenshot_3" src="https://github.com/user-attachments/assets/2103e2b7-dfb9-4503-9687-e8281f15e76f" />

#### Detail

<img width="1617" height="847" alt="Screenshot_4" src="https://github.com/user-attachments/assets/05e448c5-1779-49c8-9ac1-3c0cd95e2f4d" />


## Testing

### Run Unit Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific tests
npm test -- --testPathPattern="pagination"
```

### Available Tests

- **Components**: Unit tests for all React components
- **Hooks**: Tests for custom hooks (useProperties)
- **Utilities**: Tests for utility functions
- **Services**: Tests for API services

## Available Scripts

### Frontend (PropertiesStored.Frontend)

```json
{
  "dev": "next dev",           // Local development
  "build": "next build",       // Production build
  "start": "next start",       // Production server
  "lint": "next lint",         // Code linting
  "test": "jest --config ./jest.config.js"  // Unit tests
}
```

### Backend (PropertiesStore.API)

```bash
dotnet run          # Run in development
dotnet build        # Compile the project
dotnet test         # Run backend tests
```

## Project Structure

```
PropertiesStore/
├── PropertiesStored.Frontend/          # Next.js Frontend
│   ├── src/
│   │   ├── app/                        # Pages and components
│   │   ├── core/                       # Hooks, utilities and base components
│   │   └── __mocks__/                  # Testing mocks
│   ├── jest.config.js                  # Jest configuration
│   └── package.json
├── PropertiesStore.API/                 # .NET Core API
│   ├── Controllers/                     # API controllers
│   ├── Program.cs                       # Entry point
│   └── appsettings.json                # Configuration
├── PropertiesStore.Infrastructure/      # Infrastructure layer
│   ├── Scripts/                         # Database scripts
│   ├── Repositories/                    # Data repositories
│   └── Services/                        # Infrastructure services
└── PropertiesStore.Application/          # Application logic
```
