## Dia 2021-02-01
**Hora Contratual**  **Batida**       **Somatório**
08:00 12:00          07:50 12:10      Horas Trabalhadas   08:25 (00:10 + 00:10 - 00:10 + 00:15)
12:00 14:00          14:10 18:15      Horas Extras 50%    00:35 (00:10 + 00:10 + 00:15)
                                      Atraso             -00:10 (-00:10)
****************************************************************

| Hora Contratual | Batida      | Somatório         |        |
|-----------------|-------------|-------------------|--------|
| 08:00 12:00     | 07:50 12:10 | Horas Trabalhadas | 08:25  |
| 12:00 14:00     | 14:10 18:15 | Horas Extras 50%  | 00:35  |
|                 |             | Atraso            | -00:10 |

****************************************************************

```
HC         BT         ST
0800 1200  0750 1210  Horas Trabalhadas  0825
1400 1800  1410 1815  Horas Extras 50%   0035
                      Atraso             0010
```


**Hora Contratual**
08:00 12:00
12:00 14:00

**Batida**
07:50 12:10
14:10 18:15

**Somatório**
Horas Trabalhadas   08:25 (00:10 + 00:10 - 00:10 + 00:15)
Atraso             -00:10 (-00:10)
Horas Extras 50%    00:35 (00:10 + 00:10 + 00:15)

****************************************************************
**Hora Contratual**     08:00 12:00 12:00 14:00
**Batida**              07:50 12:10 14:10 18:15
**Somatório**
Horas Trabalhadas   08:25 (00:10 + 00:10 - 00:10 + 00:15)
Atraso             -00:10 (-00:10)
Horas Extras 50%    00:35 (00:10 + 00:10 + 00:15)

****************************************************************
HC 0800 1200 1200 1400
BT 0750 1210 1410 1815

ST Horas Trabalhadas   0825
   Atraso             -0010
   Horas Extras 50%    0035

****************************************************************
HC 08:00 12:00 14:00 18:00
BT 07:50 12:10 14:10 18:15

Horas Trabalhadas   08:25
Atraso             -00:10
Horas Extras 50%    00:35

****************************************************************

```js
[['horaContratual',   'batida',      'somatorio'                ],
 ['0800', '1200'],  ['0750, 1210'], ['Horas Trabalhadas', '0825'],
 ['1400', '1800'],  ['1410, 1815'], ['Horas Extras 50%' , '0035'],
 [               ,                , ['Atraso'           , '0010']];


`horaContratual   batida     somatorio
 0800 1200        0750 1210  Horas Trabalhadas  0825
 1400 1800        1410 1815  Horas Extras 50%   0035
                             Atraso             0010`

`
HC         BT         ST
0800 1200  0750 1210  Horas Trabalhadas  0825
1400 1800  1410 1815  Horas Extras 50%   0035
                      Atraso             0010
`

```