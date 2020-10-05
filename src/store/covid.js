import axios from 'axios'

const covid = {
    namespaced: true,
    state: {
        backupCountry: [],
        byCountry: [],
        backupDay: [],
        byDay: [],
        summary: {
            "NewConfirmed": 0,
            "TotalConfirmed": 0,
            "NewDeaths": 0,
            "TotalDeaths": 0,
            "NewRecovered": 0,
            "TotalRecovered": 0
        },
        chartData: [],
        charts: []
    },
    mutations: {
        SET_BY_COUNTRY: (state, payload) => {
            state.byCountry = payload
        },
        SET_BACKUP_BY_COUNTRY: (state, payload) => {
            state.backupCountry = payload
        },
        SET_BY_DAY: (state, payload) => {
            state.byDay = payload
        },
        SET_BACKUP_BY_DAY: (state, payload) => {
            state.backupDay = payload
        },
        SET_SUMMARY_DATA: (state, payload) => {
            state.summary = payload
        },
        SET_CHARTS: (state, payload) => {
            state.charts = payload
        },

    },
    actions: {
        getCovidByCountry({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.get(`https://api.covid19api.com/country/${payload.name}?from=${payload.start}T00:00:00Z&to=${payload.end}T00:00:00Z`)
                .then((response) => {
                    commit('SET_BY_COUNTRY', response.data)
                    commit('SET_BACKUP_BY_COUNTRY', response.data)
                    resolve
                })
                .catch((error) => {
                    console.log(error)
                    reject()
                })
            })
        },
        getCovidByDay({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.get(`https://api.covid19api.com/dayone/country/${payload.name}/status/${payload.status}`)
                .then((response) => {
                    commit('SET_BY_DAY', response.data)
                    commit('SET_BACKUP_BY_DAY', response.data)
                    resolve
                })
                .catch((error) => {
                    console.log(error)
                    reject()
                })
            })
        },
        getSummary({ commit }, payload) {
            console.log(payload)
            return new Promise((resolve, reject) => {
                axios.get(`https://api.covid19api.com/summary`)
                .then((response) => {
                    commit('SET_SUMMARY_DATA', response.data.Global)
                    let data = response.data.Countries.filter(function(item, key) {
                        return key < 11
                    })

                    commit('SET_CHARTS', data)
                    resolve
                })
                .catch((error) => {
                    console.log(error)
                    reject()
                })
            })
        },
    }
}

export default covid