# apollo-blog-server

### Create a digital ocean space for your storage bucket and provide the access tokens as shown in the `.env.example`.

### Also supply your own mongodb database uri

### For blog creation, all post banners must be sent as a base64 encoded image string, and they will be uploaded to an S3 storage backend and the link to that image would be stored in the banner field. The same applies for author avatars, if a base64 string is supplied for the `avatar` field, the image would be uploaded to the storage backend, otherwise a default image would be used as an avatar.
