FROM openjdk:8-jdk-alpine
RUN echo ${DIR}
ENTRYPOINT ["java","-jar","-Duser.timezone=Asia/Seoul","/var/jenkins_home/workspace/common-B107-meerkat-develop/server/target/meerkat-0.0.1-SNAPSHOT.jar"]
