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
                    Filter By Date
                </label>
                <t-datepicker
                    v-model="date"
                    range
                    placeholder="Select a date"
                    date-format="Y-m-d"
                    user-format="m/d/Y"
                />
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
                :headers="['Country', 'Map', 'Confirmed', 'Deaths', 'Recovered', 'Active', 'Date']"
                :data="byCountry"
            >
                <template v-slot:row="props">
                    <tr :class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
                        <td :class="props.tdClass">{{ props.row.Country }}</td>
                        <td :class="props.tdClass">Lat: {{ props.row.Lat }}, Lon: {{ props.row.Lon }}</td>
                        <td :class="props.tdClass">{{ props.row.Confirmed }}</td>
                        <td :class="props.tdClass">{{ props.row.Deaths }}</td>
                        <td :class="props.tdClass">{{ props.row.Recovered }}</td>
                        <td :class="props.tdClass">{{ props.row.Active }}</td>
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
            sortByDate: 'asc',
            date: [],
            search: ''
        }
    },
    watch: {
        date: {
            handler() {
                this.loadDataCountry()
            },
            deep: true
        }
    },
    computed: {
        ...mapState('covid', {
            byCountry: state => state.byCountry,
            backupCountry: state => state.backupCountry,
        })
    },
    methods: {
        ...mapActions('covid', ['getCovidByCountry']),
        ...mapMutations('covid', ['SET_BY_COUNTRY']),
        loadDataCountry() {
            this.getCovidByCountry({
                name: this.filterCountry.toLowerCase(),
                start: this.date.length == 2 ? this.date[0]:'2020-03-01',
                end: this.date.length == 2 ? this.date[1]:'2020-04-01',
            })
        },
        filterByCase() {
            this.SET_BY_COUNTRY(this.backupCountry)
            if (this.search !='') {
                let vm = this
                let data = this.byCountry.filter(function(item) {
                    return item.Confirmed == vm.search || item.Deaths == vm.search || item.Recovered == vm.search || item.Active == vm.search
                })
                this.SET_BY_COUNTRY(data)
            }
        },
        sortDataByDate() {
            let data = _.orderBy(this.byCountry, ['Date'], [this.sortByDate])
            this.SET_BY_COUNTRY(data)
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