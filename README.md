# Cloud Infrastructure Monitoring

## Overview

This project is a multi-platform cloud monitoring and protection system built on AWS. The repository currently contains:

- Web Application (React + TypeScript) in `apps/web`
- AWS setup/runbook docs in `docs/`

Mobile apps (React Native) and a backend API are planned but are not in this repo yet.

The system monitors two EC2 instances:
- Web Server
- Database Server

The backend communicates with AWS services using AWS APIs and exposes a unified API contract defined with OpenAPI.

---

## Repository Structure (Current)

```
/apps/web                # Web app (React + TypeScript)
/docs
  /aws/sprint1            # AWS setup/runbooks and queries
  /sprint1-dmehta33       # Additional sprint docs
  /templates             # Archived templates (e.g., Vite README)
```

---

## System Architecture (Target)

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

#### Web Application (Implemented)
- React + TypeScript
- React Router
- Environment-based API configuration
- TanStack Query for data fetching (planned)
- Role-based UI rendering

#### Mobile Applications (Planned)
- React Native + TypeScript
- One shared mobile codebase
- iOS (built with Xcode)
- Android (built with Android Studio)
- Secure token storage
- Native navigation
- Charts for metrics

Frontend platforms:
- Consume the same backend API
- Use the same OpenAPI-generated TypeScript client (planned)
- Enforce role-based access in the UI

### 2. Backend Layer (External/Planned)

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

## Development Strategy (Planned Monorepo)

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

- `main` - Production-ready code
- `dev` - Integration branch for features
- `feature/<name>` - New features
- `bugfix/<name>` - Bug fixes

### Creating a Branch

```bash
git checkout dev
git pull origin dev
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
- Merge `dev` into `main` for releases only
- Delete branch after merging

---

## Authentication & Security

- JWT-based authentication
- Role-based access: Viewer (read-only), Operator (start/stop/reboot), Admin (terminate, manage alarms)
- No AWS credentials stored on client
- All AWS calls handled server-side

---

## Environment Configuration

### Web Environment Variables

Create `apps/web/.env`:

```
VITE_API_URL=http://localhost:8080
```
