FROM openjdk:8-jdk-alpine
RUN echo ${DIR}
RUN echo ${WORKDIR}
COPY target/meerkat-0.0.1-SNAPSHOT.jar meerkat-server.jar
ENTRYPOINT ["java","-jar","/meerkat-server.jar"]
