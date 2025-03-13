
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Transfer } from '@/types/dashboard';
import { formatTimeAgo } from '@/utils/formatters';

interface RecentTransfersListProps {
  transfers: Transfer[];
}

const RecentTransfersList: React.FC<RecentTransfersListProps> = ({ transfers }) => {
  const { toast } = useToast();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {transfers.map(transfer => (
            <div key={transfer.id} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
              <div>
                <p className="font-medium text-gray-900">{transfer.clientNames}</p>
                <p className="text-sm text-gray-500">
                  {transfer.fromDepartment} → {transfer.toDepartment}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {formatTimeAgo(transfer.timestamp)}
              </div>
            </div>
          ))}
          
          {transfers.length === 0 && (
            <div className="text-center py-4">
              <p className="text-gray-500">No recent transfers</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t">
        <button 
          onClick={() => {
            toast({
              title: "Transfer History",
              description: "Viewing full transfer history",
            });
          }}
          className="text-brio-navy hover:text-brio-teal text-sm font-medium flex items-center space-x-1 transition-colors"
        >
          <span>View All Transfers</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </CardFooter>
    </Card>
  );
};

export default RecentTransfersList;
