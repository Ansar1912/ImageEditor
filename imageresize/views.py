from email.policy import default
import io
# from msilib.schema import Media
import os
import uuid
from zipfile import ZipFile
from click import File
from django.http import HttpResponse
from io import BytesIO

import requests
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render, HttpResponse, redirect
from .models import *
from PIL import Image


# Create your views here.
def mystartfunc(request):
    if(request.method=='POST'):
        width=request.POST['width']
        height=request.POST['height']
        format=request.POST['target-format']
        img = request.FILES.getlist("filename")
        print(width,height,format)
        

        # taking images one by one
        uniquecode=uuid.uuid1()
        zipObj = ZipFile('media/zipfiles/'+str(uniquecode)+'.zip', 'w')
        for image in img:
            resizeimage=resizer(image,width,height,format)
            
            userimg1 = EditPicture(editimage=resizeimage)
            print(userimg1.editimage.name)
            userimg1.save()
            zipObj.write('media/'+userimg1.editimage.name,resizeimage.name)
        zipObj.close()
        return render(request,"imageresize/Homepage.html",{"filename":uniquecode})   
    else:     
        return render(request,"imageresize/Homepage.html",{"filename":""})

def rotater(original_image, width):
    name=original_image.name
    img_io = io.BytesIO()
    original_image = Image.open(original_image)
    original_image = original_image.convert('RGB')
    cropped_img = original_image.transpose(Image.ROTATE_180)
    return PILIMGMaker(cropped_img,name)

def resizer(original_image,width,height,format):
    name=os.path.splitext(original_image.name)[0]
    original_image = Image.open(original_image)
    original_image = original_image.convert('RGB')
    original_image = original_image.resize((int(width),int(height)),Image.ANTIALIAS)
    return PILIMGMaker(original_image,name,format)

def PILIMGMaker(original_image,name,format):
    img_io = io.BytesIO()
    original_image.save(img_io, format=format, quality=100)
    img_content = ContentFile(img_io.getvalue(), name+'.'+format)
    return img_content


def zip_file_view(request,id):
    response = HttpResponse(open('media/zipfiles/'+id+".zip", 'rb'), content_type='application/zip')
    response['Content-Disposition'] = 'attachment; filename='+id+'.zip'
    return response