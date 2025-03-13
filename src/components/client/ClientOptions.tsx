
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClientOptions: React.FC = () => {
  const { toast } = useToast();
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [transferDepartment, setTransferDepartment] = useState('');
  const [messageText, setMessageText] = useState('');

  const handleTransfer = () => {
    toast({
      title: "Client Transferred",
      description: `Client has been transferred to ${transferDepartment}`,
    });
    setShowTransferDialog(false);
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the client",
    });
    setMessageText('');
    setShowMessageDialog(false);
  };

  const handleRemoveClient = () => {
    toast({
      title: "Client Removed",
      description: "Client has been removed from this presentation",
      variant: "destructive",
    });
    setShowRemoveDialog(false);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-xs text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-44">
          <div className="space-y-1">
            <button
              onClick={() => setShowTransferDialog(true)}
              className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md transition-colors"
            >
              Transfer Client
            </button>
            <button
              onClick={() => setShowMessageDialog(true)}
              className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md transition-colors"
            >
              Send Message
            </button>
            <button
              onClick={() => setShowRemoveDialog(true)}
              className="w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Remove
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Client</DialogTitle>
            <DialogDescription>
              Transfer this client to another department or team member.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="department">Select Department</Label>
              <Select value={transferDepartment} onValueChange={setTransferDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Department</SelectItem>
                  <SelectItem value="marketing">Marketing Department</SelectItem>
                  <SelectItem value="customer-service">Customer Service</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleTransfer} 
              disabled={!transferDepartment}
              className="bg-brio-navy hover:bg-brio-navy/90"
            >
              Transfer Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message to Client</DialogTitle>
            <DialogDescription>
              Send a direct message to this client.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message here..."
                className="h-24"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleSendMessage} 
              disabled={!messageText.trim()}
              className="bg-brio-navy hover:bg-brio-navy/90"
            >
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Client</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this client from the presentation?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRemoveDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleRemoveClient}
              variant="destructive"
            >
              Remove Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientOptions;
