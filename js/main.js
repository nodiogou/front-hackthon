const url = "http://localhost:3000/api"; // sua URL da API

async function login(event) {
    event.preventDefault(); 

    
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post(`${url}/prof/login`, {
            email: email,
            senha: password
        });

        if (response.status === 200) {
            localStorage.setItem('professorEmail', email);
            window.location.href = 'principal.html';
        } else {
            alert("Login falhou. Verifique suas credenciais.");
        }
    } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro ao tentar fazer login. Tente novamente.");
    }
}

async function cadastrarProfessor(event) {
    event.preventDefault();

    const nome = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputPassword').value;

    try {
        const response = await axios.post(`${url}/prof`, {
            nome: nome,
            email: email,
            senha: senha
        });

        if (response.status === 201) {
            alert("Professor cadastrado com sucesso!");
            window.location.href = 'index.html';
        } else {
            alert("Erro ao cadastrar professor. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro no cadastro:", error);
        alert("Erro ao tentar cadastrar. Verifique os dados e tente novamente.");
    }
}




