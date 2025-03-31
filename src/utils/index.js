const dayjs = require('dayjs')

function calculateAge(dateOfBirth) {
    return dayjs().diff(dayjs(dateOfBirth), 'year')
}

module.exports = { calculateAge }
