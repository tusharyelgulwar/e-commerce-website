from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    imageUrl = models.URLField()
    ratings = models.DecimalField(max_digits=3, decimal_places=1)

    def __str__(self):
        return self.name