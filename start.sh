echo '============================'
echo 'setting nvm configs...'
echo '============================'
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
cd /home/ec2-user/build

# delete existing pm2 instances
pm2 delete 'all'

echo '============================'
echo 'start server...'
echo '============================'
pwd
pm2 start --name rest-api  npm -- run start:prod

echo '============================'
echo 'after server started ...'
echo '============================'