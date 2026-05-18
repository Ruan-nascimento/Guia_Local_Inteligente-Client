export function LoadingDots() {
    return (
        <div className="flex items-center gap-1 w-full justify-center">
            <span className="h-5 w-5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
            <span className="h-5 w-5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
            <span className="h-5 w-5 animate-bounce rounded-full bg-current" />
        </div>
    );
}