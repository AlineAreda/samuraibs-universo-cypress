# Samuraibs -Cypress

![Badge Concluído](http://img.shields.io/static/v1?label=STATUS&message=%20CONCLUIDO&color=GREEN&style=for-the-badge)

Projeto de automação de testes E2E barbearia Samuraibs.

URL WEB: https://samuraibs-web-areda.herokuapp.com

URL API: https://samuraibs-api-areda.herokuapp.com

<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src=".github/assets/samuraibs-web.PNG" />
</h1>

### Cadastro
- [X] Deve cadastrar com sucesso
- [X] Não deve cadastrar o usuário quando email já existe
- [X] Deve exibir mensagem de alerta quando o email é incorreto
- [X]  Deve exibir mensagem de alerta quando a senha é menor que 6 caracteres
- [X] Deve exibir mensagem de campos obrigátorios quando não preencho nenhum dos campos (nome, senha, email)

### Login
- [X] Deve logar com sucesso
- [X] Deve notificar erro de credenciais
- [X] Não deve logar quando o formato do email é inválido 
- [X]  Não deve logar quando não preencher nenhum dos campos

### Resgate de senha
- [X] Deve  poder resgatar a senha por email
- [X] Deve poder cadastrar uma nova senha

### Dashboard de agendamento
- [X] Deve exibir agendamento no dasboard


## 🚀 Tecnologias

- [Node.js] - plataforma de desenvolvimento
- [Cypress] - framework de testes automatizados
- [ElephantSQL] - Banco de dados

## 👨🏻‍💻 Como executar o projeto

[Node.js](https://nodejs.org/) v16 ou superior para executar.


### ✨ Instalação e uso da arquitetura
-----------------------
- Instale o [Node.js](https://nodejs.org/en/download/);
- Baixe este repositório ou faça um git clone;
- Abra o diretório do projeto e execute o comando:
    - `yarn install`
- Para abrir a interface de execução do Cypress, execute no diretório do projeto:
    - `npx cypress open`
- Para execução via linha de comando
    - `npx cypress run` (navegador: default electron)
      - `npx cypress run --browser chrome` 
      
 - [GitHub Action](https://github.com/AlineAreda/samuraibs-universo-cypress/actions) selecione o browser para execução.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feito com 💜 &nbsp;por Aline Areda 👋 &nbsp;[Meu linkedin](https://www.linkedin.com/in/aline-areda/)
