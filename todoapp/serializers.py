from rest_framework import serializers
from todoapp.models import Project, Todo
from users.serializers import UserModelSerializer


class ProjectSerializer(serializers.ModelSerializer):
    workers = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = '__all__'
