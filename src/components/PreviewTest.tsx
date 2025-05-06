
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PreviewTest: React.FC = () => {
  return (
    <Card className="my-6 border-4 border-red-500 bg-red-100 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-bold text-red-600 animate-pulse">PREVIEW TEST</h1>
        </div>
        <p className="text-center mt-6 text-red-600 font-bold text-xl">
          If you can see this message, the preview is working correctly.
        </p>
        <div className="mt-6 flex justify-center">
          <Button 
            variant="destructive"
            size="lg"
            className="text-xl py-6 px-8"
            onClick={() => toast.info("Button clicked! Preview is interactive!")}
          >
            Click Me To Test Interactivity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewTest;
