<!-- # Geração de apurações
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


OLD
OLD
OLD
OLD
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
--|-------------------------------------------------------|---------------------------------------------|---------------------
y | recente: data da última atualização > data desejada   | { dti: '2017-02-01T01:00' }                 | 2017-02-01T00:59
y | bloqueada                                             | { dti: '2017-02-01T01:00', blocked: true }  | 2017-02-01T01:01
n | inexistente                                           | null                                        | null
n | velha (=): data da última atualização = data desejada | { dti: '2017-02-01T01:00' }                 | 2017-02-01T01:00
n | velha (>): data da última atualização > data desejada | { dti: '2017-02-01T01:00' }                 | 2017-02-01T01:01
n | não bloqueada                                         | { dti: '2017-02-01T01:00', blocked: false } | 2017-02-01T01:01 -->
