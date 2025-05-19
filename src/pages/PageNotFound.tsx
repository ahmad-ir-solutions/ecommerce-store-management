import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import useBack from "@/hooks/use-back";

export default function NotFoundPage() {
  const {handleBack} = useBack();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Ghost className="h-20 w-20 text-muted-foreground mb-4" />
      <h1 className="text-3xl font-bold tracking-tight">404 - Page Not Found</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        Oops! The page you’re looking for doesn’t exist. It might have been moved or deleted.
      </p>
      <Button onClick={handleBack} className="mt-6 rounded-lg" size="lg" variant="primary">
        Go back
      </Button>
    </div>
  );
}
