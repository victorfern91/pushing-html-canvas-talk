Olá a todos,

Hoje vou falar-vos de algumas técnicas que eu utilizei para melhorar a performance de Rendering no canvas. Embora algumas das abordagens que foram todas estejam relacionadas com o problemas que tentei resolver num produto da feedzai, penso que a maioria dos problemas são coisas que podem ser utilizadas quando no nosso dia-a-dia temos que lidar com alguns problemas de performance.

Ok, sobre mim:

O meu nome é Victor Fernandes, tenho 27 anos e atualmente trabalho como front-end developer na feedzai, e antes da feedzai trabalhei na MOG Technologies como Software Developer mas sempre fiz mais coisas releacionadas com **Front-end** e **Ops**.

---

Portanto, agora que estou apresentado vamos lá dar inicio à talk.

O nome desta talk é "Pushing HTML Canvas to the limits" porque vou falar de algumas tecnicas que me ajudaram a renderizar um elevado numero de nós num grafo de forma fluida usando o canvas do browser.

Na feedzai estamos a utilizar grafos, de forma a ser possivel mostrar relacionamentos entres diferentes entidades durante tranasações de forma a ser possivel de forma visual verificar como estas entidades estão relacionadas entre si. Usando grafos é possivel verificar padrões fraudulentos como por exemplo uma pessoa partilhar multiplos cartões com outras pesssoas, uma unica morada ter milhares de tentativas de compras com multiplos cartões, entre outras.

Embora usar gráfos em vez das tradicionais tabelas de relação seja uma forma de melhorar os cruzamentos de dados representar tanta informação no browser torna-se um  desafio técnico bastante elevado pois temos que ser capazes de representar milhares de nós.

___

Topicos:

- Porque não webGL?
    - No nosso caso o bottle-neck era mesmo codigo pouco performante
    - Simulação do d3-force é o nosso bootle-neck
        - memoize para dimunir calculos
    - o WebGL traz imensa complexidade para dentro do projecto e a equipa deixa de ser agil
      visto que só temos apenas um front-end neste produto.

    - A solução foi mesmmo puxar pela criatividade e conseguir puxar pelo canvas de forma a conseguir renderizar o  numero máximo de 20k nós no browser.

Easiers:

- Are you using a zoom? conditional rendering
- Shapes (Rect vs Circles)
- batch canvas calls together
- .map vs forEach vs for loops
- using `requestAnimationFrame` instead of `setInterval`
- clearRect vs fillRect
- memoize de funções que retornam a mesma coisa e que são muito dispendiosas.

Medium:
- avoiding floating-points
- avoid text rendering
- Retina display resolution CSS hack (scaling canvas using css)
- speed up canvas interactions
    - speed up processing with datastrucures
    - falar do nosso caso [].includes() para Set.has()
- multiple canvas for complex scenes

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
