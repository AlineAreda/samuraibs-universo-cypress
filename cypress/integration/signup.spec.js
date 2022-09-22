

import signupPage from '../support/pages/signup'

describe('cadastro', () => {

    context('quando o usuário é novato', () => {

        const user = {
            name: 'Aline Areda',
            email: 'aline@samuraibs.com',
            password: 'test3qa'
        }

        before(() => {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', () => {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('quando email já existe', () => {

        const user = {
            name: 'Caio Vierira',
            email: 'caio@samuraibs.com',
            password: 'test3qa',
            is_provider: true
        }

        before(() => {

            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it(' não deve cadastrar o usuário', () => {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })
    })

    context('quando o email é incorreto', () => {

        const user = {
            name: 'Marina Baggio',
            email: 'mari.gmail.com',
            password: 'test3qa'
        }

        it('deve exibir mensagem der alerta', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')

        })

    })

    context('quando a senha é menor que 6 caractere', () => {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']


        beforeEach(() => {
            signupPage.go()
        })

        passwords.forEach((p) => {
            it(' não deve cadastrar com a senha: ' + p, () => {

                const user = { name: 'Cassio Martins', email: 'cassio@samuraibs.com', password: p }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(() => {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })

    })

    context('quando não preencho nenhum dos campos', () => {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(() => {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach((alert) => {

            it('deve exibir ' + alert.toLocaleLowerCase(), () => {
                signupPage.alertHaveText(alert)

            })

        })
    })
})




