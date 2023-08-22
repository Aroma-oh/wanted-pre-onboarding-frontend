# 👩🏻‍💻 원티드 프리온보딩 FE 사전과제 

* 제출자: 오아름
* 프로젝트 실행 방법
  ```
  $ npm install
  $ npm start
  ```
* 배포 링크로 [확인하기](https://wanted-pre-onboarding-frontend-tau-five.vercel.app/todo)
* 데모 영상으로 확인하기

  |회원가입(`/signup`)|로그인(`/signin`)|투두(`/todo`)|
  |:---:|:---:|:---:|
  |![](https://velog.velcdn.com/images/on002way/post/75a3476d-0f34-435f-a340-851a4de2cdd4/image.gif)|![](https://velog.velcdn.com/images/on002way/post/bfcaeede-a4d9-4446-a612-e8bc83513fcc/image.gif)|![](https://velog.velcdn.com/images/on002way/post/ae454118-3a2d-4935-863e-8496f996d3e0/image.gif)|

* 폴더 구조
  ```
  src
  ├── apis
  ├── components
  │   ├── auth
  │   ├── common
  │   └── todo
  ├── hooks
  ├── pages
  ├── types
  └── utils
  ```
----
## ✍️ 요구사항 정리하기 
- [x] 회원가입 기능 구현
- [x] 로그인 기능 구현
- [x] 페이지 분기 처리
- [x] TODO LIST CRUD 구현

## 🧐 요구사항에 따른 개발 주안점
#### 재사용성을 고려하자! 
* [과제 안내 페이지](https://github.com/walking-sunset/selection-task)에서 회원가입, 로그인 UI는 재사용이 가능하다고 안내하고 있다. 따라서, 해당 컴포넌트는 최대한 재사용성을 높여야겠다고 생각했다.  
* Input과 Button은 서비스 전반적으로 재사용된다. 따라서 컴포넌트를 분리하여 최대한 코드를 재사용하기로 했다.
#### 그래서 어떻게 재사용성을 높였지? 
* 로직과 뷰를 분리하려고 노력했다.
* 데이터 패칭 등 비즈니스 로직으로부터 컴포넌트로 분리하고, 부모로부터 props로 받을 수 있도록 작성했다. 👇
  ```js
  // src/components/auth/AuthForm.tsx
  
  import ... 
  
  export const AuthForm = ({
    email,
    handleEmail,
    password,
    handlePassword,
    handleSubmit,
    type,
    testid
  }: AuthProps) => {
  
    return (
      <form>
        <Input
          id='eamil'
          type='text'
          testid='email-input'
          placeholder='user@wanted.com'
          value={email}
          onChange={handleEmail}
        />
        <Input
          id='password'
          type='password'
          testid='password-input'
          placeholder='********'
          value={password}
          onChange={handlePassword}
        />
        <Button
          type={type}
          testid={testid}
          disabled={!emailValidate(email) || !passwordValidate(password)}
          onClick={handleSubmit}
        />
      </form>
    )
  }
  ```

* 또한 커스텀 훅을 만들어 Input의 재사용이 쉽도록 하였다. 👇
  ```js
  // src/hooks/useInput.ts
  
  import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';

  type ReturnTypes = [
    string,
    (e: ChangeEvent<HTMLInputElement>) => void,
    Dispatch<SetStateAction<string>>,
  ];
  
  export const useInput = (initialData: string): ReturnTypes => {
  
    const [value, setValue] = useState(initialData);
  
    const handler = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }
  
    return [value, handler, setValue];
  }
  ```

#### 페이지 분기는 한 곳에서 관리하자! 
* 각 페이지에서 분기처리를 한다면, 로직을 한 눈에 파악할 수 없을 것이라고 생각했다. 과제는 토큰 유무에 따라 리다이렉트 되는 페이지가 다르다. 만일 페이지에서 분기처리를 한다면, 토큰을 가진 사용자가 어디로 이동하는지를 알기 위해서는 해당 페이지 코드를 들여다 보아야하는 수고스러움이 * n번 발생할 것이다.
* 또한 설계가 수정되었을 때에도 번거로움이 발생할 것이라고 생각했다. 지금은 3개의 페이지만 가진 프로젝트이지만, 100개의 페이지를 가진 프로젝트에서 수정을 해야한다면...을 상상했더니 더욱 더 분리가 필요할 것 같았다.
#### 그래서 어떻게 처리했는데? 
* 프로젝트 진입 지점인 `index.tsx`에서 router를 설정해주었다.
* router는 `router.tsx`파일에서 생성하여 한 곳에서 관리하도록 했다. 
* 토큰 유무에 따른 리다이렉트를 처리하기 위해 [`loader`](https://reactrouter.com/en/main/route/loader) 함수를 이용했다. loader에서 정의된 함수는 경로 이동전에 실행되어 토큰 유무에 따른 리다이렉트 처리를 가능하도록 한다.
  <p> 코드 미리보기 👇 (loader 속성에 정의해준 리다이렉트 함수이다. 토큰의 유무를 검사하고 경로를 처리를 한다. )</p>
  
  ```js
  // src/utils/redirect.ts
  
  export const redirectTodo = () => {
    const token = localStorage.getItem('access_token');
  
    if (token !== null) {
      return redirect('/todo');
    }
  
    return null;
  }
  ```
#### 마주한 어려움은? 
* 토큰이 존재하여 `/todo` 페이지로 이동하면, TODO LIST GET 요청을 보낸다.
* [`getTodos`](https://github.com/walking-sunset/selection-task#2-2-gettodos) 요청은 헤더에 Authorization 키를 함께 보내야한다.
* 하지만 리다이렉트시, API 요청 헤더는 업데이트되지 않아서 에러가 발생했다.

  ![image](https://github.com/Aroma-oh/wanted-pre-onboarding-frontend/assets/115550622/47eaab48-3f34-48a1-8778-91e666a5a9a8)

#### 해결한 방법은? 
* [`axios.interceptors`](https://axios-http.com/kr/docs/interceptors) 미들웨어를 사용했다.
* 인터셉터를 사용하면, 요청 전에 토큰을 업데이트하는 함수를 실행할 수 있게 해준다.
  ```js
  // src/apis/axios.ts
  
  todoAxios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('access_token');
  
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  ```

## 🥺 아쉬움으로 남은 사항들 
#### 컴포넌트 분리
* 컴포넌트 분리에 중점을 두었으나, 지나고보니 내멋대로 분리였다는걸 깨달았다.
* 다음 프로젝트에서는 아래 기준으로 컴포넌트를 설계하고싶다.

**`Page`** 
* 라우팅의 단위가 될 컴포넌트이다.
* 단순 래핑의 역할과 SEO를 위한 메타태그 설정의 역할만 한다.

**`Container`**
* UI 컴포넌트를 컨트롤하는 역할이다.
* 데이터 패칭, 이벤트 처리 등의 비즈니스 로직은 컨테이너가 담당한다.

**`Component`**
* 순수하게 UI 로직만 가지고 있다.
* UI 관련 상태, 이벤트 핸들링만을 처리한다. 이 외는 모두 컨테이너로부터 주입 받아야 한다.
* 반드시 독립적으로 설계되어 재사용 가능해야 한다.

**내 코드를 바꿔본다면?**
* `Singup.tsx 페이지`를 어떻게 바꿔볼까 고민해봤다.
* 현재 Singup 페이지는 **비즈니스 로직과 컴포넌트로 분리 가능한 코드들이 혼재**되어 있다. 그리고 정작 페이지의 역할인 메타태그 관리는 하고있지 않다. 
* 따라서 비즈니스 로직은 Container로, 분리 가능한 컴포넌트는 분리. 또한 `react-helmet-async`을 이용하여 메타태그를 설정하는 것은 어떨까 고민해봤다.

**`As Is`**
```js
  // src/pages/Signup.tsx

  import ...
  
  export const Signup = () => {
    const navigate = useNavigate();
  
    const [email, handleEmail] = useInput("");
    const [password, handlePassword] = useInput("");
  
    const handleSubmit = async () => {
      try {
        await signupAPI(email, password);
        navigate('/signin');
      }
      catch {
        throw new Error("Sign up failed");
      }
    }
  
    return (
      <AuthStyle>
        <h1>회원가입</h1>
        <AuthForm
          email={email}
          handleEmail={handleEmail}
          password={password}
          handlePassword={handlePassword}
          handleSubmit={handleSubmit}
          type='회원가입'
          testid='signup-button'
        />
        <div className='link'>
          <Link to='/signin'>로그인</Link>
          <span>으로 이동하기 </span>
        </div>
      </AuthStyle>
    )
  }
```
**`To Be`**
```js
  import { Helmet } from 'react-helmet-async';

  export const Signup = () => {
    return (
      <AuthStyle>
        <Helmet>...</Helmet>
        <h1>회원가입</h1>
        <AuthContainer />
      </AuthStyle>
    )
  }
```
#### 에러 처리에서의 UX 및 생산성 고려
* 현재 코드는 최소한의 에러 처리만 하고 있다. 따라서 사용자는 에러가 왜 발생했는지, 어떻게 해결할 수 있을지에 대한 안내를 전혀 받을 수 없다.
* 이메일이 유효하지 않다면 어떤 이메일이 유효한지 안내를, 회원가입에 실패했다면 이유는 무엇인지 알려줄 필요가 있다고 생각이 들었다.
* 또한 TODO의 CRUD 실패는 네트워크 문제로 공통되는데, 코드에서는 해당 문장을 단순 반복 타이핑했다. 이 부분도 고쳐보고 싶다.
* 아래는 고민해본 코드이다. 👇
  ```js
    const errorMessageOptions = {
      'networkError': '잠시후 다시 시도해주세요.',
      'emailConvetion': '이메일은 @를 포함하여야 합니다.',
      'shortPassword': '비밀번호는 8자 이상이어야 합니다.',
      ...
    }
  ```

---
## 커밋 메시지 컨벤션
* 예시: `feat: 로그인 기능 구현`

|커밋 유형|의미|
|:---:|:---:|
|init| 프로젝트 시작|
|feat| 기능 추가|
|style| 코드 포맷팅|
|refactor| 코드 리팩토링|
|chore| 패키지 매니저 및 그 외 기타 수정 ex) .gitignore|
|rename| 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
|remove|파일을 삭제하는 작업만 수행한 경우|
|setting|기본 세팅 변경의 경우|
