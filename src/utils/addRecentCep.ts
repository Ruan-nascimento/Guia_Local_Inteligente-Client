export function addRecentCep(cep: string) {

    const cepFormated = cep.replace(/(\d{5})(\d{3})/, "$1-$2");

    const recentCeps: string[] = localStorage.getItem("recentCeps")
        ? JSON.parse(localStorage.getItem("recentCeps")!)
        : [];

    if (recentCeps.includes(cepFormated)) {
        const index = recentCeps.indexOf(cepFormated);
        recentCeps.splice(index, 1);
    }

    if (!recentCeps.includes(cepFormated)) {
        if (recentCeps.length >= 6) {
            recentCeps.shift();
        }

        recentCeps.push(cepFormated);
        localStorage.setItem("recentCeps", JSON.stringify(recentCeps));
    }
}