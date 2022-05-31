pipeline {
  agent any

  tools { nodejs 'NodeJS' }
  stages{
    stage("Install dependencies") {
       steps {
          sh 'npm i'
          sh '<<Build Command>>'
       }
    }
    stage("Run IU frontend test") {
       steps {
          sh 'npm test'
          sh '<<Test Command>>'
       }
    }
    stage("Report in html") {
       steps {
          publishHTML([
                  allowMissing: false,
                  alwaysLinkToLastBuild: true,
                  keepAll: true,
                  reportDir: 'cypress/reports',
                  reportFiles: 'report.html',
                  reportName: 'HTML UI Frontend testing Report',
                  reportTitles: ''])
       }
    }
  }
}