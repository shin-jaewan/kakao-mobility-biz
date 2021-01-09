
해당 서버는 node.js로 개발되었으며 아래내용을 참고 바랍니다.

## 개발환경
> npm: 6.13.4  
> nodejs: v12.14.0  
> express: 4.17.1  
> mysql: Ver 14.14 Distrib 5.7.32, for Linux (x86_64)  

## 빌드 및 실행
    
package.json 파일을 참고
    
## 서버 설치 및 실행
  
    $npm install
    $npm run start
  
## 디버그 모드 실행  
  
mocha를 이용한 테스트 및 별도 시나리오 테스트
  
    $npm run debug
    $npm run scenario
 
## 데이터베이스
    
AWS EC2 서버에 mysql 설치
  
## 프로젝트 구조

config: 서버 포트 및 데이터베이스 접속 정보
public: 관리자 및 모니터링을 위한 클라이언트 페이지 // TODO
src: 서버작동을 위한 코드
test: 서버 테스트를 위한 코드
  
  
