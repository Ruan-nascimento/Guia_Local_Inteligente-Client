export interface DefaultScreenProps {
    cep: string;
    setCep: (value: string) => void;
    onSearch: (overrideCep?: string) => void;
    loading: boolean;
}