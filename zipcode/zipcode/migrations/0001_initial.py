# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Zipcode'
        db.create_table(u'zipcode_zipcode', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('zipcode', self.gf('django.db.models.fields.CharField')(max_length=10)),
            ('street', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('city', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('state', self.gf('django.db.models.fields.CharField')(max_length=3)),
        ))
        db.send_create_signal(u'zipcode', ['Zipcode'])

        # Adding unique constraint on 'Zipcode', fields ['zipcode', 'street', 'city', 'state']
        db.create_unique(u'zipcode_zipcode', ['zipcode', 'street', 'city', 'state'])


    def backwards(self, orm):
        # Removing unique constraint on 'Zipcode', fields ['zipcode', 'street', 'city', 'state']
        db.delete_unique(u'zipcode_zipcode', ['zipcode', 'street', 'city', 'state'])

        # Deleting model 'Zipcode'
        db.delete_table(u'zipcode_zipcode')


    models = {
        u'zipcode.zipcode': {
            'Meta': {'unique_together': "(('zipcode', 'street', 'city', 'state'),)", 'object_name': 'Zipcode'},
            'city': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'state': ('django.db.models.fields.CharField', [], {'max_length': '3'}),
            'street': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'zipcode': ('django.db.models.fields.CharField', [], {'max_length': '10'})
        }
    }

    complete_apps = ['zipcode']