import requests
from urllib.request import Request, urlopen
import datetime
from bs4 import BeautifulSoup

#https://www.codechef.com/rankings/FEB21B?order=asc&search=darshan124&sortBy=rank
hdr = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36'}

url ="https://leetcode.com/leaderboard/"
req = Request(url, headers=hdr)
page = urlopen(req)
soup = BeautifulSoup(page)

x = soup.find('body')
print(x)