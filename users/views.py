from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin
from users.models import User
from users.serializers import UserModelSerializer


class UserModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
