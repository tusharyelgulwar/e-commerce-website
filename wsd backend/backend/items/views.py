from django.http import JsonResponse
from .models import Item

def get_all_items(request):
    items = Item.objects.all()
    data = [{'id': item.id, 'name': item.name, 'description': item.description,'price': item.price, 'imageUrl': item.imageUrl, 'ratings': item.ratings} for item in items]
    return JsonResponse(data, safe=False)
