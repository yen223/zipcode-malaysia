from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.contrib import admin
from zipcode.api.views import StreetFinder, CityFinder
from rest_framework import routers

router = routers.DefaultRouter()
# router.register(r'zipcode', ZipcodeViewSet)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'zipcodesearch.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^admin/', include(admin.site.urls)),
    url(r'^api/city/(?P<zipcode>.*?)/$', CityFinder.as_view(), name='city_finder_url'),
    url(r'^api/street/(?P<zipcode>.*?)/$', StreetFinder.as_view(), name='street_finder_url'),
    url(r'^api/docs/', include('rest_framework_swagger.urls')),
    url(r'^api/$', include(router.urls)),
    url(r'^$', TemplateView.as_view(template_name="zipcode/index.html")),

)
