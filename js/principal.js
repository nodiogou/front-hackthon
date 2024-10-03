
const url = "http://localhost:3000/api";
let selectedTurmaId = null;
const email = localStorage.getItem('professorEmail');

async function selectTurma(id) {
    selectedTurmaId = id;
    document.getElementById('edit-turma-button').disabled = false;
    document.getElementById('delete-turma-button').disabled = false;
}

async function carregarTurmas() {
    if (!email) {
        console.error("E-mail do professor não encontrado.");
        return;
    }

    console.log(email)
    try {
        const response = await axios.get(`${url}/turma/${email}`);

        if (!response.data || !response.data.result) {
            console.error("Nenhuma turma encontrada.");
            return;
        }

        const turmas = response.data.result;
        const selectCourse = document.getElementById('select-course');

        turmas.forEach(turma => {
            const option = document.createElement('option');
            option.value = turma.id;
            option.textContent = turma.nome;
            selectCourse.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar turmas:", error);
    }
}

// Função para editar turma
async function editTurma(id) {
    const nome = prompt("Novo nome da turma:");
    const periodo_letivo = prompt("Novo período letivo:");

    if (nome && periodo_letivo) {
        axios.put(`${url}/turma/${id}`, { nome, periodo_letivo })
            .then(response => {
                alert("Turma alterada com sucesso!");
                location.reload(); 
            })
            .catch(error => {
                console.error("Erro ao alterar turma:", error);
                alert("Erro ao alterar turma. Tente novamente.");
            });
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para deletar turma
async function deleteTurma(id) {
    if (confirm("Você tem certeza que deseja deletar esta turma?")) {
        axios.delete(`${url}/turma/${id}`)
            .then(response => {
                alert(response.data.result); 
                location.reload();
            })
            .catch(error => {
                console.error("Erro ao deletar turma:", error);
                alert("Erro ao deletar turma. Tente novamente.");
            });
    }
}

// Event listeners para os botões de edição e deleção
document.getElementById('edit-turma-button').addEventListener('click', function () {
    if (selectedTurmaId) {
        editTurma(selectedTurmaId);
    } else {
        alert("Nenhuma turma selecionada.");
    }
});

document.getElementById('delete-turma-button').addEventListener('click', function () {
    if (selectedTurmaId) {
        deleteTurma(selectedTurmaId);
    } else {
        alert("Nenhuma turma selecionada.");
    }
});

//atividades

async function carregarAtividades() {
    if (!selectedTurmaId) {
        return;
    }

    try {
        const response = await axios.get(`${url}/atividades/${selectedTurmaId}`);
        const atividade = response.data.result;
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        atividade.forEach(atividades => {
            const dataEntrega = new Date(atividades.data_entrega).toLocaleDateString('pt-BR'); 
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${atividades.turma_id}</td>
                <td>${atividades.nome}</td>
                <td>${atividades.descricao}</td>
                <td>${dataEntrega}</td>
                <td>${atividades.peso_nota}</td>
                <td>
                     <button class="btn btn-warning" onclick="editAtividade(${atividades.id})">Alterar</button>
                    <button class="btn btn-danger" onclick="deleteAtividade(${atividades.id})">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar atividades:", error);
    }
}

async function editAtividade(id) {
    const nome = prompt("Novo nome da atividade:");
    const descricao = prompt("Nova descrição da atividade:");
    const data_entrega = prompt("Nova data de entrega: AAAA-MM-DD");
    const peso_nota = prompt("Novo peso da nota:");
    const turma_id = prompt("ID da turma (caso mude):");
    
    if (nome && descricao && data_entrega && peso_nota && turma_id) {
        axios.put(`${url}/atividades/${id}`, { nome, descricao, data_entrega, peso_nota, turma_id })
            .then(response => {
                alert("Atividade alterada com sucesso!");
                location.reload()

            })
            .catch(error => {
                console.error("Erro ao alterar atividade:", error);
            });
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}



// Função para deletar atividade
async function deleteAtividade(id) {
    if (confirm("Você tem certeza que deseja deletar esta atividade?")) {
        axios.delete(`${url}/atividades/${id}`)
            .then(response => {
                alert(response.data.result);
                location.reload()
            })
            .catch(error => {
                console.error("Erro ao deletar atividade:", error);
            });
    }
}

// Chame loadAtividades ao clicar no botão "Pesquisar"
document.getElementById('search-button').addEventListener('click', function () {
    selectedTurmaId = document.getElementById('select-course').value;
    carregarAtividades();
});

window.onload = function () {
    carregarTurmas();
};
