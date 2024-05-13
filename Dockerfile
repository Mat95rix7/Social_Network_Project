FROM node:19-alpine3.16

# Create app directory
RUN mkdir -p /frontend
WORKDIR /frontend

#Install app dependencies
RUN apk update && apk upgrade 
    
#Set environment variables


# Bundle app source
COPY . /frontend/
RUN npm install



# Build app
RUN npm run build

RUN mkdir  /backend
RUN npm install



# Expose port
EXPOSE 3000 5173

#start app
CMD [ "npm", "run", "start" ]