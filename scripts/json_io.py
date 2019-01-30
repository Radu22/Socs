import twitter, json, requests
from PIL import Image
from io import BytesIO

consumer_key = '9M4W5fdGcoJIAnbPFl3TbFXj6'
consumer_secret = 'Q9TqVpG4GgsvZ98EanH2VANWYLKSvBhKsfQvITJJykTbXhuJKp'
access_token = '908491442-KMeSNsIXyLtsDI9ARJfzXg0SjgZAtXnFxm6yD4gu'
access_secret = 'nD2a6fKB0FUsBHj6gTHKq6ZvtoLCARreOrVMKguYXe7TQ'

api = twitter.Api(consumer_key =consumer_key,
                  consumer_secret =consumer_secret,
                  access_token_key = access_token,
                  access_token_secret=access_secret)

def get_image_size(url):
    data = requests.get(url).content
    im = Image.open(BytesIO(data))    
    return im.size

searchByCat = api.GetSearch("cat", count=200)
searchByDog = api.GetSearch("dogs", count=100)
idlist = list()
for i in searchByCat:
    idlist.append(i.id)

for i in searchByDog:
    idlist.append(i.id)

imagesList = list()
lenghtTweet = list()
lenghtDescription = list()


"""for id in idlist:
    if api.GetStatus(id).media is not None :
        width, height = get_image_size(api.GetStatus(id).media[0].media_url)
        imagesList.append(width*height)
        lenghtTweet.append(len(api.GetStatus(id).text))

for id in idlist:
    if api.GetStatus(id).text is not None :
        lenghtTweet.append(len(api.GetStatus(id).text))"""

for id in range(0,len(idlist)):
    if api.GetStatus(id).user is not None :
        print(len(api.GetStatus(id)))

"""imagesList.sort()
lenghtTweet.sort()"""

"""with open("scripts/lungime_poze.json", "w") as write_file:
    json.dump(imagesList, write_file)

with open("scripts/lungime_tweet.json", "w") as write_file:
    json.dump(lenghtTweet, write_file)"""

# with open("scripts/lungimeDescriere_tweet.json", "w") as write_file:
#     json.dump(lenghtDescription, write_file)

