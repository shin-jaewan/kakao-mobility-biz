
# 빌드 및 실행
package.json 파일을 참고    

## 서버 설치 및 실행

    $npm install
    $npm run start

## 디버그 모드 실행  

    $npm run debug

## 유닛 테스트
mocha를 이용한 유닛 테스트 및 별도 시나리오 테스트    
시나리오 테스트시 서버 실행 필요

    $npm run test
    $npm run scenario

## 데이터베이스
AWS EC2 서버에 mysql 설치    

## 프로젝트 구조
config: 서버 포트 및 데이터베이스 접속 정보    
public: 관리자 및 모니터링을 위한 클라이언트 페이지 // TODO    
src: 서버작동을 위한 코드    
test: 서버 테스트를 위한 코드    

## 아키텍처
<br/>
<img src="https://github.com/shin-jaewan/kakao-mobility-biz/blob/mac-jwshin/architecture.png" width="80%"  title="" alt=""></img>
<br/>
