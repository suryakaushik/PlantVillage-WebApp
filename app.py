import os
import pickle
from os import listdir

import cv2
import matplotlib.pyplot as plt
import numpy as np
import skimage
from skimage import io

import boto3
# Flask utils
from flask import Flask, redirect, render_template, request, url_for, jsonify
from werkzeug.utils import secure_filename

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

# Define a flask app
app = Flask(__name__)

from flask_cors import CORS,cross_origin
CORS(app, support_credentials=True)

# from tensorflow import keras
# from skimage import io
# from tensorflow.keras.preprocessing import image

# Dimension of resized image
DEFAULT_IMAGE_SIZE = tuple((256, 256))
train_test_dir = 'D:\Deep Learning Project\Final Code\dataset\PlantVillage'

def predict_disease(image_path,model,image_labels,trueLabel):
    # image_array = convert_image_to_array(image_path)
    image_array = io.imread( image_path )
    np_image = np.array(image_array, dtype=np.float16) / 225.0
    np_image = np.expand_dims(np_image,0)
    # plt.imshow(plt.imread(image_path))
    
    result = model.predict_classes(np_image)
    print("Actual Label: ",trueLabel)
    print("Predicted Label: ",image_labels.classes_[result][0])
    print("Image URL: ",image_path) 

    # probabilities = model.predict(np_image)[0]
    # class_idx = np.argmax(probabilities)
    print("Confidence: "+"{:.2f}".format(np.max(result)))
    
    return {
        "Actual Label": str(trueLabel),
        "Predicted Label": str(image_labels.classes_[result][0]),
        "probability": float(np.max(result)),
        "image_url": str(image_path)
    }
    # return (image_labels.classes_[result][0])
    
    # itemindex = np.where(result==np.max(result))
    # print("probability:"+str(np.max(result))+"\n"+label_binarizer.classes_[itemindex[1][0]])
    # return label_binarizer.classes_[itemindex[1][0]]

@app.route('/', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        K.clear_session()
        
        # To Make prediction,load model
        filename = 'cnn_model.pkl'
        model = pickle.load(open(filename, 'rb'))

        # Load labels
        filename = 'label_transform.pkl'
        image_labels = pickle.load(open(filename, 'rb'))

        true_label=""

        # BUCKET = os.environ.get('BUCKET', None)
        # aws_access_key_id= os.environ.get('aws_access_key_id', None)
        # aws_secret_access_key= os.environ.get('aws_secret_access_key', None)
        # aws_session_token= os.environ.get('aws_session_token', None)

        print(request.form)
        BUCKET = request.form.get('BUCKET')
        aws_access_key_id= request.form.get('aws_access_key_id')
        aws_secret_access_key= request.form.get('aws_secret_access_key')
        aws_session_token= request.form.get('aws_session_token')
        
        s3 = boto3.client("s3", aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key,aws_session_token=aws_session_token)
        bucket_resource = s3

        # Get the file from post request
        file = request.files['file']
        if file:
            filename = secure_filename(file.filename)
            try:
                bucket_resource.upload_fileobj(
                    file,
                    BUCKET,
                    filename,
                    ExtraArgs={
                        "ACL": "public-read"
                    }
                )
            except Exception as e:
                print("Something Happened: ", e)
                return "Error in uploading file"
            image_file ="{}{}".format('http://{}.s3.amazonaws.com/'.format(BUCKET), filename)

        result = predict_disease(image_file,model,image_labels,true_label)
        return jsonify(result)
    return "Only POST Requests Allowed!!"

if __name__ == '__main__':
    app.run(port=5000,debug=True) #http://127.0.0.1:5000/