from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from imageresize.views import PILIMGMaker,zip_file_view
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
from django.http import JsonResponse

# Create your views here.
@csrf_exempt
def homepage(request):
    if request.method == "POST":
        img = request.FILES.getlist("filename")
        imgpos = request.POST.getlist('imgposition[]')
        watermarkimg = request.FILES.get('watermarkimg')
        format=request.POST.get('target-format')
        print(img,imgpos,watermarkimg,format)


        i=0
        uniquecode=uuid.uuid1()
        zipObj = ZipFile('media/zipfiles/'+str(uniquecode)+'.zip', 'w')
        for image in img:
            watermarkedimage=watermark(image,watermarkimg,imgpos[i],imgpos[i+1],format)
            i=i+2
            
            userimg1 = EditPicture(editimage=watermarkedimage)
            # print(userimg1.editimage.name)
            userimg1.save()
            zipObj.write('media/'+userimg1.editimage.name,watermarkedimage.name)
        zipObj.close()
        return JsonResponse({"filename":uniquecode})
    else:    
        return render(request,"imagewatermark/Homepage.html")

def watermark(original_image,watermarkimg,xaxis,yaxis,format):
    name=os.path.splitext(original_image.name)[0]
    original_image = Image.open(original_image)
    watermark=Image.open(watermarkimg)
    original_image = original_image.convert('RGB')
    watermark=watermark.convert('RGB')
    original_image.paste(watermark,(int(xaxis),int(yaxis)))
    return PILIMGMaker(original_image,name,format)

