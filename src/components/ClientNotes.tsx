
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface ClientNotesProps {
  clientId: string;
  clientNames: string;
}

interface Note {
  id: string;
  text: string;
  timestamp: Date;
  category: 'general' | 'key-info' | 'preference' | 'interest';
}

const ClientNotes: React.FC<ClientNotesProps> = ({ clientId, clientNames }) => {
  const { toast } = useToast();
  const [noteText, setNoteText] = useState('');
  const [category, setCategory] = useState<Note['category']>('general');
  
  // Example notes (in a real app, these would come from an API)
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      text: 'Interested in beach destinations',
      timestamp: new Date(Date.now() - 3600000),
      category: 'interest'
    },
    {
      id: '2',
      text: 'Planning to travel with grandchildren',
      timestamp: new Date(Date.now() - 7200000),
      category: 'key-info'
    }
  ]);
  
  const handleAddNote = () => {
    if (!noteText.trim()) {
      toast({
        title: "Empty Note",
        description: "Please enter some text for your note.",
        variant: "destructive",
      });
      return;
    }
    
    const newNote: Note = {
      id: Date.now().toString(),
      text: noteText.trim(),
      timestamp: new Date(),
      category
    };
    
    setNotes([newNote, ...notes]);
    setNoteText('');
    
    toast({
      title: "Note Added",
      description: "Your note has been saved successfully.",
    });
  };
  
  const getCategoryStyles = (category: Note['category']) => {
    switch (category) {
      case 'key-info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preference':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'interest':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium">Notes for {clientNames}</h4>
        <p className="text-sm text-gray-500">Add important information about this client</p>
      </div>
      
      <div className="space-y-2">
        <Textarea
          placeholder="Enter your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="resize-none"
        />
        
        <div className="flex flex-wrap gap-2">
          <Badge
            className={`cursor-pointer border ${
              category === 'general' 
                ? 'bg-gray-200 text-gray-800 border-gray-300' 
                : 'bg-gray-100 text-gray-600 border-gray-200'
            }`}
            onClick={() => setCategory('general')}
          >
            General
          </Badge>
          <Badge
            className={`cursor-pointer border ${
              category === 'key-info' 
                ? 'bg-blue-200 text-blue-800 border-blue-300' 
                : 'bg-blue-100 text-blue-600 border-blue-200'
            }`}
            onClick={() => setCategory('key-info')}
          >
            Key Info
          </Badge>
          <Badge
            className={`cursor-pointer border ${
              category === 'preference' 
                ? 'bg-purple-200 text-purple-800 border-purple-300' 
                : 'bg-purple-100 text-purple-600 border-purple-200'
            }`}
            onClick={() => setCategory('preference')}
          >
            Preference
          </Badge>
          <Badge
            className={`cursor-pointer border ${
              category === 'interest' 
                ? 'bg-green-200 text-green-800 border-green-300' 
                : 'bg-green-100 text-green-600 border-green-200'
            }`}
            onClick={() => setCategory('interest')}
          >
            Interest
          </Badge>
        </div>
        
        <Button onClick={handleAddNote} className="w-full bg-brio-navy hover:bg-brio-navy/90">
          Add Note
        </Button>
      </div>
      
      <div className="max-h-60 overflow-y-auto mt-4 space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="border border-gray-100 rounded-md p-3 bg-gray-50">
            <div className="flex justify-between items-start mb-1">
              <Badge className={`${getCategoryStyles(note.category)} border`}>
                {note.category === 'key-info' ? 'Key Info' : 
                 note.category === 'preference' ? 'Preference' : 
                 note.category === 'interest' ? 'Interest' : 'General'}
              </Badge>
              <span className="text-xs text-gray-500">{formatTime(note.timestamp)}</span>
            </div>
            <p className="text-sm">{note.text}</p>
          </div>
        ))}
        
        {notes.length === 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No notes yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNotes;
