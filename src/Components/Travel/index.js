import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Item from '../Item/index'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatus = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Travel extends Component {
  state = {
    status: apiStatus.initial,
    isLoading: true,
    travelData: [],
  }

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    this.setState({status: apiStatus.inProgress})
    const response = await fetch('https://apis.ccbp.in/tg/packages')

    if (response.ok === true) {
      const data = await response.json()
      const {packages} = data

      const newData = packages.map(each => ({
        id: each.id,
        description: each.description,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({
        isLoading: false,
        status: apiStatus.success,
        travelData: newData,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  render() {
    const {travelData, status} = this.state
    console.log(travelData)
    return (
      <div className="travel-container">
        <h1 className="travel-heading">Travel Guide</h1>
        <hr className="line" />
        {status === 'IN_PROGRESS' ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="list">
            {travelData.map(each => (
              <Item each={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Travel
