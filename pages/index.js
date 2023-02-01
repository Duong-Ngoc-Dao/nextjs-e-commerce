import {getData} from '../utils/fetchData'


const Home = () => {
  return(
    <div>Home</div>
  )
}



export async function getServerSideProps() {
  const res = await getData ('product')
  console.log(res)
  return {
    props: {}, // will be passed to the page component as props
  } 
}


export default Home;