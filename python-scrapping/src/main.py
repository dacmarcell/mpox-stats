from scraping import get_latest_file_from_downloads
from pdf import read_pdf
from database import save
import schedule
import time

def run():
  file = get_latest_file_from_downloads()
  if file:
      text = read_pdf(file)
      save(text)

if __name__ == "__main__":
  run()
  schedule.every(1).week.do(run)

  while True:
    schedule.run_pending()
    time.sleep(1)