import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ExpertisePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Expertise Areas Management</h1>
        <Button>Add New Area</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Expertise Areas</CardTitle>
          <CardDescription>
            Add, edit, or remove expertise areas displayed on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
            <p className="text-gray-500">
              Expertise areas management interface coming soon
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}