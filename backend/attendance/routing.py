from django.urls import re_path

from . import consumers


websocket_urlpatterns = [
    re_path(r"ws/(?P<join_code>\w+)/$", consumers.CoordinationConsumer.as_asgi())
]
