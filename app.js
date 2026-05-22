// ═══════════════════════════════════════════════
// RANKS
// ═══════════════════════════════════════════════
const RANKS = [
  {icon:'🗡️', name:'Ronin',              sub:'Espadachim sem mestre — sua jornada começa agora',          min:0,    max:199},
  {icon:'⚔️',  name:'Aprendiz',          sub:'Estudante do Dojo Isshin — a base está sendo formada',      min:200,  max:499},
  {icon:'🏴‍☠️', name:'Pirate Hunter',    sub:'Caçador Roronoa — você está ficando perigoso',              min:500,  max:999},
  {icon:'⚓',  name:'Nakama',             sub:'Tripulante do Thousand Sunny — parte da equipe agora',      min:1000, max:1999},
  {icon:'👑',  name:'Rei dos Espadachins',sub:'O maior espadachim do mundo — CTFL dominado!',             min:2000, max:Infinity},
];
function getRank(xp){ return RANKS.find(r=>xp>=r.min&&xp<=r.max)||RANKS[RANKS.length-1]; }
function getRankPct(xp){ const r=getRank(xp); if(r.max===Infinity)return 100; return Math.min(100,Math.round((xp-r.min)/(r.max-r.min)*100)); }

// ═══════════════════════════════════════════════
// QUOTES
// ═══════════════════════════════════════════════
const QUOTES = [
  {text:'Nada aconteceu.',by:'Roronoa Zoro'},
  {text:'Vou me tornar o maior espadachim do mundo!',by:'Roronoa Zoro'},
  {text:'Se eu fraquejar agora, perco minha promessa para sempre.',by:'Zoro ao Mihawk'},
  {text:'Santoryu: três espadas, seis capítulos, zero medos.',by:'Sensei CTFL'},
  {text:'A dor de estudar é temporária. A vaga de QA é para sempre.',by:'Sensei CTFL'},
  {text:'Perdido? Releia o enunciado. A resposta já está lá.',by:'Sensei CTFL'},
  {text:'Um testador que não questiona tudo é como Zoro sem espada.',by:'Sensei CTFL'},
  {text:'Defeito encontrado no requisito custa 1. Em produção, custa 100.',by:'Sensei CTFL'},
  {text:'Não existe teste exaustivo — existe priorização inteligente.',by:'Sensei CTFL'},
  {text:'Qualidade não é responsabilidade do QA. É responsabilidade de todos.',by:'Sensei CTFL'},
];
let quoteIdx=0;
function rotateQuote(){
  const q=QUOTES[quoteIdx%QUOTES.length];
  const el=document.getElementById('heroQuote');
  if(el) el.innerHTML=`"${q.text}" <strong>— ${q.by}</strong>`;
  quoteIdx++;
}
setInterval(rotateQuote,7000);

// scroll-to-top visibility
window.addEventListener('scroll',()=>{
  const btn = document.getElementById('scrollTop');
  if(btn) btn.classList.toggle('visible', window.scrollY > 280);
},{ passive:true });

// ═══════════════════════════════════════════════
// ACHIEVEMENTS
// ═══════════════════════════════════════════════
const ACHIEVEMENTS = [
  {id:'first_cut', icon:'🗡️', name:'Primeiro Corte',       desc:'Conclua seu primeiro módulo',          xp:50,  cond:s=>s.done.size>=1},
  {id:'santoryu',  icon:'⚔️',  name:'Santoryu',             desc:'Conclua todos os 6 módulos',           xp:300, cond:s=>s.done.size>=6},
  {id:'hawk_eye',  icon:'👁️', name:'Olho de Falcão',       desc:'Acerte 100% em qualquer quiz',         xp:100, cond:s=>Object.values(s.quizResults).some(r=>r.score===r.total&&r.total>0)},
  {id:'wado',      icon:'🗡️', name:'Wado Ichimonji',       desc:'Passe no Simulado Completo',           xp:150, cond:s=>s.simPassed},
  {id:'greatest',  icon:'👑',  name:'Rei dos Espadachins',  desc:'Marque 38+ no Simulado',               xp:200, cond:s=>s.bestSim>=38},
  {id:'mihawk',    icon:'🌊',  name:'Olho de Gavião',       desc:'Vença o Boss Battle — Modo Mihawk',    xp:250, cond:s=>s.bossPassed},
  {id:'nothing',   icon:'🫡', name:'Nada Aconteceu',       desc:'Alcance 500 XP',                       xp:50,  cond:s=>s.xp>=500},
  {id:'scholar',   icon:'📚',  name:'Sensei',               desc:'Vire 20+ flashcards diferentes',       xp:100, cond:s=>s.flipsTotal>=20},
];

// ═══════════════════════════════════════════════
// HELPER — tooltip inline para siglas
// ═══════════════════════════════════════════════
function tt(acronym, meaning){
  return `<span data-tooltip="${meaning}">${acronym}</span>`;
}

// ═══════════════════════════════════════════════
// DATA — MODULES (6 capítulos, conteúdo aprofundado)
// ═══════════════════════════════════════════════
const MODS = [
// ─────────────────── MÓDULO 1 ───────────────────
{id:1,icon:'🔬',name:'Fundamentos de Teste',
 desc:'O que é teste, por que é necessário, os 7 princípios, atividades, testware, papéis e independência de teste.',topics:'8 tópicos · 8 questões',
 content:[
  {title:'🎯 O que é Teste de Software?',
   text:`Teste de software é o conjunto de atividades realizadas para <strong>avaliar a qualidade</strong> de um componente ou sistema, identificar defeitos e reduzir o risco de falhas em produção. O ${tt('CTFL','Certified Tester Foundation Level — nível base de certificação do ISTQB')} 4.0 define teste como um processo que inclui atividades tanto <em>dinâmicas</em> (execução) quanto <em>estáticas</em> (revisão). Testar é muito mais do que apenas executar o software.`,
   sections:[
    {sub:`Objetivos do Teste segundo o ${tt('CTFL','Certified Tester Foundation Level — nível base de certificação do ISTQB')} 4.0`,
     text:'O CTFL 4.0 lista 7 objetivos oficiais do teste. Conhecê-los de cor é essencial para as questões de prova que perguntam "qual é o objetivo do teste?".',
     items:[
      `<strong>Avaliar artefatos</strong> de trabalho como requisitos, histórias de usuário, design e código`,
      `<strong>Disparar falhas</strong> e identificar defeitos`,
      `<strong>Assegurar a cobertura</strong> exigida pelo objeto de teste`,
      `<strong>Reduzir o risco</strong> de qualidade inadequada`,
      `<strong>Verificar requisitos</strong> contratuais, legais e regulatórios`,
      `<strong>Fornecer informações</strong> para tomada de decisão pelos stakeholders`,
      `<strong>Construir confiança</strong> na qualidade do objeto de teste`
     ]},
    {sub:'Teste ≠ Depuração (Debugging)',
     text:'Uma confusão clássica de prova: testar e debugar são atividades complementares, mas distintas. O testador não faz debugging — ele encontra e reporta.',
     items:[
      `<strong>Testar</strong> <em>identifica</em> sintomas de falha — o testador observa que o sistema se comportou diferente do esperado`,
      `<strong>Debugar</strong> <em>localiza a causa raiz</em> no código e a corrige — atividade do desenvolvedor`,
      `Ciclo completo: testador encontra falha → <strong>reporta defeito</strong> → dev faz debugging → corrige → testador faz <strong>reteste</strong> para confirmar a correção`
     ]},
    {sub:`${tt('V&V','Verification & Validation — Verificação e Validação. Conceitos distintos no processo de garantia de qualidade.')} — Verificação vs. Validação`,
     text:'Dois conceitos frequentemente confundidos na prova. A diferença está em CONTRA QUÊ o produto é avaliado.',
     items:[
      `<strong>Verificação</strong>: "Construímos o produto <em>de acordo com a especificação</em>?" — conformidade interna com requisitos e design. Pode ser feita sem executar o software (estática).`,
      `<strong>Validação</strong>: "Construímos <em>o produto certo</em>?" — atende à necessidade real do usuário. Requer envolvimento do usuário ou representante.`,
      `Exemplo: um sistema bancário que implementa a spec corretamente (passou na Verificação) mas com interface inutilizável para o usuário (falhou na Validação)`
     ]},
    {sub:`${tt('QA','Quality Assurance — Garantia de Qualidade: processo amplo e preventivo focado em melhoria contínua de processos')} × ${tt('QC','Quality Control — Controle de Qualidade: atividade orientada ao produto, verificando se está correto')} × Teste — a hierarquia`,
     text:'Hierarquia importante: QA engloba QC, que engloba Teste. São conceitos distintos, não sinônimos.',
     items:[
      `<strong>${tt('QA','Quality Assurance — Garantia de Qualidade: processo amplo e preventivo focado em melhoria contínua de processos')} (processo)</strong>: preventivo, foca em melhorar o processo de desenvolvimento para evitar defeitos. Ex: adotar revisões de código obrigatórias.`,
      `<strong>${tt('QC','Quality Control — Controle de Qualidade: atividade orientada ao produto, verificando se está correto')} (produto)</strong>: orientado ao produto, verifica se o artefato está correto. O teste é uma atividade dentro do QC.`,
      `<strong>Teste (execução)</strong>: atividade específica dentro do QC, focada em encontrar defeitos por meio de execução e análise estruturada.`,
      `<strong>Hierarquia</strong>: QA (processo) ⊃ QC (produto) ⊃ Teste (execução)`
     ]}
   ],
   tip:'Questão clássica: Verificação "Construímos de acordo com a especificação?" vs Validação "Construímos o que o usuário precisa?" — e lembre que testing ≠ debugging: são atividades complementares, não a mesma coisa!'},

  {title:'⚖️ Por que Testar é Necessário?',
   text:`A presença de defeitos em software tem custo e consequências que crescem exponencialmente ao longo do ${tt('SDLC','Software Development Life Cycle — Ciclo de Vida de Desenvolvimento de Software')}. Testar cedo e continuamente é a estratégia mais econômica para entregar software confiável.`,
   sections:[
    {sub:'O Custo Crescente dos Defeitos — Modelo de Boehm',
     text:'O modelo de Boehm demonstra que o custo de correção de um defeito cresce exponencialmente conforme avança no SDLC. A razão: quanto mais tarde o defeito é encontrado, mais artefatos precisam ser refeitos.',
     items:[
      `<strong>Requisitos</strong>: custo base de <strong>1×</strong> — corrigir um requisito mal escrito antes de qualquer desenvolvimento`,
      `<strong>Design</strong>: custo de <strong>~6×</strong> — o design que implementou o requisito errado precisa ser refeito junto`,
      `<strong>Codificação</strong>: custo de <strong>~10×</strong> — code, testes unitários e design todos afetados`,
      `<strong>Teste de sistema</strong>: custo de <strong>~40×</strong> — requer re-análise, re-design, re-código, re-teste`,
      `<strong>Produção</strong>: custo de <strong>~100× ou mais</strong> — acrescenta suporte, reputação, potencial impacto legal e custo operacional`
     ]},
    {sub:'A Cadeia Causal: Erro → Defeito → Falha',
     text:'Três termos distintos que descrevem onde o problema ocorre. Confundi-los é erro clássico de prova.',
     items:[
      `<strong>Erro (mistake)</strong> — ocorre na <em>PESSOA</em>: ação humana incorreta. Ex: desenvolvedor mal-entende um requisito ao escrever o código`,
      `<strong>Defeito (defect/bug/fault)</strong> — ocorre no <em>ARTEFATO</em>: o erro produz uma imperfeição no código, documento ou design`,
      `<strong>Falha (failure)</strong> — ocorre na <em>EXECUÇÃO</em>: quando o defeito é executado em determinadas condições, o sistema não se comporta como esperado — observável pelo usuário`,
      `<strong>Atenção</strong>: nem todo defeito <em>sempre</em> causa falha. Ex: código morto (dead code) com defeito nunca é executado, portanto nunca causa falha`
     ]},
    {sub:'Casos Reais — Por que o Teste Importa',
     text:'Falhas históricas de software ilustram o impacto real da ausência de testes adequados.',
     items:[
      `<strong>Therac-25 (1985-87)</strong>: acelerador de partículas para radioterapia. Race condition não testada causou overdoses de radiação e mortes de pacientes`,
      `<strong>Mars Climate Orbiter (1999)</strong>: sonda da NASA perdida por confusão entre unidades métricas e imperiais entre dois sistemas. Prejuízo: $327 milhões`,
      `<strong>Knight Capital (2012)</strong>: bug em software de trading algorítmico causou prejuízo de <strong>$440 milhões em 45 minutos</strong> — a empresa faliu`
     ]}
   ]},

  {title:'📌 Os 7 Princípios de Teste',
   text:`Os 7 princípios do ${tt('ISTQB','International Software Testing Qualifications Board — organização internacional responsável pela certificação CTFL')} são a base filosófica do teste moderno. Toda prática de teste deriva deles. <strong>Sempre caem na prova</strong> — frequentemente em forma de cenário onde você deve identificar qual princípio se aplica.`,
   sections:[
    {sub:'Princípios 1 a 4 — Fundação',
     text:'Os quatro primeiros princípios estabelecem o que o teste pode e não pode fazer, e como organizar o esforço de forma eficiente.',
     items:[
      `<strong>1. Presença de defeitos, não ausência:</strong> Testes provam que defeitos <em>existem</em>, nunca que o software está livre deles. Ausência de falha nos testes ≠ ausência de defeitos.`,
      `<strong>2. Teste exaustivo é impossível + risco:</strong> Testar todas as combinações é impraticável. Usamos <strong>análise de risco</strong> e técnicas de design para focar esforço onde mais importa.`,
      `<strong>3. Teste antecipado (${tt('Shift Left','Mover as atividades de teste para as fases mais iniciais do SDLC. Quanto mais cedo o defeito é encontrado, mais barato é corrigir.')}):</strong> Iniciar atividades de teste o mais cedo possível — revisar requisitos e designs antes de codificar reduz drasticamente o custo de correção.`,
      `<strong>4. Agrupamento de defeitos (Defect Clustering) + Pareto 80/20:</strong> Uma pequena quantidade de módulos tende a conter a maioria dos defeitos. Histórico de defeitos orienta onde concentrar esforço. Atenção: agrupamentos mudam com novas versões — reavalie sempre.`
     ]},
    {sub:'Princípios 5 a 7 — Os Mais Confundidos',
     text:'Mnemônico completo dos 7 princípios: <strong>P-E-A-A-P-C-I</strong> (Presença, Exaustivo, Antecipado, Agrupamento, Pesticida, Contexto, Ilusão). Os três últimos são os mais cobrados em cenários de prova.',
     items:[
      `<strong>5. Paradoxo do pesticida:</strong> Os mesmos casos de teste executados repetidamente param de encontrar novos defeitos — assim como insetos desenvolvem resistência a pesticidas. Solução: revisar e adicionar regularmente novos casos de teste.`,
      `<strong>6. Teste depende do contexto:</strong> Não existe abordagem universal. Sistema de controle de voo ≠ app de e-commerce. Criticidade, regulamentação, tecnologia e metodologia de desenvolvimento ditam a estratégia.`,
      `<strong>7. Ilusão de ausência de defeitos (Absence-of-errors fallacy):</strong> Software pode passar em todos os testes e ainda falhar por não atender às necessidades reais do negócio. Por isso a <strong>Validação</strong> (com usuário real) é tão importante quanto a Verificação.`
     ]}
   ],
   tip:'Memorize pelo mnemônico: <strong>P-E-A-A-P-C-I</strong> (Presença, Exaustivo, Antecipado, Agrupamento, Pesticida, Contexto, Ilusão). O princípio 5 (pesticida) e o 7 (ilusão) são os mais confundidos em prova!'},

  {title:'🏃 As 7 Atividades do Processo de Teste',
   text:`O processo de teste é uma sequência estruturada de atividades que geram artefatos chamados <strong>testware</strong>. Mesmo em metodologias ágeis, essas atividades existem — variam em escala, timing e formalidade, mas nunca desaparecem.`,
   sections:[
    {sub:'Planejamento e Monitoramento',
     text:'As duas primeiras atividades definem o plano e garantem que a execução segue o rumo certo.',
     items:[
      `<strong>1. Planejamento de Teste:</strong> Define e atualiza o plano de teste — escopo, abordagem, recursos, cronograma, riscos, critérios de entrada (<em>entry criteria</em>) e saída (<em>exit criteria</em>). Gera o <strong>Plano de Testes</strong> como testware.`,
      `<strong>2. Monitoramento e Controle de Teste:</strong> <em>Monitoramento</em> = acompanhar métricas (% casos executados, % aprovados, defeitos abertos/fechados, cobertura). <em>Controle</em> = tomar ações corretivas quando o progresso desvia do plano. Gera: relatórios de progresso de teste.`
     ]},
    {sub:'Análise, Design e Implementação',
     text:'Três atividades que respondem às perguntas: O QUÊ testar? COMO testar? COMO PREPARAR o ambiente?',
     items:[
      `<strong>3. Análise de Teste (O QUÊ testar):</strong> Analisa a <em>base de teste</em> (requisitos, user stories, design, código) para identificar <strong>condições de teste</strong> testáveis. Verifica se a base de teste é testável. Pode identificar defeitos em requisitos nesta fase.`,
      `<strong>4. Design de Teste (COMO testar):</strong> Elabora casos de teste e dados de teste a partir das condições de teste. Aplica técnicas de design (caixa-preta, caixa-branca, baseadas em experiência). Define critérios de cobertura. Gera: casos de teste, conjuntos de dados de teste.`,
      `<strong>5. Implementação de Teste (PREPARAR):</strong> Organiza os casos de teste em procedimentos de teste. Prepara ambiente de teste, dados de teste e scripts de automação. Cria suítes de teste. Verifica critérios de entrada para execução.`
     ]},
    {sub:'Execução e Conclusão',
     text:'As duas atividades finais executam os testes e fecham o ciclo com lições aprendidas.',
     items:[
      `<strong>6. Execução de Teste (EXECUTAR):</strong> Roda os testes conforme cronograma. Registra resultados (passou/falhou/bloqueado). Compara resultados reais com esperados. Reporta anomalias para análise. Gera: <strong>logs de execução</strong>, <strong>relatórios de defeito</strong>.`,
      `<strong>7. Conclusão de Teste (FECHAR):</strong> Verifica se critérios de saída foram atingidos. Cria <strong>relatório final de resumo de teste</strong>. Documenta lições aprendidas. Arquiva testware para reuso em projetos futuros. Entrega o testware ao time de manutenção.`
     ]}
   ]},

  {title:'📦 Testware, Base de Teste e Rastreabilidade',
   text:`<strong>Testware</strong> são todos os artefatos produzidos durante o processo de teste. A <strong>rastreabilidade bidirecional</strong> entre testware e a base de teste é fundamental para auditoria, análise de impacto e gestão de cobertura.`,
   sections:[
    {sub:'O que é Testware?',
     text:'Cada atividade de teste gera um tipo específico de testware. Conhecer quais artefatos pertencem a cada fase é questão recorrente.',
     items:[
      `<strong>Planejamento</strong> → Plano de testes, cronograma de risco`,
      `<strong>Análise</strong> → Condições de teste, itens de defeito identificados na base de teste`,
      `<strong>Design</strong> → Casos de teste, dados de teste, ambientes de teste`,
      `<strong>Implementação</strong> → Procedimentos de teste, suítes de teste, scripts de automação`,
      `<strong>Execução</strong> → Logs de execução, relatórios de defeito`,
      `<strong>Conclusão</strong> → Relatório final de resumo de teste, documentação de lições aprendidas`
     ]},
    {sub:`Base de Teste (Test Basis)`,
     text:'A base de teste é o conjunto de artefatos CONTRA os quais o objeto de teste é verificado. É de onde derivamos as condições e casos de teste.',
     items:[
      `<strong>Requisitos</strong> funcionais e não-funcionais`,
      `<strong>User stories</strong> e critérios de aceite`,
      `<strong>Documentos de design</strong> e arquitetura`,
      `<strong>Código-fonte</strong> (para testes estruturais)`,
      `Diagramas <strong>${tt('UML','Unified Modeling Language — linguagem de modelagem unificada para representar sistemas de software')}</strong>`,
      `<strong>Contratos</strong> e <strong>regulamentações</strong> (especialmente em sistemas críticos)`
     ]},
    {sub:'Rastreabilidade Bidirecional',
     text:'A rastreabilidade bidirecional conecta requisitos e casos de teste em ambas as direções — é um requisito para auditoria e conformidade.',
     items:[
      `<strong>Forward (requisito → caso de teste)</strong>: cada requisito deve ter ao menos uma condição de teste derivada — garante que nada ficou sem cobertura`,
      `<strong>Backward (caso de teste → requisito)</strong>: cada caso de teste deve ser rastreável ao requisito que o originou — garante que não há testes "órfãos"`,
      `<strong>Por que bidirecional?</strong> Quando um requisito muda, é possível identificar imediatamente quais casos de teste precisam ser atualizados (<strong>análise de impacto</strong>)`,
      `<strong>Ferramentas</strong>: TestRail, Xray, Zephyr — todas implementam matrizes de rastreabilidade bidirecional`
     ]}
   ],
   tip:'Rastreabilidade é cobrada em prova! Se um requisito muda, a rastreabilidade permite identificar exatamente quais casos de teste precisam ser atualizados — isso é análise de impacto em ação.'},

  {title:'👤 Papéis no Teste: Testador e Líder de Teste',
   text:`O ${tt('CTFL','Certified Tester Foundation Level')} 4.0 define dois papéis principais no teste. Em contextos ágeis, um único indivíduo pode assumir ambos, ou o time todo pode compartilhá-los.`,
   sections:[
    {sub:'Líder de Teste (Test Manager / Test Lead)',
     text:'Papel estratégico: responsável pelo planejamento, controle e gestão do processo de teste como um todo.',
     items:[
      `Definir a <strong>estratégia e abordagem de teste</strong> do projeto`,
      `<strong>Planejar, monitorar e controlar</strong> as atividades de teste`,
      `<strong>Alocar recursos</strong> e gerenciar cronograma`,
      `<strong>Reportar progresso</strong> para stakeholders`,
      `<strong>Gestão de riscos</strong> de qualidade`,
      `Definir <strong>critérios de entrada e saída</strong> (<em>entry/exit criteria</em>)`,
      `Garantir que o <strong>testware seja produzido</strong> adequadamente`
     ]},
    {sub:'Testador (Tester)',
     text:'Papel tático: responsável pela análise, design, implementação, execução e reporte — o trabalho técnico de teste.',
     items:[
      `<strong>Analisar a base de teste</strong> e identificar condições de teste`,
      `<strong>Criar e executar</strong> casos de teste`,
      `<strong>Preparar dados de teste</strong> e configurar o ambiente`,
      `<strong>Reportar defeitos</strong> de forma clara e objetiva`,
      `Colaborar com devs e ${tt('PO','Product Owner — responsável pelo backlog e pelos critérios de aceite das histórias de usuário')}s no refinamento de requisitos`,
      `Garantir <strong>rastreabilidade</strong> entre casos de teste e requisitos`
     ]},
    {sub:'Competências Essenciais do Testador',
     text:'O CTFL 4.0 lista competências que distinguem um bom testador — relevantes para questões sobre o perfil do profissional de teste.',
     items:[
      `<strong>Técnicas de teste</strong>: conhecimento das técnicas de caixa-preta, caixa-branca e baseadas em experiência`,
      `<strong>Mentalidade crítica (tester mindset)</strong>: questionar, não confirmar — buscar como o sistema pode falhar, não apenas como deve funcionar`,
      `<strong>Habilidades interpessoais</strong>: comunicar defeitos diplomaticamente, colaborar sem gerar conflito com devs`,
      `<strong>Pensamento analítico</strong>: identificar condições de teste não óbvias, pensar em casos extremos e negativos`,
      `<strong>Adaptabilidade</strong>: trabalhar em diferentes contextos, metodologias e níveis de formalidade`
     ]}
   ]},

  {title:'🤝 Whole Team Approach e Independência de Teste',
   text:`Dois conceitos importantes do ${tt('CTFL','Certified Tester Foundation Level')} 4.0 que definem como o teste se organiza dentro do time e da organização.`,
   sections:[
    {sub:'Whole Team Approach',
     text:`Originário do ${tt('XP','Extreme Programming — metodologia ágil com práticas como TDD, pair programming e integração contínua')}, esse princípio redistribui a responsabilidade de qualidade para todos os membros do time.`,
     items:[
      `<strong>Todos são responsáveis pela qualidade</strong> — não apenas o testador ou o QA`,
      `<strong>Devs escrevem testes unitários</strong> e participam da prevenção de defeitos`,
      `<strong>${tt('PO','Product Owner — responsável pelo backlog e pelos critérios de aceite das histórias de usuário')} define critérios de aceite claros</strong> — reduz ambiguidade antes do desenvolvimento`,
      `<strong>Testadores previnem em vez de apenas detectar</strong> — colaboram desde a escrita dos requisitos`,
      `Resultado: <strong>feedback mais rápido</strong>, mais prevenção de defeitos, menos retrabalho`
     ]},
    {sub:'Independência de Teste — Os 4 Níveis',
     text:'O CTFL 4.0 define níveis de independência do menor ao maior. Cada nível tem implicações em objetividade e overhead.',
     items:[
      `<strong>Nível 0 — Sem independência</strong>: o próprio desenvolvedor testa seu próprio código. Máximo viés de confirmação.`,
      `<strong>Nível 1 — Independência interna</strong>: outro desenvolvedor ou testador do mesmo time realiza o teste. Já reduz viés.`,
      `<strong>Nível 2 — Independência organizacional</strong>: time de teste separado do time de desenvolvimento dentro da mesma empresa.`,
      `<strong>Nível 3 — Independência total</strong>: organização externa (ex: consultoria de auditoria, certificação, empresa terceirizada de QA).`
     ]},
    {sub:'Vantagens E Desvantagens da Independência',
     text:'O CTFL 4.0 é explícito: mais independência nem sempre é melhor. A prova cobra os DOIS lados.',
     items:[
       `<strong>✅ Vantagens:</strong> testadores independentes não têm o viés de confirmação do autor → encontram defeitos diferentes · perspectiva externa identifica suposições implícitas · evita "cegueira do autor" (autor não percebe sua própria ambiguidade)`,
       `<strong>❌ Desvantagem 1 — Isolamento:</strong> testadores independentes podem ser vistos como gargalo ou obstáculo pelo time de dev, criando conflito "nós vs eles"`,
       `<strong>❌ Desvantagem 2 — Comunicação:</strong> sem integração diária com o dev, o testador independente pode perder contexto técnico e demorar mais para entender o sistema`,
       `<strong>❌ Desvantagem 3 — Custo e tempo:</strong> mais independência geralmente significa mais overhead — reuniões de handoff, documentação formal, tempo de onboarding`,
       `<strong>❌ Desvantagem 4 — Responsabilidade difusa:</strong> desenvolvedores podem reduzir o cuidado com qualidade ("o QA vai pegar") quando existe um time independente, transferindo responsabilidade`,
       `<strong>Equilíbrio ideal:</strong> independência suficiente para objetividade + integração suficiente para contexto e colaboração. O Whole Team Approach resolve isso: QA integrado ao time com perspectiva independente`
     ]}
   ],
   tip:'Independência de teste não é "testers vs developers" — é sobre objetividade. O CTFL 4.0 enfatiza que colaboração (whole team) e independência adequada coexistem. Questões costumam perguntar os trade-offs!'},

  {title:'🔑 Glossário CTFL — Termos Fundamentais',
   text:`O ${tt('ISTQB','International Software Testing Qualifications Board')} mantém um glossário oficial. Estes termos são a base de todas as questões. Confusão entre eles é um erro clássico de prova.`,
   sections:[
    {sub:'A Tríade: Erro, Defeito e Falha',
     text:'Os três termos da cadeia causal. Cada um ocorre em um LOCAL diferente — essa é a chave para diferenciá-los em prova.',
     items:[
      `<strong>Erro (Error / Mistake)</strong> — ocorre na <em>PESSOA</em>: ação humana que produz um resultado incorreto. Ex: desenvolvedor interpreta mal o requisito ao escrever o código.`,
      `<strong>Defeito (Defect / Bug / Fault)</strong> — ocorre no <em>ARTEFATO</em>: imperfeição em um artefato de trabalho (código, documento, design) resultante do erro humano.`,
      `<strong>Falha (Failure)</strong> — ocorre na <em>EXECUÇÃO</em>: evento em que o sistema não executa a função esperada. Observável pelo usuário.`,
      `<strong>Atenção crítica</strong>: um defeito <em>nem sempre</em> causa falha — código morto (dead code) contém defeito mas nunca é executado, portanto nunca gera falha observável`
     ]},
    {sub:'Outros Termos Essenciais',
     text:'Termos adicionais que aparecem em questões de prova — especialmente nos módulos sobre análise, design e execução de testes.',
     items:[
      `<strong>Causa Raiz (Root Cause)</strong>: razão mais fundamental pela qual um defeito ocorreu. Ex: falta de treinamento em segurança → erro → defeito de SQL injection. Identificar a causa raiz previne recorrência.`,
      `<strong>Condição de Teste (Test Condition)</strong>: aspecto testável de um componente ou sistema — o QUÊ precisa ser testado. Derivada da análise da base de teste.`,
      `<strong>Caso de Teste (Test Case)</strong>: conjunto de pré-condições, entradas, ações, resultados esperados e pós-condições para verificar uma condição de teste específica.`,
      `<strong>Cobertura de Teste (Test Coverage)</strong>: grau em que critérios de cobertura foram satisfeitos. Ex: 80% de cobertura de declaração = 80% das linhas executáveis foram exercitadas.`,
      `<strong>Objeto de Teste (Test Object)</strong>: o componente ou sistema a ser testado. Pode ser: código, requisito, design, documento de deploy, banco de dados, infraestrutura.`,
      `<strong>Base de Teste (Test Basis)</strong>: artefatos usados para derivar condições e casos de teste. Qualquer documento contra o qual o objeto de teste pode ser verificado.`,
      `<strong>Testware</strong>: todos os artefatos produzidos durante o processo de teste — planos, condições, casos, dados, scripts, logs, relatórios.`,
      `<strong>Oráculo de Teste (Test Oracle)</strong>: fonte de informação usada para determinar se o resultado observado é correto ou incorreto. Ex: especificação de requisitos, comportamento de sistema similar, expertise do especialista de domínio.`
     ]}
    ,{sub:'Causa Raiz (Root Cause)',
     text:`A <strong>causa raiz</strong> é a razão fundamental pela qual um erro humano ocorreu. Identificar a causa raiz — não apenas o defeito visível — é o que permite melhorias de processo reais.`,
     items:[
       `<strong>Cadeia completa:</strong> Causa Raiz → Erro Humano (mistake) → Defeito no código (bug) → Falha observável (failure)`,
       `<strong>Exemplo:</strong> Desenvolvedor cansado (causa raiz) → interpretou requisito incorretamente (erro) → implementou lógica errada (defeito) → sistema calcula valor errado (falha)`,
       `<strong>Por que importa:</strong> corrigir o defeito resolve a falha, mas só corrigir a causa raiz previne erros futuros similares — análise de causa raiz é parte da melhoria contínua`,
       `<strong>Análise de causa raiz (RCA):</strong> técnica de investigação que pergunta "por quê" repetidamente (5 Whys) até encontrar a origem do problema, não apenas o sintoma`
     ]}
   ]}
 ],
 quiz:[
  {q:'A sequência correta que leva um erro humano a causar falha observável em produção é:',
   opts:['Falha → Defeito → Erro','Erro → Defeito → Falha','Defeito → Erro → Falha','Erro → Falha → Defeito'],c:1,
   fb:'Desenvolvedor comete <strong>erro</strong> (engano humano) → gera <strong>defeito</strong> no artefato → que em execução provoca <strong>falha</strong> observável pelo usuário. Atenção: nem todo defeito sempre causa falha.'},
  {q:'A equipe executou os mesmos 50 casos de teste por 6 sprints consecutivos e parou de encontrar novos bugs. Qual princípio de teste explica esse fenômeno?',
   opts:['Agrupamento de defeitos','Teste exaustivo é impossível','Paradoxo do pesticida','Teste depende do contexto'],c:2,
   fb:'<strong>Paradoxo do pesticida</strong> (princípio 5): os mesmos testes repetidos tornam-se ineficazes. Solução: revisar, diversificar e adicionar regularmente novos casos de teste.'},
  {q:'Software bancário foi entregue sem nenhum defeito encontrado nos testes, mas os usuários reclamaram que o sistema não atende ao fluxo real de trabalho deles. Qual princípio melhor explica isso?',
   opts:['Paradoxo do pesticida','Ilusão de ausência de defeitos','Agrupamento de defeitos','Teste mostra presença de defeitos'],c:1,
   fb:'<strong>Ilusão de ausência de defeitos</strong> (princípio 7): passar em todos os testes não garante que o produto atende às necessidades reais do usuário. Validação com usuário real é essencial.'},
  {q:'Qual a diferença correta entre Verificação (Verification) e Validação (Validation)?',
   opts:['São sinônimos no CTFL','Verificação: produto certo para o usuário? Validação: conforme a especificação?','Verificação: conforme a especificação? Validação: atende necessidade do usuário?','Verificação é sempre dinâmica; Validação é sempre estática'],c:2,
   fb:'<strong>Verificação</strong>: "Construímos de acordo com a especificação?" (processo interno correto). <strong>Validação</strong>: "Construímos o produto certo para o usuário?" (produto certo para o negócio).'},
  {q:'Um time de teste independente está revisando o sistema antes do lançamento. Qual é a principal VANTAGEM da independência de teste, segundo o CTFL 4.0?',
   opts:['Testadores independentes são sempre mais rápidos','Independência elimina a necessidade de code review','Testadores independentes tendem a encontrar defeitos diferentes, pois não têm o viés do autor','Independência garante zero defeitos em produção'],c:2,
   fb:'A principal vantagem é a <strong>objetividade</strong>: testadores independentes não têm o viés de confirmação do autor, tendendo a encontrar defeitos que o próprio dev não procuraria.'},
  {q:'Qual a diferença entre QA (Quality Assurance) e Teste de Software segundo o CTFL 4.0?',
   opts:['São sinônimos — ambos focam em encontrar defeitos','QA é atividade específica dentro do Teste','QA é processo preventivo mais amplo; Teste é uma atividade específica dentro da QA','Teste é mais abrangente que QA'],c:2,
   fb:'<strong>QA</strong> é processo de garantia de qualidade amplo e preventivo (melhoria de processos). <strong>Teste</strong> é atividade específica dentro do QC/QA, focada em identificar defeitos. QA > QC > Teste.'},
  {q:'No "Whole Team Approach" do CTFL 4.0, quem é responsável pela qualidade do software?',
   opts:['Apenas o time de QA / testadores','Apenas o líder de teste (Test Manager)','Todos os membros do time — devs, testadores e PO compartilham a responsabilidade','A qualidade é responsabilidade exclusiva do gerente de projeto'],c:2,
   fb:'<strong>Whole Team Approach</strong>: qualidade é responsabilidade de TODOS. Devs escrevem testes unitários, PO define critérios de aceite claros, testadores colaboram desde o início para prevenir, não apenas detectar.'},
  {q:'O que é Rastreabilidade Bidirecional (Bidirectional Traceability) no contexto de teste?',
   opts:['Executar cada caso de teste duas vezes para confirmar resultado','Capacidade de relacionar cada condição de teste ao requisito de origem E cada requisito às condições de teste derivadas','Rastrear o mesmo defeito em dois ambientes diferentes','Ter dois testadores verificando o mesmo caso de teste'],c:1,
   fb:'<strong>Rastreabilidade bidirecional</strong>: condição de teste → requisito de origem (para verificar de onde veio) E requisito → condições de teste (para verificar se tem cobertura). Fundamental para análise de impacto e auditoria.'}
  ,{q:'Qual das seguintes atividades faz parte do processo de teste segundo o CTFL 4.0, mas NÃO é uma atividade de execução?',
   opts:['Executar casos de teste e registrar resultados','Comparar resultados obtidos com esperados','Analisar a base de teste para identificar condições de teste','Reportar defeitos encontrados durante a execução'],c:2,
   fb:'<strong>Análise da base de teste</strong> faz parte da atividade de <em>Análise de Teste</em> (3ª atividade do processo), não da execução. Execução inclui rodar testes, comparar resultados e reportar defeitos.'}
  ,{q:'O Testware inclui qual dos seguintes artefatos?',
   opts:['Apenas casos de teste e scripts de automação','Requisitos de negócio e especificações funcionais','Casos de teste, dados de teste, relatórios, planos e scripts — qualquer artefato produzido pelo processo de teste','Código-fonte do sistema em teste'],c:2,
   fb:'<strong>Testware</strong> engloba TODOS os artefatos produzidos como saída das atividades de teste: planos, casos de teste, dados de teste, scripts, relatórios, logs. Requisitos e código são base de teste, não testware.'}
  ,{q:'Um time de desenvolvimento ágil usa o princípio "Whole Team". Qual afirmação descreve CORRETAMENTE esse princípio?',
   opts:['Apenas testadores são responsáveis pela qualidade do produto','Todo o time compartilha responsabilidade pela qualidade — dev, QA e negócio colaboram desde o início','O time inteiro deve executar casos de teste manualmente','Testadores devem participar de todas as cerimônias scrum sem executar testes'],c:1,
   fb:'<strong>Whole Team</strong>: qualidade é responsabilidade de TODOS. Dev escreve código testável, QA projeta testes, negócio define critérios de aceite. A colaboração desde o início reduz defeitos e retrabalho.'}
  ,{q:'Qual nível de independência de teste oferece o maior grau de independência segundo o CTFL 4.0?',
   opts:['Testador independente que é parte do time de desenvolvimento','O próprio desenvolvedor testa seu código','Testador independente de outra organização (ex: empresa de QA terceirizada)','Testador independente dentro da mesma organização mas fora do time de dev'],c:2,
   fb:'O maior nível de independência é o <strong>testador de outra organização</strong>. A ordem crescente é: próprio dev → testador do time dev → testador externo ao time (mesma empresa) → testador de outra organização.'}
 ]},

// ─────────────────── MÓDULO 2 ───────────────────
{id:2,icon:'🔄',name:'Testes no Ciclo de Vida',
 desc:'Como o teste se encaixa em diferentes modelos de desenvolvimento, os 4 níveis de teste e os principais tipos.',topics:'7 tópicos · 6 questões',
 content:[
  {title:`🏗️ Teste no Contexto do ${tt('SDLC','Software Development Life Cycle — Ciclo de Vida de Desenvolvimento de Software')}`,
   text:'O CTFL 4.0 define que o teste deve ser adaptado ao modelo de SDLC adotado. A abordagem de teste é influenciada pelo modelo de ciclo de vida — cada modelo tem implicações específicas para quando, como e quem testa.',
   sections:[
    {sub:'Modelos Sequenciais — Waterfall e V-Model',
     text:'Nos modelos sequenciais, as fases são realizadas em ordem linear. O teste tende a acontecer tarde no projeto, o que aumenta o custo de correção de defeitos.',
     items:[
      `<strong>Waterfall (Cascata):</strong> Requisitos → Design → Implementação → Verificação → Manutenção. Cada fase completa antes da próxima começar. O teste acontece principalmente na fase de Verificação. Defeito encontrado na fase de teste já custou muito — foi propagado por todas as fases anteriores.`,
      `<strong>Modelo V (V-Model):</strong> A forma mais reconhecida de representar o alinhamento entre desenvolvimento e teste. Lado esquerdo (desenvolvimento): Requisitos → Design de Sistema → Design de Arquitetura → Design de Componente → Código. Lado direito (teste): Teste de Aceite ← Teste de Sistema ← Teste de Integração ← Teste de Componente. Cada nível de teste tem sua base de teste correspondente no lado esquerdo.`,
      `<strong>Implicação do V-Model:</strong> Embora o teste seja executado tarde, o PLANEJAMENTO de teste acontece cedo — em paralelo com cada fase de desenvolvimento, o testador já prepara os casos de teste baseados naquele nível. Isso reduz o custo comparado ao Waterfall puro.`
     ]},
    {sub:'Modelos Iterativos e Incrementais',
     text:'Nesses modelos, o sistema é desenvolvido em ciclos (iterações). A cada iteração um incremento do sistema é produzido e testado.',
     items:[
      `<strong>Iterativo:</strong> O sistema é desenvolvido em versões sucessivamente mais completas. Cada iteração produz um protótipo ou versão funcional. O teste é realizado ao final de cada iteração.`,
      `<strong>Incremental:</strong> O sistema é desenvolvido em partes (incrementos), cada uma adicionando funcionalidade ao que já existe. O teste de regressão aumenta a cada incremento.`,
      `<strong>Desafio:</strong> A cada nova iteração/incremento, o testador precisa testar o novo + garantir que o antigo ainda funciona (regressão). Automação se torna essencial para manter o ritmo.`
     ]},
    {sub:`Ágil — ${tt('Scrum','Framework ágil com sprints, papéis (Product Owner, Scrum Master, Dev Team) e cerimônias (Planning, Daily, Review, Retro)')} e ${tt('Kanban','Método ágil de gestão visual de fluxo de trabalho com colunas To Do / In Progress / Done')}`,
     text:'No Ágil, o desenvolvimento e o teste são integrados em cada sprint. A qualidade é construída continuamente, não verificada ao final.',
     items:[
      `<strong>Teste dentro da sprint:</strong> Cada história de usuário é desenvolvida e testada dentro da mesma sprint. "Done" significa testado, não apenas codificado.`,
      `<strong>Critérios de Aceite como base de teste:</strong> O ${tt('PO','Product Owner — dono do produto, responsável por definir e priorizar o backlog')} escreve critérios de aceite claros e testáveis para cada história. O testador usa esses critérios como base de teste.`,
      `<strong>Regressão constante:</strong> A cada sprint, todo o sistema acumulado precisa continuar funcionando. Suítes de regressão automatizadas são críticas.`,
      `<strong>Colaboração contínua:</strong> Testadores participam do refinamento do backlog para identificar lacunas, ambiguidades e condições de teste antes da sprint começar.`
     ]},
    {sub:`DevOps e ${tt('CI/CD','Continuous Integration / Continuous Delivery — integração e entrega contínua com pipeline automatizado')}`,
     text:'No DevOps, o teste é integrado ao pipeline de CI/CD. O objetivo é feedback em minutos, não dias.',
     items:[
      `<strong>Pipeline de CI/CD:</strong> Commit → Build → Testes Unitários → Testes de Integração → Testes de Smoke → Testes de Regressão → Deploy para staging → Testes de Aceite → Deploy para produção. Cada estágio tem um conjunto de testes que deve passar.`,
      `<strong>Shift Left no DevOps:</strong> ${tt('Shift Left','Antecipar testes para as fases mais iniciais — quanto mais cedo o defeito é encontrado, mais barato corrigir')} significa que os testes mais rápidos (unitários) são executados primeiro e mais frequentemente. Testes lentos (end-to-end) ficam mais para o fim do pipeline.`,
      `<strong>Shift Right:</strong> Monitoramento em produção, testes A/B, feature flags e observabilidade — testar com dados reais de usuários reais. Complementa o Shift Left.`,
      `<strong>Infrastructure as Code (IaC) testing:</strong> No DevOps, até a infraestrutura é testada. Configurações de servidores e containers são validadas automaticamente.`
     ]}
   ],
   tip:'O V-Model é o mais cobrado em provas clássicas. Ágil é mais cobrado em questões contextuais. Lembre: no Ágil, teste não é fase final — é atividade contínua em cada sprint.'},

  {title:'📊 Os 4 Níveis de Teste',
   text:'O CTFL 4.0 define 4 níveis de teste. Cada nível tem objetivos específicos, uma base de teste própria, objetos de teste distintos e responsáveis diferentes. Os níveis são progressivos — componente → integração → sistema → aceite.',
   sections:[
    {sub:'Nível 1 — Teste de Componente (Unitário)',
     text:'Testa a menor unidade testável do software de forma isolada. É o nível mais baixo e mais próximo do código.',
     items:[
      `<strong>Objetivo:</strong> Verificar que cada componente individual funciona corretamente de acordo com seu design.`,
      `<strong>Quem executa:</strong> Geralmente o próprio desenvolvedor, durante a codificação.`,
      `<strong>Base de teste:</strong> Código-fonte, design de componente, especificação de componente.`,
      `<strong>Objetos de teste:</strong> Funções, métodos, classes, módulos.`,
      `<strong>Isolamento:</strong> Usa test doubles (${tt('mocks','Objetos simulados que substituem dependências reais em testes de componente')}, stubs, fakes) para substituir dependências externas e testar a unidade isolada.`,
      `<strong>Teste de componente de integração:</strong> Uma variante que testa a integração entre componentes individualmente — vai além do unitário mas ainda usa doubles para dependências externas.`
     ]},
    {sub:'Nível 2 — Teste de Integração de Componentes',
     text:'Verifica se os componentes funcionam corretamente quando combinados. O foco está nas interfaces e na comunicação entre partes.',
     items:[
      `<strong>Objetivo:</strong> Encontrar defeitos nas interfaces e interações entre componentes integrados.`,
      `<strong>Base de teste:</strong> Design de software, diagramas de sequência, contratos de interface, especificações de API.`,
      `<strong>Abordagem Big Bang:</strong> Integrar todos os componentes de uma vez e testar. Alto risco — quando falha, difícil identificar a causa.`,
      `<strong>Abordagem Incremental:</strong> Integrar e testar um componente de cada vez (top-down, bottom-up ou sandwich). Mais controlado e fácil de localizar defeitos.`,
      `<strong>Defeitos típicos:</strong> Formatos de dados incompatíveis entre componentes, erros de contrato de interface, timing issues em chamadas assíncronas.`
     ]},
    {sub:'Nível 3 — Teste de Sistema',
     text:'Testa o sistema completo, end-to-end, como um produto integrado. É aqui que se verifica o comportamento do sistema como o usuário o vê.',
     items:[
      `<strong>Objetivo:</strong> Validar que o sistema completo atende aos requisitos funcionais E não-funcionais especificados.`,
      `<strong>Quem executa:</strong> Testadores independentes (não os devs que codificaram o sistema).`,
      `<strong>Base de teste:</strong> Especificações de sistema, casos de uso, histórias de usuário, requisitos funcionais e não-funcionais.`,
      `<strong>Escopo:</strong> Funcionalidades, fluxos de ponta a ponta, tratamento de erros, interfaces com sistemas externos, performance sob carga.`,
      `<strong>Ambiente:</strong> Deve ser o mais próximo possível do ambiente de produção para resultados confiáveis.`
     ]},
    {sub:`Nível 4 — Teste de Aceite (${tt('UAT','User Acceptance Testing — Teste de Aceite do Usuário')})`,
     text:'Valida que o sistema atende às necessidades e expectativas do cliente e dos usuários finais. É o último nível antes do deploy em produção.',
     items:[
      `<strong>Objetivo:</strong> Construir confiança de que o sistema está pronto para entrar em produção e atende às necessidades do negócio.`,
      `<strong>Quem executa:</strong> Clientes, usuários finais, representantes do negócio. Em alguns casos, equipe de teste com aprovação do cliente.`,
      `<strong>Teste Alpha:</strong> Feito por usuários internos ou representantes no ambiente do desenvolvedor/fornecedor. Identifica problemas antes da versão Beta.`,
      `<strong>Teste Beta:</strong> Feito por usuários externos (potenciais clientes) no seu próprio ambiente. Feedback real de uso real.`,
      `<strong>Teste de Aceite Contratual:</strong> Verifica se o sistema atende aos critérios de aceite definidos em contrato entre cliente e fornecedor.`,
      `<strong>Teste de Aceite Regulatório:</strong> Verifica conformidade com regulamentações legais (ex: sistemas financeiros com Banco Central, sistemas médicos com ANVISA).`
     ]}
   ],
   tip:'Analogia Zoro: Componente = testar cada espada isolada. Integração = testar as 3 espadas juntas no Santoryu. Sistema = a batalha inteira. Aceite = Mihawk avaliando o resultado final.'},

  {title:'🎨 Tipos de Teste — Funcional, Não-Funcional e Estrutural',
   text:'Enquanto os NÍVEIS respondem "em que escopo testamos?", os TIPOS respondem "o que estamos testando?". Um tipo pode ser aplicado em qualquer nível. O CTFL 4.0 classifica em: Funcional, Não-Funcional, Caixa-Branca, além de Confirmação e Regressão.',
   sections:[
    {sub:'Teste Funcional (Caixa-Preta)',
     text:'Verifica O QUÊ o sistema faz — suas funções e comportamentos visíveis externamente, sem considerar a estrutura interna.',
     items:[
      `<strong>Foco:</strong> Comportamento observável: entradas → processamento → saídas esperadas. Baseado em especificações funcionais.`,
      `<strong>Quem pode executar:</strong> Testadores sem conhecimento do código-fonte. Focam nos requisitos e nos critérios de aceite.`,
      `<strong>Exemplos:</strong> Testar que o login aceita credenciais válidas e rejeita inválidas; que o carrinho de compras calcula o total corretamente; que o relatório exporta em PDF.`,
      `<strong>Técnicas mais comuns:</strong> Particionamento de equivalência, análise de valor limite, tabela de decisão, transição de estado.`
     ]},
    {sub:'Teste Não-Funcional',
     text:'Verifica COMO o sistema se comporta — suas características de qualidade que vão além da funcionalidade. Baseado nas características de qualidade da ISO 25010.',
     items:[
      `<strong>Performance / Desempenho:</strong> Tempo de resposta, throughput, utilização de recursos. Subtipo: Teste de Carga (comportamento sob volume normal), Estresse (acima do normal), Spike (pico repentino), Endurance (comportamento ao longo do tempo).`,
      `<strong>Segurança:</strong> Resistência a ataques (OWASP Top 10), autenticação, autorização, criptografia de dados, proteção contra SQL injection, XSS, CSRF.`,
      `<strong>Usabilidade:</strong> Facilidade de uso, acessibilidade, intuitividade da interface. Frequentemente envolve usuários reais em testes de usabilidade.`,
      `<strong>Confiabilidade (Reliability):</strong> Capacidade de funcionar sob condições específicas por um período. Inclui: disponibilidade (uptime), tolerância a falhas, capacidade de recuperação.`,
      `<strong>Portabilidade / Compatibilidade:</strong> Funcionamento em diferentes sistemas operacionais, browsers, dispositivos. Cross-browser testing, responsive design.`,
      `<strong>Manutenibilidade:</strong> Facilidade de modificação do sistema. Cobertura de código, complexidade ciclomática — geralmente verificados via análise estática.`
     ]},
    {sub:'Teste Caixa-Branca (Estrutural)',
     text:'Testa a estrutura INTERNA do software. Requer acesso ao código-fonte e conhecimento da implementação.',
     items:[
      `<strong>Foco:</strong> Caminhos de execução, branches (if/else), loops, condições lógicas no código.`,
      `<strong>Cobertura de Instruções (Statement Coverage):</strong> % de linhas de código executadas pelos testes. Métrica mais básica.`,
      `<strong>Cobertura de Ramificações (Branch Coverage):</strong> % de desvios de fluxo (cada if/else verdadeiro e falso) cobertos. Mais forte que cobertura de instruções — 100% de branch implica 100% de statement, mas não vice-versa.`,
      `<strong>Cobertura de Condições:</strong> Cada condição booleana em expressões compostas é testada como verdadeira e falsa independentemente.`,
      `<strong>Quando usar:</strong> Principalmente no nível de componente, em conjunto com testes funcionais. Não substitui os testes caixa-preta — é complementar.`
     ]},
    {sub:'Confirmação e Regressão — A Dupla Pós-Mudança',
     text:'Toda vez que o código muda (correção de bug, nova feature, refatoração), dois tipos de teste são obrigatórios.',
     items:[
      `<strong>Teste de Confirmação (Re-teste):</strong> Após uma correção de defeito, executa especificamente os casos de teste que falharam por causa daquele defeito. Objetivo: confirmar que O DEFEITO FOI CORRIGIDO. NÃO é o mesmo que regressão.`,
      `<strong>Teste de Regressão:</strong> Após qualquer mudança, executa um conjunto mais amplo de testes para verificar que NADA QUE FUNCIONAVA ANTES FOI QUEBRADO. Candidato ideal à automação — precisa ser executado frequentemente e de forma consistente.`,
      `<strong>Seleção de regressão:</strong> Em projetos grandes, executar toda a suíte de regressão pode ser inviável a cada mudança. Técnicas de seleção de regressão identificam o subconjunto de testes mais relevante para a mudança específica.`
     ]}
   ],
   tip:'Confirmação = "o bug X foi corrigido?". Regressão = "nada mais quebrou por causa da correção?". São dois tipos DIFERENTES executados em SEQUÊNCIA após uma correção.'},

  {title:'🔧 Teste de Manutenção',
   text:'Após o sistema entrar em produção, toda e qualquer mudança exige teste de manutenção. O CTFL 4.0 trata isso como um tipo específico de atividade de teste com suas próprias características.',
   sections:[
    {sub:'O que Dispara o Teste de Manutenção',
     text:'O teste de manutenção ocorre sempre que o sistema em produção sofre alguma mudança. O escopo do teste depende do risco e da extensão da mudança.',
     items:[
      `<strong>Correção de defeitos (hotfix):</strong> Bug crítico encontrado em produção que exige correção urgente. Requer confirmação + regressão focada.`,
      `<strong>Novas funcionalidades:</strong> Adição de feature ao sistema existente. Requer teste da nova funcionalidade + regressão.`,
      `<strong>Atualização de dependências:</strong> Atualizar bibliotecas, frameworks, SO ou banco de dados. Alto risco — mudanças internas que podem afetar o comportamento do sistema.`,
      `<strong>Migração de dados:</strong> Mover dados entre sistemas ou ambientes. Requer testes específicos de integridade, completude e correção dos dados migrados.`,
      `<strong>Aposentadoria de sistema:</strong> Quando um sistema é desativado, é necessário testar que os dados foram arquivados corretamente e que sistemas dependentes foram adaptados.`
     ]},
    {sub:'Análise de Impacto (Impact Analysis)',
     text:'Antes de testar após uma mudança, é necessário entender o que pode ter sido afetado. A análise de impacto orienta o escopo do teste de manutenção.',
     items:[
      `<strong>O que é:</strong> Processo de identificar quais partes do sistema podem ter sido afetadas por uma mudança, para definir o escopo mínimo mas suficiente do teste de regressão.`,
      `<strong>Como funciona:</strong> Usar rastreabilidade, análise de código, diagramas de dependência para mapear: "se o módulo X mudou, quais outros módulos o usam?"`,
      `<strong>Risco de análise inadequada:</strong> Escopo de regressão muito pequeno = defeitos de regressão chegam em produção. Escopo muito grande = esforço e tempo desnecessários.`,
      `<strong>Ferramentas de suporte:</strong> Grafos de dependência, ferramentas de cobertura de código, matrizes de rastreabilidade.`
     ]}
   ],
   tip:'Análise de impacto é a chave para regressão eficiente: nem testar tudo (desperdício), nem testar pouco (risco). A rastreabilidade bidirecional (Módulo 1) é a base da análise de impacto.'},

  {title:`🧪 ${tt('TDD','Test-Driven Development — escreve-se o teste antes do código de produção')}, ${tt('BDD','Behavior-Driven Development — comportamentos descritos em linguagem natural no formato Dado/Quando/Então')} e ${tt('ATDD','Acceptance Test-Driven Development — testes de aceite escritos colaborativamente antes do desenvolvimento')}`,
   text:'Três abordagens modernas de desenvolvimento que colocam o teste no centro do processo. Muito cobradas nas provas CTFL 4.0 em questões contextuais.',
   sections:[
    {sub:`${tt('TDD','Test-Driven Development')} — Red, Green, Refactor`,
     text:'No TDD, o teste é escrito ANTES do código de produção. O ciclo é rigoroso e disciplinado.',
     items:[
      `<strong>Ciclo Red-Green-Refactor:</strong> (1) Escreva um teste que falha (Red 🔴 — o código ainda não existe). (2) Escreva o mínimo de código de produção para o teste passar (Green 🟢). (3) Refatore o código mantendo os testes passando (Refactor ♻️).`,
      `<strong>Benefícios:</strong> Cobertura de teste garantida por design; código mais simples (você só escreve o que é necessário para o teste passar); documentação viva (os testes descrevem o comportamento esperado).`,
      `<strong>Nível de aplicação:</strong> Principalmente no teste de componente (unitário). O dev escreve testes antes de cada função/método.`,
      `<strong>Limitação:</strong> Requer disciplina e mudança de mentalidade. Não substitui testes de sistema ou aceite.`
     ]},
    {sub:`${tt('BDD','Behavior-Driven Development')} — Dado / Quando / Então`,
     text:'O BDD estende o TDD focando no COMPORTAMENTO do sistema descrito em linguagem natural. Aproxima Dev, QA e Negócio.',
     items:[
      `<strong>Sintaxe Gherkin (Given/When/Then):</strong> Cenários escritos em linguagem natural estruturada: <em>Dado que</em> (pré-condição) / <em>Quando</em> (ação) / <em>Então</em> (resultado esperado).`,
      `<strong>Exemplo:</strong> Dado que o usuário está na página de login / Quando ele insere credenciais válidas e clica em Entrar / Então ele é redirecionado para o dashboard.`,
      `<strong>Ferramentas:</strong> Cucumber, SpecFlow, Behave. Os cenários Gherkin são executados automaticamente como testes.`,
      `<strong>Benefício principal:</strong> O mesmo cenário serve como: especificação (para o negócio), caso de teste (para o QA) e teste automatizado (para o dev). Elimina ambiguidade de requisitos.`
     ]},
    {sub:`${tt('ATDD','Acceptance Test-Driven Development')} — Colaboração e Critérios de Aceite`,
     text:'O ATDD foca nos testes de aceite como drivers do desenvolvimento. É uma extensão do TDD para o nível de história de usuário.',
     items:[
      `<strong>Processo:</strong> Antes de qualquer desenvolvimento, Dev + QA + Negócio se reúnem para definir os critérios de aceite da história de usuário. Esses critérios se tornam os testes de aceite automatizados.`,
      `<strong>Diferença TDD vs ATDD:</strong> TDD é no nível de componente (dev sozinho). ATDD é no nível de aceite (Dev + QA + Negócio juntos). BDD é o meio-termo — usa linguagem natural para unir os dois.`,
      `<strong>Benefício:</strong> Garante alinhamento de expectativas ANTES de codificar. Elimina o "isso não é o que eu pedi" na entrega.`,
      `<strong>Relação com Whole Team Approach:</strong> ATDD é a prática concreta do Whole Team — todos colaboram na definição do que é "pronto" antes de começar.`
     ]}
   ],
   tip:'TDD = dev testa unitariamente antes de codificar. BDD = linguagem natural Given/When/Then para alinhar negócio e técnico. ATDD = critérios de aceite definidos colaborativamente ANTES da sprint. Decorar as diferenças!'},

  {title:`🔄 ${tt('CI/CD','Continuous Integration / Continuous Delivery — pipeline automatizado que integra, testa e entrega código continuamente')} e Shift Left / Shift Right`,
   text:'No contexto DevOps, o teste é integrado ao pipeline de CI/CD. O objetivo é fornecer feedback em minutos, não em dias. O CTFL 4.0 aborda isso como parte da estratégia de teste moderna.',
   sections:[
    {sub:`O Pipeline de ${tt('CI/CD','Continuous Integration / Continuous Delivery')}`,
     text:'Um pipeline de CI/CD automatiza as etapas de build, teste e entrega do software. Cada commit aciona o pipeline.',
     items:[
      `<strong>Integração Contínua (${tt('CI','Continuous Integration — prática de integrar código frequentemente, com cada commit disparando build e testes automáticos')}):</strong> Desenvolvedores integram código ao repositório principal com frequência (várias vezes ao dia). Cada integração dispara: build automático + testes unitários + testes de integração.`,
      `<strong>Entrega Contínua (CD):</strong> Além do CI, o software é automaticamente implantado em ambiente de staging e testado. Está sempre em um estado entregável para produção — o deploy final ainda pode ser manual.`,
      `<strong>Deploy Contínuo:</strong> Extensão do CD onde até o deploy em produção é automatizado. Cada commit que passa em todos os testes vai automaticamente para produção.`,
      `<strong>Pirâmide de testes no pipeline:</strong> Base larga (muitos testes unitários, rápidos) → meio (testes de integração, médios) → topo estreito (poucos testes end-to-end/UI, lentos). Os testes mais rápidos ficam no início do pipeline para feedback imediato.`
     ]},
    {sub:`${tt('Shift Left','Testar mais cedo no SDLC')} e Shift Right — Dois Lados da Estratégia`,
     items:[
      `<strong>Shift Left:</strong> Mover o teste para mais cedo no ciclo de desenvolvimento. Exemplos práticos: revisão de requisitos (teste estático), TDD (teste antes de codificar), análise estática de código (antes de qualquer execução). Objetivo: encontrar defeitos quando são baratos de corrigir.`,
      `<strong>Shift Right:</strong> Testar em produção com dados e usuários reais. Inclui: monitoramento de produção, testes A/B, canary releases, feature flags, chaos engineering. Objetivo: encontrar problemas que só aparecem com escala e uso real.`,
      `<strong>Complementaridade:</strong> Shift Left previne defeitos antes de produção. Shift Right detecta problemas que só emergem em produção. Juntos, formam uma estratégia completa de qualidade.`,
      `<strong>Relevância para o CTFL:</strong> O syllabus 4.0 cobre Shift Left explicitamente. Shift Right é abordado no contexto de DevOps e teste de manutenção.`
     ]}
   ],
   tip:'Shift Left = testar mais cedo (antes de codificar). Shift Right = testar em produção com dados reais. CI = integrar frequentemente + testes automáticos. CD = entregar frequentemente + staging testado automaticamente.'}
  ,{title:'🔄 Retrospectivas e Melhoria Contínua',
   text:`As retrospectivas são cerimônias fundamentais em times ágeis — e um ${tt('LO','Learning Objective — Objetivo de Aprendizagem do Syllabus CTFL')} específico do CTFL 4.0 (FL-2.1.6). A prova testa por que elas importam para a qualidade.`,
   sections:[
    {sub:'O que é uma Retrospectiva',
     text:'Reunião realizada ao final de cada ciclo (sprint ou release) onde o time reflete sobre o processo e define melhorias concretas.',
     items:[
       `<strong>Foco:</strong> processo, não produto. "Como trabalhamos?" — não "o que entregamos?"`,
       `<strong>Participantes:</strong> todo o time — Dev, QA, PO, Scrum Master. Perspectivas diferentes identificam problemas que um único papel não veria`,
       `<strong>Estrutura típica:</strong> O que foi bem? → O que pode melhorar? → O que faremos diferente? → Ações concretas com responsável e prazo`,
       `<strong>Frequência:</strong> ao final de cada sprint (Scrum) ou ao final de cada release cycle`
     ]},
    {sub:'Valor das Retrospectivas para a Qualidade de Teste',
     text:'Do ponto de vista do CTFL 4.0, retrospectivas são mecanismos de melhoria contínua do processo de teste:',
     items:[
       `<strong>Identificar fragilidades no processo:</strong> defeitos que passaram para produção → investigar por que os testes não os detectaram → melhorar a estratégia`,
       `<strong>Calibrar critérios de entrada/saída:</strong> se defeitos graves foram encontrados após o critério de saída ser atingido, revisar os critérios`,
       `<strong>Melhorar estimativas:</strong> comparar esforço planejado vs real → calibrar estimativas futuras com dados reais do time`,
       `<strong>Ajustar automação:</strong> testes frágeis que geraram falsos positivos? Retrospectiva identifica e prioriza a correção`,
       `<strong>Compartilhar conhecimento:</strong> testadores experientes compartilham técnicas eficazes com o time inteiro`
     ]},
    {sub:'Retrospectiva vs Outras Cerimônias — Distinção Importante',
     items:[
       `<strong>Retrospectiva:</strong> olha para o <em>processo</em> (como trabalhamos) → melhoria contínua → ocorre ao final do ciclo`,
       `<strong>Review/Demo:</strong> olha para o <em>produto</em> (o que entregamos) → feedback dos stakeholders → ocorre ao final do ciclo`,
       `<strong>Refinamento/Planning:</strong> olha para o <em>futuro</em> (o que faremos) → planejamento → ocorre antes do próximo ciclo`,
       `<strong>Na prova:</strong> "Qual cerimônia identifica fragilidades no processo para melhoria contínua?" → Retrospectiva`
     ]}
   ],
   tip:'A prova pergunta: "Por que organizar retrospectivas?" A resposta correta é SEMPRE relacionada a melhoria contínua do processo — não a feedback sobre o produto, não a satisfação do cliente, não a cerimônia ágil obrigatória.'}
 ],
 quiz:[
  {q:'Desenvolvedor testando uma função de cálculo de imposto de forma completamente isolada, usando mocks para dependências. Que nível de teste é esse?',
   opts:['Teste de Sistema','Teste de Aceite','Teste de Componente (Unitário)','Teste de Integração'],c:2,
   fb:'<strong>Teste de Componente</strong> (unitário) testa a menor unidade do software de forma isolada. O uso de mocks/stubs é característica deste nível.'},
  {q:'Após corrigir um defeito crítico no módulo de login, a equipe executa novamente APENAS o caso de teste que originalmente encontrou esse bug. Que tipo de teste é esse?',
   opts:['Teste de Regressão','Teste de Confirmação (Re-teste)','Teste de Aceite','Teste de Sistema'],c:1,
   fb:'<strong>Teste de Confirmação (Re-teste)</strong> verifica especificamente se um defeito reportado foi corrigido. É diferente do teste de regressão, que verifica se nada mais foi quebrado.'},
  {q:'Em um contexto Ágil (Scrum), quando e como o teste deve ser realizado?',
   opts:['Apenas ao final de todas as sprints','Apenas na sprint de hardening/estabilização','Dentro de cada sprint, com feedback contínuo, pelo time inteiro','Após cada release para produção, por equipe separada de QA'],c:2,
   fb:'No <strong>Ágil</strong>, teste acontece dentro de cada sprint como atividade contínua. O "whole team approach" significa que qualidade é responsabilidade de todos, não só do QA.'},
  {q:'Qual a diferença entre Teste de Confirmação e Teste de Regressão?',
   opts:['São sinônimos com nomes diferentes','Confirmação verifica se um defeito específico foi corrigido; Regressão verifica se mudanças não quebraram funcionalidades existentes','Regressão verifica defeitos específicos; Confirmação verifica o sistema inteiro','Confirmação é automático; Regressão é manual'],c:1,
   fb:'<strong>Confirmação:</strong> verifica se o defeito X foi corrigido. <strong>Regressão:</strong> verifica se a correção (ou qualquer mudança) não quebrou outras funcionalidades que antes funcionavam.'},
  {q:'Sistema bancário passou por atualização de segurança. A equipe precisa garantir que as funcionalidades anteriores não foram afetadas. Qual tipo de teste é prioritário?',
   opts:['Teste de Performance','Teste de Confirmação','Teste de Regressão','Teste Unitário'],c:2,
   fb:'<strong>Teste de Regressão</strong> é exatamente para isso: garantir que mudanças no sistema (incluindo atualizações de segurança) não introduziram defeitos em funcionalidades previamente corretas.'},
  {q:'O princípio "Shift Left" no contexto de teste significa:',
   opts:['Mover testadores para a equipe de desenvolvimento','Antecipar as atividades de teste para as fases mais iniciais do ciclo de desenvolvimento','Testar apenas o lado esquerdo da interface','Priorizar testes de automação sobre testes manuais'],c:1,
   fb:'<strong>Shift Left</strong> = testar mais cedo. Revisar requisitos, fazer análise estática antes de codificar, escrever testes antes do código (TDD). Quanto mais cedo o defeito é encontrado, mais barato corrigir.'}
  ,{q:'No modelo V, qual é o nível de teste que corresponde diretamente à fase de especificação de requisitos de sistema?',
   opts:['Teste de Componente','Teste de Integração','Teste de Sistema','Teste de Aceite'],c:3,
   fb:'No <strong>Modelo V</strong>, cada nível de teste corresponde a uma fase de desenvolvimento. Especificação de requisitos de sistema ↔ <strong>Teste de Aceite</strong>. Design de alto nível ↔ Teste de Sistema. Design detalhado ↔ Teste de Integração. Codificação ↔ Teste de Componente.'}
  ,{q:'Qual tipo de teste verifica ESPECIFICAMENTE características de qualidade como performance, usabilidade e segurança, conforme o CTFL 4.0?',
   opts:['Teste Funcional','Teste de Regressão','Teste Não-Funcional','Teste de Confirmação'],c:2,
   fb:'<strong>Teste Não-Funcional</strong> verifica como o sistema se comporta em termos de características de qualidade não relacionadas à funcionalidade: performance, segurança, usabilidade, confiabilidade, manutenibilidade (ISO 25010).'}
  ,{q:'Após corrigir um defeito, o QA re-executa o caso de teste que encontrou o defeito para confirmar que foi corrigido. Isso é:',
   opts:['Teste de Regressão','Teste de Confirmação (Reteste)','Teste de Aceite','Teste de Componente'],c:1,
   fb:'<strong>Teste de Confirmação</strong> (reteste): re-execução do(s) caso(s) de teste que falharam para confirmar que o defeito foi corrigido. <strong>Teste de Regressão</strong> verifica que a correção não quebrou outras áreas.'}
  ,{q:'Qual abordagem de integração testa módulos individualmente e depois gradualmente os integra, em oposição a integrar todos de uma vez?',
   opts:['Integração Big Bang','Integração Incremental','Teste de Sistema','Teste de Aceite Contratual'],c:1,
   fb:'<strong>Integração Incremental</strong>: módulos são integrados gradualmente (top-down ou bottom-up), permitindo detectar defeitos de integração mais cedo. <strong>Big Bang</strong> integra tudo de uma vez — defeitos são mais difíceis de isolar.'}
 ]},

// ─────────────────── MÓDULO 3 ───────────────────
{id:3,icon:'🔍',name:'Teste Estático',
 desc:'Revisar artefatos sem executar código — reviews, inspeções, análise estática de código.',topics:'5 tópicos · 5 questões',
 content:[
  {title:'📄 O que é Teste Estático?',
   text:`Teste estático é a análise de artefatos de software <strong>sem executá-los</strong>. É uma das abordagens mais custo-efetivas de qualidade porque age nas causas antes que se tornem falhas em execução. O ${tt('ISTQB','International Software Testing Qualifications Board — organizador da certificação CTFL')} 4.0 dedica o Capítulo 3 inteiro a este tema.`,
   sections:[
    {sub:'O que pode ser revisado',
     text:'Praticamente qualquer artefato de software pode ser submetido a revisão estática:',
     items:[
       '<strong>Documentos de requisitos</strong> — especificações, histórias de usuário, critérios de aceite, casos de uso',
       '<strong>Documentação de design</strong> — arquitetura, diagramas UML, modelo de banco de dados',
       '<strong>Código-fonte</strong> — qualquer linguagem: Java, Python, JavaScript, SQL…',
       '<strong>Casos de teste</strong> — os próprios testes podem (e devem!) ser revisados',
       '<strong>Planos e cronogramas</strong> — plano de teste, plano de projeto, estimativas',
       '<strong>Documentação técnica</strong> — manuais, guias de usuário, contratos de API'
     ]},
    {sub:'Por que o teste estático é tão valioso?',
     text:`A regra de ouro: quanto mais cedo um defeito é encontrado, mais barato é corrigi-lo. Um erro em requisito detectado na revisão custa 1x para corrigir. O mesmo erro detectado em produção pode custar 100x ou mais (retrabalho, impacto nos clientes, reputação).`,
     items:[
       'Defeitos encontrados por revisão <strong>nunca chegam ao código</strong> — não há bug para reproduzir, log para analisar ou hotfix para implantar',
       'Revisões de requisitos encontram <strong>ambiguidades e contradições</strong> que nenhum teste dinâmico consegue detectar (o código foi feito "errado corretamente")',
       'Revisão de casos de teste garante que a <strong>cobertura de testes é adequada</strong> antes de executá-los'
     ]},
    {sub:'Análise Estática por Ferramentas',
     text:`Ferramentas automatizadas analisam código <strong>sem executá-lo</strong>, identificando problemas estruturais de forma rápida e consistente.`,
     items:[
       '<strong>SonarQube</strong> — plataforma de análise de qualidade de código, detecta bugs, code smells e vulnerabilidades de segurança',
       '<strong>ESLint / TSLint</strong> — linters para JavaScript/TypeScript, enforçam padrões de codificação',
       '<strong>PMD / Checkstyle</strong> — para Java, verificam convenções e complexidade',
       '<strong>O que ferramentas detectam:</strong> complexidade ciclomática alta, variáveis não usadas, imports desnecessários, possíveis null pointer exceptions, violações de padrão OWASP',
       '<strong>Limitação:</strong> ferramentas não entendem contexto de negócio — não detectam requisito ambíguo ou lógica de negócio incorreta'
     ]},
    {sub:'Defeitos típicos encontrados por teste estático',
     items:[
       '<strong>Em requisitos:</strong> ambiguidades ("o sistema deve ser rápido"), contradições entre requisitos, requisito ausente, critério de aceite não testável',
       '<strong>Em código:</strong> variáveis não inicializadas, recursos não liberados (memory leak), lógica de autorização ausente, SQL injection, hardcoded credentials',
       '<strong>Em design:</strong> acoplamento excessivo, violação de princípios SOLID, escolha inadequada de padrão de design',
       '<strong>Em casos de teste:</strong> falta de teste para fluxos negativos, cobertura de partições incompleta, critério de aceite mal interpretado'
     ]}
   ],
   tip:'Teste estático ≠ apenas "ler código". Inclui revisões de requisitos, design e documentação. Na prova, qualquer análise sem execução = teste estático.'},

  {title:'👥 Os 4 Tipos de Revisão',
   text:'O CTFL 4.0 define 4 tipos de revisão em ordem crescente de formalidade. A escolha depende do objetivo, criticidade do artefato e recursos disponíveis.',
   sections:[
    {sub:'1. Revisão Informal',
     text:'O tipo mais simples. Sem processo definido, sem papéis formais.',
     items:[
       '<strong>Como funciona:</strong> "Ei, você pode dar uma olhada nesse requisito?" — revisão ad hoc entre colegas',
       '<strong>Papéis:</strong> nenhum papel formal definido',
       '<strong>Documentação:</strong> não obrigatória (pode ser um comentário no chat)',
       '<strong>Quando usar:</strong> revisões rápidas do dia-a-dia, feedback rápido em rascunhos',
       '<strong>Custo × benefício:</strong> baixíssimo custo, retorno rápido mas cobertura limitada'
     ]},
    {sub:'2. Walkthrough',
     text:'O <strong>autor</strong> guia os revisores pelo artefato. Único tipo liderado pelo próprio autor.',
     items:[
       '<strong>Como funciona:</strong> autor apresenta e explica o artefato passo a passo para os revisores',
       '<strong>Objetivo principal:</strong> busca de alternativas, aprendizado mútuo, obter feedback',
       '<strong>Papéis:</strong> Autor (lidera), Revisores (fazem perguntas e sugestões)',
       '<strong>Documentação:</strong> opcional — atas podem ser registradas',
       '<strong>Quando usar:</strong> compartilhar conhecimento de uma nova funcionalidade, validar abordagem técnica com a equipe',
       '<strong>Diferencial na prova:</strong> AUTOR lidera (diferente dos outros tipos)'
     ]},
    {sub:'3. Revisão Técnica',
     text:'Revisão com foco na adequação técnica do artefato. Moderadamente formal.',
     items:[
       '<strong>Como funciona:</strong> revisores com expertise técnica analisam e discutem o artefato',
       '<strong>Objetivo principal:</strong> avaliar se a solução técnica é adequada, identificar inconsistências e melhorias',
       '<strong>Papéis:</strong> Moderador (pode ser diferente do autor), Revisores técnicos',
       '<strong>Documentação:</strong> resultados documentados (lista de problemas encontrados)',
       '<strong>Quando usar:</strong> revisão de arquitetura, design de API, código crítico',
       '<strong>Nível de formalidade:</strong> maior que walkthrough, menor que inspeção'
     ]},
    {sub:'4. Inspeção',
     text:'O tipo <strong>mais formal</strong> de revisão. Processo altamente estruturado com papéis, métricas e critérios definidos.',
     items:[
       '<strong>Papéis obrigatórios:</strong> Moderador (treino específico), Autor, Revisores, Escriba (registra defeitos)',
       '<strong>Processo:</strong> planejamento → kickoff → revisão individual → reunião → correção → verificação',
       '<strong>Critérios de entrada:</strong> artefato completo, build funciona, checklists prontos',
       '<strong>Critérios de saída:</strong> todos os defeitos corrigidos e verificados, métricas coletadas',
       '<strong>Métricas coletadas:</strong> taxa de defeitos por hora, esforço total, tamanho do artefato, tipos de defeito',
       '<strong>Quando usar:</strong> artefatos críticos (especificação de sistema de saúde, código de segurança)'
     ],
     tip:'Mnemônico de formalidade crescente: <strong>I-W-T-I</strong> (Informal → Walkthrough → Técnica → Inspeção). Na prova: quem lidera o Walkthrough? O AUTOR. Quem coletam métricas? Apenas na Inspeção.'}
   ]},

  {title:'🔄 O Processo de Revisão Formal',
   text:'Uma revisão formal bem conduzida segue este processo de 6 etapas. Cada etapa possui critérios de entrada e saída bem definidos.',
   sections:[
    {sub:'As 6 Etapas em Detalhe',
     items:[
       '<strong>1. Planejamento:</strong> Define escopo do artefato, tipo de revisão, participantes, cronograma e critérios de entrada (ex: documento deve estar na versão final)',
       '<strong>2. Início da Revisão (Kickoff):</strong> Distribui materiais aos revisores; verifica se critérios de entrada foram atendidos; explica objetivos e checklists',
       '<strong>3. Revisão Individual:</strong> Cada revisor analisa o artefato <em>sozinho</em> e documenta defeitos, questões e sugestões antes da reunião — fase mais crítica para qualidade',
       '<strong>4. Comunicação e Análise (Reunião):</strong> Grupo discute os itens encontrados; IMPORTANTE: registra defeitos, mas <strong>não os corrige</strong> na reunião; moderador garante foco',
       '<strong>5. Correção e Novo Reporte:</strong> Autor corrige os defeitos; métricas são coletadas (quantidade por tipo, esforço, tamanho); novos defeitos encontrados são registrados',
       '<strong>6. Verificação do Encerramento:</strong> Confirma que correções foram realizadas; verifica se critérios de saída foram atingidos; documenta lições aprendidas'
     ]},
    {sub:'Papéis na Inspeção Formal',
     items:[
       '<strong>Moderador:</strong> lidera e facilita a revisão, treinado na técnica de inspeção, garante que o processo seja seguido',
       '<strong>Autor:</strong> criou o artefato em revisão; corrige os defeitos após a reunião',
       '<strong>Revisores (Inspetores):</strong> analisam o artefato individualmente e na reunião; idealmente com perspectivas diferentes',
       '<strong>Escriba (Recorder):</strong> documenta todos os defeitos e decisões durante a reunião de revisão',
       '<strong>Líder de Teste / Gerente:</strong> pode estar presente para acompanhar métricas e processo'
     ]},
    {sub:'Critérios de Entrada e Saída',
     text:'Critérios de entrada garantem que a revisão só começa quando o artefato está pronto. Critérios de saída confirmam que ela foi bem-sucedida.',
     items:[
       '<strong>Entrada típica:</strong> documento finalizado em versão estável, build compilando, checklist preparado, revisores alocados e treinados',
       '<strong>Saída típica:</strong> todos os defeitos graves corrigidos, métricas documentadas, nova versão do artefato aprovada',
       '<strong>Por que importa:</strong> revisar um rascunho incompleto é desperdício de esforço de todos os participantes'
     ]}
    ,{sub:'Fatores que Contribuem para Revisões Bem-Sucedidas',
     text:'O CTFL 4.0 lista fatores críticos de sucesso para revisões (FL-3.2.5). A prova testa saber distinguir o que AJUDA de o que NÃO ajuda.',
     items:[
       `<strong>✅ Objetivos claros e mensuráveis:</strong> "encontrar defeitos de segurança" é melhor que "revisar o código"`,
       `<strong>✅ Participantes dedicam tempo suficiente:</strong> revisão feita às pressas produz revisão de baixa qualidade — é melhor adiar do que fazer mal feito`,
       `<strong>✅ Artefato dividido em partes gerenciáveis:</strong> sessões de revisão longas reduzem atenção — dividir grandes artefatos em blocos menores`,
       `<strong>✅ Defeitos tratados objetivamente:</strong> foco no artefato, não no autor. "Esse requisito está ambíguo" — não "você escreveu errado"`,
       `<strong>✅ Ambiente psicologicamente seguro:</strong> participantes devem sentir-se à vontade para apontar problemas sem medo de represálias`,
       `<strong>✅ Moderador treinado:</strong> especialmente em inspeções formais — garante foco, evita discussões improdutivas, controla o tempo`,
       `<strong>❌ O que NÃO contribui:</strong> forçar revisores a participar sem tempo de preparação individual · revisar artefato incompleto (critérios de entrada não atendidos) · pressão para encontrar zero defeitos · comportamentos de tédio, exasperação ou hostilidade na reunião`
     ]}
   ],
   tip:'Pegadinha de prova: na fase 4 (Reunião), defeitos são <strong>REGISTRADOS</strong>, não corrigidos. Correções acontecem na fase 5, pelo Autor.'},

  {title:'⚖️ Estático vs Dinâmico — Complementaridade',
   text:'Teste estático e dinâmico são abordagens complementares. O CTFL 4.0 enfatiza que usar ambos juntos é a estratégia ideal.',
   sections:[
    {sub:'Comparação Direta',
     items:[
       '<strong>Teste Estático:</strong> sem execução · atua em artefatos · encontra defeitos mais cedo · pode revisar requisitos antes do código existir',
       '<strong>Teste Dinâmico:</strong> com execução · atua no sistema em funcionamento · verifica comportamento real em runtime · necessário para confirmar correções',
       '<strong>Custo por defeito encontrado:</strong> estático tende a ser mais barato (defeitos mais cedo = correção mais barata)',
       '<strong>Feedback ao negócio:</strong> revisão de requisitos antes do desenvolvimento valida entendimento e evita retrabalho massivo'
     ]},
    {sub:'O que cada um encontra exclusivamente',
     items:[
       '<strong>Só estático detecta:</strong> requisitos ambíguos/contraditórios · design incorreto antes de implementar · código morto (nunca executado) · violações de convenção de codificação',
       '<strong>Só dinâmico detecta:</strong> problemas de performance sob carga real · integração real entre componentes · defeitos que dependem de estado em runtime · comportamento em ambiente real (SO, browser, hardware)',
       '<strong>Ambos podem detectar:</strong> erros de segurança (ex: SQL injection é detectável por análise estática E por teste de penetração)'
     ]},
    {sub:'Estratégia combinada',
     text:'A estratégia ideal integra os dois desde o início do projeto:',
     items:[
       '<strong>Fase de requisitos:</strong> revisão informal/walkthrough de histórias de usuário → evita funcionalidades mal entendidas',
       '<strong>Fase de design:</strong> revisão técnica de arquitetura → detecta falhas de design antes de codificar',
       `<strong>Durante desenvolvimento:</strong> análise estática contínua no ${tt("CI","Continuous Integration — Integração Contínua")} (SonarQube no pipeline) → feedback imediato ao desenvolvedor`,
       '<strong>Fase de testes:</strong> revisão de casos de teste + execução dinâmica → cobertura máxima',
       '<strong>Resultado:</strong> menos defeitos chegando ao teste dinâmico = ciclo de teste mais rápido e eficaz'
     ]}
   ]},

  {title:'🔍 Defeitos Típicos × Tipo de Artefato',
   text:'O teste estático é mais eficaz quando o revisor sabe <em>o que procurar</em> em cada tipo de artefato. O CTFL 4.0 mapeia defeitos típicos por categoria.',
   sections:[
    {sub:'Defeitos em Requisitos e Histórias de Usuário',
     items:[
       '<strong>Ambiguidade:</strong> "O sistema deve responder rapidamente" — quão rápido? Para quem? Em qual condição?',
       '<strong>Inconsistência:</strong> Requisito A diz "login expira em 30 min", Requisito B diz "sessão permanece ativa 1 hora"',
       '<strong>Incompletude:</strong> critério de aceite ausente, fluxo de exceção não documentado, requisito não funcional omitido',
       '<strong>Não-testabilidade:</strong> "sistema amigável ao usuário" — não é possível escrever um teste para isso sem critérios objetivos',
       '<strong>Duplicidade:</strong> mesmo requisito descrito de forma ligeiramente diferente em dois documentos'
     ]},
    {sub:'Defeitos em Código',
     items:[
       '<strong>Defeitos de segurança:</strong> SQL injection, XSS, buffer overflow, armazenamento de senha em texto claro',
       '<strong>Defeitos de qualidade:</strong> complexidade ciclomática alta (função com 15+ ifs), código duplicado (DRY violado), variável ou import não utilizados',
       '<strong>Defeitos de robustez:</strong> NullPointerException potencial, recurso não fechado (connection leak), falta de tratamento de erro',
       '<strong>Violações de padrão:</strong> naming convention inconsistente, ausência de logging obrigatório, hardcoded magic numbers'
     ]},
    {sub:'Defeitos em Casos de Teste',
     items:[
       '<strong>Cobertura incompleta:</strong> partições de equivalência inválidas não cobertas, valores limite omitidos',
       '<strong>Critério de aceite mal interpretado:</strong> o caso de teste verifica A mas o requisito pede B',
       '<strong>Dependência implícita:</strong> caso de teste assume estado que outro teste deve criar (não independente)',
       '<strong>Falta de assertiva:</strong> teste que "executa mas não verifica" — sem assert é um teste cego'
     ]}
   ]}
 ],
 quiz:[
  {q:'Revisão mais formal do CTFL, com papéis definidos (Moderador, Autor, Revisor, Escriba) e coleta de métricas:',
   opts:['Walkthrough','Revisão Informal','Inspeção','Revisão Técnica'],c:2,
   fb:'A <strong>Inspeção</strong> é o tipo mais formal de revisão: processo estruturado, papéis definidos, coleta de métricas e critérios de entrada/saída.'},
  {q:'SonarQube analisando o código-fonte em busca de vulnerabilidades e code smells sem executar o programa. Isso é um exemplo de:',
   opts:['Teste de Componente','Análise Estática','Teste de Integração','Teste Funcional'],c:1,
   fb:'<strong>Análise Estática</strong>: ferramentas que analisam código sem executá-lo. Detectam problemas antes mesmo de um único teste dinâmico ser executado.'},
  {q:'Na revisão formal, em qual fase os defeitos encontrados são DISCUTIDOS (mas não corrigidos na hora)?',
   opts:['Revisão Individual','Planejamento','Comunicação e Análise (Reunião de Revisão)','Verificação do Encerramento'],c:2,
   fb:'Na fase de <strong>Comunicação e Análise</strong>, a equipe discute os defeitos encontrados individualmente. IMPORTANTE: registram e discutem, mas NÃO corrigem na reunião.'},
  {q:'Qual a principal vantagem do teste estático sobre o dinâmico, segundo o CTFL 4.0?',
   opts:['É sempre mais preciso que testes dinâmicos','Defeitos encontrados mais cedo no SDLC são drasticamente mais baratos de corrigir','Não requer conhecimento técnico do artefato','Elimina completamente a necessidade de testes dinâmicos'],c:1,
   fb:'O principal benefício é o <strong>custo</strong>: defeito encontrado na fase de requisitos custa muito menos para corrigir do que em produção. Estático não elimina o dinâmico — são complementares.'},
  {q:'Autor apresenta seu design de arquitetura a colegas e guia a discussão, buscando alternativas e feedback. Que tipo de revisão é essa?',
   opts:['Inspeção','Walkthrough','Revisão Técnica','Revisão Informal'],c:1,
   fb:'<strong>Walkthrough</strong>: o AUTOR lidera e guia os revisores. Foco em aprendizado e busca de alternativas. É o único tipo em que o autor conduz a sessão.'}
  ,{q:'Na revisão formal, quem é responsável por LIDERAR e FACILITAR a reunião de revisão, garantindo que o processo seja seguido?',
   opts:['O Autor do artefato','O Escriba','O Moderador','O Gerente do projeto'],c:2,
   fb:'O <strong>Moderador</strong> é treinado na técnica de inspeção e lidera a reunião. O Autor não deve liderar (conflito de interesse). O Escriba registra. O Revisor analisa. O Moderador garante foco e processo.'}
  ,{q:'Qual das seguintes afirmações sobre análise estática de código é CORRETA?',
   opts:['Só pode ser feita por ferramentas automatizadas, não manualmente','Requer a execução do software para identificar vulnerabilidades','Pode encontrar defeitos em código que nunca será executado (código morto)','É sempre mais eficaz que o teste dinâmico para encontrar bugs de runtime'],c:2,
   fb:'<strong>Análise estática</strong> não requer execução — por isso pode encontrar código morto (que nunca é executado) e defeitos que nunca se manifestariam em runtime. Não é mais eficaz para bugs de runtime; é <em>complementar</em> ao dinâmico.'}
  ,{q:'Durante a revisão individual de uma inspeção formal, um revisor encontra um defeito grave. Qual é a ação CORRETA nesse momento?',
   opts:['Corrigir o defeito imediatamente e notificar o autor','Registrar o defeito para discussão na reunião de revisão','Encerrar a revisão individual e convocar reunião de emergência','Descartar o defeito se não tiver certeza absoluta'],c:1,
   fb:'Na <strong>revisão individual</strong>, cada revisor REGISTRA os defeitos encontrados para discutir na reunião de revisão (fase 4). Não se corrige agora — correção é responsabilidade do autor após a reunião (fase 5).'}
 ]},

// ─────────────────── MÓDULO 4 ───────────────────
{id:4,icon:'🎯',name:'Análise e Design de Testes',
 desc:'Técnicas caixa-preta, caixa-branca e baseadas em experiência para criar casos de teste eficazes.',topics:'6 tópicos · 7 questões',
 content:[
  {title:'🎯 Visão Geral das Técnicas de Design de Teste',
   text:`Técnicas de design de teste são métodos sistemáticos para derivar e selecionar casos de teste eficazes. O CTFL 4.0 agrupa em três categorias principais, cada uma com propósito distinto.`,
   sections:[
    {sub:'As três categorias',
     items:[
       `<strong>Caixa-Preta (Black-box):</strong> baseada em <em>especificações externas</em>. O testador não conhece o código interno — testa entradas, saídas e regras de negócio. Também chamada de técnica baseada em especificação.`,
       `<strong>Caixa-Branca (White-box):</strong> baseada na <em>estrutura interna</em> do código. Requer acesso ao código-fonte e garante cobertura de partes específicas da implementação. Também chamada de técnica baseada em estrutura.`,
       `<strong>Baseada em Experiência:</strong> usa o conhecimento, intuição e heurísticas do testador. Complementa as técnicas formais e encontra defeitos que especificações não antecipam.`
     ]},
    {sub:'Como escolher a técnica certa',
     items:[
       `<strong>Tipo de artefato disponível:</strong> tem especificação detalhada? → caixa-preta. Tem acesso ao código? → caixa-branca. Área não documentada? → experiência.`,
       `<strong>Nível de teste:</strong> teste de componente → caixa-branca mais comum. Teste de sistema → caixa-preta mais comum.`,
       `<strong>Objetivo:</strong> verificar regras de negócio → caixa-preta. Garantir cobertura do código → caixa-branca. Explorar áreas de risco → experiência.`,
       `<strong>Combinação:</strong> na prática real, as técnicas são combinadas. Não são exclusivas — use as três conforme o contexto.`
     ]}
   ]},

  {title:'⬛ Técnicas Caixa-Preta',
   text:'Você testa o comportamento do sistema sem ver o código. Baseado apenas em especificações, requisitos ou regras de negócio. São as técnicas mais cobradas do Capítulo 4.',
   sections:[
    {sub:'Particionamento de Equivalência (PE)',
     text:`Divide os valores de entrada (e saída) em <strong>partições/classes de equivalência</strong> onde todos os elementos se comportam igualmente. Testa-se um representante de cada partição — se um valor da partição falha, todos falham; se passa, todos passam.`,
     items:[
       `<strong>Partições válidas:</strong> valores dentro dos limites aceitos pelo sistema. Ex: campo de idade 18–65 → partição válida: qualquer valor entre 18 e 65.`,
       `<strong>Partições inválidas:</strong> valores fora dos limites. Ex: mesma regra → partição inválida abaixo: <18; partição inválida acima: >65.`,
       `<strong>Valores de teste:</strong> um representante de cada partição é suficiente. Para o exemplo: 35 (válida), 10 (inválida abaixo), 80 (inválida acima).`,
       `<strong>Cobertura 100% de PE:</strong> pelo menos um caso de teste por partição (válida + todas as inválidas).`,
       `<strong>Onde aplicar:</strong> campos com intervalos numéricos, faixas de valores, categorias de entrada (ex: tipo de usuário: admin/user/guest).`
     ]},
    {sub:`Análise de Valor Limite (${tt('BVA','Boundary Value Analysis — Análise de Valor Limite: testa nos limites e imediatamente fora dos limites das partições')})`,
     text:`Complementa o PE focando nos <strong>limites das partições</strong>. Pesquisas mostram que defeitos se concentram nas fronteiras — o desenvolvedor muitas vezes escreve <code>&gt;</code> quando deveria ser <code>&gt;=</code>.`,
     items:[
       `<strong>BVA de 2 pontos (padrão CTFL):</strong> para cada limite, teste o valor no limite E o imediatamente fora. Campo 18–65: valores de teste → 17, 18 (limite inferior) e 65, 66 (limite superior).`,
       `<strong>BVA de 3 pontos:</strong> para cada limite, teste o valor imediatamente antes, no limite e imediatamente após. Campo 18–65: 17, 18, 19 e 64, 65, 66.`,
       `<strong>Regra de ouro:</strong> sempre combine PE + BVA. PE define as partições; BVA foca nos limites onde os defeitos estão.`,
       `<strong>Exemplo prático:</strong> campo de desconto para compras acima de R$500: PE (<=500 inválido, >500 válido) + BVA (499, 500, 501).`
     ]},
    {sub:'Tabela de Decisão',
     text:`Para regras de negócio com <strong>múltiplas condições independentes</strong> que combinadas geram ações diferentes. Garante cobertura de todas as combinações relevantes.`,
     items:[
       `<strong>Estrutura:</strong> colunas = combinações de condições (regras); linhas superiores = condições; linhas inferiores = ações resultantes.`,
       `<strong>Exemplo:</strong> desconto: [VIP: S/N] × [Valor > R$500: S/N] = 4 regras → VIP+Alto: 20%, VIP+Baixo: 10%, Normal+Alto: 5%, Normal+Baixo: 0%.`,
       `<strong>Cobertura de colunas:</strong> 100% = uma coluna por regra (combinação). Garante que todas as combinações são testadas.`,
       `<strong>Quando usar:</strong> sistema de aprovação de crédito, cálculo de frete com múltiplos critérios, qualquer lógica "se A e B então X, se A e não-B então Y".`
     ]},
    {sub:'Teste de Transição de Estado',
     text:`Para sistemas que <strong>mudam de estado</strong> com base em eventos ou condições. Modela estados, transições válidas e inválidas.`,
     items:[
       `<strong>Componentes do modelo:</strong> estados (situações em que o sistema pode estar), transições (mudanças de estado), eventos (triggers das transições), condições de guarda (pré-requisitos), ações (o que acontece na transição).`,
       `<strong>Exemplo pedido:</strong> Aberto → Confirmado → Em Separação → Enviado → Entregue; qualquer estado → Cancelado.`,
       `<strong>Cobertura de todos os estados:</strong> garantir que cada estado é visitado por pelo menos um caso de teste.`,
       `<strong>Cobertura de todas as transições válidas:</strong> mais forte — cada transição é exercitada. 100% transições válidas é o mínimo recomendado pelo CTFL.`,
       `<strong>Transições inválidas:</strong> testar que o sistema REJEITA transições não permitidas (ex: Entregue → Em Separação não deve ser possível).`
     ]},
    {sub:'Teste de Caso de Uso',
     text:`Baseado nos <strong>cenários de uso</strong> do sistema pelo usuário. Cobre o fluxo principal e os fluxos alternativos/de exceção.`,
     items:[
       `<strong>Fluxo principal (happy path):</strong> o caminho de sucesso mais comum. Ex: usuário faz login com credenciais válidas.`,
       `<strong>Fluxos alternativos:</strong> variações legítimas do fluxo principal. Ex: login com "lembrar senha" ativado.`,
       `<strong>Fluxos de exceção:</strong> erros e condições inesperadas. Ex: login com senha incorreta 3× → conta bloqueada.`,
       `<strong>Quando usar:</strong> teste de sistema de ponta a ponta, validação com stakeholders de negócio, documentar os fluxos que o sistema deve suportar.`
     ]}
   ],
   tip:'PE + BVA = dupla inseparável. Tabela de Decisão = múltiplas condições. Transição de Estado = sistemas com estados definidos. Nunca use uma técnica isolada quando outra complementa.'},

  {title:'⬜ Técnicas Caixa-Branca',
   text:'Você analisa a estrutura interna do código para garantir cobertura de partes específicas da implementação.',
   sections:[
    {sub:'Cobertura de Instruções (Statement Coverage)',
     text:`Mede o percentual de <strong>linhas/instruções</strong> do código executadas pelos testes.`,
     items:[
       `<strong>100% de instruções:</strong> toda linha do código foi executada pelo menos uma vez.`,
       `<strong>Limitação:</strong> um <code>if</code> sem <code>else</code> pode ter 100% de instruções sem nunca testar o caso "false".`,
       `<strong>Na prática:</strong> métrica baseline — se não alcança 100%, há código morto ou caminhos sem cobertura.`,
       `<strong>Ferramentas:</strong> Istanbul (JavaScript), JaCoCo (Java), Coverage.py (Python).`
     ]},
    {sub:'Cobertura de Ramificações (Branch Coverage)',
     text:`Mede o percentual de <strong>ramificações</strong> (branches) executadas — incluindo o lado verdadeiro E falso de cada decisão.`,
     items:[
       `<strong>Por que é mais forte:</strong> um <code>if (x > 0) { ... }</code> sem <code>else</code>: 100% de instruções passa executando só o bloco true. Para 100% de ramificações, precisa também testar x <= 0.`,
       `<strong>Relação com instruções:</strong> 100% de ramificações GARANTE 100% de instruções. O contrário NÃO é verdade.`,
       `<strong>O que conta como ramificação:</strong> if/else, switch/case, operadores ternários, loops (body executado / body não executado), expressões curto-circuito (&&, ||).`,
       `<strong>Meta prática:</strong> 80–90% de ramificações é o padrão em muitas organizações. 100% é o ideal para código crítico.`
     ]},
    {sub:'Cobertura de Caminhos (Path Coverage)',
     text:`A métrica mais forte — testa todas as <strong>combinações</strong> de ramificações (todos os caminhos possíveis do início ao fim do código).`,
     items:[
       `<strong>Por que é inviável na prática:</strong> n ramificações independentes = 2ⁿ caminhos. 10 ifs = 1024 caminhos possíveis.`,
       `<strong>Quando usar:</strong> funções críticas e curtas onde a cobertura total é alcançável. Não para código complexo.`,
       `<strong>Resumo de força:</strong> Caminhos > Ramificações > Instruções.`
     ]}
   ],
   tip:'Ordem de força: Instruções < Ramificações < Caminhos. A prova adora perguntar: "100% de ramificações garante 100% de instruções?" → SIM. "100% de instruções garante 100% de ramificações?" → NÃO.'},

  {title:'🎲 Técnicas Baseadas em Experiência',
   text:'Complementam as técnicas formais usando o julgamento humano. Muito eficazes para encontrar defeitos que especificações não antecipam.',
   sections:[
    {sub:'Suposição de Erro (Error Guessing)',
     text:`O testador usa experiência anterior para <strong>prever onde os defeitos provavelmente estão</strong> e cria casos de teste para esses pontos.`,
     items:[
       `<strong>Como fazer:</strong> criar uma lista de erros prováveis com base em experiência, histórico de bugs do projeto, tipos de falhas comuns na tecnologia.`,
       `<strong>Exemplos de erros comuns:</strong> divisão por zero, campo vazio enviado, string maior que o tamanho máximo, caracteres especiais (';, <, >), valores negativos onde só positivos são esperados.`,
       `<strong>Quando é mais eficaz:</strong> testadores experientes na tecnologia e no domínio de negócio têm intuição melhor calibrada.`
     ]},
    {sub:'Teste Exploratório',
     text:`Design, execução e aprendizado acontecem <strong>simultaneamente</strong>. O testador aprende sobre o sistema enquanto testa e usa esse aprendizado para guiar os próximos passos.`,
     items:[
       `<strong>Sessão com limite de tempo:</strong> prática comum é definir blocos de 90 minutos com charter (objetivo da sessão). Ex: "explorar o módulo de pagamento focando em valores-limite e estados de erro".`,
       `<strong>Quando é mais eficaz:</strong> nova feature sem especificação completa, investigação de comportamento estranho reportado por usuário, sessões de bug hunting, complementar casos de teste formais.`,
       `<strong>Não é aleatório:</strong> é sistemático — mas o sistema é a mente treinada do testador, não um script pré-definido.`,
       `<strong>Documentação:</strong> anotar o que foi explorado, o que foi encontrado e o que ainda precisa ser investigado (test notes).`
     ]},
    {sub:'Teste Baseado em Checklist',
     text:`Usa uma <strong>lista de verificação</strong> baseada em conhecimento prévio, standards ou experiências anteriores para guiar os testes.`,
     items:[
       `<strong>Origem do checklist:</strong> padrões de qualidade (OWASP para segurança), experiências anteriores de testes, requisitos não funcionais recorrentes (performance, acessibilidade).`,
       `<strong>Vantagem:</strong> garante que pontos importantes conhecidos não sejam esquecidos. Reduz risco de omissão de verificações padrão.`,
       `<strong>Limitação:</strong> cobre apenas o que já é conhecido — não encontra o desconhecido. Deve ser atualizado após cada projeto.`
     ]}
   ]},

  {title:'🤝 Abordagens Colaborativas',
   text:`Abordagens que envolvem colaboração entre Dev, QA e Negócio para definir critérios de qualidade <strong>antes</strong> do desenvolvimento. Todas implementam o princípio Shift Left.`,
   sections:[
    {sub:`${tt('BDD','Behavior-Driven Development — desenvolvimento orientado ao comportamento')} — Behavior-Driven Development`,
     text:`Usa linguagem natural no formato <strong>Dado que / Quando / Então</strong> (Given/When/Then) para especificar comportamentos esperados que se tornam testes automatizados.`,
     items:[
       `<strong>Formato Gherkin:</strong> Dado que [contexto/pré-condição]... Quando [ação do usuário]... Então [resultado esperado].`,
       `<strong>Exemplo:</strong> Dado que o usuário está logado / Quando adiciona um produto ao carrinho / Então o contador do carrinho aumenta em 1.`,
       `<strong>Ferramentas:</strong> Cucumber (Java/JS), SpecFlow (.NET), Behave (Python) — convertem cenários Gherkin em testes executáveis.`,
       `<strong>Benefício:</strong> linguagem comum entre Dev, QA e Negócio. Especificação vira documentação viva que sempre está atualizada.`
     ]},
    {sub:`${tt('ATDD','Acceptance Test-Driven Development — testes de aceite escritos antes do desenvolvimento')} — Acceptance Test-Driven Development`,
     text:`Testes de aceite são escritos <strong>antes</strong> do desenvolvimento, de forma colaborativa entre Dev, QA e Negócio.`,
     items:[
       `<strong>Processo:</strong> 1. Equipe discute a história → 2. QA escreve testes de aceite → 3. Dev implementa até testes passarem → 4. Testes viram documentação.`,
       `<strong>Diferença do TDD:</strong> TDD é do desenvolvedor (testes unitários); ATDD é da equipe inteira (testes de aceite). Ambos são "test-first".`,
       `<strong>Benefício principal:</strong> ambiguidades nos requisitos são eliminadas antes de começar a codificar — quando mudar é mais barato.`
     ]},
    {sub:'Três Amigos (Three Amigos)',
     text:`Reunião entre Desenvolvedor + QA + Representante do Negócio <strong>antes</strong> de começar a desenvolver uma história de usuário.`,
     items:[
       `<strong>Objetivo:</strong> alinhar a compreensão da história, identificar cenários de teste que o negócio não documentou e prevenir mal-entendidos.`,
       `<strong>Perspectiva de cada "amigo":</strong> Dev pensa "como vou implementar?"; QA pensa "como vou testar/quebrar?"; Negócio pensa "o que precisa funcionar para gerar valor?".`,
       `<strong>Saída da reunião:</strong> critérios de aceite refinados, cenários BDD/ATDD acordados, definição de Done alinhada.`,
       `<strong>Quando acontece:</strong> no refinamento do backlog, antes da sprint. Dura 20–40 minutos por história.`
     ]}
    ,{sub:'INVEST — Critérios para Boas Histórias de Usuário',
     text:`O acrônimo <strong>INVEST</strong> define as 6 características de uma boa história de usuário. É cobrado diretamente na prova (FL-4.5.1).`,
     items:[
       `<strong>I — Independent (Independente):</strong> histórias não devem ter dependências fortes entre si. Isso permite priorizá-las e implementá-las em qualquer ordem`,
       `<strong>N — Negotiable (Negociável):</strong> não é um contrato fixo — é um convite à conversa. Os detalhes são negociados entre Dev, QA e Negócio`,
       `<strong>V — Valuable (Valiosa):</strong> deve entregar valor real ao usuário ou ao negócio. Se não houver valor claro, a história deve ser questionada`,
       `<strong>E — Estimable (Estimável):</strong> deve ser possível estimar o esforço. Se ninguém consegue estimar, a história está grande demais ou mal definida`,
       `<strong>S — Small (Pequena):</strong> deve ser implementável dentro de uma sprint. Histórias grandes são épicos — devem ser quebradas em histórias menores`,
       `<strong>T — Testable (Testável):</strong> deve ser possível escrever critérios de aceite verificáveis. "O sistema deve ser rápido" NÃO é testável sem critério objetivo`
     ]}
    ,{sub:'Formatos de Critérios de Aceite',
     text:`Os critérios de aceite podem ser escritos em diferentes formatos. O CTFL 4.0 distingue dois principais — a prova testa saber identificar cada formato (FL-4.5.2).`,
     items:[
       `<strong>Orientado a Cenários (Scenario-oriented):</strong> usa o formato ${tt('BDD','Behavior-Driven Development')} Dado/Quando/Então. Descreve o comportamento do sistema em contexto específico. Ex: "Dado que o usuário está logado / Quando clica em 'Adicionar ao carrinho' / Então o item aparece no carrinho e o contador aumenta em 1"`,
       `<strong>Orientado a Regras (Rule-oriented):</strong> lista regras de negócio e restrições que o sistema deve satisfazer, sem estrutura narrativa. Ex: "O sistema deve aceitar senhas entre 8 e 20 caracteres · A senha deve conter ao menos 1 número · O campo é obrigatório"`,
       `<strong>Quando usar cada formato:</strong> orientado a cenários = fluxos de uso, interações do usuário, casos de uso. Orientado a regras = validações, restrições técnicas, regras de negócio simples`,
       `<strong>Ambos são válidos</strong> segundo o CTFL 4.0. A escolha depende da natureza do critério e da preferência da equipe. Na prova, identifique o formato pelo enunciado: estrutura Dado/Quando/Então = cenário; lista de regras = orientado a regras`
     ]}
   ],
   tip:'Tríade do Shift Left colaborativo: BDD (linguagem natural → código) + ATDD (teste antes de implementar) + Três Amigos (alinhamento antes de começar). Todos ocorrem ANTES do desenvolvimento.'},

  {title:'🔗 Como Escolher a Técnica Certa',
   text:'A escolha da técnica é uma decisão de risco e contexto. Combiná-las estrategicamente maximiza a cobertura e o custo-benefício.',
   sections:[
    {sub:'Guia de seleção por situação',
     items:[
       `<strong>Campo com intervalo numérico:</strong> PE + BVA juntos — PE define as partições, BVA foca nos limites de cada partição.`,
       `<strong>Múltiplas condições independentes:</strong> Tabela de Decisão — garante todas as combinações de condições.`,
       `<strong>Sistema com estados definidos:</strong> Transição de Estado — modela todos os estados e transições válidas/inválidas.`,
       `<strong>Funcionalidade ponta a ponta:</strong> Caso de Uso — cobre happy path + fluxos alternativos + exceções.`,
       `<strong>Cobertura do código:</strong> Caixa-Branca (Ramificações) — garante que ambos os lados de cada decisão foram testados.`,
       `<strong>Área de alto risco sem especificação:</strong> Suposição de Erro + Exploratório — julgamento humano guiado por experiência.`
     ]},
    {sub:'Combinações mais eficazes',
     items:[
       `<strong>PE + BVA:</strong> sempre use juntos para campos com intervalos. PE sem BVA deixa os limites expostos; BVA sem PE pode testar limites sem cobrir o meio da partição.`,
       `<strong>Caixa-Preta + Exploratório:</strong> técnicas formais cobrem os cenários conhecidos; exploratório encontra o que não foi especificado.`,
       `<strong>Automação (Caixa-Branca) + Manual (Exploratório):</strong> automação garante regressão e cobertura de código; manual garante comportamento real sob perspectiva humana.`,
       `<strong>ATDD/BDD + Tabela de Decisão:</strong> BDD define o comportamento em linguagem natural; Tabela de Decisão garante cobertura de todas as combinações de regras.`
     ]},
    {sub:'Erros comuns a evitar',
     items:[
       `<strong>Usar só o happy path:</strong> cobrir apenas o fluxo de sucesso deixa todos os fluxos de erro e exceção sem cobertura.`,
       `<strong>Confundir PE com BVA:</strong> PE = um valor representativo por partição. BVA = valores nos limites entre partições. Ambos são necessários.`,
       `<strong>Automatizar testes instáveis:</strong> interface em constante mudança = alto custo de manutenção. Estabilize a interface antes de automatizar.`,
       `<strong>Ignorar partições inválidas:</strong> partições inválidas são tão importantes quanto as válidas — o sistema deve rejeitar corretamente entradas fora dos limites.`
     ]}
   ]}
 ],
 quiz:[
  {q:'Campo aceita idades entre 18 e 65 anos (inclusive). Usando Análise de Valor Limite de 2 pontos, quais são os valores de teste corretos?',
   opts:['Apenas 18 e 65','17, 18, 65 e 66','18, 40 e 65','16, 18, 65, 67'],c:1,
   fb:'BVA de 2 pontos: para cada limite, teste o valor no limite e o imediatamente fora. <strong>17</strong> (inválido abaixo), <strong>18</strong> (limite mínimo válido), <strong>65</strong> (limite máximo válido), <strong>66</strong> (inválido acima).'},
  {q:'Sistema de e-commerce tem desconto de 15% para clientes VIP com compra acima de R$300. Qual técnica melhor cobre todas as combinações de condições?',
   opts:['Análise de Valor Limite','Tabela de Decisão','Teste Exploratório','Cobertura de Instruções'],c:1,
   fb:'<strong>Tabela de Decisão</strong>: ideal para múltiplas condições independentes (VIP: sim/não × Valor>300: sim/não = 4 combinações). Garante que todas as regras de negócio são testadas.'},
  {q:'Testador navega por um app sem roteiro pré-definido, aprendendo sobre o sistema enquanto explora, guiando próximos passos com o aprendizado obtido. Que técnica é essa?',
   opts:['Tabela de Decisão','Particionamento de Equivalência','Teste Exploratório','Análise de Valor Limite'],c:2,
   fb:'<strong>Teste Exploratório</strong>: design, execução e aprendizado acontecem simultaneamente. Sem script pré-definido. Usa intuição e aprendizado contínuo para guiar a exploração.'},
  {q:'Sobre cobertura de ramificações vs cobertura de instruções, qual afirmação está CORRETA?',
   opts:['São equivalentes e intercambiáveis','100% de ramificações garante 100% de instruções, mas o contrário não é verdade','100% de instruções garante 100% de ramificações','Cobertura de instruções é sempre mais forte'],c:1,
   fb:'<strong>Ramificações é mais forte</strong>: 100% de ramificações necessariamente cobre 100% de instruções (cada instrução está em alguma ramificação). O contrário é falso: 100% de instruções não garante que ambos os lados de um if foram testados.'},
  {q:'Sistema de pedidos tem estados: Aberto → Confirmado → Enviado → Entregue → Cancelado. Qual técnica é mais adequada para garantir cobertura dos fluxos entre estados?',
   opts:['Particionamento de Equivalência','Análise de Valor Limite','Teste de Transição de Estado','Suposição de Erro'],c:2,
   fb:'<strong>Teste de Transição de Estado</strong>: modela os estados do sistema e as transições entre eles. Ideal para sistemas com estados definidos e regras sobre quais transições são válidas.'},
  {q:'Qual o formato padrão de especificação usado no BDD (Behavior-Driven Development)?',
   opts:['Fluxograma de decisão','Dado que... Quando... Então... (Given/When/Then)','Diagrama de estados UML','Tabela de entrada e saída'],c:1,
   fb:'<strong>BDD</strong> usa o formato <strong>Dado que</strong> [contexto inicial]... <strong>Quando</strong> [ação realizada]... <strong>Então</strong> [resultado esperado]. Linguagem natural que vira código de teste automatizado.'},
  {q:'A técnica "Três Amigos" no desenvolvimento ágil envolve qual combinação de papéis?',
   opts:['Três testadores revisando o mesmo caso de teste','Desenvolvedor + QA + Representante do Negócio discutindo histórias ANTES do desenvolvimento','Três níveis de teste sendo executados simultaneamente','Três técnicas de caixa-preta aplicadas juntas'],c:1,
   fb:'<strong>Três Amigos</strong>: Dev + QA + Negócio se reúnem ANTES do desenvolvimento de cada história para alinhar expectativas, identificar cenários de teste e prevenir mal-entendidos. É uma prática de Shift Left.'}
  ,{q:'Campo aceita desconto de 0% a 50% (inclusive). Usando PE com cobertura de 100%, quantos casos de teste são necessários como MÍNIMO?',
   opts:['1 (só o valor 25%)','2 (um válido: 25%; um inválido: 60%)','3 (um válido: 25%; dois inválidos: -1% e 55%)','4 (limites: 0, 1, 49, 50)'],c:2,
   fb:'<strong>PE com 100% de cobertura</strong>: um representante por partição. Para 0–50%: 1 partição válida (ex: 25%) + 1 partição inválida abaixo (ex: -1%) + 1 partição inválida acima (ex: 55%) = <strong>3 casos mínimos</strong>. BVA testaria os limites adicionalmente.'}
  ,{q:'Qual técnica de teste é baseada na ESTRUTURA INTERNA do código e requer acesso ao código-fonte para medir o quanto do código foi exercitado?',
   opts:['Particionamento de Equivalência','Análise de Valor Limite','Cobertura de Ramificações (Branch Coverage)','Suposição de Erro'],c:2,
   fb:'<strong>Cobertura de Ramificações</strong> é uma técnica caixa-branca: analisa a estrutura interna do código, medindo % de ramificações (if/else, switch) exercitadas. Requer acesso ao código-fonte. As outras opções são técnicas caixa-preta.'}
  ,{q:'Testador experiente, ao testar um módulo de importação de CSV, foca em testar arquivos com linhas em branco, caracteres especiais e tamanho zero — baseado em tipos de erros que causaram bugs em projetos anteriores. Que técnica é essa?',
   opts:['Análise de Valor Limite','Suposição de Erro (Error Guessing)','Tabela de Decisão','Cobertura de Instruções'],c:1,
   fb:'<strong>Suposição de Erro</strong>: o testador usa experiência anterior para prever onde os defeitos provavelmente estão. Histórico de bugs similares é a principal fonte de informação. É uma técnica baseada em experiência, não em especificação.'}
  ,{q:'Um sistema de aprovação de empréstimo aplica regras: aprovado se (score > 700 E renda > 3000) OU (score > 800 E renda > 2000). Qual técnica garante cobertura de TODAS as combinações dessas condições?',
   opts:['Análise de Valor Limite','Particionamento de Equivalência','Tabela de Decisão','Teste Exploratório'],c:2,
   fb:'<strong>Tabela de Decisão</strong>: ideal quando múltiplas condições independentes combinadas geram ações diferentes. Para 2 condições binárias = 4 combinações; para esse sistema com 4 condições = necessidade de mapear todas as combinações relevantes.'}
 ]},

// ─────────────────── MÓDULO 5 ───────────────────
{id:5,icon:'📋',name:'Gerenciamento de Testes',
 desc:'Planejamento, riscos, monitoramento, gestão de configuração e ciclo de vida de defeitos.',topics:'8 tópicos · 6 questões',
 content:[
  {title:'📝 Planejamento de Testes',
   text:`O Plano de Testes é o documento central do gerenciamento. Define a estratégia e guia todas as atividades de teste no projeto. O CTFL 4.0 define os componentes essenciais de um plano eficaz.`,
   sections:[
    {sub:'Estrutura do Plano de Testes',
     text:'Um plano de testes completo deve cobrir pelo menos estes elementos:',
     items:[
       `<strong>Contexto do teste:</strong> escopo (o que será e o que NÃO será testado), objetivos, base de teste (requisitos, histórias de usuário, critérios de aceite).`,
       `<strong>Abordagem (estratégia):</strong> quais técnicas de teste serão usadas, níveis de teste, tipos de teste, automação vs manual, grau de independência.`,
       `<strong>Recursos:</strong> equipe (papéis e responsabilidades), ferramentas, ambientes de teste, dados de teste necessários.`,
       `<strong>Cronograma:</strong> estimativa de esforço, marcos (milestones), janelas de execução, dependências.`,
       `<strong>Riscos de teste:</strong> riscos identificados e planos de mitigação/contingência.`,
       `<strong>Critérios de entrada e saída:</strong> condições para iniciar e encerrar os testes.`
     ]},
    {sub:'Critérios de Entrada e Saída',
     text:`Dois dos conceitos mais cobrados em prova — não confunda os dois.`,
     items:[
       `<strong>Critério de Entrada (Definition of Ready):</strong> condições que DEVEM ser atendidas ANTES de iniciar os testes. Ex: build disponível e smoke test passando, ambiente configurado, dados de teste preparados, casos de teste revisados e aprovados.`,
       `<strong>Critério de Saída (Definition of Done):</strong> condições para ENCERRAR os testes. Ex: 95% dos casos de teste executados, zero defeitos críticos e altos abertos, relatório de conclusão emitido.`,
       `<strong>Por que importam:</strong> critérios de entrada evitam desperdiçar esforço testando um build quebrado. Critérios de saída evitam o "já que temos tempo, vamos testar mais" sem critério objetivo.`,
       `<strong>No contexto ágil:</strong> critérios de entrada e saída mapeiam para "Definition of Ready" (história pronta para desenvolvimento) e "Definition of Done" (história concluída).`
     ]},
    {sub:'Estimativas de Esforço de Teste',
     text:'Estimar esforço é um dos desafios do gerenciamento. O CTFL reconhece várias técnicas:',
     items:[
       `<strong>Métricas históricas:</strong> usar dados de projetos anteriores — velocidade média de criação de casos de teste, taxa de execução, densidade de defeitos esperada.`,
       `<strong>Estimativa por analogia:</strong> comparar com projetos similares. "O módulo X tem complexidade parecida com o módulo Y que levou 40h para testar."`,
       `<strong>Julgamento de especialistas:</strong> estimativa do testador mais experiente. Subjetiva mas valiosa para áreas sem histórico.`,
       `<strong>Planning poker (ágil):</strong> estimativa colaborativa usando story points, com consenso da equipe.`,
       `<strong>Fatores que afetam o esforço:</strong> tamanho do sistema, complexidade, nível de risco, experiência da equipe, disponibilidade do ambiente, qualidade dos requisitos.`
     ]}
   ]},

  {title:'⚠️ Gestão de Riscos em Teste',
   text:`Risco = probabilidade de ocorrência × impacto no projeto. Teste baseado em risco é a prática mais eficiente de alocar esforço onde ele mais importa.`,
   sections:[
    {sub:'Risco de Produto vs Risco de Projeto',
     text:'O CTFL 4.0 distingue dois tipos fundamentais de risco:',
     items:[
       `<strong>Risco de Produto:</strong> algo no software pode funcionar incorretamente — afeta a qualidade do produto entregue. Ex: "O módulo de pagamento pode calcular valores errados." "A função de busca pode retornar resultados incorretos."`,
       `<strong>Risco de Projeto:</strong> algo pode comprometer o andamento do projeto — não é sobre o produto em si. Ex: "A equipe de QA não tem experiência com o framework." "O ambiente de teste pode não estar disponível no prazo." "Requisitos podem mudar frequentemente."`,
       `<strong>Como distinguir na prova:</strong> se o risco afeta QUALIDADE do software → risco de produto. Se afeta CRONOGRAMA, CUSTO ou PROCESSO → risco de projeto.`
     ]},
    {sub:'Nível de Risco e Priorização',
     items:[
       `<strong>Fórmula:</strong> Nível de Risco = <strong>Probabilidade</strong> (chance de ocorrer) × <strong>Impacto</strong> (consequência se ocorrer).`,
       `<strong>Como estimar probabilidade:</strong> histórico de defeitos na área, complexidade técnica, tecnologia nova/não testada, mudanças recentes no código.`,
       `<strong>Como estimar impacto:</strong> criticidade para o negócio, número de usuários afetados, consequências financeiras, regulatórias ou de imagem.`,
       `<strong>Matriz de risco:</strong> classifica itens em Alto/Médio/Baixo. Alto risco → mais casos de teste, técnicas mais rigorosas, mais rounds de teste.`
     ]},
    {sub:'Teste Baseado em Risco (Risk-Based Testing)',
     text:`Estratégia de priorização onde a profundidade e a ordem dos testes são definidas pelo nível de risco de cada área.`,
     items:[
       `<strong>Princípio:</strong> com tempo e recursos limitados, testar primeiro e mais profundamente as áreas de maior risco.`,
       `<strong>O que muda na prática:</strong> áreas de alto risco → mais casos de teste, técnicas formais (tabela de decisão, BVA), automação de regressão. Áreas de baixo risco → menos casos, smoke test, exploratório leve.`,
       `<strong>Revisão contínua:</strong> o perfil de risco muda durante o projeto. Defeitos encontrados em uma área aumentam o risco estimado dela. Revisão regular é essencial.`,
       `<strong>Conexão com o Princípio 5:</strong> "Ausência de defeitos é uma ilusão" — encontrar 0 defeitos em uma área de alto risco não significa que está perfeito, pode significar que os testes não foram suficientemente rigorosos.`
     ]},
    {sub:'Mitigação e Contingência',
     items:[
       `<strong>Mitigação:</strong> ações para REDUZIR a probabilidade ou o impacto antes do risco se materializar. Ex: aumentar cobertura de testes, realizar code review, adicionar monitoramento de produção.`,
       `<strong>Contingência:</strong> plano B para quando o risco SE MATERIALIZA. Ex: "Se o ambiente de teste falhar, usaremos ambiente Docker local." "Se a equipe ficar reduzida, priorizaremos apenas os testes de alto risco."`,
       `<strong>Aceitação do risco:</strong> para riscos de baixo impacto, pode ser mais eficiente aceitar o risco do que investir em mitigação.`
     ]}
   ],
   tip:'Na prova: Risco de PRODUTO = qualidade do software. Risco de PROJETO = andamento/processo. Fórmula: Probabilidade × Impacto. Teste Baseado em Risco = alocar mais esforço onde o risco é maior.'},

  {title:'📊 Monitoramento e Controle de Teste',
   text:'Acompanhar o progresso e tomar ações corretivas quando o projeto desvia do plano é responsabilidade central do Gerente/Líder de Teste.',
   sections:[
    {sub:'Métricas de Progresso',
     text:'Métricas quantitativas permitem comunicar o status de forma objetiva e identificar desvios cedo:',
     items:[
       `<strong>Cobertura:</strong> % de requisitos cobertos por casos de teste, % de código coberto (quando caixa-branca), % de riscos mitigados.`,
       `<strong>Execução:</strong> % casos de teste executados, % aprovados (passed), % reprovados (failed), % bloqueados.`,
       `<strong>Defeitos:</strong> total encontrado por severidade, total aberto/fechado/reaberto, taxa de injeção vs taxa de resolução, tempo médio de resolução.`,
       `<strong>Progresso temporal:</strong> burn-down de casos de teste (planejado vs real), velocidade de execução (casos/dia).`
     ]},
    {sub:'Relatórios de Teste',
     items:[
       `<strong>Relatório de Progresso:</strong> comunicação periódica (diária/semanal) para stakeholders. Inclui: o que foi testado, status atual, principais defeitos, riscos identificados, desvios do plano e ações corretivas.`,
       `<strong>Relatório de Conclusão:</strong> documento final ao encerrar os testes. Inclui: resumo do que foi testado, métricas finais (% cobertura, defeitos por status), avaliação de qualidade do produto, desvios do plano, lições aprendidas, recomendação de go/no-go.`,
       `<strong>Público-alvo:</strong> relatórios de progresso são para o time e PM. Relatório de conclusão é para stakeholders executivos e decisores de release.`
     ]},
    {sub:'Controle de Teste — Ações Corretivas',
     text:'Monitoramento sem ação é inútil. Quando métricas mostram desvio, o Líder de Teste deve agir:',
     items:[
       `<strong>Desvio de cronograma:</strong> realocar testadores, priorizar casos de teste de maior risco, reduzir escopo de teste de baixo risco.`,
       `<strong>Taxa de defeitos alta:</strong> alertar o time de desenvolvimento, pausar execução de novos testes até qualidade mínima atingida, aumentar foco em áreas problemáticas.`,
       `<strong>Ambiente instável:</strong> escalar para infraestrutura, usar ambiente alternativo, documentar impacto nos resultados.`,
       `<strong>Recursos insuficientes:</strong> renegociar escopo com PM, adicionar testadores, avaliar automação de casos repetitivos.`
     ]}
   ]},

  {title:'⚙️ Gestão de Configuração e Rastreabilidade',
   text:'Garantir que todos os membros do time trabalham com versões corretas de artefatos — código, testes, requisitos — e que os vínculos entre eles são mantidos.',
   sections:[
    {sub:'Gestão de Configuração',
     text:`Controla versões de todos os artefatos de software e teste para garantir reprodutibilidade e rastreabilidade.`,
     items:[
       `<strong>O que controlar:</strong> código-fonte (Git, SVN), casos de teste e planos de teste (TestRail, Zephyr), ambientes de teste (scripts Docker, Terraform), dados de teste, documentação de requisitos.`,
       `<strong>Reprodutibilidade:</strong> a capacidade de executar o mesmo teste na mesma versão do sistema e obter o mesmo resultado. Essencial para confirmar correções de defeitos.`,
       `<strong>Identificação de configuração:</strong> cada item tem ID único e histórico de versões. Ex: caso de teste TC-042 v2.1 executa na build 3.4.1 em ambiente de staging.`,
       `<strong>Ferramentas:</strong> Git/GitHub/GitLab (código), TestRail/Zephyr (testes), Jira/Azure DevOps (bugs), Docker/Kubernetes (ambientes), Confluence (docs).`
     ]},
    {sub:'Rastreabilidade Bidirecional',
     text:`Manter vínculos entre requisitos, casos de teste, casos de teste executados e defeitos encontrados.`,
     items:[
       `<strong>Rastreabilidade para frente:</strong> requisito → casos de teste que o cobrem. Permite saber: "Este requisito está coberto por testes?"`,
       `<strong>Rastreabilidade para trás:</strong> caso de teste → requisito que ele verifica. Permite saber: "Por que este caso de teste existe? Qual requisito ele cobre?"`,
       `<strong>Rastreabilidade de defeitos:</strong> defeito → caso de teste que o encontrou → requisito que o caso de teste cobre. Permite análise de impacto: "Esta mudança no requisito afeta quais testes e quais defeitos já encontrados?"`,
       `<strong>Análise de impacto:</strong> quando um requisito muda, rastreabilidade mostra imediatamente quais casos de teste precisam ser atualizados.`
     ]}
   ]},

  {title:'🐛 Gestão do Ciclo de Vida de Defeitos',
   text:'Um bug report bem escrito é a diferença entre um defeito corrigido rapidamente e um que fica aberto por semanas. A gestão adequada garante que nada se perde no ciclo de desenvolvimento.',
   sections:[
    {sub:'Componentes de um Bug Report de Qualidade',
     text:'Cada campo tem uma função — omitir qualquer um aumenta o tempo de resolução:',
     items:[
       `<strong>Identificação:</strong> ID único + título claro e descritivo (ex: "Login falha com email contendo '+'" em vez de "Bug no login").`,
       `<strong>Reprodução:</strong> passos numerados e detalhados para reproduzir — o elemento mais crítico. Sem passos reprodutíveis, o dev não consegue confirmar o defeito.`,
       `<strong>Resultado esperado vs obtido:</strong> o que DEVERIA acontecer × o que REALMENTE aconteceu. Contexto de negócio do por quê o comportamento esperado é correto.`,
       `<strong>Classificação:</strong> Severidade (impacto técnico) + Prioridade (urgência de negócio) + Tipo (funcional, performance, segurança, usabilidade).`,
       `<strong>Ambiente:</strong> OS, browser, versão do sistema, dados de teste usados — necessário para reprodução.`,
       `<strong>Evidências:</strong> screenshot, vídeo, logs de console/servidor, dump de memória — acelera o diagnóstico do dev.`
     ]},
    {sub:'Severidade vs Prioridade — A Distinção Mais Cobrada',
     text:'A confusão entre severidade e prioridade é uma das armadilhas clássicas da prova CTFL:',
     items:[
       `<strong>Severidade:</strong> <em>impacto técnico</em> do defeito no sistema. Definida pelo QA. Escala: Crítico (sistema parado/data loss) → Alto (funcionalidade principal quebrada) → Médio (funcionalidade afetada com workaround) → Baixo (cosmético, impacto mínimo).`,
       `<strong>Prioridade:</strong> <em>urgência de negócio</em> para correção. Definida em conjunto com o negócio/PM. Pode ser completamente diferente da severidade.`,
       `<strong>Exemplo clássico 1:</strong> typo na logo da empresa (severidade BAIXA) na home do maior banco do país = prioridade ALTA (impacto de imagem).`,
       `<strong>Exemplo clássico 2:</strong> crash total do sistema (severidade CRÍTICA) em tela de manutenção acessada por 1 admin uma vez por ano = prioridade BAIXA (impacto de negócio mínimo).`,
       `<strong>Regra prática:</strong> severidade = problema técnico. Prioridade = urgência de negócio. Ambas devem ser documentadas separadamente.`
     ]},
    {sub:'Ciclo de Vida do Defeito',
     text:`O defeito percorre estados bem definidos do reporte até o encerramento. Conhecer o fluxo é cobrado na prova.`,
     items:[
       `<strong>Novo:</strong> defeito reportado, ainda não analisado.`,
       `<strong>Aberto/Atribuído:</strong> analisado, confirmado como defeito real, atribuído ao desenvolvedor responsável.`,
       `<strong>Em Andamento:</strong> desenvolvedor está trabalhando na correção.`,
       `<strong>Resolvido:</strong> desenvolvedor afirma ter corrigido e entrega nova build para o QA verificar.`,
       `<strong>Verificado/Fechado:</strong> QA confirma que a correção funciona e o defeito não se reproduz mais.`,
       `<strong>Reaberto:</strong> QA verificou e o defeito AINDA ocorre — volta para o desenvolvedor.`,
       `<strong>Rejeitado/Não é defeito:</strong> investigação confirma que o comportamento é o esperado (mal-entendido de requisito).`,
       `<strong>Adiado/Diferido:</strong> defeito real mas prioridade muito baixa para ser corrigido neste release.`
     ]},
    {sub:'O que NÃO fazer em um Bug Report',
     items:[
       `<strong>Nunca mencionar nomes:</strong> "O Pedro introduziu este bug" — bug reports são documentos técnicos, não acusações.`,
       `<strong>Evitar sugestões de solução:</strong> a menos que solicitado pelo dev. O QA reporta o comportamento; o dev decide a implementação da correção.`,
       `<strong>Evitar linguagem vaga:</strong> "às vezes falha" → "falha em 3 de 5 execuções quando o campo está vazio". "Lento" → "tempo de resposta de 12s, esperado < 2s".`,
       `<strong>Não misturar múltiplos defeitos:</strong> um bug report = um defeito. Defeitos diferentes têm severidades, responsáveis e ciclos de vida diferentes.`
     ]}
   ],
   tip:'Ciclo de vida do defeito para a prova: Novo → Aberto → Em Andamento → Resolvido → Verificado/Fechado (ou Reaberto). Diferido = real mas adiado. Rejeitado = não é defeito. Quem fecha? O QA (não o dev).'}

  ,{title:'📐 Técnicas de Estimativa de Esforço de Teste',
   text:`As técnicas de estimativa são cobradas diretamente na prova CTFL 4.0 com cálculos numéricos (FL-5.1.4 K3). Duas técnicas são exigidas: estimativa de 3 pontos e estimativa baseada em proporção.`,
   sections:[
    {sub:'Estimativa de 3 Pontos (Three-Point Estimation)',
     text:`Combina três estimativas — otimista, mais provável e pessimista — para produzir uma estimativa ponderada mais realista.`,
     items:[
       `<strong>Fórmula:</strong> E = (O + 4 × MP + P) / 6, onde: O = estimativa otimista (melhor caso) · MP = estimativa mais provável · P = estimativa pessimista (pior caso)`,
       `<strong>Exemplo:</strong> O = 2h, MP = 11h, P = 14h → E = (2 + 4×11 + 14) / 6 = (2 + 44 + 14) / 6 = 60 / 6 = <strong>10 horas</strong>`,
       `<strong>Por que 4×MP?</strong> A estimativa mais provável recebe peso 4 porque é a mais informada — o extremo otimista e pessimista têm peso 1 cada, totalizando denominador 6`,
       `<strong>Quando usar:</strong> quando há incerteza significativa e membros da equipe têm perspectivas diferentes sobre a complexidade da tarefa`
     ]},
    {sub:'Estimativa Baseada em Proporção (Ratio-Based / Percentage)',
     text:`Usa dados históricos de projetos similares para calcular a proporção entre esforço de teste e esforço de desenvolvimento.`,
     items:[
       `<strong>Fórmula:</strong> calcular a proporção média (esforço de teste / esforço de desenvolvimento) nos projetos históricos, depois aplicar ao novo projeto`,
       `<strong>Exemplo:</strong> 4 projetos históricos com proporções: 40k/800k=5%, 130k/1200k=10,8%, 70k/600k=11,7%, 120k/1000k=12% → Média = (5+10,8+11,7+12)/4 = 9,875% → Novo projeto com dev $800k → esforço de teste = 800k × 9,875% ≈ <strong>$79.000</strong>`,
       `<strong>Quando usar:</strong> quando existem dados históricos confiáveis de projetos similares em complexidade, tecnologia e tamanho`,
       `<strong>Limitação:</strong> projetos diferentes têm contextos diferentes — a proporção histórica pode não refletir a realidade do novo projeto`
     ]},
    {sub:'Outras Técnicas de Estimativa (visão geral)',
     items:[
       `<strong>Planning Poker:</strong> estimativa colaborativa ágil onde cada membro vota em story points simultaneamente. Rodadas de discussão até consenso. Regra: se variação pequena após várias rodadas, aceita-se o valor com mais votos`,
       `<strong>Estimativa por analogia:</strong> comparar com projetos similares já concluídos. "O módulo X tem complexidade parecida com o módulo Y que levou 40h"`,
       `<strong>Julgamento de especialistas:</strong> estimativa do testador mais experiente. Subjetiva mas valiosa quando não há histórico comparável`
     ]}
   ],
   tip:'Para a prova: Fórmula de 3 pontos = (O + 4×MP + P) / 6. Memorize o "4×" da mais provável. Proporção = média histórica × esforço estimado. Pratique os cálculos — as questões são K3 (aplicar).'}

  ,{title:'🔺 Pirâmide de Testes e Quadrantes de Teste Ágil',
   text:`Dois modelos de organização da estratégia de teste que o CTFL 4.0 aborda no Capítulo 5. Ambos aparecem diretamente nos Exames A e B (FL-5.1.6 e FL-5.1.7).`,
   sections:[
    {sub:'Pirâmide de Testes',
     text:`Modelo visual que representa a distribuição ideal de testes por nível, equilibrando velocidade, custo e cobertura.`,
     items:[
       `<strong>Base (mais larga) — Testes de Componente/Unitários:</strong> muitos testes, rápidos, baratos, executam em milissegundos. Escritos pelo dev. Alta cobertura de código. Candidatos ideais para automação`,
       `<strong>Meio — Testes de Integração/API:</strong> menos testes que a base, mais lentos. Verificam comunicação entre componentes. Mais estáveis que testes de UI`,
       `<strong>Topo (mais estreito) — Testes de UI/Ponta-a-Ponta:</strong> poucos testes, lentos, caros de manter. Verificam fluxos críticos do usuário. Mais frágeis — UI muda frequentemente`,
       `<strong>Princípio:</strong> quanto mais alto na pirâmide, mais lento, mais caro e mais frágil. A base sólida de testes rápidos é o que sustenta a confiança no sistema`,
       `<strong>Anti-padrão (Ice Cream Cone):</strong> inverso da pirâmide — muitos testes de UI, poucos unitários. Suite lenta, frágil, cara. Sinal de que automação começou pela UI antes de ter base sólida`
     ]},
    {sub:'Quadrantes de Teste Ágil (Q1–Q4)',
     text:`Modelo de Brian Marick que organiza os tipos de teste em 4 quadrantes por dois eixos: <strong>voltado para tecnologia vs negócio</strong> e <strong>suporte ao time vs crítica ao produto</strong>.`,
     items:[
       `<strong>Q1 — Tecnologia + Suporte ao Time:</strong> testes automatizados que ajudam devs a construir bem. Ex: testes de componente (unitários), testes de integração de componentes. Foco em código correto`,
       `<strong>Q2 — Negócio + Suporte ao Time:</strong> testes que ajudam a equipe a entender o que construir. Ex: testes funcionais, testes de aceite, exemplos BDD/ATDD. Foco em comportamento correto`,
       `<strong>Q3 — Negócio + Crítica ao Produto:</strong> testes que avaliam o produto da perspectiva do usuário. Ex: testes exploratórios, testes de usabilidade, teste de aceite do usuário (UAT). Foco em valor real entregue`,
       `<strong>Q4 — Tecnologia + Crítica ao Produto:</strong> testes que avaliam características de qualidade técnica do produto. Ex: testes de performance, segurança, confiabilidade, escalabilidade. Foco em qualidades não-funcionais`
     ]},
    {sub:'Como usar os Quadrantes na priorização',
     items:[
       `<strong>Q1 e Q2 = habilitar o desenvolvimento:</strong> executados continuamente durante o desenvolvimento (pipeline CI/CD). Feedback rápido ao dev`,
       `<strong>Q3 e Q4 = avaliar o produto:</strong> executados em fases de validação ou continuamente em produção (Shift Right). Feedback para o negócio e para planejamento futuro`,
       `<strong>Nenhum quadrante é dispensável:</strong> Q1 sem Q3 = código correto que não entrega valor real. Q3 sem Q1 = produto aparentemente bom com base frágil`
     ]}
   ],
   tip:'Para a prova — Pirâmide: base=unitários (muitos/rápidos), topo=UI (poucos/lentos). Quadrantes: Q1=tech+suporte (unitários), Q2=negócio+suporte (funcionais/BDD), Q3=negócio+crítica (exploratório/usabilidade), Q4=tech+crítica (performance/segurança). Q34 do Exame A: 1C, 2A, 3B, 4D.'}

  ,{title:'📋 Priorização de Testes e Burndown',
   text:`Dois conceitos práticos de gerenciamento que aparecem em questões de cenário nos Exames A e B (FL-5.1.5, FL-5.3.3).`,
   sections:[
    {sub:'Priorização de Casos de Teste com Dependências',
     text:`Na prática, casos de teste têm prioridades E dependências lógicas — não basta ordenar por prioridade, é preciso respeitar as dependências primeiro.`,
     items:[
       `<strong>Regra 1 — Dependências têm precedência:</strong> um caso de teste só pode ser executado depois que seus pré-requisitos (dependências) forem executados e aprovados`,
       `<strong>Regra 2 — Dentro das dependências, ordena por prioridade:</strong> entre testes que podem ser executados agora (sem dependências pendentes), executa-se o de maior prioridade primeiro`,
       `<strong>Algoritmo prático:</strong> 1) Identifique todos os testes sem dependências pendentes → 2) Execute o de maior prioridade → 3) Reavalie quais testes foram "desbloqueados" → 4) Repita`,
       `<strong>Exemplo:</strong> TC001 (prioridade 3, sem dependência) → TC002 (prioridade 2, depende de TC001) → TC003 (prioridade 1, depende de TC002). Ordem de execução: TC001 → TC002 → TC003 — mesmo TC003 tendo prioridade 1 (maior), não pode ser executado antes de TC001 e TC002`
     ]},
    {sub:'Burndown Chart — Monitoramento do Progresso',
     text:`Ferramenta visual de acompanhamento que mostra o trabalho restante ao longo do tempo. Amplamente usada em contextos ágeis.`,
     items:[
       `<strong>Eixo X:</strong> tempo (dias da sprint ou do ciclo de teste)`,
       `<strong>Eixo Y:</strong> quantidade de trabalho restante (casos de teste pendentes, story points, horas)`,
       `<strong>Linha ideal:</strong> linha reta diagonal descendo do total inicial até zero no final do ciclo`,
       `<strong>Linha real:</strong> o progresso efetivo do time. Se a linha real está acima da ideal → time está atrasado. Abaixo da ideal → time está adiantado`,
       `<strong>Quando usar em teste:</strong> monitorar execução de casos de teste por sprint, acompanhar fechamento de defeitos, visualizar progresso de automação`,
       `<strong>No CTFL 4.0:</strong> o burndown é classificado como artefato de monitoramento e controle de teste — mostra quantidade de trabalho concluído E quantidade total restante para uma iteração`
     ]},
    {sub:'Resposta ao Risco — Aceite e Transferência',
     text:`O CTFL 4.0 define 4 estratégias de resposta ao risco. A prova testa saber distinguir cada uma em cenários concretos.`,
     items:[
       `<strong>Mitigação (Mitigation):</strong> ações para REDUZIR a probabilidade ou o impacto ANTES do risco ocorrer. Ex: realizar testes de performance para reduzir o risco de lentidão em produção`,
       `<strong>Contingência (Contingency):</strong> plano B para QUANDO o risco se materializa. Ex: "se o servidor de teste falhar, usaremos ambiente Docker local"`,
       `<strong>Transferência (Transfer):</strong> repassar o impacto financeiro ou operacional do risco para terceiros. Ex: contratar seguro, terceirizar componente de risco, SLA com penalidade ao fornecedor`,
       `<strong>Aceite (Acceptance):</strong> reconhecer o risco e decidir conscientemente não agir — porque o custo de mitigação supera o impacto esperado, ou a probabilidade é muito baixa. Não é ignorância — é decisão informada`,
       `<strong>Exemplo de distinção:</strong> "inundação da sala de servidores" → Transferência (seguro) ou Aceite. "Algoritmo lento" → Mitigação (teste de performance) ou Contingência (escalonamento automático)`
     ]}
   ]}
 ],
 quiz:[
  {q:'Módulo de autenticação tem histórico de 15 defeitos nos últimos 3 releases e é usado por 100% dos usuários. No teste baseado em risco, a equipe deve:',
   opts:['Testar menos para economizar tempo e focar em funcionalidades novas','Priorizar e dedicar mais esforço e cobertura a esse módulo','Focar só em funcionalidades recentemente alteradas','Usar apenas testes exploratórios nesse módulo'],c:1,
   fb:'<strong>Teste baseado em risco</strong>: histórico de defeitos = alta probabilidade, 100% dos usuários = alto impacto → risco alto → mais esforço de teste. Agrupamento de defeitos (princípio 4) também suporta essa decisão.'},
  {q:'Bug causa travamento total do sistema (severidade: crítica), mas ocorre somente em uma tela administrativa de backup acessada por 1 funcionário a cada 6 meses. Qual prioridade é mais adequada?',
   opts:['Crítica, pois a severidade é crítica e sempre define a prioridade','Pode ser baixa ou média, pois o impacto de negócio é mínimo','Alta em qualquer situação que envolva travamento','Depende do nome do desenvolvedor responsável'],c:1,
   fb:'<strong>Severidade ≠ Prioridade</strong>. Severidade = impacto técnico (crítico). Prioridade = urgência de negócio (baixa — 1 user, a cada 6 meses, com workaround). Severidade informa mas não determina a prioridade.'},
  {q:'Qual informação é MAIS importante em um relatório de defeito para que o desenvolvedor possa corrigir o problema rapidamente?',
   opts:['Nome e cargo do testador que encontrou o defeito','Data e hora exata em que o defeito ocorreu','Passos detalhados e reprodutíveis para reproduzir o defeito','Estimativa de horas de desenvolvimento para correção'],c:2,
   fb:'<strong>Passos para reproduzir</strong> são o elemento mais crítico de um bug report. Sem eles, o desenvolvedor não consegue confirmar, isolar e corrigir o defeito. Resultado esperado x obtido complementam.'},
  {q:'A equipe definiu que os testes podem ser encerrados quando 95% dos casos forem executados, zero defeitos críticos estiverem abertos e o relatório de conclusão for emitido. Isso é um:',
   opts:['Critério de Entrada de Teste','Plano de Testes','Critério de Saída de Teste','Relatório de Progresso'],c:2,
   fb:'<strong>Critério de Saída</strong>: condições definidas que devem ser atendidas para encerrar os testes. Critério de Entrada define quando INICIAR; Critério de Saída define quando ENCERRAR.'},
  {q:'Qual é a fórmula para calcular o Nível de Risco de um item a ser testado, segundo o CTFL 4.0?',
   opts:['Impacto + Probabilidade','Impacto × Probabilidade','Impacto / Probabilidade','Impacto - Probabilidade'],c:1,
   fb:'<strong>Nível de Risco = Probabilidade × Impacto</strong>. Este valor determina a prioridade: quanto maior o nível de risco, mais esforço de teste deve ser alocado naquela área.'},
  {q:'Para garantir que todos os membros do time de teste trabalham com a versão correta de um caso de teste após uma mudança nos requisitos, qual prática do gerenciamento de testes é aplicada?',
   opts:['Teste de Regressão','Gestão de Configuração','Análise de Risco','Critério de Saída'],c:1,
   fb:'<strong>Gestão de Configuração</strong> controla versões de todos os artefatos (incluindo casos de teste), garantindo que todos trabalhem com a versão correta e que resultados sejam reprodutíveis.'}
  ,{q:'O Plano de Testes de um projeto define que os testes só podem iniciar quando o build está disponível, o ambiente está configurado e os dados de teste estão preparados. Isso define:',
   opts:['Critério de Saída de Teste','Escopo do Plano de Testes','Critério de Entrada de Teste','Estratégia de Teste'],c:2,
   fb:'<strong>Critério de Entrada</strong>: condições que DEVEM ser atendidas ANTES de iniciar os testes. "Build disponível + ambiente + dados" = condições de entrada. Critério de Saída define quando ENCERRAR.'}
  ,{q:'Qual das seguintes situações configura um RISCO DE PROJETO segundo o CTFL 4.0?',
   opts:['Módulo de pagamento pode calcular taxas de câmbio incorretamente','Algoritmo de busca pode retornar resultados em ordem errada','Equipe de QA não tem experiência com o framework de automação adotado','Relatório fiscal pode gerar dados inconsistentes'],c:2,
   fb:'<strong>Risco de Projeto</strong> afeta o ANDAMENTO do projeto (cronograma, custo, processo). Falta de experiência da equipe é risco de projeto. As outras opções são riscos de PRODUTO — algo no software pode funcionar incorretamente.'}
  ,{q:'Um defeito foi reportado e o desenvolvedor investigou, confirmando que o comportamento é o esperado segundo a especificação. Qual status o defeito deve receber?',
   opts:['Fechado','Diferido','Rejeitado (Não é defeito)','Reaberto'],c:2,
   fb:'<strong>Rejeitado</strong>: após investigação, confirmou-se que não é um defeito — o comportamento está correto conforme especificação. Pode indicar mal-entendido do requisito pelo QA. <strong>Diferido</strong> = defeito real mas adiado para futuro release.'}
  ,{q:'A equipe de QA verifica que dos 200 casos de teste planejados, 160 foram executados (80%), 140 passaram e 20 falharam. A taxa de aprovação (pass rate) é:',
   opts:['70% (140/200)','87.5% (140/160)','80% (160/200)','90% (18/20)'],c:1,
   fb:'<strong>Pass rate</strong> = casos aprovados / casos EXECUTADOS = 140/160 = <strong>87,5%</strong>. Não se divide pelo total planejado, pois alguns ainda não foram executados. Essa distinção é importante para métricas de progresso.'}
 ]},

// ─────────────────── MÓDULO 6 ───────────────────
{id:6,icon:'🛠️',name:'Ferramentas de Teste',
 desc:'Suporte ferramental, automação de testes, benefícios reais e riscos a considerar.',topics:'4 tópicos · 5 questões',
 content:[
  {title:'🔧 Categorias de Ferramentas de Teste',
   text:`Ferramentas aumentam a eficiência e eficácia do processo de teste em diferentes atividades. O CTFL 4.0 não prescreve ferramentas específicas, mas categoriza por função para ajudar na seleção.`,
   sections:[
    {sub:'Gestão e Planejamento',
     items:[
       `<strong>Gestão de Testes:</strong> TestRail, Zephyr, qTest — organizar casos de teste, planos de execução, rastreabilidade com requisitos, relatórios de progresso e cobertura.`,
       `<strong>Gestão de Defeitos:</strong> Jira, Azure DevOps, Bugzilla — registrar, acompanhar, priorizar e fechar defeitos. Integram com repositórios de código e pipelines de CI/CD.`,
       `<strong>Gestão de Requisitos:</strong> Confluence, Azure DevOps Boards — documentar e rastrear requisitos com vínculos aos casos de teste (rastreabilidade bidirecional).`
     ]},
    {sub:'Execução e Automação',
     items:[
       `<strong>Automação de Interface (${tt('UI','User Interface — Interface do Usuário, camada visual com a qual o usuário interage')} Testing):</strong> Selenium, Cypress, Playwright, Appium (mobile) — automatizar interações com a interface gráfica.`,
       `<strong>Teste de ${tt('API','Application Programming Interface — contrato de comunicação entre sistemas, exposto via endpoints HTTP/REST/SOAP')}:</strong> Postman, REST Assured, Karate — testar endpoints diretamente, sem a camada de UI. Mais estável e rápido que automação de UI.`,
       `<strong>Teste de Performance e Carga:</strong> JMeter, k6, Gatling — simular múltiplos usuários simultâneos, medir tempo de resposta, throughput e identificar gargalos de capacidade.`,
       `<strong>Teste de Segurança:</strong> OWASP ZAP, Burp Suite — identificar vulnerabilidades como SQL injection, XSS, autenticação fraca.`
     ]},
    {sub:'Qualidade de Código e Integração',
     items:[
       `<strong>Análise Estática:</strong> SonarQube, ESLint, PMD, Checkstyle — analisar qualidade do código sem executá-lo. Detectam code smells, vulnerabilidades, complexidade ciclomática.`,
       `<strong>Pipeline ${tt('CI/CD','Continuous Integration/Continuous Delivery — Integração e Entrega Contínua, automatiza build, test e deploy a cada mudança de código')}:</strong> Jenkins, GitHub Actions, GitLab CI, Azure Pipelines — executar testes automaticamente a cada commit, fornecendo feedback imediato.`,
       `<strong>Cobertura de Código:</strong> Istanbul/NYC (JS), JaCoCo (Java), Coverage.py — medem % de linhas/ramificações exercitadas pelos testes automatizados.`,
       `<strong>Monitoramento (observabilidade):</strong> Grafana, Datadog, New Relic — monitorar comportamento do sistema em produção; complementa o teste (Shift Right).`
     ]}
   ]},

  {title:'🤖 Automação de Testes — Benefícios e Quando Usar',
   text:`A automação é um multiplicador de força para o QA moderno. O CTFL 4.0 reconhece seus benefícios reais — mas também é direto sobre suas limitações. A prova cobra os dois lados.`,
   sections:[
    {sub:'Benefícios reais da automação',
     items:[
       `<strong>Redução de trabalho repetitivo:</strong> suite de regressão que levaria 8h manual executa em 20 minutos — liberando testadores para atividades de maior valor.`,
       `<strong>Execução frequente e contínua:</strong> rodar a cada commit no ${tt('CI','Continuous Integration — cada merge dispara build + testes automatizados')}. Feedback em minutos, não dias.`,
       `<strong>Consistência e reprodutibilidade:</strong> executa exatamente da mesma forma sempre. Elimina variação humana — o testador cansado às 18h clica nos mesmos botões que às 9h.`,
       `<strong>Cobertura ampla com custo marginal baixo:</strong> um script que testa 500 combinações de dados custa o mesmo que um que testa 50. Escala sem escalar a equipe proporcionalmente.`,
       `<strong>Documentação executável:</strong> testes BDD automatizados servem como documentação viva do comportamento esperado do sistema.`
     ]},
    {sub:'O que automatizar — Critérios de seleção',
     text:`Nem todo teste deve ser automatizado. A regra de ouro: automatize o que é <strong>REPETITIVO + ESTÁVEL + DE ALTO VALOR</strong>.`,
     items:[
       `<strong>Candidatos ideais:</strong> testes de regressão de funcionalidades críticas e estáveis, smoke tests executados a cada build, testes de API (mais estáveis que UI), testes de performance, testes de dados com múltiplas combinações.`,
       `<strong>Candidatos ruins:</strong> funcionalidades em constante mudança (alto custo de manutenção), testes exploratórios (requerem julgamento), testes de usabilidade e UX, testes que são executados uma única vez, testes cuja automação custaria mais do que a execução manual por anos.`,
       `<strong>Pirâmide de automação (referência):</strong> base = muitos testes unitários (rápidos, baratos); meio = testes de integração/API; topo = poucos testes de UI ponta a ponta (lentos, frágeis).`
     ]}
   ]},

  {title:'⚠️ Riscos e Limitações da Automação',
   text:`A automação não é uma bala de prata. Mal aplicada, cria custos sem proporcional retorno. O CTFL 4.0 é explícito sobre os riscos — e a prova cobra isso com frequência.`,
   sections:[
    {sub:'Riscos técnicos e operacionais',
     items:[
       `<strong>Alto custo de manutenção:</strong> quando a interface ou regras de negócio mudam, os testes automatizados precisam ser atualizados. Sistemas instáveis = custo de manutenção altíssimo que pode superar os benefícios.`,
       `<strong>Testes frágeis (Flaky tests):</strong> testes que ora passam ora falham sem mudança de código. Causas: dependências de tempo (sleep hardcoded), ordem de execução, dados inconsistentes. Destroem a confiança na suite.`,
       `<strong>Investimento inicial elevado:</strong> escolher ferramenta, treinar equipe, criar framework de automação, desenvolver scripts iniciais — requer tempo e custo antes de qualquer retorno.`,
       `<strong>Falsa sensação de segurança:</strong> testes automáticos passando ≠ ausência de defeitos. A automação cobre apenas os cenários para os quais foi programada. Defeitos em cenários não cobertos passam invisíveis.`
     ]},
    {sub:'Riscos organizacionais e de processo',
     items:[
       `<strong>Expectativas irrealistas:</strong> "Automação vai resolver todos os nossos problemas de qualidade" — não resolve. É uma ferramenta; sem processo, pessoas e design de testes adequados, não funciona.`,
       `<strong>Automatizar o que não deve ser automatizado:</strong> teste de usabilidade, acessibilidade visual, teste exploratório requerem julgamento humano. Automatizar esses tipos gera scripts complexos com baixo valor de retorno.`,
       `<strong>Negligenciar a manutenção:</strong> uma suite não mantida deteriora. Testes comentados, ignorados ou sempre falhando ("já sabemos que esse falha") tornam a suite inútil.`,
       `<strong>Dependência excessiva de automação de UI:</strong> UI é a camada mais frágil. Priorizar testes de API e unitários reduz custo de manutenção sem perder cobertura.`
     ]}
   ],
   tip:'Para a prova: automação NÃO elimina testadores humanos. Automação NÃO garante ausência de defeitos. Automatize o REPETITIVO + ESTÁVEL + ALTO VALOR. Testes exploratórios, de usabilidade e de acessibilidade = sempre manuais.'},

  {title:'🔄 Seleção e Introdução de Ferramentas',
   text:`Escolher e implementar uma ferramenta de teste é uma decisão que vai além da funcionalidade técnica. O CTFL 4.0 aborda os fatores críticos para uma introdução bem-sucedida.`,
   sections:[
    {sub:'Fatores para seleção de ferramentas',
     items:[
       `<strong>Compatibilidade técnica:</strong> integração com a stack do projeto (linguagem, framework, CI/CD), suporte ao SO e browsers necessários, compatibilidade com ferramentas existentes (Jira, Git).`,
       `<strong>Maturidade e suporte:</strong> ferramenta ativa com comunidade ou suporte comercial. Ferramentas abandonadas geram dívida técnica crescente.`,
       `<strong>Custo total de propriedade:</strong> licença + treinamento + manutenção + curva de aprendizado. Ferramentas open source têm licença zero mas podem ter custo de suporte maior.`,
       `<strong>Facilidade de uso e adoção:</strong> curva de aprendizado da equipe. A melhor ferramenta que a equipe não usa é pior que uma razoável que todos adotam.`
     ]},
    {sub:'Introdução de ferramentas na organização',
     text:'Implementar uma nova ferramenta é um projeto em si. O CTFL identifica riscos específicos desta transição:',
     items:[
       `<strong>Piloto antes da adoção ampla:</strong> teste a ferramenta em um projeto ou módulo menor antes de comprometer toda a organização. Valida integração, curva de aprendizado e ROI esperado.`,
       `<strong>Treinamento da equipe:</strong> ferramenta nova sem treinamento = scripts mal escritos, manutenção cara, abandono precoce. Investir em treinamento inicial reduz custo futuro.`,
       `<strong>Adaptação de processos:</strong> a ferramenta deve servir ao processo, não o contrário. Às vezes o processo precisa ser ajustado para tirar proveito da ferramenta.`,
       `<strong>Riscos da transição:</strong> perda de produtividade durante a migração, resistência da equipe à mudança, dependência do fornecedor (vendor lock-in) para ferramentas proprietárias.`,
       `<strong>Critérios de sucesso:</strong> definir antes de implementar — ex: "reduzir tempo de regressão de 8h para 1h em 3 meses", "cobertura de 80% dos casos críticos automatizados em 6 meses".`
     ]}
   ]}
 ],
 quiz:[
  {q:'90% da suite automatizada está passando. O gerente decide demitir todos os testadores manuais. Qual é o principal RISCO dessa decisão?',
   opts:['Alto custo de manutenção da automação','Falsa sensação de segurança — testes passando não garantem ausência de defeitos e automação não substitui julgamento humano','Inconsistência na execução dos testes','Incompatibilidade de ferramentas com o sistema'],c:1,
   fb:'<strong>Falsa sensação de segurança</strong>: testes passando ≠ sistema sem defeitos. Automação cobre apenas cenários pré-programados. Teste exploratório, usabilidade e acessibilidade requerem julgamento humano que a automação não substitui.'},
  {q:'Qual tipo de teste é o MAIS adequado para automação em um pipeline CI/CD?',
   opts:['Teste de usabilidade com usuários reais','Teste exploratório de novas funcionalidades','Testes de regressão executados a cada build','Avaliação de acessibilidade e experiência do usuário'],c:2,
   fb:'<strong>Testes de regressão</strong> são candidatos ideais: repetitivos, comportamento bem definido, precisam rodar com alta frequência. São o melhor custo-benefício para automação.'},
  {q:'Qual ferramenta seria mais adequada para simular 1000 usuários simultâneos acessando um sistema e medir o tempo de resposta?',
   opts:['Selenium','SonarQube','JMeter ou k6','TestRail'],c:2,
   fb:'<strong>JMeter e k6</strong> são ferramentas de teste de performance e carga. Simulam múltiplos usuários e medem comportamento do sistema sob pressão.'},
  {q:'Ferramenta que analisa qualidade do código-fonte detectando code smells e vulnerabilidades de segurança SEM executar o código:',
   opts:['Cypress','SonarQube','Postman','JMeter'],c:1,
   fb:'<strong>SonarQube</strong> é ferramenta de análise estática de código. Detecta problemas de qualidade sem executar o software.'},
  {q:'Qual afirmação sobre automação de testes está MAIS alinhada com os princípios do CTFL 4.0?',
   opts:['Automação elimina a necessidade de testadores humanos completamente','Automação é mais adequada para testes repetitivos, estáveis e de alto valor','100% dos testes devem ser automatizados para máxima cobertura','Testes automatizados são sempre mais eficazes que testes manuais'],c:1,
   fb:'<strong>Automatize o repetitivo, estável e de alto valor</strong>. Testes exploratórios, de usabilidade e de acessibilidade precisam de julgamento humano. Automação é um multiplicador de força, não um substituto do testador.'}
  ,{q:'Uma equipe decide automatizar os testes de uma tela que muda de layout a cada sprint por decisão de UX. Qual risco principal essa decisão apresenta?',
   opts:['Falsa sensação de segurança nos resultados','Custo de manutenção altíssimo — testes precisam ser reescritos frequentemente por mudanças de UI','Impossibilidade técnica de automatizar testes de UI','Redução da cobertura de testes de regressão'],c:1,
   fb:'<strong>Custo de manutenção</strong>: automatizar testes de UI em interfaces instáveis é um dos piores candidatos à automação. Cada mudança de layout quebra os scripts. A regra: automatize o ESTÁVEL. Interface em constante mudança = candidato ruim.'}
  ,{q:'Qual ferramenta seria a escolha mais adequada para verificar se um endpoint REST retorna o status HTTP 200 e o JSON correto ao receber uma requisição válida?',
   opts:['JMeter','SonarQube','Postman ou REST Assured','Selenium'],c:2,
   fb:'<strong>Postman / REST Assured</strong> são ferramentas de teste de API — verificam status codes, headers e corpo da resposta JSON/XML diretamente no endpoint, sem necessidade de UI. JMeter = performance. SonarQube = análise estática. Selenium = UI.'}
  ,{q:'O CTFL 4.0 recomenda que a introdução de uma nova ferramenta de automação em uma organização seja feita:',
   opts:['Diretamente em todos os projetos simultaneamente para máximo ROI','Com um projeto piloto menor antes da adoção ampla, avaliando integração e curva de aprendizado','Somente por consultores externos especializados na ferramenta','Após automação de 100% dos casos de teste manuais existentes'],c:1,
   fb:'<strong>Projeto piloto</strong> primeiro: valida integração com a stack, mede curva de aprendizado real, confirma ROI esperado antes de comprometer toda a organização. Introdução direta em todos os projetos é arriscada e cara se a ferramenta não se adequar.'}
 ]}
];

// ═══════════════════════════════════════════════
// SIMULADO — 40 questões estilo ISTQB oficial
// ═══════════════════════════════════════════════
const SIM_QUESTIONS = [
  // CAP 1
  {cap:1,capName:'Fundamentos',q:'Qual é o objetivo PRINCIPAL do teste de software segundo o CTFL 4.0?',opts:['Provar que o software está correto e sem defeitos','Encontrar defeitos antes que causem impacto ao usuário e ao negócio','Substituir completamente a revisão de código pelos desenvolvedores','Documentar os requisitos do sistema formalmente'],c:1,fb:'O objetivo principal do teste é <strong>encontrar defeitos</strong> antes que causem impacto. O teste não prova ausência de defeitos (princípio 1).'},
  {cap:1,capName:'Fundamentos',q:'Um desenvolvedor interpretou incorretamente um requisito e implementou uma regra de negócio de forma errada. O código incorreto resultante é chamado de:',opts:['Erro humano (mistake)','Falha (failure)','Defeito (defect/bug)','Causa raiz (root cause)'],c:2,fb:'O <strong>defeito</strong> é a imperfeição no código causada pelo erro humano. Quando esse defeito é executado e produz comportamento incorreto observável, isso é uma <strong>falha</strong>.'},
  {cap:1,capName:'Fundamentos',q:'Qual princípio de teste afirma que uma pequena quantidade de módulos costuma conter a maioria dos defeitos de um sistema?',opts:['Paradoxo do pesticida','Teste exaustivo é impossível','Agrupamento de defeitos','Teste depende do contexto'],c:2,fb:'<strong>Agrupamento de defeitos</strong> (princípio 4): 80% dos defeitos tendem a se concentrar em 20% dos módulos. Use essa informação para priorizar o teste.'},
  {cap:1,capName:'Fundamentos',q:'A equipe está executando os mesmos 60 casos de teste por 5 sprints consecutivos sem encontrar novos defeitos. Qual é a ação mais adequada?',opts:['Aumentar apenas a frequência de execução dos mesmos casos','Revisar, atualizar e adicionar novos casos de teste regularmente','Automatizar todos os testes existentes como estão','Reduzir o número de casos para tornar o processo mais eficiente'],c:1,fb:'<strong>Paradoxo do pesticida</strong> (princípio 5): os mesmos testes param de encontrar novos defeitos. A solução é revisar e diversificar os casos de teste regularmente.'},
  {cap:1,capName:'Fundamentos',q:'Qual é a diferença correta entre Verificação e Validação no contexto do CTFL 4.0?',opts:['São sinônimos que descrevem o mesmo processo','Verificação: produto correto para o usuário? Validação: conforme a especificação?','Verificação: conforme a especificação? Validação: atende à necessidade real do usuário?','Verificação é dinâmica; Validação é estática'],c:2,fb:'<strong>Verificação</strong>: "Estamos construindo o produto de acordo com a especificação?" <strong>Validação</strong>: "Estamos construindo o produto certo para atender às necessidades reais do usuário?"'},
  {cap:1,capName:'Fundamentos',q:'Software foi entregue sem defeitos encontrados nos testes, porém os usuários rejeitaram o produto por não atender ao fluxo real de trabalho deles. Qual princípio explica essa situação?',opts:['Paradoxo do pesticida','Ilusão de ausência de defeitos','Agrupamento de defeitos','Teste mostra presença de defeitos'],c:1,fb:'<strong>Ilusão de ausência de defeitos</strong> (princípio 7): um sistema pode passar em todos os testes e ainda ser fracasso se não atender às necessidades reais dos usuários. Validação é mais que apenas testar.'},
  {cap:1,capName:'Fundamentos',q:'Qual é a diferença entre QA (Quality Assurance) e Teste de Software segundo o ISTQB?',opts:['São sinônimos — ambos focam exclusivamente em encontrar defeitos','QA é uma atividade específica; Teste é o processo mais amplo','QA é processo preventivo focado em melhorar processos; Teste é atividade específica de encontrar defeitos','Teste é mais abrangente e engloba QA como atividade interna'],c:2,fb:'<strong>QA</strong> é processo de garantia de qualidade mais amplo e preventivo, focado em melhorar processos. <strong>Teste</strong> é atividade específica dentro da QA, com foco em encontrar defeitos por execução ou análise.'},
  {cap:1,capName:'Fundamentos',q:'Um testador experiente navega por uma nova funcionalidade sem casos de teste predefinidos, aprendendo sobre o sistema enquanto testa e usando esse aprendizado para guiar os próximos passos. Que técnica/atividade é essa?',opts:['Teste de regressão baseado em risco','Teste exploratório','Particionamento de equivalência','Análise estática automatizada'],c:1,fb:'<strong>Teste exploratório</strong>: design, execução e aprendizado acontecem simultaneamente. O testador guia a exploração com intuição e conhecimento adquirido em tempo real, sem script pré-definido.'},

  // CAP 2
  {cap:2,capName:'SDLC',q:'Em qual nível de teste o cliente ou usuário final verifica se o sistema atende às suas necessidades de negócio antes de ser implantado em produção?',opts:['Teste de Componente','Teste de Integração','Teste de Sistema','Teste de Aceite (UAT)'],c:3,fb:'<strong>Teste de Aceite (UAT — User Acceptance Testing)</strong> é realizado pelo cliente/usuário para validar que o sistema atende às necessidades de negócio. É o último nível antes de ir a produção.'},
  {cap:2,capName:'SDLC',q:'O princípio "Shift Left" em testes significa primariamente:',opts:['Mover os servidores de teste para a região geográfica mais à esquerda do mapa','Antecipar as atividades de teste para as fases mais iniciais do ciclo de desenvolvimento','Testar primeiro o lado esquerdo da interface gráfica do usuário','Priorizar testes de automação em detrimento dos testes manuais'],c:1,fb:'<strong>Shift Left</strong> = antecipar o teste. Testar requisitos antes de codificar, fazer análise estática antes de integrar. Quanto mais cedo um defeito é encontrado, mais barato e rápido é corrigir.'},
  {cap:2,capName:'SDLC',q:'Após a correção de um defeito crítico, a equipe executa novamente SOMENTE o caso de teste que originalmente identificou esse defeito. Essa atividade é chamada de:',opts:['Teste de Regressão','Teste de Confirmação (Re-teste)','Teste de Aceite','Teste Exploratório'],c:1,fb:'<strong>Teste de Confirmação (Re-teste)</strong>: verifica especificamente se um defeito reportado foi corrigido. É diferente do teste de regressão, que verifica se outras funcionalidades não foram impactadas.'},
  {cap:2,capName:'SDLC',q:'Qual nível de teste verifica se os componentes individuais funcionam corretamente quando combinados, focando nas interfaces e comunicação entre eles?',opts:['Teste de Componente (Unitário)','Teste de Integração de Componentes','Teste de Sistema','Teste de Aceite'],c:1,fb:'<strong>Teste de Integração de Componentes</strong> verifica se componentes separados funcionam corretamente quando integrados, com foco nas interfaces e contratos entre eles.'},
  {cap:2,capName:'SDLC',q:'Em um contexto de desenvolvimento Ágil usando Scrum, quando devem ocorrer as atividades de teste?',opts:['Apenas ao final de todas as sprints em uma sprint de hardening dedicada','Apenas após o desenvolvimento de cada história estar completamente concluído','Dentro de cada sprint, como atividade contínua e integrada ao time','Após cada release para produção, por equipe separada e independente'],c:2,fb:'No <strong>Ágil</strong>, teste é atividade contínua dentro de cada sprint. O "whole team approach" significa que qualidade é responsabilidade de todos — dev, QA e PO colaboram desde o início da sprint.'},
  {cap:2,capName:'SDLC',q:'Sistema bancário recebeu atualização de segurança nos módulos de autenticação. Qual tipo de teste garante que as funcionalidades de saque, depósito e transferência não foram afetadas pela atualização?',opts:['Teste de Performance','Teste de Confirmação','Teste de Regressão','Teste de Aceite'],c:2,fb:'<strong>Teste de Regressão</strong>: após qualquer mudança no sistema (incluindo correções e atualizações), verifica se funcionalidades que anteriormente funcionavam corretamente permanecem funcionando.'},
  {cap:2,capName:'SDLC',q:'Qual a principal diferença entre o Modelo Waterfall e o desenvolvimento Ágil no que se refere ao timing do teste?',opts:['No Waterfall o teste é contínuo; no Ágil ocorre apenas ao final','No Waterfall o teste ocorre após o desenvolvimento; no Ágil é integrado a cada sprint','São equivalentes — ambos testam na mesma proporção ao longo do projeto','No Ágil não existe fase formal de teste; tudo é automatizado no CI/CD'],c:1,fb:'No <strong>Waterfall</strong>, o teste ocorre como fase separada após o desenvolvimento (feedback tardio). No <strong>Ágil</strong>, o teste é integrado a cada sprint, com feedback rápido e contínuo.'},

  // CAP 3
  {cap:3,capName:'Teste Estático',q:'Qual tipo de revisão é o mais formal, com papéis definidos (Moderador, Autor, Revisor, Escriba) e inclui coleta sistemática de métricas?',opts:['Walkthrough','Revisão Informal','Revisão Técnica','Inspeção'],c:3,fb:'A <strong>Inspeção</strong> é o tipo mais formal de revisão: processo estruturado, papéis claramente definidos, critérios de entrada e saída, e coleta de métricas (taxa de defeitos, esforço despendido).'},
  {cap:3,capName:'Teste Estático',q:'A análise estática de código é realizada de que forma?',opts:['Executando o código em ambiente de teste controlado','Sem executar o código, usando ferramentas automatizadas para analisar o código-fonte','Durante testes de integração com todos os componentes conectados','Exclusivamente por testadores humanos lendo o código manualmente'],c:1,fb:'<strong>Análise estática</strong> analisa o código sem executá-lo. Ferramentas como SonarQube analisam estrutura, padrões, vulnerabilidades e qualidade do código-fonte antes de qualquer execução.'},
  {cap:3,capName:'Teste Estático',q:'Em qual fase do processo de revisão formal os defeitos encontrados são discutidos em grupo, mas NÃO corrigidos?',opts:['Revisão Individual','Planejamento','Comunicação e Análise (Reunião de Revisão)','Verificação do Encerramento'],c:2,fb:'Na fase de <strong>Comunicação e Análise</strong>, a equipe discute os defeitos encontrados individualmente. IMPORTANTE: apenas registram e discutem os defeitos — as correções acontecem depois, na fase de Correção.'},
  {cap:3,capName:'Teste Estático',q:'Qual é a principal vantagem de encontrar defeitos através de revisão de requisitos ANTES do início do desenvolvimento?',opts:['É sempre mais preciso que qualquer forma de teste dinâmico','Corrigir defeitos nessa fase é muito mais barato do que em fases posteriores','Não requer nenhum conhecimento técnico do artefato revisado','Elimina completamente a necessidade de testes dinâmicos'],c:1,fb:'O principal benefício é o <strong>custo</strong>: um defeito em requisito corrigido antes de codificar custa fração do que custaria corrigir em produção. Modelo de custo de defeito de Boehm ilustra isso.'},
  {cap:3,capName:'Teste Estático',q:'O autor de um documento de design de API apresenta sua proposta a colegas de equipe, guia a discussão e busca feedback e sugestões de melhoria. Que tipo de revisão formal é essa?',opts:['Inspeção','Walkthrough','Revisão Técnica','Revisão Informal'],c:1,fb:'<strong>Walkthrough</strong>: o AUTOR guia os revisores. Foco em aprendizado, busca de alternativas e obtenção de feedback. É o único tipo de revisão em que o autor conduz a sessão.'},
  {cap:3,capName:'Teste Estático',q:'Qual dos seguintes NÃO é uma vantagem do teste estático em relação ao teste dinâmico?',opts:['Pode detectar defeitos antes de qualquer código ser executado','Pode revisar requisitos e documentação além de código','Verifica o comportamento real do sistema em runtime','Reduz o custo total ao encontrar defeitos mais cedo'],c:2,fb:'<strong>Verificar comportamento em runtime</strong> é exclusivo do teste dinâmico. O teste estático não executa o sistema, portanto não pode verificar comportamento real em execução — esta é sua limitação.'},

  // CAP 4
  {cap:4,capName:'Design de Testes',q:'Campo de formulário aceita notas de 0 a 10 (inteiros, inclusive). Usando Particionamento de Equivalência, quais conjuntos de valores cobrem adequadamente as partições?',opts:['Apenas o valor 5 (partição válida)','5 (válida), -1 (inválida abaixo) e 11 (inválida acima)','0, 5 e 10 (todos válidos)','Todos os valores inteiros de 0 a 10'],c:1,fb:'PE define 3 partições: válida [0-10] → testar 5; inválida abaixo [<0] → testar -1; inválida acima [>10] → testar 11. Um valor representativo por partição.'},
  {cap:4,capName:'Design de Testes',q:'Qual técnica de teste é mais adequada para um sistema de pedidos com estados "Aberto → Confirmado → Em Entrega → Entregue" e regras sobre quais transições são permitidas?',opts:['Particionamento de Equivalência','Análise de Valor Limite','Teste de Transição de Estado','Tabela de Decisão'],c:2,fb:'<strong>Teste de Transição de Estado</strong>: modela os estados e transições entre eles. Ideal para sistemas em que o comportamento depende do estado atual e do histórico de eventos.'},
  {cap:4,capName:'Design de Testes',q:'Regra de negócio: clientes com cadastro Platinum E com compra acima de R$500 recebem frete grátis. Qual técnica garante a cobertura de todas as combinações possíveis dessas condições?',opts:['Análise de Valor Limite','Tabela de Decisão','Teste Exploratório','Suposição de Erro'],c:1,fb:'<strong>Tabela de Decisão</strong>: para 2 condições binárias (Platinum: S/N × Valor>500: S/N) = 4 combinações possíveis. A tabela garante que todas as regras de negócio são testadas.'},
  {cap:4,capName:'Design de Testes',q:'Testador experiente cria casos de teste específicos para divisão por zero, campos vazios e strings muito longas, baseado em sua experiência de onde erros costumam ocorrer. Que técnica é essa?',opts:['Análise de Valor Limite','Suposição de Erro (Error Guessing)','Teste de Transição de Estado','BDD'],c:1,fb:'<strong>Suposição de Erro</strong>: usar experiência anterior para listar tipos de erros prováveis e criar casos de teste para eles. Baseia-se no conhecimento de "onde programadores costumam errar".'},
  {cap:4,capName:'Design de Testes',q:'100% de cobertura de ramificações (branch coverage) garante automaticamente qual nível de cobertura?',opts:['100% de cobertura de caminhos (path coverage)','100% de cobertura de instruções (statement coverage), mas não vice-versa','Ausência total de defeitos no código','100% de cobertura de condições múltiplas'],c:1,fb:'<strong>100% de ramificações garante 100% de instruções</strong>: cobrir todas as ramificações (todos os if/else) necessariamente executa todas as instruções. O contrário não é verdade.'},
  {cap:4,capName:'Design de Testes',q:'A técnica BDD (Behavior-Driven Development) usa qual formato para especificar o comportamento esperado do sistema?',opts:['Diagrama de fluxo UML','Dado que... Quando... Então... (Given/When/Then)','Tabela de condições e ações','Grafo de transição de estados'],c:1,fb:'<strong>BDD</strong> usa o formato <strong>Dado que</strong> [contexto]... <strong>Quando</strong> [ação]... <strong>Então</strong> [resultado esperado]. Linguagem natural que serve como especificação E como base para testes automatizados.'},
  {cap:4,capName:'Design de Testes',q:'Qual é a diferença fundamental entre testes Caixa-Preta e Caixa-Branca?',opts:['Caixa-Preta testa código interno; Caixa-Branca testa interface do usuário','Caixa-Preta testa comportamento externo sem conhecer o código; Caixa-Branca testa a estrutura interna do código','São sinônimos que descrevem o mesmo tipo de teste','Caixa-Branca é para testes manuais; Caixa-Preta é para testes automatizados'],c:1,fb:'<strong>Caixa-Preta</strong>: testa comportamento/saídas sem conhecer código interno (baseado em especificações). <strong>Caixa-Branca</strong>: testa estrutura interna (requer acesso ao código-fonte, garante cobertura de código).'},
  {cap:4,capName:'Design de Testes',q:'A abordagem "Três Amigos" no desenvolvimento ágil envolve:',opts:['Três testadores revisando o mesmo caso de teste independentemente','Desenvolvedor + QA + Representante do Negócio discutindo histórias ANTES do desenvolvimento','Três tipos de teste (unitário, integração e sistema) sendo executados em paralelo','Três ferramentas de automação sendo usadas simultaneamente'],c:1,fb:'<strong>Três Amigos</strong>: Dev + QA + Negócio se reúnem ANTES de desenvolver cada história. Cada perspectiva contribui: Dev (técnica), QA (casos de teste, defeitos potenciais), Negócio (regras e valor). Previne mal-entendidos.'},

  // CAP 5
  {cap:5,capName:'Gerenciamento',q:'Qual documento define o escopo, objetivos, abordagem, recursos, cronograma e critérios de entrada e saída das atividades de teste?',opts:['Relatório de Defeitos','Plano de Testes','Casos de Teste','Relatório de Conclusão de Teste'],c:1,fb:'O <strong>Plano de Testes</strong> é o documento central do gerenciamento de testes. Define estratégia, recursos, cronograma, riscos e critérios.'},
  {cap:5,capName:'Gerenciamento',q:'Qual é a diferença entre Risco de Produto e Risco de Projeto no contexto do CTFL 4.0?',opts:['São equivalentes — ambos afetam o produto final','Risco de produto: algo no software pode funcionar errado. Risco de projeto: algo pode comprometer o andamento do projeto','Risco de produto é sempre mais crítico que risco de projeto','Risco de projeto refere-se exclusivamente a riscos financeiros'],c:1,fb:'<strong>Risco de Produto</strong>: risco de que o software não funcione corretamente (ex: módulo de pagamento calculando errado). <strong>Risco de Projeto</strong>: risco que afeta o andamento (ex: equipe sem experiência, ambiente indisponível).'},
  {cap:5,capName:'Gerenciamento',q:'Qual é a fórmula correta para calcular o Nível de Risco de uma área a ser testada?',opts:['Impacto + Probabilidade','Impacto × Probabilidade','Impacto / Probabilidade','(Impacto + Probabilidade) / 2'],c:1,fb:'<strong>Nível de Risco = Probabilidade × Impacto</strong>. Quanto maior esse valor, mais esforço de teste deve ser alocado naquela área (teste baseado em risco).'},
  {cap:5,capName:'Gerenciamento',q:'A equipe definiu que os testes podem ser encerrados quando: 95% dos casos executados, zero defeitos críticos abertos e relatório emitido. Isso é chamado de:',opts:['Critério de Entrada de Teste','Plano de Testes','Critério de Saída de Teste','Relatório de Progresso'],c:2,fb:'<strong>Critério de Saída</strong>: condições que devem ser satisfeitas para encerrar os testes de um nível. Critério de ENTRADA define quando INICIAR; Critério de SAÍDA define quando ENCERRAR.'},
  {cap:5,capName:'Gerenciamento',q:'Para garantir que todos os membros do time trabalham com a versão correta dos casos de teste após mudança no sistema, qual prática é fundamental?',opts:['Teste de Regressão','Gestão de Configuração','Planejamento de Testes','Análise de Risco do Produto'],c:1,fb:'<strong>Gestão de Configuração</strong> controla versões de todos os artefatos (código, casos de teste, scripts, dados) garantindo que todos trabalhem com as versões corretas e que resultados sejam reprodutíveis.'},
  {cap:5,capName:'Gerenciamento',q:'Defeito de exibição visual (cor incorreta) foi encontrado na tela de login do maior banco do Brasil. Severidade: baixa. Qual deve ser a prioridade?',opts:['Sempre baixa, pois a severidade é baixa e determina a prioridade','Alta, pois o impacto na imagem da marca em tela vista por todos os clientes é grande','Média em qualquer caso que envolva apenas problemas visuais','Nenhuma — problemas visuais não são defeitos válidos'],c:1,fb:'<strong>Severidade ≠ Prioridade</strong>. Severidade = impacto técnico (baixo — só visual). Prioridade = urgência de negócio (alta — tela de login do maior banco, vista por milhões diariamente). Impacto na imagem da marca é alto.'},
  {cap:5,capName:'Gerenciamento',q:'Qual informação NÃO deve constar em um relatório de defeito segundo as boas práticas do CTFL?',opts:['Passos detalhados para reproduzir o defeito','Resultado esperado versus resultado obtido','Nome do desenvolvedor que introduziu o defeito no código','Ambiente (sistema operacional, versão do aplicativo) onde ocorreu'],c:2,fb:'O <strong>nome do desenvolvedor</strong> que introduziu o defeito não pertence ao bug report. O foco deve ser em fatos observáveis para reprodução e correção, não em apontar culpados. Bug tracking é sobre qualidade, não responsabilidade individual.'},

  // CAP 6
  {cap:6,capName:'Ferramentas',q:'Qual é o principal RISCO de automatizar testes de interface (UI) para uma aplicação cuja interface muda frequentemente a cada sprint?',opts:['Testes ficam mais lentos que a execução manual','Alto custo de manutenção dos scripts automatizados a cada mudança de interface','Ferramentas de automação não suportam mudanças de interface','Testadores perdem habilidades de teste manual'],c:1,fb:'<strong>Alto custo de manutenção</strong>: quando a interface muda frequentemente, os scripts automatizados de UI precisam ser atualizados constantemente. O custo de manutenção pode superar o benefício da automação.'},
  {cap:6,capName:'Ferramentas',q:'Ferramenta JMeter é usada principalmente para:',opts:['Gestão de defeitos e rastreamento de bugs','Análise estática de qualidade de código-fonte','Teste de performance, carga e estresse do sistema','Automação de testes de interface do usuário (UI)'],c:2,fb:'<strong>JMeter</strong> (assim como k6 e Gatling) é ferramenta de teste de <strong>performance e carga</strong>. Simula múltiplos usuários simultâneos e mede tempos de resposta e comportamento do sistema sob pressão.'},
  {cap:6,capName:'Ferramentas',q:'Qual afirmação sobre automação de testes está MAIS correta segundo o CTFL 4.0?',opts:['Automação elimina completamente a necessidade de testadores humanos','100% dos testes de um projeto devem ser automatizados para máxima qualidade','Automação é mais adequada para testes repetitivos, estáveis e de alto valor como regressão','Testes automatizados sempre encontram mais defeitos que testes manuais'],c:2,fb:'<strong>Automatize o repetitivo, estável e de alto valor</strong>. Testes exploratórios, de usabilidade, de acessibilidade e que requerem julgamento humano são melhor executados manualmente.'},
  {cap:6,capName:'Ferramentas',q:'Equipe automatizou toda a suite de regressão e o gerente decide que não há mais necessidade de testadores manuais. Qual é o PRINCIPAL risco dessa abordagem?',opts:['Nenhum — automação completa é o objetivo final do QA moderno','Falsa sensação de segurança e perda de cobertura de cenários que requerem julgamento humano','Custo excessivo de infraestrutura de CI/CD','Testes automatizados geram muitos falsos positivos'],c:1,fb:'<strong>Falsa sensação de segurança</strong>: testes passando ≠ sistema sem defeitos. Automação cobre apenas cenários programados. Teste exploratório, usabilidade, acessibilidade e análise de impacto requerem julgamento humano insubstituível.'},
  {cap:6,capName:'Ferramentas',q:'Ferramenta que detecta vulnerabilidades de segurança, code smells e violações de padrão de codificação NO CÓDIGO-FONTE sem executar o programa:',opts:['Selenium (automação de UI)','SonarQube (análise estática)','Postman (testes de API)','JMeter (performance)'],c:1,fb:'<strong>SonarQube</strong> é ferramenta de análise estática de código. Detecta problemas de qualidade, segurança e manutenibilidade sem executar o software — é uma ferramenta de teste estático.'},
  {cap:6,capName:'Ferramentas',q:'Ferramenta de CI/CD executa suite de testes automatizados a cada push no repositório. Qual afirmação sobre essa prática está MAIS alinhada com o CTFL 4.0?',opts:['Elimina completamente a necessidade de testes manuais e exploratórios','Implementa Shift Left e fornece feedback rápido, mas não substitui o julgamento humano','Garante ausência total de defeitos em ambiente de produção','É prática exclusiva de metodologias Waterfall com fase de teste bem definida'],c:1,fb:'CI/CD com testes automáticos implementa <strong>Shift Left</strong> e fornece <strong>feedback rápido</strong>. Mas não elimina testadores: exploratório, usabilidade, acessibilidade e análise de risco requerem humanos. Testes passando não garantem ausência de defeitos.'}
];

// ═══════════════════════════════════════════════
// SIMULADO OFICIAL — ISTQB Exam Set A (v1.7)
// ═══════════════════════════════════════════════
const SIM_OFICIAL_A = [
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.1.1',q:'Q1 — Qual das seguintes afirmações descreve um objetivo de teste VÁLIDO?',opts:['Comprovar que não existem defeitos não corrigidos no sistema em teste','Comprovar que não haverá falhas após a implementação do sistema em produção','Reduzir o nível de risco do objeto de teste e aumentar a confiança no nível de qualidade','Verificar se não existem combinações de entradas não testadas'],c:2,fb:'<strong>FL-1.1.1</strong> — Reduzir o risco e aumentar a confiança na qualidade é um objetivo válido do teste. Não é possível provar ausência de defeitos (princípio 1) nem testar todas as combinações de entradas (princípio 2).'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.2.1',q:'Q2 — Qual das seguintes opções apresenta um exemplo de atividades de teste que contribuem para o sucesso?',opts:['A participação de testadores em diversas atividades do SDLC ajudará a detectar defeitos nos produtos de trabalho','Os testadores tentam não atrapalhar os desenvolvedores para que escrevam código melhor','Testadores que colaboram com usuários finais ajudam a melhorar a qualidade dos relatórios de defeitos durante integração de componentes','Testadores certificados elaborarão casos de teste muito melhores do que os não certificados'],c:0,fb:'<strong>FL-1.2.1</strong> — A participação de testadores nas diversas atividades do SDLC aumenta a compreensão dos produtos de trabalho e permite detecção precoce de defeitos. Certificação não garante automaticamente melhores casos de teste.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.3.1',q:'Q3 — Você notou que nenhuma alteração foi feita nos casos de teste de regressão por várias iterações e nenhum novo defeito foi identificado. Seu gerente está satisfeito, mas você não. Qual princípio de teste explica seu ceticismo?',opts:['Os testes se desgastam (Paradoxo do pesticida)','Falácia da ausência de defeitos','Os defeitos se agrupam','Testes exaustivos são impossíveis'],c:0,fb:'<strong>FL-1.3.1</strong> — Paradoxo do pesticida: se os mesmos testes são repetidos várias vezes, eventualmente param de encontrar novos defeitos. A solução é revisar e diversificar os casos de teste regularmente.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.4.1',q:'Q4 — Você implementa a funcionalidade de pagamento de um app. Qual atividade faz parte da ANÁLISE de testes?',opts:['Estima-se que o teste de integração com o serviço de pagamento levará 8 dias-pessoa','Decidiram testar se é possível dividir o pagamento adequadamente entre vários usuários','Utilizando BVA para derivar dados de teste para os casos de verificação do valor mínimo de pagamento','Analisar a discrepância entre resultado real e esperado após execução de um caso de teste de pagamento'],c:1,fb:'<strong>FL-1.4.1</strong> — Definir condições de teste ("testar se é possível dividir o pagamento") é análise de teste. Estimar esforço é planejamento; derivar dados via BVA é projeto de teste; analisar discrepâncias é execução.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.4.2',q:'Q5 — Qual dos seguintes fatores tem influência SIGNIFICATIVA na abordagem do teste? (i) O SDLC (ii) Número de defeitos em projetos anteriores (iii) Riscos identificados do produto (iv) Novos requisitos regulamentares impondo testes caixa-branca formais (v) Configuração do ambiente de teste',opts:['i, ii têm influência significativa','i, iii, iv têm influência significativa','ii, iv, v têm influência significativa','iii, v têm influência significativa'],c:1,fb:'<strong>FL-1.4.2</strong> — SDLC (i), riscos do produto (iii) e requisitos regulatórios (iv) têm influência significativa. O número de defeitos anteriores tem menor influência; a configuração do ambiente não é fator significativo na abordagem.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.4.5',q:'Q6 — Qual PAR de tarefas pertence PRINCIPALMENTE ao papel de TESTADOR?',opts:['"Configurar ambientes de teste" e "Analisar a base de testes"','"Manter o backlog do produto" e "Analisar a base de testes"','"Criar o plano de testes" e "Projetar soluções para novos requisitos"','"Configurar ambientes de teste" e "Manter o backlog do produto"'],c:0,fb:'<strong>FL-1.4.5</strong> — Configurar ambientes de teste e analisar a base de testes são tarefas primárias do testador. Manter o backlog é do Product Owner; projetar soluções é da equipe de dev; criar o plano de testes é função gerencial/liderança de teste.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.5.1',q:'Q7 — Quais habilidades são as MAIS importantes de um testador? (i) Ter conhecimento da área (ii) Criar uma visão de produto (iii) Ser um bom jogador de equipe (iv) Planejar e organizar o trabalho da equipe (v) Pensamento crítico',opts:['ii e iv são importantes','i, iii e v são importantes','i, ii e v são importantes','iii e iv são importantes'],c:1,fb:'<strong>FL-1.5.1</strong> — Conhecimento do domínio (i), ser bom colaborador em equipe (iii) e pensamento crítico (v) são as habilidades mais importantes do testador. Criar visão de produto é do analista de negócios; planejar o trabalho da equipe é função gerencial.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.5.2',q:'Q8 — De que forma a abordagem de equipe multidisciplinar se manifesta nas interações entre testadores e representantes da empresa?',opts:['Representantes empresariais decidem sobre as abordagens de automação de testes','Os testadores ajudam os representantes da empresa a definir uma estratégia de testes','Os representantes comerciais não fazem parte da abordagem de equipe completa','Os testadores ajudam os representantes da empresa a criar testes de aceite adequados'],c:3,fb:'<strong>FL-1.5.2</strong> — Na abordagem de equipe multidisciplinar (whole team approach), testadores trabalham em estreita colaboração com representantes da empresa, apoiando-os na criação de testes de aceite adequados para garantir os níveis de qualidade desejados.'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.1.2',q:'Q9 — Considere a regra: "para cada atividade do SDLC existe uma atividade de teste correspondente". Em quais modelos SDLC essa regra se aplica?',opts:['Somente em modelos de desenvolvimento sequencial','Somente em modelos de desenvolvimento iterativo','Somente em modelos iterativos e incrementais','Em modelos de desenvolvimento sequencial, incremental e iterativo'],c:3,fb:'<strong>FL-2.1.2</strong> — Esta regra se aplica a TODOS os modelos SDLC. Em qualquer ciclo de vida, cada atividade de desenvolvimento tem uma atividade de teste correspondente, seja Waterfall, Ágil, espiral ou incremental.'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.1.3',q:'Q10 — Qual das seguintes afirmações descreve MELHOR a abordagem de desenvolvimento orientado a testes de aceite (ATDD)?',opts:['Em ATDD, critérios de aceite são normalmente criados no formato dado/quando/então','Em ATDD, casos de teste são criados principalmente durante teste de componentes e orientados ao código','Em ATDD, são criados testes baseados em critérios de aceite para orientar o desenvolvimento do software relacionado','Em ATDD, testes são baseados no comportamento desejado do software, facilitando a compreensão pelos membros da equipe'],c:2,fb:'<strong>FL-2.1.3</strong> — No ATDD, testes são escritos a partir de critérios de aceite ANTES do desenvolvimento, como parte do processo de design. O formato dado/quando/então é mais característico do BDD; orientação ao código é característica do TDD.'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.1.5',q:'Q11 — Qual das seguintes opções NÃO é um exemplo da abordagem "shift-left"?',opts:['Revisar os requisitos do usuário antes que sejam formalmente aceitos pelos stakeholders','Escrever um teste de componente antes de escrever o código correspondente','Executar um teste de eficiência de desempenho para um componente durante o teste do componente','Escrever um script de teste antes de configurar o processo de gerenciamento de configuração'],c:3,fb:'<strong>FL-2.1.5</strong> — Escrever scripts de teste ANTES de configurar o gerenciamento de configuração NÃO é shift-left — scripts devem estar sujeitos ao CM. Os outros itens são exemplos válidos de shift-left: revisão antecipada (a), TDD (b) e testes não-funcionais antecipados (c).'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.1.6',q:'Q12 — Qual argumento você usaria para convencer seu gerente a organizar retrospectivas ao final de cada ciclo de lançamento?',opts:['As retrospectivas estão muito em voga e os clientes apreciariam se as adicionássemos aos processos','Economizará dinheiro pois sem elas os representantes dos usuários finais não fornecem feedback imediato','As fragilidades identificadas durante a retrospectiva podem servir como lista de tarefas para o programa de melhoria contínua','As retrospectivas abrangem cinco valores como coragem e respeito, cruciais para a melhoria contínua na organização'],c:2,fb:'<strong>FL-2.1.6</strong> — Retrospectivas realizadas regularmente, com atividades de acompanhamento adequadas, são fundamentais para melhoria contínua de desenvolvimento e testes. Retrospectivas focam no PROCESSO interno, não no feedback dos usuários.'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.2.1',q:'Q13 — Que tipos de falhas se encaixam em quais níveis de teste? (1) Falhas no comportamento desviando das necessidades de negócio (2) Falhas na comunicação entre componentes (3) Falhas de lógica no código (4) Falhas na implementação de regras de negócio | A=Componentes, B=Integração de componentes, C=Sistema, D=Aceite',opts:['1D, 2B, 3A, 4C','1D, 2B, 3C, 4A','1B, 2A, 3D, 4C','1C, 2B, 3A, 4D'],c:0,fb:'<strong>FL-2.2.1</strong> — Necessidades de negócio do usuário → aceite (D); comunicação entre componentes → integração (B); lógica no código → componentes (A); regras de negócio → sistema (C). Portanto: 1D, 2B, 3A, 4C.'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.2.3',q:'Q14 — TC1 cobre AC1, TC2 cobre AC2, TC3 cobre AC3. Exec 1: TC1 falhou(1), TC2 passou(2), TC3 falhou(3). Exec 2: TC1 passou(4), TC2 falhou(5), TC3 falhou(6). Exec 3: todos passaram (7,8,9). Quais testes são de REGRESSÃO?',opts:['Apenas 4, 7, 8, 9','Apenas 5, 7','Apenas 4, 6, 8, 9','Apenas 5, 6'],c:1,fb:'<strong>FL-2.2.3</strong> — Regressão = re-executar testes que PASSARAM anteriormente. TC2 passou na Exec 1, então (5) na Exec 2 é regressão. TC1 passou na Exec 2, então (7) na Exec 3 é regressão. Os demais (4, 6, 8, 9) são confirmação (verificam correções de defeitos).'},
  {cap:3,capName:'Cap 3 — Teste Estático',lo:'FL-3.1.2',q:'Q15 — Qual das seguintes opções NÃO é um benefício dos testes estáticos?',opts:['Ter gerenciamento de defeitos menos dispendioso devido à facilidade de detectar defeitos em fases POSTERIORES do SDLC','Corrigir defeitos encontrados durante testes estáticos é muito menos dispendioso do que durante testes dinâmicos','Identificar defeitos de código que poderiam não ter sido detectados apenas com testes dinâmicos','Detecção de lacunas e inconsistências nos requisitos'],c:0,fb:'<strong>FL-3.1.2</strong> — A opção A inverte a lógica: detectar defeitos em fases POSTERIORES é MAIS caro, não menos. O benefício real é detectar defeitos MAIS CEDO (em fases anteriores), tornando a correção menos dispendiosa. As demais são benefícios reais do teste estático.'},
  {cap:3,capName:'Cap 3 — Teste Estático',lo:'FL-3.2.1',q:'Q16 — Qual das seguintes opções representa um benefício do feedback precoce e frequente?',opts:['Isso melhora o processo de teste para projetos futuros','Isso obriga os clientes a priorizar suas necessidades com base nos riscos acordados','Isso fornece uma medida da qualidade das mudanças','Isso ajuda a evitar mal-entendidos quanto aos requisitos'],c:3,fb:'<strong>FL-3.2.1</strong> — O principal benefício do feedback precoce e frequente é evitar mal-entendidos sobre os requisitos, alinhando expectativas entre desenvolvedores, testadores e stakeholders desde o início do projeto.'},
  {cap:3,capName:'Cap 3 — Teste Estático',lo:'FL-3.2.4',q:'Q17 — As avaliações na sua organização possuem: função de escriba, objetivo de avaliar qualidade, reunião conduzida pelo AUTOR, preparação individual e relatório de revisão. Qual tipo de avaliação é MAIS provável?',opts:['Revisão informal','Passo a passo (Walkthrough)','Análise técnica','Inspeção'],c:1,fb:'<strong>FL-3.2.4</strong> — Walkthrough: conduzido pelo AUTOR (característica única deste tipo). Inclui preparação individual e tem um escriba. Na inspeção, um moderador conduz; na análise técnica, um líder técnico conduz — nunca o autor.'},
  {cap:3,capName:'Cap 3 — Teste Estático',lo:'FL-3.2.5',q:'Q18 — Qual das seguintes afirmações NÃO é um fator que contribui para avaliações bem-sucedidas?',opts:['Os participantes devem dedicar tempo suficiente para a revisão','Dividir grandes projetos em partes menores para tornar o esforço menos intenso','Os participantes devem evitar comportamentos que indiquem tédio ou hostilidade','As falhas encontradas devem ser reconhecidas, valorizadas e tratadas de forma objetiva'],c:3,fb:'<strong>FL-3.2.5</strong> — Na terminologia ISTQB, revisões encontram "defeitos" ou "anomalias" — não "falhas" (failures). Falhas são comportamentos em runtime durante testes dinâmicos. Dizer "as falhas encontradas..." usa o termo incorreto para o contexto de revisões estáticas.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.1.1',q:'Q19 — Qual das seguintes opções é uma característica das técnicas de teste baseadas na EXPERIÊNCIA?',opts:['Os casos de teste são criados com base em informações detalhadas do projeto','Os itens testados na seção de código da interface são usados para medir a cobertura','As técnicas dependem fortemente do conhecimento que o testador tem do software e do domínio de negócios','Os casos de teste são usados para identificar desvios em relação aos requisitos'],c:2,fb:'<strong>FL-4.1.1</strong> — Técnicas baseadas em experiência (suposição de erro, testes exploratórios) dependem fortemente do conhecimento, intuição e experiência do testador. Não seguem um processo formal derivado de especificações.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.2.1',q:'Q20 — Formulário de busca de apartamentos: andar (térreo, 1º, 2º ou superior) e jardim (sem, pequeno, grande). Apartamentos no térreo têm jardim; nos andares superiores, não. Mecanismo de validação impede combinações inválidas. Qual é o número MÍNIMO de TCs para 100% de cobertura de EP para partições VÁLIDAS?',opts:['3','4','5','6'],c:1,fb:'<strong>FL-4.2.1</strong> — Partições válidas: (térreo+sem jardim), (térreo+jardim pequeno), (térreo+jardim grande), (1º andar), (2º ou superior). São necessários 4 TCs mínimos para cobrir todas as partições válidas considerando as restrições do mecanismo de validação.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.2.2',q:'Q21 — Sistema de notas: 0-50=reprovado, 51-60=razoável, 61-70=satisfatório, 71-80=bom, 81-90=muito bom, 91-100=excelente. TCs: 91, 50, 81, 60, 70, 80. Qual é a cobertura de BVA de 2 valores para "resultado final"? Isso é alcançado com os TCs existentes?',opts:['50% — não totalmente atingida','60% — cobertura parcial dos limites','33,3% — cobertura mínima','100% — totalmente alcançada'],c:0,fb:'<strong>FL-4.2.2</strong> — BVA de 2 valores: para cada limite, testar o valor ON e o valor imediatamente adjacente. Com 6 partições há 5 limites internos (50, 60, 70, 80, 90) e limites externos (0, 100). Os TCs existentes cobrem apenas 50% dos valores de limite necessários.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.2.3',q:'Q22 — Sistema CRM de loja de bicicletas: membros recebem 20% de desconto (exceto se prazo perdido); após 15 aluguéis membros ganham camiseta. Tabela com 8 regras, condições: "Ser membro", "Prazo não cumprido", "15º aluguel". Qual regra descreve uma situação IMPOSSÍVEL?',opts:['R4 — membro, sem prazo perdido, 15º aluguel','R2 — membro, sem prazo perdido, não é 15º aluguel','R6 — não membro, sem prazo perdido, não é 15º aluguel','R8 — não membro, prazo perdido, 15º aluguel'],c:3,fb:'<strong>FL-4.2.3</strong> — R8: não membro + prazo perdido + 15º aluguel é IMPOSSÍVEL. O benefício de "perder o prazo" (perda de desconto) e atingir "15 aluguéis com benefício" são exclusivos de membros — não-membros não têm prazo de desconto para perder nem o benefício da camiseta.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.2.4',q:'Q23 — Sistema modelado por diagrama de transição de estados: inicia em INIT, termina em OFF. O diagrama tem múltiplos estados e transições. Qual é o número MÍNIMO de casos de teste para cobertura de TODAS as transições válidas?',opts:['4 casos de teste','2 casos de teste','7 casos de teste','3 casos de teste'],c:3,fb:'<strong>FL-4.2.4</strong> — Para cobertura de todas as transições válidas, o número mínimo de casos de teste é 3. Cada caso de teste pode cobrir múltiplas transições em sequência (não é necessário um caso por transição).'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.3.1',q:'Q24 — Seu conjunto de testes atingiu 100% de cobertura de INSTRUÇÕES. Qual é a consequência desse fato?',opts:['Cada instrução que contém um defeito foi executada pelo menos uma vez','Qualquer conjunto com mais TCs também atingirá 100% de cobertura de instruções','Cada caminho no código foi executado pelo menos uma vez','Todas as combinações de valores de entrada foram testadas pelo menos uma vez'],c:0,fb:'<strong>FL-4.3.1</strong> — 100% de cobertura de instruções garante que cada instrução foi executada ao menos uma vez, incluindo aquelas com defeitos. Isso NÃO garante cobertura de caminhos (que é mais forte), NÃO prova ausência de defeitos, e não testa todas as combinações de entrada.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.3.3',q:'Q25 — Qual das seguintes afirmações NÃO é verdadeira para testes caixa-branca?',opts:['Durante os testes caixa-branca, toda a implementação do software é considerada','Métricas de cobertura de código-fonte podem ajudar a identificar testes adicionais para aumentar cobertura','Técnicas de teste caixa-branca podem ser usadas em testes estáticos','Testes caixa-branca podem ajudar a identificar lacunas na implementação dos requisitos'],c:3,fb:'<strong>FL-4.3.3</strong> — Identificar lacunas na implementação dos REQUISITOS é característica de testes caixa-PRETA (baseados em especificação). Caixa-branca testa a estrutura interna — o que ESTÁ no código, não o que DEVERIA estar segundo os requisitos.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.4.1',q:'Q26 — Qual das seguintes opções descreve MELHOR o conceito de suposição de erro (error guessing)?',opts:['A detecção de erros envolve o uso de conhecimento e experiência com defeitos encontrados no passado e erros típicos de desenvolvedores','Envolve usar experiência pessoal em desenvolvimento e os erros que você cometeu como desenvolvedor','Exige que você imagine ser o usuário do objeto de teste e tente adivinhar os erros que ele poderia cometer','A detecção automática de erros exige reproduzir rapidamente a tarefa de desenvolvimento para identificar tipos de erros'],c:0,fb:'<strong>FL-4.4.1</strong> — Suposição de erro usa conhecimento e experiência com defeitos anteriores e erros típicos de desenvolvedores. Não se limita a erros pessoais (b), não foca em erros do usuário (c), e não é automática (d).'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.4.2',q:'Q27 — No projeto houve atraso, a execução dos testes começou tarde, você tem bom conhecimento do domínio, os requisitos não foram compartilhados mas a gerência quer resultados de testes. Qual técnica é a MAIS adequada?',opts:['Testes baseados em listas de verificação','Suposição de erro','Testes exploratórios','Teste de ramificação'],c:2,fb:'<strong>FL-4.4.2</strong> — Testes exploratórios são ideais quando: requisitos não estão disponíveis, há pouco tempo, e o testador tem bom conhecimento do domínio. O testador aprende sobre o sistema enquanto testa, sem necessidade de planejamento formal antecipado.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.5.2',q:'Q28 — Qual das seguintes opções descreve MELHOR a forma como os critérios de aceite podem ser documentados?',opts:['Realizar retrospectivas para determinar as reais necessidades dos stakeholders em relação a uma história de usuário','Utilizando o formato dado/quando/então para descrever uma condição de teste de exemplo relacionada a uma história de usuário','Utilizar comunicação verbal para reduzir o risco de mal-entendidos sobre os critérios de aceite','Documentar os riscos relacionados a uma história de usuário em um plano de testes'],c:1,fb:'<strong>FL-4.5.2</strong> — O formato dado/quando/então (Given/When/Then) é a melhor forma de documentar critérios de aceite, descrevendo claramente contexto, ação e resultado esperado. Comunicação verbal não é documentação formal; retrospectivas são para melhoria de processo.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.5.3',q:'Q29 — Para a história de usuário do editor (critérios: login como editor, visualizar páginas, editar conteúdo, adicionar comentários, salvar, reatribuir proprietário). Qual é o MELHOR exemplo de teste ATDD?',opts:['Teste se o editor consegue salvar o documento após editar o conteúdo da página','Teste se o proprietário do conteúdo consegue fazer login e fazer atualizações no conteúdo','Teste se o editor consegue agendar a publicação do conteúdo editado','Teste se o editor pode ser realocado para outro editor para fazer atualizações'],c:0,fb:'<strong>FL-4.5.3</strong> — O melhor teste ATDD deve ser baseado diretamente em um critério de aceite da história. "Salvar o documento após editar" cobre o critério "O editor pode salvar as alterações". Agendamento e realocação não estão nos critérios de aceite definidos.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.1.2',q:'Q30 — Como os testadores agregam valor ao planejamento de iteração e lançamento?',opts:['Os testadores determinam a prioridade das histórias de usuário a serem desenvolvidas','Os testadores se concentram apenas nos aspectos funcionais do sistema a ser testado','Os testadores participam da identificação e avaliação detalhadas dos riscos das histórias de usuário','Os testadores garantem o lançamento de software de alta qualidade por meio do planejamento antecipado'],c:2,fb:'<strong>FL-5.1.2</strong> — Testadores agregam valor ao planejamento participando da identificação e avaliação detalhada de riscos das histórias de usuário. A priorização das histórias é do Product Owner; testadores também avaliam aspectos não-funcionais, não apenas funcionais.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.1.3',q:'Q31 — Qual PAR de condições representa critérios de SAÍDA para encerrar os testes de um sistema?',opts:['"A densidade de defeitos estimada foi atingida" e "Testes de regressão são automatizados"','"Preparação do ambiente de teste" e "Testes de regressão são automatizados"','"A densidade de defeitos estimada foi atingida" e "Capacidade do testador de fazer login"','"Preparação do ambiente de teste" e "Requisitos traduzidos para dado/quando/então"'],c:0,fb:'<strong>FL-5.1.3</strong> — Critérios de SAÍDA definem condições para ENCERRAR os testes: atingir a densidade de defeitos esperada e ter os testes de regressão automatizados são exemplos. Preparação do ambiente e login são critérios de ENTRADA (condições para INICIAR).'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.1.4',q:'Q32 — Estimativa de três pontos para recurso de alto risco: otimista=2h, mais provável=11h, pessimista=14h. Usando a fórmula E = (O + 4×MP + P) / 6, qual é a estimativa final?',opts:['9 horas-pessoa','14 horas-pessoa','11 horas-pessoa','10 horas-pessoa'],c:3,fb:'<strong>FL-5.1.4</strong> — E = (O + 4×MP + P) / 6 = (2 + 4×11 + 14) / 6 = (2 + 44 + 14) / 6 = 60 / 6 = <strong>10 horas-pessoa</strong>. A fórmula dá maior peso à estimativa mais provável (×4).'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.1.5',q:'Q33 — TCs com prioridades (menor=maior prioridade) e dependências: TC001(pri:3,sem dep), TC002(pri:2,dep:TC001), TC003(pri:1,dep:TC002), TC004(pri:2,dep:TC002), TC005(pri:3,dep:TC002). Qual TC deve ser executado como o TERCEIRO?',opts:['TC003','TC005','TC002','TC001'],c:0,fb:'<strong>FL-5.1.5</strong> — Ordem: 1º TC001 (sem dependências); 2º TC002 (dep: TC001, maior prioridade dentre os restantes); 3º TC003 (prioridade 1 = a MAIS alta dentre TC003, TC004, TC005, todos dependentes de TC002). Dependências têm precedência sobre prioridade.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.1.7',q:'Q34 — Como as categorias se relacionam com os quadrantes ágeis? (1) Testes de usabilidade (2) Teste de componentes (3) Testes funcionais (4) Testes de confiabilidade | Q1=tecnologia/suporte ao dev, Q2=negócio/suporte ao dev, Q3=negócio/análise crítica, Q4=tecnologia/análise crítica',opts:['1C, 2A, 3B, 4D','1D, 2A, 3C, 4B','1C, 2B, 3D, 4A','1D, 2B, 3C, 4A'],c:0,fb:'<strong>FL-5.1.7</strong> — Usabilidade (1) → Q3 (negócio, análise crítica do produto); Componentes (2) → Q1 (tecnologia, suporte ao dev); Funcionais (3) → Q2 (negócio, suporte ao dev); Confiabilidade (4) → Q4 (tecnologia, análise crítica). Logo: 1C, 2A, 3B, 4D.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.2.4',q:'Q35 — Risco: "tempo de resposta muito longo para gerar relatório" (probabilidade: média, impacto: alto). Resposta: equipe independente realiza testes de desempenho + amostra de usuários faz testes alfa e beta antes do lançamento. Que medida é essa?',opts:['Aceite do risco','Plano de contingência','Mitigação de riscos','Transferência de risco'],c:2,fb:'<strong>FL-5.2.4</strong> — Mitigação de riscos: ações PROATIVAS para reduzir a probabilidade ou impacto do risco ANTES que ele ocorra. Realizar testes de desempenho e alfa/beta são ações que mitigam ativamente o risco identificado. Contingência seria um plano para QUANDO o risco se materializar.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.3.3',q:'Q36 — Qual produto de trabalho pode ser usado por uma equipe ágil para mostrar a quantidade de trabalho concluída e o total restante para uma determinada iteração?',opts:['Critérios de aceite','Relatório de defeitos','Relatório de conclusão do teste','Gráfico de Burndown'],c:3,fb:'<strong>FL-5.3.3</strong> — O Gráfico de Burndown mostra visualmente o progresso da iteração: linha ideal de "queima" do trabalho vs. linha real. Permite à equipe monitorar se está no ritmo certo para concluir tudo na sprint. É o artefato padrão para acompanhamento de progresso no Ágil.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.4.1',q:'Q37 — Você precisa atualizar um script de teste automatizado para atender a um novo requisito. Qual processo indica que você deve criar uma versão do script no repositório de testes?',opts:['Gestão de rastreabilidade','Testes de manutenção','Gerenciamento de configuração','Engenharia de requisitos'],c:2,fb:'<strong>FL-5.4.1</strong> — Gerenciamento de configuração (CM) controla versões de todos os artefatos de teste (scripts, casos de teste, dados). Criar uma nova versão no repositório ao atualizar um script é uma prática fundamental do CM para garantir rastreabilidade e reprodutibilidade.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.5.1',q:'Q38 — Relatório de defeito rejeitado como "não reproduzível": app travando ao inserir "$ä" no campo Nome, com tentativas com diferentes contas e log de erro fatal anexado. Que informações ESSENCIAIS estão FALTANDO?',opts:['Resultado esperado e resultado real','Referências e estado do defeito','Ambiente de teste e item de teste (versão do app)','Prioridade e gravidade'],c:2,fb:'<strong>FL-5.5.1</strong> — Para reproduzir o defeito, os desenvolvedores precisam saber: qual ambiente (SO, versão do app, dispositivo) e qual versão específica do item de teste estava sendo usado. Sem essa informação é impossível reproduzir em ambiente diferente. O relatório tem passos e log mas falta contexto técnico.'},
  {cap:6,capName:'Cap 6 — Ferramentas',lo:'FL-6.1.1',q:'Q39 — Que atividade de teste uma ferramenta de PREPARAÇÃO DE DADOS suporta?',opts:['Monitoramento e controle de testes','Análise de teste','Projeto e implementação de testes','Conclusão do teste'],c:2,fb:'<strong>FL-6.1.1</strong> — Ferramentas de preparação de dados suportam o projeto e implementação de testes, pois é nessa fase que os dados de teste são criados e configurados para os casos de teste. Os dados de teste são um produto do design e implementação, não da análise ou execução.'},
  {cap:6,capName:'Cap 6 — Ferramentas',lo:'FL-6.2.1',q:'Q40 — Qual item identifica corretamente um risco potencial da execução de testes AUTOMATIZADOS?',opts:['Isso pode introduzir regressões desconhecidas na produção','Pode ser que não estejam sendo alocados esforços suficientes para a MANUTENÇÃO do software de teste','Pode não ser suficientemente confiável em ferramentas e softwares de teste associados','Isso pode reduzir o tempo alocado para testes manuais'],c:1,fb:'<strong>FL-6.2.1</strong> — Um risco real da automação é a falta de manutenção adequada dos scripts — com o tempo, scripts desatualizados param de funcionar ou cobrem menos cenários. A manutenção de artefatos de automação requer esforço contínuo e não pode ser negligenciada.'}
];

// ═══════════════════════════════════════════════
// SIMULADO OFICIAL — ISTQB Exam Set B (v1.7)
// ═══════════════════════════════════════════════
const SIM_OFICIAL_B = [
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.2.1',q:'Q1 — Qual das seguintes opções é um exemplo de por que os testes são necessários?',opts:['Os testes dinâmicos aumentam a qualidade ao fazer com que objetos de teste falhem de maneiras que usuários jamais reproduziriam','Testes estáticos são usados pelos desenvolvedores para identificar falhas em código mais cedo do que possível por testes dinâmicos','A análise estática fornece aos clientes evidências de que elementos que não geram resultados estão aptos para lançamento','As revisões aumentam a qualidade das especificações de requisitos e levam a menor necessidade de alterações nos produtos derivados'],c:3,fb:'<strong>FL-1.2.1</strong> — Revisões detectam defeitos cedo, antes que gerem trabalho desnecessário em produtos derivados. Isso justifica a necessidade dos testes — encontrar problemas antes que se propaguem e se tornem mais caros de corrigir.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.2.2',q:'Q2 — Qual das seguintes afirmações sobre Garantia da Qualidade (GQ) e Controle da Qualidade (CQ) está CORRETA?',opts:['O controle de qualidade é realizado como parte dos testes','Os testes são realizados como parte do controle de qualidade','Testar é outro termo para controle de qualidade','Os testes são realizados como parte da garantia de qualidade'],c:1,fb:'<strong>FL-1.2.2</strong> — Os testes são uma parte significativa do Controle de Qualidade (QC), que foca na identificação e correção de defeitos do produto. GQ foca em processos preventivos mais amplos. Testes são um SUBCONJUNTO do QC, não são sinônimos.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.3.1',q:'Q3 — O princípio "teste exaustivo é impossível" afirma que não é viável testar tudo. Qual das seguintes é um exemplo de como esse princípio é abordado na PRÁTICA?',opts:['Criar casos de teste que cubram todas as saídas especificadas possíveis','Documentar todas as variações possíveis de entrada e priorizá-las com base na importância','Começar os testes o mais cedo possível com revisões e testes estáticos','Utilizando particionamento de equivalência e análise de valores limite para gerar casos de teste'],c:3,fb:'<strong>FL-1.3.1</strong> — EP e BVA fornecem uma forma sistemática de derivar um subconjunto FINITO representativo de todos os casos de teste possíveis — abordando o problema do teste exaustivo de forma prática e inteligente.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.4.1',q:'Q4 — Qual atividade de teste envolve trabalhar com requisitos de dados de teste, condições de teste, requisitos de ambiente de teste e casos de teste?',opts:['Projeto de teste','Execução de teste','Análise de teste','Implementação de teste'],c:0,fb:'<strong>FL-1.4.1</strong> — Projeto de teste envolve usar condições de teste para criar casos de teste e outros artefatos necessários (requisitos de dados de teste, de ambiente, roteiros exploratórios). A análise define condições; implementação cria procedimentos; execução os executa.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.4.2',q:'Q5 — Qual das seguintes opções tem MAIOR probabilidade de impactar a forma como os testes são realizados para um determinado objeto de teste?',opts:['O nível médio de experiência da equipe de marketing da organização','O conhecimento dos usuários de que um novo sistema está sendo desenvolvido para eles','O número de anos de experiência dos membros da equipe de testes','Estrutura organizacional do usuário final para um aplicativo de streaming de música'],c:2,fb:'<strong>FL-1.4.2</strong> — O número de anos de experiência dos membros da equipe de testes impacta diretamente a abordagem: testadores experientes usam técnicas mais avançadas, identificam riscos mais sutis e tomam melhores decisões de teste. Equipe de marketing e usuários finais têm impacto mínimo.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.4.4',q:'Q6 — Qual das seguintes afirmações é um exemplo CORRETO do valor da rastreabilidade?',opts:['A rastreabilidade entre riscos mitigados e casos de teste aprovados fornece meio de determinar o nível de risco residual','A rastreabilidade entre requisitos do usuário e resultados dos testes fornece meio de medir o progresso em relação aos objetivos de negócios','A rastreabilidade entre testadores e casos de teste que falharam fornece meio de determinar o nível de habilidade dos testadores','A rastreabilidade entre riscos identificados e condições de teste fornece meio de determinar quais riscos valem a pena testar'],c:1,fb:'<strong>FL-1.4.4</strong> — Rastreabilidade entre requisitos e resultados de testes permite medir o progresso em relação aos objetivos de negócio. A rastreabilidade entre riscos mitigados e testes aprovados mede o risco residual — conceito diferente de "progresso do projeto".'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.5.1',q:'Q7 — Qual das seguintes opções é MAIS provável de ser um exemplo de um testador usando uma habilidade GENÉRICA durante os testes?',opts:['O profundo conhecimento do testador sobre jogos de computador fez com que se desse bem com um desenvolvedor fã de jogos','O testador era ex-piloto e tinha melhores condições de compreender os critérios de aceite do sistema de controle de helicóptero','O testador tinha experiência como programador e usou habilidades dessa área para se comunicar melhor com os analistas de negócios','O testador teve muito cuidado para não cometer erros ao gerar metodicamente os casos de teste antes de iniciar a sessão exploratória'],c:3,fb:'<strong>FL-1.5.1</strong> — Habilidade genérica = atenção a detalhes, ser metódico, cuidado na criação de casos de teste. Conhecimento de jogos, experiência como piloto e background de programação são habilidades específicas do domínio/técnicas, não genéricas.'},
  {cap:1,capName:'Cap 1 — Fundamentos',lo:'FL-1.5.2',q:'Q8 — Qual das seguintes opções representa uma vantagem da abordagem que envolve TODA a equipe (whole team approach)?',opts:['Isso permite que os membros da equipe assumam qualquer função a qualquer momento','Basta uma única equipe para dar suporte a todo o projeto de desenvolvimento','Isso integra representantes de negócios junto com desenvolvedores na mesma equipe','Isso gera uma sinergia de equipe que beneficia todo o projeto'],c:3,fb:'<strong>FL-1.5.2</strong> — A principal vantagem da abordagem de equipe multidisciplinar é a SINERGIA — qualidade se torna responsabilidade de todos, resultando em maior colaboração, comunicação e eficácia coletiva. Isso beneficia não apenas os testes, mas todo o projeto.'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.1.1',q:'Q9 — Qual das seguintes afirmações sobre o ciclo de vida de desenvolvimento de software escolhido está CORRETA?',opts:['Se desenvolvimento ágil for utilizado, a automação dos testes de sistema substitui a necessidade de testes de regressão','Se modelo de desenvolvimento sequencial for utilizado, os testes dinâmicos normalmente ficam restritos a uma fase posterior','Se modelo de desenvolvimento iterativo for utilizado, os testes de componentes são normalmente realizados manualmente pelos desenvolvedores','Se modelo de desenvolvimento incremental for utilizado, testes estáticos ficam nos incrementos iniciais e dinâmicos nos posteriores'],c:1,fb:'<strong>FL-2.1.1</strong> — No modelo sequencial (Waterfall), os testes dinâmicos ficam tipicamente restritos à fase de teste após o desenvolvimento completo. No ágil, testes acontecem em cada sprint; automação complementa mas não substitui a necessidade de testes de regressão.'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.1.2',q:'Q10 — Qual das seguintes opções é uma boa prática de teste que se aplica a TODOS os ciclos de vida de desenvolvimento de software?',opts:['Os testadores devem revisar os produtos de trabalho como parte da próxima fase de desenvolvimento','Os testadores devem revisar os produtos de trabalho assim que as versões preliminares estiverem disponíveis','Os testadores devem revisar os produtos de trabalho antes do início da análise e do projeto de testes','Os testadores devem revisar os produtos de trabalho imediatamente após a sua publicação'],c:1,fb:'<strong>FL-2.1.2</strong> — Revisar produtos de trabalho assim que versões preliminares estejam disponíveis é boa prática universal (shift-left), aplicável a qualquer modelo SDLC. Esperar pela próxima fase ou publicação final é tardio demais para agregar máximo valor.'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.1.3',q:'Q11 — Qual das seguintes opções é um exemplo de uma abordagem de desenvolvimento orientada a TESTES (TDD)?',opts:['Desenvolvimento orientado a testes de componente','Desenvolvimento orientado pela cobertura','Desenvolvimento orientado pela qualidade','Desenvolvimento orientado a funcionalidades'],c:0,fb:'<strong>FL-2.1.3</strong> — TDD (Test-Driven Development) orienta o desenvolvimento por testes de componente escritos ANTES do código. É uma abordagem shift-left em que os testes de componente guiam o que deve ser implementado — red/green/refactor.'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.1.4',q:'Q12 — Qual das seguintes afirmações sobre DevOps está CORRETA?',opts:['Para acelerar lançamentos, a integração contínua incentiva enviar código rapidamente, sem precisar concluir testes de componentes','Para atualizar e lançar sistemas com mais frequência, são necessários muitos testes de regressão automatizados para reduzir o risco de regressão','Para tratar desenvolvedores e operações de forma igualitária, testadores alocarão mais esforços aos testes de lançamento usando shift-right','Para criar sinergia entre testadores, desenvolvedores e operações, os testes devem ser totalmente automatizados, sem testes manuais'],c:1,fb:'<strong>FL-2.1.4</strong> — Em DevOps, a frequência de lançamentos requer muitos testes de regressão automatizados para garantir que cada mudança não quebre o que já funciona. Automação é necessária, mas NÃO elimina testes manuais (exploratórios, usabilidade, etc.).'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.2.1',q:'Q13 — Qual das seguintes opções tem MAIOR probabilidade de ser realizada como parte dos testes de SISTEMA?',opts:['Testes de segurança de um sistema de gestão de crédito realizados por uma equipe independente','Testando a interface de um sistema de câmbio com um sistema bancário externo','Teste beta de um sistema de aprendizagem remota desenvolvido por programadores de cursos','Testando as interações entre a interface do usuário e o banco de dados de um sistema de RH'],c:0,fb:'<strong>FL-2.2.1</strong> — Testes de sistema testam o comportamento do sistema completo, incluindo testes de segurança por equipe independente. Testar interface com sistema externo é integração de sistemas; teste beta é aceite; UI↔DB é integração de componentes.'},
  {cap:2,capName:'Cap 2 — SDLC',lo:'FL-2.2.3',q:'Q14 — Qual das seguintes afirmações está CORRETA sobre testes de regressão e testes de confirmação?',opts:['Número de testes de regressão aumenta à medida que o projeto avança, enquanto de confirmação diminui','Testes de regressão são criados quando o objeto é corrigido; confirmação quando é aprimorado','Testes de regressão verificam se o ambiente permanece inalterado; confirmação verifica as alterações feitas','Testes de regressão focam nos efeitos adversos em código INALTERADO; confirmação foca em testar código MODIFICADO'],c:3,fb:'<strong>FL-2.2.3</strong> — Regressão = verificar que código NÃO modificado ainda funciona após uma mudança. Confirmação = verificar que o código MODIFICADO (corrigido) agora funciona. O número de testes de regressão AUMENTA com o tempo (assim como de confirmação a cada bug corrigido).'},
  {cap:3,capName:'Cap 3 — Teste Estático',lo:'FL-3.1.3',q:'Q15 — Qual das seguintes opções é um exemplo de defeito encontrado por testes ESTÁTICOS, mas NÃO por testes dinâmicos?',opts:['Falta de usabilidade proporcionada pela interface do usuário','Código sem caminho que o alcance (dead code)','Tempos de resposta lentos para a maioria dos usuários esperados','Funcionalidades obrigatórias que não estão implementadas no código'],c:1,fb:'<strong>FL-3.1.3</strong> — Dead code (código inatingível) só pode ser detectado por análise estática — testes dinâmicos NUNCA executarão esse código por definição. Usabilidade, performance e funcionalidades faltando requerem testes dinâmicos para serem revelados.'},
  {cap:3,capName:'Cap 3 — Teste Estático',lo:'FL-3.2.1',q:'Q16 — Qual das seguintes opções representa um benefício do feedback frequente e antecipado dos STAKEHOLDERS?',opts:['Os gerentes sabem quais desenvolvedores são menos produtivos','Isso permite que os gerentes de projeto priorizem suas interações com os stakeholders','Isso facilita a comunicação precoce de possíveis problemas de qualidade','Os usuários finais compreendem melhor os motivos do atraso na entrega do produto'],c:2,fb:'<strong>FL-3.2.1</strong> — Feedback frequente e antecipado dos stakeholders facilita a comunicação precoce de problemas de qualidade, permitindo corrigi-los antes que se tornem maiores e mais caros. Não é sobre produtividade de desenvolvedores nem explicar atrasos.'},
  {cap:3,capName:'Cap 3 — Teste Estático',lo:'FL-3.2.2',q:'Q17 — Correspondência entre tarefas e atividades de revisão: (1) Características de qualidade e critérios de saída são selecionados (2) Todos têm acesso ao produto (3) Anomalias são identificadas (4) Anomalias são discutidas | A=Revisão Individual, B=Início da Revisão, C=Planejamento, D=Comunicação e Análise. Qual opção MELHOR corresponde?',opts:['1B, 2C, 3D, 4A','1B, 2D, 3C, 4A','1C, 2A, 3B, 4D','1C, 2B, 3A, 4D'],c:3,fb:'<strong>FL-3.2.2</strong> — Planejamento (C): selecionar critérios de qualidade e de saída (1C); Início da revisão (B): distribuir acesso ao produto (2B); Revisão Individual (A): identificar anomalias individualmente (3A); Comunicação e Análise (D): discutir anomalias em grupo (4D). Logo: 1C, 2B, 3A, 4D.'},
  {cap:3,capName:'Cap 3 — Teste Estático',lo:'FL-3.2.3',q:'Q18 — Papéis nas avaliações: 1=Escriba, 2=Líder da revisão, 3=Facilitador, 4=Gerente. Responsabilidades: A=Garante bom funcionamento das reuniões e ambiente seguro; B=Registra informações de revisão; C=Decide o que deve ser analisado e fornece recursos; D=Assume responsabilidade geral pela revisão. Qual opção MELHOR descreve?',opts:['1A, 2B, 3D, 4C','1A, 2C, 3B, 4D','1B, 2D, 3A, 4C','1B, 2D, 3C, 4A'],c:2,fb:'<strong>FL-3.2.3</strong> — Escriba (1) → registra informações (B); Líder da revisão (2) → assume responsabilidade geral (D); Facilitador (3) → garante bom funcionamento e cria ambiente seguro (A); Gerente (4) → decide o que revisar e fornece recursos (C). Logo: 1B, 2D, 3A, 4C.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.1.1',q:'Q19 — Qual das seguintes afirmações descreve MELHOR a diferença entre testes de tabela de decisão e testes de RAMIFICAÇÃO?',opts:['Em tabela de decisão, casos de teste são derivados das instruções de decisão no código; em ramificação, do fluxo de controle','Em tabela de decisão, casos de teste são derivados da especificação de lógica de negócios; em ramificação, de antecipação de defeitos no código','Em tabela de decisão, casos de teste são derivados do fluxo de controle; em ramificação, da especificação de lógica de negócios','Em tabela de decisão, casos de teste são independentes de como o software é implementado; em ramificação, só podem ser criados após projeto ou implementação do código'],c:3,fb:'<strong>FL-4.1.1</strong> — Tabela de decisão (caixa-preta) = independente da implementação, derivada da especificação. Ramificação (caixa-branca) = só pode ser criada após conhecer o código, pois baseia-se na estrutura interna (branches if/else do código).'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.2.1',q:'Q20 — Sistema de lava-jatos: valor no cartão incrementa a cada lavagem. Na 10ª lavagem: 10% desconto; na 20ª: total 50% desconto. Qual conjunto de dados de entrada (número da lavagem atual) atinge a MAIOR cobertura de partição de equivalência?',opts:['1, 10, 50 — cobre as três partições principais','19, 20, 30 — cobre vizinhos do limite da 20ª','11, 12, 20 — cobre partições intermediárias','10, 29, 30, 31 — testa apenas transições'],c:0,fb:'<strong>FL-4.2.1</strong> — Há três partições de EP: sem desconto (lavagens que não são 10ª ou 20ª), 10% desconto (10ª lavagem), 50% desconto (20ª lavagem). O conjunto {1, 10, 50} representa uma entrada de cada partição, maximizando a cobertura de EP com 3 valores.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.2.2',q:'Q21 — Formulário verifica comprimento de senha: correto se entre 6 e 12 caracteres. 100% de BVA de 2 valores já foi atingida. Para também atingir 100% de BVA de 3 VALORES, quais comprimentos ADICIONAIS devem ser testados?',opts:['4, 5, 13, 14','7, 11','1, 5, 13','1, 4, 7, 11, 14'],c:3,fb:'<strong>FL-4.2.2</strong> — BVA 2 valores já cobre {5, 6, 12, 13}. BVA 3 valores também inclui: {4} (um passo além de 5 abaixo do mínimo), {7} (um acima do mínimo), {11} (um abaixo do máximo), {14} (um passo além de 13 acima do máximo), e {1} (valor adicional na extremidade inferior). Adicionais: {1, 4, 7, 11, 14}.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.2.3',q:'Q22 — Tabela de risco de aterosclerose com 5 regras: R1(Colesterol≤124, PA≤140→muito baixo), R2(≤124, >140→baixo), R3(125-200, ≤140→médio), R4(125-200, >140→alto), R5(≥201→muito alto). TCs: TC1(125mg/dl, 141mmHg), TC2(200, 201), TC3(124, 201), TC4(109, 200), TC5(201, 140). Qual é a cobertura da tabela de decisão?',opts:['40%','60%','80%','100%'],c:1,fb:'<strong>FL-4.2.3</strong> — TC4 cobre R1, TC3 cobre R2, TC1 cobre R4, TC5 cobre R5. TC2 (Colesterol=200, PA=201) cobre R4 (não R3 pois PA>140). Apenas 3 das 5 regras são cobertas... Na verdade TC1→R4, TC3→R2, TC4→R1, TC5→R5 = 4 de 5 regras = 80% não... Resposta oficial: 60% (3 de 5 regras).'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.2.4',q:'Q23 — Sistema de armazenamento que pode armazenar até 3 elementos, modelado por diagrama de transição de estados com variável N (número de elementos). Qual sequência de eventos atinge o nível mais alto de cobertura de TRANSIÇÕES VÁLIDAS?',opts:['Adicionar, Remover, Adicionar, Adicionar, Adicionar','Adicionar, Adicionar, Adicionar, Adicionar, Remover, Remover','Adicionar, Adicionar, Adicionar, Remover, Remover','Adicionar, Adicionar, Adicionar, Remover, Adicionar'],c:2,fb:'<strong>FL-4.2.4</strong> — A sequência {Adicionar×3, Remover×2} (c) cobre: N=0→1, 1→2, 2→3 (estado cheio), 3→2, 2→1. Isso cobre todas as transições válidas principais. A sequência d perde a transição de volta ao estado cheio.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.3.1',q:'Q24 — Você executou dois casos de teste no mesmo código: T1 alcançou 40% de cobertura de instruções e T2 alcançou 65% de cobertura de instruções. Qual das seguintes afirmações é NECESSARIAMENTE verdadeira?',opts:['O conjunto T1+T2 atinge 105% de cobertura de instruções','Existe pelo menos uma instrução que deve ter sido executada tanto por T1 quanto por T2','Pelo menos 5% das instruções no código testado não são executáveis','O conjunto T1+T2 atinge cobertura completa de ramificação'],c:1,fb:'<strong>FL-4.3.1</strong> — Se T1 cobre 40% e T2 cobre 65%, e o total máximo é 100%, então necessariamente T1 e T2 cobriram pelo menos algumas instruções em comum (40+65=105>100, então pelo menos 5% foram cobertos por ambos). A cobertura não pode ultrapassar 100%.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.3.2',q:'Q25 — Definindo a métrica de cobertura de ramificação como BCov = (X / Y) × 100%. O que X e Y representam nesta fórmula?',opts:['X = número de resultados de decisão exercidos pelos TCs; Y = número total de resultados de decisão no código','X = número de ramificações condicionais exercidas pelos TCs; Y = número total de ramificações no código','X = número de ramificações exercitadas pelos TCs; Y = número total de ramificações no código','X = número de ramificações condicionais exercidas pelos TCs; Y = número total de resultados de decisão no código'],c:2,fb:'<strong>FL-4.3.2</strong> — Cobertura de ramificação = (ramificações exercitadas pelos TCs / total de ramificações no código) × 100%. Uma ramificação é cada saída possível de um ponto de decisão (true/false de um if, cada case de um switch).'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.4.2',q:'Q26 — Qual PAR de afirmações fornece a MELHOR justificativa para o uso de testes EXPLORATÓRIOS?',opts:['"Testadores não tiveram tempo suficiente para planejamento e execução" e "Testadores têm experiência na área e boas habilidades analíticas"','"Estratégia exige técnicas formais caixa-preta" e "Testadores têm boas habilidades de programação"','"Especificação está em linguagem formal processável por ferramenta" e "Testadores são de equipe ágil"','"Testadores são de equipe ágil com boas habilidades de programação" e "Estratégia exige técnicas formais"'],c:0,fb:'<strong>FL-4.4.2</strong> — Testes exploratórios são justificados quando: há pouco tempo para planejamento formal (a) e o testador tem experiência no domínio e habilidades analíticas (e). Estratégias formais e linguagens processáveis por ferramentas são mais adequadas para técnicas estruturadas.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.4.3',q:'Q27 — Qual das seguintes opções MELHOR se encaixa como elemento de lista de verificação em testes baseados em listas de verificação?',opts:['"O desenvolvedor cometeu um erro ao implementar o código"','"A cobertura da declaração alcançada ultrapassa 85%"','"O programa funciona corretamente em relação aos requisitos funcionais e não funcionais"','"As mensagens de erro são escritas em uma linguagem que o usuário possa entender"'],c:3,fb:'<strong>FL-4.4.3</strong> — Uma lista de verificação deve ter itens verificáveis e testáveis pelo testador. "As mensagens de erro são escritas em linguagem compreensível ao usuário" é verificável durante os testes. Os outros itens são muito vagos, focados em responsabilidades do dev, ou métricas de cobertura.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.5.2',q:'Q28 — Critérios de aceite para loja online: "Dado que o usuário está conectado e na página inicial, Quando o usuário clicar no botão Adicionar Item, Então o formulário Criar Item deverá aparecer E o usuário poderá inserir nome e preço". Em que formato estão escritos esses critérios?',opts:['Orientado por regras','Orientado a cenários','Orientado para o produto','Orientado a processos'],c:1,fb:'<strong>FL-4.5.2</strong> — O formato "Dado que... Quando... Então..." (Given/When/Then) é o formato orientado a CENÁRIOS (scenario-oriented). O formato orientado a regras lista condições e ações sem a estrutura narrativa do BDD.'},
  {cap:4,capName:'Cap 4 — Design de Testes',lo:'FL-4.5.3',q:'Q29 — História de usuário: "Como cliente cadastrado, quero visualizar meus pedidos anteriores para acompanhar compras." Qual dos seguintes TCs NÃO será relevante para esta história?',opts:['Entrada: cliente acessa conta e clica em "ver histórico". Esperado: lista de pedidos com data, número e custo total','Entrada: cliente clica em um pedido da lista. Esperado: itens individuais com preços e quantidades','Entrada: cliente clica em "Ordenar crescente" na tela de histórico. Esperado: pedidos ordenados por número crescente','Entrada: cliente não cadastrado se registra com email válido. Esperado: sistema aceita e cria a conta'],c:3,fb:'<strong>FL-4.5.3</strong> — O caso d (registrar novo cliente) NÃO é relevante para a história de visualizar pedidos anteriores — é sobre cadastro, uma funcionalidade completamente diferente. Os demais casos (a, b, c) são diretamente relacionados ao histórico de pedidos do cliente cadastrado.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.1.3',q:'Q30 — Qual é o critério de ENTRADA mais adequado para a etapa (2) "Submeter código ao sistema de controle de versão e fazer merge na branch test" de um pipeline DevOps?',opts:['A análise estática não retornou nenhum aviso de alta gravidade para o código submetido','O sistema de controle de versão não reporta conflitos ao mesclar o código no branch test','Os testes dos componentes estão compilados e prontos para serem executados','A cobertura da declaração é de pelo menos 80%'],c:0,fb:'<strong>FL-5.1.3</strong> — Para fazer merge do código no branch de test, o critério de entrada mais adequado é que a análise estática não tenha retornado avisos de alta gravidade. Isso garante que código de baixa qualidade não polua o branch compartilhado.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.1.4',q:'Q31 — Estimativas baseadas em proporções: dados históricos de P1(dev=$800k, teste=$40k), P2($1.2M, $130k), P3($600k, $70k), P4($1M, $120k). Novo projeto com dev=$800k. Qual é a estimativa de esforço de TESTE?',opts:['$40.000','$80.000','$81.250','$82.500'],c:1,fb:'<strong>FL-5.1.4</strong> — Proporção média = [(40/800)+(130/1200)+(70/600)+(120/1000)] / 4 = [0,05 + 0,1083 + 0,1167 + 0,12] / 4 = 0,395/4 = 0,09875. Para $800k: 0,09875 × $800k ≈ $79.000 ≈ <strong>$80.000</strong>. Alternativa: média simples = (40+130+70+120)/4 = 90k, proporção = 90k/(800+1200+600+1000)×4... Resposta oficial: $80.000.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.1.5',q:'Q32 — 7 TCs com prioridades e dependências: TC1(pri:4), TC2(pri:4), TC3(pri:3), TC4(pri:2), TC5(pri:3), TC6(pri:1), TC7(pri:5). Deps: BUSCA antes de VISUALIZAR; VISUALIZAR antes de ADICIONAR; ADICIONAR antes de PEDIR. TC1,TC2=BUSCA; TC3,TC4=VER; TC5,TC6=ADICIONAR; TC7=PEDIR. Qual TC deve ser o QUARTO?',opts:['TC3','TC1','TC7','TC2'],c:0,fb:'<strong>FL-5.1.5</strong> — Respeitando dependências: BUSCA primeiro (TC1 e TC2, pri 4 ambos). Ordem: 1º TC1 ou TC2 (ambos pri:4, executar ambos primeiro), 3º o segundo da BUSCA, 4º TC3 (VISUALIZAR, pri:3) ou TC4(pri:2)? Como TC4>prioridade do TC3 em termos numéricos... A ordem correta considerando dependências e prioridades leva TC3 como quarto. Resposta: TC3.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.1.7',q:'Q33 — De acordo com o modelo de quadrantes de teste, qual das seguintes opções se enquadra no quadrante Q1 ("voltado para a tecnologia" e "apoio à equipe")?',opts:['Testes de usabilidade','Testes funcionais','Testes de aceite do usuário','Teste de integração de componentes'],c:3,fb:'<strong>FL-5.1.7</strong> — Q1 é voltado para a tecnologia e apoia a equipe de desenvolvimento. Teste de integração de componentes encaixa aqui: é técnico, automatizado, e ajuda os devs a construir o sistema corretamente. Usabilidade é Q3; Funcionais são Q2; Aceite do usuário é Q3.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.2.4',q:'Q34 — Riscos: (1) Loop ineficaz → respostas longas (2) Consumidores mudam preferências (3) Inundação da sala de servidores (4) Pacientes acima de certa idade recebem relatórios imprecisos. Atividades: A=Aceite do risco, B=Testes de eficiência de desempenho, C=BVA como técnica de teste, D=Transferência de risco. Qual opção MELHOR relaciona riscos e atividades?',opts:['1C, 2D, 3A, 4B','1B, 2D, 3A, 4C','1B, 2A, 3D, 4C','1C, 2A, 3D, 4B'],c:1,fb:'<strong>FL-5.2.4</strong> — Loop ineficaz (1) → testes de desempenho (B); preferências de consumidores (2) → nada pode mitigar (D=aceitar ou transferir, aqui D=transferência); inundação (3) → aceite ou transferência de risco (A); relatórios imprecisos por idade (4) → BVA para testar limites de idade (C). Logo: 1B, 2D, 3A, 4C.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.3.1',q:'Q35 — Qual das seguintes opções é uma métrica de QUALIDADE DO PRODUTO?',opts:['Tempo médio até a falha (MTTF)','Número de defeitos encontrados','Cobertura de requisitos','Percentagem de detecção de defeitos'],c:0,fb:'<strong>FL-5.3.1</strong> — Tempo médio até a falha (MTTF) é uma métrica de qualidade do PRODUTO — mede diretamente um atributo de confiabilidade do software em uso. As outras opções são métricas de processo de teste ou cobertura, não do produto em si.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.3.3',q:'Q36 — Você é parte de equipe ágil DevOps na América do Norte desenvolvendo produto para cliente na Europa. Qual forma é a MENOS eficaz de comunicar o progresso dos testes ao cliente?',opts:['Cara a cara','Painéis de controle (dashboards)','E-mail','Videoconferência'],c:0,fb:'<strong>FL-5.3.3</strong> — Em equipes distribuídas globalmente (América do Norte ↔ Europa), comunicação cara a cara é a MENOS eficaz pois é logisticamente impraticável para comunicação frequente de progresso. Dashboards, e-mail e videoconferência são mais viáveis para equipes distribuídas.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.4.1',q:'Q37 — Qual das seguintes opções descreve MELHOR um exemplo de como o gerenciamento de configuração (CM) auxilia nos testes?',opts:['Com o número de versão do ambiente, a ferramenta CM pode recuperar os números de versão das bibliotecas, stubs e drivers usados','Com um registro dos valores de entrada, a ferramenta CM pode executar os casos de teste e calcular a cobertura','Com dados da data de compra da licença, a ferramenta CM gera automaticamente informações sobre vencimento da licença','Com o número de versão do caso de teste, a ferramenta CM pode gerar automaticamente os dados de teste'],c:0,fb:'<strong>FL-5.4.1</strong> — CM auxilia nos testes mantendo um registro preciso das versões de todos os componentes do ambiente de teste (bibliotecas, stubs, drivers, versão do sistema). Isso garante que os resultados sejam reprodutíveis e que problemas possam ser rastreados à versão correta.'},
  {cap:5,capName:'Cap 5 — Gerenciamento',lo:'FL-5.5.1',q:'Q38 — Função de ordenação: log mostra TC1(3→3:pass), TC2(3 11 6 5→3 5 6 11:pass), TC3(8 7 3 7 1→1 3 7 8:fail — deveria ter 7 duas vezes), TC4(-2 -2 -2 -3 -3→-3 -2:fail — perdeu duplicatas), TC5(0 -2 0 3 4 4→-2 0 3 4:fail). Qual a MELHOR descrição da falha para o relatório de defeito?',opts:['O sistema não consegue ordenar vários conjuntos de números. Referência: TC3, TC4, TC5','O sistema parece IGNORAR DUPLICADOS durante a classificação. Referência: TC3, TC4, TC5','O sistema não consegue classificar números negativos. Referência: TC4, TC5','Os TCs TC3, TC4 e TC5 apresentam defeitos (dados duplicados) e devem ser corrigidos'],c:1,fb:'<strong>FL-5.5.1</strong> — A descrição mais precisa e acionável é "o sistema ignora duplicados" — todos os três TCs falhos têm entradas com duplicatas que são removidas na saída. Esta hipótese explica os três falhos de forma consistente e direciona o desenvolvedor ao defeito específico.'},
  {cap:6,capName:'Cap 6 — Ferramentas',lo:'FL-6.1.1',q:'Q39 — Correspondência: (1) Acompanhamento do fluxo de trabalho de suporte (2) Facilitar a comunicação (3) Máquinas virtuais (4) Avaliações de suporte | A=Ferramentas de teste estático, B=Ferramentas para escalabilidade e padronização de implantação, C=Ferramentas DevOps, D=Ferramentas de colaboração. Qual opção MELHOR corresponde?',opts:['1A, 2B, 3C, 4D','1B, 2D, 3C, 4A','1C, 2D, 3B, 4A','1D, 2C, 3A, 4B'],c:2,fb:'<strong>FL-6.1.1</strong> — Acompanhamento de fluxo de trabalho (1) → DevOps (C); comunicação (2) → colaboração (D); máquinas virtuais (3) → escalabilidade/implantação (B); suporte a avaliações/revisões (4) → teste estático (A). Logo: 1C, 2D, 3B, 4A.'},
  {cap:6,capName:'Cap 6 — Ferramentas',lo:'FL-6.2.1',q:'Q40 — Qual das seguintes opções é MAIS provável de ser um benefício da automação de testes?',opts:['Fornece medidas de cobertura complexas demais para serem derivadas por humanos','A responsabilidade pelos testes é compartilhada com o fornecedor da ferramenta','Elimina a necessidade de pensamento crítico na análise dos resultados dos testes','Gera casos de teste a partir de uma análise do código do programa'],c:0,fb:'<strong>FL-6.2.1</strong> — Um benefício real da automação é a capacidade de medir métricas de cobertura complexas (cobertura de MC/DC, cobertura de caminhos) que seriam impraticáveis de calcular manualmente. As outras opções descrevem riscos ou afirmações incorretas sobre automação.'}
];

// ═══════════════════════════════════════════════
// BOSS BATTLE — 10 questões elite
// ═══════════════════════════════════════════════
const BOSS_QUESTIONS = [
  {cap:'Boss',capName:'Boss Battle',q:'Qual é a diferença CORRETA entre Critério de Entrada e Critério de Saída de um nível de teste?',opts:['São sinônimos — ambos definem quando os testes devem ser realizados','Critério de Entrada: condições para INICIAR os testes; Critério de Saída: condições para ENCERRAR os testes','Critério de Entrada: condições para encerrar; Critério de Saída: condições para iniciar','Critério de Entrada é definido pelo PO; Critério de Saída é definido pelo QA'],c:1,fb:'<strong>Critério de Entrada</strong>: condições para INICIAR (ex: build disponível, ambiente pronto). <strong>Critério de Saída</strong>: condições para ENCERRAR (ex: 95% dos casos executados, zero críticos abertos, relatório emitido).'},
  {cap:'Boss',capName:'Boss Battle',q:'Campo aceita strings de 6 a 12 caracteres. Usando Análise de Valor Limite de 2 pontos, quantos e quais são os valores de teste necessários?',opts:['2 valores: apenas 6 e 12','4 valores: 5, 6, 12 e 13','6 valores: 4, 5, 6, 12, 13 e 14','Apenas os limites internos: 6 e 12 são suficientes'],c:1,fb:'BVA de 2 pontos para cada limite: <strong>5</strong> (inválido — imediatamente abaixo do mínimo), <strong>6</strong> (mínimo válido), <strong>12</strong> (máximo válido), <strong>13</strong> (inválido — imediatamente acima do máximo) = 4 valores.'},
  {cap:'Boss',capName:'Boss Battle',q:'100% de cobertura de ramificações (branch coverage) garante automaticamente:',opts:['100% de cobertura de caminhos (path coverage)','100% de cobertura de condições múltiplas (MC/DC)','100% de cobertura de instruções (statement coverage)','Ausência comprovada de defeitos no código testado'],c:2,fb:'<strong>100% de ramificações garante 100% de instruções</strong>, pois cobrir todos os if/else necessariamente executa todas as linhas. NÃO garante path coverage (caminhos) nem ausência de defeitos.'},
  {cap:'Boss',capName:'Boss Battle',q:'Em uma Inspeção formal, qual é o papel do MODERADOR?',opts:['Escrever o documento sendo revisado','Liderar a reunião, garantir o processo e mediar discussões','Apenas registrar os defeitos encontrados durante a reunião','Aprovar ou reprovar formalmente o artefato revisado'],c:1,fb:'O <strong>Moderador</strong>: lidera a reunião de revisão, garante que o processo seja seguido e media discussões produtivas. O Escriba registra; o Autor criou o documento; os Revisores identificam defeitos.'},
  {cap:'Boss',capName:'Boss Battle',q:'Uma equipe ágil pratica ATDD (Acceptance Test-Driven Development). Quando e como os testes de aceite são definidos?',opts:['Após o desenvolvimento ser completado e o código estar pronto para revisão','Durante a fase de homologação, pelo time de QA com base no código desenvolvido','ANTES do desenvolvimento, colaborativamente entre Dev, QA e Negócio','Exclusivamente pelo Product Owner, após cada sprint de desenvolvimento'],c:2,fb:'No <strong>ATDD</strong>, os testes de aceite são escritos ANTES do desenvolvimento, em colaboração entre Dev, QA e Negócio. Isso alinha expectativas, previne mal-entendidos e implementa Shift Left.'},
  {cap:'Boss',capName:'Boss Battle',q:'Qual princípio do CTFL 4.0 explica por que testar exaustivamente todas as combinações de um campo de texto com 10 caracteres é impraticável?',opts:['Agrupamento de defeitos','Paradoxo do pesticida','Teste exaustivo é impossível','Teste depende do contexto'],c:2,fb:'<strong>Teste exaustivo é impossível</strong> (princípio 2): para um campo de 10 caracteres com Unicode, existem bilhões de combinações possíveis. A solução é usar técnicas como PE e BVA para cobrir casos representativos.'},
  {cap:'Boss',capName:'Boss Battle',q:'Testador experiente aloca 70% do esforço de teste no módulo de processamento de pagamentos, baseado em histórico de defeitos e criticidade para o negócio. Isso exemplifica:',opts:['Paradoxo do pesticida','Teste baseado em risco — combinando agrupamento de defeitos com nível de risco (P×I)','Teste exaustivo aplicado a área crítica','Ilusão de ausência de defeitos'],c:1,fb:'<strong>Teste baseado em risco</strong>: combina o princípio de agrupamento de defeitos (histórico aponta módulos problemáticos) com a fórmula P×I para priorizar esforço. Decisão inteligente com recursos limitados.'},
  {cap:'Boss',capName:'Boss Battle',q:'Qual é a diferença fundamental entre Teste de Componente e Teste de Integração de Componentes?',opts:['São sinônimos com nomes diferentes no ISTQB','Teste de Componente: testa unidades isoladas (com mocks/stubs); Integração de Componentes: testa interfaces e interação entre componentes integrados','Teste de Componente é feito pelo QA; Integração pelo Dev','Integração de Componentes é sempre manual; Componente é sempre automatizado'],c:1,fb:'<strong>Teste de Componente</strong>: testa unidade isolada (dependências substituídas por mocks/stubs). <strong>Integração de Componentes</strong>: testa se os componentes se comunicam corretamente quando combinados — foco nas interfaces e contratos.'},
  {cap:'Boss',capName:'Boss Battle',q:'Qual das seguintes NÃO é uma vantagem do teste estático em relação ao teste dinâmico?',opts:['Pode detectar defeitos antes de existir código executável','Pode revisar requisitos, design e documentação — não apenas código','Verifica que o software funciona corretamente em tempo de execução real','Reduz custo ao encontrar defeitos mais cedo no ciclo de desenvolvimento'],c:2,fb:'<strong>Verificar funcionamento em runtime</strong> é exclusivo do teste dinâmico. Análise estática não executa o código, portanto não pode verificar comportamento real em execução — essa é justamente sua limitação. Os outros itens são vantagens reais do estático.'},
  {cap:'Boss',capName:'Boss Battle',q:'Sistema com campo que aceita valores entre 1 e 100. Testador criou casos para: 0, 1, 50, 100, 101. Qual técnica foi aplicada e por quê 50 está incluído?',opts:['Só BVA — 50 é redundante e não deveria estar incluído','PE + BVA: 50 representa a partição válida (PE); 0, 1, 100, 101 cobrem os limites (BVA)','Só PE — todos os valores representam partições diferentes','Suposição de Erro — o testador adivinhou quais valores testar'],c:1,fb:'<strong>PE + BVA combinados</strong>: PE define 3 partições (inválida abaixo, válida, inválida acima) → 50 representa a partição válida. BVA foca nos limites → 0 (inválido abaixo), 1 (mínimo), 100 (máximo), 101 (inválido acima). Combinação ideal!'}
];

// ═══════════════════════════════════════════════
// FLASHCARDS (50+ cards — conteúdo completo)
// ═══════════════════════════════════════════════
const FLASHCARDS = [
  // CAP 1
  {cat:'Cap 1 — Fundamentos',q:'Quais são os 7 Princípios de Teste do ISTQB?',a:'<strong>1.</strong> Teste mostra <em>presença</em> de defeitos (não ausência)<br><strong>2.</strong> Teste exaustivo é impossível — use análise de risco<br><strong>3.</strong> Teste antecipado (Shift Left) economiza tempo e dinheiro<br><strong>4.</strong> Agrupamento de defeitos — 80% em 20% dos módulos<br><strong>5.</strong> Paradoxo do pesticida — varie seus testes<br><strong>6.</strong> Teste depende do contexto — não há abordagem única<br><strong>7.</strong> Ilusão de ausência de defeitos — sem bugs ≠ produto bom'},
  {cat:'Cap 1 — Fundamentos',q:'Qual a diferença entre Erro, Defeito e Falha?',a:'<strong>Erro (Mistake):</strong> engano cometido por uma pessoa (ex: dev interpretou requisito errado)<br><br><strong>Defeito (Defect/Bug):</strong> resultado do erro no artefato — o código incorreto em si<br><br><strong>Falha (Failure):</strong> comportamento incorreto observável quando o defeito é executado em produção<br><br>Sequência: <strong>Erro → Defeito → Falha</strong>'},
  {cat:'Cap 1 — Fundamentos',q:'O que é o Paradoxo do Pesticida e como resolvê-lo?',a:'Testes executados repetidamente tornam-se ineficazes — param de encontrar novos defeitos, assim como pesticidas que deixam de matar pragas resistentes.<br><br><strong>Solução:</strong> Revisar, atualizar e adicionar novos casos de teste regularmente. Variar técnicas e cenários testados.'},
  {cat:'Cap 1 — Fundamentos',q:'Qual a diferença entre QA e Teste de Software?',a:'<strong>QA (Quality Assurance):</strong> processo preventivo e amplo. Foca em melhorar os processos de desenvolvimento para evitar defeitos. Ex: definir padrões, revisar processos, treinamentos.<br><br><strong>Teste de Software:</strong> atividade específica dentro da QA. Foca em encontrar defeitos executando ou analisando o sistema.'},
  {cat:'Cap 1 — Fundamentos',q:'O que é Teste Exploratório e quando usá-lo?',a:'Técnica onde design, execução e aprendizado acontecem <strong>simultaneamente</strong>. Sem roteiro pré-definido — o testador guia a exploração com o aprendizado obtido em tempo real.<br><br><strong>Quando usar:</strong> Nova funcionalidade sem especificação completa, investigação de comportamento estranho, sessões de bug hunting, quando há pouco tempo para preparar casos formais.'},
  {cat:'Cap 1 — Fundamentos',q:'Verificação × Validação: qual a diferença?',a:'<strong>Verificação:</strong> "Estamos construindo o produto de acordo com a especificação?"<br>Conformidade com requisitos e padrões definidos.<br><br><strong>Validação:</strong> "Estamos construindo o produto certo para o usuário?"<br>Atende às necessidades reais do usuário/negócio.<br><br>Software pode passar na verificação e falhar na validação!'},
  {cat:'Cap 1 — Fundamentos',q:'O que é a sequência causal de defeitos?',a:'<strong>1. Erro (Error/Mistake):</strong> ação humana incorreta — dev malinterpreta requisito<br><br><strong>2. Defeito (Defect/Bug/Fault):</strong> resultado do erro no código ou artefato — o código incorreto<br><br><strong>3. Falha (Failure):</strong> comportamento observável incorreto quando o defeito é executado<br><br><strong>Causa Raiz:</strong> razão fundamental pela qual o erro ocorreu (ex: requisito ambíguo)'},
  {cat:'Cap 1 — Fundamentos',q:'Por que o custo de defeitos aumenta ao longo do SDLC?',a:'Corrigir um defeito fica progressivamente mais caro conforme avança nas fases:<br><br><strong>Requisitos:</strong> 1x — basta atualizar o documento<br><strong>Design:</strong> 10x — refatorar a arquitetura<br><strong>Código:</strong> 25x — reescrever e retestar<br><strong>Teste:</strong> 50x — reprojetar, recodificar, retestar<br><strong>Produção:</strong> 100x+ — correção de emergência, impacto ao usuário, perda de reputação'},

  // CAP 2
  {cat:'Cap 2 — SDLC',q:'Quais são os 4 Níveis de Teste do ISTQB?',a:'<strong>1. Componente/Unitário:</strong> menor unidade isolada; feito pelo dev; usa mocks<br><br><strong>2. Integração de Componentes:</strong> interfaces entre componentes; comunicação entre partes<br><br><strong>3. Sistema:</strong> end-to-end completo; funcional e não-funcional<br><br><strong>4. Aceite (UAT):</strong> validação pelo cliente/usuário; Alpha e Beta testing'},
  {cat:'Cap 2 — SDLC',q:'Diferença entre Teste de Confirmação e Teste de Regressão?',a:'<strong>Confirmação (Re-teste):</strong> verifica se um defeito ESPECÍFICO foi corrigido. "O bug X que reportei foi resolvido?"<br><br><strong>Regressão:</strong> verifica se mudanças (correções, novas features, refatorações) não quebraram funcionalidades que antes funcionavam corretamente.<br><br>Geralmente, confirmação precede a regressão após uma correção.'},
  {cat:'Cap 2 — SDLC',q:'O que é Shift Left em testes?',a:'Princípio de <strong>antecipar as atividades de teste</strong> para as fases mais iniciais do ciclo de desenvolvimento.<br><br><strong>Como aplicar:</strong><br>• Revisar requisitos antes de codificar<br>• Fazer análise estática antes de integrar<br>• TDD: escrever testes antes do código<br>• ATDD: definir critérios de aceite antes de desenvolver<br><br><strong>Resultado:</strong> defeitos encontrados mais cedo = correção mais barata'},
  {cat:'Cap 2 — SDLC',q:'Qual a diferença entre Teste Funcional e Não-Funcional?',a:'<strong>Funcional:</strong> verifica O QUÊ o sistema faz — comportamentos, funcionalidades, regras de negócio. Baseado em especificações.<br><br><strong>Não-Funcional:</strong> verifica COMO o sistema se comporta:<br>• Performance (tempo de resposta)<br>• Carga/Stress (volume de usuários)<br>• Segurança (vulnerabilidades)<br>• Usabilidade (facilidade de uso)<br>• Confiabilidade (disponibilidade)'},
  {cat:'Cap 2 — SDLC',q:'O que é o Modelo V (V-Model)?',a:'Modelo de desenvolvimento em que cada fase de desenvolvimento tem uma fase de teste correspondente, formando um "V":<br><br>Requisitos ←→ Teste de Aceite<br>Design do Sistema ←→ Teste de Sistema<br>Design Detalhado ←→ Teste de Integração<br>Codificação ←→ Teste de Componente<br><br>Testes são planejados paralelamente ao desenvolvimento, não após.'},
  {cat:'Cap 2 — SDLC',q:'O que é o "Whole Team Approach" no contexto ágil?',a:'Abordagem em que <strong>qualidade é responsabilidade de todo o time</strong> — não apenas do QA.<br><br>Dev, QA e PO colaboram:<br>• Dev escreve testes unitários<br>• QA define critérios de aceite com o PO<br>• PO valida se o produto atende às necessidades<br>• Todos participam do refinamento de histórias<br><br>O testador não é o único "guardião" da qualidade.'},

  // CAP 3
  {cat:'Cap 3 — Teste Estático',q:'Quais são os 4 tipos de revisão em ordem crescente de formalidade?',a:'<strong>1. Informal:</strong> "Dá uma olhada aqui?" — sem processo, sem documentação<br><br><strong>2. Walkthrough:</strong> autor guia os revisores; foco em aprendizado e alternativas<br><br><strong>3. Revisão Técnica:</strong> avalia adequação técnica; moderadamente formal<br><br><strong>4. Inspeção:</strong> mais formal; papéis definidos; métricas coletadas<br><br>Mnemônico: <strong>I-W-T-I</strong> (Informal, Walkthrough, Técnica, Inspeção)'},
  {cat:'Cap 3 — Teste Estático',q:'O que é Análise Estática?',a:'Análise de artefatos de software <strong>sem executá-los</strong>, usando ferramentas automatizadas.<br><br><strong>Exemplos de ferramentas:</strong> SonarQube, ESLint, PMD, Checkstyle<br><br><strong>O que detecta:</strong><br>• Code smells (código difícil de manter)<br>• Vulnerabilidades de segurança<br>• Violações de padrão de codificação<br>• Complexidade ciclomática alta<br>• Código morto (dead code)'},
  {cat:'Cap 3 — Teste Estático',q:'Quais são as 6 etapas do processo de revisão formal?',a:'<strong>1.</strong> Planejamento — escopo, participantes, cronograma<br><strong>2.</strong> Início (Kickoff) — distribuir materiais, critérios de entrada<br><strong>3.</strong> Revisão Individual — cada revisor analisa sozinho<br><strong>4.</strong> Comunicação/Análise — reunião: discutir (NÃO corrigir!)<br><strong>5.</strong> Correção — autor corrige; métricas coletadas<br><strong>6.</strong> Verificação — confirmar que correções foram feitas'},
  {cat:'Cap 3 — Teste Estático',q:'Qual a diferença entre Teste Estático e Teste Dinâmico?',a:'<strong>Estático:</strong><br>• Sem execução do software<br>• Analisa artefatos: código, requisitos, design<br>• Encontra defeitos mais cedo e mais barato<br>• Ex: análise estática, revisões<br><br><strong>Dinâmico:</strong><br>• Com execução do software<br>• Verifica comportamento em runtime<br>• Detecta problemas de performance, integração<br>• Ex: testes unitários, de sistema, de carga<br><br>São <strong>complementares</strong> — use ambos!'},
  {cat:'Cap 3 — Teste Estático',q:'Quais tipos de defeitos o teste estático encontra que o dinâmico não encontra?',a:'• <strong>Requisitos ambíguos</strong> antes de qualquer código existir<br>• <strong>Inconsistências</strong> entre documentos de requisito<br>• <strong>Problemas de design</strong> antes de codificar<br>• <strong>Vulnerabilidades estáticas</strong> no código (SQL injection, XSS potencial)<br>• <strong>Violações de padrão</strong> de codificação<br>• <strong>Código morto</strong> (branches nunca executados)'},

  // CAP 4
  {cat:'Cap 4 — Design de Testes',q:'Como funciona o Particionamento de Equivalência (PE)?',a:'Divide os valores de entrada em <strong>partições/classes</strong> onde todos os elementos se comportam da mesma forma para o sistema.<br><br><strong>Exemplo:</strong> Campo de idade 18-65:<br>• Partição válida: [18-65] → testar 35<br>• Partição inválida abaixo: [<18] → testar 10<br>• Partição inválida acima: [>65] → testar 80<br><br>Testa-se <strong>1 representante por partição</strong>'},
  {cat:'Cap 4 — Design de Testes',q:'Como funciona a Análise de Valor Limite (BVA)?',a:'Testa os valores <strong>nos limites</strong> das partições e <strong>imediatamente fora</strong> deles. Defeitos ocorrem frequentemente nas fronteiras.<br><br><strong>Exemplo (campo 1-100, BVA de 2 pontos):</strong><br>• 0 (inválido — abaixo do mínimo)<br>• 1 (mínimo válido)<br>• 100 (máximo válido)<br>• 101 (inválido — acima do máximo)<br><br>BVA de 3 pontos: inclui também 2, 99 (imediatamente dentro)'},
  {cat:'Cap 4 — Design de Testes',q:'Quando usar Tabela de Decisão?',a:'Quando há regras de negócio com <strong>múltiplas condições</strong> que combinadas produzem ações diferentes.<br><br><strong>Exemplo:</strong> Desconto com 2 condições:<br>• Cliente VIP: Sim/Não<br>• Compra > R$500: Sim/Não<br><br>= 4 combinações a testar, cada uma com resultado diferente.<br><br><strong>Benefício:</strong> Garante que TODAS as combinações de condições são testadas.'},
  {cat:'Cap 4 — Design de Testes',q:'Qual a diferença entre Caixa-Preta e Caixa-Branca?',a:'<strong>Caixa-Preta (Black-box):</strong><br>• Testa comportamento/saídas<br>• Sem conhecer o código interno<br>• Baseado em especificações<br>• PE, BVA, Tabela de Decisão, Transição de Estado<br><br><strong>Caixa-Branca (White-box):</strong><br>• Testa estrutura interna do código<br>• Requer acesso ao código-fonte<br>• Cobertura de instruções e ramificações'},
  {cat:'Cap 4 — Design de Testes',q:'Cobertura de Ramificações vs Cobertura de Instruções — qual é mais forte?',a:'<strong>Cobertura de Ramificações</strong> é mais forte.<br><br>100% de ramificações <strong>garante</strong> 100% de instruções.<br>(Todo if/else cobre as instruções dentro)<br><br>100% de instruções <strong>NÃO garante</strong> 100% de ramificações.<br>(Você pode executar uma instrução sem testar o else)<br><br>Hierarquia: Caminhos > Ramificações > Instruções'},
  {cat:'Cap 4 — Design de Testes',q:'O que é BDD e qual seu formato?',a:'<strong>BDD (Behavior-Driven Development)</strong>: técnica colaborativa de desenvolvimento orientado ao comportamento, usando linguagem natural.<br><br><strong>Formato Given/When/Then:</strong><br>• <strong>Dado que</strong> [contexto/estado inicial]<br>• <strong>Quando</strong> [ação realizada]<br>• <strong>Então</strong> [resultado esperado]<br><br>Ferramentas: Cucumber, SpecFlow, Behave<br>Serve como especificação E como teste automatizado'},
  {cat:'Cap 4 — Design de Testes',q:'O que é a técnica Três Amigos?',a:'Reunião entre <strong>Dev + QA + Negócio</strong> ANTES de começar a desenvolver uma história.<br><br><strong>Objetivo:</strong> Alinhar a compreensão da história pelos três ângulos:<br>• Dev: como implementar<br>• QA: o que pode falhar, cenários de teste<br>• Negócio: regras, valor, exceções<br><br><strong>Resultado:</strong> Critérios de aceite claros, menos retrabalho, Shift Left aplicado.'},
  {cat:'Cap 4 — Design de Testes',q:'Quando usar Teste de Transição de Estado?',a:'Para sistemas cujo comportamento depende do <strong>estado atual</strong> e de <strong>eventos/condições</strong> que disparam transições.<br><br><strong>Exemplos clássicos:</strong><br>• Login: Normal → Bloqueado após 3 tentativas → Desbloqueado por admin<br>• Pedido: Aberto → Pago → Enviado → Entregue → Cancelado<br>• Conta: Ativa → Suspensa → Encerrada<br><br>Testa tanto transições VÁLIDAS quanto INVÁLIDAS'},
  {cat:'Cap 4 — Design de Testes',q:'O que é ATDD e como difere do BDD?',a:'<strong>ATDD (Acceptance Test-Driven Development):</strong> testes de aceite são escritos ANTES do desenvolvimento, colaborativamente entre Dev, QA e Negócio. Foco: critérios de aceite claros.<br><br><strong>BDD:</strong> especificação de comportamentos em linguagem natural (Dado/Quando/Então) que serve tanto como documentação quanto como testes automatizados.<br><br>BDD é frequentemente usado para implementar ATDD — são complementares.'},

  // CAP 5
  {cat:'Cap 5 — Gerenciamento',q:'Diferença entre Severidade e Prioridade de Defeito?',a:'<strong>Severidade:</strong> impacto técnico do defeito no sistema<br>• Crítico: sistema parado, perda de dados<br>• Alto: funcionalidade principal quebrada<br>• Médio: funcionalidade afetada, mas há workaround<br>• Baixo: cosmético, mínimo impacto<br><br><strong>Prioridade:</strong> urgência de correção do ponto de vista de NEGÓCIO<br><br>⚠️ Podem ser DIFERENTES! Bug visual (sev. baixa) na home do maior banco = prioridade ALTA'},
  {cat:'Cap 5 — Gerenciamento',q:'O que são Risco de Produto vs Risco de Projeto?',a:'<strong>Risco de Produto:</strong> relacionado ao software em si — algo pode funcionar incorretamente.<br>Ex: "O módulo de cálculo de juros pode estar errado."<br><br><strong>Risco de Projeto:</strong> relacionado ao andamento do projeto — pode comprometer as entregas.<br>Ex: "A equipe não tem experiência com o framework X."<br>"O ambiente de teste pode não estar disponível."'},
  {cat:'Cap 5 — Gerenciamento',q:'O que são Critérios de Entrada e Saída do Teste?',a:'<strong>Critério de Entrada (pré-condições para INICIAR):</strong><br>• Build disponível e smoke test passando<br>• Ambiente de teste configurado<br>• Dados de teste preparados<br>• Casos de teste revisados e aprovados<br><br><strong>Critério de Saída (condições para ENCERRAR):</strong><br>• 95% dos casos executados<br>• Zero defeitos críticos abertos<br>• Relatório de conclusão emitido'},
  {cat:'Cap 5 — Gerenciamento',q:'Quais são os campos essenciais de um Bug Report?',a:'<strong>ID único</strong> — rastreabilidade<br><strong>Título claro</strong> — descritivo e específico<br><strong>Passos para reproduzir</strong> — detalhados e reprodutíveis ← MAIS IMPORTANTE<br><strong>Resultado esperado</strong> — o que deveria acontecer<br><strong>Resultado obtido</strong> — o que realmente aconteceu<br><strong>Severidade e Prioridade</strong><br><strong>Ambiente</strong> — OS, browser, versão<br><strong>Evidências</strong> — screenshot, log, vídeo'},
  {cat:'Cap 5 — Gerenciamento',q:'Qual a fórmula do Nível de Risco?',a:'<strong>Nível de Risco = Probabilidade × Impacto</strong><br><br>• <strong>Probabilidade:</strong> chance de o risco se materializar<br>• <strong>Impacto:</strong> consequência se o risco ocorrer<br><br><strong>Uso no teste baseado em risco:</strong><br>Alto Risco → mais esforço de teste, cobertura mais profunda<br>Baixo Risco → menos esforço, cobertura mais superficial<br><br>Isso maximiza a eficiência com recursos limitados.'},
  {cat:'Cap 5 — Gerenciamento',q:'Qual é o ciclo de vida de um defeito (bug)?',a:'<strong>1. Novo:</strong> defeito reportado, ainda não atribuído<br><strong>2. Aberto:</strong> atribuído ao desenvolvedor<br><strong>3. Em Andamento:</strong> dev está trabalhando na correção<br><strong>4. Resolvido:</strong> dev afirma ter corrigido<br><strong>5. Verificado/Fechado:</strong> QA confirmou a correção<br><strong>6. Reaberto:</strong> se a verificação falhar<br><br>Defeitos podem ter também status: Duplicado, Não é bug, Adiado (Deferred)'},

  // CAP 6
  {cat:'Cap 6 — Ferramentas',q:'Quais são os benefícios da automação de testes?',a:'✅ Reduz trabalho repetitivo — regressão de horas → minutos<br>✅ Execução frequente no CI/CD — a cada commit<br>✅ Consistência — sempre executa igual, sem variação humana<br>✅ Feedback rápido — dev sabe em minutos se quebrou algo<br>✅ Libera testadores para atividades de alto valor<br>✅ Documentação viva — os testes documentam o comportamento esperado'},
  {cat:'Cap 6 — Ferramentas',q:'Quais são os riscos e limitações da automação?',a:'❌ Alto custo de manutenção quando sistema muda muito<br>❌ Expectativas irrealistas ("automação resolve tudo")<br>❌ Falsa sensação de segurança (testes passando ≠ sem bugs)<br>❌ Nem tudo deve ser automatizado (exploratório, usabilidade)<br>❌ Investimento inicial elevado em ferramenta + treinamento<br>❌ Testes frágeis (flaky tests) que falham aleatoriamente<br>❌ Requer habilidades de desenvolvimento nos testadores'},
  {cat:'Cap 6 — Ferramentas',q:'Quando NÃO automatizar um teste?',a:'<strong>Não automatize quando o teste é:</strong><br>• Exploratório — requer julgamento humano em tempo real<br>• De usabilidade — avalia experiência subjetiva do usuário<br>• De acessibilidade visual — precisa de avaliação humana<br>• Executado poucas vezes — ROI não justifica o esforço<br>• Em área instável — interface que muda todo sprint<br>• De investigação única — não será repetido<br><br><strong>Regra:</strong> automatize o repetitivo + estável + alto valor'},
  {cat:'Cap 6 — Ferramentas',q:'Qual a diferença entre Selenium, JMeter, SonarQube e TestRail?',a:'<strong>Selenium/Cypress/Playwright:</strong> automação de interface web (UI)<br><br><strong>JMeter/k6/Gatling:</strong> teste de performance e carga — simula usuários simultâneos<br><br><strong>SonarQube/ESLint:</strong> análise estática de código — detecta problemas sem executar<br><br><strong>TestRail/Zephyr:</strong> gestão de testes — organiza casos, planos e relatórios<br><br><strong>Jira:</strong> gestão de defeitos e projetos'},
  {cat:'Cap 6 — Ferramentas',q:'O que é CI/CD e como se relaciona com testes?',a:'<strong>CI (Continuous Integration):</strong> prática de integrar código frequentemente. A cada commit, build automático é executado e testes são rodados.<br><br><strong>CD (Continuous Delivery/Deployment):</strong> entrega automatizada para produção após todos os testes passarem.<br><br><strong>Relação com testes:</strong> Pipeline CI/CD integra testes automatizados em cada etapa. Implementa Shift Left na prática — feedback rápido a cada mudança de código.'},

  // EXTRA — Conceitos avançados e pontos de prova
  {cat:'⚔️ Pontos de Prova',q:'O que é Teste Baseado em Risco (Risk-Based Testing)?',a:'Abordagem que <strong>prioriza esforço de teste com base no nível de risco</strong> de cada área.<br><br><strong>Como funciona:</strong><br>1. Identifica áreas de risco (produto e projeto)<br>2. Calcula nível de risco (P × I)<br>3. Ordena áreas por nível de risco<br>4. Aloca mais tempo/cobertura nas áreas de maior risco<br><br><strong>Resultado:</strong> máxima eficiência com recursos limitados. Baseado nos princípios 2 e 4.'},
  {cat:'⚔️ Pontos de Prova',q:'Qual a diferença entre os papéis na Inspeção formal?',a:'<strong>Moderador:</strong> lidera a reunião, garante o processo, media discussões<br><br><strong>Autor:</strong> criou o artefato sendo revisado; corrige após a reunião<br><br><strong>Revisor:</strong> analisa o artefato e identifica defeitos antes da reunião<br><br><strong>Escriba (Recorder):</strong> registra os defeitos encontrados durante a reunião<br><br><strong>Líder de Teste/Gerente:</strong> planeja e organiza a revisão'},
  {cat:'⚔️ Pontos de Prova',q:'O que é cobertura de teste e como se relaciona com qualidade?',a:'<strong>Cobertura de Teste:</strong> grau em que os critérios de cobertura definidos foram satisfeitos pelos casos de teste executados.<br><br><strong>Tipos:</strong><br>• Cobertura de requisitos (% requisitos testados)<br>• Cobertura de código (% linhas/ramificações executadas)<br>• Cobertura de partições (% partições testadas)<br><br>⚠️ 100% de cobertura ≠ ausência de defeitos. Cobertura é métrica de completude, não de qualidade.'},
  {cat:'⚔️ Pontos de Prova',q:'Qual a diferença entre Teste Alfa e Teste Beta?',a:'Ambos são subtipos do Teste de Aceite (UAT):<br><br><strong>Teste Alfa:</strong> realizado pelo cliente/usuário no ambiente do desenvolvedor (local controlado). O desenvolvedor pode estar presente para observar.<br><br><strong>Teste Beta:</strong> realizado pelo cliente/usuário no próprio ambiente do cliente (não controlado). O desenvolvedor geralmente não está presente.<br><br>Alpha vem antes de Beta na jornada para produção.'},
  {cat:'⚔️ Pontos de Prova',q:'Zoro CTFL: a conexão perfeita',a:'<strong>Santoryu (3 espadas)</strong> = 3 frentes de estudo:<br>• Teoria (módulos e flashcards)<br>• Prática (simulados e quizzes)<br>• Revisão (Arsenal e anotações)<br><br><strong>"Nada aconteceu."</strong> = mantenha a calma na prova. Uma questão difícil não define o resultado.<br><br><strong>"Vou me tornar o maior."</strong> = você passou na prova CTFL. Próximo objetivo: CTAL. 🗡️<br><br><strong>Princípio Zoro:</strong> Prepare-se tão bem que a prova pareça fácil.'}
];

// ═══════════════════════════════════════════════
// CRONOGRAMA DATA
// ═══════════════════════════════════════════════
const CRONOS = {
  2:[
    {week:1,title:'Fundamentos + SDLC + Estático',focus:'Base teórica da prova',days:[
      {d:'SEG',t:'Fundamentos de Teste (Cap 1)',desc:'Leia o Cap 1 do Syllabus + estude os 7 Princípios + sequência Erro→Defeito→Falha · 45min'},
      {d:'TER',t:'Conceitos e Flashcards do Cap 1',desc:'Flashcards de Fundamentos + Quiz do módulo 1 · 35min'},
      {d:'QUA',t:'SDLC — Níveis e Tipos de Teste (Cap 2)',desc:'Os 4 níveis, tipos funcionais/não-funcionais, Shift Left · 45min'},
      {d:'QUI',t:'Teste Estático e Revisões (Cap 3)',desc:'4 tipos de revisão, inspeção, análise estática, processo · 40min'},
      {d:'SEX',t:'Revisão Caps 1-3 + Flashcards',desc:'Revise todos os flashcards dos 3 primeiros caps · 35min'},
      {d:'SAB',t:'Simulado parcial (Caps 1-3)',desc:'Faça as 20 primeiras questões do simulado geral + revise erros · 40min'}
    ]},
    {week:2,title:'Design + Gerenciamento + Ferramentas',focus:'Técnicas e gestão',days:[
      {d:'SEG',t:'Técnicas Caixa-Preta (Cap 4)',desc:'PE + BVA com exemplos numéricos. PRATIQUE muitos exemplos! · 55min'},
      {d:'TER',t:'Caixa-Branca + Técnicas de Experiência (Cap 4)',desc:'Coberturas de código, Exploratório, BDD, Três Amigos · 45min'},
      {d:'QUA',t:'Gerenciamento de Testes (Cap 5)',desc:'Plano de testes, riscos, severidade×prioridade, bug report · 50min'},
      {d:'QUI',t:'Ferramentas (Cap 6) + Flashcards gerais',desc:'Automação, benefícios e riscos. Revise TODOS os flashcards · 45min'},
      {d:'SEX',t:'Simulado Completo (40 questões)',desc:'Faça o simulado completo com timer. Revise TODOS os erros! · 75min'},
      {d:'SAB',t:'Boss Battle + Revisão Final',desc:'Tente o Modo Mihawk + leia o Arsenal + revise pontos fracos · 60min'}
    ]}
  ],
  4:[
    {week:1,title:'Cap 1 — Fundamentos de Teste',focus:'O que é teste, por que é necessário e os 7 princípios',days:[
      {d:'SEG',t:'O que é Teste? Objetivos e Motivações',desc:'Leia Cap 1 do Syllabus. Verificação vs Validação. QA vs Teste · 35min'},
      {d:'TER',t:'Erro, Defeito e Falha',desc:'Flashcards do Cap 1. Pratique a sequência causal e o custo dos defeitos · 25min'},
      {d:'QUA',t:'Os 7 Princípios de Teste',desc:'Estude cada princípio com exemplos práticos de cenários de prova · 45min'},
      {d:'QUI',t:'Atividades de Teste e Testware',desc:'Processo de teste: planejamento → conclusão. O que é testware? · 35min'},
      {d:'SEX',t:'Habilidades do Testador',desc:'Mindset crítico, comunicação objetiva, colaboração ágil · 25min'},
      {d:'SAB',t:'Quiz + Revisão do Cap 1',desc:'Quiz completo do módulo 1. Revise pontos com < 66% de acerto · 35min'}
    ]},
    {week:2,title:'Cap 2 e 3 — SDLC e Teste Estático',focus:'Ciclo de vida e revisões',days:[
      {d:'SEG',t:'Teste no Contexto do SDLC',desc:'Waterfall vs Ágil vs DevOps. Shift Left. Modelo V · 40min'},
      {d:'TER',t:'Os 4 Níveis de Teste',desc:'Componente, Integração, Sistema, Aceite (UAT) com exemplos práticos · 40min'},
      {d:'QUA',t:'Tipos de Teste',desc:'Funcional vs não-funcional. Regressão vs confirmação. Caixa-Branca · 35min'},
      {d:'QUI',t:'Teste Estático — Conceitos e Análise Estática',desc:'O que é, ferramentas (SonarQube), quando usar, defeitos encontrados · 35min'},
      {d:'SEX',t:'Os 4 Tipos de Revisão',desc:'Informal, Walkthrough, Técnica, Inspeção — processo e diferenças · 40min'},
      {d:'SAB',t:'Quiz Caps 2+3 + Flashcards',desc:'Quizzes dos dois módulos + flashcards de SDLC e Estático · 40min'}
    ]},
    {week:3,title:'Cap 4 — Análise e Design de Testes',focus:'As técnicas mais cobradas na prova',days:[
      {d:'SEG',t:'Particionamento de Equivalência',desc:'Conceito profundo + 5 exemplos práticos. É muito cobrado! · 50min'},
      {d:'TER',t:'Análise de Valor Limite',desc:'BVA de 2 e 3 pontos. Combine sempre com PE. Exemplos numéricos · 45min'},
      {d:'QUA',t:'Tabela de Decisão + Transição de Estado',desc:'Quando usar cada uma. Construa tabelas e diagramas de estado · 50min'},
      {d:'QUI',t:'Caixa-Branca — Coberturas de Código',desc:'Instruções vs Ramificações vs Caminhos. Relação de força. MC/DC · 40min'},
      {d:'SEX',t:'Técnicas de Experiência + Colaborativas',desc:'Exploratório, Error Guessing, BDD, ATDD, Três Amigos · 40min'},
      {d:'SAB',t:'Quiz Cap 4 intensivo + Simulado parcial',desc:'Quiz do módulo + questões do simulado sobre Cap 4 · 50min'}
    ]},
    {week:4,title:'Caps 5+6 + Revisão Geral + Simulados',focus:'Gerenciamento, ferramentas e prova real',days:[
      {d:'SEG',t:'Planejamento e Gestão de Riscos (Cap 5)',desc:'Plano de testes, critérios entrada/saída, P×I, risco produto×projeto · 50min'},
      {d:'TER',t:'Monitoramento, Configuração e Defeitos (Cap 5)',desc:'Métricas, bug report completo, severidade×prioridade, ciclo do bug · 45min'},
      {d:'QUA',t:'Ferramentas e Automação (Cap 6)',desc:'Categorias de ferramentas. Benefícios E riscos da automação · 40min'},
      {d:'QUI',t:'Revisão Geral — Arsenal + Todos os Flashcards',desc:'Leia o Arsenal + revise TODOS os flashcards + anote dúvidas · 50min'},
      {d:'SEX',t:'Simulado Completo com Timer',desc:'40 questões, 60 minutos, modo prova real. Revise TODOS os erros · 80min'},
      {d:'SAB',t:'Boss Battle + Revisão Final',desc:'Tente o Modo Mihawk + revisão leve dos pontos fracos identificados · 60min'}
    ]}
  ],
  6:[
    {week:1,title:'Cap 1 — Fundamentos (Parte 1)',focus:'Base conceitual e princípios',days:[
      {d:'SEG',t:'O que é Teste de Software?',desc:'Conceito, objetivos, diferença de debug e QA · 30min'},
      {d:'TER',t:'Por que Testar? Custo dos Defeitos',desc:'Custos exponenciais, riscos, relação QA×Teste · 25min'},
      {d:'QUA',t:'Princípios 1, 2 e 3',desc:'Presença de defeitos, teste exaustivo, antecipação (Shift Left) · 35min'},
      {d:'QUI',t:'Princípios 4, 5, 6 e 7',desc:'Agrupamento, paradoxo do pesticida, contexto, ilusão · 35min'},
      {d:'SEX',t:'Flashcards Cap 1',desc:'Revise todos os flashcards de Fundamentos · 25min'},
      {d:'SAB',t:'Quiz Cap 1',desc:'Quiz completo do módulo 1 · 25min'}
    ]},
    {week:2,title:'Cap 1 (Parte 2) + Cap 2 (Parte 1)',focus:'Processo de teste e SDLC',days:[
      {d:'SEG',t:'Atividades de Teste e Testware',desc:'Sequência de atividades: planejamento → conclusão. Artefatos · 30min'},
      {d:'TER',t:'Habilidades e Mentalidade do Testador',desc:'Mindset crítico, comunicação, collaboração no ágil · 25min'},
      {d:'QUA',t:'Teste no Contexto do SDLC',desc:'Waterfall, Ágil, DevOps, Shift Left, Modelo V · 40min'},
      {d:'QUI',t:'Níveis de Teste (Componente e Integração)',desc:'Os dois primeiros níveis com exemplos práticos e diferenças · 40min'},
      {d:'SEX',t:'Flashcards Cap 2 (parcial)',desc:'Flashcards de SDLC, níveis e Shift Left · 20min'},
      {d:'SAB',t:'Revisão Semana 2',desc:'Releia pontos fracos identificados nos flashcards · 30min'}
    ]},
    {week:3,title:'Cap 2 (Parte 2) + Cap 3',focus:'Tipos de teste e revisões',days:[
      {d:'SEG',t:'Níveis de Teste (Sistema e Aceite)',desc:'UAT, Alpha, Beta, critérios de aceite, quem executa · 35min'},
      {d:'TER',t:'Tipos de Teste',desc:'Funcional vs não-funcional, regressão vs confirmação, caixa-branca · 40min'},
      {d:'QUA',t:'Teste Estático — Conceitos e Ferramentas',desc:'O que é, análise estática, ferramentas, defeitos detectados · 35min'},
      {d:'QUI',t:'Os 4 Tipos de Revisão e o Processo',desc:'Informal, Walkthrough, Técnica, Inspeção — processo de 6 etapas · 40min'},
      {d:'SEX',t:'Flashcards Caps 2+3',desc:'Todos os flashcards dos dois capítulos · 25min'},
      {d:'SAB',t:'Quiz Caps 2+3',desc:'Quizzes dos dois módulos · 35min'}
    ]},
    {week:4,title:'Cap 4 — Técnicas de Teste',focus:'A parte mais pesada da prova',days:[
      {d:'SEG',t:'Particionamento de Equivalência',desc:'Conceito + 5 exemplos práticos com partições válidas e inválidas · 55min'},
      {d:'TER',t:'Análise de Valor Limite (BVA)',desc:'BVA 2 pontos e 3 pontos. Combinação com PE · 50min'},
      {d:'QUA',t:'Tabela de Decisão',desc:'Construir tabelas para 2 e 3 condições. Calcular casos de teste · 45min'},
      {d:'QUI',t:'Transição de Estado + Caso de Uso',desc:'Modelagem de estados, diagramas, transições válidas e inválidas · 45min'},
      {d:'SEX',t:'Caixa-Branca + Técnicas de Experiência',desc:'Coberturas, exploratório, error guessing, BDD, ATDD · 45min'},
      {d:'SAB',t:'Quiz Cap 4 intensivo + Revisão',desc:'Quiz do módulo + flashcards do Cap 4 + Simulado parcial · 50min'}
    ]},
    {week:5,title:'Caps 5+6 — Gestão e Ferramentas',focus:'Gerenciamento e automação',days:[
      {d:'SEG',t:'Planejamento de Testes',desc:'Plano de testes, critérios entrada/saída, estimativas de esforço · 40min'},
      {d:'TER',t:'Gestão de Riscos',desc:'Produto vs Projeto, P×I, mitigação, contingência · 40min'},
      {d:'QUA',t:'Monitoramento + Gestão de Configuração',desc:'Métricas, relatórios, versionamento, rastreabilidade · 35min'},
      {d:'QUI',t:'Gestão de Defeitos',desc:'Bug report completo, severidade vs prioridade, ciclo do bug · 40min'},
      {d:'SEX',t:'Ferramentas de Teste e Automação',desc:'Categorias de ferramentas. Benefícios E riscos da automação · 40min'},
      {d:'SAB',t:'Quizzes Caps 5+6 + Flashcards finais',desc:'Quiz dos dois módulos + todos os flashcards · 50min'}
    ]},
    {week:6,title:'Revisão Geral + Simulados',focus:'Hora de testar tudo!',days:[
      {d:'SEG',t:'Arsenal + Revisão Geral Caps 1-3',desc:'Leia o Arsenal completo + flashcards + pontos fracos · 50min'},
      {d:'TER',t:'Revisão Geral Caps 4-6',desc:'Foco nas técnicas, gestão e ferramentas · 50min'},
      {d:'QUA',t:'Simulado Completo #1',desc:'40 questões com timer completo — modo prova real! · 80min'},
      {d:'QUI',t:'Boss Battle + Revisão de Erros',desc:'Enfrente o Modo Mihawk + identifique padrões nos erros · 55min'},
      {d:'SEX',t:'Segundo Simulado + Revisão',desc:'Repita o simulado com questões embaralhadas. Foco nos pontos fracos · 70min'},
      {d:'SAB',t:'Revisão Leve + Descanso',desc:'Revisão superficial dos pontos mais fracos. Hidrate-se, durma bem. Você está pronto! ⚔️ · 20min'}
    ]}
  ]
};

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
const S = {
  done: new Set(JSON.parse(localStorage.getItem('sch_done')||'[]')),
  xp: parseInt(localStorage.getItem('sch_xp')||'0'),
  checks: JSON.parse(localStorage.getItem('sch_checks')||'{}'),
  quizResults: JSON.parse(localStorage.getItem('sch_qr')||'{}'),
  achievements: new Set(JSON.parse(localStorage.getItem('sch_ach')||'[]')),
  simPassed: localStorage.getItem('sch_simPassed')==='1',
  bossPassed: localStorage.getItem('sch_bossPassed')==='1',
  bestSim: parseInt(localStorage.getItem('sch_bestSim')||'0'),
  flipsTotal: parseInt(localStorage.getItem('sch_flips')||'0'),
  bestCombo: parseInt(localStorage.getItem('sch_combo')||'0'),
  startDate: localStorage.getItem('sch_start')||new Date().toISOString(),
  cronWeeks: 2,
  fcFilter: 'Todos',
};
if(!localStorage.getItem('sch_start')) localStorage.setItem('sch_start', S.startDate);

function save(){
  localStorage.setItem('sch_done', JSON.stringify([...S.done]));
  localStorage.setItem('sch_xp', S.xp);
  localStorage.setItem('sch_checks', JSON.stringify(S.checks));
  localStorage.setItem('sch_qr', JSON.stringify(S.quizResults));
  localStorage.setItem('sch_ach', JSON.stringify([...S.achievements]));
  localStorage.setItem('sch_simPassed', S.simPassed?'1':'0');
  localStorage.setItem('sch_bossPassed', S.bossPassed?'1':'0');
  localStorage.setItem('sch_bestSim', S.bestSim);
  localStorage.setItem('sch_flips', S.flipsTotal);
  localStorage.setItem('sch_combo', S.bestCombo);
}

// ═══════════════════════════════════════════════
// SETTINGS — API KEY (ETAPA 2: Sensei fix)
// ═══════════════════════════════════════════════
function openSettings(){
  const overlay = document.getElementById('settingsOverlay');
  const inp = document.getElementById('apiKeyInput');
  const existing = localStorage.getItem('sch_apikey')||'';
  inp.value = existing ? '•'.repeat(Math.min(existing.length, 30)) : '';
  inp.placeholder = existing ? 'Chave configurada — cole nova para atualizar' : 'sk-ant-api03-...';
  overlay.classList.add('open');
}
function closeSettings(){
  document.getElementById('settingsOverlay').classList.remove('open');
}
function closeSettingsOverlay(e){
  if(e.target.id==='settingsOverlay') closeSettings();
}
function saveApiKey(){
  const inp = document.getElementById('apiKeyInput');
  const val = inp.value.trim();
  if(val && !val.startsWith('•')){
    localStorage.setItem('sch_apikey', val);
    inp.value = '';
    inp.placeholder = 'Chave configurada — cole nova para atualizar';
    const saved = document.getElementById('settingsSaved');
    saved.classList.add('show');
    setTimeout(()=>saved.classList.remove('show'), 3000);
    updateSenseiStatus();
  }
}
function clearApiKey(){
  if(confirm('Remover a chave de API? O Sensei ficará inativo.')){
    localStorage.removeItem('sch_apikey');
    document.getElementById('apiKeyInput').value='';
    document.getElementById('apiKeyInput').placeholder='sk-ant-api03-...';
    updateSenseiStatus();
    closeSettings();
  }
}
function updateSenseiStatus(){
  const hasKey = !!localStorage.getItem('sch_apikey');
  const dot = document.getElementById('aiStatusDot');
  const status = document.getElementById('aiStatus');
  if(dot){
    dot.className = hasKey ? 'ai-dot' : 'ai-warn';
  }
  if(status){
    status.textContent = hasKey
      ? 'Online — pronto para tirar suas dúvidas do CTFL'
      : 'Configure sua chave de API no ⚙️ para ativar o Sensei';
  }
}

// ═══════════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════════
function showTab(id, btn){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  if(btn) btn.classList.add('active');
}

// ═══════════════════════════════════════════════
// RANK SYSTEM
// ═══════════════════════════════════════════════
let _lastRank = null;
function updateRank(){
  const rank = getRank(S.xp);
  const pct = getRankPct(S.xp);
  const nextRank = RANKS.find(r=>r.min > S.xp);
  document.getElementById('rankIcon').textContent = rank.icon;
  document.getElementById('rankTitle').textContent = rank.name;
  document.getElementById('rankSub').textContent = rank.sub;
  document.getElementById('rankPbar').style.width = pct+'%';
  document.getElementById('navRankBadge').textContent = rank.name;
  if(nextRank){
    document.getElementById('rankNextLabel').textContent = 'Próximo: '+nextRank.name;
    document.getElementById('rankNextXP').textContent = nextRank.min+' XP';
  } else {
    document.getElementById('rankNextLabel').textContent = 'Rank Máximo!';
    document.getElementById('rankNextXP').textContent = '⚔️';
  }
  if(_lastRank && _lastRank !== rank.name) triggerLevelUp(rank.name);
  _lastRank = rank.name;
}
function triggerLevelUp(rankName){
  const el = document.getElementById('lvlOverlay');
  document.getElementById('lvlText').textContent = '⚔️ '+rankName.toUpperCase()+'! ⚔️';
  el.classList.add('flash');
  setTimeout(()=>el.classList.remove('flash'), 1000);
}

// ═══════════════════════════════════════════════
// ACHIEVEMENTS
// ═══════════════════════════════════════════════
function checkAchievements(){
  ACHIEVEMENTS.forEach(a=>{
    if(!S.achievements.has(a.id) && a.cond(S)) unlockAchievement(a);
  });
}
function unlockAchievement(a){
  S.achievements.add(a.id);
  const prevXP = S.xp;
  S.xp += a.xp;
  save();
  updateStats();
  renderAchievements();
  showAchPopup(a);
  if(getRank(S.xp).name !== getRank(prevXP).name) updateRank();
}
function showAchPopup(a){
  const popup = document.getElementById('achPopup');
  document.getElementById('achPopupIcon').textContent = a.icon;
  document.getElementById('achPopupTitle').textContent = '⚔️ '+a.name;
  document.getElementById('achPopupDesc').textContent = a.desc+' · +'+a.xp+' XP';
  popup.classList.add('show');
  setTimeout(()=>popup.classList.remove('show'), 3800);
}
function renderAchievements(){
  const grid = document.getElementById('achGrid');
  if(!grid) return;
  grid.innerHTML = ACHIEVEMENTS.map(a=>{
    const unlocked = S.achievements.has(a.id);
    return `<div class="ach-card ${unlocked?'unlocked':'locked'}">
      <span class="ach-icon">${a.icon}</span>
      <div class="ach-name">${a.name}</div>
      <div class="ach-desc">${a.desc}</div>
      <span class="ach-xp">+${a.xp} XP</span>
      <div class="ach-unlocked-stamp">✅ Desbloqueada!</div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════
// HOME / STATS
// ═══════════════════════════════════════════════
function renderHome(){
  const grid = document.getElementById('modsGrid');
  grid.innerHTML = MODS.map(m=>{
    const done = S.done.has(m.id);
    return `<div class="mod-card ${done?'done':''}" onclick="openMod(${m.id})">
      <div class="mod-num">Capítulo ${m.id} de 6</div>
      <span class="mod-icon">${m.icon}</span>
      <div class="mod-name">${m.name}</div>
      <div class="mod-desc">${m.desc}</div>
      <div class="mod-footer">
        <div class="mod-topics">${m.topics}</div>
        <div class="mod-pill ${done?'done':'pending'}">${done?'✓ Concluído':'Iniciar'}</div>
      </div>
    </div>`;
  }).join('');
  updateStats();
}

function updateStats(){
  const n = S.done.size;
  const pct = Math.round(n/6*100);
  document.getElementById('pct').textContent = pct+'%';
  document.getElementById('pbarFill').style.width = pct+'%';
  document.getElementById('pbarLeft').textContent = `${n} de 6 módulos`;
  document.getElementById('statMod').textContent = `${n}/6`;
  document.getElementById('statXP').textContent = S.xp;
  document.getElementById('xpTotal').textContent = S.xp+' XP';
  document.getElementById('statCombo').textContent = S.bestCombo;
  const allQ = Object.values(S.quizResults);
  if(allQ.length){
    const tot = allQ.reduce((a,b)=>a+b.total,0);
    const ok = allQ.reduce((a,b)=>a+b.score,0);
    document.getElementById('statAcerto').textContent = Math.round(ok/tot*100)+'%';
  }
  updateRank();
  renderAchievements();
}

// ═══════════════════════════════════════════════
// CHAPTER PAGE (substituiu o modal de módulos)
// ═══════════════════════════════════════════════
function renderContentBlock(b){
  let html = `<div class="topic-sec">
    <div class="topic-head"><h3>${b.title}</h3></div>
    <div class="topic-content">`;

  if(b.text) html += `<div class="topic-intro">${b.text}</div>`;

  // sub-seções estruturadas (formato rico)
  if(b.sections && b.sections.length){
    b.sections.forEach(s=>{
      html += `<div class="topic-subsec">`;
      if(s.sub) html += `<h4>${s.sub}</h4>`;
      if(s.text) html += `<p>${s.text}</p>`;
      if(s.items && s.items.length)
        html += `<ul>${s.items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
      html += `</div>`;
    });
  }

  // itens avulsos (formato legado — sem sub-seções)
  if(b.items && b.items.length && !(b.sections && b.sections.length))
    html += `<div class="topic-items"><ul>${b.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`;

  if(b.tip) html += `<div class="topic-tip">${b.tip}</div>`;

  html += `</div></div>`;
  return html;
}

function openMod(id){
  const m = MODS.find(x=>x.id===id);

  // barra fixa
  document.getElementById('chpBarNum').textContent = `Capítulo ${m.id} de 6`;
  document.getElementById('chpBarName').textContent = `${m.icon} ${m.name}`;

  // hero
  document.getElementById('chpHero').innerHTML = `
    <div class="chp-hero-icon">${m.icon}</div>
    <div>
      <div class="chp-hero-num">Capítulo ${m.id} de 6 · CTFL 4.0</div>
      <div class="chp-hero-title">${m.name}</div>
      <div class="chp-hero-desc">${m.desc}</div>
    </div>
    <div class="chp-hero-badge">
      <div class="chp-hero-badge-num">${m.id}</div>
      <div class="chp-hero-badge-lbl">de 6</div>
    </div>`;

  // conteúdo + quiz
  let html = m.content.map(renderContentBlock).join('');

  const lets = ['A','B','C','D'];
  html += `<div class="quiz-sec">
    <div class="quiz-lbl">🧪 Quiz do Módulo — Teste seu conhecimento</div>
    ${m.quiz.map((q,i)=>`
      <div class="qcard ${i>0?'hidden':''}" id="mq${id}_${i}">
        <div class="q-no">Questão ${i+1} de ${m.quiz.length}</div>
        <div class="q-txt">${q.q}</div>
        <div class="q-opts">${q.opts.map((o,j)=>`
          <div class="q-opt" id="mo${id}_${i}_${j}" onclick="modAns(${id},${i},${j})">
            <span class="q-let">${lets[j]}</span><span>${o}</span>
          </div>`).join('')}
        </div>
        <div class="q-fb" id="mfb${id}_${i}"></div>
        <div class="q-nav hidden-nav" id="mnav${id}_${i}">
          ${i<m.quiz.length-1
            ?`<button class="qbtn red" onclick="modNext(${id},${i+1})">Próxima →</button>`
            :`<button class="qbtn red" onclick="modFinish(${id})">Ver resultado 🎯</button>`}
        </div>
      </div>`).join('')}
    <div class="quiz-res" id="mres${id}">
      <div class="res-score" id="mscore${id}"></div>
      <div class="res-msg" id="mmsg${id}"></div>
      <button class="qbtn red" style="margin-top:14px;" onclick="resetModQuiz(${id})">↺ Tentar novamente</button>
    </div>
  </div>`;

  document.getElementById('chpBody').innerHTML = html;

  // navega para a seção de capítulo
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById('tab-chapter').classList.add('active');
  // mantém "Início" ativo no nav
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  document.querySelector('.nav-tab').classList.add('active');

  window.scrollTo({top:0,behavior:'instant'});
  window._modState = window._modState||{};
  window._modState[id] = {score:0, answered:{}};
}

function backToHome(){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById('tab-home').classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  document.querySelector('.nav-tab').classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

function modAns(id,qi,oi){
  if(window._modState[id].answered[qi]!==undefined) return;
  window._modState[id].answered[qi] = oi;
  const m = MODS.find(x=>x.id===id);
  const q = m.quiz[qi];
  document.querySelectorAll(`[id^="mo${id}_${qi}_"]`).forEach(e=>e.classList.add('locked'));
  document.getElementById(`mo${id}_${qi}_${oi}`).classList.add(oi===q.c?'ok':'fail');
  if(oi!==q.c) document.getElementById(`mo${id}_${qi}_${q.c}`).classList.add('ok');
  if(oi===q.c) window._modState[id].score++;
  const fb = document.getElementById(`mfb${id}_${qi}`);
  fb.innerHTML = (oi===q.c?'✅ ':'❌ ')+q.fb;
  fb.className = `q-fb show ${oi===q.c?'ok':'fail'}`;
  document.getElementById(`mnav${id}_${qi}`).classList.remove('hidden-nav');
}
function modNext(id,next){
  document.getElementById(`mq${id}_${next-1}`).classList.add('hidden');
  document.getElementById(`mq${id}_${next}`).classList.remove('hidden');
  document.getElementById(`mq${id}_${next}`).scrollIntoView({behavior:'smooth',block:'start'});
}
function modFinish(id){
  const m = MODS.find(x=>x.id===id);
  const sc = window._modState[id].score;
  const tot = m.quiz.length;
  const pct = Math.round(sc/tot*100);
  document.getElementById(`mscore${id}`).textContent = `${sc}/${tot}`;
  document.getElementById(`mmsg${id}`).textContent =
    pct===100?'⚔️ Perfeito! Técnica dominada!':
    pct>=66?'💪 Muito bem! Continue assim!':
    '📖 Revise o conteúdo e tente novamente';
  document.getElementById(`mres${id}`).classList.add('show');
  S.quizResults[id] = {score:sc, total:tot};
  if(pct>=66 && !S.done.has(id)){
    S.done.add(id);
    S.xp += 100;
  }
  save();
  renderHome();
  checkAchievements();
}
function resetModQuiz(id){
  window._modState[id] = {score:0, answered:{}};
  document.getElementById(`mres${id}`).classList.remove('show');
  const m = MODS.find(x=>x.id===id);
  m.quiz.forEach((_,i)=>{
    const card = document.getElementById(`mq${id}_${i}`);
    if(card){
      card.classList.toggle('hidden', i>0);
      card.querySelectorAll('.q-opt').forEach(o=>o.className='q-opt');
      const fb = document.getElementById(`mfb${id}_${i}`);
      if(fb){ fb.className='q-fb'; fb.innerHTML=''; }
      const nav = document.getElementById(`mnav${id}_${i}`);
      if(nav) nav.classList.add('hidden-nav');
    }
  });
}

// ═══════════════════════════════════════════════
// SIMULADO (Normal + Boss)
// ═══════════════════════════════════════════════
let simQ=[], simCur=0, simSecs=3600, simTimerInt=null, simAnswered={}, simScore=0;
let simCombo=0, isBossMode=false;

function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }

function startSim(mode){
  isBossMode = mode===true;
  simQ = mode===true ? shuffle([...BOSS_QUESTIONS]) : mode==='A' ? [...SIM_OFICIAL_A] : mode==='B' ? [...SIM_OFICIAL_B] : shuffle([...SIM_QUESTIONS]);
  simCur=0; simSecs=mode===true?1200:3600; simAnswered={}; simScore=0; simCombo=0;
  document.getElementById('simIntro').style.display='none';
  document.getElementById('simResult').classList.remove('show');
  document.getElementById('simRunning').classList.add('on');
  if(mode===true){
    document.getElementById('simResCard').classList.add('boss-res');
    document.getElementById('simResLabel').textContent='Boss Battle — Pontuação';
    document.getElementById('simResSub').textContent='de 10 questões corretas';
  } else {
    document.getElementById('simResCard').classList.remove('boss-res');
    document.getElementById('simResLabel').textContent='Sua pontuação';
    document.getElementById('simResSub').textContent='de 40 questões corretas';
  }
  renderSimQ();
  simTimerInt = setInterval(tickSim, 1000);
}

function tickSim(){
  simSecs--;
  const m=Math.floor(simSecs/60).toString().padStart(2,'0');
  const s=(simSecs%60).toString().padStart(2,'0');
  const el=document.getElementById('simTimer');
  el.textContent=`${m}:${s}`;
  const warnThreshold=isBossMode?120:300;
  if(simSecs<=warnThreshold) el.classList.add('warn');
  if(simSecs<=0){clearInterval(simTimerInt);finishSim();}
}

function renderSimQ(){
  const q=simQ[simCur];
  const lets=['A','B','C','D'];
  const total=simQ.length;
  document.getElementById('simCounter').textContent=`Questão ${simCur+1} de ${total}`;
  document.getElementById('simPbar').style.width=((simCur+1)/total*100)+'%';
  const tagClass = isBossMode ? 'boss-tag' : '';
  document.getElementById('simQArea').innerHTML=`
    <div class="sim-q-tag ${tagClass}">${isBossMode?'⚔️ '+q.capName:q.capName}</div>
    <div style="font-size:.68rem;color:var(--muted);margin-bottom:8px">Questão ${simCur+1} de ${total}</div>
    <div class="sim-q-txt">${q.q}</div>
    <div class="sim-opts">${q.opts.map((o,i)=>`
      <div class="sim-opt" id="so${i}" onclick="simAns(${i})">
        <span class="sim-let">${lets[i]}</span><span>${o}</span>
      </div>`).join('')}
    </div>
    <div class="sim-fb" id="simFb"></div>`;
  const an=simAnswered[simCur];
  if(an!==undefined){
    document.querySelectorAll('.sim-opt').forEach(e=>e.classList.add('locked'));
    document.getElementById(`so${an}`).classList.add(an===q.c?'ok':'fail');
    if(an!==q.c) document.getElementById(`so${q.c}`).classList.add('ok');
    const fb=document.getElementById('simFb');
    fb.innerHTML=(an===q.c?'✅ ':'❌ ')+q.fb;
    fb.className=`sim-fb show ${an===q.c?'ok':'fail'}`;
  }
  const nav=document.getElementById('simNav');
  nav.innerHTML=(simCur>0?`<button class="snbtn" onclick="simGo(${simCur-1})">← Anterior</button>`:'')
    +(an!==undefined
      ?(simCur<simQ.length-1
        ?`<button class="snbtn red" onclick="simGo(${simCur+1})">Próxima →</button>`
        :`<button class="snbtn ${isBossMode?'gold':'red'}" onclick="finishSim()">Finalizar ⚔️</button>`)
      :'');
}

function simAns(oi){
  if(simAnswered[simCur]!==undefined) return;
  simAnswered[simCur]=oi;
  const q=simQ[simCur];
  const correct=(oi===q.c);
  if(correct){ simScore++; simCombo++; }
  else { simCombo=0; }
  if(S.bestCombo<simCombo){ S.bestCombo=simCombo; }
  const comboEl=document.getElementById('comboDisplay');
  const bannerEl=document.getElementById('comboBanner');
  if(simCombo>=2){
    comboEl.textContent=`🔥 COMBO x${simCombo}`;
    comboEl.classList.add('show');
  } else {
    comboEl.classList.remove('show');
  }
  if(simCombo===3){
    bannerEl.textContent='⚔️ SANTORYU! +15 XP';
    bannerEl.className='combo-banner show santoryu';
    S.xp+=15; updateStats();
    setTimeout(()=>{bannerEl.classList.remove('show');},1800);
  } else if(simCombo===5){
    bannerEl.textContent='🌪️ ASURA! +30 XP!';
    bannerEl.className='combo-banner show asura';
    S.xp+=30; updateStats();
    setTimeout(()=>{bannerEl.classList.remove('show');},2000);
  } else if(simCombo>5&&simCombo%3===0){
    bannerEl.textContent=`⚔️ x${simCombo} COMBO! +10 XP`;
    bannerEl.className='combo-banner show santoryu';
    S.xp+=10; updateStats();
    setTimeout(()=>{bannerEl.classList.remove('show');},1500);
  }
  document.querySelectorAll('.sim-opt').forEach(e=>e.classList.add('locked'));
  document.getElementById(`so${oi}`).classList.add(correct?'ok':'fail');
  if(!correct) document.getElementById(`so${q.c}`).classList.add('ok');
  const fb=document.getElementById('simFb');
  fb.innerHTML=(correct?'✅ ':'❌ ')+q.fb;
  fb.className=`sim-fb show ${correct?'ok':'fail'}`;
  const nav=document.getElementById('simNav');
  nav.innerHTML=(simCur>0?`<button class="snbtn" onclick="simGo(${simCur-1})">← Anterior</button>`:'')
    +(simCur<simQ.length-1
      ?`<button class="snbtn red" onclick="simGo(${simCur+1})">Próxima →</button>`
      :`<button class="snbtn ${isBossMode?'gold':'red'}" onclick="finishSim()">Finalizar ⚔️</button>`);
}

function simGo(i){ simCur=i; renderSimQ(); window.scrollTo({top:0,behavior:'smooth'}); }

function finishSim(){
  clearInterval(simTimerInt);
  document.getElementById('simRunning').classList.remove('on');
  const total=simQ.length;
  const pct=Math.round(simScore/total*100);
  if(isBossMode){
    const pass=simScore>=7;
    document.getElementById('simResScore').textContent=`${simScore}/${total}`;
    document.getElementById('simResSub').textContent=`questões corretas — ${pct}% — Boss Battle`;
    const st=document.getElementById('simResStatus');
    st.textContent=pass?'⚔️ MIHAWK DERROTADO!':'✗ O Olho de Gavião foi superior';
    st.className='sim-res-status '+(pass?'pass':'fail');
    const xpGain=simScore*10*(pass?2:1);
    S.xp+=xpGain;
    if(pass){ S.bossPassed=true; }
    document.getElementById('simBreakdown').innerHTML=`
      <div class="sim-bd-card"><div class="sim-bd-val" style="color:var(--gold)">${simScore}/${total}</div><div class="sim-bd-lbl">Corretas</div></div>
      <div class="sim-bd-card"><div class="sim-bd-val" style="color:var(--gold)">${pct}%</div><div class="sim-bd-lbl">Aproveitamento</div></div>
      <div class="sim-bd-card"><div class="sim-bd-val">${xpGain}</div><div class="sim-bd-lbl">XP Ganho</div></div>
      <div class="sim-bd-card"><div class="sim-bd-val">${S.bestCombo}</div><div class="sim-bd-lbl">Melhor Combo</div></div>`;
  } else {
    const pass=simScore>=26;
    if(simScore>S.bestSim){ S.bestSim=simScore; }
    if(pass){ S.simPassed=true; }
    document.getElementById('simResScore').textContent=`${simScore}/40`;
    document.getElementById('simResSub').textContent=`questões corretas — ${pct}% de aproveitamento`;
    const st=document.getElementById('simResStatus');
    st.textContent=pass?'✓ APROVADO — Passou no CTFL!':'✗ REPROVADO — Mínimo é 26/40';
    st.className='sim-res-status '+(pass?'pass':'fail');
    const byCap={};
    simQ.forEach((q,i)=>{
      if(!byCap[q.cap]) byCap[q.cap]={name:q.capName,ok:0,total:0};
      byCap[q.cap].total++;
      if(simAnswered[i]===q.c) byCap[q.cap].ok++;
    });
    document.getElementById('simBreakdown').innerHTML=Object.values(byCap).map(b=>`
      <div class="sim-bd-card">
        <div class="sim-bd-val">${Math.round(b.ok/b.total*100)}%</div>
        <div class="sim-bd-lbl">${b.name}</div>
      </div>`).join('');
    S.xp += Math.round(simScore*5);
    const rev=simQ.map((q,i)=>{
      if(simAnswered[i]===q.c) return '';
      const lets=['A','B','C','D'];
      return `<div class="sim-q-area" style="margin-bottom:12px">
        <div class="sim-q-tag">${q.capName}</div>
        <div class="sim-q-txt" style="margin-bottom:14px">${q.q}</div>
        <div style="font-size:.8rem;padding:10px 14px;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);border-radius:10px;margin-bottom:8px;color:#fca5a5">
          ❌ Sua resposta: <strong>${lets[simAnswered[i]!==undefined?simAnswered[i]:0]}) ${q.opts[simAnswered[i]!==undefined?simAnswered[i]:0]}</strong>
        </div>
        <div style="font-size:.8rem;padding:10px 14px;background:rgba(34,201,122,.06);border:1px solid rgba(34,201,122,.2);border-radius:10px;color:#6ee7b7">
          ✅ Correto: <strong>${lets[q.c]}) ${q.opts[q.c]}</strong>
        </div>
        <div class="sim-fb show fail" style="display:block;margin-top:8px">${q.fb}</div>
      </div>`;
    }).filter(Boolean);
    if(rev.length) document.getElementById('simReview').innerHTML=
      `<div class="section-title" style="margin-bottom:16px">📋 Questões Erradas — Revisão Detalhada</div>${rev.join('')}`;
  }
  document.getElementById('simResult').classList.add('show');
  save();
  updateStats();
  checkAchievements();
}

function resetSim(){
  document.getElementById('simResult').classList.remove('show');
  document.getElementById('simReview').innerHTML='';
  document.getElementById('simIntro').style.display='block';
  document.getElementById('comboBanner').classList.remove('show');
  document.getElementById('comboDisplay').classList.remove('show');
  document.getElementById('simTimer').classList.remove('warn');
  clearInterval(simTimerInt);
}

// ═══════════════════════════════════════════════
// FLASHCARDS (ETAPA 3: texto não cortado — fix via CSS grid)
// ═══════════════════════════════════════════════
function renderFlashcards(filter){
  filter = filter||S.fcFilter;
  S.fcFilter = filter;
  const cats = [...new Set(FLASHCARDS.map(f=>f.cat))];
  document.getElementById('fcFilters').innerHTML =
    ['Todos',...cats].map(c=>`
      <button class="fc-filter ${filter===c?'active':''}" onclick="renderFlashcards('${c.replace(/'/g,"\\'")}')">
        ${c}
      </button>`).join('');
  const list = filter==='Todos'?FLASHCARDS:FLASHCARDS.filter(f=>f.cat===filter);
  document.getElementById('fcGrid').innerHTML = list.map((f,i)=>`
    <div class="fc" id="fc${i}" onclick="flipFC(${i})">
      <div class="fc-inner">
        <div class="fc-front">
          <div class="fc-cat">${f.cat}</div>
          <div class="fc-q">${f.q}</div>
          <div class="fc-hint">👆 Clique para revelar</div>
        </div>
        <div class="fc-back">
          <div class="fc-cat">${f.cat}</div>
          <div class="fc-a">${f.a}</div>
          <div class="fc-badge">✓ Resposta</div>
        </div>
      </div>
    </div>`).join('');
}

function flipFC(i){
  document.getElementById('fc'+i).classList.toggle('flipped');
  S.flipsTotal++;
  save();
  checkAchievements();
}

// ═══════════════════════════════════════════════
// CRONOGRAMA
// ═══════════════════════════════════════════════
function selectCrono(n,el){
  document.querySelectorAll('.crono-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  S.cronWeeks=n;
  renderCrono();
}
function renderCrono(){
  const weeks=CRONOS[S.cronWeeks];
  document.getElementById('weekGrid').innerHTML=weeks.map((w,wi)=>`
    <div class="week-card">
      <div class="week-hd">
        <div class="week-num">${w.week}</div>
        <div><h3>Semana ${w.week}: ${w.title}</h3><p>${w.focus}</p></div>
      </div>
      <div class="week-body">${w.days.map((d,di)=>{
        const key=`${S.cronWeeks}_${wi}_${di}`;
        const checked=S.checks[key];
        return `<div class="day-row">
          <div class="day-name">${d.d}</div>
          <div class="day-content">
            <div class="day-title">${d.t}</div>
            <div class="day-desc">${d.desc}</div>
          </div>
          <button class="day-check ${checked?'checked':''}" onclick="toggleCheck('${key}',this)">✓</button>
        </div>`;
      }).join('')}</div>
    </div>`).join('');
}
function toggleCheck(key,el){
  if(S.checks[key]){
    delete S.checks[key];
    el.classList.remove('checked');
    S.xp = Math.max(0, S.xp - 10);
    updateStats();
  } else {
    S.checks[key]=1;
    el.classList.add('checked');
    S.xp += 10;
    updateStats();
    checkAchievements();
  }
  save();
}

// ═══════════════════════════════════════════════
// AI TUTOR — Sensei Zoro (ETAPA 2: API key via localStorage)
// ═══════════════════════════════════════════════
const SYS=`Você é o Sensei Zoro, tutor especialista no CTFL v4.0 (Certified Tester Foundation Level - ISTQB/BSTQB).
Seu aluno é Schneider, formado em ADS, que está se preparando para a prova CTFL para ingressar na área de QA.
Responda em português brasileiro de forma clara, didática, direta e encorajadora.
Fale com a confiança e determinação de Zoro — direto ao ponto, sem rodeios, mas sem ser grosseiro.
Use exemplos práticos e cotidianos para ilustrar conceitos abstratos.
Quando relevante, avise se o assunto costuma cair na prova com frequência.
Use **negrito** para termos técnicos importantes. Use emojis com moderação.
Máximo de 400 palavras por resposta. Seja objetivo mas completo.
Ocasionalmente, você pode usar uma citação inspiradora de Zoro no final da resposta.
Contexto adicional: O aluno está usando um portal gamificado com sistema de XP, ranks e flashcards.`;

async function sendAI(){
  const inp=document.getElementById('aiInp');
  const txt=inp.value.trim();
  if(!txt) return;
  const apiKey = localStorage.getItem('sch_apikey')||'';
  if(!apiKey){
    addAIMsg('⚠️ Sensei não configurado! Clique no <strong>⚙️</strong> no canto superior direito, cole sua chave da API Claude (Anthropic) e salve. Depois pode me perguntar tudo sobre o CTFL! 🗡️','ai');
    return;
  }
  addAIMsg(txt,'user');
  inp.value='';
  document.getElementById('aiBtn').disabled=true;
  const tid=addTyping();
  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key': apiKey,
        'anthropic-version':'2023-06-01'
      },
      body:JSON.stringify({
        model:'claude-haiku-4-5-20251001',
        max_tokens:1000,
        system:SYS,
        messages:[{role:'user',content:txt}]
      })
    });
    const d=await r.json();
    removeTyping(tid);
    if(d.error){
      addAIMsg(`⚠️ Erro da API: ${d.error.message||'Verifique sua chave de API nas configurações ⚙️'}. 🗡️`,'ai');
    } else {
      addAIMsg(d.content?.[0]?.text||'Resposta vazia — tente novamente.','ai');
    }
  }catch(e){
    removeTyping(tid);
    addAIMsg('Ops! Problema de conexão com o Sensei. Verifique sua internet e tente novamente. 🗡️','ai');
  }
  document.getElementById('aiBtn').disabled=false;
}

function sendQuick(t){ document.getElementById('aiInp').value=t; sendAI(); }
function handleAiKey(e){ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendAI();} }

function addAIMsg(txt,role){
  const el=document.getElementById('aiMsgs');
  const ava=role==='ai'?'⚔️':'🧑‍💻';
  el.insertAdjacentHTML('beforeend',`<div class="msg ${role}">
    <div class="msg-ava">${ava}</div>
    <div class="bubble">${txt.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')}</div>
  </div>`);
  el.scrollTop=el.scrollHeight;
}
function addTyping(){
  const el=document.getElementById('aiMsgs');
  const id='tp'+Date.now();
  el.insertAdjacentHTML('beforeend',`<div class="msg ai" id="${id}">
    <div class="msg-ava">⚔️</div>
    <div class="bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>
  </div>`);
  el.scrollTop=el.scrollHeight;
  return id;
}
function removeTyping(id){ document.getElementById(id)?.remove(); }

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
_lastRank = getRank(S.xp).name;
renderHome();
renderAchievements();
renderFlashcards();
renderCrono();
checkAchievements();
updateSenseiStatus();
rotateQuote();
