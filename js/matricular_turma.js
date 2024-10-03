const url = "http://localhost:3000/api";

async function carregarProfessores() {
    try {
        const response = await axios.get(`${url}/prof`);
        const professores = response.data.result;

        const professorSelect = document.getElementById('professorSelect');
        professores.forEach(prof => {
            const option = document.createElement('option');
            option.value = prof.id;
            option.textContent = prof.nome;
            professorSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar professores:", error);
        alert('Erro ao carregar professores. Tente novamente.');
    }
}

async function matricularTurma(event) {
    event.preventDefault();

    const nome = document.getElementById('inputName').value;
    const  periodo_letivo = document.getElementById('select-periodo').value;
    const professor_id = document.getElementById('professorSelect').value;

    if (!nome || ! periodo_letivo || !professor_id) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        await axios.post(`${url}/turma`, {
            nome,
            periodo_letivo,
            professor_id: professor_id
        });
        alert('Turma matriculada com sucesso!');
        document.getElementById('matricular-form').reset(); 
    } catch (error) {
        console.error("Erro ao matricular turma:", error);
        alert('Erro ao matricular turma. Tente novamente.');
    }
}

window.onload = function() {
    carregarProfessores(); 
};
