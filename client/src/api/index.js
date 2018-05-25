const axios = require('axios')
export const getCurrentTrends = async () => {
    try {
        const res = await axios.get('/api/trends')
        return res.data
    }
    catch (e) {

    }
}

export const getActiveFilter = async () => {
    try {
        const res = await axios.get('/api/filter')
        return res.data
    }
    catch (e) {

    }
}

export const getActiveTrend = async () => {
    try {
        const res = await axios.get('/api/trend')
        return res.data.trend
    }
    catch (e) {

    }
}