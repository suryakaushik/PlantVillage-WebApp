import os
import pickle
from os import listdir

import cv2
import matplotlib.pyplot as plt
import numpy as np
# Flask utils
from flask import Flask, redirect, render_template, request, url_for
from gevent.pywsgi import WSGIServer
from keras import backend as K
from keras.layers.convolutional import Conv2D, MaxPooling2D
from keras.layers.core import Activation, Dense, Dropout, Flatten
from keras.layers.normalization import BatchNormalization
from keras.models import Sequential
from keras.optimizers import Adam
from keras.preprocessing import image
from keras.preprocessing.image import ImageDataGenerator, img_to_array
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer
from werkzeug.utils import secure_filename

# from tensorflow import keras
# from skimage import io
# from tensorflow.keras.preprocessing import image

# Define a flask app
app = Flask(__name__)

# Dimension of resized image
DEFAULT_IMAGE_SIZE = tuple((256, 256))
train_test_dir = 'D:\Deep Learning Project\Final Code\dataset\PlantVillage'

def convert_image_to_array(image_dir):
    try:
        image = cv2.imread(image_dir)
        if image is not None:
            image = cv2.resize(image, DEFAULT_IMAGE_SIZE)   
            return img_to_array(image)
        else:
            return np.array([])
    except Exception as e:
        print(f"Error : {e}")
        return None

def predict_disease(image_path,model,image_labels,trueLabel):
    image_array = convert_image_to_array(image_path)
    np_image = np.array(image_array, dtype=np.float16) / 225.0
    np_image = np.expand_dims(np_image,0)
    plt.imshow(plt.imread(image_path))
    
    result = model.predict_classes(np_image)
    print("Actual Label: ",trueLabel)
    print("Predicted Label: ",image_labels.classes_[result][0])

    probabilities = model.predict(np_image)[0]
    class_idx = np.argmax(probabilities)
    print("Confidence: "+"{:.2f}".format(np.max(result)))
    
    return (image_labels.classes_[result][0])
    
    # itemindex = np.where(result==np.max(result))
    # print("probability:"+str(np.max(result))+"\n"+label_binarizer.classes_[itemindex[1][0]])
    # return label_binarizer.classes_[itemindex[1][0]]

@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)
        
        K.clear_session()
        
        # To Make prediction,load model
        filename = 'cnn_model.pkl'
        model = pickle.load(open(filename, 'rb'))

        # Load labels
        filename = 'label_transform.pkl'
        image_labels = pickle.load(open(filename, 'rb'))

        train_test_dir = 'D:\Deep Learning Project\Final Code\dataset\PlantVillage'
        true_label=""
        try:
            print("[INFO] Loading images ...")
            plant_disease_folder_list = listdir(train_test_dir)

            for plant_disease_folder in plant_disease_folder_list:
                if(true_label!=""):
                    break
                print(f"[INFO] Processing {plant_disease_folder} ...")
                plant_disease_image_list = listdir(f"{train_test_dir}/{plant_disease_folder}/")

                for image in plant_disease_image_list:
                    if image==f.filename:
                        true_label=plant_disease_folder
                        break
            print("[INFO] Image loading completed")  
        except Exception as e:
            print(f"Error : {e}")
        
        result = predict_disease(file_path,model,image_labels,true_label)
        return result
    return None

if __name__ == '__main__':
    app.run(port=5000, debug=True) #http://127.0.0.1:5000/

    # Serve the app with gevent
    # http_server = WSGIServer(('', 5000), app)
    # http_server.serve_forever()
    # app.run()


    # filename = 'cnn_model.pkl'
    # model = pickle.load(open(filename, 'rb'))

    # filename = 'label_transform.pkl'
    # image_labels = pickle.load(open(filename, 'rb'))

    # try:
    #     print("[INFO] Loading images ...\n")
    #     plant_disease_folder_list = listdir(train_test_dir)

    #     for plant_disease_folder in plant_disease_folder_list:
    #         print(f"[INFO] Processing {plant_disease_folder} ...")
    #         plant_disease_image_list = listdir(f"{train_test_dir}/{plant_disease_folder}/")

    #         plt.figure(1 , figsize = (19 , 10))
    #         r = np.random.randint(len(plant_disease_image_list),size=3);n=1
    #         for i in r: #for i in range(4)
    #             plt.subplot(3 , 3 , n);n+=3
    #             plt.subplots_adjust(hspace = 1.0 , wspace = 0.2, bottom=0.05, left=0.16,right=0.9)
    #             # r=i
    #             plt.imshow(plt.imread(f"{train_test_dir}/{plant_disease_folder}/{plant_disease_image_list[i]}"))
    #             image_array = convert_image_to_array(f"{train_test_dir}/{plant_disease_folder}/{plant_disease_image_list[i]}")
    #             np_image = np.array(image_array, dtype=np.float16) / 225.0
    #             np_image = np.expand_dims(np_image,0)
    #             result = model.predict_classes(np_image)
    #             plt.title('{}\n'.format(plant_disease_image_list[i])+'Actual: {}\n'.format(plant_disease_folder)+'Predicted: {}\n'.format(image_labels.classes_[result][0])+'Probability of Prediction: {:.2f}'.format(np.max(result)))
    #         plt.show()   
                
    #     print("[INFO] Image loading completed\n")  
    # except Exception as e:
    #     print(f"Error : {e}\n")