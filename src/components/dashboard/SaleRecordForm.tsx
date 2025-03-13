
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreditCard, DollarSign, Package, Users } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Define the schema for the sale form
const saleFormSchema = z.object({
  packageType: z.string({
    required_error: "Please select a package type",
  }),
  paymentMethod: z.string({
    required_error: "Please select a payment method",
  }),
  salesExecutive: z.string({
    required_error: "Please select a sales executive",
  }),
  toManager: z.string({
    required_error: "Please select a TO manager",
  }),
  amount: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: "Amount must be a valid number greater than 0" }
  ),
  transactionNotes: z.string().optional(),
});

type SaleFormValues = z.infer<typeof saleFormSchema>;

// Define types for dropdown options
const packageTypes = [
  { id: "premium", name: "Premium Package" },
  { id: "military", name: "Military Discount" },
  { id: "first-responder", name: "First-Responder" },
  { id: "standard", name: "Standard Package" },
  { id: "renewal", name: "Membership Renewal" },
];

const paymentMethods = [
  { id: "credit-card", name: "Credit Card" },
  { id: "cash", name: "Cash Payment" },
  { id: "financing", name: "Financing" },
  { id: "bank-transfer", name: "Bank Transfer" },
];

const salesTeam = [
  { id: "exec-001", name: "Craig Boure" },
  { id: "exec-002", name: "Sarah Miller" },
  { id: "exec-003", name: "Michael Johnson" },
  { id: "exec-004", name: "Jennifer Williams" },
  { id: "exec-005", name: "Robert Davis" },
];

const toManagers = [
  { id: "manager-001", name: "Thomas Andrews" },
  { id: "manager-002", name: "Jessica Lewis" },
  { id: "manager-003", name: "David Carter" },
];

interface SaleRecordFormProps {
  presentationId: string;
  clientId: string;
  clientNames: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const SaleRecordForm: React.FC<SaleRecordFormProps> = ({
  presentationId,
  clientId,
  clientNames,
  onSuccess,
  onCancel
}) => {
  const { toast } = useToast();
  
  // Initialize the form
  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      packageType: "",
      paymentMethod: "",
      salesExecutive: "",
      toManager: "",
      amount: "",
      transactionNotes: "",
    },
  });

  // Submit handler
  function onSubmit(data: SaleFormValues) {
    // Here you would typically send this data to your API
    console.log("Sale recorded:", {
      presentationId,
      clientId,
      clientNames,
      ...data,
      timestamp: new Date().toISOString(),
    });

    // Show success toast
    toast({
      title: "Sale recorded",
      description: `Successfully recorded ${data.packageType} sale for ${clientNames}`,
    });

    // Call the success callback
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium mb-1">Record Sale for {clientNames}</h3>
          <p className="text-sm text-muted-foreground">Enter the sale details below</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="packageType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {packageTypes.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          <span>{pkg.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span>{method.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salesExecutive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sales Executive</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select sales executive" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {salesTeam.map((exec) => (
                      <SelectItem key={exec.id} value={exec.id}>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{exec.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="toManager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TO Manager</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select TO manager" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {toManagers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{manager.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sale Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="0.00" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="transactionNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add any additional details about the transaction..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Record Sale
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SaleRecordForm;
