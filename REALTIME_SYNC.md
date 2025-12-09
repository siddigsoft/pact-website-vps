# 🔄 Real-Time Sync Configuration Guide

This document explains how the PACT website is configured for real-time synchronization between the Neon database, admin control panel, and frontend.

## ✅ Configuration Summary

### 1. Database Configuration (Neon)
**File:** `server/db.ts`

```typescript
// Optimized connection pool settings
- Max connections: 20
- Idle timeout: 30 seconds
- Connection timeout: 10 seconds
- SSL enabled for Neon
```

**Benefits:**
- ✅ Fast database responses
- ✅ Efficient connection pooling
- ✅ Automatic reconnection on network issues
- ✅ SSL security for cloud database

### 2. Frontend Cache Configuration
**File:** `client/src/lib/queryClient.ts`

```typescript
// Real-time sync settings
- staleTime: 0 (data is always fresh)
- refetchOnWindowFocus: true
- refetchOnMount: true
- refetchOnReconnect: true
```

**Benefits:**
- ✅ Immediate data freshness
- ✅ Auto-refresh when switching tabs
- ✅ Auto-refresh when component mounts
- ✅ Auto-refresh when network reconnects

### 3. Mutation Handling
**File:** `client/src/hooks/useOptimisticMutation.ts`

All admin panel changes automatically:
- ✅ Invalidate relevant caches
- ✅ Trigger immediate refetch
- ✅ Show success/error notifications
- ✅ Update frontend instantly

## 🎯 How Real-Time Sync Works

### Admin Panel → Database → Frontend Flow

```
1. Admin makes change (edit/add/delete)
   ↓
2. Request sent to API endpoint
   ↓
3. Database updated in Neon
   ↓
4. Mutation success triggers cache invalidation
   ↓
5. Frontend automatically refetches fresh data
   ↓
6. UI updates instantly with new data
```

### Example: Adding a New Service

```typescript
// When admin adds a service:
1. POST /api/content/services → Saves to Neon DB
2. invalidateQueries(['/api/content/services']) → Clears cache
3. useQuery('/api/content/services') → Refetches automatically
4. Frontend displays new service immediately
```

## 🔍 Testing Real-Time Sync

### Test 1: Admin Panel Changes
1. Open **http://localhost:5000** in Browser 1
2. Open **http://localhost:5000/admin** in Browser 2
3. Login to admin panel
4. Add/edit a service, client, or blog post
5. Switch to Browser 1
6. **Result:** Changes appear immediately (or on tab focus)

### Test 2: Multi-Tab Sync
1. Open admin panel in 2 tabs
2. Make changes in Tab 1
3. Switch to Tab 2
4. **Result:** Tab 2 shows updated data when focused

### Test 3: Network Reconnection
1. Open the website
2. Disconnect internet
3. Reconnect internet
4. **Result:** Data automatically refetches

## ⚙️ Configuration Options

### Adjust Refetch Behavior

Edit `client/src/lib/queryClient.ts`:

```typescript
// More aggressive refetching (instant updates)
staleTime: 0,
refetchInterval: 5000, // Refetch every 5 seconds

// Less aggressive (better performance)
staleTime: 30000, // Cache for 30 seconds
refetchInterval: false, // No automatic polling
```

### Adjust Database Pool Size

Edit `server/db.ts`:

```typescript
// For high traffic
max: 50,
idleTimeoutMillis: 60000,

// For low traffic (saves resources)
max: 10,
idleTimeoutMillis: 15000,
```

## 📊 Query Keys Reference

All queries use specific keys for cache invalidation:

| Feature | Query Key | Endpoint |
|---------|-----------|----------|
| Services | `['/api/content/services']` | GET /api/content/services |
| Clients | `['content', 'clients']` | GET /api/content/clients |
| Projects | `['/api/content/projects']` | GET /api/content/projects |
| Blog | `['/api/articles']` | GET /api/articles |
| Team | `['/api/team']` | GET /api/team |
| Hero Slides | `['/api/hero-slides']` | GET /api/hero-slides |
| Locations | `['locations']` | GET /api/locations |
| About | `['/api/about-content']` | GET /api/about-content |
| Footer | `['/api/footer']` | GET /api/footer |
| Stats | `['/api/impact-stats']` | GET /api/impact-stats |

## 🚀 Performance Tips

### 1. Minimize Unnecessary Refetches
- Only invalidate queries that are affected by the mutation
- Use specific query keys instead of invalidating all

### 2. Optimize Database Queries
- Index frequently queried fields
- Use SELECT only needed columns
- Implement pagination for large datasets

### 3. Enable HTTP Caching
Add cache headers for static content:
```typescript
res.set('Cache-Control', 'public, max-age=3600');
```

### 4. Monitor Database Performance
Check Neon dashboard for:
- Connection count
- Query performance
- Database size

## 🔧 Troubleshooting

### Changes not appearing immediately?

**Solution 1:** Check browser console for errors
```bash
# Open DevTools → Console
# Look for failed API requests or network errors
```

**Solution 2:** Verify cache invalidation
```typescript
// In admin page, check if invalidateQueries is called
queryClient.invalidateQueries({ queryKey: ['/api/content/services'] });
```

**Solution 3:** Force hard refresh
```
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)
```

### Database connection errors?

**Solution 1:** Check DATABASE_URL in .env
```bash
# Verify Neon connection string
echo $DATABASE_URL
```

**Solution 2:** Test database connection
```bash
docker-compose exec app npx drizzle-kit push
```

**Solution 3:** Restart application
```bash
docker-compose restart
```

## 📈 Monitoring Real-Time Sync

### View Network Requests
1. Open DevTools → Network tab
2. Make changes in admin panel
3. See API calls and responses
4. Verify data is updated

### View React Query Cache
Install React Query DevTools:
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Add to App.tsx
<ReactQueryDevtools initialIsOpen={false} />
```

## 🎓 Best Practices

1. **Always invalidate queries after mutations**
   ```typescript
   onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['/api/...'] });
   }
   ```

2. **Use optimistic updates for instant UI feedback**
   ```typescript
   onMutate: async (newData) => {
     await queryClient.cancelQueries({ queryKey: ['/api/...'] });
     const previousData = queryClient.getQueryData(['/api/...']);
     queryClient.setQueryData(['/api/...'], newData);
     return { previousData };
   }
   ```

3. **Handle errors gracefully**
   ```typescript
   onError: (err, newData, context) => {
     queryClient.setQueryData(['/api/...'], context.previousData);
   }
   ```

4. **Test on slow networks**
   - Use Chrome DevTools → Network → Throttling
   - Test with "Slow 3G" setting

## ✨ Current Configuration Status

✅ **Database:** Neon cloud PostgreSQL with optimized pooling
✅ **Cache Strategy:** Instant invalidation with smart refetching  
✅ **Network Handling:** Auto-retry with exponential backoff  
✅ **Error Handling:** Graceful fallbacks with user notifications  
✅ **Performance:** Optimized queries with minimal overhead  

---

**Last Updated:** December 9, 2025  
**Configuration Version:** 1.0  
**Status:** Production Ready ✅
