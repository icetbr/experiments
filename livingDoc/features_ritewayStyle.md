# Geração de apurações
- para gerar uma apuração é preciso passar a **empresa**, **funcionário** e **período** para o endpoint `/reckons`.
  describe: /reckons
      given: **empresa**, **funcionário** e **período**
      should: gera uma apuração

- se a apuração já existir no banco de dados e for **recente** ou estiver **bloqueada**, ela é apenas carregada. Senão ela é criada.
    describe: generateReckons com **empresa**, **idFuncionário** e **período**
        given: apuração válida no banco
        should: carrega a apuração

        given: apuração inválida no banco
        should: cria uma apuração

     describe: reckonIsValid
         Y recente
         Y bloqueada
         N não existir
         N velha
         N não bloqueada

- **funcionário** pode ser seu **id** ou **matrícula**.
    describe: generateReckons **matriculaFuncionário**
        given: apuração válida no banco
        should: retorna a apuração

        given: apuração inválida no banco
        should: cria uma apuração

- passando uma **data** no lugar de **período** retorna a apuração que contém a data.
    describe: generateReckons **data**
        given: apuração válida no banco
        should: retorna a apuração que contém a data

        given: apuração inválida no banco
        should: cria uma apuração que contém a data

- passando um **intervalo** retorna todas as apurações entre o **início** e **fim**.
    describe: generateReckons **inicio** **fim**
        describe: periodo
          given: apurações válidas no banco
          should: retorna as apurações entre inicio e fim

          given: apurações inválidas no banco
          should: cria as apurações entre inicio e fim

        describe: data
          given: apurações válidas no banco
          should: retorna as apurações entre inicio e fim que contem a data

          given: apurações inválidas no banco
          should: cria as apurações entre inicio e fim que contem a data


- passando **mais de um funcionário** retorna apurações para cada um deles.
    describe: generateReckons **mais de um funcionário**
      describe: ids
          given: apurações válidas no banco
          should: retorna as apurações dos funcionarios

          given: apurações inválidas no banco
          should: cria as apurações dos funcionarios

      describe: matriculas
          given: apurações válidas no banco
          should: retorna as apurações dos funcionarios

          given: apurações inválidas no banco
          should: cria as apurações dos funcionarios

