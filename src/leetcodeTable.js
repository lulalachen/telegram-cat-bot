import updateLeetcodeTable from './updateLeetcodeTable'

// eslint-disable-next-line
let leetcodeTable = []

export const initTable = () =>
  updateLeetcodeTable()
  .then(table => {
    leetcodeTable = table
  })

export const getLeetcodeTable = () => leetcodeTable

export default leetcodeTable
