# Supabase Migration Setup for The Horrizon

## Project Reference
- **Project Ref**: `vagqofvhrsahcxcngfmj`
- **Migration**: `20260328_horrizon_schema.sql`

## Option 1: Manual Setup via Supabase Dashboard (Recommended)

### Step 1: Execute the Migration SQL Manually
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: "The Horrizon" (Project Ref: `vagqofvhrsahcxcngfmj`)
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy the contents of `.supabase/migrations/20260328_horrizon_schema.sql`
6. Paste into the SQL editor
7. Click **Run** to execute all migrations

### Step 2: Verify Tables Were Created
1. Go to **Table Editor**
2. Verify these tables exist:
   - `bookings`
   - `packages`
   - `inquiries`
   - `gallery`
   - `events`
   - `testimonials`

### Step 3: Configure Authentication (Google OAuth)
1. Go to **Authentication** → **Providers**
2. Find **Google** and toggle it **On**
3. Click **Google** to configure:
   - Add your OAuth 2.0 credentials (Client ID & Secret)
   - Or use the default Supabase testing credentials
4. Set Redirect URLs:
   - `http://localhost:5173/auth/v1/callback`
   - `http://localhost:3000/auth/v1/callback` (if using port 3000)
   - Your production domain when deployed

## Option 2: CLI Setup (If Supabase CLI is Installed)

### Authenticate with Supabase
```powershell
npx supabase login
```
- This will open a browser to authenticate
- Follow the prompts to authorize the CLI

### Link Project
```powershell
cd c:\Users\Manya Bhargava\Downloads\The Horrizon
npx supabase link --project-ref vagqofvhrsahcxcngfmj
```
- Select "Yes" when asked to link to project
- Confirm the database password when prompted

### Push Migrations
```powershell
npx supabase db push
```
- This will execute all SQL files in `.supabase/migrations/`

## Verification Checklist

After setting up, verify everything works:

✅ **Database Tables**: All 6 tables created (`bookings`, `packages`, `inquiries`, `gallery`, `events`, `testimonials`)

✅ **RLS Policies**: Row-level security policies created for each table

✅ **Indexes**: Performance indexes created on key columns:
   - `bookings.user_id`, `bookings.package_id`, `bookings.status`
   - `inquiries.status`
   - `gallery.category`
   - `events.is_active`

✅ **Authentication**: Google OAuth configured and working

✅ **Environment Variables**: Already set in `.env.local`:
   ```
   VITE_SUPABASE_URL=<your-supabase-url>
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```

## Next Steps

1. **Test Authentication**: Try logging in with Google or your chosen provider
2. **Test Database Operations**: The application's React Query hooks will automatically work with the database
3. **Deploy**: When ready, deploy to production with your domain configuration

## Troubleshooting

### "Table already exists" Error
- This is safe to ignore - the SQL uses `CREATE TABLE IF NOT EXISTS`
- Re-running migrations won't duplicate tables

### "Permission denied" Error
- Ensure your Supabase anonymous key has proper RLS permissions
- Check RLS policies are correctly set

### OAuth Variables Not Working
- Make sure Google OAuth is enabled in Supabase dashboard
- Verify Redirect URLs are correctly configured
- Check your Client ID and Secret are correct

## Files Created

- `.supabase/config.toml` - Supabase CLI configuration
- `.supabase/migrations/20260328_horrizon_schema.sql` - Database schema migration

All hooks in your React app are already configured to use these tables via Supabase queries!
