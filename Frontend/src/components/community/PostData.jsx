const postList = [
    {
      "no": 4,
      "title": "미라클 버드 시즌1 OPEN",
      "content": "미라클 버드 시즌1이 2022년 9월 25일에 오픈됩니다! 많은 관심 부탁드립니다!",
      "createDate": "2022-09-08",
      "readCount": 6,
      "category":1,
      "nickname":"관리자1",
      "profileurl":"/footer_mypage.png",
    },
    {
      "no": 3,
      "title": "미라클 모닝 신고 범위 안내",
      "content": "다음과 같은 사항은 신고 범위로 인정됩니다. 1. 3일연속 같은 구도의 사진 2. 기상이 확인되지 않는 사진 ",
      "createDate": "2022-09-07",
      "readCount": 5,
      "category":2,
      "nickname":"관리자2",
      "profileurl":"/footer_mypage.png",
    },
    {
      "no": 2,
      "title": "미라클 버드의 MIRA",
      "content": "MIRA는 미라클 버드 내의 코인이며 다른 페이지에서 사용이 불가합니다.",
      "createDate": "2022-09-03",
      "readCount": 1,
      "category":2,
      "nickname":"관리자2",
      "profileurl":"/footer_mypage.png",
    },
    {
      "no": 1,
      "title": "미라클 버드 시즌1의 랜드마크 NFT 안내입니다.",
      "content": "미라클 버드 시즌1에서는 서울 36개, 제주도 23개, 광주 19개, 경주 18개, 독도 2개 총 98개가 오픈됩니다. 서울은 25개구가 오픈되며 강남구-코엑스, 강동구-암사생태공원, 강북구-북서울 꿈의 숲, 강서구-서울식물원, 관악구-샤로수, 광진구-서울어린이대공원, 구로구-고척스카이돔, 금천구-호암사, 노원구-태릉과 강릉, 도봉구-도봉산, 동대문구-경동시장, 동작구-현충원, 마포구-하늘공원, 서대문구-서대문형무소, 서초구-세빛둥둥섬, 반포 한강공원, 삼성 딜라이트, 성동구-서울숲, 성북구-정릉, 송파구-롯데타워, 롯데월드, 석촌호수, 올림픽공원 나홀로나무, 잠실종합운동장, 양천구-목동종합운동장, 영등포구-63빌딩, 더현대서울, 용산구-남산타워, 은평구-은평한옥마을, 종로구-경복궁, 창덕궁, 북악 스카이웨이, 북촌 한옥마을, 청계천, 중구-숭례문, 동대문 디자인 프라자, 중랑구-봉화산 이 오픈됩니다.",
      "createDate": "2022-08-25",
      "readCount": 2,
      "category":1,
      "nickname":"관리자1",
      "profileurl":"/footer_mypage.png",
    },
 
  ];
  
  const getPostByNo = no => {
    const array = postList.filter(x => x.no == no);
    if (array.length == 1) {
      return array[0];
    }
    return null;
  }
  
  export {
    postList,
    getPostByNo
  };