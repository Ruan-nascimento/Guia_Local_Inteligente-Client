import {
    Atom,
    Braces,
    CheckCircle2,
    CloudSun,
    Container,
    Database,
    MapPin,
    Monitor,
    Puzzle,
    UserRound,
} from "lucide-react";

export const technologies = [
    { name: "React", icon: Atom, color: "text-cyan-400" },
    { name: "Tailwind", icon: CloudSun, color: "text-cyan-400" },
    { name: "Docker", icon: Container, color: "text-sky-400" },
    { name: "ViaCEP", icon: Braces, color: "text-emerald-400" },
    { name: "Open-Meteo", icon: CloudSun, color: "text-yellow-400" },
];

export const architecture = [
    {
        number: "1",
        title: "Apresentação",
        description: "Interface responsiva e intuitiva para o usuário.",
        icon: Monitor,
    },
    {
        number: "2",
        title: "Lógica",
        description: "Regras de negócio, processamento e integração de serviços.",
        icon: Puzzle,
    },
    {
        number: "3",
        title: "Dados",
        description: "Consumo de APIs externas para informações da região.",
        icon: Database,
    },
];

export const features = [
    "Buscar região",
    "Ver clima",
    "Explorar locais",
    "Criar Conta Com Google",
    "Entrar com Google",
    "Autenticação segura",
];

export const developers = [
    "Ruan Carlos",
    "Bernardo",
    "Lucas Silva",
    "Kauã Nyllo"
];

export const icons = {
    MapPin,
    CheckCircle2,
    UserRound,
};