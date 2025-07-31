<?php

namespace App\Http\Controllers;

use App\Models\Credit;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CreditController extends Controller
{
    public function showTopUpForm()
    {
        return view('credits.topup');
    }

    public function handleTopUp(Request $request)
    {
        $request->validate([
            'amount' => 'required|integer|min:1',
            'payment_method' => 'required|string',
        ]);

        $transactionId = Str::uuid();

        $credit = Credit::create([
            'user_id' => auth()->id(),
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'transaction_id' => $transactionId,
            'status' => 'pending',
        ]);

        $credit->update(['status' => 'completed']);

        $user = User::find(auth()->id());
        if ($user) {
            $user->credit_balance += $credit->amount;
            $user->save();
        }

        return redirect()->back()->with('success', 'Top-up successful!');
    }
    public function history()
    {
        $credits = Credit::where('user_id', auth()->id())->orderByDesc('created_at')->get();
        return view('credits.history', compact('credits'));
    }

}
