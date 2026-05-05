# Backend Security

## Authentication
- JWT is used for REST and Socket.IO authentication.
- Tokens are signed with JWT_SECRET and expire after 24 hours.
- The auth middleware verifies the token, loads the user, and attaches req.user.

## Authorization
- Admin access is based on ADMIN_EMAILS (comma separated).
- isAdmin is computed in auth middleware and used in routes.

## Input validation and sanitization
- Express Validator validates signup, login, complaints, and lost and found inputs.
- sanitizeInput trims string fields in request bodies.
- Custom Mongo sanitizer strips $ and . from keys in req.body and req.params.

## Rate limiting
- Auth routes and high write volume routes use express-rate-limit to prevent abuse.

## File upload safety
- Images are validated by MIME type and limited to 5MB.
- Attachments use a MIME allow list for the chat module.
- Cloudinary public IDs are stored for later cleanup.

## Cloudinary preset guidance
- If you use a client-side (unsigned) upload preset, ensure it is locked down: restrict uploads to a specific folder, enable allowed formats only, and limit file size and transformations.
- Prefer server-side uploads where possible (the backend already streams uploads to Cloudinary using private API keys).
- Rotate Cloudinary API keys if they were committed accidentally and remove any unsigned presets that allow unrestricted uploads.

## Google Maps API key safety
- Rotate any API keys exposed in the repository immediately.
- Restrict Maps API keys to appropriate referrers (HTTP referrers for browser keys, IPs for server keys, or restrict to specific Android/iOS apps when applicable).
- Use separate keys for development and production and store them in environment variables (see `.env.example`).

## OTP password reset
- OTP is hashed with SHA-256 before storage.
- Timing safe comparison is used to validate OTPs.
- OTPs expire after 15 minutes.

## CORS and headers
- CORS allow list is built from ALLOWED_ORIGINS plus localhost defaults.
- Helmet is enabled for secure HTTP headers.
- HPP is enabled to prevent parameter pollution.

## Error handling
- Centralized error handler logs details and avoids leaking internals in production.
