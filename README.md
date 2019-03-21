
## Account TX Expolorer Server (express.js)

이더리움web3.js API <-> nodejs <-> Contents 중계 역할을 하는 소스 .  
nodejs + express + html로 구현되어 있음 .  
  

#### Reference
https://github.com/ethereum/web3.js
https://github.com/anpigon/Ethereum-Block-Explorer
https://ropsten.etherscan.io/

#### history

##### Development environment

    OS : Ubuntu 18.04(ubuntu-18.04.1-desktop-amd64.iso)
    App : nodejs(v8.10.0), yarn(1.13.0)

##### Execute

```bash
cd ~

mkdir project

cd project

git clone https://github.com/etherblock.git

cd etherblock/

yarn start 
실행 웹서비스 조회

종료

lsof -i tcp:3000

kill -9 pid
```


##### url guide

조회

    http://192.168.0.118:3000/


