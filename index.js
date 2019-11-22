const express = require('express')


//middleware
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserMiddleWare = bodyParser.json()
const corsMiddleWAre = cors()
// models and db
const Student = require('./student/model')
const Score = require('./score/model')
const Batch = require('./batch/model')
// const User = require('./user/model')
const db = require('./db')


//ROUTERS
const userRouter = require('./user/router');
const authRouter = require('./auth /router')
const studentRouter = require('./student/router')
const scoreRouter = require('./score/router')
const batchRouter = require('./batch/router')





// init
const app = express()
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server is listening on ${port}!`))
app.get('/test', (req, res) => res.send('hello world'))

const loggingMiddleWare = (req, res, next) => {
    console.log("I am a middleware", Date.now());
    next(); // everything is ok -> next()
};

app
    .use(loggingMiddleWare)
    .use(corsMiddleWAre)
    .use(bodyParserMiddleWare)
    .use(userRouter)
    .use(authRouter)
    .use(studentRouter)
    .use(scoreRouter)
    .use(batchRouter)


db
    .sync({ force: true })
    .then(() => {
        console.log('Database schema updated')

        const batch1 = Batch.create({ name: 'Batch#1', startDate: '01-10-2019', endDate: '15-12-2019', numberOfStudents: 4})
        const batch2 = Batch.create({ name: 'Batch#2', startDate: '01-11-2019', endDate: '15-01-2020', numberOfStudents: 4})       
        const batch3 = Batch.create({ name: 'Batch#3', startDate: '01-12-2019', endDate: '15-02-2020', numberOfStudents: 4})    
        const batch4 = Batch.create({ name: 'Batch#4', startDate: '01-01-2020', endDate: '15-03-2020', numberOfStudents: 4})   
        return Promise.all([batch1, batch2, batch3, batch4])  






    })

    .then(() => {
        console.log('Database schema updated')

        const score1 = Score.create({ grade: 'red', remark: 'bad', date: new Date().toString().replace(/T/, ':').replace(/\.\w*/, '')})
        const score2 = Score.create({ grade: 'yellow', remark: 'medium', date: new Date().toString().replace(/T/, ':').replace(/\.\w*/, '')})       
        const score3 = Score.create({ grade: 'green', remark: 'good', date: new Date().toString().replace(/T/, ':').replace(/\.\w*/, '')})    
        return Promise.all([score1, score2, score3])  

    })



    .then(() => {
        const students = [
            {name: 'John', nationality: 'Dutch', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/800px-Shakespeare.jpg', batchId: 1,  scoreId: 1 , },
            {name: 'Jane', nationality: 'German',photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg/220px-Angelina_Jolie_2_June_2014_%28cropped%29.jpg',  batchId: 2 ,  scoreId: 2,  },
            {name: 'Wale', nationality: 'USA', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Walle_Georgetown.JPG/220px-Walle_Georgetown.JPG', batchId: 3 ,  scoreId: 3, },
            {name: 'Paul', nationality: 'French', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Anthony_Joshua_2017.png/220px-Anthony_Joshua_2017.png',batchId: 4,  scoreId: 1, },
            {name: 'Josh', nationality: 'Swedish', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Eminem_live_at_D.C._2014_%28cropped%29.jpg/245px-Eminem_live_at_D.C._2014_%28cropped%29.jpg' , batchId: 4, scoreId: 2, },
            {name: 'Eden', nationality: 'Belgian', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/ENG-BEL_%2817%29.jpg/800px-ENG-BEL_%2817%29.jpg' , batchId: 3 , scoreId: 3, },
            {name: 'Van Gaal', nationality: 'Dutch', photo: 'https://cdn.footballghana.com/2018/09/5bad20836f6d9.jpg'  , batchId: 2, scoreId: 1, },
            {name: 'Manuel', nationality: 'German', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20180602_FIFA_Friendly_Match_Austria_vs._Germany_Manuel_Neuer_850_0723.jpg/800px-20180602_FIFA_Friendly_Match_Austria_vs._Germany_Manuel_Neuer_850_0723.jpg', batchId: 1, scoreId: 1, },
            {name: 'Mary', nationality: 'Dutch', photo: 'https://upload.wikimedia.org/wikipedia/en/6/68/Mary_Jane_Watson_%28circa_2007%29.png', batchId: 1, scoreId: 1 , },
            {name: 'Grace', nationality: 'Italy', photo: 'https://informationcradle.com/africa/wp-content/uploads/2018/12/Grace-Decca.jpg', batchId: 2, scoreId: 1 , },
            {name: 'Pearl', nationality: 'USA', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Selena_Gomez_2016.png/220px-Selena_Gomez_2016.png',  batchId: 3, scoreId: 1, },
            {name: 'Suzy', nationality: 'French', photo:'https://upload.wikimedia.org/wikipedia/commons/d/de/Suzy_Bae_at_fansigning_on_February_3%2C_2018_%285%29_%28cropped%29.jpg', batchId: 4, scoreId: 2, },
            {name: 'Nick', nationality: 'Swiss', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Nick_Cannon_by_David_Shankbone.jpg/800px-Nick_Cannon_by_David_Shankbone.jpg',  batchId: 4, scoreId: 3, },
            {name: 'Messi', nationality: 'Argentinian',photo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg', batchId: 3, scoreId: 1, },
            {name: 'Sly ', nationality: 'Dutch', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Autumn_Reeser_by_David_Shankbone.jpg/800px-Autumn_Reeser_by_David_Shankbone.jpg',  batchId: 2, scoreId: 2, },
            {name: 'Chi', nationality: 'German', photo: 'https://www.vibesandlife.com/wp-content/uploads/2019/04/35357266_1911619895535857_3056761815502422016_n.jpg.webp', batchId: 1, scoreId: 3, }
        ]

        const studentPromises = students.map(student => Student.create(student));
    return Promise.all(studentPromises);

    })

    
.catch(console.error )