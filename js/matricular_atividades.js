const url = "http://localhost:3000/api";

async function carregarTurmas() {
    try {
        const response = await axios.get(`${url}/turma`);
        const turmas = response.data.result;

        console.log("Turmas carregadas:", turmas); 

        const selectCourse = document.getElementById('select-course');

        turmas.forEach(turma => { 
            const option = document.createElement('option');
            option.value = turma.id;
            option.textContent = turma.nome;
            selectCourse.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar turmas:", error);
        alert('Erro ao carregar turmas. Tente novamente.');
    }
}

async function saveAtividade() {
    const nome = document.getElementById('inputName').value;
    const descricao = document.getElementById('inputDescription').value; 
    const data_entrega = document.getElementById('inputDate').value;
    const peso_nota = document.getElementById('inputPeso').value; 
    const turma_id = document.getElementById('select-course').value;

    if (!nome || !descricao || !data_entrega || !peso_nota || !turma_id) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        await axios.post(`${url}/atividades`, {
            nome,
            descricao,
            data_entrega,
            peso_nota,
            turma_id,
        });
        alert('Atividade lançada com sucesso!');
        document.getElementById('atividade-form').reset(); 
    } catch (error) {
        console.error("Erro ao lançar a atividade:", error);
        alert('Erro ao lançar a atividade. Tente novamente.');
    }
}


window.onload = function() {
    carregarTurmas(); 
    carregarProfessores(); 
};