# PlantVillage App

This is a WebApp to detect the diseases in Leaf of the Plant made using HTML, CSS, JQuery. It is served using Python-Flask BackEnd

- Web App is deployed on heroku at https://suryakaushik.github.io/PlantVillage-WebApp/

Used PlantVillage DataSet and Kaggle Notebook to cretae the model and export them as serialised .h5 files

Save Model as .h5 file and covert it into json
`$ tensorflowjs_converter --input_format=keras /tmp/model.h5 /tmp/tfjs_model`


![pl](https://user-images.githubusercontent.com/41267674/185792644-54db3ec0-49fc-4503-a229-00c6b004345e.png)
![pl1](https://user-images.githubusercontent.com/41267674/185792674-9a7f1dce-05cb-47ae-ad07-061d6ded7124.png)
![pl2](https://user-images.githubusercontent.com/41267674/185792746-f2696b07-6598-4bf6-b78b-1449624dd5f2.png)
![pl4](https://user-images.githubusercontent.com/41267674/185793800-5091191a-3fe0-4a68-ac99-9ba38cf5c534.png)


**Note: The mobile version of the App is made and is available in a diiferent branch**
## Steps to run the App in DEV Environment:

### To Build the model and export as .pkl:
- Run `my code1.ipynb` in Jupyter Notebook or VSCode

### To Start the Flask Server:
- pip -r requirements.txt
- Run the app.py file
- Server starts on localhost:5000 and serves the frontend minified build

Note: All the image uploads are stored statically on the server for now.

## POSTMAN API TESTING
https://www.getpostman.com/collections/4bc4bf9f7c784bd1a66b

## REFERENCES  TO INTEGRATE MODEL WITH JS
- https://yannicksergeobam.medium.com/plant-disease-classification-with-tensorflow-2-0-268fe7f72c2a
- https://rexsimiloluwa.medium.com/building-a-plant-disease-classification-web-app-in-keras-and-tensorflow-js-d435829213fa
- https://medium.com/@jayantspeaks/converting-tensorflow-models-to-javascript-711f5bd3110e
