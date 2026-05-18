import { LoadingDots } from "./loadingDots";

export function LoadingSearch() {
    return (
        <section className="space-y-5 animate-pulse">
            <div>
                <div className="h-8 w-56 rounded-lg bg-slate-800" />
                <div className="mt-3 h-4 w-72 rounded-lg bg-slate-800" />
            </div>

            <div className="h-14 rounded-2xl bg-slate-900 border border-slate-800" />

            <div className="h-12 rounded-2xl bg-emerald-500/30" />

            <div className="mt-8 space-y-3">
                <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800" />
                <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800" />
                <div className="h-20 rounded-2xl bg-slate-900 border border-slate-800" />
            </div>

            <LoadingDots />
        </section>
    );
}