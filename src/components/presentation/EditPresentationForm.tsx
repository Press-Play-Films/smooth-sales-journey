
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { waveTimes } from '@/utils/demoData';
import { Textarea } from "@/components/ui/textarea";

interface EditPresentationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presentation: {
    id: string;
    title: string;
    presenter: string;
    roomNumber: string;
    waveTime?: string;
    startTime: Date;
    clients: number | any[];
  };
}

const EditPresentationForm: React.FC<EditPresentationFormProps> = ({ 
  open, 
  onOpenChange,
  presentation 
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(presentation.title);
  const [roomNumber, setRoomNumber] = useState(presentation.roomNumber);
  const [waveTime, setWaveTime] = useState(presentation.waveTime || '');
  const [presenter, setPresenter] = useState(presentation.presenter);
  const [clientCount, setClientCount] = useState(
    typeof presentation.clients === 'number' 
      ? presentation.clients.toString() 
      : presentation.clients.length.toString()
  );
  const [notes, setNotes] = useState('');
  
  const handleSave = () => {
    // Validate form
    if (!title || !roomNumber || !waveTime || !presenter) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would update the presentation in the database
    toast({
      title: "Presentation Updated",
      description: `${title} has been updated successfully`,
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Presentation</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Presentation Title</Label>
            <Input
              id="edit-title"
              placeholder="Enter presentation title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-presenter">Presenter</Label>
            <Input
              id="edit-presenter"
              placeholder="Enter presenter name"
              value={presenter}
              onChange={(e) => setPresenter(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-room">Room Number</Label>
              <Input
                id="edit-room"
                placeholder="Enter room number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-wave">Wave Time</Label>
              <Select value={waveTime} onValueChange={setWaveTime} required>
                <SelectTrigger id="edit-wave">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {waveTimes.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-clients">Number of Clients</Label>
            <Select value={clientCount} onValueChange={setClientCount}>
              <SelectTrigger id="edit-clients">
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea
              id="edit-notes"
              placeholder="Add any additional notes about this presentation"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-brio-navy hover:bg-brio-navy/90">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPresentationForm;
