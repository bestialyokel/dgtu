<template>
    <div ref="dpRef" v-outside:[setDisplayFalse] class="datepicker">
        <input ref="inputRef" @click="ff" @click.prevent="displayModal=!displayModal" :value="submited.map(x=>x.toLocaleDateString()).join(' - ')"  type="text" name="datepicker" readonly/>
        <div v-if="displayModal" class="modal" :style="{top: (offsetTop + inputHeight + 10) + 'px', left: (offsetLeft) + 'px' }" >
            <template v-if="range">
                <Calendar 
                          :onMonthChange="handleMonthChange"
                          :onChange="handleRangeCalendarDateSelect"
                          :selected="m_selected"
                          :year="_year"
                          :month="_month"
                          disableNext/>

                <Calendar 
                          :onMonthChange="handleMonthChange"
                          :onChange="handleRangeCalendarDateSelect"
                          :selected="m_selected"
                          :year="_year"
                          :month="_month + 1"
                          disablePrev/>
            </template>

            <template v-else>
                <Calendar :year="_year"
                          :month="_month"
                          :selected="m_selected"
                          :onChange="handleSingleCalendarDateSelect"
                          :onMonthChange="handleMonthChange"/>
            </template>


            <div v-if="range" class="footer">
                <span class="result">{{submited.map(x=>x.toLocaleDateString()).join(' - ')}}</span>
                <button @click="handleReturn" class="close">Отмена</button>
                <button :disabled="range && m_selected.length != 2" @click="handleSubmit" class="submit">Применить</button>
            </div>
        </div>
     </div>
</template>

<script>
import Calendar from './Calendar.vue'
import outside from '../directives/clickoutside.vue'


export default {
    name: 'DatePicker',
    components: {
        Calendar
    },
    directives: {
        outside
    },
    data: function() {
        return {
            m_selected: [].concat(this.selected).filter(x => x instanceof Date),
            state: this.initState ? this.selected[0] : new Date(),
            submited: [],
            displayModal: false,
            //hovered: null,
        }
    },
    watch: {
    },
    methods: {
        ff: function() {
            console.log(this.offsetLeft, this.offsetTop);
        },
        incMonth: function() {
            this.state = new Date(this._year, this._month + 1);
        },
        decMonth: function() {
            this.state = new Date(this._year, this._month - 1);
        },
        handleMonthChange: function(diff) {
            if (diff > 0) this.incMonth();
            else this.decMonth();
        },
        handleSubmit: function() {
            this.submited = this.m_selected;
            this.displayModal = false;
            this.onSubmit(this.submited);
        },
        handleReturn: function() {
            this.m_selected = [];
            this.displayModal = false;
            this.submited = [];
        },
        handleRangeCalendarDateSelect: function(date) {
            if (this.m_selected.length == 2)  this.m_selected = [date];
            else if (this.m_selected.length == 1) { 
                if (this.m_selected[0].getTime() > date.getTime()) this.m_selected = [date];
                else this.m_selected = this.m_selected.concat(date);  
            }
            else this.m_selected = this.m_selected.concat(date);
        },
        handleSingleCalendarDateSelect: function(date) {
            this.m_selected = [date];
            this.handleSubmit();
        },
        setDisplayFalse: function() {
            this.displayModal = false;
        }
    },
    computed: {
        offsetLeft: function() {
            return this.$refs.dpRef.offsetLeft;
        },
        offsetTop: function() {
            return this.$refs.dpRef.offsetTop;
        },
        inputHeight: function() {
            return this.$refs.inputRef.offsetHeight;
        },
        _year: function() {
            return this.state.getFullYear();
        },
        _month: function() {
            return this.state.getMonth();
        },
    },
    props: {
        range: Boolean,
        selected: [Array, Date],
        onSubmit: {
            type: Function,
            default: () => {},
        }
    }
}
</script>

<style scoped>
    .datepicker {
        display: inline-block;
    }
    .result {
        padding-right: 10px;
    }
    .modal {
        border: 1px solid #dddddd;
        position: fixed;
    }
    .footer {
        text-align: right;
        border-top: 1px solid #dddddd;
        padding: 8px 0;

    }

    button {
        border: 0;
        background: 0;
        outline: 0;
        padding: 0;
        font-size: 12px;
        font-weight: 550;
        display: inline-block;
        border-left: 1px solid grey;
        padding: 5px;
    }
    button:hover {
        outline: 1px solid green;
    }
    button:active {
        outline: 1px solid white;
    }
    button:disabled {
    	outline: none;
    	border: none;
    	background: gray;
    }
    .submit {
        color: white;
        font-weight: 550;
        background: #e30611;
        margin: 0 10px;
    }
</style>
