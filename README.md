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


 