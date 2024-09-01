import { insertInTable } from './main.js'
import { getData, login } from './requests.js'

async function main() {
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
