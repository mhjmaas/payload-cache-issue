## Cache issue

This repo is used to demonstrate a problem with the caching of images.

## Getting started

Start a mongodb instance with the following command:

```bash
docker run --name mongodb -p 27017:27017 --env MONGO_INITDB_ROOT_USERNAME=admin --env MONGO_INITDB_ROOT_PASSWORD=password -d mongo:latest
```

For ease of use, i've included the .env file in the repo. with a reference to this mongodb instance.

Clone this repo and run the following command:

```bash
pnpm install
```

## Using the app

Run the app in dev mode with the following command:

```bash
pnpm run dev
```

Go to the admin console and create a user and upload an image in the media collection

By default the app is configured to show the error at the http://localhost:3000/ page where the first image from the media collection is shown. It throws an error in the log: ERROR: TypeError: headers.set is not a function.

To remove the error, comment out the following line in the file: '/src/collections/Media.ts' on line 17: 'modifyResponseHeaders: modifyResponseHeaders,'

However no caching is now configured. Enabling the modifyResponseHeaders.ts file again and removing the 'use server' in the contents of the file will make the caching work as design in the client website, but will throw an error in the admin console.

Alternatively by setting a node_env=production and filling out the required env variable for the blob storage (BLOB_READ_WRITE_TOKEN) one can try the issue with the blob storage plugin.

## Observations

1. When removing the 'use server' in the contents of the modifyResponseHeaders.ts file no eror is thrown while retrieving the image and it works as designed. (I see a cache control header in the response). However in the admin console an error is thrown:

```
Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.
```

Adding the use server does throw the other error in the log and there is no working caching and the image is not shown.

My guess is it should work without the 'use server' in the modifyResponseHeaders.ts file and that the error in the admin console is a bug. 2. The blob storage plugin is probably irrelevant for this issue, however I am using it in my project and it is the reason I stumbled upon this issue.
