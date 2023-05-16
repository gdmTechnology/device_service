pipeline {
	agent any
	stages {
		stage("verify tooling") {
			steps {
				sh '''
					docker version
					docker info
				'''
			}
		}
		stage('Tests') {
			steps {
				script {
				sh 'npm i'
				sh 'npm run test'
				}
			}
			post {
				always {
				step([$class: 'CoberturaPublisher', coberturaReportFile: 'output/coverage/jest/cobertura-coverage.xml', lineCoverageTargets: '100, 95, 50'])
				}
			}
		}
		stage("build") {
			steps {
				sh 'docker build -t device-service .'
			}
		}
		stage("killing old container") {
			steps {
				sh 'docker system prune --all'
			}
		}
		stage("run") {
			steps {
				sh '''
                    docker run -d \
                    -e HOST=device_service \
                    -e JWT_SECRET=1kZDnw8==jh \
					-e KAFKA_CLIENTID=rem-kafka \
					-e KAFKA_BROKER_PORT=9092 \
        			-e KAFKA_BROKER_HOST=broker \
					-e ADMIN_EMAIL=gui.acassemiro@gmail.com \
					-e PORT=3005 \
					-e MONGO_HOST=mongo \
					-e MONGO_PORT=27017 \
					-e MONGO_DB_NAME=rem \
					-e MONGO_PASS=rem2023 \
					-e MONGO_USER=rem \
					-p 3005:3005 \
					--hostname device_service \
                    --network rem_network \
					--restart always \
					--name device_service device-service
				'''
			}
		}
	}
}