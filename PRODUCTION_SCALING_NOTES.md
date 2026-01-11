## Production scaling notes (frontend-backend integration)

- **Authentication**
  - Prefer **httpOnly, secure cookies** over localStorage for JWTs to reduce XSS impact.
  - Add **refresh tokens** (rotation) + short-lived access tokens.
  - Add optional **token revocation** (denylist) for immediate logout across devices.

- **API & data contracts**
  - Version your API (`/api/v1`) and keep request/response schemas (OpenAPI or similar).
  - Use shared types (e.g., generated TypeScript client from OpenAPI) to reduce integration bugs.

- **Frontend performance**
  - Split routes (lazy loading) and prefetch critical data for the dashboard.
  - Add caching (React Query / SWR) for `/user/me` and tasks list with background revalidation.

- **Backend scalability**
  - Add rate limiting, request logging, and structured logs (JSON) for observability.
  - Validate inputs strictly, sanitize query params, and avoid regex DoS patterns at scale.
  - Use indexes for common queries (userId + createdAt, completed, etc.).

- **Deployment**
  - Use separate environments (dev/staging/prod) with environment-based configs.
  - Put the API behind a reverse proxy (NGINX) and enable HTTPS everywhere.

