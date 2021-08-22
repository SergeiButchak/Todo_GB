from django.core.management.base import BaseCommand, CommandError
from users.models import User


class Command(BaseCommand):
    help = 'Fill DB with test users'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, *args, **options):
        count = options['count']
        User.objects.all().delete()
        user = User.objects.create(username='django',
                                   first_name='django',
                                   last_name='geekbrains',
                                   email='django.email.com',
                                   password='geekbrains')
        print(f'Superuser {user} created')

        for i in range(count):
            user = User.objects.create(username=f'Test_{i}',
                                       first_name=f'Test_{i}',
                                       last_name=f'User_{i}',
                                       email=f'Test_User_{i}.email.com',
                                       password=f'Test_User_{i}')
            print(f'User {user} created')
        print('done')
