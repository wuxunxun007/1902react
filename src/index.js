import axios from 'axios'
import '@/main'
axios.get('https://m.9ji.com/web/api/floors/v1?label=0&page=1&random=0')
  .then(res => {
    console.log(res)
  })
console.log('hello webpack')