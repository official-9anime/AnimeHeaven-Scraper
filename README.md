# AnimeHeaven Scraper
Hi, this is a basic scraper for the Anime Heaven website I made.
Currently I don't provide a public endpoint for this api, but you can self-host it for free using vercel. Just fork this repository, open vercel.app, make an account and create a new project. For the new project select your fork of this repository, and that should be it, any issues please open one in the issues tab.

# "Documentation"
I won't go too into detail since it's really straightforward, but this api counts with 6 endpoints.
Popular, search, info, watch, download, and tags.

## Popular
Really simple, returns a list of the 100 most popular animes of the day from most to least.

To use simply visit **_your-url_**/api/popular

Example of return (but trimmed down to only 2 entries):
```
[
{
"name": "anime1",
"image": "image1 url",
"id": "id1"
},
{
"name": "anime2",
"image": "image2 url",
"id": "id2"
}
]
```

## Search
Returns the elements in a search, if you search for something that doesn't exist it returns an empty array.

To use simply visit **_your-url_**/api/search?query=**_your-search_**

Make sure your query has no spaces, replace spaces with "%20"

Example of return:
```
[
{
"name": "anime1",
"image": "image1 url",
"id": "id1"
},
{
"name": "anime2",
"image": "image2 url",
"id": "id2"
}
]
```

## Info
Returns data of an anime you searched for. **WARNING** some data may be returned as *null* depending on the anime, make sure you handle this in your project, I'll probably fix it later to return a placeholder.

To use simply visit **_your-url_**/api/info?query=**_id-of-anime_**

Example of returns:
```
{
"id": "id of anime",
"banner": "banner image url",
"poster": "poster image url",
"title": "Name of anime",
"desc": "Anime description",
"episodes": "Amount of episodes (has number+ if anime is ongoing) (ex. 9+)",
"year": "Years the anime was airing",
"score": "anime score",
"ongoing": true or false,
"nextEp": "Days/hours/mins until next episode airs",
"tags": [
"Action",
"Drama"
],
"episodeIds": [
"episodeId1",
"episodeId2",
]
}
```

## Watch
Returns the video url of an episode. You can embed this directly as it's just a videoplayer.

To use simply visit **_your-url_**/api/watch?query=**_id-of-episode_**

Example of returns:
```
{
"videoLink": "video url"
}
```

## Download
Retuns the Direct Download Link of an episode. Downloads as an mp4 file.

To use simply visit **_your-url_**/api/download?query=**_id-of-episode_**

Example of returns:
```
{
"download": "download url"
}
```

## Tags
Returns a list of animes that contain that tag. 

To use simply visit **_your-url_**/api/tags?query=**tag**

Make sure your query has no spaces, replace spaces with "%20"
Make sure to include the tags as is in the info section, if you modify an uppercase to a lowercase it won't work. The only exception being replacing spaces with %20 (like Based On A Manga becomes Based%20On%20A%20Manga)

Example of returns:
```
[
{
"name": "anime1",
"image": "image1 url",
"id": "id1"
},
{
"name": "anime2",
"image": "image2 url",
"id": "id2"
}
]
```
