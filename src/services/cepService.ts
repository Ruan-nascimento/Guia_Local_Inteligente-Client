export async function getAddressByCep(cep: string) {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
        return "O CEP precisa ter 8 números.";
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();

    if (data.erro) {
        return "CEP não encontrado.";
    }

    return data;
}