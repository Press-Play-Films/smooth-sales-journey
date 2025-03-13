
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
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

interface KeyInfo {
  category: string;
  value: string;
}

interface ClientKeyInformationProps {
  keyInformation: KeyInfo[];
}

const ClientKeyInformation: React.FC<ClientKeyInformationProps> = ({ keyInformation: initialKeyInfo }) => {
  const { toast } = useToast();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [keyInformation, setKeyInformation] = useState<KeyInfo[]>(initialKeyInfo);
  const [editedInfo, setEditedInfo] = useState<KeyInfo[]>([]);

  const openEditDialog = () => {
    setEditedInfo([...keyInformation]);
    setShowEditDialog(true);
  };

  const handleInfoChange = (index: number, field: 'category' | 'value', value: string) => {
    const updatedInfo = [...editedInfo];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setEditedInfo(updatedInfo);
  };

  const addNewInfo = () => {
    setEditedInfo([...editedInfo, { category: '', value: '' }]);
  };

  const removeInfo = (index: number) => {
    const updatedInfo = [...editedInfo];
    updatedInfo.splice(index, 1);
    setEditedInfo(updatedInfo);
  };

  const saveKeyInformation = () => {
    // Filter out empty items
    const filteredInfo = editedInfo.filter(info => info.category.trim() && info.value.trim());
    
    if (filteredInfo.length > 0) {
      setKeyInformation(filteredInfo);
      toast({
        title: "Information Updated",
        description: "Client key information has been updated.",
      });
    }
    
    setShowEditDialog(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Client Key Information</h3>
          <button
            onClick={openEditDialog}
            className="text-brio-navy hover:text-brio-teal text-sm transition-colors"
          >
            Edit Information
          </button>
        </div>
        
        <div className="space-y-4">
          {keyInformation.length > 0 ? (
            keyInformation.map((info, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <p className="text-sm text-gray-500">{info.category}</p>
                <p className="font-medium">{info.value}</p>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">No key information available</div>
          )}
        </div>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Key Information</DialogTitle>
            <DialogDescription>
              Update important client information for quick reference.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[60vh] overflow-y-auto">
            {editedInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-2 mb-4">
                <div className="grid gap-2 flex-1">
                  <Label htmlFor={`category-${index}`}>Category</Label>
                  <Input
                    id={`category-${index}`}
                    value={info.category}
                    onChange={(e) => handleInfoChange(index, 'category', e.target.value)}
                    placeholder="e.g., Budget, Preference"
                  />
                </div>
                <div className="grid gap-2 flex-1">
                  <Label htmlFor={`value-${index}`}>Value</Label>
                  <Input
                    id={`value-${index}`}
                    value={info.value}
                    onChange={(e) => handleInfoChange(index, 'value', e.target.value)}
                    placeholder="Enter information value"
                  />
                </div>
                <button
                  onClick={() => removeInfo(index)}
                  className="mt-8 text-red-500 hover:text-red-700"
                  aria-label="Remove this information"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={addNewInfo}
              className="mt-2 w-full"
            >
              + Add Information
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button 
              onClick={saveKeyInformation}
              className="bg-brio-navy hover:bg-brio-navy/90"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ClientKeyInformation;
