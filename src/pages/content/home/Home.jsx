import React from 'react'
import { Main } from '../../../components/content/Main'
import { Row } from '../../../components/content/Row'
import requests from '../../../constant/Tmdb'

export const Home = () => {
  return (
    <>
      <Main />
      {/* Rows */}
      <Row rowId={1} title='Up coming' fetchURL={requests.requestUpcoming} />
      <Row rowId={2} title='popular' fetchURL={requests.requestPopular} />
      <Row rowId={3} title='trending' fetchURL={requests.requestTrending} />
      <Row rowId={4} title='top rated' fetchURL={requests.requestTopRated} />
      <Row rowId={5} title='horror' fetchURL={requests.requestHorror} />
      {/* Rows */}
    </>
  )
}
