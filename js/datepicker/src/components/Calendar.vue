
<template>
    <div class="calendar">
        <div class="header">
            <button v-if="!disablePrev" @click="decMonth" class="day btn prev hover">-</button>
            <span class="title">{{  [lang.shortMonths[state.getMonth()], state.getFullYear()].join(' ')  }}</span>
            <button v-if="!disableNext" @click="incMonth" class="day btn next hover">+</button>
        </div>
        <div class="days-header">
            <div class="day" v-for="n in 7" :key="n">{{lang.shortWeekDays[n-1]}}</div>
        </div>
        <div class="days-container">
            <div  v-for="n in 42" 
                  @click="handleDateClick(offset(n))"
                  :key="offset(n)" 
                  class="day hover" 
                  :class="{selected: isSelected(offset(n)), inrange: isInRange(offset(n))}"> 
                {{ dateNumber(offset(n)) }}
            </div>
        </div>
    </div>
</template>

<script>
import {ru} from './langs.js'


export default {
    name: 'Calendar',
    data: function() {
        return {
            state: this.year && this.month ? new Date(this.year, this.month) : new Date(),
        }
    },
    watch: {//Нужно для синхронизации двух календарей, без этого не обновляется.
        month: function(newMonth) {
            this.state = new Date(this.year, newMonth);
        },
        year: function(newYear) {
            this.state = new Date(newYear, this.month);
        },
    },
    computed: {
        _year: function() {
            return this.state.getFullYear();
        },
        _month: function() {
            return this.state.getMonth();
        },
        _selected: function() {
            return [].concat(this.selected).filter(x => x instanceof Date);
        },
    },
    methods: {
        //Функции для календаря
        incMonth: function() {
            this.state = new Date(this.state.getFullYear(), this.state.getMonth() + 1);
            this.onMonthChange(1);//test
        },
        decMonth: function() {
            this.state = new Date(this.state.getFullYear(), this.state.getMonth() - 1);
            this.onMonthChange(-1);//test
        },
        //Функции для дат на календаре;
        isSelected: function(offset) {
            if (this._selected.length == 0) return;
            let date = this.offsetToDate(offset);
            let isSelected = this._selected.some(x => {
                return x.getFullYear() == date.getFullYear() && x.getMonth() == date.getMonth() && date.getMonth() == this.state.getMonth() && x.getDate() == date.getDate();
            });
            if (isSelected) return true;
            return false;
            
        },
        isInRange: function(offset) {
            if (this._selected.length != 2) return;
            let date = this.offsetToDate(offset);
            let sortedSelects = [].concat(this._selected).sort((x,y) => x-y);
            let isInRange = date < sortedSelects[1] && date > sortedSelects[0] && date.getMonth() == this.state.getMonth(); //Сортировка гарантируется?
            if (isInRange) return true;
            return false;
        },
        handleDateClick: function(offset) {
            let date = this.offsetToDate(offset);
            if (date.getMonth() > this.state.getMonth()) this.incMonth();   
            else if (date.getMonth() < this.state.getMonth()) this.decMonth();
            //
            this.onChange(date);
        },
        dateNumber: function(offset) {
            let date = this.offsetToDate(offset);
            return date.getDate();
        },
        offset: function(n) {
            let date = new Date(this.state.getFullYear(), this.state.getMonth()); 
            date.setDate(1);
            let day = date.getDay();
            let daysPrevMonth = 0;
            if (day == 0) daysPrevMonth = 6;
            else daysPrevMonth = day - 1;
            return n - daysPrevMonth;
        },
        offsetToDate: function(offset) {
            let date = new Date(this.state.getFullYear(), this.state.getMonth());
            date.setDate(offset);
            return date;
        },
    },
    props: {
        year: Number,
        month: Number,
        selected: [Array, Date],
        onChange: {
            type: Function,
            required: true,
        },
        onMonthChange: {
            type: Function,
            default: () => {}
        },
        disablePrev: Boolean,
        disableNext: Boolean,
        lang: {
            type: Object,
            default: () => ru,
        },
    },
}
</script>

<style scoped>
    .days-container {
        display: flex;
        padding: 0;
        margin: 0;
        list-style-type: none;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .day {
        display: inline-block;
        white-space: nowrap;
        text-align: center;
        vertical-align: middle;
        min-width: 32px;
        width: 32px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        border-radius: 4px;
        border: 1px solid transparent;
        white-space: nowrap;
        cursor: pointer;
        color: black;
    }
    .calendar {
        display: inline-block;
        width: 238px;
        max-width: 238px;
        padding: 10px;
    }
    .header {
        display: flex;
        justify-content: center;
    }
    .title {
        position: absolute;
        margin: auto;
    }
    .btn {
        font-weight: 1000;
        font-size: 14px;
        border: 0;
        background: 0;
        color: 0;
        outline: 0;
    }
    .prev {
        margin-right: auto;
    }
    .next {
        margin-left: auto;
    }
    .hover:hover {
        background-color: #DADADA;
    }
    .other {
        color: grey;
    }
    .selected {
        background: #357ebd !important;
    }
    .inrange {
        background: #abf4f8;
    }
</style>
