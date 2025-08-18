Node.js + MongoDB DevOps Pipeline 🚀
📌 Project Overview

This project demonstrates a full DevOps pipeline that provisions infrastructure, configures servers, builds and deploys a containerized Node.js + MongoDB application, and automates the workflow using Jenkins.

The idea is to showcase integration of Terraform + Ansible + Docker + Jenkins + GitHub + AWS into one seamless pipeline.

🏗️ Architecture

1.Control Node (EC2 - created manually once)

* Runs Jenkins, Terraform, and Ansible

* Acts as the orchestrator of the pipeline

2.Target Node (EC2 - created by Terraform)

* Ansible installs Docker here

* Application and MongoDB run inside Docker containers

3.Workflow

* Developer pushes code to GitHub

* Jenkins triggers the pipeline

* Terraform provisions infrastructure (Target EC2)

* Ansible configures the Target EC2 (installs Docker)

* Docker builds image and deploys Node.js + MongoDB containers

* Application runs successfully on AWS

🛠️ Tools & Technologies

AWS EC2 → Infrastructure hosting

Terraform → Infrastructure provisioning (Target Node)

Ansible → Configuration management (install Docker, setup environment)

Docker → Containerization of Node.js app + MongoDB

Jenkins → CI/CD pipeline automation

GitHub → Source code repository

Node.js + MongoDB → Application & Database stack

⚙️ Prerequisites

AWS account with proper IAM role/keys

EC2 instance (Control Node) with:

Jenkins installed

Terraform installed

Ansible installed

GitHub repository (this repo) containing:

Node.js app code

Terraform scripts

Ansible playbooks

Jenkinsfile

🚀 Step-by-Step Workflow
1. Setup Control Node (manual EC2)

Launch one EC2 instance manually

Install:

sudo yum install git -y
sudo yum install ansible -y
sudo yum install docker -y


Install Jenkins and Terraform

2. Clone Repo
git clone https://github.com/saiusha30/node-mongo-devops-pipeline.git
cd node-mongo-devops-pipeline

3. Terraform → Provision Target EC2

Define main.tf for AWS EC2 provisioning

Jenkins will run terraform init && terraform apply -auto-approve

Outputs Target EC2 IP

4. Ansible → Configure Target Node

Install Docker on Target EC2

Create Docker network, volumes

Setup environment

5. Docker → Deploy Application

Build Docker image for Node.js app

Pull MongoDB image

Run both containers with networking

6. Jenkins → Automate Pipeline

Create a Jenkins pipeline (using Jenkinsfile)

Stages:

1. Git Checkout

2. Terraform Apply

3. Ansible Playbook Run

4. Docker Build & Run

5. Deploy Application

📂 Project Structure
node-mongo-devops-pipeline/
├── app/                  # Node.js application code
├── ansible/              # Ansible playbooks
│   ├── install-docker.yml
├── terraform/            # Terraform scripts for EC2
│   ├── main.tf
├── Dockerfile            # Node.js app image build
├── Jenkinsfile           # CI/CD pipeline stages
└── README.md             # Documentation

✅ Expected Outcome

Fully automated CI/CD pipeline

Application + Database deployed on AWS EC2 using Docker

Only one manual EC2 (control node) needed; rest automated
