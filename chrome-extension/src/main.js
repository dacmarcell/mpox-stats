import { login, getData } from './requests.js'

async function main() {
  initialConfig()

  const payload = {
    username: 'admin',
    password: 'admin'
  }

  const { token } = await login(payload)
  const stats = await getData(token)

  if (!stats) {
    const h4 = document.createElement('h4')
    h4.innerHTML = 'Erro ao buscar dados'
  }

  stats.regions.map((region) => {
    const formattedRegionState = region.state.replace(/[0-9]/g, ' ').trim()

    const tbody = document.getElementById('body')
    const tr = document.createElement('tr')

    insertInTable(formattedRegionState, tr)
    insertInTable(region.cases_confirmed, tr)
    insertInTable(region.cases_suspected, tr)

    tbody.appendChild(tr)
  })
}
main()

function initialConfig() {
  document.getElementById('toggleTheme').addEventListener('click', toggleTheme)
}

/**
 * Insere um novo parágrafo (`<td>`) com o texto fornecido dentro
 * do elemento e adiciona dentro de um tr.
 *
 * @param {string} text - O texto que será inserido no novo td.
 * @param {HTMLElement} trEl - Elemento tr que será inserido na tabela.
 */
function insertInTable(text, trEl) {
  const td = document.createElement('td')
  td.innerHTML = text
  trEl.appendChild(td)
}

function toggleTheme() {
  const body = document.querySelector('body')
  const table = document.querySelector('table')

  if (body.classList.value === 'dark') {
    table.classList.replace('table-dark', 'table-striped')
    body.classList.replace('dark', 'light')
  } else {
    table.classList.replace('table-striped', 'table-dark')
    body.classList.replace('light', 'dark')
  }
}
