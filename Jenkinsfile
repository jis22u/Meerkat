pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    environment {
        SOURCECODE_JENKINS_CREDENTIAL_ID = 'user_donghun'
        SOURCE_CODE_URL = 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B107.git'
        RELEASE_BRANCH = 'develop'
        datasource = 'i8b107.p.ssafy.io'
        dbUser = 'admin'
        dbPwd = '!ssafyB107'
        jwt_secret_key = 'ssafy8thCommonB107'
        schema = 'devdb'
    }
    stages {

        stage('clone') {
            steps {
                git url: "$SOURCE_CODE_URL",
                    branch: "$RELEASE_BRANCH",
                    credentialsId: "$SOURCECODE_JENKINS_CREDENTIAL_ID"
                sh "ls -al"
            }
        }

        stage('frontend dockerizing') {
            steps {
                sh "pwd"
                sh "docker build -t server ./server"
            }
        }
    

        stage('backend dockerizing') {
            steps {
                sh "pwd"
                sh "docker build -t server ./server"
            }
        }

		stage('Deploy') {
            steps{
                sh "pwd"
                sh "docker stop common-b107-meerkat-develop-client-1"
                sh "docker rm common-b107-meerkat-develop-client-1"
                sh "docker stop common-b107-meerkat-develop-api-1"
                sh "docker rm common-b107-meerkat-develop-api-1"
                sh "docker-compose up -d --build"
                sh "docker-compose ps"
            }
            post {
                success {
                    echo "docker-compose success"
                }

                failure {
                    echo "docker-compose failed"
                }
            }		
        }
    }
}
