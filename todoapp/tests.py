import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from todoapp.views import ProjectViewSet, TodoViewSet
from todoapp.models import Project, Todo
# from django.conf import settings
#
# settings.configure()


class TestProjectViewSet(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            'user', 'user@r.com', 'user'
        )

    def test_get_project_list_no_auth(self):
        # 1 APIRequestFactory
        project = mixer.blend(Project)
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        # print(response.render().content)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_project_list_auth(self):
        # 1 APIRequestFactory
        project = mixer.blend(Project)
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        force_authenticate(request, self.user)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        # print(response.render().content)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_project_detail(self):
        # 2 APIClient
        project = Project.objects.create(name='todo',
                                         rep_link='https://github.com/SergeiButchak/Todo_GB',
                                         )
        project.workers.add(self.user.id)
        cleint = APIClient()
        cleint.login(username='user', password='user')
        response = cleint.get(f'/api/projects/{project.id}/')
        # print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTodoViewSet(APITestCase):

    def test_add_and_update_todo(self):
        admin = get_user_model().objects.create_superuser(username='admin', email='admin@my.com', password='admin12345')
        project = Project.objects.create(name='todo', rep_link='https://github.com/SergeiButchak/Todo_GB')
        self.client.login(username='admin', password='admin12345')
        response = self.client.post('/api/todo/', {'description': 'test',
                                                   'project': project.id,
                                                   'naviUser': admin.id,
                                                   'isActive': True})
        todo_id = json.loads(response.content.decode())['id']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.put(f'/api/todo/{todo_id}/', {'description': 'test done',
                                                             'project': project.id,
                                                             'naviUser': admin.id,
                                                             'isActive': False})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = Todo.objects.get(id=todo_id)
        self.assertEqual('test done', todo.description)
        self.assertEqual(False, todo.is_active)


# Create your tests here.
