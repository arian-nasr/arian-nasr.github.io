import os
import eyed3

albumurl = 'https://open.spotify.com/playlist/37i9dQZF1DX4JAvHpjipBk?si=24a589483fde4d08'
downloadsdir = os.path.abspath('downloads/')

def download_album(url):
    os.chdir(downloadsdir)
    os.system('spotdl {}'.format(url))
    os.chdir('..')

def extract_metadata():
    for filename in os.listdir(downloadsdir):
        filepath = os.path.join(downloadsdir, filename)
        audiofile = eyed3.load(filepath)
        print(audiofile.tag.artist)

extract_metadata()