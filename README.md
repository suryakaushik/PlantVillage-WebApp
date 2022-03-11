# PlantVillage App

This is a WebApp to detect the diseases in Leaf of the Plant made using HTML, CSS, JQuery. It is served using Python-Flask BackEnd

Used PlantVillage DataSet and Kaggle Notebook to cretae the model and export them as serialised .pkl files

![pl](https://user-images.githubusercontent.com/41267674/157860587-23269942-39a1-443c-b79f-d74cac04469f.png)
![pl1](https://user-images.githubusercontent.com/41267674/157860591-3f979243-91d5-4c0d-afa2-16681b05d6fc.png)
![pl2](https://user-images.githubusercontent.com/41267674/157860595-3f61a78e-1bca-418d-8d9d-d921b6e441eb.png)
![pl3](https://user-images.githubusercontent.com/41267674/157860599-550bdc82-2f0b-434c-b20f-ae0fb14aa1f8.png)

**Note: The mobile version of the App is made and is available in a diiferent branch**
## Steps to run the App in DEV Environment:

### To Build the model and export as .pkl:
- Run `my code1.ipynb` in Jupyter Notebook or VSCode

### To Start the Flask Server:
- pip -r requirements.txt
- Run the app.py file
- Server starts on localhost:5000 and serves the frontend minified build

Note: All the image uploads are stored statically on the server for now.
<!-- The backend(Flask) is deployed on heroku at https://plantvillage-detection.herokuapp.com/ -->


## POSTMAN API TESTING
https://www.getpostman.com/collections/4bc4bf9f7c784bd1a66b