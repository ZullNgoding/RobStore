import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Coins, User, CreditCard, ShoppingCart } from "lucide-react";

const topUpSchema = z.object({
  username: z.string().min(1, "Roblox username is required"),
  robuxAmount: z.number().min(1, "Please select a Robux package"),
  paymentMethod: z.enum(["QRIS", "Dana", "GoPay"], {
    required_error: "Please select a payment method",
  }),
  totalPrice: z.number().min(0.01, "Invalid price"),
});

type TopUpFormData = z.infer<typeof topUpSchema>;

export default function TopUp() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPackage, setSelectedPackage] = useState<{ amount: number; price: number } | null>(null);

  const robuxPackages = [
    { amount: 80, price: 0.99, popular: false },
    { amount: 400, price: 4.95, popular: true },
    { amount: 800, price: 9.95, popular: false },
    { amount: 1700, price: 19.95, bestValue: true },
  ];

  const form = useForm<TopUpFormData>({
    resolver: zodResolver(topUpSchema),
    defaultValues: {
      username: "",
      robuxAmount: 0,
      paymentMethod: undefined,
      totalPrice: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: TopUpFormData) => {
      await apiRequest("POST", "/api/transactions", data);
    },
    onSuccess: () => {
      toast({
        title: "Transaction Submitted!",
        description: "Your Robux purchase is being processed. Check your transaction history for updates.",
      });
      form.reset();
      setSelectedPackage(null);
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Transaction Failed",
        description: "There was an error processing your transaction. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePackageSelect = (pkg: { amount: number; price: number }) => {
    setSelectedPackage(pkg);
    form.setValue("robuxAmount", pkg.amount);
    form.setValue("totalPrice", pkg.price);
  };

  const onSubmit = (data: TopUpFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top-Up Robux</h1>
            <p className="text-xl text-gray-600">Quick and secure Robux purchase in just a few clicks</p>
          </div>

          <Card className="shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Roblox Username */}
                <div>
                  <Label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="mr-2 text-blue-500" size={16} />
                    Roblox Username
                  </Label>
                  <Input
                    {...form.register("username")}
                    placeholder="Enter your Roblox username"
                    className="w-full"
                  />
                  {form.formState.errors.username && (
                    <p className="mt-1 text-sm text-red-600">{form.formState.errors.username.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Make sure this matches your exact Roblox username</p>
                </div>

                {/* Robux Package Selection */}
                <div>
                  <Label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Coins className="mr-2 text-blue-500" size={16} />
                    Robux Package
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {robuxPackages.map((pkg) => (
                      <div
                        key={pkg.amount}
                        onClick={() => handlePackageSelect(pkg)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                          selectedPackage?.amount === pkg.amount
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Coins className="text-yellow-600" size={20} />
                          </div>
                          <div className="font-bold text-gray-900">{pkg.amount} Robux</div>
                          <div className="text-sm text-blue-500 font-semibold">${pkg.price}</div>
                          {pkg.popular && (
                            <div className="text-xs text-green-600 mt-1">Popular</div>
                          )}
                          {pkg.bestValue && (
                            <div className="text-xs text-purple-600 mt-1">Best Value</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {form.formState.errors.robuxAmount && (
                    <p className="mt-2 text-sm text-red-600">{form.formState.errors.robuxAmount.message}</p>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <CreditCard className="mr-2 text-blue-500" size={16} />
                    Payment Method
                  </Label>
                  <Select onValueChange={(value) => form.setValue("paymentMethod", value as "QRIS" | "Dana" | "GoPay")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="QRIS">QRIS (Quick Response Code)</SelectItem>
                      <SelectItem value="Dana">Dana Digital Wallet</SelectItem>
                      <SelectItem value="GoPay">GoPay Digital Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.paymentMethod && (
                    <p className="mt-1 text-sm text-red-600">{form.formState.errors.paymentMethod.message}</p>
                  )}
                </div>

                {/* Price Summary */}
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Robux Amount:</span>
                        <span className="font-semibold">
                          {selectedPackage ? `${selectedPackage.amount} Robux` : 'Please select a package'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-semibold">
                          {form.watch("paymentMethod") || 'Not selected'}
                        </span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-lg">
                          <span className="font-bold text-gray-900">Total Price:</span>
                          <span className="font-bold text-blue-500">
                            ${selectedPackage ? selectedPackage.price.toFixed(2) : '0.00'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={mutation.isPending || !selectedPackage}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                >
                  <ShoppingCart className="mr-2" size={20} />
                  {mutation.isPending ? 'Processing...' : 'Complete Purchase'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
