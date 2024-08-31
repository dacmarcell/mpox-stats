import fitz
import re

def extract_text_from_pdf(pdf_path):
  document = fitz.open(pdf_path)
  text = ""
  for page_num in range(len(document)):
    page = document.load_page(page_num)
    text += page.get_text()
  return text

def get_total_obitos(obitos):
  obitos_count = []
  for obito in obitos:
    num = re.findall(r"[1-9]", obito)
    if num:
      obitos_count.append(int(num[0]))

  return sum(obitos_count)

def filter_text(text):
  data_pattern = r"(\w[\w\s]*?)\n(\d+)\s+(\d+)"
  date_pattern = r"Dados atualizados em (\d{2}/\d{2}/\d{4}) às (\d{2}h)"

  data_matches = re.findall(data_pattern, text)
  regions = []
  for match in data_matches:
    state, cases_confirmed, cases_suspected = match
    regions.append({
      'state': state.strip(),
      'cases_confirmed': int(cases_confirmed),
      'cases_suspected': int(cases_suspected)
    })

  only_obitos_text = text.split("Óbitos:")[1]
  obitos = only_obitos_text.split(",")

  # Tratamento para casos onde o número de óbitos é escrito com 'e' ao invés de vírgula
  last_obitos = obitos.pop()
  separated_last_obitos = last_obitos.split(" e ")

  if len(separated_last_obitos) > 1:
    obitos.extend(separated_last_obitos)

  total_obitos = get_total_obitos(obitos)

  if obitos:
    obitos_data = {
      "total_obitos": total_obitos,
      "states_with_obitos": []
    }
    for obito in obitos:
      separated_obito = obito.strip().split(' ')
      obito_quantity = int(separated_obito[0])
      obito_state = ' '.join(separated_obito[1:])

      obitos_data["states_with_obitos"].append({
        "state": obito_state,
        "obitos": obito_quantity
      })

    date_match = re.search(date_pattern, text)
    if date_match:
      date_data = {
        "date": date_match.group(1),
        "time": date_match.group(2)
      }

    return {
      "regions": regions,
      "obitos": obitos_data,
      "last_update": date_data
    }

def read_pdf(pdf_path):
  text = extract_text_from_pdf(pdf_path)
  filtered_text = filter_text(text)
  return filtered_text
