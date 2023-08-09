# Geração de apurações
- para gerar uma apuração é preciso passar a **empresa**, **funcionário** e **período** para o endpoint `/reckons`.
  - chamar o endpoint `/reckons` com **empresa**, **funcionário** e **período** gera uma apuração


- se a apuração já existir no banco de dados e for **recente** ou estiver **bloqueada**, ela é apenas carregada. Senão ela é criada.
    - gerar uma apuração
      - com apuração válida no banco => carrega a apuração
      - com apuração inválida no banco => cria a apuração
    - apuração é válida se
      Y recente
      Y bloqueada
      N não existir
      N velha
      N não bloqueada





- **funcionário** pode ser seu **id** ou **matrícula**.
  - gerar uma apuração com **matrícula** do funcionário no lugar de id
      - tendo apuração válida no banco **carrega** a apuração
      - tendo apuração inválida no banco **cria** uma apuração




- passando uma **data** no lugar de **período** retorna a apuração que contém a data.
  - gerar uma apuração com **data** no lugar de periodo
      - tendo apuração válida no banco **carrega** a apuração que contém a data
      - tendo apuração inválida no banco **cria** uma apuração que contém a data




- passando um **intervalo** retorna todas as apurações entre o **início** e **fim**.
  - gerar uma apuração com **inicio** e **fim**
      - periodos
        - tendo apurações válidas no banco **carrega** as apurações entre inicio e fim
        - tendo apurações inválidas no banco **cria** as apurações entre inicio e fim
      - datas
        - tendo apurações válidas no banco **carrega** as apurações entre inicio e fim que contem a data
        - tendo apurações inválidas no banco **cria** as apurações entre inicio e fim que contem a data







- passando **mais de um funcionário** retorna apurações para cada um deles




