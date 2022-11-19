import { Helmet } from 'react-helmet'
import AppLayout from 'src/containers/app-layout'
import { HomeNavigation } from 'src/containers/home/home-menu'
import { HomeSlider } from 'src/containers/home/home-slider'

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Oisie - TOP</title>
      </Helmet>
    </>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return (
    <AppLayout slideShow={<HomeSlider />} nav={<HomeNavigation />}>
      {page}
    </AppLayout>
  )
}
