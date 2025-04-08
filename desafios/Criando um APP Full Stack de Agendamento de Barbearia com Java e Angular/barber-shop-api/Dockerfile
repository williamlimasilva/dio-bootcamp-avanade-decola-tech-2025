FROM gradle:8.11.1-jdk-21-and-23

RUN apt-get update && apt-get install -qq -y --no-install-recommends postgresql-client

ENV INSTALL_PATH /barber-shop-api

RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

# Copie os arquivos de gradle primeiro para aproveitar o cache de camadas
COPY gradle ./gradle
COPY build.gradle.kts settings.gradle.kts gradlew gradlew.bat ./

# Dê permissão de execução ao script gradlew
RUN chmod +x ./gradlew

# Copie o resto dos arquivos
COPY . .

# Exponha a porta em que a aplicação vai rodar
EXPOSE 8080
EXPOSE 5005

# Defina o ponto de entrada do container
CMD ["bash", "start-dev.sh"]