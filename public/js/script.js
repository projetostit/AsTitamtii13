$(document).ready(function () {

    // ── Carrossel de fotos ──
    $('.fotos_carrossel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    });

    // ── Carrossel #track (só se existir) ──
    if ($('#track').length) {
        $('#track').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            prevArrow: $('#btnAnterior'),
            nextArrow: $('#btnProximo'),
            dots: true,
            appendDots: $('#dots'),
            responsive: [
                { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }
            ]
        });
    }

    // ── Menu hambúrguer ──
    $('#btnMenu').on('click', function () {
        const aberto = $('#menu').toggleClass('aberto').hasClass('aberto');
        $(this).attr('aria-expanded', aberto);
    });

    // Fecha ao clicar em um link (sem preventDefault, para o link navegar)
    $('#menu a').on('click', function () {
        $('#menu').removeClass('aberto');
        $('#btnMenu').attr('aria-expanded', 'false');
    });

});

/**
 * Carrossel de Atividades — ElasTitam
 * =====================================
 * v2 — Corrige: botões fora dos cards, paginação em grupos de 3,
 *      filtro visível só em mobile, carrossel só em desktop.
 *
 * Estilos: carrossel-atividades.css  ← deve ser carregado no <head>
 *
 * Estrutura esperada no HTML:
 *   .filtro-atividades-mobile   ← container do <select> de mês
 *   .atividades-carrossel       ← wrapper externo
 *     .atividades-trilha        ← faixa com todos os cards
 *       .atividades-card[data-month="MM/YYYY"]  ← cada card
 *
 * Os botões prev/next são criados pelo script e injetados como
 * irmãos da trilha dentro de .atividades-carrossel, formando
 * um layout flex de 3 colunas: [btn] [trilha/viewport] [btn].
 * Isso garante que nenhum botão sobreponha card algum.
 *
 * Dependências: nenhuma (Vanilla JS puro).
 */

