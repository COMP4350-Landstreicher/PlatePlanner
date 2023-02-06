docker ps -f ancestor=landstreicher/webserver -q | xargs -r docker container stop
docker container ls -f ancestor=landstreicher/webserver -q | xargs -r docker container rm


docker ps -f ancestor=landstreicher/db -q | xargs --no-run-if-empty docker container stop
docker container ls -f ancestor=landstreicher/db -q | xargs -r docker container rm

docker build  -t landstreicher/webserver -f WebserverDockerfile .
docker build  -t landstreicher/db -f DBDockerfile .

docker run -p 80:80 -d landstreicher/webserver
docker run -p 3306:3306 -d landstreicher/db