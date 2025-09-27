# Google OAuth Setup Guide

## 🔐 **Setting Up Google OAuth for InvoiceGenie**

### **Step 1: Create Google OAuth Credentials**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)

### **Step 2: Environment Variables**

Create a `.env.local` file in your project root:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=your-database-url
```

### **Step 3: Generate NextAuth Secret**

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

### **Step 4: Test the Setup**

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/sign-in`
3. Click "Continue with Google"
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you'll be redirected back to your dashboard

### **Step 5: Production Setup**

For production deployment:

1. Update `NEXTAUTH_URL` to your production domain
2. Add production redirect URI in Google Console
3. Update environment variables in your hosting platform

## ✅ **What's Working Now**

- ✅ **Google OAuth Integration** - Users can sign in with Google
- ✅ **NextAuth.js Setup** - Secure session management
- ✅ **Database Schema** - Updated for NextAuth compatibility
- ✅ **Custom Auth Pages** - Beautiful sign-in/sign-up forms
- ✅ **Session Management** - Automatic login/logout
- ✅ **Protected Routes** - Dashboard requires authentication

## 🚀 **Next Steps**

1. Set up your Google OAuth credentials
2. Add the environment variables
3. Test the authentication flow
4. Customize the dashboard for your invoicing features

Your Google OAuth integration is now ready! 🎉
