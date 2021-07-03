# Build step #1: build the React front end
FROM node:16-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
COPY ./src ./src
COPY ./public ./public
RUN yarn install
RUN yarn build

# Build step #2: build the API with the client as static files
FROM python:3.9 as api
WORKDIR /app
COPY --from=build /app/build ./build

RUN mkdir ./api
COPY api/requirements.txt api/api.py api/.env ./api/
RUN pip install -r ./api/requirements.txt
ENV FLASK_ENV production

EXPOSE 8000
WORKDIR /app/api
CMD gunicorn --worker-tmp-dir /dev/shm -b api:app