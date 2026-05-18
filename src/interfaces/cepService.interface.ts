export type AddressData = {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
};

export type ViaCepResponse = AddressData & {
    erro?: boolean;
};