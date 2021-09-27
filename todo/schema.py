import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, Todo
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all().select_related()

    def resolve_all_todos(self, info):
        return Todo.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
