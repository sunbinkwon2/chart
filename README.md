# Local 클라이언트 환경 
cd ./client
npm run local

# Local 서버 환경 
cd ./server
npm run local

# Dev 환경 이미지 빌드
./build.sh dev

# Prod 환경 이미지 빌드
./build.sh prod

# Dev 환경 배포
./deploy.sh dev

# Prod 환경 배포
./deploy.sh prod

# Dev 환경 중지
./stop.sh dev

# Prod 환경 중지
./stop.sh prod


0. server 의 api 형태 정의
( points, bands, options )

points = [
    {x:1, y:1},
    {x:2, y:2},
    {x:3, y:3}
] 

bands = [
    {x: 1, usl:4, lsl:2, ucl:5, lcl:1}, 
    {x: 2, usl:4, lsl:2, ucl:5, lcl:1},
    {x: 3, usl:4, lsl:2, ucl:5, lcl:1}
]

options = {
    "pointType" : "point",
    "showChamberStep" : true,
    "showLegend" : true
}

meta = {
    "chartTitle": "title",
    "chartSubTitle": "chartSubTitle"
    "chartLegend" : "chartLegend"
}





