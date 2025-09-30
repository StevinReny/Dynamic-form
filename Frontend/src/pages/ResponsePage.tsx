
import CardsWorkFlow from '../components/CardsWorkFlow'

const ResponsePage = () => {
  return (
    <div>
        <CardsWorkFlow navigateTo={(wf) => `/response/${wf.id}`}/>
    </div>
  )
}

export default ResponsePage