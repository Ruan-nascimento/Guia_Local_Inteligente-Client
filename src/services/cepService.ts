import type { AddressData, ViaCepResponse } from "@/interfaces/cepService.interface";


export async function getAddressByCep(
    cep: string,
    signal?: AbortSignal
): Promise<AddressData> {

    if (typeof cep !== "string") {
        throw new Error("CEP precisa ser uma string.");
    }

    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
        throw new Error("O CEP precisa ter 8 números.");
    }

    if (!/^\d{8}$/.test(cleanCep)) {
        throw new Error("CEP inválido.");
    }

    let response: Response;

    try {
        response = await fetch(
            `https://viacep.com.br/ws/${cleanCep}/json/`,
            { signal }
        );
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("Requisição cancelada.");
        }

        throw new Error("Erro ao conectar com o serviço de CEP.");
    }

    if (!response.ok) {
        throw new Error(
            `Erro ao buscar CEP. Status: ${response.status}`
        );
    }

    let data: ViaCepResponse;

    try {
        data = await response.json();
    } catch {
        throw new Error("Resposta inválida do servidor.");
    }

    if (data.erro) {
        throw new Error("CEP não encontrado.");
    }

    if (
        !data.cep ||
        !data.localidade ||
        !data.uf
    ) {
        throw new Error("Dados do endereço incompletos.");
    }

    return {
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
    };
}