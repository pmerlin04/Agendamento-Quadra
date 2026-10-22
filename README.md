# 📅 Sistema de Agendamento de Quadras Esportivas

Uma API RESTful desenvolvida em **ASP.NET Core 10 (C#)** integrada com um **Front-end em JavaScript**, criada para gerenciar a reserva e disponibilidade de quadras esportivas de forma inteligente.

## 🚀 O Projeto
Este projeto foi desenvolvido com o foco em aplicar boas práticas de Engenharia de Software e regras de negócio sólidas. 

O diferencial do sistema é que ele **não armazena horários vazios no banco de dados**. A disponibilidade da quadra é gerada em tempo real pela API (usando LINQ), que subtrai os horários agendados do horário de funcionamento da quadra, garantindo alta performance e um banco de dados limpo.

## ✨ Principais Funcionalidades

-**Login:** O usuário insere o e-mail e senha cadastrados pelo administrador
- **Consulta Inteligente de Disponibilidade:** Retorna apenas os horários livres para uma data específica.
- **Solicitação de Agendamento:** O usuário escolhe um horário e o sistema calcula automaticamente a duração e gera um agendamento com status "Pendente".
- **Consulta de agendamentos:** É possível o usuário visualizar os agendamentos que realizou.
- **Validação de Concorrência:** Impede que dois usuários reservem o mesmo horário simultaneamente.
- **🤖 Background Service (Manutenção Automática):** Uma rotina em segundo plano (`IHostedService`) roda nativamente no servidor para identificar agendamentos "Pendentes" que já passaram do horário e muda o status para "Cancelado" automaticamente, limpando a agenda.

## 🛠️ Tecnologias Utilizadas

**Back-end:**
- C# 
- ASP.NET Core 10 (Web API)
- Entity Framework Core (ORM)
- LINQ (Manipulação de coleções)
- Background Tasks (Hosted Services)
- Configuração de CORS
- Autenticação Jwt

**Front-end:**
- HTML5 & CSS3
- JavaScript Moderno (ES6)
- Consumo de API usando `Fetch API`
- Manipulação e Formatação de Datas (ISO 8601 para pt-BR)

## 🗄️ Modelagem do Banco de Dados
A API possui três entidades principais:
* `Usuário`: Gerencia quem realiza a reserva (Nome, Email).
* `Quadra`: Espaço físico (Tipo de quadra, Bola).
* `Agendamento`: O evento no tempo (Quem, Início, Fim, Status).

