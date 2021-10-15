FROM testcafe/testcafe:latest
USER root

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY data ./data
COPY src ./src
COPY .testcaferc.json .
COPY run-test.sh ./

ENTRYPOINT [ "./run-test.sh" ]