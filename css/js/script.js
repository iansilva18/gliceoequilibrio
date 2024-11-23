const btnCadastrar = document.getElementById('btnCadastrar');
const btnCalcular = document.getElementById('btnCalcular');
const btnReiniciar = document.getElementById('btnReiniciar');
const telaCadastro = document.getElementById('cadastro');
const telaMedicao = document.getElementById('medicao');
const resultado = document.getElementById('resultado');

let historico = JSON.parse(localStorage.getItem('historico')) || [];

// Função para salvar o histórico
function salvarHistorico(nome, glicemia, status) {
    historico.push({ nome, glicemia, status, data: new Date().toLocaleString() });
    localStorage.setItem('historico', JSON.stringify(historico));
}

// Evento de Cadastro
btnCadastrar.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;

    if (!nome || !idade) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    telaCadastro.classList.add('hidden');
    telaMedicao.classList.remove('hidden');
});

// Evento de Medição
btnCalcular.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const glicemia = parseFloat(document.getElementById('glicemia').value);

    if (isNaN(glicemia)) {
        alert('Por favor, insira um valor válido.');
        return;
    }

    let status = '';
    if (glicemia < 70) {
        status = 'Baixa';
        resultado.innerText = 'Glicemia baixa. Procure orientação médica.';
        resultado.style.color = 'orange';
    } else if (glicemia >= 70 && glicemia <= 140) {
        status = 'Normal';
        resultado.innerText = 'Glicemia normal.';
        resultado.style.color = 'green';
    } else {
        status = 'Alta';
        resultado.innerText = 'Glicemia alta. Procure orientação médica.';
        resultado.style.color = 'red';
    }

    salvarHistorico(nome, glicemia, status);
});

// Evento de Reinício
btnReiniciar.addEventListener('click', () => {
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('glicemia').value = '';
    resultado.innerText = '';

    telaCadastro.classList.remove('hidden');
    telaMedicao.classList.add('hidden');
});
