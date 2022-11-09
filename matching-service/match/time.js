import moment from 'moment'

export function getTime() {
    return moment().format('hh:mm:ss');
}