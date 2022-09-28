from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import os
from imageresize.views import PILIMGMaker
from PIL import Image
from .models import EditPicture
from django.http import JsonResponse
# Create your views here.
@csrf_exempt
def homepage(request):
    if(request.method=='POST'):
       img= request.FILES.get('croppedImage')

       # size=(request.POST.getlist('size'))
       # print(img,size)
       # croppedimg=crop(img,size)
       userimg1 = EditPicture(editimage=img)
       userimg1.save()
       return JsonResponse({"filename":img.read()})
    return render(request,"imagecrop/Homepage.html")

def crop(original_image,size):
    name=os.path.splitext(original_image.name)[0]
    format=(os.path.splitext(original_image.name))[1]
    format=format.replace(".","")
    original_image = Image.open(original_image)
    # original_image = original_image.convert('RGB')
    original_image = original_image.crop((float(size[0]), float(size[1]), float(size[2]), float(size[3])))
    return PILIMGMaker(original_image,name,format)