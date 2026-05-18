import { Building2, MapPin } from "lucide-react"

export const Examples = ({ children }: { children: string | number }) => {
    const isCep = /\d/.test(children.toString());

    return (
        <div className="shrink-0 w-max whitespace-nowrap text-emerald-500 text-sm font-light flex items-center gap-2 rounded-xl px-4 py-2 border border-emerald-800/50 hover:bg-emerald-900/20 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300 ease-in-out cursor-pointer hover:text-emerald-400">
            {
                isCep ? <MapPin size={16} className="text-emerald-500" /> :
                    <Building2 size={16} className="text-emerald-500" />
            }
            <span>{children}</span>
        </div>
    )
}