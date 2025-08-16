# Projeto de Teste Técnico - Automação de Testes para Khan Academy

Este projeto foi desenvolvido como parte de uma avaliação técnica para a posição de Analista de Testes Pleno. O objetivo é demonstrar habilidades em planejamento, documentação, automação de testes E2E (ponta-a-ponta) e configuração de pipeline de CI/CD.

## Tecnologias Utilizadas

* **Framework de Testes:** [Cypress](https://www.cypress.io/)
* **Linguagem:** JavaScript
* **Gerenciador de Pacotes:** NPM
* **CI/CD:** GitHub Actions

## Cenários de Teste Automatizados

Foram automatizados 4 casos de teste críticos, cobrindo 2 fluxos principais da aplicação Khan Academy.

### 1. Busca de Cursos (`search.cy.js`)
* **História de Usuário:** Como um visitante, eu quero buscar por um tópico para encontrar materiais de estudo relevantes.
* **Cenários Cobertos:**
    * `CT-001`: Realizar uma busca bem-sucedida por um termo existente ("Matemática") e validar que a lista de resultados é exibida.
    * `CT-002`: Realizar uma busca por um termo inexistente e validar que a mensagem de "Nenhum resultado" é exibida.

### 2. Autenticação de Usuário (`login.cy.js`)
* **História de Usuário:** Como um usuário cadastrado, eu quero realizar o login para acessar meu painel pessoal.
* **Cenários Cobertos:**
    * `CT-003`: Realizar o login com sucesso utilizando credenciais válidas e validar o redirecionamento para o dashboard do usuário.
    * `CT-004`: Tentar realizar o login com uma senha incorreta e validar a exibição da mensagem de erro apropriada.

## Pré-requisitos

Para executar este projeto, você precisará ter instalado:
* [Node.js](https://nodejs.org/) (versão 16 ou superior)
* [NPM](https://www.npmjs.com/) (geralmente instalado com o Node.js)

## Configuração do Ambiente

Siga os passos abaixo para preparar o ambiente de testes.

**1. Clonar o Repositório**
```bash
git clone [URL_DO_SEU_REPOSITORIO_GIT]
cd [NOME_DA_PASTA_DO_PROJETO]
```

**2. Instalar as Dependências**
Execute o comando abaixo para instalar o Cypress e outras dependências do projeto.
```bash
npm install
```

**3. Configurar as Variáveis de Ambiente**
Para os testes de login, são necessárias credenciais de usuário. Por questões de segurança, elas não são armazenadas no código.

* Crie um arquivo chamado `cypress.env.json` na raiz do projeto.
* Copie e cole o conteúdo abaixo no arquivo, substituindo pelos dados de teste:

```json
{
  "KHAN_USERNAME": "seu_email_aqui@exemplo.com",
  "KHAN_PASSWORD": "sua_senha_aqui"
}
```
> **Nota:** O arquivo `cypress.env.json` está intencionalmente listado no `.gitignore` para seguir as melhores práticas de segurança, evitando o versionamento de dados sensíveis.

## Executando os Testes

Você pode executar os testes de duas formas:

**1. Modo Interativo (Recomendado para depuração)**
Abre a interface gráfica do Cypress, onde você pode ver os testes rodando em tempo real.
```bash
npx cypress open
```

**2. Modo Headless (Usado para execução em linha de comando e CI/CD)**
Executa todos os testes em um navegador em segundo plano e exibe os resultados no terminal.
```bash
npx cypress run
```
Para rodar um arquivo de teste específico:
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## Pipeline de CI/CD

Este projeto contém um arquivo de pipeline para **GitHub Actions** (`.github/workflows/cypress-pipeline.yml`). Ele é configurado para executar todos os testes automaticamente a cada `push` na branch `main`, garantindo a integração contínua e a verificação da saúde da automação.

## Observações e Melhores Práticas Adotadas

* **Seletores Robustos:** Foi dada preferência ao uso de seletores com `data-testid` para desacoplar os testes da estrutura e estilo do HTML, tornando-os mais resilientes.
* **Test Retries:** O projeto está configurado para tentar executar novamente os testes que falharem em modo `runMode`, uma estratégia eficaz para lidar com instabilidades momentâneas no ambiente.
* **Segurança:** Credenciais são gerenciadas via variáveis de ambiente, conforme as melhores práticas do Cypress.