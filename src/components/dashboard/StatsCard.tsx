
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description }) => {
  return (
    <Card className="hover-lift">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-brio-navy">{value}</div>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-sm text-gray-500">{description}</p>
      </CardFooter>
    </Card>
  );
};

export default StatsCard;
