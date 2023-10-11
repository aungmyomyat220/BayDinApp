import MainBody from '@/app/component/MainBody'
import Header from '@/app/component/Header'

export default function Home() {
  return (
    <>
      <div className='h-screen pt-10 p-10 bg-gray-300'>
          <Header/>
          <MainBody/>
      </div>
    </>
  )
}
