#!/bin/bash

# Test Real-Time Sync Configuration
# This script tests if changes in admin panel reflect immediately on frontend

echo "🧪 Testing Real-Time Sync Configuration"
echo "======================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check if application is running
echo "Test 1: Application Status"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000)
if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Application is running${NC}"
else
    echo -e "${RED}❌ Application is not responding (Status: $HTTP_STATUS)${NC}"
    exit 1
fi
echo ""

# Test 2: Check database connection
echo "Test 2: Database Connection"
DB_TEST=$(docker-compose exec -T app npm run --silent test:db 2>&1 || echo "No test script")
if echo "$DB_TEST" | grep -q "No test script"; then
    # Try direct database query
    QUERY_TEST=$(curl -s http://localhost:5000/api/content/services | jq -r '.success' 2>/dev/null)
    if [ "$QUERY_TEST" = "true" ]; then
        echo -e "${GREEN}✅ Database connection working${NC}"
    else
        echo -e "${YELLOW}⚠️  Database query returned: $QUERY_TEST${NC}"
    fi
else
    echo -e "${GREEN}✅ Database connection verified${NC}"
fi
echo ""

# Test 3: Check API endpoints
echo "Test 3: API Endpoints"
ENDPOINTS=(
    "/api/content/services"
    "/api/content/clients"
    "/api/hero-slides"
    "/api/locations"
    "/api/articles"
)

for endpoint in "${ENDPOINTS[@]}"; do
    RESPONSE=$(curl -s http://localhost:5000$endpoint | jq -r '.success' 2>/dev/null)
    if [ "$RESPONSE" = "true" ]; then
        echo -e "${GREEN}✅ $endpoint${NC}"
    else
        echo -e "${RED}❌ $endpoint (Response: $RESPONSE)${NC}"
    fi
done
echo ""

# Test 4: Check React Query configuration
echo "Test 4: Frontend Configuration"
if grep -q "staleTime: 0" client/src/lib/queryClient.ts; then
    echo -e "${GREEN}✅ Real-time cache invalidation enabled${NC}"
else
    echo -e "${YELLOW}⚠️  staleTime not set to 0 (may have delayed updates)${NC}"
fi

if grep -q "refetchOnWindowFocus: true" client/src/lib/queryClient.ts; then
    echo -e "${GREEN}✅ Auto-refetch on window focus enabled${NC}"
else
    echo -e "${RED}❌ Auto-refetch on window focus disabled${NC}"
fi
echo ""

# Test 5: Check database pool configuration
echo "Test 5: Database Pool Configuration"
if grep -q "max: 20" server/db.ts; then
    echo -e "${GREEN}✅ Connection pool optimized (max: 20)${NC}"
else
    echo -e "${YELLOW}⚠️  Default connection pool settings${NC}"
fi
echo ""

# Summary
echo "======================================="
echo -e "${GREEN}🎉 Real-Time Sync Configuration Test Complete!${NC}"
echo ""
echo "📋 Manual Testing Steps:"
echo "1. Open http://localhost:5000 in Browser 1"
echo "2. Open http://localhost:5000/admin in Browser 2"
echo "3. Login to admin panel (admin/admin123)"
echo "4. Add or edit a service/client/blog post"
echo "5. Switch to Browser 1 and click on the page"
echo "6. Changes should appear immediately!"
echo ""
echo "📚 For detailed documentation, see: REALTIME_SYNC.md"
