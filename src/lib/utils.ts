import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatOpeningHours(hours?: string) {
  if (!hours || hours === "Horário não informado") return ["Não informado"];
  if (hours === "24/7") return ["Aberto 24h"];

  const daysMap: Record<string, string> = {
    Mo: "Seg",
    Tu: "Ter",
    We: "Qua",
    Th: "Qui",
    Fr: "Sex",
    Sa: "Sáb",
    Su: "Dom",
    PH: "Feriados",
  };

  return hours.split(";").map((part) => {
    let formattedPart = part.trim();
    Object.entries(daysMap).forEach(([en, pt]) => {
      const regex = new RegExp(`\\b${en}\\b`, "g");
      formattedPart = formattedPart.replace(regex, pt);
    });
    return formattedPart;
  });
}
