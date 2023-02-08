FROM openjdk:8-jdk-alpine
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} meerkat-server.jar
ENTRYPOINT ["java","-jar","/app.jar"]
