// eslint-disable-next-line no-extra-semi
;(() => {
  const LAST_FM_URL =
    'https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=Zystx&api_key=57ee3318536b23ee81d6b27e36997cde&limit=1&format=json'
  const RADIO_URL = 'https://r-a-d.io/api'

  const zeroPadding = seconds => {
    var secondsString = String(seconds)

    if (secondsString.length > 1) {
      // Do nothing
      return secondsString
    }

    return '0' + secondsString
  }

  const fetchThenRender = (url, render, playing) =>
    fetch(url)
      .then(response => response.json())
      .then(response => render(response, playing))

  const setupRadio = radio => {
    document.getElementById('playing-container').style.display = 'block'
    document.getElementById('bar-and-listeners').style.display = 'block'

    document.getElementById('spinner').style.display = 'none'

    return renderRadio(radio)
  }

  const setupLastFm = lastFm => {
    document.getElementById('playing-container').style.display = 'block'
    document.getElementById('last-fm-scrobbling').style.display = 'block'

    document.getElementById('spinner').style.display = 'none'

    return renderLastFm(lastFm)
  }

  // TODO: Implement this
  const renderRadio = (radio, lastPlaying) => {
    const playing = radio.main.np
    const dj = radio.main.dj.djname
    const image = `https://r-a-d.io/api/dj-image/${radio.main.dj.id}`
    const listeners = radio.main.listeners

    // We always update listeners
    document.getElementById('listeners').innerText = `Listeners: ${listeners}`

    if (playing !== lastPlaying) {
      document.getElementById('now-playing').innerText = playing
      document.getElementById('IMG_3').src = image
      document.getElementById('DJ-name').innerText = dj
    }

    const RECHECK_IN_MILISECONDS = 5000

    return setTimeout(() => {
      fetchThenRender(RADIO_URL, renderRadio, lastPlaying)
    }, RECHECK_IN_MILISECONDS)
  }

  const renderLastFm = (lastFm, lastPlaying) => {
    const CURRENT_SONG_INDEX = 0
    const lastFmSong = lastFm.recenttracks.track[CURRENT_SONG_INDEX]

    const playing = `${lastFmSong.artist['#text']} - ${lastFmSong.name}`
    const image = lastFmSong.image.reduce((current, img) => {
      // Overwrite the older image with current, it has a higher resolution
      if (img['#text']) return img['#text']

      return current
    }, 'images/dj.jpg')
    const DJ = 'Zyst'

    // If the image changed we re-render
    if (playing !== lastPlaying) {
      document.getElementById('now-playing').innerText = playing
      document.getElementById('IMG_3').src = image
      document.getElementById('DJ-name').innerText = DJ
    }

    const RECHECK_IN_MILISECONDS = 5000

    return setTimeout(() => {
      fetchThenRender(LAST_FM_URL, renderLastFm, lastPlaying)
    }, RECHECK_IN_MILISECONDS)
  }

  // Determines which image is our Background randomly
  const randomBG = () => {
    const NUMBER_OF_IMAGES = 14
    const MAKE_IT_NOT_ZERO = 1

    const randomNumber = Math.floor(
      Math.random() * NUMBER_OF_IMAGES + MAKE_IT_NOT_ZERO
    )

    const bg = document.body

    bg.style.backgroundImage = `url('images/${randomNumber}.png')`
  }

  const start = () => {
    randomBG()

    const promiseArray = [fetch(LAST_FM_URL), fetch(RADIO_URL)]

    /**
     * We don't want to give up if one fails, r/a/dio or last.fm might be
     * down, but not the other
     */
    Promise.all(promiseArray.map(p => p.catch(e => e)))
      .then(responses => {
        return Promise.all(
          responses.map(r => {
            if (!r.json) return r

            return r.json()
          })
        )
      })
      .then(responses => {
        const [lastFm, radio] = responses

        const lastFmError = lastFm.error || lastFm instanceof Error
        const radioError = radio instanceof Error

        // If everything went wrong, we retry in 5 seconds
        if (lastFmError && radioError) {
          const RETRY_IN_MILISECONDS = 5000

          return setTimeout(start, RETRY_IN_MILISECONDS)
        }

        // If Last.fm is an error, and r/a/dio isn't
        if (lastFmError && !radioError) {
          return setupRadio(radio)
        }

        const CURRENT_SONG_INDEX = 0
        const lastFmSong = lastFm.recenttracks.track[CURRENT_SONG_INDEX]

        // If radio is an error, and last.fm isn't
        if (radioError && !lastFmError) {
          return setupLastFm(lastFm)
        }

        // If we got here, that means both calls finished successfully
        const radioPlaying = radio.main.np
        const lastFmPlaying = `${lastFmSong.artist['#text']} - ${
          lastFmSong.name
        }`

        const currentlyPlaying =
          lastFmSong !== undefined &&
          lastFmSong['@attr'] !== undefined &&
          lastFmSong['@attr'].nowplaying !== undefined &&
          lastFmSong['@attr'].nowplaying === 'true'

        if (
          currentlyPlaying &&
          radioPlaying.toUpperCase() === lastFmPlaying.toUpperCase()
        ) {
          return setupRadio(radio)
        } else if (currentlyPlaying) {
          return setupLastFm(lastFm)
        } else {
          return setupRadio(radio)
        }
      })
  }

  start()
})()
