# Kakao-Clone-Server

카카오 풀스택 클론 코딩

## Technical Stack

-   Server Side

    -   NodeJs
    -   Express
    -   NEXTJs

-   Client Side
    -   ReactJs
    -   Redux
    -   Google+

## 이후 추가 사항

socket.io를 추가함으로서 실시간으로 채팅이 가능하게 만들것이다.

실시간 채팅의 구현 방식은 클라이언트에서 채팅방을 만들면, 그 채팅방의 관한 정보(채팅방에 초대한 친구리스트, 채팅방명)을 서버에 전달하고 이 정보를 바탕으로 데이터베이스에 저장을 한다. 그리고 데이터 베이스에 저장을 하면 생기는 ObjectId를 socket.io에 사용이 되는 채팅방 명으로 정한다. 그리고 초대된 유저에게 모두 채팅방 명을 전달한다. 이후로도 로그인 시마다 자신이 들어가있는 채팅방의 리스트가 전달이 되야 할것같다.

테스트를 위해 구글로그인뿐만 아니라 일반 로그인도 만들어야 할것같다.

페이스북과같은 다른 소셜 로그인도 구현을 해야된다.
