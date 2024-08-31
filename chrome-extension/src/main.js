import { login, getData } from './requests.js'

async function main() {
  const payload = {
    username: 'admin',
    password: 'admin'
  }

  const { token } = await login(payload)
  const stats = await getData(token)

  stats.regions.map((region) => {
    const formattedRegionState = region.state.replace(/[0-9]/g, ' ').trim()

    dynamicInsertion(formattedRegionState, 'region')
    dynamicInsertion(region.cases_confirmed, 'confirmedCases')
    dynamicInsertion(region.cases_suspected, 'suspectedCases')
  })
}
main()

/**
 * Insere um novo parágrafo (`<p>`) com o texto fornecido dentro do elemento com o ID especificado.
 *
 * @param {string} text - O texto que será inserido no novo parágrafo.
 * @param {string} elementID - O ID do elemento HTML no qual o novo parágrafo será adicionado.
 *
 * @example
 * // Insere um parágrafo com o texto 'Olá, mundo!' no elemento com o ID 'container'
 * dynamicInsertion('Olá, mundo!', 'container');
 */
function dynamicInsertion(text, elementID) {
  const p = document.createElement('p')
  p.value = text
  p.innerHTML = text
  document.getElementById(elementID).appendChild(p)
}
