# What The Floosh Game
What The Floosh Game é um jogo em que você passa por estrelas e outros obstáculos para chegar em seu destino final (inexistente). O objetivo é conseguir mais pontos até acertar uma estrela ou qualquer outro obstáculo.


## Prévias
![Preview 1](screenshots/preview1.png)
![Preview 2](screenshots/preview2.png)


# Para quê essa github?
Simplesmente você pode ajudar a encontrar, vulnerabilidades, bugs, e até mesmo ajudar em questão de idéias.

*Aceito qualquer tipo de idéia*

# Como funciona?
Simples, você começa o jogo e é só desviar de alguns... obstáculos? Sei lá, só isso.


```mermaid
graph TD

A["Flush"]
B["Obstáculo"]
C["Aviões"]
D["Moedas"]
E["Pontos"]

F1["Colide com"]
F2["Colide com"]
FL["Localstorage add"] 
C1["Morre"]
C2["Destrói"]

M["Cena Menu"]

A --> F1 --> B --> C1 --> M
C --> F2 --> B --> C2
D --> F2 --> B --> C2

F1 --> E --> FL --> P["+1"]
F1 --> D --> FL --> P
```

Sei, não dá pra entender, mas é o que eu sei explicar.
