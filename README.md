# PMS_Payment_server


#aamarpay payment server
#=======================
#This is a payment server for aamarpay payment gateway. This server will receive payment request from client and send payment request to aamarpay payment gateway. After payment is done, aamarpay payment gateway will send payment status to this server. This server will send payment status to client.

#How to run with node
#==========
#1. Install nodejs
#2. Install npm
#4. Install git
#5. Clone this repository
#6. Go to the project directory
#7. Run npm install
#8. Run project


#How to run with docker
#==========
#1. Install docker
#2. Install docker-compose
#3. Clone this repository
#4. Go to the project directory
#5. Run docker-compose up -d
#6. Run docker-compose logs -f to see logs
#7. Run docker-compose down to stop the server


#How to run with docker swarm
#==========
#1. Install docker
#2. Install docker-compose
#3. Clone this repository
#4. Go to the project directory
#5. Run docker swarm init
#6. Run docker stack deploy -c docker-compose.yml pms_payment_server
#7. Run docker service ls to see logs
#8. Run docker stack rm pms_payment_server to stop the server



