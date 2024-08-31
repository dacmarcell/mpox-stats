from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import os
import time

def get_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    return driver

def go_to_page(driver, url):
    driver.get(url)
    time.sleep(2)

def get_browser_download_path():
    download_dir = "C:/Users/dacma/Downloads"
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)
    return download_dir

def run_scraping():
    driver = get_driver()

    url = "https://www.gov.br/saude/pt-br/composicao/svsa/coes/monkeypox/atualizacao-dos-casos"
    go_to_page(driver, url)

    post_x_path = "//a[contains(text(), 'Card Situação Epidemiológica de Monkeypox no Brasil nº')]"
    post = driver.find_element(By.XPATH, post_x_path)

    download_page_link = post.get_attribute('href')
    go_to_page(driver, download_page_link)

    download_page_link_x_path = "//p/a"
    link_element = driver.find_element(By.XPATH, download_page_link_x_path)
    download_link = link_element.get_attribute('href')

    driver.get(download_link)
    time.sleep(5)

    download_dir = get_browser_download_path()

    driver.quit()

    list = []
    for file in os.listdir(download_dir):
        if file.endswith(".pdf"):
            list.append(download_dir + '/' + file)

    return list if list else None

def get_file_list_from_scrapping():
    list = run_scraping()
    return list