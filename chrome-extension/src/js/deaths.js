import { insertInTable } from './main.js'
import { login, getData } from './requests.js'

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

  const totalObitos = stats.obitos.total_obitos
  const statesWithObitos = stats.obitos.states_with_obitos

  const p = document.getElementById('total-obitos')
  p.innerHTML = `Número total de óbitos: ${totalObitos}`

  statesWithObitos.map((state) => {
    const tbody = document.getElementById('body')
    const tr = document.createElement('tr')

    insertInTable(state.state, tr)
    insertInTable(state.obitos, tr)

    tbody.appendChild(tr)
  })
}
main()
