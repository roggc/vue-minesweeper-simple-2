import Vue from 'vue'
import s from './cell.css'

export default Vue.extend({
    name:'cell',
    props:{
        s:Object,
        i:Number,
        j:Number,
        refs:Object,
        minesweeperState:Object
    },
    watch:{
        's.covered':function(value,old){
            //we click other cells around
            if(!value&&old){
                if(!this.s.withMine){
                const i=this.i
                const j=this.j
                if(!this.s.covered&&this.minesweeperState.cells[i][j].minesAround===0){
                    this.refs[(i-1)+'_'+(j-1)]&&
                    this.minesweeperState.cells[i-1][j-1].covered&&
                    this.refs[(i-1)+'_'+(j-1)].$el.click()

                    this.refs[(i-1)+'_'+(j)]&&
                    this.minesweeperState.cells[i-1][j].covered&&
                    this.refs[(i-1)+'_'+(j)].$el.click()

                    this.refs[(i-1)+'_'+(j+1)]&&
                    this.minesweeperState.cells[i-1][j+1].covered&&
                    this.refs[(i-1)+'_'+(j+1)].$el.click()

                    this.refs[(i)+'_'+(j-1)]&&
                    this.minesweeperState.cells[i][j-1].covered&&
                    this.refs[(i)+'_'+(j-1)].$el.click()

                    this.refs[(i)+'_'+(j+1)]&&
                    this.minesweeperState.cells[i][j+1].covered&&
                    this.refs[(i)+'_'+(j+1)].$el.click()

                    this.refs[(i+1)+'_'+(j-1)]&&
                    this.minesweeperState.cells[i+1][j-1].covered&&
                    this.refs[(i+1)+'_'+(j-1)].$el.click()

                    this.refs[(i+1)+'_'+(j)]&&
                    this.minesweeperState.cells[i+1][j].covered&&
                    this.refs[(i+1)+'_'+(j)].$el.click()

                    this.refs[(i+1)+'_'+(j+1)]&&
                    this.minesweeperState.cells[i+1][j+1].covered&&
                    this.refs[(i+1)+'_'+(j+1)].$el.click()
                }
            }else{
                this.minesweeperState.finished=true
                this.minesweeperState.win=false
            }
        }
    }
    },
    render(){
        // console.log('render cell')

        const classes=[]
        classes.push(s.cell)
        if(this.s.covered){
            classes.push(s.covered)
        }

        return (
            <div  
            class={classes.join(' ')} 
            vOn:click={()=>this.$emit('clicked')}>
            {!this.s.covered&&this.s.withMine&&'😫'}
            {!this.s.covered&&this.s.minesAround>0&&!this.s.withMine&&this.s.minesAround}
            </div>
        )
    }
})