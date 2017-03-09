import axios from 'axios'

export default {

  login(param){

    console.log(axios)
    return axios.post('/op/login',param)
  }

}
