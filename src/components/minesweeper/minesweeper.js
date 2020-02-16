import Vue from 'vue'
import state from './state'
import cellState from './cell/state'
import s from './minesweeper.css'
import Cell from './cell/cell'

export default Vue.extend({
    name:'minesweeper',
    data(){
        return {
            s:null
        }
    },
    watch:{
        's.numOfUncoveredCells':function(value){
            if(value+this.s.numOfMines===
                this.s.dimension*this.s.dimension){
                    this.s.finished=true
                    this.s.win=true
                }
        },
    },
    methods:{
        restart(){
            this.s=Vue.observable(state())

            //we set state for cells
            const cellsState=[]
            for(let i=0;i<this.s.dimension;i++){
                cellsState[i]=new Array(this.s.dimension)
                for(let j=0;j<this.s.dimension;j++){
                    cellsState[i][j]=cellState()
                }
            }
            this.s.cells=Vue.observable(cellsState)

              //we set mines
              for(let i=0;i<this.s.dimension;i++){
                for(let j=0;j<this.s.dimension;j++){
                    this.s.cells[i][j].withMine=Math.random()<this.s.level
                    if(this.s.cells[i][j].withMine){
                        this.s.numOfMines++
                    }
                }
            }
    
            //we set minesAround
            for(let i=0;i<this.s.dimension;i++){
                for(let j=0;j<this.s.dimension;j++){
                    let minesAround=0
    
                    this.s.cells[i-1]&&this.s.cells[i-1][j-1]&&
                    this.s.cells[i-1][j-1].withMine&&minesAround++
    
                    this.s.cells[i-1]&&
                    this.s.cells[i-1][j].withMine&&minesAround++
    
                    this.s.cells[i-1]&&this.s.cells[i-1][j+1]&&
                    this.s.cells[i-1][j+1].withMine&&minesAround++
    
                    this.s.cells[i][j-1]&&
                    this.s.cells[i][j-1].withMine&&minesAround++
    
                    this.s.cells[i][j+1]&&
                    this.s.cells[i][j+1].withMine&&minesAround++
    
                    this.s.cells[i+1]&&this.s.cells[i+1][j-1]&&
                    this.s.cells[i+1][j-1].withMine&&minesAround++
    
                    this.s.cells[i+1]&&
                    this.s.cells[i+1][j].withMine&&minesAround++
    
                    this.s.cells[i+1]&&this.s.cells[i+1][j+1]&&
                    this.s.cells[i+1][j+1].withMine&&minesAround++
    
                    this.s.cells[i][j].minesAround=minesAround
                }
            }
        }
    },
    created(){
        this.restart()
    },
    render(){
        // console.log('render minesweeper')

        const restart=()=>{
            this.restart()
            // console.log(this.s)
        }

        const clicked=i=>j=>()=>{
            if(this.s.cells[i][j].covered&& !this.s.finished){
                this.s.cells[i][j].covered=false
                this.s.numOfUncoveredCells++
            }
        }

        //we create cells
        const cells=[]
        for(let i=0;i<this.s.dimension;i++){
            cells[i]=new Array(this.s.dimension)
            for(let j=0;j<this.s.dimension;j++){
                cells[i][j]=
                <Cell 
                i={i}
                j={j}
                refs={this.$refs}
                s={this.s.cells[i][j]} 
                minesweeperState={this.s}
                vOn:clicked={clicked(i)(j)}
                ref={i+'_'+j}/>
            }
        }
        let message=''

        if(this.s.finished){
            if(this.s.win){
                message='you win'
            }else{
                message='you loose'
            }
        }

        return(
            <div class={s.app}>
            <div class={s.minesweeper}>
                {cells.map(row=><div class={s.clear}>{row}</div>)}
            </div>
            <div>{message}</div>
            <button vOn:click={restart}>restart</button>
            </div>
        )
    },
})