# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
from unipath import Path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_DIR = Path(__file__).ancestor(1)
MEDIA_ROOT = PROJECT_DIR.child("media")
STATICFILES_DIRS = (PROJECT_DIR.child("assets"),)
MEDIA_URL = '/media/'
file_path = os.path.join(BASE_DIR,'secret_keys.txt')
file = open(file_path,'r')
secrets = {n.split(',')[0]:n.split(',')[1].rstrip() for n in file}
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = secrets['secret_key']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['162.243.101.28']


# Application definition

INSTALLED_APPS = (
    'flat_responsive',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django_cleanup',
    'events',
    'club',
    'department',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'datetimewidget',
    "social_widgets",



)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'qmisclub.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'qmisclub', 'templates'),
                os.path.join(BASE_DIR, 'club', 'templates'),
                os.path.join(BASE_DIR, 'department', 'templates'),
                os.path.join(BASE_DIR, 'events', 'templates'),],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [

                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.template.context_processors.media',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'qmisclub.wsgi.application'

INSTAGRAM_CREDENTIALS = {
    "instagram": {
        "profile": "qmistest",
        "access_token": secrets['instagram'],
    },
}

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': secrets['database_name'],
        'USER': secrets['database_user'],
        'PASSWORD': secrets['database_pass'],
        'HOST': 'localhost',
        'PORT': '',
    }
}
#image settings
DJANGORESIZED_DEFAULT_SIZE = [1920, 1080]
DJANGORESIZED_DEFAULT_QUALITY = 80
DJANGORESIZED_DEFAULT_KEEP_META = True

SITE_ID = 1
ACCOUNT_SIGNUP_FORM_CLASS = 'Users.forms.SignupForm'
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'None'
LOGIN_REDIRECT_URL = "/"

# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = "Asia/Kuwait"

USE_I18N = True

USE_L10N = True

USE_TZ = True
# email setup
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'qmiswebsiteteam@gmail.com'
EMAIL_HOST_PASSWORD = secrets['email']
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)
# to show success message and error message after any operation
from django.contrib.messages import constants as message_constants

MESSAGE_TAGS = {
    message_constants.SUCCESS: 'alert-success',
    message_constants.ERROR: 'alert-danger',
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, '../static/')

try:
    from local_settings import *
except ImportError as exp:
    pass
