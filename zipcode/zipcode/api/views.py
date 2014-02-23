from datetime import date
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.db.models import Q
from rest_framework import views, viewsets, generics, mixins
from rest_framework.decorators import link
from rest_framework.response import Response
from ..models import Zipcode
from .serializers import StreetSerializer, CitySerializer


class CityFinder(generics.ListAPIView):
    model = Zipcode
    paginate_by = 10
    serializer_class = CitySerializer

    def get(self, request, zipcode, *args, **kwargs):
        self.zipcode = zipcode
        return super(CityFinder, self).get(request, *args, **kwargs)

    def get_queryset(self):
        qs = Zipcode.objects.filter(zipcode=self.zipcode).distinct('city', 'state')
        return qs


class StreetFinder(generics.ListAPIView):
    model = Zipcode
    paginate_by = 10
    serializer_class = StreetSerializer
    
    def get(self, request, zipcode, *args, **kwargs):
        self.zipcode = zipcode
        return super(StreetFinder, self).get(request, *args, **kwargs)

    def get_queryset(self):
        qs = Zipcode.objects.filter(zipcode=self.zipcode)
        return qs