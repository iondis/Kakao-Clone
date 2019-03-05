import Model from '../../database/models';

// talkRoom생성
export const save = (req, res, next) => {
    const { profile: user, friends } = req.body;

    const friendsCheack = new Promise((resolve, reject) => {
        if (friends === undefined) reject(Error('friends 값이 없습니다'));
        if (!Array.isArray(friends)) reject(Error('friends 배열이 아닙니다'));
        resolve(friends);
    });

    const OnError = ({ message }) => res.status(403).json(message);

    const userBuild = () => Model.User.build(user).reload();

    const createTalkRoom = friendList =>
        Model.TalkRoom.create().then(value => {
            friendList.map(friend =>
                value.addUserList(Model.User.build(friend))
            );
            value.addUserList(Model.User.build(user));
            return value;
        });

    const respond = () => res.status(201).send();

    friendsCheack
        .then(userBuild)
        .then(userData => userData.getFriendList())
        .then(data => data || Promise.reject(Error('데이터가 없습니다')))
        .then(friendList =>
            friendList.map(friend => friend.get({ plain: true }))
        )
        .then(friendList =>
            friendList.filter(friend => friends.indexOf(friend.id) !== -1)
        )
        .then(createTalkRoom)
        .then(respond)
        .catch(OnError)
        .finally(next);
};

// talkRoom내용 보기
export const read = (req, res, next) => {
    const OnError = ({ message }) => res.status(403).json(message);

    const talkRoomCheack = new Promise((resolve, reject) => {
        const talkRoom = { id: req.params.talkRoom };
        if (talkRoom.id === undefined) reject(Error('params가 없습니다'));
        resolve(talkRoom);
    });

    const respond = ArrayValue =>
        res.status(201).json({
            TalkRoom: ArrayValue[0],
            UserList: ArrayValue[1],
            TalkList: ArrayValue[2]
        });

    talkRoomCheack
        .then(talkRoom => Model.TalkRoom.build(talkRoom).reload())
        .then(DBtalkRoom =>
            Promise.all([
                DBtalkRoom,
                DBtalkRoom.getUserList(),
                DBtalkRoom.getTalks()
            ])
        )
        .then(ArrayValue =>
            ArrayValue.map(value => {
                return !Array.isArray(value)
                    ? value.get({ plain: true })
                    : value.map(el => el.get({ plain: true }));
            })
        )
        .then(respond)
        .catch(OnError)
        .finally(next);
};

// talkRoom리스트보기
export const listRead = (req, res, next) => {
    const { profile: user } = req.body;

    const OnError = ({ message }) => res.status(403).json(message);

    const respond = DBtalkRoomList =>
        res.status(201).json({ talkRoomList: DBtalkRoomList });

    Model.User.build(user)
        .reload()
        .then(DBuser => DBuser.getTalkRoomList())
        .then(DBtalkRoomList =>
            DBtalkRoomList.map(DBtalkRoom => {
                const data = DBtalkRoom.get({ plain: true });
                delete data.UserTalkRooms;
                return data;
            })
        )
        .then(respond)
        .catch(OnError)
        .finally(next);
};

// talkRoom 마지막 남은 유저 나가기
export const remove = (req, res, next) => {
    const { profile: user } = req.body;
    const OnError = ({ message }) => res.status(403).json(message);

    const talkRoomCheack = new Promise((resolve, reject) => {
        const talkRoom = { id: req.params.talkRoom };
        if (talkRoom.id === undefined) reject(Error('params가 없습니다'));
        resolve(talkRoom);
    });

    const respond = () => res.status(204).send();

    talkRoomCheack
        .then(talkRoom =>
            Model.userTalkRooms.destroy({
                where: {
                    talkId: talkRoom.id,
                    userId: user.id
                }
            })
        )
        .then(respond)
        .catch(OnError)
        .finally(next);
};

// talkRoom 유저추가
export const addUser = (req, res, next) => {
    const { talkroom, friend } = req.body;
    const paramsCheack = new Promise((resolve, reject) => {
        let ErrStr;

        if (talkroom === undefined && friend === undefined) ErrStr = 'params';
        else if (talkroom === undefined) ErrStr = 'talkRoom';
        else if (friend === undefined) ErrStr = 'friend';

        if (ErrStr !== undefined) reject(Error(`${ErrStr} 값이 없습니다.`));

        resolve(talkroom);
    });

    const OnError = ({ message }) => res.status(403).json(message);

    const respond = () => res.status(201).json({ friend });

    const addFriend = room =>
        Model.User.build(friend)
            .reload()
            .then(DBFriend => {
                room.addUserList(DBFriend);
                return DBFriend;
            });

    paramsCheack
        .then(() => Model.TalkRoom.build(talkroom).reload())
        .then(addFriend)
        .then(respond)
        .catch(OnError)
        .finally(next);
};
