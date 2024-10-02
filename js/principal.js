const url = "http://localhost:3000/api";

function selectTurma(id) {
    selectedTurmaId = id;

    document.getElementById('edit-turma-button').disabled = false;
    document.getElementById('delete-turma-button').disabled = false;
}

async function loadTurmas(professorId) {
    try {
        const response = await axios.get(`${url}/turma`, { params: { professor_id: professorId } });
        
        if (!response.data || !response.data.result) {
            console.error("Nenhuma turma encontrada.");
            return;
        }

        const turmas = response.data.result;
        const selectCourse = document.getElementById('select-course');
        selectCourse.innerHTML = ''; // Limpa as opções anteriores
        
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


function editTurma(id) {
    const nome = prompt("Novo nome da turma:");
    const periodo_letivo = prompt("Novo período letivo:");
    const professor_id = prompt("Novo ID do professor:");

    if (nome && periodo_letivo && professor_id) {
        axios.put(`${url}/turma/${id}`, { nome, periodo_letivo, professor_id })
            .then(response => {
                alert("Turma alterada com sucesso!");
                loadTurmas(); // Recarrega as turmas
            })
            .catch(error => {
                console.error("Erro ao alterar turma:", error);
            });
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function deleteTurma(id) {
    if (confirm("Você tem certeza que deseja deletar esta turma?")) {
        axios.delete(`${url}/turma/${id}`)
            .then(response => {
                alert(response.data.result);
                loadTurmas(); // Recarrega as turmas
            })
            .catch(error => {
                console.error("Erro ao deletar turma:", error);
            });
    }
}

document.getElementById('edit-turma-button').addEventListener('click', function() {
    if (selectedTurmaId) {
        editTurma(selectedTurmaId);
    } else {
        alert("Nenhuma turma selecionada.");
    }
});

document.getElementById('delete-turma-button').addEventListener('click', function() {
    if (selectedTurmaId) {
        deleteTurma(selectedTurmaId);
    } else {
        alert("Nenhuma turma selecionada.");
    }
});

async function loadAtividades(turma_id) {
    try {
        const atividadesResponse = await axios.get(`${url}/atividades/${turma_id}`);
        
        if (!atividadesResponse.data || !atividadesResponse.data.result) {
            alert("Nenhuma atividade encontrada.");
            return;
        }

        const atividades = atividadesResponse.data.result;
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        atividades.forEach(atividade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${atividade.turma_id}</td>
                <td>${atividade.nome}</td>
                <td>${atividade.descricao}</td>
                <td>${atividade.data_entrega}</td>
                <td>${atividade.peso_nota}</td>
                <td>
                    <button class="btn btn-warning" onclick="editAtividade(${atividade.id})">Alterar</button>
                    <button class="btn btn-danger" onclick="deleteAtividade(${atividade.id})">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
    } catch (error) {
        console.error("Erro ao carregar atividades:", error);
    }
}

function editAtividade(id) {
    const nome = prompt("Novo nome da atividade:");
    const descricao = prompt("Nova descrição da atividade:");
    const data_entrega = prompt("Nova data de entrega:");
    const peso_nota = prompt("Novo peso da nota:");
    const turma_id = prompt("ID da turma (caso mude):");

    if (nome && descricao && data_entrega && peso_nota && turma_id) {
        axios.put(`${url}/atividades/${id}`, { nome, descricao, data_entrega, peso_nota, turma_id })
            .then(response => {
                alert("Atividade alterada com sucesso!");
                loadAtividades(turma_id); 
            })
            .catch(error => {
                console.error("Erro ao alterar atividade:", error);
            });
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function deleteAtividade(id) {
    if (confirm("Você tem certeza que deseja deletar esta atividade?")) {
        axios.delete(`${url}/atividades/${id}`)
            .then(response => {
                alert(response.data.result);
                const turmaId = document.getElementById('select-course').value;
                loadAtividades(turmaId); 
            })
            .catch(error => {
                console.error("Erro ao deletar atividade:", error);
            });
    }
}

function selectAtividade(id) {
    selectedAtividadeId = id;

    document.getElementById('edit-button').disabled = false;
    document.getElementById('delete-button').disabled = false;
}

window.onload = function() {
    const professorId = 
    loadTurmas(professorId);

    document.getElementById('search-button').addEventListener('click', function() {
        const turmaId = document.getElementById('select-course').value;
        if (turmaId) {
            loadAtividades(turmaId);
        } else {
            alert("Por favor, selecione uma turma.");
        }
    });
};

