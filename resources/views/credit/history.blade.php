<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Top-Up History
        </h2>
    </x-slot>

    <div class="py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div class="bg-white shadow-md rounded-lg p-6">
            @if ($credits->isEmpty())
                <p class="text-gray-600">You haven't made any top-ups yet.</p>
            @else
                <table class="w-full text-sm text-left text-gray-600">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th class="py-2 px-4">Date</th>
                            <th class="py-2 px-4">Amount (IDR)</th>
                            <th class="py-2 px-4">Robux</th>
                            <th class="py-2 px-4">Method</th>
                            <th class="py-2 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($credits as $credit)
                            <tr class="border-b">
                                <td class="py-2 px-4">{{ $credit->created_at->format('d M Y') }}</td>
                                <td class="py-2 px-4">{{ number_format($credit->amount) }}</td>
                                <td class="py-2 px-4">{{ floor($credit->amount / 100) }}</td>
                                <td class="py-2 px-4">{{ ucfirst($credit->payment_method) }}</td>
                                <td class="py-2 px-4">
                                    <span class="px-2 py-1 text-xs font-semibold rounded 
                                        {{ $credit->status == 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }}">
                                        {{ ucfirst($credit->status) }}
                                    </span>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @endif
        </div>
    </div>
</x-app-layout>
