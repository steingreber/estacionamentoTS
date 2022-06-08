(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function adcionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${veiculo.iNome}</td>
                <td>${veiculo.iPlaca}</td>
                <td>${veiculo.iEntrada}</td>
                <td align="center">
                    <button class="delete" data-placa="${veiculo.iPlaca}">X</button>
                </td>
            `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const { iEntrada, iNome } = ler().find(veiculo => veiculo.iPlaca === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(iEntrada).getTime());
            if (!confirm(`O veiculo ${iNome} ficou por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter((veiculo) => veiculo.iPlaca !== placa));
            render();
        }
        function render() {
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adcionar(veiculo));
            }
            ;
        }
        return { ler, adcionar, remover, salvar, render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const iNome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const iPlaca = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!iNome || !iPlaca) {
            alert("Informe o NOME e a PLACA!");
            return;
        }
        patio().adcionar({ iNome, iPlaca, iEntrada: new Date().toISOString() }, true);
    });
})();
function changeMode() {
    changeClasses();
    changeText();
}
function changeClasses() {
    botao.classList.toggle(darkModeClass);
    tabelinha.classList.toggle(darkModeClass);
    // h3.classList.toggle(darkModeClass);
    body.classList.toggle(darkModeClass);
    footer.classList.toggle(darkModeClass);
    theade.classList.toggle(darkModeClass);
}
function changeText() {
    const ligthMode = "Modo Claro";
    const darkMode = "Modo Escuro";
    if (body.classList.contains(darkModeClass)) {
        botao.innerHTML = ligthMode;
        // h3.innerHTML    = darkMode + " ON";
    }
    else {
        botao.innerHTML = darkMode;
        // h3.innerHTML    = ligthMode + " ON";
    }
}
const darkModeClass = 'dark-mode';
const botao = document.getElementById('mode-selector');
// const h3            = document.getElementById('page-title');
const body = document.getElementsByTagName('body')[0];
const footer = document.getElementsByTagName('footer')[0];
const theade = document.getElementById('titulo-table');
const tabelinha = document.getElementById("tabelinha");
botao.addEventListener('click', changeMode);
