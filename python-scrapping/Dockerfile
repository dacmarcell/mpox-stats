FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    wget \
    gnupg \
    && apt-get clean

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable
    
RUN CHROME_DRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE) && \
    wget -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/${CHROME_DRIVER_VERSION}/chromedriver_linux64.zip && \
    unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/ && \
    rm /tmp/chromedriver.zip

WORKDIR /usr/src/app

COPY . .

RUN python3 -m pip install --no-cache-dir -U selenium \
    pymupdf \
    schedule \
    pymongo \
    webdriver_manager

CMD ["python3", "src/main.py"]
