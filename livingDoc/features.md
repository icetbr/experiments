pensando
  - facil achar que teste falta / onde colocar novos
  - documentacao para
    - uso interno, quando um dev sai não ficar em duvida sobre o que a feature faz
    - uso externo
      - cartilha, blogs?
      - UI?
- toda feature deve ter uma descrição do que ela e algumas terão versões extendidas, incluindo exemplos
- pensar: o que quero ver como
  - dev
  - po
  - suporte
  - usuario

## philosophy
- gather requirements (features), came up with lots of scenarios, organize?

## OBJETIVOS
- manter testes de "auto nível" em separado
  - motivo: não precisar subir vários sistemas para cada teste
  - auto nível são os testes das camadas superiores, como chamadas REST ou de UI
- não duplicar informação no `describe` e no `it`
  - **motivo**: não precisar rever o describe sempre que alterar um teste
  - pode ser impossível para manter uma boa documentação
- todo *branching* deve ser extraído em função própria
  - **motivo**: reduz explosão combinatorial de testes
    - condizente com boas praticas de atribuição de responsabilidades?
- servir como documentação
  - **motivo**: mais fácil manter atualizado no código do que em um .doc separado
- nao quero subir server com todos os testes, logo, chamar generateRekons direto
- tudo testavel! Incluindo links da documentação
  - toda doc deve vir do codigo
- parametrização
  - precisa acomodar modo "historia"
  - quanto mais estreito mais perto as informações relevantes ficam
- top level p/ documentação, leaves p/ teste auto contido



- style forEach is bad for IDE based integration

- qd usar named Atribute? se documentar o que é apuração válida, como saber que aceita createdAfter?

## DECISOES
- **voz ativa**: uma apuração gerada vs gerar uma apuracao
- **sem detalhes de implementação**: generateReckons(company) vs gerar uma apuracao com empresa
- **um caso por vez**: nao modifique fixture p/ reusar em outros cenários, copie ela
- **negritar *should*** : tendo apuração válida no banco **retorna** a apuração
- não assumir conhecimento passado!?
  - sempre repetir toda a descrição!
- use builders only when they are complicated, favor declaring inline??
- describe = docs, its = repetitive, self contained tests?

- inicialmente manter os 2 formatos!?

   PENSANDO: consigo usar um "retornou "CREATED" ?
   genrateeckon return CREATED? creates? DI?
   - usar DI pois tem logica, mesmo sendo top level function? ou extrair logica ?

- carrega do banco e retorna ela se ela for válida
- carrega do banco mas cria uma nova apuração se ela não for válida
- retorna apuração carregada se ela for válida
- carrega se encontrar apuração válida
- cria se não encontrar apuração válida


# Geração de apurações
- para gerar uma apuração é preciso passar a **empresa**, **funcionário** e **período** para o endpoint `/reckons`.
- se a apuração já existir no banco de dados e for **recente** ou estiver **bloqueada**, ela é apenas carregada. Senão ela é criada.
- passando uma **data** no lugar de **período** retorna a apuração que contém a data.
- passando um **intervalo** retorna todas as apurações entre o **início** e **fim**.
- **funcionário** pode ser seu **id** ou **matrícula**.
- passando **mais de um funcionário** retorna apurações para cada um deles.
- suporta paginação baseada nos funcionários.

### 1
- chamar o endpoint `/reckons` com **empresa**, **funcionário** e **período** retorna uma apuração
  - CRIADA na hora se ela
    - não existir
    - existir mas for velha
    - existir, for recente mas não bloqueada
  - CARREGADA do banco se ela já existir e
    - for recente
    - estiver bloqueada

### 1a
w2ajnmhuk

*****************************************************************
# Geração de apurações 1
- para gerar uma apuração é preciso passar a **empresa**, **funcionário** e **período** para o endpoint `/reckons`.
- se a apuração já existir no banco de dados e for **recente** ou estiver **bloqueada**, ela é apenas carregada. Senão ela é criada.
- passando uma **data** no lugar de **período** retorna a apuração que contém a data.
- passando um **intervalo** retorna todas as apurações entre o **início** e **fim**.
- **funcionário** pode ser seu **id** ou **matrícula**.
- passando **mais de um funcionário** retorna apurações para cada um deles.

