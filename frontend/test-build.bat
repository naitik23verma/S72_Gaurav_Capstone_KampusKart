@echo off
echo ========================================
echo Testing Image Loading Fix
echo ========================================
echo.

echo Step 1: Cleaning old build...
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo Done!
echo.

echo Step 2: Building project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    pause
    exit /b 1
)
echo Done!
echo.

echo Step 3: Verifying assets...
call npm run verify-build
if %ERRORLEVEL% NEQ 0 (
    echo Verification failed!
    pause
    exit /b 1
)
echo Done!
echo.

echo Step 4: Checking if images exist in dist...
if exist dist\Logo.png (
    echo [OK] Logo.png found
) else (
    echo [ERROR] Logo.png NOT FOUND!
)

if exist dist\google-icon.svg (
    echo [OK] google-icon.svg found
) else (
    echo [ERROR] google-icon.svg NOT FOUND!
)

if exist dist\login-side.jpg (
    echo [OK] login-side.jpg found
) else (
    echo [ERROR] login-side.jpg NOT FOUND!
)
echo.

echo Step 5: Listing dist folder contents...
dir dist /b
echo.

echo ========================================
echo Build test complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: npm run preview
echo 2. Open: http://localhost:4173
echo 3. Check if images load
echo 4. If yes, deploy to Netlify
echo.
pause
