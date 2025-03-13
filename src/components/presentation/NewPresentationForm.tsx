
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
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
import { waveTimes } from '@/utils/demoData';
import { X } from "lucide-react";

interface NewPresentationFormProps {
  onClose: () => void;
}

const NewPresentationForm: React.FC<NewPresentationFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [waveTime, setWaveTime] = useState('');
  const [clientCount, setClientCount] = useState('2');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !roomNumber || !waveTime) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would create a new presentation
    // For demo purposes, just show a success message
    toast({
      title: "Presentation Created",
      description: `${title} has been scheduled for ${waveTime} in Room ${roomNumber}`,
    });
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative animate-in fade-in-0 zoom-in-95">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-brio-navy">New Presentation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Presentation Title</Label>
            <Input
              id="title"
              placeholder="Enter presentation title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="room">Room Number</Label>
              <Input
                id="room"
                placeholder="Enter room number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wave">Wave Time</Label>
              <Select value={waveTime} onValueChange={setWaveTime} required>
                <SelectTrigger id="wave">
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
            <Label htmlFor="clients">Number of Clients</Label>
            <Select value={clientCount} onValueChange={setClientCount}>
              <SelectTrigger id="clients">
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4 flex justify-end space-x-2 border-t mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-brio-navy hover:bg-brio-navy/90" type="submit">
              Create Presentation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPresentationForm;
