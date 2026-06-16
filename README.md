# MIRAI Tech Academy - Learning Management System (LMS)

A comprehensive Learning Management System for MIRAI Tech Academy, supporting Japanese language courses (JLPT N5-N1) and programming courses (Java, Python, JavaScript, etc.).

## 🏗️ Project Structure

```
mirai-academy-lms/
├── frontend/          # Next.js + TypeScript + Tailwind CSS
├── backend/           # Spring Boot + Java 17
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios

### Backend
- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Security**: Spring Security + JWT
- **ORM**: Spring Data JPA
- **Database**: PostgreSQL (production) / H2 (development)
- **Build Tool**: Maven

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

### Required
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Java JDK** (v17 or higher) - [Download](https://adoptium.net/)
- **Maven** (v3.8 or higher) - Usually included with Java IDEs

### Optional (for production)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Docker** (for containerization)

## 🚀 Getting Started

### 1. Installation

#### Root setup (run frontend and backend together)

```bash
# Install the root helper script
npm install
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Compile the project
mvn clean compile
```

#### Run both frontend and backend together

From the project root:

```bash
npm run dev
```

This starts the backend at `http://localhost:8080` and the frontend at `http://localhost:3000` in parallel.

To verify the backend is running, open:

```bash
http://localhost:8080/api
```

If you prefer separate terminals:

```bash
cd backend && mvn spring-boot:run
```

```bash
cd frontend && npm run dev
```

The frontend will be available at `http://localhost:3000`

The backend API will be available at `http://localhost:8080/api`

### 2. Default Credentials

After the first run, the application creates demo users:

| Role    | Email                        | Password     |
|---------|------------------------------|--------------|
| Admin   | admin@miraiacademy.com       | admin123     |
| Teacher | teacher@miraiacademy.com     | teacher123   |
| Student | student@miraiacademy.com     | student123   |

### 3. Database Configuration

#### Development (H2 Database)
The application uses an in-memory H2 database by default. No additional setup required.

Access H2 Console at: `http://localhost:8080/api/h2-console`
- JDBC URL: `jdbc:h2:mem:academydb`
- Username: `sa`
- Password: (leave blank)

#### Production (PostgreSQL)

1. Create a PostgreSQL database:
```sql
CREATE DATABASE academydb;
CREATE USER academyuser WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE academydb TO academyuser;
```

2. Update `backend/src/main/resources/application.properties`:
```properties
# Comment out H2 settings
# spring.datasource.url=jdbc:h2:mem:academydb
# spring.datasource.driverClassName=org.h2.Driver
# spring.datasource.username=sa
# spring.datasource.password=
# spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
# spring.h2.console.enabled=false

# Uncomment and configure PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/academydb
spring.datasource.username=academyuser
spring.datasource.password=yourpassword
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/{id}` - Get course details
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/{id}` - Update course (Admin only)
- `DELETE /api/courses/{id}` - Delete course (Admin only)

### Batches (Protected)
- `GET /api/batches` - List all batches
- `GET /api/batches/{id}` - Get batch details
- `POST /api/batches` - Create batch (Admin only)

### Users (Admin only)
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user

## 🎯 Key Features

### Phase 1 (Current)
- ✅ Public website with course listings
- ✅ User authentication (JWT)
- ✅ Role-based access (Admin, Staff, Student)
- ✅ Course management
- ✅ Batch management
- ✅ Basic dashboard for each role
- ✅ Admin dashboard displays current user counts for Admin, Staff, and Student roles

### Phase 2 (Planned)
- Attendance tracking
- Payment management
- Assignment submission
- Certificate generation

### Phase 3 (Future)
- AI Japanese Tutor
- AI Coding Assistant
- Placement portal
- Advanced analytics

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
npm run start
```

### Backend
```bash
cd backend
mvn clean package
java -jar target/lms-backend-1.0.0.jar
```

## 🔧 Environment Variables

### Backend (.env or application.properties)
```properties
# JWT Configuration
app.jwt.secret=your-secret-key-here
app.jwt.expiration-ms=86400000

# Email Configuration (for notifications)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for MIRAI Tech Academy. All rights reserved.

## 📞 Support

For support and queries:
- Email: support@miraiacademy.com
- Phone: +81-XX-XXXX-XXXX

---

**Built with ❤️ for MIRAI Tech Academy**