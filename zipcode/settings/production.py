from common import *

DEBUG = False
TEMPLATE_DEBUG = False

STATIC_ROOT = '/var/www/zipcode.weiyen.me/static/'
ALLOWED_HOSTS = [{{inventory_hostname}}]

DATABASES["default"]["NAME"] = "{{database_name}}"
DATABASES["default"]["USER"] = "postgres"
DATABASES["default"]["PASSWORD"] = {{}}
DATABASES["default"]["HOST"] = "127.0.0.1"

# Secrets
SECRET_KEY = '{{}}'