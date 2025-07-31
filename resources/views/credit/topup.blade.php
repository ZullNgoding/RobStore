<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Top Up Credits
        </h2>
    </x-slot>

    <div class="py-10 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <div class="bg-white shadow-md rounded-lg p-6">
            @if (session('success'))
                <div class="mb-4 p-4 bg-green-100 text-green-800 rounded">
                    {{ session('success') }}
                </div>
            @endif

            <div class="mb-6 text-gray-600 text-sm">
                💡 <strong>Conversion Rate:</strong> 1,000 IDR = 10 Robux  
                <br>
                Enter the amount in IDR. Robux will be added accordingly.
            </div>

            <form method="POST" action="{{ route('credits.topup') }}" class="space-y-6" id="topup-form">
    @csrf

    <div>
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount (in IDR)</label>
        <input type="number" name="amount" id="amount" min="1000" step="1000" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g. 10000" required>
        @error('amount')
            <span class="text-red-500 text-sm">{{ $message }}</span>
        @enderror
    </div>

    <div id="robux-preview" class="text-sm text-blue-600 hidden">
        🎮 You will receive <span id="robux-amount" class="font-semibold">0</span> Robux.
    </div>

    <div>
        <label for="payment_method" class="block text-sm font-medium text-gray-700">Payment Method</label>
        <select name="payment_method" id="payment_method"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required>
            <option value="">-- Choose --</option>
            <option value="manual">Manual Transfer</option>
            <option value="qris">QRIS</option>
            <option value="gopay">GoPay</option>
            <option value="dana">DANA</option>
            <option value="ovo">OVO</option>
        </select>
        @error('payment_method')
            <span class="text-red-500 text-sm">{{ $message }}</span>
        @enderror
    </div>

    <div class="flex justify-end">
        <button type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Top Up Now
        </button>
    </div>
</form>

{{-- 👇 Add this at the bottom --}}
<script>
    document.getElementById('amount').addEventListener('input', function () {
        let idr = parseInt(this.value);
        let robux = Math.floor(idr / 100); // 1000 IDR = 10 Robux
        let preview = document.getElementById('robux-preview');
        let robuxText = document.getElementById('robux-amount');

        if (!isNaN(robux) && robux > 0) {
            robuxText.textContent = robux;
            preview.classList.remove('hidden');
        } else {
            preview.classList.add('hidden');
        }
    });
</script>

        </div>
    </div>
</x-app-layout>
