
let app = new Vue({
    el: '#app',
    data: {
        itemArr: []
    },
    methods: {
        // Add button
        handleAddSec() {
            let id = this.itemArr.length;
            this.itemArr.push({
                id : id,
                v : 0,
                pause : true
            });
        }
    }
});



Vue.component('stopwatch', {
    props: ['item'],
    data: function() {
        return {
            timer: ''
        }
    },
    methods: {
        //start/pause button
        handleClickStart(item) {
            item.pause = !item.pause;
            if (item.pause) {
                clearInterval(this.timer);
            } else {
                this.timer = setInterval(() => {
                        item.v++;
                    }, 1000);
            }
            
        },
        //stop button
        handleClickStop(item) {
            if (!item.pause || item.result != 0) {
                item.v = 0;
                item.pause = true;
                clearInterval(this.timer);
            }            
        }
    },
    computed: {
        resultTime() {
            let sec = this.item.v;
            if (sec < 60) return sec;
            else if (sec < 3600) {
                let min = (Math.floor(sec / 60) < 10 ? '0' : '') + Math.floor(sec / 60),
                    seconds = (sec % 60 < 10 ? '0' : '') + (sec % 60);
                return min + ':' + seconds;
            } else {
                let hour = (Math.floor(sec / 3600) < 10 ? '0' : '') + Math.floor(sec / 3600),
                    min = (Math.floor(sec % 3600 / 60) < 10 ? '0' : '') + Math.floor(sec % 3600 / 60),
                    seconds = (sec % 60 < 10 ? '0' : '') + (sec % 60);
                return hour + ':' + min + ':' + seconds; 
            }
        }
    },
    template: `
    <div class = "sec">
        <div class="top" >{{ resultTime }}</div>
        <div class="bottom">
            <div class="btn_start-pause"
            v-on:click = "handleClickStart(item)"></div>
            <div class="btn_stop"
            v-on:click = "handleClickStop(item)"></div>
        </div>
    </div>
    `
});