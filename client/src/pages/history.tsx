import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Coins, Calendar, User, CreditCard, DollarSign, CheckCircle, Clock, XCircle } from "lucide-react";
import type { Transaction } from "@shared/schema";

export default function History() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
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
  }, [isAuthenticated, isLoading, toast]);

  const { data: transactions, isLoading: transactionsLoading, error } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
    retry: false,
  });

  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [error, toast]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={16} />;
      case 'failed':
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'success':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transaction History</h1>
            <p className="text-xl text-gray-600">Track all your Robux purchases and their status</p>
          </div>

          {transactionsLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading transactions...</p>
            </div>
          ) : !transactions || transactions.length === 0 ? (
            <Card className="text-center py-20">
              <CardContent>
                <Coins className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Transactions Yet</h3>
                <p className="text-gray-600 mb-6">You haven't made any Robux purchases yet.</p>
                <a
                  href="/topup"
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Coins className="mr-2" size={20} />
                  Make Your First Purchase
                </a>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl">
              <CardContent className="p-0">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="mr-2" size={16} />
                            Date
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          <div className="flex items-center">
                            <User className="mr-2" size={16} />
                            Username
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          <div className="flex items-center">
                            <Coins className="mr-2" size={16} />
                            Robux
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          <div className="flex items-center">
                            <CreditCard className="mr-2" size={16} />
                            Payment
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          <div className="flex items-center">
                            <DollarSign className="mr-2" size={16} />
                            Total
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {new Date(transaction.createdAt!).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {transaction.username}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="flex items-center">
                              <Coins className="text-yellow-500 mr-2" size={16} />
                              {transaction.robuxAmount} Robux
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{transaction.paymentMethod}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                            ${transaction.totalPrice}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                              {getStatusIcon(transaction.status)}
                              <span className="ml-1 capitalize">{transaction.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 p-4">
                  {transactions.map((transaction) => (
                    <Card key={transaction.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-medium text-gray-900">{transaction.username}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(transaction.createdAt!).toLocaleDateString()}
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1 capitalize">{transaction.status}</span>
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Robux:</span>
                            <div className="flex items-center">
                              <Coins className="text-yellow-500 mr-1" size={14} />
                              <span className="text-sm font-medium">{transaction.robuxAmount}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Payment:</span>
                            <span className="text-sm font-medium">{transaction.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Total:</span>
                            <span className="text-sm font-semibold">${transaction.totalPrice}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
