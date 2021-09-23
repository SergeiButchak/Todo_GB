"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.renderers import JSONOpenAPIRenderer, BrowsableAPIRenderer
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework.schemas import get_schema_view
from drf_yasg.views import get_schema_view as get_schema
from drf_yasg import openapi
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.views import UserModelViewSet
from todoapp.views import ProjectViewSet, TodoViewSet

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectViewSet)
router.register('todo', TodoViewSet)

schema_v1 = get_schema_view(
        title="Todo",
        permission_classes=[IsAuthenticatedOrReadOnly],
        renderer_classes=[JSONOpenAPIRenderer, BrowsableAPIRenderer],
    )

schema_v2 = get_schema(
    openapi.Info(
        title="Todo",
        default_version='v1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[IsAuthenticatedOrReadOnly],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/<version>/', include(router.urls)),
    path('api/token-auth/', views.obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('schema_url/', schema_v1, name='openapi-schema'),
    path('swagger-simple/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
        ),
         name='swagger-ui'
    ),
    path('redoc-simple/', TemplateView.as_view(
        template_name='redoc-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
        ),
         name='redoc-ui'
    ),
    path('swagger/', schema_v2.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_v2.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]
