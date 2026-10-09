/* API na mesma origem do Nest. Para outro servidor, defina window.ELASTITAM_API_URL antes deste script. */
document.addEventListener('DOMContentLoaded', () => {
  const base = (window.ELASTITAM_API_URL || '').replace(/\/$/, '');
  const sessionKey = 'elastitam.session';
  async function request(path, body, token) {
    let response;
    try {
      response = await fetch(base + path, {
        method: body === undefined ? 'GET' : 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: AbortSignal.timeout(15000)
      });
    } catch {
      throw new Error('Não foi possível conectar ao servidor. Tente novamente.');
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(Array.isArray(data.message) ? data.message.join(' ') : data.message || data.mensagem || 'Não foi possível concluir a operação.');
      error.status = response.status;
      throw error;
    }
    return data;
  }
  function feedback(form, message, error = false) {
    let output = form.querySelector('[data-feedback]');
    if (!output) {
      output = document.createElement('p');
      output.dataset.feedback = '';
      output.setAttribute('role', 'status');
      output.setAttribute('aria-live', 'polite');
      form.appendChild(output);
    }
    output.textContent = message;
    output.style.color = error ? '#a32020' : '#542480';
  }
  function bind(form, handler) {
    if (!form) return;
    let pending = false;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (pending || !form.reportValidity()) return;
      pending = true;
      const button = form.querySelector('[type="submit"], button');
      if (button) button.disabled = true;
      form.setAttribute('aria-busy', 'true');
      feedback(form, 'Enviando...');
      try { await handler(new FormData(form)); }
      catch (error) { feedback(form, error.message, true); }
      finally {
        pending = false;
        if (button) button.disabled = false;
        form.removeAttribute('aria-busy');
      }
    });
  }
  const page = location.pathname.split('/').pop();
  if (page === 'cadastro.html') {
    const form = document.querySelector('form.form');
    bind(form, async fields => {
      if (fields.get('senha') !== fields.get('confirmar')) throw new Error('As senhas precisam ser iguais.');
      const user = await request('/usuario/cadastrar', {
        nome: fields.get('nome').trim(), email: fields.get('email').trim(), senha: fields.get('senha')
      });
      if (!user.id_usuario) throw new Error(user.mensagem || 'Não foi possível criar a conta.');
      let message = 'Conta criada! Você já pode entrar.';
      if (fields.has('novidades')) {
        try { await request('/newsletter/inscrever', { email: user.email }); }
        catch { message += ' A inscrição nas novidades falhou; tente novamente na página inicial.'; }
      }
      form.reset();
      feedback(form, message);
      const link = document.createElement('a');
      link.href = 'login.html';
      link.textContent = ' Entrar na minha conta';
      form.querySelector('[data-feedback]').appendChild(link);
    });
  }
  if (page === 'login.html') {
    const form = document.querySelector('form.form');
    bind(form, async fields => {
      const data = await request('/autenticacao/login', { email: fields.get('email').trim(), senha: fields.get('senha') });
      if (!data.access_token) throw new Error(data.mensagem || 'E-mail ou senha inválidos.');
      sessionStorage.setItem(sessionKey, JSON.stringify({ token: data.access_token }));
      location.assign('dashboard.html');
    });
    const forgot = document.querySelector('.forgot');
    if (forgot) {
      forgot.href = 'recuperacao.html';
      forgot.textContent = 'Esqueci minha senha';
    }
  }
  if (page === 'contato.html') {
    const form = document.querySelector('.formulario_area form');
    bind(form, async fields => {
      const data = await request('/contato/enviar', {
        nome: fields.get('nome').trim(), email: fields.get('email').trim(),
        curso_area_interesse: fields.get('curso').trim(), mensagem: fields.get('mensagem').trim()
      });
      form.reset();
      feedback(form, data.mensagem);
    });
  }
  document.querySelectorAll('form.newsletter-form').forEach(form => {
    bind(form, async fields => {
      const data = await request('/newsletter/inscrever', { email: fields.get('email').trim() });
      form.reset();
      feedback(form, data.mensagem);
    });
  });
  if (page === 'dashboard.html') {
    const main = document.querySelector('main');
    main.hidden = true;
    let session;
    try { session = JSON.parse(sessionStorage.getItem(sessionKey) || 'null'); } catch { sessionStorage.removeItem(sessionKey); }
    if (!session?.token) { location.replace('login.html'); return; }
    request('/autenticacao/me', undefined, session.token).then(user => {
      document.querySelector('.welcome h1').textContent = 'Bem-vinda, ' + user.nome + '!';
      main.hidden = false;
    }).catch(error => {
      if (error.status === 401) {
        sessionStorage.removeItem(sessionKey);
        location.replace('login.html');
      } else {
        main.hidden = false;
        main.replaceChildren();
        feedback(main, error.message, true);
        const retry = document.createElement('button');
        retry.textContent = 'Tentar novamente';
        retry.onclick = () => location.reload();
        main.appendChild(retry);
      }
    });
    const nav = document.querySelector('#menu ul');
    if (nav) {
      const item = document.createElement('li');
      const logout = document.createElement('button');
      logout.type = 'button';
      logout.textContent = 'Sair';
      logout.addEventListener('click', () => { sessionStorage.removeItem(sessionKey); location.assign('login.html'); });
      item.appendChild(logout);
      nav.appendChild(item);
    }
  }
});
