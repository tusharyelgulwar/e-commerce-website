from django.urls import path
from .views import get_all_items

urlpatterns = [
    path('items/', get_all_items, name='get_all_items'),
]
