pipeline {
    agent any

    environment {
        SSH_KEY = '~/.ssh/testusha2.pem'  // PEM file you copied to Jenkins EC2
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/saiusha30/node-mongo-devops-pipeline.git'
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        stage('Generate Ansible Inventory') {
            steps {
                script {
                    def ec2_ip = sh(script: "cd terraform && terraform output -raw app_server_ip", returnStdout: true).trim()
                    sh """
                        echo "[app]" > ansible/inventory
                        echo "${ec2_ip} ansible_user=ec2-user ansible_ssh_private_key_file=${SSH_KEY}" >> ansible/inventory
                    """
                }
            }
        }

        stage('Install Docker with Ansible') {
            steps {
                dir('ansible') {
                    sh 'ansible-playbook -i inventory playbooks/install-docker.yml'
                }
            }
        }

        stage('Deploy App with Ansible') {
            steps {
                dir('ansible') {
                    sh 'ansible-playbook -i inventory playbooks/deploy-app.yml'
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful! Access your app at http://<EC2_PUBLIC_IP>:3000"
        }
        failure {
            echo "Deployment failed. Check logs."
        }
    }
}

