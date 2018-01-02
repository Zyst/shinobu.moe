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

  const fetchandPass = (url, render) =>
    fetch(url)
      .then(response => response.json())
      .then(response => render(response))

  // TODO: Implement this
  const renderRadio = radio => {
    return radio
  }

  // TODO: Implement this
  const renderLastFm = lastFm => {
    return lastFm
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

        // If everything went wrong, we retry in 5 seconds
        if (lastFm instanceof Error && radio instanceof Error) {
          const RETRY_IN_MILISECONDS = 5000

          setTimeout(start, RETRY_IN_MILISECONDS)
        }

        // If Last.fm is an error, and r/a/dio isn't
        if (lastFm instanceof Error && !(radio instanceof Error)) {
          return renderRadio(radio)
        }

        const CURRENT_SONG_INDEX = 0
        const lastFmSong = lastFm.recenttracks.track[CURRENT_SONG_INDEX]

        // If radio is an error, and last.fm isn't
        if (radio instanceof Error && !(lastFm instanceof Error)) {
          return renderLastFm(lastFm)
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
          return renderRadio(radio)
        } else if (currentlyPlaying) {
          return renderLastFm(lastFm)
        } else {
          return renderRadio(radio)
        }
      })
  }

  start()
})()
