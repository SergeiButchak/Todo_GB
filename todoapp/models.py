from django.db import models
from users.models import User
# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=250, blank=False, null=False)
    rep_link = models.URLField(null=True)
    workers = models.ManyToManyField(User)


class Todo(models.Model):
    project = models.ForeignKey(Project, related_name='project', on_delete=models.CASCADE)
    description = models.TextField(max_length=4000, blank=False, null=False)
    navi_user = models.ForeignKey(User, related_name='reporter', on_delete=models.CASCADE)
    navi_date = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True, blank=False, null=False)
