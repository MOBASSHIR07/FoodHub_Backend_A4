# FoodHub Backend 🍽️

FoodHub is a comprehensive, scalable food delivery platform backend designed to bridge the gap between food providers and customers. Built with a focus on reliability and developer experience, it leverages a modern tech stack to provide seamless order management, real-time status updates, and secure authentication.

## 🚀 Vision

A robust, enterprise-grade backend infrastructure that simplifies the complex logic of food marketplaces, ensuring data integrity and high performance for both small and large-scale operations.

## ✨ Key Features

- **🛡️ Secure Authentication**: Integrated with `Better Auth` for industrial-strength session management, password hashing, and role-based access control.
- **👥 Multi-Role Support**: 
  - **Admin**: Full platform oversight, user management, and category control.
  - **Provider**: Business profile customization, meal listing management (CRUD), and order lifecycle tracking.
  - **Customer**: Browsing meals by category, placing orders, and leaving reviews.
- **🍱 Meal & Category Management**: Dynamic category system with structured meal data, including pricing, availability, and dietary preferences.
- **🛒 Order Tracking Pipeline**: Comprehensive order lifecycle system (PENDING → CONFIRMED → COOKING → DELIVERED).
- **⭐ Review System**: Verified customer feedback mechanism with ratings for individual meals.
- **📊 Database Integrity**: Powered by **Prisma ORM** with **PostgreSQL**, ensuring type-safety and efficient relational data handling.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Auth**: [Better Auth](https://better-auth.com/)
- **Development**: [tsx](https://github.com/esbuild-kit/tsx) for fast development cycles.

## ⚙️ Project Structure

```text
src/
├── modules/
│   ├── auth/       # Authentication logic & Better Auth integration
│   ├── admin/      # Administrative controls and oversight
│   ├── provider/   # Business profile & provider-specific logic
│   ├── meal/       # Menu item management & category logic
│   ├── customer/   # Customer profile & personal preferences
│   ├── orders/     # Order placement and tracking pipeline
│   └── review/     # Feedback and rating system
├── lib/            # Shared utilities and configurations
├── server.ts       # Application entry point
└── config/         # Environment and global constants
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL instance (local or hosted)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd FoodHub_Backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/foodhub_db"
   PORT=3000
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   TRUSTED_AUTH_URL="http://localhost:5000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Prisma Generation**:
   Sync your database schema and generate the Prisma client.
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📜 Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with hot-reload via `tsx`. |
| `npm run build` | Compiles TypeScript code to production-ready JavaScript. |
| `npm run start` | Runs the compiled production build from the `dist` folder. |
| `npm run seed` | Seeds the database with initial/dummy data. |
| `npx prisma studio`| Opens a visual editor for your database. |

## 🔮 Future Scope

- **💳 Payment Integration**: Support for Stripe, PayPal, and local payment gateways (SSLCommerz) for automated transactions.
- **📍 Real-time Tracking**: Implementing WebSockets (Socket.io) for live order tracking from kitchen to doorstep.
- **📱 Push Notifications**: Mobile and web push notifications for order status updates via Firebase Cloud Messaging (FCM).
- **🛵 Rider Management**: A dedicated module for delivery personnel to manage tasks and navigate routes.
- **🤖 AI Recommendations**: Personalized meal suggestions based on customer ordering history and preferences.
- **🌍 Localization**: Full i18n support for multi-language accessibility.
- **📈 Advanced Analytics**: Interactive dashboards for providers to track revenue, popular meals, and customer trends.

---
*Built with ❤️ for the future of food delivery.*
