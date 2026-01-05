import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-4">😂 😂 😂</CardTitle>
            <CardTitle>Registration Not Available</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Sorry, self-registration is not allowed for security reasons.
            </p>
            <p className="text-gray-600">
              Please contact the admin to get access to the system.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage; 