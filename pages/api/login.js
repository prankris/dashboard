import withSession from '../../lib/session'

export default withSession(async (req, res) => {
    const { username, password } = await req.body

    try {
        if (password === username) {
            const user = { isLoggedIn: true, div: '1' }
            req.session.set('user', user)
            await req.session.save()
            res.json(user)
        } else {
            res.status(401).json({ stausCode: 401, method: 'POST', message: 'Invalid Credentials' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ stausCode: 500, method: 'POST', message: 'Internal Server Error' })
    }
})