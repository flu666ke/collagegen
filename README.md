# Collagegen

**Collagegen** is a service that generates collages according to the specified parameters. If no parameters are specified, the service will automatically generate a collage. Only links to pictures for collage are a mandatory parameter.

---

**jimp package is used for working with images**

For example, to create a collage we need:

1. links to pictures
2. background color
3. collage size, width, and height
4. relative size
5. the array of slots, the number of which should correspond to the number of links in the picture. Each slot has 4 parameters:
   - location of the picture in the x coordinate
   - location of the picture on the y-coordinate
   - picture width
   - picture height

**The service has two endpoints:**
1. Creating a collage **(POST method) {protocol}://{host}:{port}/api/collages**
2. Getting a link to the created collage by id **(GET method) {protocol}://{host}:{port}/api/collages/{id}**

## Launch of the project

Follow these simple steps to run a local copy.

1. Install NPM packages by typing **npm install** in a terminal.
2. When created, the collage will be uploaded to AWS S3 bucket. To do this, you need to add the following parameters to the **.env** file:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_S3_BUCKET
   - AWS_S3_BUCKET_REGION
3. Next, enter the command **npm run dev**. The project should be started on **port 5000**

How to pass parameters can be found in the **swagger documentation {protocol}://{host}:{port}//swagger/#/**
Also in swagger documentation, as an example, the parameters for creating this collage are given.

```json
{  
   "imageUrls": [
      "https://www.ansys.com/-/media/ansys/corporate/social/partners/partner-ecosystem-1200x600.jpg", 
      "https://www.esri.com/about/newsroom/wp-content/uploads/2017/09/Podcast_Leading-Companies-Location-Intelligence-BI-CRM_Square-600-x-600.jpg", 
      "https://kyivartweek.com/wp-content/uploads/2020/08/%D0%9A%D0%BE%D0%BF%D0%B8%D1%8F-Volokitin-600x600.jpg"
   ],  
   "backgroundColor": "AliceBlue",  
   "layout": {  
      "relativeSize": {  
         "w": 120,  
         "h": 121  
      },  
      "slots": [
         {
            "x": 2,
            "y": 2,
            "w": 116,
            "h": 58
         },
         {
            "x": 2,
            "y": 62,
            "w": 57,
            "h": 57
         },
         {
            "x": 61,
            "y": 62,
            "w": 57,
            "h": 57
         }
      ]  
   },  
   "size": {  
      "width": 1200,  
      "height": 1210  
   }  
 }
```

---

As a result, the **Collagegen** generated the collage in accordance with the specified parameters:

---

<div align="center"><img src="src/examples/collage.jpg"/></div>

