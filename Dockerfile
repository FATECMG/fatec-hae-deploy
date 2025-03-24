FROM      node:18-alpine

LABEL     author="Nathan Soares"

WORKDIR   /app

COPY      package.json yarn.lock ./

RUN       yarn

COPY      . ./

EXPOSE    5173

CMD       ["npx", "vite", "--mode", "${VITE_NODE_ENV}"]
