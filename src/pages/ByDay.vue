<template>
    <div>
        <div class="flex -mx-2">
            <div class="w-1/3 mb-4 px-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="country">
                    Filter By Country
                </label>
                <t-select
                    placeholder="Select Country"
                    :options="['Indonesia', 'Malaysia', 'Singapore']"
                    v-model="filterCountry"
                    @change="loadDataCountry"
                ></t-select>
            </div>
            <div class="w-1/3 mb-4 px-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="country">
                    Filter By Status
                </label>
                <t-select
                    placeholder="Select Status"
                    :options="['Confirmed', 'Deaths', 'Active', 'Recovered']"
                    v-model="filterByStatus"
                    @change="loadDataCountry"
                ></t-select>
            </div>
            <div class="w-1/3 mb-4 px-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="country">
                    Sort By Date
                </label>
                <t-select
                    placeholder="Sort Data"
                    :options="['asc', 'desc']"
                    v-model="sortByDate"
                    @change="sortDataByDate"
                ></t-select>
            </div>
            <div class="w-1/3 mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="country">
                    Search
                </label>
                <t-input name="search" v-model="search" @input="filterByCase" placeholder="Search..." />
            </div>
        </div>
        <div class="w-full">
            <t-table
                :headers="['Country', 'Map', 'Cases', 'Status', 'Date']"
                :data="byDay"
            >
                <template v-slot:row="props">
                    <tr :class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
                        <td :class="props.tdClass">{{ props.row.Country }}</td>
                        <td :class="props.tdClass">Lat: {{ props.row.Lat }}, Lon: {{ props.row.Lon }}</td>
                        <td :class="props.tdClass">{{ props.row.Cases }}</td>
                        <td :class="props.tdClass">{{ props.row.Status }}</td>
                        <td :class="props.tdClass">{{ props.row.Date }}</td>
                    </tr>
                </template>
            </t-table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
var _ = require('lodash');

export default {
    created() {
        this.loadDataCountry()
    },
    data() {
        return {
            filterCountry: 'Indonesia',
            filterByStatus: 'Confirmed',
            sortByDate: 'asc',
            search: ''
        }
    },
    computed: {
        ...mapState('covid', {
            byDay: state => state.byDay,
            backupDay: state => state.backupDay
        })
    },
    methods: {
        ...mapActions('covid', ['getCovidByDay']),
        ...mapMutations('covid', ['SET_BY_DAY']),
        loadDataCountry() {
            this.sortByDate = 'asc'
            this.getCovidByDay({
                name: this.filterCountry.toLowerCase(),
                status: this.filterByStatus.toLowerCase()
            })
        },
        filterByCase() {
            this.SET_BY_DAY(this.backupDay)
            if (this.search !='') {
                let vm = this
                let data = this.byDay.filter(function(item) {
                    return item.Cases == vm.search
                })
                this.SET_BY_DAY(data)
            }
        },
        sortDataByDate() {
            let data = _.orderBy(this.byDay, ['Cases'], [this.sortByDate])
            this.SET_BY_DAY(data)
        }
    }
}
</script>

<style>
    .form-input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        border-color: #e2e8f0;
        border-width: 1px;
        border-radius: .25rem;
        padding: .5rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
    }
</style>