# Geração de apurações 2
- chamar o endpoint `/reckons` com **empresa**, **funcionário** e **período**
  - retorna uma apuração **criada** na hora se ela
    - não existir
    - for velha
    - não estiver bloqueada
  - retorna uma apuração **carregada** do banco se ela // ja existir?
    - for recente
    - estiver bloqueada
  - com **data** no lugar de **período** retorna a apuração que contém a data
  - com **intervalo** retorna todas as apurações entre o **início** e **fim**
  - com **mais de um funcionário** retorna apurações para cada um deles

# Geração de apurações 3
- chamar o endpoint `/reckons` com **empresa**, **funcionário** e **período**
  - **cria** na hora se ela for inválida
  - retorna uma apuração **carregada** do banco se ela for válida
  - com **data** no lugar de **período** retorna a apuração que contém a data
  - com **intervalo** retorna todas as apurações entre o **início** e **fim**
  - com **mais de um funcionário** retorna apurações para cada um deles

- não existir
    - existir mas for velha
    - existir, for recente mas não bloqueada
já existir e
  - for recente
  - estiver bloqueada


1) refatora p/ um reckonIsValid mas mantem com DI mock


isValid = needsCreating, needsRefresh



| scenario                                              | reckon                                      | createdAfter     | expected |
|-------------------------------------------------------|---------------------------------------------|------------------|----------|
| recente: data da última atualização > data desejada   | { dti: '2017-02-01T01:00' }                 | 2017-02-01T00:59 | true     |
| bloqueada                                             | { dti: '2017-02-01T01:00', blocked: true }  | 2017-02-01T01:01 | true     |
| inexistente                                           | null                                        | null             | false    |
| velha (=): data da última atualização = data desejada | { dti: '2017-02-01T01:00' }                 | 2017-02-01T01:00 | false    |
| velha (>): data da última atualização > data desejada | { dti: '2017-02-01T01:00' }                 | 2017-02-01T01:01 | false    |
| não bloqueada                                         | { dti: '2017-02-01T01:00', blocked: false } | 2017-02-01T01:01 | false    |


scenario                                              | reckon                                      | createdAfter     | expected
------------------------------------------------------|---------------------------------------------|------------------|---------
recente: data da última atualização > data desejada   | { dti: '2017-02-01T01:00' }                 | 2017-02-01T00:59 | true
bloqueada                                             | { dti: '2017-02-01T01:00', blocked: true }  | 2017-02-01T01:01 | true
inexistente                                           | null                                        | null             | false
velha (=): data da última atualização = data desejada | { dti: '2017-02-01T01:00' }                 | 2017-02-01T01:00 | false
velha (>): data da última atualização > data desejada | { dti: '2017-02-01T01:00' }                 | 2017-02-01T01:01 | false
não bloqueada                                         | { dti: '2017-02-01T01:00', blocked: false } | 2017-02-01T01:01 | false

? | scenario                                              | reckon                                      | createdAfter
--|-------------------------------------------------------|---------------------------------------------|-----------------
y | recente: data da última atualização > data desejada   | { dti: '2017-02-01T01:00' }                 | 2017-02-01T00:59
y | bloqueada                                             | { dti: '2017-02-01T01:00', blocked: true }  | 2017-02-01T01:01
n | inexistente                                           | null                                        | null
n | velha (=): data da última atualização = data desejada | { dti: '2017-02-01T01:00' }                 | 2017-02-01T01:00
n | velha (>): data da última atualização > data desejada | { dti: '2017-02-01T01:00' }                 | 2017-02-01T01:01
n | não bloqueada                                         | { dti: '2017-02-01T01:00', blocked: false } | 2017-02-01T01:01