(function () {
  'use strict';

  // ─── Constantes ──────────────────────────────────────────────────────────────

  const DESKTOP_BREAKPOINT    = 900;   // px — igual ou abaixo → mobile
  const CARDS_PER_VIEW        = 3;     // cards exibidos por "página"
  const TRANSITION_MS         = 380;   // duração da transição da trilha

  // ─── Estado ──────────────────────────────────────────────────────────────────

  /**
   * Índice da PÁGINA atual (0-based).
   * Uma "página" = CARDS_PER_VIEW cards consecutivos do array filtrado.
   */
  let paginaAtual   = 0;

  /** Array de cards que passaram pelo filtro de mês (ou todos, se "Todos"). */
  let cardsFiltrados = [];

  /** true quando o carrossel está operando em modo desktop. */
  let carrosselAtivo = false;

  // ─── Referências ao DOM ───────────────────────────────────────────────────────

  const trilha          = document.querySelector('.atividades-trilha');
  const carrosselWrapper = document.querySelector('.atividades-carrossel');
  const filtroContainer  = document.querySelector('.filtro-atividades-mobile');
  const filtroMes        = document.getElementById('monthFilter');

  if (!trilha || !carrosselWrapper) {
    console.warn('[Carrossel] Elementos obrigatórios não encontrados no DOM.');
    return;
  }

  // ─── Criação dos botões de navegação ─────────────────────────────────────────
  //
  // Os botões são inseridos como filhos diretos de .atividades-carrossel,
  // ao lado da trilha. O CSS faz .atividades-carrossel virar flex,
  // reservando espaço fixo para cada botão. Nenhum z-index é necessário.

  function criarBotao(direcao) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('carrossel-btn', `carrossel-btn--${direcao}`);
    btn.setAttribute('aria-label', direcao === 'prev' ? 'Grupo anterior' : 'Próximo grupo');
    btn.innerHTML = direcao === 'prev'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';
    return btn;
  }

  const btnPrev = criarBotao('prev');
  const btnNext = criarBotao('next');

  // Injeta na ordem: [btnPrev] [trilha já existente] [btnNext]
  carrosselWrapper.insertBefore(btnPrev, trilha);
  carrosselWrapper.appendChild(btnNext);

  // ─── Criação do viewport ──────────────────────────────────────────────────────
  //
  // Envolve a trilha existente num div.carrossel-viewport para poder
  // aplicar overflow:hidden sem afetar o elemento pai que agora é flex.

  function garantirViewport() {
    // Evita recriar se já existe (ex: hot-reload em dev)
    if (carrosselWrapper.querySelector('.carrossel-viewport')) return;

    const viewport = document.createElement('div');
    viewport.classList.add('carrossel-viewport');

    // Move a trilha para dentro do viewport
    carrosselWrapper.insertBefore(viewport, trilha);
    viewport.appendChild(trilha);
  }

  // ─── Lógica de paginação ──────────────────────────────────────────────────────

  /** Total de páginas possíveis dado o array filtrado atual. */
  function totalPaginas() {
    return Math.ceil(cardsFiltrados.length / CARDS_PER_VIEW);
  }

  /**
   * Recalcula cardsFiltrados com base no valor atual do filtro de mês.
   * Usa aria-hidden para mostrar/ocultar sem remover do DOM.
   */
  function aplicarFiltro(mes) {
    const todos = Array.from(trilha.querySelectorAll('.atividades-card'));

    todos.forEach(card => {
      const mesCard = card.getAttribute('data-month');
      const visivel = mes === 'all' || mesCard === mes;
      card.setAttribute('aria-hidden', visivel ? 'false' : 'true');
    });

    // Recalcula lista de cards que passaram no filtro
    cardsFiltrados = todos.filter(c => c.getAttribute('aria-hidden') !== 'true');

    // Volta à primeira página sempre que o filtro muda
    paginaAtual = 0;
  }

  /**
   * Calcula o deslocamento X necessário para exibir a página atual.
   * Em vez de usar a largura do card via getBoundingClientRect (que pode
   * retornar 0 antes do layout), calculamos a partir do viewport.
   */
  function calcularDeslocamento() {
    const viewport = carrosselWrapper.querySelector('.carrossel-viewport');
    if (!viewport) return 0;

    // Largura do viewport disponível para os 3 cards
    const viewportWidth = viewport.clientWidth;

    // Largura de um "grupo" de 3 cards (incluindo os 2 gaps internos)
    // O grupo é exatamente a largura do viewport.
    const grupoPx = viewportWidth + 24; // +24 para incluir o gap entre páginas

    return paginaAtual * grupoPx;
  }

  /** Aplica o translateX na trilha e atualiza os botões. */
  function renderizar() {
    if (!carrosselAtivo) return;
    trilha.style.transform = `translateX(-${calcularDeslocamento()}px)`;
    atualizarBotoes();
  }

  /** Habilita/desabilita prev e next conforme a página atual. */
  function atualizarBotoes() {
    btnPrev.disabled = paginaAtual <= 0;
    btnNext.disabled = paginaAtual >= totalPaginas() - 1;
  }

  /** Navega para a página anterior ou próxima (saltos de CARDS_PER_VIEW). */
  function navegar(direcao) {
    if (!carrosselAtivo) return;

    if (direcao === 'prev') {
      paginaAtual = Math.max(0, paginaAtual - 1);
    } else {
      paginaAtual = Math.min(totalPaginas() - 1, paginaAtual + 1);
    }

    renderizar();
  }

  // ─── Ativação / Desativação ───────────────────────────────────────────────────

  function ativarCarrossel() {
    if (carrosselAtivo) return;
    carrosselAtivo = true;

    // Reseta sem animação
    trilha.style.transition = 'none';
    trilha.style.transform  = 'translateX(0)';

    // Filtro em desktop = sem filtro (mostra tudo)
    aplicarFiltro('all');
    paginaAtual = 0;

    requestAnimationFrame(() => {
      // Reativa transição após o reset
      trilha.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1)`;
      renderizar();
    });
  }

  function desativarCarrossel() {
    if (!carrosselAtivo) return;
    carrosselAtivo = false;

    // Remove transformações
    trilha.style.transform  = '';
    trilha.style.transition = '';

    // Mostra todos os cards (mobile usa o filtro para esconder, não aria-hidden)
    Array.from(trilha.querySelectorAll('.atividades-card'))
      .forEach(c => c.setAttribute('aria-hidden', 'false'));

    // Reaplicar filtro de mês atual na lógica mobile (via CSS display)
    // Nota: em mobile os cards são ocultados pelo handler abaixo com display:none
    // mas aqui deixamos tudo visível e o filtro mobile cuida disso no seu change.
  }

  // ─── Filtro mobile (display:none) ────────────────────────────────────────────
  //
  // Em mobile o filtro usa uma estratégia diferente do carrossel:
  // esconde os cards com display:none diretamente via classe.

  function aplicarFiltroMobile(mes) {
    Array.from(trilha.querySelectorAll('.atividades-card')).forEach(card => {
      const mesCard = card.getAttribute('data-month');
      const visivel = mes === 'all' || mesCard === mes;
      card.style.display = visivel ? '' : 'none';
    });
  }

  // ─── matchMedia — breakpoint dinâmico ────────────────────────────────────────

  function configurarBreakpoint() {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT + 1}px)`);

    function onChange(e) {
      if (e.matches) {
        // → desktop
        ativarCarrossel();
        // Garante que cards ocultos pelo filtro mobile sejam restaurados
        Array.from(trilha.querySelectorAll('.atividades-card'))
          .forEach(c => (c.style.display = ''));
      } else {
        // → mobile
        desativarCarrossel();
        // Restaura display de todos e aplica filtro mobile se houver seleção
        Array.from(trilha.querySelectorAll('.atividades-card'))
          .forEach(c => (c.style.display = ''));
        if (filtroMes && filtroMes.value !== 'all') {
          aplicarFiltroMobile(filtroMes.value);
        }
      }
    }

    if (mq.addEventListener) {
      mq.addEventListener('change', onChange);
    } else {
      mq.addListener(onChange); // fallback Safari < 14
    }

    // Estado inicial
    onChange(mq);
  }

  // ─── Event listeners ─────────────────────────────────────────────────────────

  btnPrev.addEventListener('click', () => navegar('prev'));
  btnNext.addEventListener('click', () => navegar('next'));

  // Acessibilidade: setas do teclado dentro do carrossel
  carrosselWrapper.addEventListener('keydown', e => {
    if (!carrosselAtivo) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); navegar('prev'); }
    if (e.key === 'ArrowRight') { e.preventDefault(); navegar('next'); }
  });

  // Filtro de mês
  if (filtroMes) {
    filtroMes.addEventListener('change', function () {
      if (carrosselAtivo) {
        // Desktop: filtro não é exibido, mas caso seja chamado via JS
        aplicarFiltro(this.value);
        renderizar();
      } else {
        // Mobile: oculta cards via display:none
        aplicarFiltroMobile(this.value);
      }
    });
  }

  // Recalcula posição quando a janela é redimensionada (largura dos cards muda)
  window.addEventListener('resize', () => {
    if (carrosselAtivo) renderizar();
  });

  // ─── Inicialização ────────────────────────────────────────────────────────────

  garantirViewport();
  configurarBreakpoint();

})();