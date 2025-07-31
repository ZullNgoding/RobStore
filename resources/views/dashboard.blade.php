<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Dashboard
        </h2>
    </x-slot>
    <div class="bg-blue-500 text-white p-4 rounded mt-4">
    Tailwind CSS is working!
</div>
    <div class="py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {{-- Show credit balance --}}
        <div class="mb-6 p-4 bg-blue-100 text-blue-800 rounded shadow">
            💳 Current Robux Balance:
            <strong>{{ auth()->user()->credit_balance ?? 0 }}</strong>
        </div>

        {{-- Top-up button --}}
        <div class="mb-4">
            <a href="{{ route('credits.topup.form') }}"
               class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                + Top Up Robux
            </a>
        </div>

        {{-- View history link --}}
        <div>
            <a href="{{ route('credits.history') }}"
               class="text-sm text-blue-600 underline">
                View Top-Up History
            </a>
        </div>
    </div>
</x-app-layout>
