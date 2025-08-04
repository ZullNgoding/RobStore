# Overview

This is a Robux top-up website built as a full-stack web application. The system allows users to purchase Robux (virtual currency for Roblox) through various payment methods. It features user authentication, transaction management, and a modern responsive interface designed to mimic the look and feel of roblox.com.

The application is structured as a monorepo with a React frontend, Express.js backend, and PostgreSQL database, all integrated with Replit's authentication system.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom Roblox-inspired color scheme and responsive design
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with dedicated routes for authentication and transactions
- **Session Management**: Express sessions with PostgreSQL session store for persistent login state
- **Middleware**: Custom logging, JSON parsing, and error handling middleware

## Authentication System
- **Provider**: Replit's OpenID Connect (OIDC) authentication system
- **Strategy**: Passport.js with OpenID Connect strategy for secure user authentication
- **Session Storage**: PostgreSQL-backed sessions with 7-day expiration
- **User Management**: Automatic user creation and updates on login with profile synchronization

## Database Design
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon serverless PostgreSQL with connection pooling
- **Schema Management**: Drizzle migrations with schema-first approach
- **Key Tables**:
  - `users`: User profiles synced with Replit authentication
  - `transactions`: Robux purchase records with status tracking
  - `sessions`: Persistent session storage for authentication

## Transaction Flow
- **Payment Methods**: Support for QRIS, Dana, and GoPay payment systems
- **Package Options**: Predefined Robux packages (80, 400, 800, 1700) with dynamic pricing
- **Status Tracking**: Three-state transaction system (pending → success/failed)
- **Processing**: Simulated payment processing with delayed status updates for demonstration

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL serverless database with connection pooling
- **Authentication**: Replit's OIDC authentication service for user management
- **Session Store**: PostgreSQL-based session persistence using connect-pg-simple

### Frontend Libraries
- **UI Components**: Comprehensive Radix UI component library for accessible interface elements
- **Styling**: Tailwind CSS with PostCSS for responsive design and utility-first styling
- **Icons**: Lucide React for consistent iconography throughout the application

### Backend Dependencies
- **ORM**: Drizzle ORM with Zod integration for type-safe database operations
- **Authentication**: Passport.js with OpenID Connect strategy for secure login flows
- **Validation**: Zod for runtime type checking and data validation across the stack

### Development Tools
- **Build System**: Vite for fast frontend development and optimized production builds
- **Type Checking**: TypeScript with strict configuration for both frontend and backend
- **Code Quality**: ESBuild for backend bundling and TypeScript compilation