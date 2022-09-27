from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import os
from imageresize.views import PILIMGMaker
from PIL import Image

# Create your views here.
@csrf_exempt
def homepage(request):
    if(request.method=='POST'):
       img= request.FILES.get('file')
       print(img)

    return render(request,"imagecrop/Homepage.html")

def resizer(original_image,width,height,format):
    name=os.path.splitext(original_image.name)[0]
    original_image = Image.open(original_image)
    original_image = original_image.convert('RGB')
    original_image = original_image.resize((int(width),int(height)),Image.ANTIALIAS)
    return PILIMGMaker(original_image,name,format)