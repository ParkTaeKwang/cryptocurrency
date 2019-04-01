
## 암호화폐 웹지갑

 회원을 가입 한 후 [비트코인, 이더리움, 트론]  동일한 Mnemonic (니모닉) 단어로부터 출금(send), 계좌조회(balance), 거래내역(transaction) 구현  
  

#### Reference
https://iancoleman.io/bip39/



#### history

##### Development environment

    OS : Ubuntu 18.04(ubuntu-18.04.1-desktop-amd64.iso)
    App : nodejs(v8.10.0), yarn(1.13.0)

##### DB


    email : 
    password : PBKDF2
    Mnemonic : word 12
    wallet address : BTC, ETH, TRX

##### 테이블 생성

    CREATE TABLE `crypto_wallet` (
    `idx` int(11) NOT NULL AUTO_INCREMENT,
    `email_address` varchar(100) NOT NULL COMMENT '계정 이 메일',
    `password` varchar(100) NOT NULL COMMENT '패스워드',
    `mnemonic` varchar(150) NOT NULL COMMENT '리모닉',
    `BTC` varchar(150) NOT NULL COMMENT '비트코인',
    `ETH` varchar(150) NOT NULL COMMENT '이더리움',
    `TRX` varchar(150) NOT NULL COMMENT '트론',
    `regdate` datetime default current_timestamp,
    PRIMARY KEY (`idx`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='암호화폐 지갑 테이블';
        
```sql
MariaDB [tkpark]> desc crypto_wallet;
+---------------+--------------+------+-----+-------------------+----------------+
| Field         | Type         | Null | Key | Default           | Extra          |
+---------------+--------------+------+-----+-------------------+----------------+
| idx           | int(11)      | NO   | PRI | NULL              | auto_increment |
| email_address | varchar(100) | NO   |     | NULL              |                |
| password      | varchar(100) | NO   |     | NULL              |                |
| mnemonic      | varchar(150) | NO   |     | NULL              |                |
| BTC           | varchar(150) | NO   |     | NULL              |                |
| ETH           | varchar(150) | NO   |     | NULL              |                |
| TRX           | varchar(150) | NO   |     | NULL              |                |
| regdate       | datetime     | YES  |     | CURRENT_TIMESTAMP |                |
+---------------+--------------+------+-----+-------------------+-----------------                                                       
```
 



