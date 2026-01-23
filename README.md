# deployment

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "codersHub-secret.pem" ubuntu@ec2-16-16-76-83.eu-north-1.compute.amazonaws.com
- Install Node Version v24.12.0
- git clone projects

- Frontend
        - npm install --> to isntall dependencies
        - npm run build
        - sudo apt update
        - sudo apt install nginx
        - sudo systemctl start nginx
        - sudo systemctl enable nginx
        - copy code from dist(build files) to /var/www/html/
        - sudo scp -r dist/* /var/www/html
        - Enable port :80 of your instance

- Backend
        - Allowed ec2 instance public IP on mongodb server
        - npm install pm-2 -g
        - pm2 start npm --name "codershub-backend" -- start
        - pm2 logs
        - pm2 list, pm2 flush  <name>, pm2 stop <name>, pm2 delete <name>
        - config nginx - /etc/nginx/sites-available/default
        - restart nginx - sudo systemctl restart nginx
        - Modify the BASEURL in frontned project to "/api"


    Frontend = http://16.16.76.83/
    Backend = http://16.16.76.83:3000/

    Domain name = codershub.com

    Frontend = codershub.com
    Backend = codershub.com:3000/ => codershub.com/api (proxy pass)

    nginx config:

    server_name 16.16.76.83;

    location /api/ {
                 proxy_pass http://localhost:3000/;
                 proxy_http_version 1.1;
                 proxy_set_header Upgrade $http_upgrade;
                 proxy_set_header Connection 'upgrade';
                 proxy_set_header Host $host;
                 proxy_cache_bypass $http_upgrade;
            }


# Adding a custom Domain name

        - purchased domain name from godaddy
        - signup on cludflare & add a new domain name
        - change the nameservers on godaddy and point it to cloudflare
        - wait for sometimes till your nameservers are updated
        - DNS record: A joincodershub.com 
        - Enable SSL for website [Full (strict)]


# Sending Emails via SES

        - Create a IAM user
        - Give Access to AmazonSESFullAccess
        - Amazon SES: Create an Identity
        - Verify Your domain name
        - Verify an email address 
 