
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ClientTransferProps {
  clientId: string;
  clientNames: string;
}

const ClientTransfer: React.FC<ClientTransferProps> = ({ clientId, clientNames }) => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [transferNotes, setTransferNotes] = useState<string>('');
  
  // Mock departments and agents (in a real app, these would come from an API)
  const departments = [
    { id: 'sales', name: 'Sales Department' },
    { id: 'finance', name: 'Finance Department' },
    { id: 'exit-survey', name: 'Exit Survey Department' }
  ];
  
  const agentsByDepartment: Record<string, Array<{ id: string; name: string }>> = {
    'sales': [
      { id: 'agent-001', name: 'John Smith' },
      { id: 'agent-002', name: 'Sarah Johnson' },
      { id: 'agent-003', name: 'Michael Brown' }
    ],
    'finance': [
      { id: 'agent-004', name: 'Amanda Wilson' },
      { id: 'agent-005', name: 'David Thompson' }
    ],
    'exit-survey': [
      { id: 'agent-006', name: 'Jessica Martinez' },
      { id: 'agent-007', name: 'Robert Davis' }
    ]
  };
  
  const handleTransfer = () => {
    if (!selectedDepartment) {
      toast({
        title: "Department Required",
        description: "Please select a department to transfer to.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedAgent) {
      toast({
        title: "Agent Required",
        description: "Please select an agent to handle this client.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would call an API to handle the transfer
    
    toast({
      title: "Client Transferred",
      description: `${clientNames} has been transferred to ${selectedDepartment === 'sales' ? 'Sales' : selectedDepartment === 'finance' ? 'Finance' : 'Exit Survey'} Department.`,
    });
    
    // Reset form
    setSelectedDepartment('');
    setSelectedAgent('');
    setTransferNotes('');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Transfer Client</h3>
        <p className="text-sm text-gray-500">
          Transfer {clientNames} to another department or agent for the next stage of the sales process.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-medium">
            Select Department
          </label>
          <Select value={selectedDepartment} onValueChange={(value) => {
            setSelectedDepartment(value);
            setSelectedAgent('');
          }}>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(department => (
                <SelectItem key={department.id} value={department.id}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedDepartment && (
          <div className="space-y-2">
            <label htmlFor="agent" className="text-sm font-medium">
              Select Agent
            </label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger id="agent">
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {agentsByDepartment[selectedDepartment]?.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium">
            Transfer Notes
          </label>
          <Textarea
            id="notes"
            placeholder="Add any relevant information for the receiving department..."
            value={transferNotes}
            onChange={(e) => setTransferNotes(e.target.value)}
            className="resize-none h-24"
          />
        </div>
        
        <div className="space-x-2 flex">
          <Button 
            onClick={handleTransfer} 
            className="bg-brio-navy hover:bg-brio-navy/90"
          >
            Transfer Client
          </Button>
          <Button 
            onClick={() => {
              setSelectedDepartment('');
              setSelectedAgent('');
              setTransferNotes('');
            }}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4">
        <h4 className="font-medium mb-2">About the Transfer Process</h4>
        <p className="text-sm text-gray-500">
          Client transfers are tracked throughout the sales process to ensure a smooth transition between departments.
          All client notes and key information will be available to the receiving agent.
        </p>
      </div>
    </div>
  );
};

export default ClientTransfer;
