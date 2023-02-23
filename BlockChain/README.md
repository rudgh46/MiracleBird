# BlockChain과 NFT

## BlockChain

- P2P(Peer to Peer) 네트워크를 통해서 관리되는 분산 데이터베이스의 형태
- 거래 정보를 담은 장부를 중앙 서버 한 곳에 저장하는 것이 아니라 블록체인 네트워크에 연결된 여러 컴퓨터에 저장 및 보관하는 기술

## NFT(Non-Fungible Token, 대체 불가능 토큰)

- 블록체인 기술을 이용해서 디지털 자산의 소유주를 증명하는 가상의 토큰

### 이더리움 네트워크의 분류

- 프라이빗 네트워크
  - 로컬PC에서 이더리움을 구동하거나, 몇 명의 유저들끼리 이더리움을 구동하는 것
  - 가치가 있는 이더를 왔다갔다 할 수는 없다.
  - 테스트용이나 실습용
- 퍼블릭 네트워크
  - 메인넷
    - 직접 사고 팔수 있는 네트워크
  - 테스트넷 (`Ropsten`, `Kovan`, `Rinkeby`, `Goerli`)
    - 메인넷 이전에 가볍게 시험 할 수 있는 네트워크

## 이더리움 네트워크 개념도

![이더리움 네트워크 구성도](https://user-images.githubusercontent.com/97828427/220829834-3eee400c-407e-42b4-88a0-788b246b07ac.png)

- 블록체인 네트워크는 수많은 노드로 구성될 수 있다.
- 로컬에서는 하나의 노드밖에 없지만 기본적으로 블록체인은 다수의 노드로 구성해야한다.

# 필수 지식

## 이더리움

- 이더리움은 블록체인 기술을 기반으로 하는 분산 컴퓨팅 플랫폼
- 스마트 컨트랙트의 기능을 새롭게 확장하여 적용
  - 1세대 블록체인인 블록체인도 스마트 컨트랙트가 적용되어 있지만, 기능이 제한적이고 서비스를 개발할 수 있을 만큼 고도화되지 않았다.
  - 이더리움은 스마트 컨트랙트를 새로운 블록체인 기술로써 전면에 내세움
- 스마트 컨트랙트만을 위한 언어(Solidity, LLL 등)를 개발, 이들을 실행시키기 위한 가상머신(EVM)도 제작

### 비트코인과 이더리움의 차이점

- 비트코인
  - 반복문이 동작할 수 없는 튜링 불완전한 스택 기반의 스크립트 언어를 사용 (스마트 컨트랙트)
  - 암호 해시함수로 SHA 계열의 함수 사용
  - 해시값들의 트리인 머클 트리(Merkle Tree)를 이용하여 트랜잭션들의 위조 혹은 변조 여부를 감지하는데 사용
  - UTXO(소비되지 않은 거래 출력(잔액)) 기반, 암호 화폐를 중심으로 관리
- 이러디움
  - 반복문을 포함하여 좀 더 복잡한 로직을 구현할 수 있는 튜링 완전 언어 (스마트 컨트랙트)
  - Ethash라는 KECCACK 기반의 해시 알고리즘을 개발하여 사용
    - ASIC 저항성 향상
    - 채굴의 중앙화 해소
  - 머클 트리를 Patricia Trie와 접목시킨 MPT를 사용하여 상태 정보를 Key-Value 형식으로 저장하며 관리
    - MPT(Modified Merkle Patricia Trie) : 트랜잭션 데이터의 위변조 감지 및 스마트 컨트랙트 관련 상태 정보 저장, 관리하기 위한 기술
  - 사용자 계정에 기반하여 암호 화폐를 관리

### Geth(Go-Ethereum)

- Geth는 이더리움 클라이언트 중 Go 언어로 개발된 버전
- 이더리움에서 제공하는 다양한 API를 사용해볼 수 있다.
- 가장 널리 사용되는 이더리움 클라이언트
- Ubuntu에서 Geth를 설치하는 방법

  - ```
    sudo apt-get update
    sudo apt-get install software-properties-common
    sudo add-apt-repository -y ppa:ethereum/ethereum
    sudo apt-get install ethereum
    geth version
    ```

### Web3.js

- 이더리움 생태계에 다양한 요청을 처리할 수 있게 하는 JavaScript API 라이브러리
- Geth는 HTTP 기반의 JSON RPC를 지원하고 있으며 Web3.js 또한 내부적으로 JSON RPC 사용
- Web3.js는 JavaScript 인터페이스만으로도 이더리움 노드들과 상호 작용을 가능케 하므로 DApp 이나 이더리움 기반 서비스 개발에 상당한 편의 제공

### Solidity

- 이더리움에서 개발한 스마트 컨트랙트 개발 언어 (Serpent, LLL로도 스마트 컨트랙트를 작성할 수 있으나 현재 가장 널리 사용하는 언어는 Solidity)
- uint/int, bool, string, bytes 등 다른 언어에서도 지원하는 기본 자료형을 지원하지만 부동 소수점은 없음
- 이더리움의 주소를 나타내는 20바이트 길이를 저장할 수 있는 address 자료형 존재
- 래퍼런스 타입의 구조체, 배열(고정크기, 유동크기), 열거형, 매핑형 사용 가능
  - 매핑형은 해시 테이블과 같음(Key에는 기본형, Value에는 사용자 지정 타입까지 지정 가능)
- 코드에 명시되어 있지 않은데도 불구하고 모든 함수에서 이용 가능한 특정 전역 변수와 전역 함수들이 있음
  - require(), assert(), revert() 등의 에러 처리 함수
  - msg.sender, msg.value 등의 전역 변수

### VirualBox

- 가상화를 위한 소프트웨어, 다양한 운영체제에서 사용 가능
  - 가상화는 컴퓨터 리소스의 추상화를 일컫는 광범위한 용어
- 하드웨어 가상화, Host OS 위에 Guest OS를 만들어 사용함으로써 독립적인 환경 구성 가능
- 이 외에도 Hyper-V, VMware Player, Parallels Desktop 등의 가상화 소프트웨어가 있다.

### Vagrant

- 가상 머신 프로비저닝(Provisioning) 도구
- 간단한 스크립트를 작성하여 VirtualBox, Hyper-V 등 다양한 가상 머신을 쉽게 생성, 수정, 삭제, 관리할 수 있음
- 다양한 스펙의 가상 머신을 다수 운용하고자 할 때 Vagrant를 사용하여 하나의 설정 파일로 모든 가상머신을 통합 관리 가능
- ```
  vagrant init                //해당 경로에 Vagrant 설정 파일 생성
  vagrant up <args>           //args에 해당하는 가상머신 구동
  vagrant halt <args>         //args에 해당하는 가상머신 정지
  vagrant destroy <args>      //args에 해당하는 가상머신 삭제
  vagrant ssh <args>          //args에 해당하는 가상머신 접속
  vagrant ssh-config <args>   //args에 해당하는 가상머신 SSH 설정 확인
  vagrant status              //가상머신 상태 정보 출력(해당 경로)
  vagrant global-status       //가상머신 상태 정보 출력(전체 폴더)
  vagrant status              //vagrant 관련 명령어 정보 출력
  ```

### Remix IDE

- 별도의 설치 없이 웹 브라우저 상에서 이용 가능한 이더리움 스마트 컨트랙트 개발 도구
- 다양한 버전의 Solidity 버전을 컴파일 할 수 있고 JavaScriptVM을 통해 스마트 컨트랙트를 사전 테스트 할 수 있음
- 테스트넷과 연동을 통해 배포 및 호출 등 가능
- Gas를 미리 예상해 볼 수 있음

### Metamask

- 이더리움 지갑 프로그램의 일종
- 크롬 확장 프로그램으로 설치
- 블록체인과 사용자가 만나는 접점 중 하나
- 블록체인 계정 주소의 관리, 비밀키 관리, 거래내역 조회 등을 지원
- 암호화폐 거래 및 스마트 컨트랙트 배포 가능

### 참고

|        주제         |                 참고 링크                  |                                              비고                                               |
| :-----------------: | :----------------------------------------: | :---------------------------------------------------------------------------------------------: |
|      Ethereum       |     https://ethereum.org/en/whitepaper     |     이더리움의 기본 개념과 스마트 컨트랙트가 생성, 처리되는 과정에 대한 상세 설명 확인 가능     |
|        Geth         |  https://github.com/ethereum/go-ethereum   |                   geth 명령어를 통한 이더리움 노드 생성, 관리 방법 확인 가능                    |
|       Web3.js       |  https://web3js.readthedocs.io/en/v1.2.0   |    Web3 JavaScript API의 사용법을 예시와 함께 살펴볼 수 있고 이더리움에 관련한 API 목록 제공    |
|       Ethash        | https://eth.wiki/en/concepts/ethash/ethash |                           이더리움에 사용하는 Hash의 개념에 대해 소개                           |
| Ethereum vs Bitcoin | https://blocknomi.com/ethereum-vs-bitcoin  |                                   이더리움과 비트코인의 비교                                    |
|      Solidity       | https://solidity.readthedocs.io/en/v0.5.12 | Solidity에 대해 상세히 기술되어 있는 공식 웹 문서, Depth에서 문법 학습 후 Example 에제 살펴보기 |
|     VirtualBox      |         https://www.virtualbox.org         |                                                -                                                |
|       Vagrant       |         https://www.vagrantup.com          |                                                -                                                |
|      Remix IDE      |         https://remix.ethereum.org         |                                                -                                                |
|      Metamask       |            https://metamask.io             |                                                -                                                |

## `1. 프라이빗 이더리움 네트워크 구축`

**① 가상 머신 구성**

- VirtualBox 설치 (https://www.virtualbox.org)
  - Custom Setup 기본값 그대로 설치
  - 설치 완료 단계에서 Start Oracle VM VirtualBox after installation 체크, VirtualBox 실행 화면 및 버전 확인
- Vagrant 설치 (https://www.vagrantup.com)
  - 설치 여부 및 버전 확인 (cmd)
    ```
    vagrant version
    ```
  - 호스트와 가상 머신 간 파일 전송 플러그인 설치
    ```
    vagrant plugin install vagrant-scp
    ```
- 가상 머신 생성 및 구동

  - 원하는 작업 디렉토리에서 Vagrant 초기화 (설정 파일 생성)
    ```
    vagrant init
    ```
  - 생성된 Vagrantfile의 내용 수정 (Vagrant 파일은 필요에 따라 임의 수정 가능)

    ```
    VAGRANT_API_VERSION = "2"

    vms =  {
      'eth0' => '10',
      'eth1' => '11'
    }

    Vagrant.configure(VAGRANT_API_VERSION) do |config|
      config.vm.box = "ubuntu/bionic64"
      vms.each do |key, value|
        config.vm.define "#{key}" do |node|
          node.vm.network "private_network", ip: "192.168.50.#{value}"
          if  "#{key}" == "eth0"
            node.vm.network "forwarded_port", guest: 8545, host: 8545
          end
          node.vm.hostname = "#{key}"
          node.vm.provider "virtualbox" do |nodev|
            nodev.memory = 2048
          end
        end
      end
    end
    ```

  - 작업 디렉토리로 이동하여 가상머신 구동 명령어 실행, 구동상태 확인
    ```
    vagrant up
    vagrant status
    ```
    - 가끔 실행 안될 경우에는 Virtual Box에서 직접 구동 상태 확인 후 구동중인 가상머신 종료 후 다시 구동
  - 가상 머신 접속 (eth0)
    ```
    vagrant ssh eth0
    ```
  - 에러시 참조 (https://foxtrotin.tistory.com/482)

**② 이더리움 eth0 및 eth1 노드 구성**
![구성도](https://user-images.githubusercontent.com/97828427/220830092-018c54a7-2b07-4657-aeee-55e38f5c1b50.png)
![설정](https://user-images.githubusercontent.com/97828427/220829826-abb33bf0-8119-4f0a-b9cf-b78ef0bc4393.png)
![정보](https://user-images.githubusercontent.com/97828427/220829836-6699637d-1899-4f3c-9260-502eaad0b07a.png)

- 이더리움 소프트웨어 Geth 1.9(stable) 이상 사용
- Geth는 가상 머신 상에서 동작하도록 구축
- eth0 노드의 경우 RPC API를 호출할 수 있도록 활성화(eth0 노드만)
- 위에서 접속한 가상머신 eth0 또는 eth1에서 이어서 시작
- Geth 설치

```
# vagrant@eth0:~$ 가상머신에서 수행

sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get install ethereum
#여기까지 순서대로 설치하면 geth설치는 완료.

# 프라이빗 이더리움를 관리할 폴더 생성
mkdir -p dev/eth_localdata		#-p는 mkdir 옵션사항 => 중간경로도 다 만들어라
mkdir database
cd database

# 프라이빗 이더리움을 위한 genesis.json블록파일(블록들을 연결하기 위한 최초의 블럭) 생성
vi genesis.json		# genesis.json를 만들겠다.
```

- 프라이빗 네트워크를 구축하기 위해서는 제네시스 블록을 생성해야한다.

```
# genesis.json의 내용 등록 (예시)
i → 입력 활성화 → 아래 내용입력 후 → esc → :wq!(저장하고 종료)

{
  "config": {
    "chainId": 921,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0
    },
  "nonce": "0xdeadbeefdeadbeef",
  "difficulty": "0x40",
  "gasLimit": "9999999",
  "alloc": {},
  "extraData": "",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp": "0x00"
}

# difficulty : 채굴 난이도 (값이 높으면 느리게 채굴)

cd ..
```

- 제네시스 블록을 만들었다면 등록(초기화)해줘야 함 -> geth 사용으로 진행

```
# ~/database 위치에 있는 genesis.json을 등록(초기화)하고 등록 후 생기는 관련 자료는 ~/dev/eth_localdata에 모아놓겠다는 뜻
$ geth --datadir ~/dev/eth_localdata init ~/database/genesis.json
```

- 노드 실행

```
# networkid는 명세대로 프라이빗 네트워크 아이디
# port, maxpeer, datadir, 명세 rpc 대신 http로,
# eth0의 경우 rpc addr이 0.0.0.0이니까
# 맨뒤에 console 입력해서 geth console창 띄우는거

# eth0의 경우 rpc addr이 0.0.0.0이니까-
$ geth -allow-insecure-unlock --networkid 921 --maxpeers 2 --datadir ~/dev/eth_localdata --port 30303 --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "admin,net,miner,eth,rpc,web3,txpool,debug,db,personal" console

# eth1의 경우 rpc addr이 localhost이니까
$ geth --networkid 921 --maxpeers 2 --datadir ~/dev/eth_localdata --port 30303 --rpc --rpcport 8545 --rpcaddr localhost --rpccorsdomain "*" --rpcapi "" console

# 노드연결 (eth1에서)
$ admin.nodeInfo.enode

# eth0에서 붙이기
admin.addPeer("enode 주소")
```

## `2. 이더리움 계정 생성`

- Geth 콘솔에서 명령어를 사용해 진행할 수 있음

**① 계정 생성**

- 사용자 계정은 노드마다 최소 1개 이상 생성
- 계정 생성에 따른 keystore 파일 확인

```
#계정생성
personal.newAccount()
#현재 eth0의 비번 및 계정
#비밀번호 입력 -> 경호46
#"0x091983e4edbdba29ee36cee93725d0f62cb29212"

#현재 eth1 비번 및 계정
#비번 경호46
#"0x7c5467fa5c8542a9f8d0863277d454f2244713c5"

personal.newAccount("rudgh46") => rudgh46을 비밀번호로 하는 계정 생성 (keystore 추가)
personal.listAccount => 등록된 계정 확인
```

**② 코인베이스(Coinbase) 설정**

- 코인베이스 : 블록 생성에 따른 보상금 지급 계정
- 노드마다 생성한 계정 중 하나를 코인베이스로 설정

```
# 코인베이스주소
eth.coinbase
#다른 주소로 원할시
#geth console창에서는
miner.setEtherbase("")
# 노드실행시에는
coinbase ="주소" 옵션 추가

# 사용했던 명령어
#eth0
geth --networkid 921 --port 30303 --maxpeers 2 --datadir ~/dev/eth_localdata --http --http.port 8545 --http.addr 0.0.0.0 --http.corsdomain "*" -nat "any" --http.api "admin, debug, txpool, eth, miner, rpc, web3, personal, net" --allow-insecure-unlock --nodiscover --miner.threads 1 console coinbase = "현재 내계좌 주소"

#eth1
geth --networkid 921 --port 30303 --maxpeers 2 --datadir ~/dev/eth_localdata --http --http.port 8545 --http.addr localhost --http.corsdomain "\*" -nat "any" --http.api "admin, debug, txpool, eth, miner, rpc, web3, personal, net" --allow-insecure-unlock --nodiscover --miner.threads 1 console coinbase = "현재 내계좌 주소"
```

**③ 마이닝 시작**

- 모든 노드에서 마이닝 시작
- 마이닝 진행 상태 확인
- 일정량 마이닝 진행 후 중단
  - 가상 머신에서 구동하는 환경 상 호스트 PC에 발생하는 부하를 고려하여 중단

```
#채굴 시작
miner.start()
괄호 안에 숫자 만큼 채굴, 비워두면 계속 채굴.

#채굴 종료
miner.stop()

miner.setEtherbase()
채굴 보상을 줄 계정을 등록

```

**④ 마이닝 결과 확인**

- 계정별 잔액 확인

```
#잔액확인
eth.getBalance(eth.accounts[보고자하는 계좌 인덱스])
#이더단위로 값 확인
web3.fromWei(eth.getBalance(eth.accounts[보고자하는 계좌 인덱스]), "ether")
```

- 생성된 블록 수 조회

```
eth.blockNumber
```

- 블록의 상세 정보 조회

```
eth.getBlock(보고자하는 블록의 인덱스)

eth.mining
채굴중인지 여부 확인
```

## `3. 이더리움 트랜잭션 생성`

- Geth 콘솔에서 명령어를 사용하여 진행 가능

**① 트랜잭션 생성**

- 계정 간 이더 전송(ETH) 트랜잭션 생성
- 전송할 이더량은 임의로 지정
- 트랜잭션 해시 값 확인
- 트랜잭션 상태 조회

```
eth0에서 eth1로 트랜잭션
tx_hash = eth.sendTransaction({from:eth.coinbase, to:"보내는 주소",value:web3.toWei(1,"ether")})

# 계정 잠겨있다고 나오면 personal.unlockAccount("계정주소")하기
```

**② 트랜잭션 결과 확인**

- 마이닝 재시작(일정 시간 수행)
- 트랜잭션 상태 조회
- 마이닝에 따른 트랜잭션 처리가 완료되면 마이닝 중단

```
miner.start()
miner.stop()
```

## `4. 스마트 컨트랙트 배포`

**①eth0 노드 확인**

- VirtualBox 또는 Vagrant에서 eth0 VM에 대한 포트 포워딩 확인
  - Host 8545 -> Guest 8545
    ![확인](https://camo.githubusercontent.com/be7505fee167fbd5f520c0a55fb09ad6f377bcb88c73ab46538f01b0f7d70a49/68747470733a2f2f692e696d6775722e636f6d2f677265756745552e706e67)
- eth0의 keystore를 json 파일로 저장

**② Metamask 설정**

- Chrome 확장 프로그램 검색 후 Metamask 설치 및 실행
- Metamask의 Custom RPC 옵션 설정
- Metamask에서 계정 Import (eth0의 keystore json 파일 활용)
  - cat 명령어로 json 확인 후 local에서 json 파일 새로 생성
  - VM 내 원본 파일 위치 /home/vagrant/dev/eth_localdata/keystore/파일이름
- Metamask에서 계정 및 잔액 정보 확인

**③ 스마트 컨트랙트 배포(Remix)**

- Remix 접속
  - private network를 http 프로토콜을 사용해 만들면 remix 페이지의 https 프로토콜과 충돌이 일어남 => remix 페이지를 http로 접속
- Deploy & Run Transactions으로 이동
- Environment를 로컬 이더리움 네트워크와 연동
- 기본 제공 예제 중 1개를 선택하여 코드 내용 확인
- Compile 및 Deploy 수행 후 결과 확인
  - solidity 파일의 버전과 geth버전의 충돌로 배포 후 사용 불가능 => solidity 파일 버전 다운

## `IPFS 설치 및 활용`

- IPFS를 사용하려면 go가 필요하다.
  - https://go.dev/doc/install 에서 Windows 환경에 맞는 MSI를 다운로드 후 설치
  - 다음 명령어로 설치 확인
  ```
  go version
  ```
- https://dist.ipfs.io/ 에서 Windows 환경에 맞는 kubo(go-ipfs)를 다운로드
- 다운로드 파일을 압축 해제한 후 ipfs.exe 파일을 사전에 설치한 go/bin 폴더로 이동
- 새로운 명령 프롬프트를 열어 명령어가 정상 동작하는지 확인
  ```
  ipfs help
  위 결과 사용할 수 있는 명령어의 목록이 출력됨
  ```
- 다음 명령어로 ipfs 초기화
  ```
  ipfs init
  ```
- 위 결과 출력되는 ipfs cat /ipfs/[PEER_IDENTITY]/readme 를 입력해보기
- ipfs ls /ipfs/PEER_IDENTITY/ 명령어로 경로의 콘텐츠 목록을 확인할 수 있음
- 명령 프롬프트를 통해 파일 업로드 가능
  ```
  ipfs add [PATH_OF_FILE]
  ```
- 완료 후 ipfs 데몬 구동
  ```
  ipfs daemon
  ```
- 주소창에 localhost:5001/webui 입력하면 ipfs 웹 콘솔이 열림

- NFT 메타데이터를 JSON 형식으로 IPFS에 업로드
  ```
  메타데이터 형식의 예)
  "fileName" : "{CID}.json" ,
  "name" : "NFT 이름"
  "author" : "작가 이름" ,
  "description" : "NFT소개" ,
  "image" : "ipfs://{CID}"
  ```
