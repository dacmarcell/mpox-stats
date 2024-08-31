from scraping import get_file_list_from_scrapping
from pdf import read_pdf
from rabbit_mq import connect, send_to_queue
import schedule

def run():
  file_list = get_file_list_from_scrapping()
  if file_list:
    for file in file_list:
      text = read_pdf(file)
      send_to_queue(connect(), text)

if __name__ == "__main__":
  schedule.every(1).week.do(run)