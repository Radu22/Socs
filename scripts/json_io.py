import twitter, json



consumer_key = '9M4W5fdGcoJIAnbPFl3TbFXj6'
consumer_secret = 'Q9TqVpG4GgsvZ98EanH2VANWYLKSvBhKsfQvITJJykTbXhuJKp'
access_token = '908491442-KMeSNsIXyLtsDI9ARJfzXg0SjgZAtXnFxm6yD4gu'
access_secret = 'nD2a6fKB0FUsBHj6gTHKq6ZvtoLCARreOrVMKguYXe7TQ'

api = twitter.Api(consumer_key =consumer_key,
                  consumer_secret =consumer_secret,
                  access_token_key = access_token,
                  access_token_secret=access_secret)

searchBy = api.GetSearch("human")
idlist = list()
for i in searchBy:
    idlist.append(i.id)

imagesList = list()
for id in idlist:
    if api.GetStatus(id).media is not None:
        imagesList.append(api.GetStatus(id).media[0].media_url)

with open("media_urls.json", "w") as write_file:
    json.dump(imagesList, write_file)
	

# import git 

# g = git.cmd.Git('./')
# g.push()



