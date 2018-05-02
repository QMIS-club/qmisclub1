from __future__ import unicode_literals, absolute_import

from django.conf import settings

# Import urlopen in Python2 and 3
try:
	from urllib.request import urlopen, HTTPError
except ImportError:
	from urllib2 import urlopen, HTTPError

from httplib import HTTPException


import json



class InstagramReader(object):

	URL = 'https://api.instagram.com/v1/users/self/media/recent/?access_token={0}'

	def __init__(self):
		credentials = self._get_credentials()
		self.access_token = credentials["access_token"]
		self.profile = credentials["profile"]
		self.api = None

	def connect(self):
		self.api = None

	def get_last_media(self, num_images=5):
		# If there is a hit, get from cache

		# Otherwise fetch data from instagram servers
		url = InstagramReader.URL.format(self.access_token)
		try:
			response = urlopen(url).read().decode('utf8')
			#print(response)
			data = response
		except (HTTPError, HTTPException, ValueError) as e:
			'''if SocialNetworkItemCache.hit("instagram", num_images):
				return SocialNetworkItemCache.get("instagram", num_images).response_dict'''
			return []
		data = json.loads(response)
		meta = data.get('meta', None)
		code = meta.get('code', None)

		instagram_images = []

		if code == 200:
			fetched_images = data.get('data', None)
			if fetched_images:
				for x in fetched_images:
					if x['type'] == 'image':
						instagram_images.append(x)
					else:
						pass
		return instagram_images[:num_images]

	# Return the credentials of the Instagram account
	def _get_credentials(self):
		instagram_credentials = settings.INSTAGRAM_CREDENTIALS.get("instagram")
		if not instagram_credentials:
			raise AssertionError(u"Credentials not found for instagram")

		if type(instagram_credentials) is dict:
			return instagram_credentials

		raise AssertionError(u"No other credential source is implemented at the moment")
