# Cloud Infrastructure Monitoring

## Overview

This project is a multi-platform cloud monitoring and protection system built on AWS. It enables users to monitor, manage, and secure virtual machines (EC2 instances) through:

- Web Application (React + TypeScript)
- iOS Application (React Native)
- Android Application (React Native)

The system monitors two EC2 instances:
- Web Server
- Database Server

The backend communicates with AWS services using AWS APIs and exposes a unified API contract defined with OpenAPI.

---

## System Architecture

### High-Level Architecture

```
┌────────────────────────────┐
│        Web (React)         │
├────────────────────────────┤
│   Mobile (React Native)    │
│   iOS + Android Apps       │
└──────────────┬─────────────┘
               │
        HTTPS (JWT Auth)
               │
    ┌──────────▼──────────┐
    │   Backend API Layer  │
    │ (OpenAPI Spec Based) │
    └──────────┬──────────┘
               │
  ┌────────────┼────────────┐
  │            │            │
AWS EC2    CloudWatch   IAM / Auth
```

---

## Architecture Components

### 1. Frontend Layer

#### Web Application
- React + TypeScript
- React Router
- Environment-based API configuration
- TanStack Query for data fetching
- Role-based UI rendering

#### Mobile Applications
- React Native + TypeScript
- One shared mobile codebase for:
  - iOS (built with Xcode)
  - Android (built with Android Studio)
- Secure token storage
- Native navigation
- Charts for metrics

All frontend platforms:
- Consume the same backend API
- Use the same OpenAPI-generated TypeScript client
- Enforce role-based access in the UI

### 2. Backend Layer

The backend acts as a secure control plane between clients and AWS.

#### Responsibilities
- Authenticate users
- Enforce role-based access control (RBAC)
- Call AWS services via AWS SDK
- Expose REST endpoints defined by OpenAPI

#### Core AWS Integrations
- EC2 (start, stop, reboot, status)
- CloudWatch (CPU, memory, alarms)
- IAM (secure credential handling)

### 3. Infrastructure Monitoring Scope

The system monitors:

#### EC2 Instance State
- Running
- Stopped
- Pending
- Terminated

#### Resource Metrics
- CPU Utilization
- Network In / Out
- Memory (if configured via CloudWatch Agent)

#### Protection Features
- Alarm monitoring

---

## Development Strategy

### Monorepo Structure (Recommended)

```
/apps
  /web
  /mobile
/packages
  /api-client
  /shared
```

#### Shared Components
- OpenAPI-generated TypeScript client
- Shared types and models
- Business logic utilities
- Auth helpers

#### Platform-Specific
- Web routing and layout
- Mobile navigation
- Push notifications
- Native permissions

---

## Git Workflow & Branching

### Branch Naming Convention

- `main` – Production-ready code
- `develop` – Integration branch for features
- `feature/<name>` – New features
- `bugfix/<name>` – Bug fixes


### Creating a Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Committing Changes

Use descriptive commit messages following conventional commits:

```bash
git add .
git commit -m "feat: add EC2 instance monitoring dashboard"
git commit -m "fix: resolve JWT token expiration issue"
git commit -m "docs: update installation instructions"
```

### Pushing & Pull Requests

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub:
- Link related issues
- Describe changes clearly
- Request at least one reviewer
- Ensure CI/CD passes before merging

### Merging Strategy

- Squash commits for feature branches
- Merge `develop` into `main` for releases only
- Delete branch after merging

---

## Authentication & Security

- JWT-based authentication
- Role-based access:
  - Viewer (read-only)
  - Operator (start/stop/reboot)
  - Admin (terminate, manage alarms)
- No AWS credentials stored on client
- All AWS calls handled server-side

---

## Environment Configuration

### Web Environment Variables

```
VITE_API_URL=http://localhost:8080
```

**Production:**

```
VITE_API_URL=https://api.production-url.com
```

Mobile environment uses secure runtime configuration.

---

## Project Goals

- Demonstrate use of AWS APIs for infrastructure management
- Build cross-platform client applications
- Implement secure system design
- Provide real-time cloud infrastructure monitoring
- Include protection mechanisms beyond simple monitoring

---

## Why This Architecture?

This architecture allows:
- Code reuse across platforms
- Clear separation of concerns
- Secure AWS integration
- Scalable backend control
- Consistent user experience across devices
- Reduced duplication compared to three fully separate native apps

