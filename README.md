# 카카오 모빌리티

해당 서버는 node.js로 개발되었으며 아래내용을 참고 바랍니다.

# 개발환경
npm: 6.13.4  
nodejs: v12.14.0  
express: 4.17.1  
mysql: Ver 14.14 Distrib 5.7.32, for Linux (x86_64)  

# TODO

현재 mysql 데이터베이스 성능으로는 1000tps 처리시 지연이 발생    
이에 대한 해결방안으로 Memory DB 또는 Bulk insert 방식으로의 전환이 필요    
기타 Apache Kafka, Redis 등의 실시간 데이터 처리 시스템 도입 필요    
