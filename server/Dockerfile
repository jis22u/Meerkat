FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD ./target/server-0.0.1-SNAPSHOT.jar meerkat-server.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java","-jar","/meerkat-server.jar"]
