from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import os
import time

def get_driver(download_dir):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    prefs = {
        "download.default_directory": download_dir,
        "download.prompt_for_download": False,
        "download.directory_upgrade": True,
        "safebrowsing.enabled": True
    }

    chrome_options.add_experimental_option("prefs", prefs)

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    return driver

def go_to_page(driver, url):
    driver.get(url)
    time.sleep(2)

def get_browser_download_path():
    download_dir = "/usr/src/app/downloads"
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)
    return download_dir

def get_latest_file_from_downloads():
    download_dir = get_browser_download_path()
    driver = get_driver(download_dir)

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

    driver.quit()

    pdf_files = [os.path.join(download_dir, file) for file in os.listdir(download_dir) if file.endswith(".pdf")]

    if pdf_files:
        latest_file = max(pdf_files, key=os.path.getmtime)
        return latest_file

    return None