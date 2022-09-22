
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'


describe('login', () => {

    context('quando o usuário é muito bom', () => {

        const user = {
            name: 'Gabriel Jassa',
            email: 'jassa@samuraibs.com',
            password: 'test3qa'
            //  is_provider: true
        }

        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })
    })
})