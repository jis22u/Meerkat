FROM openjdk:8-jdk-alpine
RUN echo ${DIR}
COPY /var/jenkins_home/workspace/common-B107-meerkat-develop/server/target/meerkat-0.0.1-SNAPSHOT.jar /var/jenkins_home/workspace/common-B107-meerkat-develop/meerkat-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/var/jenkins_home/workspace/common-B107-meerkat-develop/meerkat-0.0.1-SNAPSHOT.jar"]
