Olá a todos,

O meu nome é Victor Fernandes, tenho 27 anos, quase sempre tabalhei como front-end developer, porém também tenho bastante
interesse na área de DevOps. Atualmente, trabalho como front-end na Feedzai onde estou a ajudar a desenvolver o Genome.
O Genome é uma ferramenta de visualização de dados que recorre a link analysis e a grafos para ajudar a representar as
diferentes conexões entre as diferentes entidades que estão presentes numa transação, facilitando assim a "vida" aos
utilizadores que usam o nosso produto.

Como podem imaginar, este produto tem uma grande a quantidade de dados para representar, e esta talk será um bocado
centrada em algumas coisas que fui aprendendo ao longo do desenvolvimento deste produto. De forma a melhorar a performance
da nossa implementação.

Eu dividi a apresentação em 3 tópicos:

- Na primeira parte irei falar de diferentes formas de representar dados no browser e o que nos levou a optar pelo canvas.
- Na segunda parte irei apresentar algumas tecnicas que podem melhorar a performance do canvas e tambem estas estão
  classificadas pela dificuldade
- Na ultima parte será para explicar como estamos a utilizar a junção destas partes todas num produto


---

Portanto, agora que estou apresentado vamos lá dar inicio à talk.

O nome desta talk é "Pushing HTML Canvas to the limits" porque vou falar de algumas tecnicas que me ajudaram a renderizar um elevado numero de nós num grafo de forma fluida usando o canvas do browser.

Na feedzai estamos a utilizar grafos, de forma a ser possivel mostrar relacionamentos entres diferentes entidades durante tranasações de forma a ser possivel de forma visual verificar como estas entidades estão relacionadas entre si. Usando grafos é possivel verificar padrões fraudulentos como por exemplo uma pessoa partilhar multiplos cartões com outras pesssoas, uma unica morada ter milhares de tentativas de compras com multiplos cartões, entre outras.

Embora usar gráfos em vez das tradicionais tabelas de relação seja uma forma de melhorar os cruzamentos de dados representar tanta informação no browser torna-se um  desafio técnico bastante elevado pois temos que ser capazes de representar milhares de nós.

___

renderizar apenas o que está visivel na janela do utilizador
Topicos:

- Porque não webGL?
    - No nosso caso o bottle-neck era mesmo codigo pouco performante
    - Simulação do d3-force é o nosso bootle-neck
        - memoize para dimunir calculos
    - o WebGL traz imensa complexidade para dentro do projecto e a equipa deixa de ser agil
      visto que só temos apenas um front-end neste produto.

    - A solução foi mesmmo puxar pela criatividade e conseguir puxar pelo canvas de forma a conseguir renderizar o  numero máximo de 20k nós no browser.

    - De facto queremos mesmo ter mais de 20k nós? até que ponto vamos ter uma boa user experience com tantos nós?

Easiers:

- Are you using a zoom? conditional rendering
    - Shapes (Rect vs Circles)
- batch canvas calls together
https://github.com/dg92/Performance-Analysis-JS
- using `requestAnimationFrame` instead of `setInterval`
- `clearRect` vs `fillRect`
- memoize de funções que retornam a mesma coisa e que são muito dispendiosas.
- Retina display resolution CSS hack (scaling canvas using css)

Medium:
- avoiding floating-points
- avoid text rendering
- multiple canvas for complex scenes
    - apenas  fazer update do layer de nodes quando há iterações sobre o  mesmo
-  How to interact with canvas? (slide)
   - .map vs forEach vs for loops
   - speed up canvas interactions
       - speed up processing with datastrucures
       - falar do nosso caso [].includes() para Set.has()
   - hidden canvas to detect mouse interactions

Extreme
- stop Animation Frame when you're no rendering anthing
- offcanvas (web-workers)
- https://www.html5rocks.com/en/tutorials/canvas/performance/#toc-ref
___

Então que maneiras temos para conseguir representar grafos no browser?

Sempre que se fala em rederização de grafos/gráficos no browser acabamos por quase sempre associar 3 diferentes tecnologias:

- SVG
- Canvas
- WebGL

Neste produto que é o Genome, inicalmente na prova de conceito do produto utilizamos o SVG

aqui está um exemplo de como o SVG demorou 11x mais a renderizar a mesma informação que o Canvas



## Realmente queremos mais que 20k nós a serem representados no browser? Será fácil encontrar fraude no meio deste numero de nós?

# OffscreenCanvasf
