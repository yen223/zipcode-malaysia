from common import *

DEBUG = False
STATIC_ROOT = '/var/www/zipcode.weiyen.me/static/'
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "zipdb",
        "USER": "postgres",
        "PASSWORD": "",
        "HOST": DB_HOST,
    }
}