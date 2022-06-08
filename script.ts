interface Veiculo {
    iNome: string;
    iPlaca: string;
    iEntrada: Date | string;
}

(function() {
    const $ = (query: string): HTMLInputElement | null =>
    document.querySelector(query);

    function calcTempo(mil: number){
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        return `${min}m e ${sec}s`;
    }

    function patio(){
        function ler(): Veiculo[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }

        function salvar(veiculos: Veiculo[]){
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }

        function adcionar(veiculo: Veiculo, salva?: boolean){
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${veiculo.iNome}</td>
                <td>${veiculo.iPlaca}</td>
                <td>${veiculo.iEntrada}</td>
                <td align="center">
                    <button class="delete" data-placa="${veiculo.iPlaca}">X</button>
                </td>
            `;

            row.querySelector(".delete")?.addEventListener("click", function(){
                remover(this.dataset.placa);
            });

            $("#patio")?.appendChild(row);


            if (salva) salvar([...ler(), veiculo]);
        }

        function remover(placa: string){
            const {iEntrada, iNome} = ler().find(veiculo => veiculo.iPlaca === placa);

            const tempo = calcTempo(new Date().getTime() - new Date(iEntrada).getTime());

            if(!confirm(`O veiculo ${iNome} ficou por ${tempo}. Deseja encerrar?`)) return;

            salvar(ler().filter((veiculo) => veiculo.iPlaca !== placa));
            render();
        }

        function render(){
            $("#patio")!.innerHTML = "";
            const patio = ler();

            if(patio.length){
                patio.forEach((veiculo) => adcionar(veiculo));
                    
                };
        }

        return{ ler, adcionar, remover, salvar, render };
    }

    patio().render();

    $("#cadastrar")?.addEventListener("click", () => {
        const iNome = $("#nome")?.value;
        const iPlaca = $("#placa")?.value;

        if(!iNome || !iPlaca) {
            alert("Informe o NOME e a PLACA!");
            return;
        }

        patio().adcionar({iNome, iPlaca, iEntrada: new Date().toISOString() }, true);
    });
})();

function changeMode(){
    changeClasses();
    changeText();
}

function changeClasses(){
    botao.classList.toggle(darkModeClass);
    tabelinha.classList.toggle(darkModeClass);
    // h3.classList.toggle(darkModeClass);
    body.classList.toggle(darkModeClass);
    footer.classList.toggle(darkModeClass);
    theade.classList.toggle(darkModeClass);
}

function changeText(){
    const ligthMode = "Modo Claro";
    const darkMode  = "Modo Escuro";

    if(body.classList.contains(darkModeClass)){
        botao.innerHTML = ligthMode;
        // h3.innerHTML    = darkMode + " ON";
    }else{
        botao.innerHTML = darkMode;
        // h3.innerHTML    = ligthMode + " ON";
    }
    }

const darkModeClass = 'dark-mode';
const botao         = document.getElementById('mode-selector');
// const h3            = document.getElementById('page-title');
const body          = document.getElementsByTagName('body')[0];
const footer        = document.getElementsByTagName('footer')[0];
const theade        = document.getElementById('titulo-table');
const tabelinha     = document.getElementById("tabelinha");

botao.addEventListener('click', changeMode)