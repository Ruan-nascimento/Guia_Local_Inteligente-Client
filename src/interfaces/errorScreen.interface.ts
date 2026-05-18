export interface ErrorScreenProps {
    cep: string;
    setCep: (value: string) => void;
    error: string;
    onSearch: (overrideCep?: string) => void;
    onReset: () => void;
}
