from django.db import models

# Create your models here.
class EditPicture(models.Model):
    editimage= models.ImageField(upload_to='imagewatermark/Editimage',default="")

