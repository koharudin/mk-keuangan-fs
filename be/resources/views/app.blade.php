@extends("layouts.vertikal.vertikal_layout")

@section("content")
<div id="root"></div>
@endsection
@viteReactRefresh
@vite('resources/react/app.tsx') {{-- ini file React nanti --}}

@section("page-script")
<script>
    localStorage.setItem(
        "app_token",
        @json($cache['app_token'] ?? null)
    );
</script>
@endsection