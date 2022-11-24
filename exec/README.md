# 포팅매뉴얼

# 색인

[🔨빌드 및 배포](#빌드-및-배포)<br>
[👨‍💻외부 서비스 정보](#외부-서비스-정보)<br>
[📋DB 정보](#데이터베이스-정보)<br>
[🎬시연 시나리오](#시연-시나리오)<br>

# 빌드 및 배포

## 배포환경

### IDE 버전

- IntelliJ IDEA 2022.1.2
- VS Code 18.3.5

### 서버 버전

- Ubuntu 20.04.5
- Maven 4.0.0
- Tomcat 9.0.54
- openjdk:11.0.16
- node:16.16.0
- solidity 0.8.0(ERC-721), 0.5.0(ERC-20)
- mariaDB 10.6

## 배포 방법

### Backend 및 Frontend 빌드 및 배포

- 설치
  ```
  #ngninx 설치
  sudo apt-get install nginx -y

  #letsencrypst 설치
  sudo apt-get install letsencrypt
  sudo systemctl stop nginx
  sudo letsencrypt certonly --standalone -d 도메인이름
  ```
- backend/Dockerfile
  ```
  FROM openjdk:11-jdk
  VOLUME /tmp
  ADD target/miraclebird-0.0.1-SNAPSHOT.jar app.jar
  ENV TZ=Asia/Seoul
  EXPOSE 8080
  ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
  ```
- frontend/Dockerfile
  ```
  FROM node:16.16.0
  WORKDIR /usr/src/app
  COPY package.json ./
  ENV TZ=Asia/Seoul
  RUN npm install -y tzdata
  COPY ./ ./
  EXPOSE 3000
  CMD ["npm","run","dev"]
  ```
- etc/nginx/nginx.conf
  ```
  ...
  http {
  				...
  				client_max_body_size 100M;
  				...
  			}
  ...
  ```
- etc/nginx/sites-enabled/miraclebird.conf
  ```
  server {
    listen 80;

    server_name j7c107.p.ssafy.io;
    return 301 https://j7c107.p.ssafy.io$request_uri;
  }
  server {
    listen 443 ssl http2;
    server_name j7c107.p.ssafy.io;

    # ssl 인증서 적용하기
    ssl_certificate /etc/letsencrypt/live/j7c107.p.ssafy.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/j7c107.p.ssafy.io/privkey.pem;

    location / {
      proxy_pass http://j7c107.p.ssafy.io:3000/;
      proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }

  #백엔드 API
    location /api/ {
      proxy_pass http://j7c107.p.ssafy.io:8080/;
    }

          #Express.js 이미지 서버
    location /image/ {
      proxy_pass http://j7c107.p.ssafy.io:3003/;
    }

          #업로드된 이미지 접근
    location /images/ {
      alias /home/ubuntu/image-server/uploads/;
    }

          #jenkins test
    location /jenkins/ {
      proxy_pass http://j7c107.p.ssafy.io:9000/;
    }
          #blockchain
    location /blockchain/ {
      proxy_pass http://20.196.209.2:8545/;
    }
    location /blockchain2/ {
      proxy_pass http://52.141.42.92:8545/;
    }
    location /blockchain3/ {
      proxy_pass http://20.41.85.203:8545/;
    }

  }

  server {
      if ($host = j7c107.p.ssafy.io) {
          return 301 https://$host$request_uri;
      }

      listen 80;
      server_name j7c107.p.ssafy.io;
        return 404; # managed by Certbot
  }
  ```
  - nginx 설치 후 심볼릭 링크 생성
    - `sudo ln -s /etc/nginx/sites-available/test.conf /etc/nginx/sites-enabled`
  - nginx재실행
    - `sudo service nginx restart`
- 젠킨스 Build시 bash 실행
  ```
  cd ./Backend/miraclebird
  mvn clean package
  docker build -t rest-api-test .
  cd ../../Frontend
  docker build -t mb_fe:0.0.1 ./
  cd ..
  docker kill mb_fe_container
  docker kill mb_be_container
  docker system prune -f
  docker run -d -p 8080:8080 --restart="always" --name mb_be_container rest-api-test
  docker run -d -p 3000:3000 --restart="always" --name mb_fe_container mb_fe:0.0.1
  ```

### 이미지서버 빌드 및 배포

- 이미지서버 이동후 빌드

```
#배포된 디렉토리에 있는 이미지서버 폴더를 로컬 디렉토리로 복사
cp -r ./image_server /home/ubuntu/image_server
cd /home/ubuntu/image_server
npm i
#이미지 서버 빌드
forever start
```

### 서버 재부팅 시 자동 실행

- nano /etc/init.d/restart_project.sh

```bash
#! /bin/sh
sudo docker start mb_be_container
sudo docker start mb_fe_container
cd /home/ubuntu/image-server/
sudo forever start index.js
```

# 외부 서비스 정보

## 카카오 소셜 로그인

![Untitled](https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_sequence.png)

[내 애플리케이션] > [카카오 로그인]에서 카카오 로그인 사용에 필요한 설정을 할 수 있습니다. [카카오 로그인] 설정 화면은 다음과 같이 구성되어 있습니다.

![Untitled](https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_enable.png)

🅐 [카카오 로그인 활성화 설정](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#kakao-login-activate)
🅑 [OpenID Connect 활성화 설정](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#kakao-login-oidc)
🅒 [Redirect URI 등록](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#kakao-login-redirect-uri)
🅓 [동의 화면 미리보기](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#kakao-login-preview)

카카오 로그인을 사용하려면 🅐 카카오 로그인 활성화 설정, 🅒 Redirect URI 등록은 반드시 설정해야 합니다. 🅑 OpenID Connect 활성화 설정은 필요 시 사용합니다.

### 카카오 로그인 활성화 설정 [필수](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#tag)

[카카오 로그인](https://developers.kakao.com/docs/latest/ko/kakaologin/common)을 사용하려면 내 애플리케이션 > 카카오 로그인에서 활성화 설정의 상태를 ON으로 설정해야 합니다. 활성화 설정의 상태가 OFF인 경우, 카카오 로그인 요청 시 `KOE004` 에러가 발생합니다.

![https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_activation.png](https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_activation.png)

### OpenID Connect 활성화 설정 [선택](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#tag)

카카오 로그인의 [OpenID Connect](https://developers.kakao.com/docs/latest/ko/kakaologin/common#oidc) 확장 기능 사용 시 필요한 설정입니다. OpenID Connect를 사용하면 카카오 로그인 시 액세스 토큰과 ID 토큰을 함께 발급받을 수 있습니다. 아래 내용을 참고해 [내 애플리케이션] > [카카오 로그인]에서 OpenID Connect를 사용하도록 설정합니다.

![https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_oidc.png](https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_oidc.png)

1. 🅐 [활성화 설정]의 [상태]를 [ON]으로 설정해 카카오 로그인을 활성화합니다. 카카오 로그인을 사용 중인 경우에만 OpenID Connect를 사용할 수 있습니다.
2. 🅑 [OpenID Connect 활성화 설정]의 [상태]를 [ON]으로 설정합니다.

주의: OpenID Connect 비활성화

[OpenID Connect 활성화] 설정을 [OFF]로 변경하면, 설정 변경 시점부터 ID 토큰이 발급되지 않습니다. 서비스에서 ID 토큰을 사용 중인 경우에는 로그인 기능에 문제를 일으킬 수 있으므로 주의합니다.

### 참고: OpenID Connect 사용 시 추가 항목 동의 받기 주의사항

[OpenID Connect 활성화] 설정이 [ON]으로 유지되는 동안 카카오 로그인 시 별도의 파라미터를 사용하지 않아도 ID 토큰이 항상 발급됩니다. 단, 추가 항목 동의 받기 요청 시에는 `scope` 파라미터에 `openid` 값을 전달한 경우에만 ID 토큰이 재발급되므로 주의합니다. scope 파라미터를 참고합니다.

### Redirect URI 등록

REST API 또는 Kakao SDK for JavaScript로 카카오 로그인을 사용한다면 Redirect URI를 반드시 등록해야 합니다. Redirect URI는 [Oauth 2.0](https://tools.ietf.org/html/rfc6749#section-4.1)을 기반으로 동작하는 카카오 로그인의 핵심 요소입니다. 카카오 로그인은 [서비스 로그인 과정](https://developers.kakao.com/docs/latest/ko/kakaologin/common#intro-login-process)에서 Redirect URI를 통해 서비스에서 요청한 인가 코드와 토큰을 전달합니다. Redirect URI를 올바르게 등록하지 않은 경우, 카카오 로그인 시 `KOE006` 에러가 발생합니다.

Redirect URI는 내 애플리케이션 > 카카오 로그인 > Redirect URI에서 Redirect URI 등록 버튼을 눌러 등록합니다.

![https://developers.kakao.com/docs/latest/ko/assets/style/images/getting-started/getting_started_redirect_uri.png](https://developers.kakao.com/docs/latest/ko/assets/style/images/getting-started/getting_started_redirect_uri.png)

Redirect URI는 다음 규칙에 맞게 등록해야 합니다.

- Redirect URI는 최대 10개까지 등록할 수 있습니다.
- Redirect URI는 HTTP 및 HTTPS 프로토콜, 80, 443 포트를 허용합니다.
- Redirect URI는 HTTP, HTTPS 프로토콜을 구분하므로 각각 등록해야 합니다.

### 참고: Redirect URI 활용 안내

- 카카오 로그인 후 랜딩 페이지, 추가 정보 입력 페이지 등 상황에 맞는 서비스 페이지로 이동할 수 있도록 여러 개의 Redirect URI를 등록할 수 있습니다.
- Redirect URI는 경로(path)에 임의의 파라미터를 포함할 수 없습니다. 로그인 과정 중 특정 정보를 유지하거나 전달하려면 `state` 파라미터를 활용합니다. `state` 파라미터에 대한 정보는 [인가 코드 받기](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code)에서 확인할 수 있습니다.
- [비즈 앱](https://developers.kakao.com/docs/latest/ko/getting-started/app#biz-app)은 Redirect URI의 도메인에 와일드카드 문자를 포함할 수 있습니다. 자세한 안내는 [서브 도메인 설정](https://developers.kakao.com/docs/latest/ko/getting-started/app#platform-web-sub-domain)을 참고합니다.
- 10개를 초과하는 Redirect URI 등록이 필요한 경우, [데브톡](https://devtalk.kakao.com/t/topic/82307)으로 문의합니다.

## OpenZepplin

- OpenZepplin이 제공하는 ERC-721 인터페이스들을 참고하여 개발에 적용

# 데이터베이스 정보

## 데이터베이스 접속 정보

사용 DB : MariaDB

- ID : SSAFY
- PW : Miracle107!
- port : 3306
- DB 이름 : miraclebird

## 테이블 정보

|                                                     challenge                                                     |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219083-e719a7b9-872a-40a0-a171-f47e5d50616a.png"> |

|                                                    challenger                                                     |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219086-0e6f1f58-b64f-46db-b14e-e411377c52e7.png"> |

|                                                      comment                                                      |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219060-e6969fc4-c81a-43f8-8b9e-83855c03e1af.png"> |

|                                                     landmark                                                      |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219063-d0513026-bc72-4fcc-944f-b1e0de6703e1.png"> |

|                                                   landmark_info                                                   |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219064-f39ec582-9484-49d2-ac9e-1a65a9190534.png"> |

|                                                       mynft                                                       |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219065-58b9b834-5977-4b59-ad74-0c546503c138.png"> |

|                                                       post                                                        |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219067-6744c518-06c5-4c90-b387-b5bfb09243b2.png"> |

|                                                       price                                                       |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219070-5efd9ee3-3cab-4ead-8083-ed5c0fcb70bb.png"> |

|                                                      report                                                       |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219071-fb86ee0c-c8b5-446c-8797-b209d468a628.png"> |

|                                                       token                                                       |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219073-642144fc-4183-4d67-afe5-2fc69bf417ba.png"> |

|                                                    transaction                                                    |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219074-f7a8b8cb-9160-4dd8-acc2-bc3230bebcc7.png"> |

|                                                       user                                                        |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219075-073b4593-1b9e-4555-b9db-3a187689efc7.png"> |

|                                                   verification                                                    |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219077-4a951852-b4c0-47d0-8e7c-ad3f946a6ac4.png"> |

|                                                 verification_like                                                 |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219080-0ac0d44a-e360-4fa0-ad06-991ef87c8ff5.png"> |

|                                                      wallet                                                       |
| :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/97828427/194219082-332d31ea-ebaa-4289-8fe9-6ec1f6a6ed8b.png"> |

# 시연 시나리오

[🎬시연 시나리오](https://lab.ssafy.com/s07-blockchain-nft-sub2/S07P22C107/-/blob/develop/exec/miracle_bird_%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4.pdf)
