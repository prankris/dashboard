import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const user = req.session.get('user')

  if (user) {
    try {

      res.json({
        success: true,
        data: [
            {
              "id": 63519831,
              "Data01Data": "Track 1",
              "Data02Data": "Misdemeanors",
              "Data03Data": Math.floor(Math.random() * 100).toString(),
              "Data04Data": Math.floor(Math.random() * 100).toString(),
              "Data05Data": Math.floor(Math.random() * 100).toString(),
              "Data06Data": Math.floor(Math.random() * 100).toString(),
              "Data07Data": Math.floor(Math.random() * 100).toString(),
              "Data08Data": Math.floor(Math.random() * 100).toString(),
              "Data09Data": Math.floor(Math.random() * 100).toString(),
              "Data10Data": Math.floor(Math.random() * 100).toString(),
              "Data11Data": Math.floor(Math.random() * 100).toString(),
              "Data12Data": Math.floor(Math.random() * 100).toString() + '%'
            },
            {
              "id": 63519932,
              "Data01Data": "Track 2",
              "Data02Data": "Non-Complex Felonies",
              "Data03Data": Math.floor(Math.random() * 100).toString(),
              "Data04Data": Math.floor(Math.random() * 100).toString(),
              "Data05Data": Math.floor(Math.random() * 100).toString(),
              "Data06Data": Math.floor(Math.random() * 100).toString(),
              "Data07Data": Math.floor(Math.random() * 100).toString(),
              "Data08Data": Math.floor(Math.random() * 100).toString(),
              "Data09Data": Math.floor(Math.random() * 100).toString(),
              "Data10Data": Math.floor(Math.random() * 100).toString(),
              "Data11Data": Math.floor(Math.random() * 100).toString(),
              "Data12Data": Math.floor(Math.random() * 100).toString() + '%'
            },
            {
              "id": 63520033,
              "Data01Data": "Track 3",
              "Data02Data": "Serious Felonies",
              "Data03Data": Math.floor(Math.random() * 100).toString(),
              "Data04Data": Math.floor(Math.random() * 100).toString(),
              "Data05Data": Math.floor(Math.random() * 100).toString(),
              "Data06Data": Math.floor(Math.random() * 100).toString(),
              "Data07Data": Math.floor(Math.random() * 100).toString(),
              "Data08Data": Math.floor(Math.random() * 100).toString(),
              "Data09Data": Math.floor(Math.random() * 100).toString(),
              "Data10Data": Math.floor(Math.random() * 100).toString(),
              "Data11Data": Math.floor(Math.random() * 100).toString(),
              "Data12Data": Math.floor(Math.random() * 100).toString() + '%'
            },
            {
              "id": 63520134,
              "Data01Data": "Track 4",
              "Data02Data": "Complex Felonies",
              "Data03Data": Math.floor(Math.random() * 100).toString(),
              "Data04Data": Math.floor(Math.random() * 100).toString(),
              "Data05Data": Math.floor(Math.random() * 100).toString(),
              "Data06Data": Math.floor(Math.random() * 100).toString(),
              "Data07Data": Math.floor(Math.random() * 100).toString(),
              "Data08Data": Math.floor(Math.random() * 100).toString(),
              "Data09Data": Math.floor(Math.random() * 100).toString(),
              "Data10Data": Math.floor(Math.random() * 100).toString(),
              "Data11Data": Math.floor(Math.random() * 100).toString(),
              "Data12Data": Math.floor(Math.random() * 100).toString() + '%'
            },
            {
              "id": 63520235,
              "Data01Data": "Track 5",
              "Data02Data": "Post Adjudication Cases",
              "Data03Data": Math.floor(Math.random() * 100).toString(),
              "Data04Data": Math.floor(Math.random() * 100).toString(),
              "Data05Data": Math.floor(Math.random() * 100).toString(),
              "Data06Data": Math.floor(Math.random() * 100).toString(),
              "Data07Data": Math.floor(Math.random() * 100).toString(),
              "Data08Data": Math.floor(Math.random() * 100).toString(),
              "Data09Data": Math.floor(Math.random() * 100).toString(),
              "Data10Data": Math.floor(Math.random() * 100).toString(),
              "Data11Data": Math.floor(Math.random() * 100).toString(),
              "Data12Data": Math.floor(Math.random() * 100).toString() + '%'
            }
          ],
        ...user,
      })

    } catch (err) {
      console.log(err)
      res.json({
        success: false,
        message: 'Unable to fetch.',
        ...user,
      })
    }

  } else {
    res.json({
      success: false,
      message: 'Unauthorized.',
      ...user,
    })
  }
})