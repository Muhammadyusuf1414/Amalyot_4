from django.urls import path
from .views import BlogPostListCreateView, BlogPostRetrieveUpdateDeleteView

urlpatterns = [
    path('posts/', BlogPostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', BlogPostRetrieveUpdateDeleteView.as_view(), name='post-detail'),
]
