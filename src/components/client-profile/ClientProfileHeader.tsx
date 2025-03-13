
import React, { useState } from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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
import { Textarea } from "@/components/ui/textarea";

interface ClientProfileHeaderProps {
  clientNames: string;
  status: string;
  statusStyle: {
    bg: string;
    text: string;
    border: string;
    label: string;
  };
}

const ClientProfileHeader: React.FC<ClientProfileHeaderProps> = ({ clientNames, status, statusStyle }) => {
  const { toast } = useToast();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('555-123-4567');

  const handleSendEmail = () => {
    if (emailSubject && emailBody) {
      toast({
        title: "Email Sent",
        description: `Email has been sent to ${clientNames}`,
      });
      setShowEmailDialog(false);
      setEmailSubject('');
      setEmailBody('');
    }
  };

  const handleInitiateCall = () => {
    toast({
      title: "Call Initiated",
      description: `Calling ${clientNames} at ${phoneNumber}...`,
    });
    setShowCallDialog(false);
  };

  return (
    <CardHeader className="bg-gradient-to-r from-brio-navy to-brio-navy/80 text-white">
      <div className="flex justify-between items-center">
        <CardTitle className="flex items-center space-x-2">
          <span>{clientNames}</span>
          <Badge className={`${statusStyle.bg} ${statusStyle.text} hover:${statusStyle.bg} border ${statusStyle.border}`}>
            {statusStyle.label}
          </Badge>
        </CardTitle>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowEmailDialog(true)}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          <button 
            onClick={() => setShowCallDialog(true)}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Client</DialogTitle>
            <DialogDescription>
              Send an email to {clientNames}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-body">Message</Label>
              <Textarea
                id="email-body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Type your message here"
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleSendEmail} 
              disabled={!emailSubject.trim() || !emailBody.trim()}
              className="bg-brio-navy hover:bg-brio-navy/90"
            >
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Call Dialog */}
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Client</DialogTitle>
            <DialogDescription>
              Call {clientNames}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center space-y-4">
              <div className="mx-auto rounded-full bg-gray-100 w-20 h-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brio-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="font-medium">{phoneNumber}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCallDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleInitiateCall}
              className="bg-green-600 hover:bg-green-700"
            >
              Call Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardHeader>
  );
};

export default ClientProfileHeader;
