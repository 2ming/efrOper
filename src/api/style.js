export default {

  getStyleCategory(param){
    return this.axios.post('/op/login',param)
  }

}
