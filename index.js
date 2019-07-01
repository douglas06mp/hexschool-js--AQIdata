var app = new Vue({
  el: '#app',
  data: {
    data: [],
    selectedCity: '',
    currentCity: '臺北市',
    currentCityData: [],
    currentMainSiteData: []
  },
  methods: {
    getCityData(cityName){
      var cityData = this.data.filter(city => {
        return city.County === cityName
      })
      return cityData
    },
    changeMainSite(e){
      var newData = this.currentCityData.filter(city => {
        return city.SiteName === e.target.innerText
      })
      this.currentMainSiteData = newData[0]
    },
    getAqiColor(val){
      val = Math.round(val)
      if (val > 0 && val < 50) {
          return 'less50';
      } else if (val > 51 && val < 100) {
          return 'less100';
      } else if (val > 101 && val < 150) {
          return 'less150';
      } else if(val > 151 && val < 200){
          return 'less200';
      } else if(val > 201 && val < 300){
          return 'less300';
      } else if(val > 301 && val < 400){
          return 'less400';
      }
    }
  },
  watch: {
    selectedCity(city) {
      this.currentCity = city
      this.currentCityData = this.getCityData(city)
      this.currentMainSiteData = this.currentCityData[0]
    }
  },
  created() {
    var vm = this
    axios.get('https://cors-anywhere.herokuapp.com/http://opendata.epa.gov.tw/ws/Data/AQI/?$format=json')
        .then(res => {
          vm.data = res.data
          vm.currentCityData = vm.getCityData(vm.currentCity)
          vm.currentMainSiteData = vm.currentCityData[0]
        }).catch(error => {
          alert("Can't get the data")
          console.log(error)
        })
  }

})
