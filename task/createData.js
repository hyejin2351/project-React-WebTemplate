/**
 * Created by jcdev00 on 18. 10. 11.
 */

// run with `node simple.js` in node v4.x+
// must have Inquirer installed (`npm install inquirer`)
require('dotenv/config');

const config = require('../src/server/config');
const initMongoose = require('../src/server/init/initMongoose');

const User = require('../src/server/users/models/user');
const Article = require('../src/server/mods/articles/models');

const inquirer = require('inquirer');

const createUsers = (dbConn) => {
    return new Promise(function (resolve, reject) {
        const createCount = 10;

        User.countDocuments({}, function (err, count) {
            console.log('count = ' + count);

            if(err)
                return reject(err);

            if(count > 0 ) {
                return reject('사용자가 있습니다. 삭제 후 생성 해주세요.');
            } else {
                let index = 0;
                for (let i = 0; i < createCount; i ++) {
                    const name = randomKoreaName();
                    const user = new User({
                        email: 'user' + i + '@gmail.com',
                        name: name,
                        nickName: name,
                        created: randomDate()
                    });
                    User.register(user, 'qw12QW!@', function (err) {
                        if (err)
                            console.error(err);

                        if (index == createCount-1) {
                            // release db connection
                            return resolve(null);
                        }

                        index++;
                    })
                }
            }
        });
    });
}

const createArticles = (dbConn) => {
    return new Promise(function (resolve, reject) {
        const createCount = 100;

        User.find({}, function (err, users) {
            if(err)
                return reject(err);

            if(!users || users.length === 0) {
                return reject('사용자가 없습니다. 사용자를 생성 후 계시판을 생성 해주세요.');
            } else {
                let index = 0;
                for (let i = 0; i < createCount; i ++) {
                    const user = users[getRandomInt(0, users.length)];
                    const article = new Article({
                        author: user.id,
                        title: '계시글 ' + i + ' 작성자 ' + user.name,
                        content: '계시글 내용 ' + i + ' 작성자 ' + user.name,
                        views: getRandomInt(0, 100),
                        created: randomDate()
                    });
                    article.save(function (err) {
                        if (err)
                            console.error(err);

                        if (index == createCount-1) {
                            // release db connection
                            return resolve(null);
                        }

                        index++;
                    })
                }
            }
        });
    });
}

const createAdmin = (dbConn) => {
    return new Promise(function (resolve, reject) {
        User.findOne({roles: 'admin'}, function (err, user) {
            if(err)
                return reject(err);

            if(user)
                return reject('관리자가 계정이 이미 생성되어 있습니다.');

            const name = '관리자';
            const admin = new User({
                email: 'master@gmail.com',
                name: name,
                nickName: name,
                roles: ['user', 'admin'],
                created: randomDate()
            });

            User.register(admin, 'qw12QW!@',function (err) {
                if (err)
                    return reject(err);

                return resolve(null);
            })
        })
    });
}

const deleteData = (dbConn) => {
    return new Promise(function (resolve, reject) {
        User.deleteMany({  }, function (err) {
            Article.deleteMany({  }, function (err) {
                if (err) return reject(err);
                return resolve();
            });
        });
    });
}

inquirer.prompt([{
    name: 'createData',
    type: 'input',
    message: '아래 메뉴를 선택 해주세요.' +
    '\n1. 일반사용자(10개) 생성' +
    '\n - 개발모드에서만 지원' +
    '\n - email은 user넘버@gmail.com, 넘버는 0부터 9까지' +
    '\n - 비밀번호는 qw12QW!@' +
    '\n2. 계시판(100개) 데이터 생성' +
    '\n - 개발모드에서만 지원' +
    '\n3. 관리자 데이터 생성 1개' +
    '\n - email은 master@gmail.com' +
    '\n - 비밀번호는 qw12QW!@' +
    '\n4. 모든 데이터 삭제' +
    '\n 종료 하시려면 메뉴이외에 키를 눌러주세요.!'
}]).then((answers) => {
    console.log(answers.createData);
    switch (answers.createData) {
        case '1':
            if(!config.isDev) {
                exitCallback('상용모드에서 생성 불가합니다.')
                return ;
            }
            initMongoose({...config}).
            then(createUsers).
            then(exitCallback).
            catch(exitCallback);
            break;
        case '2':
            if(!config.isDev) {
                exitCallback('상용모드에서 생성 불가합니다.')
                return ;
            }
            initMongoose({...config}).
            then(createArticles).
            then(exitCallback).
            catch(exitCallback)
            break;
        case '3':
            initMongoose({...config}).
            then(createAdmin).
            then(exitCallback).
            catch(exitCallback)
            break;
        case '4':
            initMongoose({...config}).
            then(deleteData).
            then(exitCallback).
            catch(exitCallback)
            break;
    }
});

function exitCallback(err) {
    if(err)
        console.log("Error generating : " + err);
    process.exit(0);
}

function randomDate() {
    const curDate = new Date();
    const nYear = curDate.getFullYear() - getRandomInt(0, 2);
    const nMonth = (curDate.getFullYear() === nYear ) ? getRandomInt(0, curDate.getMonth()) : getRandomInt(0, 12);
    const nDay = getRandomInt(0, 31);

    return new Date(nYear, nMonth, nDay);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomKoreaName() {
    // release db connection
    var fullName = '';
    var firstName = [
        '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',
        '오', '한', '신', '서', '권', '황', '안', '송', '유', '홍',
        '전', '고', '문', '손', '양', '배', '조', '백', '허', '남'];
    var midName = [
        '민', '현', '동', '인', '지', '현', '재', '우', '건', '준',
        '승', '영', '성', '진', '준', '정', '수', '광', '영', '호',
        '중', '훈', '후', '우', '상', '연', '철', '아', '윤', '은'];
    var lastName = [
        '유', '자', '도', '성', '상', '남', '식', '일', '철', '병',
        '혜', '영', '미', '환', '식', '숙', '자', '희', '순', '진',
        '서', '빈', '정', '지', '하', '연', '성', '공', '안', '원'];
    var nameCount = getRandomInt(2, 5);

    switch (nameCount) {
        case 2:
            fullName = fullName.concat(firstName[getRandomInt(0, firstName.length)]).concat(midName[getRandomInt(0, midName.length)]);
            break;
        case 3:
            fullName = fullName.concat(firstName[getRandomInt(0, firstName.length)]).concat(midName[getRandomInt(0, midName.length)]);
            fullName = fullName.concat(lastName[getRandomInt(0, lastName.length)]);
            break;
        case 4:
            fullName = fullName.concat(firstName[getRandomInt(0, firstName.length)]).concat(midName[getRandomInt(0, midName.length)]);
            fullName = fullName.concat(midName[getRandomInt(0, midName.length)]).concat(lastName[getRandomInt(0, lastName.length)]);
            break;
    }

    return fullName;
}