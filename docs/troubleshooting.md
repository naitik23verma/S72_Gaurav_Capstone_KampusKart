# Troubleshooting

## Backend fails to start
- Check MONGODB_URI and JWT_SECRET are set
- Ensure MongoDB is reachable
- Verify NODE_ENV is not production if required vars are missing

## Google OAuth redirect fails
- Confirm GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Verify BACKEND_URL and FRONTEND_URL are correct
- Check Google OAuth callback URL matches /api/auth/google/callback

## CORS errors
- Add the frontend origin to ALLOWED_ORIGINS
- Ensure the exact scheme and port match

## OTP email not sent
- Configure EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS
- Check email provider app password settings

## Cloudinary upload errors
- Verify Cloudinary env vars
- Ensure file size under 5MB and image mime types

## Chat connection errors
- Confirm SOCKET_URL and API_BASE match backend URL
- Check JWT_SECRET is set and token is valid
- Verify CORS allow list includes frontend origin

## Render cold starts
- Expect 30 to 60 seconds wakeup on free tier
- Keep alive workflow and external monitors reduce cold starts

## Google Maps not loading
- Ensure VITE_GOOGLE_MAPS_API_KEY is set
- Check the API key has Maps JavaScript API enabled
