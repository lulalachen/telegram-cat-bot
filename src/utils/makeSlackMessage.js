const getColor = (difficulty) => ({
  easy: '#36A64F',
  medium: '#F6A01F',
  hard: '#DD0808',
})[difficulty]

const makeSlackMessage = ({
  url,
  questionTitle,
  acceptRate,
  difficulty,
}) => ({
  attachments: [
    {
      fallback: '加油！',
      color: getColor(difficulty),
      pretext: `這題是${difficulty}的！:rocket: \n大家加油！:100:\n<!everyone>`,
      title: questionTitle,
      title_link: url,
      fields: [
        {
          title: '難度',
          value: difficulty,
          short: false,
        },
        {
          title: '通過率',
          value: acceptRate,
          short: false,
        },
      ],
      thumb_url: 'https://leetcode.com/static/images/LeetCode_Sharing.png',
    },
  ],
})

export default makeSlackMessage
