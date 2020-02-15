import Vue from 'vue'
import app from '../../state/app'
import s from './app.css'

export default Vue.extend({
    name:'myApp',
    data(){
        return{
            s:app()
        }
    },
    render(){
        return(
            <div class={s.app}>fuck you!</div>
        )
    }
})