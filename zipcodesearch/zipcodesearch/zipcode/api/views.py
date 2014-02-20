from datetime import date
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.db.models import Q
from rest_framework import views, viewsets, generics, mixins
from rest_framework.decorators import link
from rest_framework.response import Response
from ..models import Zipcode
from .serializers import ZipcodeSerializer, StateSerializer


class StateFinder(views.APIView):
    def get(self, request, zipcode):
        qs = Zipcode.objects.filter(zipcode=zipcode).distinct('city', 'state')
        serializer = StateSerializer(qs)
        return Response(serializer.data)


class ZipcodeViewSet(viewsets.ReadOnlyModelViewSet):
    '''
    An API to retrieve zipcode entries.
    '''
    model = Zipcode
    serializer_class = ZipcodeSerializer
