FROM node:18-alpine

WORKDIR /app

COPY src /app/
COPY config_maker /app/
COPY package.json /app/
COPY package-lock.json /app/
COPY index.html /app/
COPY tsconfig.json /app/
COPY build/actions.log /app/build/
ENV BALLCHASING_TOKEN jNiIQm0oM6RlUDf0uIFIy7kYa53af4MA1i0Z6jYz
ENV BALLCHASING_PORT 3003
ENV REPLAY_NAME_DELIMITER " "
ENV CONSIDERED_REGIONS "MENA"

RUN npm install
RUN npm run build

WORKDIR /app/build

CMD ["node", "index"]